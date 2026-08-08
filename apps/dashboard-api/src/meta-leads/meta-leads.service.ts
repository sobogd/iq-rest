import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { MailService } from "../mail/mail.service";
import { OnboardingSeedService } from "../onboarding/onboarding-seed.service";

/** Meta Lead Ads webhook processing: on a `leadgen` change, pull the lead's
 *  field_data from the Graph API, create the account right away (User + empty
 *  template restaurant, same seed as a plain-login signup) and send the SAME
 *  personal welcome email the admin panel sends (welcome_personal), with a
 *  permanent auto-login link — the lead lands in their dashboard in one click,
 *  no OTP. This is the privacy-mode replacement for pixel/CAPI attribution —
 *  nothing is sent back to Meta and no click ids are stored.
 *
 *  Env: META_DEVELOPER_TOKEN (page token lookup), META_APP_SECRET (webhook
 *  signature), WHATSAPP_VERIFY_TOKEN (reused as the GET-verify token so the
 *  deploy needs no new secret). */
@Injectable()
export class MetaLeadsService {
  private readonly logger = new Logger(MetaLeadsService.name);
  private pageTokenCache: string | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly mail: MailService,
    private readonly seed: OnboardingSeedService,
  ) {}

  get verifyToken(): string {
    return this.config.get<string>("WHATSAPP_VERIFY_TOKEN") || "";
  }

  get appSecret(): string {
    return this.config.get<string>("META_APP_SECRET") || "";
  }

  /** Page access token via /me/accounts (the developer token manages the one
   *  IQ-Rest page). Cached for the process lifetime; reset on auth errors. */
  private async pageToken(): Promise<string> {
    if (this.pageTokenCache) return this.pageTokenCache;
    const devToken = this.config.get<string>("META_DEVELOPER_TOKEN");
    if (!devToken) throw new Error("META_DEVELOPER_TOKEN not configured");
    const res = await fetch(
      `https://graph.facebook.com/v21.0/me/accounts?fields=access_token&access_token=${encodeURIComponent(devToken)}`,
    );
    const json = (await res.json()) as { data?: Array<{ access_token?: string }> };
    const token = json.data?.[0]?.access_token;
    if (!token) throw new Error("page access token lookup failed");
    this.pageTokenCache = token;
    return token;
  }

  /** Fetch one lead and send the welcome email. Idempotent across Meta's
   *  webhook retries: journaled in CapiSend (the existing Meta send-journal
   *  table — reused on purpose so no migration is needed) under
   *  fbclid=`leadgen:<id>`, eventName=`lead_welcome`; a success row is final. */
  async processLead(leadgenId: string): Promise<void> {
    const journalKey = `leadgen:${leadgenId}`;
    const done = await this.prisma.capiSend.findFirst({
      where: { fbclid: journalKey, eventName: "lead_welcome", status: "success" },
      select: { id: true },
    });
    if (done) return;

    try {
      const token = await this.pageToken();
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${encodeURIComponent(leadgenId)}?fields=field_data,created_time&access_token=${encodeURIComponent(token)}`,
      );
      const lead = (await res.json()) as {
        error?: unknown;
        field_data?: Array<{ name?: string; values?: string[] }>;
      };
      if (lead.error) {
        // Token may have expired mid-flight — drop the cache so the retry
        // (Meta re-delivers) starts fresh.
        this.pageTokenCache = null;
        throw new Error(`lead fetch failed: ${JSON.stringify(lead.error)}`);
      }

      const field = (name: string): string | null =>
        lead.field_data?.find((f) => f.name === name)?.values?.[0] ?? null;
      const rawEmail = field("email");
      const venueType = field("venue_type");
      if (!rawEmail) throw new Error("lead has no email field");
      const email = rawEmail.trim().toLowerCase();

      // Find-or-create the account so the auto-login link has somewhere to
      // land. New leads get the same empty template restaurant a plain-login
      // signup gets (idempotent — an existing user keeps their venues).
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
      if (user.emailUnsubscribed) {
        this.logger.warn(`lead ${leadgenId} (${email}) is unsubscribed — welcome skipped`);
        await this.prisma.capiSend.create({
          data: {
            fbclid: journalKey,
            eventName: "lead_welcome",
            status: "success",
            response: { venueType, skipped: "unsubscribed" } as Prisma.InputJsonValue,
          },
        });
        return;
      }
      // Campaign is EN-only; currency is unknown at lead time → EUR default.
      await this.seed.seedEmptyRestaurant({ userId: user.id, currency: "EUR", locale: "en" });

      const locale = user.preferredLocale || "en";
      const loginToken = await this.auth.createEmailLoginSession(user.id);
      await this.mail.sendWelcomePersonal({ email, locale, loginToken });

      // Mirror the admin panel's send-tracking so the admin UI shows the
      // welcome as already sent for this user.
      const sent =
        user.emailsSent && typeof user.emailsSent === "object" && !Array.isArray(user.emailsSent)
          ? (user.emailsSent as Record<string, string>)
          : {};
      await this.prisma.user.update({
        where: { id: user.id },
        data: { emailsSent: { ...sent, welcome_personal: new Date().toISOString() } },
      });

      await this.prisma.capiSend.create({
        data: {
          fbclid: journalKey,
          eventName: "lead_welcome",
          status: "success",
          response: { venueType } as Prisma.InputJsonValue,
        },
      });
    } catch (e) {
      this.logger.error(`lead ${leadgenId} processing failed: ${String(e)}`);
      await this.prisma.capiSend
        .create({
          data: {
            fbclid: journalKey,
            eventName: "lead_welcome",
            status: "error",
            response: { error: String(e) } as Prisma.InputJsonValue,
          },
        })
        .catch(() => undefined);
    }
  }
}
