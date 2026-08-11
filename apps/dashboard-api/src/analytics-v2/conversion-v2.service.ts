import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { Prisma, SessionNew } from "@iq-rest/db";
import { GoogleAdsApi, enums } from "google-ads-api";
import { createHash } from "crypto";
import type { Request } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { AnalyticsSaltService } from "./salt.service";
import { VisitService } from "./visit.service";
import { sessionHash } from "./session-hash";
import { clientNetwork, clientUa, hashEntropy, visitSeed, type VisitSeed } from "./request-facts";

// The v2 pipeline reports exactly ONE conversion to both ad networks: the
// completed registration. No ViewContent / InitiateCheckout / demo events.
const EVENT_NAME = "CompleteRegistration";
// Give up on a (session, network) after this many error rows. The hourly sweep
// keeps retrying until then, within a 7-day window — both ad networks reject
// conversions much older than the click anyway.
const MAX_ERRORS = 8;
const SWEEP_WINDOW_DAYS = 7;
// Safety valve on the hourly sweep: the candidate set is "registrations from
// the last week that carry a click id and have no success row yet", which is
// tiny in practice. A cap keeps a data anomaly from turning the cron into a
// long-running loop against the ad APIs.
const SWEEP_MAX_SESSIONS = 500;
/** Marks a visit as one where a registration actually happened. Written by
 *  handleRegistration; the sweep refuses to report a conversion without it. */
const REGISTER_ACTION = "Register";
/** How far back a registration may reach for the click that produced it. Long
 *  enough to cover "clicked the ad, went to fetch the emailed code, came back",
 *  short enough that it cannot pick up an unrelated click from hours earlier on
 *  a shared network. */
const CLICK_LOOKBACK_MS = 2 * 3600_000;

function hashField(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function isDemoEmail(email: string | null | undefined): boolean {
  return !!email && (email === "demo@iq-rest.com" || email.startsWith("demo+"));
}

export type RegistrationSource = "OTP" | "Google" | "Apple";

@Injectable()
export class ConversionV2Service {
  private readonly logger = new Logger(ConversionV2Service.name);
  private customerCache: ReturnType<GoogleAdsApi["Customer"]> | null = null;
  private sweepRunning = false;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly salt: AnalyticsSaltService,
    private readonly visits: VisitService,
  ) {}

  /**
   * Fire-and-forget hook for the auth endpoints: a brand-new account was just
   * created by this request. Links the anonymous visit to the account
   * (same-visit stitch), records the registration event, and — when the visit
   * carries a paid click id — sends the conversion instantly.
   *
   * Takes the whole request so the visit is derived exactly the way the ingest
   * controller derives it; hashing a different set of facts here would land the
   * registration on a different visit than the pageviews that produced it.
   */
  onRegistration(req: Request, userId: string, email: string, source: RegistrationSource): void {
    const facts = {
      network: clientNetwork(req),
      ua: clientUa(req),
      entropy: hashEntropy(req),
      seed: visitSeed(req),
    };
    void this.handleRegistration(facts, userId, email, source).catch((e) =>
      this.logger.error(`registration conversion failed for ${userId}: ${String(e)}`),
    );
  }

  private async handleRegistration(
    facts: { network: string; ua: string; entropy: string; seed: VisitSeed },
    userId: string,
    email: string,
    source: RegistrationSource,
  ): Promise<void> {
    const now = new Date();
    const hash = sessionHash(await this.salt.getSalt(), facts.network, facts.ua, facts.entropy);
    // Promotes the anonymous visit in place, so the ad click that started it
    // keeps its events and its firstAt. If there is no live visit (tracking
    // blocked, or the signup came in from somewhere we never saw), a row is
    // created from this request's own facts rather than an empty placeholder.
    const session = await this.visits.resolveVisit(hash, userId, facts.seed, now);


    const link = await this.prisma.restaurantUser.findFirst({
      where: { userId },
      orderBy: { addedAt: "asc" },
      select: { restaurantId: true },
    });
    await this.prisma.eventNew.create({
      data: {
        sessionId: session.id,
        page: "Auth",
        action: REGISTER_ACTION,
        name: source,
        restaurantId: link?.restaurantId ?? null,
      },
    });

    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { isDemo: true } });
    // The sweep already refuses demo accounts on both counts; the instant path
    // used to check only the address, so a DB-flagged demo with a real-looking
    // address still reported a conversion.
    if (user?.isDemo || isDemoEmail(email)) return;

    const attributed = session.aid ? session : await this.borrowClick(session, hash, now);
    if (!attributed) return;
    await this.sendForSession(attributed, email, userId);
  }

  /**
   * A registration can land on a visit that carries no click id: visits are cut
   * after 30 idle minutes, and someone who clicks an ad, waits for the OTP mail
   * and signs up an hour later registers on a second visit. The click sits on
   * the first one, so without this the conversion is simply never reported —
   * and the sweep cannot rescue it either, because it needs the click id and
   * the Register event on the same row.
   *
   * The lookup is by device hash, which only exists within one salt-day, so
   * this cannot reach across days — the same boundary the rest of the pipeline
   * respects.
   */
  private async borrowClick(session: SessionNew, hash: string, now: Date): Promise<SessionNew | null> {
    const earlier = await this.prisma.sessionNew.findFirst({
      where: {
        hash,
        aid: { not: null },
        id: { not: session.id },
        clickAt: { gte: new Date(now.getTime() - CLICK_LOOKBACK_MS) },
      },
      orderBy: { clickAt: "desc" },
    });
    if (!earlier?.aid) return null;

    // Stamp it onto the registration's own visit so the admin shows the source
    // on the row that has the Register event, and so the hourly sweep can pick
    // this up if the instant send fails.
    const updated = await this.prisma.sessionNew.update({
      where: { id: session.id },
      data: {
        aid: earlier.aid,
        atype: earlier.atype,
        aidField: earlier.aidField,
        clickAt: earlier.clickAt,
      },
    });
    this.logger.log(`visit ${session.id} inherited the click from ${earlier.id}`);
    return updated;
  }

  /** Send the registration conversion for a session to its ad network, unless
   *  the journal says it already succeeded or is given up on. */
  private async sendForSession(session: SessionNew, email: string | null, userId: string | null): Promise<void> {
    if (!session.aid || !session.atype) return;
    const network = session.atype === "F" ? "meta" : "google";

    const journal = await this.prisma.conversionSendNew.findMany({
      where: { sessionId: session.id, network },
      select: { status: true },
    });
    if (journal.some((j) => j.status === "success")) return;
    if (journal.filter((j) => j.status === "error").length >= MAX_ERRORS) return;

    try {
      if (network === "meta") await this.sendMeta(session, email, userId);
      else await this.sendGoogle(session, email);
    } catch (e) {
      this.logger.warn(`${network} conversion send failed for session ${session.id}: ${String(e)}`);
    }
  }

  private async sendMeta(session: SessionNew, email: string | null, userId: string | null): Promise<void> {
    const token = this.config.get<string>("FB_ADS_TOKEN");
    const pixelId = this.config.get<string>("FB_ADS_PIXEL_ID");
    if (!token || !pixelId || !session.aid) return;

    const clickMs = session.clickAt ? session.clickAt.getTime() : Date.now();
    const userData: Record<string, unknown> = { fbc: `fb.1.${clickMs}.${session.aid}` };
    if (email) userData.em = [hashField(email)];
    if (userId) userData.external_id = [hashField(userId)];
    const sourceUrl =
      (this.config.get<string>("LANDING_URL") || "https://iq-rest.com").replace(/\/$/, "") + "/";

    let status = "error";
    let response: unknown = {};
    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                event_name: EVENT_NAME,
                event_time: Math.floor(Date.now() / 1000),
                // Stable per-click id so Meta dedups our own retries.
                event_id: createHash("sha256").update(`${session.aid}:${EVENT_NAME}`).digest("hex"),
                action_source: "website",
                event_source_url: sourceUrl,
                user_data: userData,
              },
            ],
          }),
        },
      );
      response = await res.json().catch(() => ({}));
      status = res.ok ? "success" : "error";
    } catch (e) {
      response = { error: String(e) };
    }
    await this.journal(session.id, "meta", status, response);
    if (status === "success") this.logger.log(`meta ${EVENT_NAME} sent for session ${session.id}`);
  }

  /** Record the attempt. Swallows its own failure on purpose — but loudly: the
   *  error counter that eventually gives up on a session lives in this table,
   *  so a silently missing row would mean retrying that session forever. */
  private async journal(sessionId: string, network: string, status: string, response: unknown): Promise<void> {
    try {
      await this.prisma.conversionSendNew.create({
        data: { sessionId, network, status, response: response as Prisma.InputJsonValue },
      });
    } catch (e) {
      this.logger.error(`could not journal the ${network} send for session ${sessionId}: ${String(e)}`);
    }
  }

  /** Format a timestamp for Google's conversion_date_time:
   *  "yyyy-MM-dd HH:mm:ss+HH:MM" in Europe/Madrid (the account timezone). */
  private madridDateTime(ms: number): string {
    const d = new Date(ms);
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Madrid",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).formatToParts(d);
    const p = (t: string) => parts.find((x) => x.type === t)!.value;
    const asUtc = Date.UTC(+p("year"), +p("month") - 1, +p("day"), +p("hour") === 24 ? 0 : +p("hour"), +p("minute"), +p("second"));
    const offMin = Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
    const sign = offMin >= 0 ? "+" : "-";
    const abs = Math.abs(offMin);
    const oh = String(Math.floor(abs / 60)).padStart(2, "0");
    const om = String(abs % 60).padStart(2, "0");
    const hh = p("hour") === "24" ? "00" : p("hour");
    return `${p("year")}-${p("month")}-${p("day")} ${hh}:${p("minute")}:${p("second")}${sign}${oh}:${om}`;
  }

  private getCustomer() {
    if (this.customerCache) return this.customerCache;
    const client = new GoogleAdsApi({
      client_id: this.config.get<string>("GOOGLE_ADS_CLIENT_ID")!,
      client_secret: this.config.get<string>("GOOGLE_ADS_CLIENT_SECRET")!,
      developer_token: this.config.get<string>("GOOGLE_ADS_DEVELOPER_TOKEN")!,
    });
    this.customerCache = client.Customer({
      customer_id: this.config.get<string>("GOOGLE_ADS_CUSTOMER_ID")!,
      login_customer_id: this.config.get<string>("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
      refresh_token: this.config.get<string>("GOOGLE_ADS_REFRESH_TOKEN")!,
    });
    return this.customerCache;
  }

  private async sendGoogle(session: SessionNew, email: string | null): Promise<void> {
    const cid = this.config.get<string>("GOOGLE_ADS_CUSTOMER_ID");
    const actionId = this.config.get<string>("GOOGLE_ADS_CONVERSION_ACTION_ID");
    if (
      !cid ||
      !actionId ||
      !this.config.get<string>("GOOGLE_ADS_REFRESH_TOKEN") ||
      !this.config.get<string>("GOOGLE_ADS_DEVELOPER_TOKEN") ||
      !session.aid
    )
      return;

    // gclid / gbraid / wbraid are distinct fields on ClickConversion — iOS
    // clicks arrive as gbraid/wbraid and are lost if uploaded as gclid.
    const idField =
      session.aidField === "gbraid" || session.aidField === "wbraid" ? session.aidField : "gclid";
    const conversion: Record<string, unknown> = {
      [idField]: session.aid,
      conversion_action: `customers/${cid}/conversionActions/${actionId}`,
      conversion_date_time: this.madridDateTime(Date.now()),
    };
    if (email) {
      conversion.user_identifiers = [
        { hashed_email: hashField(email), user_identifier_source: enums.UserIdentifierSource.FIRST_PARTY },
      ];
    }

    let status = "error";
    let response: unknown = {};
    try {
      const res = await this.getCustomer().conversionUploads.uploadClickConversions({
        customer_id: cid,
        conversions: [conversion],
        partial_failure: true,
      } as never);
      const pf = (res as { partial_failure_error?: unknown }).partial_failure_error;
      status = pf ? "error" : "success";
      response = pf
        ? { partial_failure_error: pf }
        : { results: (res as { results?: unknown }).results ?? [] };
    } catch (e) {
      response = { error: String(e) };
    }
    await this.journal(session.id, "google", status, response);
    if (status === "success") this.logger.log(`google ${EVENT_NAME} sent for session ${session.id}`);
  }

  /**
   * Hourly safety net: instant sends that failed (network blip, Meta/Google
   * 5xx) are retried while the raw click id is still alive (7 days).
   *
   * The candidate filter matters as much as the retry. "Signed in and carries a
   * click id" is NOT a registration — an existing customer who clicks a
   * retargeting ad matches it, and reporting that as CompleteRegistration
   * inflates conversions and poisons smart bidding on both networks. Only
   * visits that actually recorded a Register event qualify, and only while they
   * have no success row yet.
   */
  @Cron(CronExpression.EVERY_HOUR)
  async sweep(): Promise<void> {
    if (this.sweepRunning) return;
    this.sweepRunning = true;
    try {
      const since = new Date(Date.now() - SWEEP_WINDOW_DAYS * 24 * 3600_000);
      // Sessions already reported. This has to constrain the candidate query
      // itself: filtering after `take` meant that once the window held more
      // than SWEEP_MAX_SESSIONS registrations, every sweep spent its whole
      // budget re-reading the oldest (already successful) ones and a recent
      // failure was never retried again.
      const settledIds = (
        await this.prisma.conversionSendNew.findMany({
          where: { status: "success", createdAt: { gte: since } },
          select: { sessionId: true },
          distinct: ["sessionId"],
        })
      ).map((r) => r.sessionId);

      const candidates = await this.prisma.sessionNew.findMany({
        where: {
          userId: { not: null },
          aid: { not: null },
          firstAt: { gte: since },
          events: { some: { action: REGISTER_ACTION } },
          ...(settledIds.length ? { id: { notIn: settledIds } } : {}),
        },
        // Newest first: a fresh registration is the one whose click id is still
        // inside both networks' upload window.
        orderBy: { firstAt: "desc" },
        take: SWEEP_MAX_SESSIONS,
      });
      if (candidates.length === 0) return;

      const userIds = [...new Set(candidates.map((s) => s.userId!))];
      const users = new Map(
        (
          await this.prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, email: true, isDemo: true },
          })
        ).map((u) => [u.id, u]),
      );

      for (const session of candidates) {
        const user = users.get(session.userId!);
        if (!user || user.isDemo || isDemoEmail(user.email)) continue;
        await this.sendForSession(session, user.email, session.userId);
      }
    } catch (e) {
      this.logger.error(`conversion sweep failed: ${String(e)}`);
    } finally {
      this.sweepRunning = false;
    }
  }
}
