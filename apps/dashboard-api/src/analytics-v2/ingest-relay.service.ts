import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Interval } from "@nestjs/schedule";
import { appendFile, mkdir, readFile, rename, stat, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";

// Everything analytics-v2 used to hash/store locally (salt, visit, session,
// event rows) now lives in the standalone iq-metrix service. This module's
// only job is to relay each batch there over HTTP and never lose one: a short
// timeout keeps the client-facing request fast, and anything that doesn't
// make it gets appended to a local NDJSON spool that a background interval
// keeps retrying.

export interface IngestEvent {
  page: string;
  action: string;
  name: string;
  locale: string | null;
  at: string;
}

export interface IngestPayload {
  site: "iq-rest";
  /** Which app the batch came from ("landing" | "dashboard-web"), when the
   *  Origin header matched a known one. Left out rather than guessed. */
  app?: string;
  ip: string;
  ua: string;
  headers?: Record<string, string>;
  /** iq-metrix's only identity key. null = anonymous. */
  email: string | null;
  meta?: { restaurantId?: string; from?: string; ref?: string; theme?: string };
  /** Visit-continuation token echoed from the client, forwarded verbatim. */
  tok?: string;
  events: IngestEvent[];
}

interface IngestResponse {
  tok?: string;
}

// iq-metrix runs alongside dashboard-api on the same host — a loopback
// address, not something that needs to vary per environment.
const INGEST_URL = "http://127.0.0.1:8205/ingest";
const FORWARD_TIMEOUT_MS = 250;
const DRAIN_INTERVAL_MS = 10_000;
// Generous headroom for a short iq-metrix outage (each spooled line is at
// most a couple KB) without letting a long one grow the disk unbounded.
const MAX_SPOOL_BYTES = 10 * 1024 * 1024;
const CAP_WARN_COOLDOWN_MS = 60_000;

@Injectable()
export class IngestRelayService {
  private readonly logger = new Logger(IngestRelayService.name);
  private readonly ingestKey: string;
  private readonly spoolPath = join(process.cwd(), "var/spool/analytics-events.ndjson");
  private readonly spoolDrainingPath = `${this.spoolPath}.draining`;
  /** Single-flight guard: a slow drain (many pending lines) must not overlap
   *  the next @Interval tick. */
  private draining = false;
  private lastCapWarnAt = 0;

  constructor(config: ConfigService) {
    this.ingestKey = config.get<string>("INGEST_SHARED_SECRET") || "";
  }

  /** Forward one batch. Never throws and never makes the caller wait past the
   *  timeout: on failure it spools the payload and resolves null, which the
   *  controller turns into a plain 200 with no token (the client just
   *  re-resolves on its next batch — not an error). */
  async forward(payload: IngestPayload): Promise<IngestResponse | null> {
    const body = JSON.stringify(payload);
    const res = await this.post(body);
    if (res) return res;
    await this.spool(body);
    return null;
  }

  private async post(body: string): Promise<IngestResponse | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);
    try {
      const res = await fetch(INGEST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Ingest-Key": this.ingestKey },
        body,
        signal: controller.signal,
      });
      if (!res.ok) return null;
      const json = (await res.json().catch(() => ({}))) as { tok?: unknown };
      return { tok: typeof json.tok === "string" ? json.tok : undefined };
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  private async spool(body: string): Promise<void> {
    try {
      const size = await stat(this.spoolPath)
        .then((s) => s.size)
        .catch(() => 0);
      if (size >= MAX_SPOOL_BYTES) {
        const now = Date.now();
        if (now - this.lastCapWarnAt > CAP_WARN_COOLDOWN_MS) {
          this.lastCapWarnAt = now;
          this.logger.warn(
            `analytics spool at cap (${Math.round(size / 1024 / 1024)}MB) — dropping events until it drains; iq-metrix may be down`,
          );
        }
        return;
      }
      await mkdir(dirname(this.spoolPath), { recursive: true });
      await appendFile(this.spoolPath, body + "\n", "utf8");
    } catch (e) {
      this.logger.warn(`analytics spool write failed: ${String(e)}`);
    }
  }

  /** Drains the spool roughly every 10s: send each pending line, requeue only
   *  the ones that still fail. The live file is renamed aside first so a
   *  request that spools mid-drain lands in a fresh file instead of racing
   *  this read — no read-modify-write window on the file requests append to. */
  @Interval(DRAIN_INTERVAL_MS)
  async drain(): Promise<void> {
    if (this.draining) return;
    this.draining = true;
    try {
      await this.drainOnce();
    } catch (e) {
      this.logger.warn(`analytics spool drain failed: ${String(e)}`);
    } finally {
      this.draining = false;
    }
  }

  private async drainOnce(): Promise<void> {
    try {
      await rename(this.spoolPath, this.spoolDrainingPath);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return; // nothing spooled
      throw e;
    }
    const raw = await readFile(this.spoolDrainingPath, "utf8").catch(() => "");
    await unlink(this.spoolDrainingPath).catch(() => {});
    const lines = raw
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return;

    let sent = 0;
    const pending: string[] = [];
    for (const line of lines) {
      const res = await this.post(line);
      if (res) sent++;
      else pending.push(line);
    }

    if (pending.length > 0) {
      // Appended (not merged in read-modify-write) so it can't clobber lines a
      // concurrent request spooled to the live file during this drain.
      await appendFile(this.spoolPath, pending.join("\n") + "\n", "utf8").catch((e) => {
        this.logger.warn(`analytics spool requeue failed, ${pending.length} event(s) dropped: ${String(e)}`);
      });
      this.logger.warn(`analytics spool: drained ${sent}/${lines.length}, ${pending.length} still pending`);
    } else if (sent > 0) {
      this.logger.log(`analytics spool: drained ${sent} pending event(s)`);
    }
  }
}
