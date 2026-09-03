import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Throttle, seconds, minutes } from "@nestjs/throttler";
import type { Request } from "express";
import { isbot } from "isbot";
import { clientIp } from "../common/client-ip";
import { VisitorIdentityService } from "./identity.service";
import { IngestRelayService, type IngestPayload } from "./ingest-relay.service";

// page / action / name: short human-readable English labels ("Home", "Click",
// "Header SignIn"). Free-form by design — no enums.
const LABEL_REGEX = /^[A-Za-z0-9][A-Za-z0-9 _\-./+]{0,63}$/;
// Names carry the detail (error slugs especially), so they get more room. `%`
// is in the set because scroll-depth names read "Hero - Pricing (75%)".
const NAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9 _\-./+()#:,'%]{0,119}$/;
const FROM_REGEX = /^[A-Za-z0-9_.-]{1,64}$/;
const HOST_REGEX = /^[a-z0-9.-]{1,253}$/i;
// Client's prefers-color-scheme. Fixed set, not free text.
const THEME_REGEX = /^(dark|light)$/;
// Rendered locale of the page the event happened on. Landing locales are plain
// two-letter codes; the bound is generous so a regional variant would still
// pass rather than silently drop the whole event's locale.
const LOCALE_REGEX = /^[a-z]{2}(?:-[a-z]{2})?$/i;
const MAX_EVENTS_PER_BATCH = 50;
const MAX_BODY_CHARS = 64_000;

// How far a client-supplied event timestamp may sit from server time before we
// stop believing it. Batches are retried with backoff, so a few minutes of lag
// is normal; anything beyond this is a broken clock.
const TS_MAX_PAST_MS = 6 * 3600_000;
const TS_MAX_FUTURE_MS = 60_000;

// Server-side clients (curl/axios/headless) and crawlers that `isbot` misses —
// nothing that identifies itself as a script is a real visit.
const HARD_BOT_UA_REGEX =
  /axios\/|node-fetch|got\/|http_request|httpclient|java\/|okhttp|libwww|lwp-trivial|HttpClient|Apache-HttpClient|python-requests|curl\/|wget|HeadlessChrome|PhantomJS|Screaming Frog|Sitebulb/i;
// Crawlers proper.
const CRAWLER_UA_REGEX =
  /AdsBot|Google-InspectionTool|GoogleOther|APIs-Google|FeedFetcher-Google|Storebot-Google|GoogleProducer|ChromeOS-Default-Bot/i;

// Raw signals forwarded to iq-metrix beyond ip/ua: Accept-Language plus
// Cloudflare's geo headers. iq-metrix now does its own hashing/geo derivation
// (what request-facts.ts used to do here), so these ride over unprocessed
// instead of being derived locally.
const FORWARD_HEADER_NAMES = ["accept-language", "cf-ipcountry", "cf-region", "cf-ipcity"] as const;

interface TrackCtx {
  from?: unknown;
  ref?: unknown;
  theme?: unknown;
}

interface RawEvent {
  page?: unknown;
  action?: unknown;
  name?: unknown;
  /** Epoch ms the event actually happened, stamped by the client. Batching
   *  means the request time says nothing about when the events occurred. */
  ts?: unknown;
  /** Locale the page was rendered in. Per-event, not per-batch: a batch can
   *  survive a locale switch. */
  loc?: unknown;
}

interface TrackBody extends RawEvent {
  /** Batch form. Single-event form (page/action/name at the top level) is also
   *  accepted so a page can fire one event without buffering. */
  events?: unknown;
  ctx?: TrackCtx;
  /** Visit continuation token echoed from a previous response, forwarded to
   *  iq-metrix verbatim — this app no longer mints or verifies it. */
  tok?: unknown;
}

interface ParsedEvent {
  page: string;
  action: string;
  name: string;
  at: Date | null;
  locale: string | null;
}

function parseTs(raw: unknown, now: Date): Date | null {
  if (typeof raw !== "number" || !Number.isFinite(raw)) return null;
  const delta = now.getTime() - raw;
  if (delta > TS_MAX_PAST_MS || delta < -TS_MAX_FUTURE_MS) return null;
  return new Date(raw);
}

function parseEvent(raw: RawEvent, now: Date): ParsedEvent | null {
  const page = typeof raw.page === "string" && LABEL_REGEX.test(raw.page) ? raw.page : null;
  const action = typeof raw.action === "string" && LABEL_REGEX.test(raw.action) ? raw.action : null;
  const name = typeof raw.name === "string" && NAME_REGEX.test(raw.name) ? raw.name : null;
  if (!page || !action || !name) return null;
  const locale =
    typeof raw.loc === "string" && LOCALE_REGEX.test(raw.loc) ? raw.loc.toLowerCase() : null;
  return { page, action, name, at: parseTs(raw.ts, now), locale };
}

/** The transport sends `text/plain` so the request stays CORS-simple (no
 *  preflight, and `navigator.sendBeacon` can carry it during page teardown), so
 *  the body arrives as a string. JSON posts are still accepted. */
function parseBody(body: unknown): TrackBody {
  if (typeof body === "string") {
    if (body.length > MAX_BODY_CHARS) throw new BadRequestException("body too large");
    try {
      const parsed: unknown = JSON.parse(body);
      return parsed && typeof parsed === "object" ? (parsed as TrackBody) : {};
    } catch {
      throw new BadRequestException("body invalid");
    }
  }
  return body && typeof body === "object" ? (body as TrackBody) : {};
}

/** Buffered events land together; spacing missing timestamps 1ms apart keeps
 *  them in the order the visitor produced them once no local session start
 *  exists to clamp them against (that clamping lived in visit.service.ts,
 *  which moved to iq-metrix with the rest of the visit logic). */
function eventAt(at: Date | null, now: Date, index: number): Date {
  return at ?? new Date(now.getTime() + index);
}

function clientUa(req: Request): string {
  const v = req.headers["user-agent"];
  return typeof v === "string" ? v : "";
}

function rawHeaders(req: Request): Record<string, string> | undefined {
  const out: Record<string, string> = {};
  for (const name of FORWARD_HEADER_NAMES) {
    const v = req.headers[name];
    if (typeof v === "string" && v) out[name] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

@Controller()
export class TrackV2Controller {
  private readonly landingOrigin: string;
  private readonly dashboardOrigin: string;

  constructor(
    private readonly identity: VisitorIdentityService,
    private readonly relay: IngestRelayService,
    config: ConfigService,
  ) {
    // Same env vars + fallbacks auth.controller.ts / mail.service.ts already
    // use for these two origins.
    this.landingOrigin = config.get<string>("LANDING_URL") || "https://iq-rest.com";
    this.dashboardOrigin = config.get<string>("DASHBOARD_URL") || "https://dashboard.iq-rest.com";
  }

  /** Both landing and dashboard-web post here cross-origin with
   *  `credentials: "include"`, so the browser always attaches Origin even
   *  though the simple-request body avoids a preflight. Exact match against
   *  the same two origins CORS already trusts (see main.ts enableCors) — not
   *  guessed, and undefined (not a fragile default) when neither matches. */
  private resolveApp(req: Request): string | undefined {
    const origin = req.headers.origin;
    if (origin === this.landingOrigin) return "landing";
    if (origin === this.dashboardOrigin) return "dashboard-web";
    return undefined;
  }

  /** The one ingest path (`POST /api/e`). Deliberately not named "track": that
   *  word is a literal entry in the common ad-blocker filter lists, and a
   *  blocked first batch loses the visit's first-touch attribution for good. */
  @Throttle({
    burst: { ttl: seconds(1), limit: 10 },
    sustained: { ttl: minutes(1), limit: 200 },
  })
  @Post("e")
  @HttpCode(HttpStatus.OK)
  async ingest(@Body() body: unknown, @Req() req: Request) {
    return this.handle(body, req);
  }

  private async handle(rawBody: unknown, req: Request) {
    const now = new Date();
    const body = parseBody(rawBody);

    const rawEvents: RawEvent[] = Array.isArray(body.events)
      ? (body.events as RawEvent[]).slice(0, MAX_EVENTS_PER_BATCH)
      : [body];
    const events = rawEvents
      .map((e) => (e && typeof e === "object" ? parseEvent(e, now) : null))
      .filter((e): e is ParsedEvent => e !== null);
    if (events.length === 0) throw new BadRequestException("event invalid");

    const ctx: TrackCtx = body.ctx && typeof body.ctx === "object" ? body.ctx : {};

    const ua = clientUa(req);
    if (!ua || HARD_BOT_UA_REGEX.test(ua)) return {};
    if (isbot(ua) || CRAWLER_UA_REGEX.test(ua)) return {};

    // One identity resolution per batch, not per event. iq-metrix has no
    // access to this product's cookies/DB, so identity stays resolved here
    // and only the result (email, restaurant) rides along in the payload.
    const who = await this.identity.resolve(req);
    if (who.skip) return {};

    const from = typeof ctx.from === "string" && FROM_REGEX.test(ctx.from) ? ctx.from : undefined;
    const ref = typeof ctx.ref === "string" && HOST_REGEX.test(ctx.ref) ? ctx.ref.toLowerCase() : undefined;
    const theme = typeof ctx.theme === "string" && THEME_REGEX.test(ctx.theme) ? ctx.theme : undefined;
    const meta =
      who.restaurantId || from || ref || theme
        ? {
            ...(who.restaurantId ? { restaurantId: who.restaurantId } : {}),
            ...(from ? { from } : {}),
            ...(ref ? { ref } : {}),
            ...(theme ? { theme } : {}),
          }
        : undefined;

    const payload: IngestPayload = {
      site: "iq-rest",
      app: this.resolveApp(req),
      ip: clientIp(req),
      ua,
      headers: rawHeaders(req),
      email: who.email,
      meta,
      tok: typeof body.tok === "string" ? body.tok : undefined,
      events: events.map((e, i) => ({
        page: e.page,
        action: e.action,
        name: e.name,
        locale: e.locale,
        at: eventAt(e.at, now, i).toISOString(),
      })),
    };

    // Relay handles its own timeout + spool-on-failure; a failed/slow forward
    // still answers the client with a plain 200 (no token — it just re-resolves
    // on the next batch), never an error.
    const res = await this.relay.forward(payload);
    return res?.tok ? { v: res.tok } : {};
  }
}
