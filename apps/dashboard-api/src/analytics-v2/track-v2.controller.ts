import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { Throttle, seconds, minutes } from "@nestjs/throttler";
import type { Request } from "express";
import { isbot } from "isbot";
import { PrismaService } from "../prisma/prisma.service";
import { AnalyticsSaltService } from "./salt.service";
import { VisitService } from "./visit.service";
import { VisitorIdentityService } from "./identity.service";
import { clientIp, clientUa, hashEntropy, visitSeed } from "./request-facts";
import { sessionHash } from "./session-hash";

// page / action / name: short human-readable English labels ("Home", "Click",
// "Header SignIn"). Free-form by design — no enums.
const LABEL_REGEX = /^[A-Za-z0-9][A-Za-z0-9 _\-./+]{0,63}$/;
// Names carry the detail (error slugs especially), so they get more room.
const NAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9 _\-./+()#:,']{0,119}$/;
const FBCLID_REGEX = /^[A-Za-z0-9_.-]{1,512}$/;
const GCLID_REGEX = /^[A-Za-z0-9_-]{1,256}$/;
const FROM_REGEX = /^[A-Za-z0-9_.-]{1,64}$/;
const HOST_REGEX = /^[a-z0-9.-]{1,253}$/i;
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
}

interface RawEvent {
  page?: unknown;
  action?: unknown;
  name?: unknown;
  /** Epoch ms the event actually happened, stamped by the client. Batching
   *  means the request time says nothing about when the events occurred. */
  ts?: unknown;
}

interface TrackBody extends RawEvent {
  /** Batch form. Single-event form (page/action/name at the top level) is also
   *  accepted so a page can fire one event without buffering. */
  events?: unknown;
  ctx?: TrackCtx;
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
  return { page, action, name, at: parseTs(raw.ts, now) };
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

@Controller("v2")
export class TrackV2Controller {
  constructor(
    private readonly prisma: PrismaService,
    private readonly salt: AnalyticsSaltService,
    private readonly visits: VisitService,
    private readonly identity: VisitorIdentityService,
  ) {}

  /** Current ingest path. Deliberately not named "track": the old path is a
   *  literal entry in the common ad-blocker filter lists, and a blocked first
   *  batch loses the visit's ad attribution for good. */
  @Throttle({
    burst: { ttl: seconds(1), limit: 10 },
    sustained: { ttl: minutes(1), limit: 200 },
  })
  @Post("e")
  @HttpCode(HttpStatus.NO_CONTENT)
  async ingest(@Body() body: unknown, @Req() req: Request) {
    return this.handle(body, req);
  }

  /** Legacy path. Landing and dashboard bundles are deployed separately from
   *  the API, and already-open tabs keep the old bundle for as long as they
   *  stay open — dropping this route would silently bin their events. */
  @Throttle({
    burst: { ttl: seconds(1), limit: 10 },
    sustained: { ttl: minutes(1), limit: 200 },
  })
  @Post("track")
  @HttpCode(HttpStatus.NO_CONTENT)
  async track(@Body() body: unknown, @Req() req: Request) {
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
    if (!ua || HARD_BOT_UA_REGEX.test(ua)) return;
    // A paid click is exempt from the crawler heuristics only — every ad click
    // must be recorded regardless of how odd its UA looks.
    if (!aid && (isbot(ua) || CRAWLER_UA_REGEX.test(ua))) return;

    // One identity resolution per batch, not per event.
    const who = await this.identity.resolve(req);
    if (who.skip) return;

    // Raw IP and raw UA live only on this stack frame — hashed and derived,
    // never stored.
    const ip = clientIp(req);
    const hash = sessionHash(await this.salt.getSalt(), ip, ua, hashEntropy(req));

    const session = await this.visits.resolveVisit(hash, who.userId, visitSeed(req), now);

    await this.visits.enrich(session, {
      from: typeof ctx.from === "string" && FROM_REGEX.test(ctx.from) ? ctx.from : null,
      ref: typeof ctx.ref === "string" && HOST_REGEX.test(ctx.ref) ? ctx.ref.toLowerCase() : null,
      aid,
    }, now);

    await this.prisma.eventNew.createMany({
      // Clients stamp each event with the moment it happened; a batch can sit
      // in the buffer for seconds (longer if it had to be retried). Events with
      // no usable stamp fall back to arrival order, 1ms apart.
      data: events.map((e, i) => ({
        sessionId: session.id,
        page: e.page,
        action: e.action,
        name: e.name,
        restaurantId: who.restaurantId,
        at: e.at ?? new Date(now.getTime() + i),
      })),
    });
  }
}
