import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { randomBytes } from "crypto";
import { PrismaService } from "../prisma/prisma.service";

const SALT_ROW_ID = "current";
// Rotation boundary: 04:00 Europe/Madrid — the dead hour for the EU audience
// (public menus peak at lunch/dinner, dashboards during the day), so a session
// cut by the salt change is a rare statistical blip.
const ROTATION_HOUR = 4;
// In-memory cache TTL — the ingest path must not hit the DB for the salt on
// every event.
const CACHE_TTL_MS = 60_000;

/** Salt-day key: the Madrid calendar date of (t − 4h). Two timestamps share a
 *  salt iff they fall between the same pair of 04:00-Madrid boundaries. */
function saltPeriodKey(t: Date): string {
  const shifted = new Date(t.getTime() - ROTATION_HOUR * 3600_000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(shifted);
}

interface SaltRow {
  value: string;
  rotatedAt: Date;
}

@Injectable()
export class AnalyticsSaltService implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsSaltService.name);
  private cache: { value: string; readAt: number } | null = null;
  /** Single-flight guard. Two requests arriving together just after a boundary
   *  would otherwise both rotate, and the second overwrite would orphan every
   *  hash the first one produced. dashboard-api runs as a single fork process
   *  (the crons require it), so an in-process guard is sufficient. */
  private rotating: Promise<SaltRow> | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit(): Promise<void> {
    // A deploy/restart may cross a rotation boundary the cron never saw.
    await this.getSalt().catch((e) => this.logger.error(`salt init failed: ${String(e)}`));
  }

  /** Current salt. Rotates lazily if the stored one is from a previous
   *  salt-day (covers restarts and cron misses). */
  async getSalt(): Promise<string> {
    const now = Date.now();
    if (this.cache && now - this.cache.readAt < CACHE_TTL_MS) return this.cache.value;

    let row: SaltRow | null = await this.prisma.analyticsSalt.findUnique({ where: { id: SALT_ROW_ID } });
    if (!row || saltPeriodKey(row.rotatedAt) !== saltPeriodKey(new Date())) {
      row = await this.rotateOnce();
    }
    this.cache = { value: row.value, readAt: now };
    return row.value;
  }

  @Cron("0 4 * * *", { timeZone: "Europe/Madrid" })
  async rotateDaily(): Promise<void> {
    try {
      await this.rotateOnce();
    } catch (e) {
      this.logger.error(`salt rotation failed: ${String(e)}`);
    }
  }

  /** Rotate at most once per salt-day, no matter how many callers race. */
  private rotateOnce(): Promise<SaltRow> {
    if (this.rotating) return this.rotating;
    this.rotating = this.rotate().finally(() => {
      this.rotating = null;
    });
    return this.rotating;
  }

  /** Overwrite the singleton with a fresh random salt. The overwrite destroys
   *  the previous salt — that is what makes yesterday's hashes unlinkable. */
  private async rotate(): Promise<SaltRow> {
    // Re-check under the guard: the caller may have queued behind a rotation
    // that already moved us into the current salt-day.
    const existing = await this.prisma.analyticsSalt.findUnique({ where: { id: SALT_ROW_ID } });
    if (existing && saltPeriodKey(existing.rotatedAt) === saltPeriodKey(new Date())) {
      this.cache = { value: existing.value, readAt: Date.now() };
      return existing;
    }

    const row = await this.prisma.analyticsSalt.upsert({
      where: { id: SALT_ROW_ID },
      create: { id: SALT_ROW_ID, value: randomBytes(32).toString("hex"), rotatedAt: new Date() },
      update: { value: randomBytes(32).toString("hex"), rotatedAt: new Date() },
    });
    this.cache = { value: row.value, readAt: Date.now() };
    this.logger.log("analytics salt rotated");
    return row;
  }
}
