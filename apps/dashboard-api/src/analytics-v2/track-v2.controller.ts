import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Logger, Post, Req } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Throttle, seconds, minutes } from "@nestjs/throttler";
import type { Request } from "express";
import { isbot } from "isbot";
import type { SessionNew } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { AnalyticsSaltService } from "./salt.service";
import { VisitService } from "./visit.service";
import { VisitorIdentityService } from "./identity.service";
import { clientNetwork, clientUa, hashEntropy, visitSeed } from "./request-facts";
import { sessionHash } from "./session-hash";
import { signVisitToken, verifyVisitToken } from "./visit-token";

// page / action / name: short human-readable English labels ("Home", "Click",
// "Header SignIn"). Free-form by design — no enums.
const LABEL_REGEX = /^[A-Za-z0-9][A-Za-z0-9 _\-./+]{0,63}$/;
// Names carry the detail (error slugs especially), so they get more room. `%`
// is in the set because scroll-depth names read "Hero - Pricing (75%)".
const NAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9 _\-./+()#:,'%]{0,119}$/;
const FBCLID_REGEX = /^[A-Za-z0-9_.-]{1,512}$/;
const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
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

// Server-side clients (curl/axios/headless) and crawlers that `isbot` misses.
// Unlike the generic heuristic below, a paid click does NOT buy an exemption
// from this list — nothing that identifies itself as a script is a real visit.
const HARD_BOT_UA_REGEX =
  /axios\/|node-fetch|got\/|http_request|httpclient|java\/|okhttp|libwww|lwp-trivial|HttpClient|Apache-HttpClient|python-requests|curl\/|wget|HeadlessChrome|PhantomJS|Screaming Frog|Sitebulb/i;
// Crawlers proper. A request carrying a paid click id is exempt from these:
// ad-network click checkers and in-app webviews routinely look like bots, and
// losing an ad click loses the conversion.
const CRAWLER_UA_REGEX =
  /AdsBot|Google-InspectionTool|GoogleOther|APIs-Google|FeedFetcher-Google|Storebot-Google|GoogleProducer|ChromeOS-Default-Bot/i;

interface TrackCtx {
  fbclid?: unknown;
  gclid?: unknown;
  gbraid?: unknown;
  wbraid?: unknown;
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
  /** Visit continuation token echoed from a previous response (see
   *  visit-token.ts) — pins the batch to its visit across mid-visit hash
   *  flaps. Held by the client in page memory only. */
  tok?: unknown;
}

interface Aid {
  aid: string;
  atype: "F" | "G";
  aidField: "fbclid" | "gclid" | "gbraid" | "wbraid";
}

interface ParsedEvent {
  page: string;
  action: string;
  name: string;
  at: Date | null;
  locale: string | null;
}

/** Pick the paid click id out of ctx. fbclid wins over the Google family (a URL
 *  carrying both is malformed anyway); within Google, gclid > gbraid > wbraid. */
function resolveAid(ctx: TrackCtx): Aid | null {
  const fbclid = typeof ctx.fbclid === "string" && FBCLID_REGEX.test(ctx.fbclid) ? ctx.fbclid : null;
  if (fbclid) return { aid: fbclid, atype: "F", aidField: "fbclid" };
  for (const field of ["gclid", "gbraid", "wbraid"] as const) {
    const v = ctx[field];
    if (typeof v === "string" && GCLID_REGEX.test(v)) return { aid: v, atype: "G", aidField: field };
  }
  return null;
}

/** Buffered events arrive together; spacing the fallbacks 1ms apart keeps them
 *  in the order the visitor produced them. */
function clampToVisit(at: Date | null, firstAt: Date, now: Date, index: number): Date {
  const fallback = new Date(now.getTime() + index);
  if (!at) return fallback;
  return at < firstAt ? firstAt : at;
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

@Controller()
export class TrackV2Controller {
  private readonly logger = new Logger(TrackV2Controller.name);
  /** HMAC key for visit continuation tokens. Shares JWT_SECRET with the device
   *  tokens (domain-separated inside visit-token.ts); empty disables tokens —
   *  the pipeline degrades to pure hash matching, nothing breaks. */
  private readonly tokenSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly salt: AnalyticsSaltService,
    private readonly visits: VisitService,
    private readonly identity: VisitorIdentityService,
    config: ConfigService,
  ) {
    this.tokenSecret = config.get<string>("JWT_SECRET") || "";
  }

  /** The one ingest path (`POST /api/e`). Deliberately not named "track": that
   *  word is a literal entry in the common ad-blocker filter lists, and a
   *  blocked first batch loses the visit's ad attribution for good. */
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
    const aid = resolveAid(ctx);

    const ua = clientUa(req);
    if (!ua || HARD_BOT_UA_REGEX.test(ua)) return {};
    // A paid click is exempt from the crawler heuristics only — every ad click
    // must be recorded regardless of how odd its UA looks.
    if (!aid && (isbot(ua) || CRAWLER_UA_REGEX.test(ua))) return {};

    // One identity resolution per batch, not per event.
    const who = await this.identity.resolve(req);
    if (who.skip) return {};

    // A batch carrying a valid continuation token lands on its own visit row
    // directly — immune to the hash flapping mid-visit (mobile network prefix
    // or Cloudflare region changing between batches).
    let session: SessionNew | null = null;
    if (this.tokenSecret && typeof body.tok === "string") {
      const sid = verifyVisitToken(body.tok, this.tokenSecret, now);
      if (sid) session = await this.visits.continueVisit(sid, who.userId, now);
    }

    if (!session) {
      // Raw IP and raw UA live only on this stack frame — hashed and derived,
      // never stored.
      const network = clientNetwork(req);
      const entropy = hashEntropy(req);
      const hash = sessionHash(await this.salt.getSalt(), network, ua, entropy);
      session = await this.visits.resolveVisit(hash, who.userId, visitSeed(req), now);
      // TEMP diagnostic (remove once hash inputs are tuned): every fresh visit
      // logs its coarse hash inputs, so a split visitor shows up as two
      // creations whose logged inputs differ in exactly the flapping field.
      // No raw IP here — `network` is already the /24 / /64 prefix.
      if (session.firstAt.getTime() === now.getTime()) {
        this.logger.log(
          `visit created ${session.id} hash=${hash.slice(0, 10)} net=${network} entropy=${entropy}`,
        );
      }
    }

    await this.visits.enrich(session, {
      from: typeof ctx.from === "string" && FROM_REGEX.test(ctx.from) ? ctx.from : null,
      ref: typeof ctx.ref === "string" && HOST_REGEX.test(ctx.ref) ? ctx.ref.toLowerCase() : null,
      theme: typeof ctx.theme === "string" && THEME_REGEX.test(ctx.theme) ? ctx.theme : null,
      aid,
    }, now);

    await this.prisma.eventNew.createMany({
      // Clients stamp each event with the moment it happened; a batch can sit
      // in the buffer for seconds (longer if it had to be retried).
      data: events.map((e, i) => ({
        sessionId: session.id,
        page: e.page,
        action: e.action,
        name: e.name,
        restaurantId: who.restaurantId,
        locale: e.locale,
        // Client time, but never before the visit it lands on. A buffer that
        // survived a long offline stretch arrives with timestamps from a visit
        // that has since been closed by the 30-minute cut, and an event dated
        // before its own session's firstAt corrupts every "first page" and
        // first-touch-venue aggregate the admin computes by ordering on `at`.
        at: clampToVisit(e.at, session.firstAt, now, i),
      })),
    });

    // Fresh token every response: its liveness window slides with the visit's
    // lastAt, and the beacon/keepalive callers that cannot read a body simply
    // keep their previous one.
    return this.tokenSecret ? { v: signVisitToken(session.id, this.tokenSecret, now) } : {};
  }
}
