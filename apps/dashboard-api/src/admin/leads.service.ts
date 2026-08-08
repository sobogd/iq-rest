import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { MailService } from "../mail/mail.service";
import { OnboardingSeedService } from "../onboarding/onboarding-seed.service";

/** Admin surface for Meta Lead Ads. Replaces the retired leadgen webhook
 *  (removed 2026-08-08): instead of auto-emailing every lead the moment it
 *  arrives, the admin reviews leads on a dashboard page and sends the personal
 *  welcome by hand during working hours — a welcome that lands at 4am reads
 *  as templated, one that lands mid-morning reads as a human.
 *
 *  Leads are pulled live from the Graph API (they are never mirrored to our
 *  DB); send state comes from the CapiSend journal (`fbclid="leadgen:<id>"`,
 *  eventName "lead_welcome" — kept from the webhook era so history carries
 *  over) plus User.emailsSent. Sending reuses the same account-creation path
 *  a plain-login signup takes: find-or-create User + empty template
 *  restaurant, then welcome_personal with a permanent auto-login link. */
@Injectable()
export class AdminLeadsService {
  private readonly logger = new Logger(AdminLeadsService.name);
  private pageTokenCache: { token: string; pageId: string } | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly mail: MailService,
    private readonly seed: OnboardingSeedService,
  ) {}

  /** Page access token + id via /me/accounts (the developer token manages the
   *  one IQ-Rest page). Cached for the process lifetime; reset on auth errors. */
  private async page(): Promise<{ token: string; pageId: string }> {
    if (this.pageTokenCache) return this.pageTokenCache;
    const devToken = this.config.get<string>("META_DEVELOPER_TOKEN");
    if (!devToken) throw new Error("META_DEVELOPER_TOKEN not configured");
    const res = await fetch(
      `https://graph.facebook.com/v21.0/me/accounts?fields=access_token&access_token=${encodeURIComponent(devToken)}`,
    );
    const json = (await res.json()) as { data?: Array<{ access_token?: string; id?: string }> };
    const token = json.data?.[0]?.access_token;
    const pageId = json.data?.[0]?.id;
    if (!token || !pageId) throw new Error("page access token lookup failed");
    this.pageTokenCache = { token, pageId };
    return this.pageTokenCache;
  }

  private async graph<T>(url: string): Promise<T> {
    const res = await fetch(url);
    const json = (await res.json()) as T & { error?: { message?: string } };
    if (json.error) {
      // Token may have expired — drop the cache so the next call starts fresh.
      this.pageTokenCache = null;
      throw new Error(`Graph API error: ${json.error.message ?? JSON.stringify(json.error)}`);
    }
    return json;
  }

  /** Every lead across every lead form of the page, newest first, with the
   *  full form answers and our send/account state attached. */
  async list(): Promise<{ leads: AdminLeadRow[] }> {
    const { token, pageId } = await this.page();
    const forms = await this.graph<{ data?: Array<{ id: string; name?: string }> }>(
      `https://graph.facebook.com/v21.0/${pageId}/leadgen_forms?fields=id,name&limit=100&access_token=${encodeURIComponent(token)}`,
    );

    const raw: RawLead[] = [];
    for (const form of forms.data ?? []) {
      let url: string | undefined =
        `https://graph.facebook.com/v21.0/${form.id}/leads?fields=id,created_time,field_data,campaign_name,ad_name&limit=100&access_token=${encodeURIComponent(token)}`;
      while (url) {
        const batch: { data?: RawLead[]; paging?: { next?: string } } = await this.graph(url);
        for (const lead of batch.data ?? []) raw.push({ ...lead, formName: form.name });
        url = batch.paging?.next;
      }
    }

    const emails = new Set<string>();
    const rows = raw.map((lead) => {
      const fields: Record<string, string> = {};
      for (const f of lead.field_data ?? []) {
        if (f.name) fields[f.name] = (f.values ?? []).join(", ");
      }
      const email = (fields.email ?? "").trim().toLowerCase() || null;
      if (email) emails.add(email);
      return { lead, fields, email };
    });

    const [users, journal] = await Promise.all([
      this.prisma.user.findMany({
        where: { email: { in: [...emails] } },
        select: { email: true, emailsSent: true, restaurantUsers: { take: 1, select: { id: true } } },
      }),
      this.prisma.capiSend.findMany({
        where: { eventName: "lead_welcome", status: "success", fbclid: { in: raw.map((l) => `leadgen:${l.id}`) } },
        select: { fbclid: true, createdAt: true },
      }),
    ]);
    const userByEmail = new Map(users.map((u) => [u.email, u]));
    const sentByKey = new Map(journal.map((j) => [j.fbclid, j.createdAt]));

    const leads = rows
      .map(({ lead, fields, email }): AdminLeadRow => {
        const user = email ? userByEmail.get(email) : undefined;
        const sent =
          user?.emailsSent && typeof user.emailsSent === "object" && !Array.isArray(user.emailsSent)
            ? (user.emailsSent as Record<string, string>).welcome_personal ?? null
            : null;
        const journalSent = sentByKey.get(`leadgen:${lead.id}`);
        return {
          leadgenId: lead.id,
          createdTime: lead.created_time ?? null,
          formName: lead.formName ?? null,
          campaignName: lead.campaign_name ?? null,
          adName: lead.ad_name ?? null,
          email,
          fields,
          accountExists: Boolean(user),
          hasRestaurant: Boolean(user?.restaurantUsers.length),
          welcomeSentAt: journalSent ? journalSent.toISOString() : sent,
        };
      })
      .sort((a, b) => (b.createdTime ?? "").localeCompare(a.createdTime ?? ""));

    return { leads };
  }

  /** Create the lead's account (if missing) and send the personal welcome with
   *  the permanent auto-login link. Refuses a double-send. */
  async sendWelcome(leadgenId: string): Promise<{ ok: true; email: string; sentAt: string }> {
    const journalKey = `leadgen:${leadgenId}`;
    const done = await this.prisma.capiSend.findFirst({
      where: { fbclid: journalKey, eventName: "lead_welcome", status: "success" },
      select: { id: true },
    });
    if (done) throw new BadRequestException("Welcome already sent for this lead");

    const { token } = await this.page();
    const lead = await this.graph<{ field_data?: Array<{ name?: string; values?: string[] }> }>(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(leadgenId)}?fields=field_data&access_token=${encodeURIComponent(token)}`,
    ).catch((e) => {
      throw new NotFoundException(`Lead fetch failed: ${String(e)}`);
    });

    const field = (name: string): string | null =>
      lead.field_data?.find((f) => f.name === name)?.values?.[0] ?? null;
    const rawEmail = field("email");
    const venueType = field("venue_type");
    if (!rawEmail) throw new BadRequestException("Lead has no email field");
    const email = rawEmail.trim().toLowerCase();

    let user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, emailUnsubscribed: true, preferredLocale: true, emailsSent: true },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: { email, preferredLocale: "en" },
        select: { id: true, emailUnsubscribed: true, preferredLocale: true, emailsSent: true },
      });
    }
    if (user.emailUnsubscribed) throw new BadRequestException("User unsubscribed");

    // Campaign is EN-only; currency is unknown at lead time → EUR default.
    await this.seed.seedEmptyRestaurant({ userId: user.id, currency: "EUR", locale: "en" });

    const locale = user.preferredLocale || "en";
    const loginToken = await this.auth.createEmailLoginSession(user.id);
    await this.mail.sendWelcomePersonal({ email, locale, loginToken });

    const sentAt = new Date().toISOString();
    const sent =
      user.emailsSent && typeof user.emailsSent === "object" && !Array.isArray(user.emailsSent)
        ? (user.emailsSent as Record<string, string>)
        : {};
    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailsSent: { ...sent, welcome_personal: sentAt } },
    });
    await this.prisma.capiSend.create({
      data: {
        fbclid: journalKey,
        eventName: "lead_welcome",
        status: "success",
        response: { venueType, via: "admin" } as Prisma.InputJsonValue,
      },
    });
    this.logger.log(`lead ${leadgenId} welcome sent to ${email}`);
    return { ok: true, email, sentAt };
  }
}

interface RawLead {
  id: string;
  created_time?: string;
  field_data?: Array<{ name?: string; values?: string[] }>;
  campaign_name?: string;
  ad_name?: string;
  formName?: string;
}

export interface AdminLeadRow {
  leadgenId: string;
  createdTime: string | null;
  formName: string | null;
  campaignName: string | null;
  adName: string | null;
  email: string | null;
  fields: Record<string, string>;
  accountExists: boolean;
  hasRestaurant: boolean;
  welcomeSentAt: string | null;
}
