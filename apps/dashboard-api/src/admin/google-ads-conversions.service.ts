import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@iq-rest/db";
import { GoogleAdsApi, enums } from "google-ads-api";
import { createHash } from "crypto";
import { PrismaService } from "../prisma/prisma.service";

/** Cookieless match data, mirror of CapiMatch. Google enhanced-conversions-for-
 *  leads accepts a hashed email alongside the gclid to lift the match rate. */
export interface GAdsMatch {
  email?: string | null;
  userId?: string | null;
}

/** SHA-256 hex of a normalised value (Google requires lowercase + trimmed). */
function hashField(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export type GAdsEventName = "ViewContent" | "InitiateCheckout" | "CompleteRegistration";

/** One session's latest Google click + the funnel milestones it reached.
 *  Mirror of CAPI's FbSessionRow, keyed on the real gclid column. */
interface GAdsSessionRow {
  gclid: string;
  click_at: Date | null;
  user_id: string | null;
  has_content: boolean; // pricing page OR demo
  has_lead: boolean; // clicked "create" → opened the onboarding modal
  has_registered: boolean; // verify_success OR any dashboard event
}

@Injectable()
export class GoogleAdsConversionsService {
  private readonly logger = new Logger(GoogleAdsConversionsService.name);
  private autoRunning = false;
  private customerCache: ReturnType<GoogleAdsApi["Customer"]> | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  /** eventName → conversion-action resource name. Subscribe/Purchase is uploaded
   *  by the user himself, so it is intentionally absent here. */
  private actionResource(eventName: GAdsEventName): string | null {
    const cid = this.config.get<string>("GOOGLE_ADS_CUSTOMER_ID");
    const id =
      eventName === "ViewContent"
        ? this.config.get<string>("GOOGLE_ADS_CONVERSION_ACTION_ID_VIEWS")
        : eventName === "InitiateCheckout"
          ? this.config.get<string>("GOOGLE_ADS_CONVERSION_ACTION_ID_CHECKOUT")
          : this.config.get<string>("GOOGLE_ADS_CONVERSION_ACTION_ID"); // registration
    if (!cid || !id) return null;
    return `customers/${cid}/conversionActions/${id}`;
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

  private hasCreds(): boolean {
    return (
      !!this.config.get<string>("GOOGLE_ADS_REFRESH_TOKEN") &&
      !!this.config.get<string>("GOOGLE_ADS_CUSTOMER_ID") &&
      !!this.config.get<string>("GOOGLE_ADS_DEVELOPER_TOKEN")
    );
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
    // offset = (wall-clock as-if-UTC) − (real UTC)
    const asUtc = Date.UTC(+p("year"), +p("month") - 1, +p("day"), +p("hour") === 24 ? 0 : +p("hour"), +p("minute"), +p("second"));
    const offMin = Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
    const sign = offMin >= 0 ? "+" : "-";
    const abs = Math.abs(offMin);
    const oh = String(Math.floor(abs / 60)).padStart(2, "0");
    const om = String(abs % 60).padStart(2, "0");
    const hh = p("hour") === "24" ? "00" : p("hour");
    return `${p("year")}-${p("month")}-${p("day")} ${hh}:${p("minute")}:${p("second")}${sign}${oh}:${om}`;
  }

  /** Low-level upload of one (gclid, event) click conversion. Always journals
   *  the attempt in GoogleAdsSend. Does NOT dedup — callers decide. */
  async send(
    gclid: string,
    eventName: GAdsEventName,
    milestoneMs: number,
    match?: GAdsMatch,
  ): Promise<{ ok: boolean; response: unknown }> {
    if (!this.hasCreds()) throw new Error("GOOGLE_ADS_* not configured");
    const action = this.actionResource(eventName);
    if (!action) throw new Error(`no conversion action configured for ${eventName}`);

    const conversion: Record<string, unknown> = {
      gclid,
      conversion_action: action,
      conversion_date_time: this.madridDateTime(milestoneMs > 0 ? milestoneMs : Date.now()),
    };
    // Enhanced conversions: hashed email lifts the match beyond gclid-only. The
    // conversion VALUE is intentionally omitted — every action carries a default
    // value (always_use_default_value), so Google applies €1/€5 automatically.
    if (match?.email) {
      conversion.user_identifiers = [
        { hashed_email: hashField(match.email), user_identifier_source: enums.UserIdentifierSource.FIRST_PARTY },
      ];
    }

    let ok = false;
    let response: unknown = {};
    try {
      const res = await this.getCustomer().conversionUploads.uploadClickConversions({
        customer_id: this.config.get<string>("GOOGLE_ADS_CUSTOMER_ID")!,
        conversions: [conversion],
        partial_failure: true,
      } as never);
      // partial_failure_error set ⇒ the single row was rejected.
      const pf = (res as { partial_failure_error?: unknown }).partial_failure_error;
      ok = !pf;
      response = pf ? { partial_failure_error: pf } : { results: (res as { results?: unknown }).results ?? [] };
    } catch (e) {
      await this.prisma.googleAdsSend.create({
        data: { gclid, eventName, status: "error", response: { error: String(e) } },
      });
      throw e;
    }

    await this.prisma.googleAdsSend.create({
      data: { gclid, eventName, status: ok ? "success" : "error", response: response as Prisma.InputJsonValue },
    });
    return { ok, response };
  }

  @Cron("*/15 * * * *")
  async scheduledAutoSend(): Promise<void> {
    if (this.autoRunning) return;
    if (!this.hasCreds()) return;
    this.autoRunning = true;
    try {
      await this.autoSend();
    } catch (e) {
      this.logger.error(`Google Ads auto-send failed: ${String(e)}`);
    } finally {
      this.autoRunning = false;
    }
  }

  /** Every 15 minutes: find Google-click sessions over the last 7 days, work out
   *  which milestones they reached, and upload the ones not yet successfully
   *  sent for that gclid. The google_ads_sends journal is the dedup source of
   *  truth. Subscribe/Purchase is NOT handled here (uploaded manually). */
  async autoSend(): Promise<{ sent: number; skipped: number }> {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Same session grouping as the admin session list + CAPI cron, but keyed on
    // the real gclid column (falling back to an l_gclid_<id> / l_param_gclid__<id>
    // event name when the column is null).
    const rows = await this.prisma.$queryRaw<GAdsSessionRow[]>(Prisma.sql`
      WITH ev AS (
        SELECT ue.*,
               COALESCE(ue."manualRestaurantId", ue."restaurantId", ue."stitchedRestaurantId", ru."restaurantId") AS eff_rid,
               CASE
                 WHEN ue.gclid IS NOT NULL THEN ue.gclid
                 WHEN ue.event LIKE 'l_gclid_%' OR ue.event LIKE 'l_param_gclid__%'
                   THEN regexp_replace(ue.event, '^(l_param_gclid__|l_gclid_)', '')
                 ELSE NULL
               END AS any_gclid
        FROM usage_events ue
        LEFT JOIN LATERAL (
          SELECT "restaurantId" FROM restaurant_users
          WHERE "userId" = COALESCE(ue."userId", ue."stitchedUserId") ORDER BY "addedAt" ASC LIMIT 1
        ) ru ON COALESCE(ue."userId", ue."stitchedUserId") IS NOT NULL
        WHERE ue.at >= ${since}
      ),
      grouped AS (
        SELECT
          (array_agg(any_gclid ORDER BY at DESC) FILTER (WHERE any_gclid IS NOT NULL))[1] AS gclid,
          MAX(at) FILTER (WHERE any_gclid IS NOT NULL) AS click_at,
          (array_agg(COALESCE("userId", "stitchedUserId") ORDER BY at DESC) FILTER (WHERE COALESCE("userId", "stitchedUserId") IS NOT NULL))[1] AS user_id,
          bool_or(event = 'l_page_pricing' OR event LIKE '%demo_open') AS has_content,
          bool_or(event LIKE 'l_onb_open_%' AND event NOT IN ('l_onb_open_terms', 'l_onb_open_privacy')) AS has_lead,
          bool_or(event = 'l_onb_verify_success' OR event LIKE 'dash\\_%') AS has_registered
        FROM ev
        GROUP BY eff_rid, (CASE WHEN eff_rid IS NULL THEN COALESCE(ip, region) END)
      )
      SELECT gclid, click_at, user_id, has_content, has_lead, has_registered
      FROM grouped
      WHERE gclid IS NOT NULL
    `);
    if (rows.length === 0) return { sent: 0, skipped: 0 };

    // Per gclid: the milestones to ensure + click time + user.
    const wanted = new Map<string, { events: Set<GAdsEventName>; clickMs: number; userId: string | null }>();
    for (const r of rows) {
      if (!r.gclid) continue;
      const events = new Set<GAdsEventName>();
      if (r.has_content) events.add("ViewContent");
      if (r.has_lead) events.add("InitiateCheckout");
      if (r.has_registered) events.add("CompleteRegistration");
      if (events.size === 0) continue;
      const clickMs = r.click_at ? r.click_at.getTime() : Date.now();
      const prev = wanted.get(r.gclid);
      if (prev) {
        for (const e of events) prev.events.add(e);
        prev.clickMs = Math.max(prev.clickMs, clickMs);
        if (!prev.userId && r.user_id) prev.userId = r.user_id;
      } else {
        wanted.set(r.gclid, { events, clickMs, userId: r.user_id });
      }
    }
    if (wanted.size === 0) return { sent: 0, skipped: 0 };

    // Resolve emails (enhanced match) + demo accounts (demo never registers).
    const userIds = Array.from(new Set(Array.from(wanted.values()).map((w) => w.userId).filter((v): v is string => !!v)));
    const emailById = new Map<string, string>();
    const demoIds = new Set<string>();
    if (userIds.length > 0) {
      const users = await this.prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, email: true, isDemo: true } });
      for (const u of users) {
        const isDemo = u.isDemo || u.email === "demo@iq-rest.com" || (!!u.email && u.email.startsWith("demo+"));
        if (isDemo) { demoIds.add(u.id); continue; }
        if (u.email) emailById.set(u.id, u.email);
      }
    }

    // Journal dedup + bounded retries (mirror of CAPI).
    const MAX_ERRORS = 6;
    const MAX_PER_RUN = 300;
    const gclids = Array.from(wanted.keys());
    const journal = await this.prisma.googleAdsSend.findMany({
      where: { gclid: { in: gclids }, status: { in: ["success", "error"] } },
      select: { gclid: true, eventName: true, status: true },
    });
    const successSet = new Set<string>();
    const errorCount = new Map<string, number>();
    for (const j of journal) {
      const key = `${j.gclid}|${j.eventName}`;
      if (j.status === "success") successSet.add(key);
      else errorCount.set(key, (errorCount.get(key) ?? 0) + 1);
    }

    let sent = 0;
    let skipped = 0;
    let capped = false;
    outer: for (const [gclid, { events, clickMs, userId }] of wanted) {
      // Demo account's dashboard activity is engagement, not a registration —
      // collapse CompleteRegistration → InitiateCheckout (mirror of CAPI).
      const isDemo = !!userId && demoIds.has(userId);
      if (isDemo && events.has("CompleteRegistration")) {
        events.delete("CompleteRegistration");
        events.add("InitiateCheckout");
      }
      const match: GAdsMatch = { userId: isDemo ? null : userId, email: userId ? emailById.get(userId) ?? null : null };
      for (const eventName of events) {
        const key = `${gclid}|${eventName}`;
        if (successSet.has(key) || (errorCount.get(key) ?? 0) >= MAX_ERRORS) { skipped++; continue; }
        if (sent >= MAX_PER_RUN) { capped = true; break outer; }
        try {
          const r = await this.send(gclid, eventName, clickMs, match);
          if (r.ok) {
            sent++;
            // On a real registration, stamp the gclid onto the restaurant's
            // admin note so attribution is visible in the admin restaurant modal.
            if (eventName === "CompleteRegistration" && !isDemo && userId) {
              await this.stampGclidOnRestaurant(userId, gclid).catch((e) =>
                this.logger.warn(`gclid stamp failed for user ${userId}: ${String(e)}`),
              );
            }
          }
        } catch (e) {
          this.logger.warn(`Google Ads upload ${eventName} for ${gclid} failed: ${String(e)}`);
        }
      }
    }
    if (sent > 0 || capped) {
      this.logger.log(`Google Ads auto-send: ${sent} sent, ${skipped} skipped${capped ? " (capped, more next run)" : ""}`);
    }
    return { sent, skipped };
  }

  /** Append "[gclid] <id>" to the user's first restaurant's adminComment, once. */
  private async stampGclidOnRestaurant(userId: string, gclid: string): Promise<void> {
    const link = await this.prisma.restaurantUser.findFirst({
      where: { userId }, orderBy: { addedAt: "asc" }, select: { restaurantId: true },
    });
    if (!link) return;
    const r = await this.prisma.restaurant.findUnique({ where: { id: link.restaurantId }, select: { adminComment: true } });
    const tag = `[gclid] ${gclid}`;
    if (r?.adminComment?.includes(tag)) return;
    const next = r?.adminComment ? `${r.adminComment}\n${tag}` : tag;
    await this.prisma.restaurant.update({ where: { id: link.restaurantId }, data: { adminComment: next } });
  }
}
