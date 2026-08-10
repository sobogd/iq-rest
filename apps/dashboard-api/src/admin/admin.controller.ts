import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@iq-rest/db";
import { PrismaService } from "../prisma/prisma.service";
import { AdminGuard } from "./admin.guard";
import { AdminLeadsService } from "./leads.service";
import { AuthService } from "../auth/auth.service";
import { MailService } from "../mail/mail.service";
import { DevicesService } from "../devices/devices.service";
import { RestaurantService } from "../restaurant/restaurant.service";
import { authCookieOptions } from "../common/session-utils";
import { validateEmail } from "../common/validate-email";
import type { AuthedRequest } from "../auth/auth.guard";

const SESSION_COOKIE = "iqr_session";
const EMAIL_COOKIE = "iqr_email";
const ADMIN_ORIG_SESSION = "iqr_admin_original_session";
const ADMIN_ORIG_EMAIL = "iqr_admin_original_email";
const ADMIN_ORIG_USER_ID = "iqr_admin_original_user_id";

interface ListQuery {
  tz?: string;
}

@Controller("admin")
@UseGuards(AdminGuard)
export class AdminController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly config: ConfigService,
    private readonly mail: MailService,
    private readonly devices: DevicesService,
    private readonly restaurants: RestaurantService,
    private readonly leads: AdminLeadsService,
  ) {}

  // ────────────────── META LEADS ──────────────────

  // All Meta Lead Ads leads (pulled live from the Graph API) with form answers
  // and our send/account state. The admin sends welcomes by hand from here —
  // the leadgen webhook was retired on purpose (see AdminLeadsService).
  @Get("leads")
  listLeads() {
    return this.leads.list();
  }

  // Create the lead's account (if missing) + send the personal welcome with
  // the permanent auto-login link.
  @Post("leads/:leadgenId/send-welcome")
  @HttpCode(HttpStatus.OK)
  sendLeadWelcome(@Param("leadgenId") leadgenId: string) {
    return this.leads.sendWelcome(leadgenId);
  }

  // ────────────────── DEVICES ──────────────────

  // Fan out a force-reload to every paired tablet system-wide.
  // Used after deploying an urgent kitchen-bundle fix — the kiosk SSE
  // handler clears its caches and calls location.reload() on receipt.
  @Post("devices/reload-all")
  reloadAllDevices() {
    return this.devices.reloadAllGlobal();
  }

  // ────────────────── RESTAURANTS (per-restaurant billing UI) ──────────────────

  // Flat list of every restaurant in the system with the aggregates the admin
  // table needs. Primary view for the admin dashboard.
  @Get("restaurants")
  async listRestaurants() {
    const now = new Date();
    const DAY_MS = 24 * 60 * 60 * 1000;
    const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const upper30d = new Date(todayUtc.getTime() + DAY_MS);
    const startOf30d = new Date(upper30d.getTime() - 30 * DAY_MS);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMessagesLastDay = new Date(now.getTime() - DAY_MS);

    const restaurants = await this.prisma.restaurant.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        defaultLanguage: true,
        // Billing is account-level: read status/trial off the account
        // Subscription + Account.
        account: {
          select: {
            trialEndsAt: true,
            subscription: {
              select: {
                status: true,
                billingCycle: true,
                currentPeriodEnd: true,
                stripeSubscriptionId: true,
              },
            },
          },
        },
        adminComment: true,
        createdAt: true,
        _count: { select: { categories: true, items: true } },
        restaurantUsers: {
          orderBy: { addedAt: "asc" },
          select: { addedBy: true, user: { select: { id: true, email: true, emailsSent: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (restaurants.length === 0) return { restaurants: [] };

    const ids = restaurants.map((r) => r.id);

    const [scans30dRows, scansTodayRows, msgsTotalRows, msgsLastDayRows] = await Promise.all([
      this.prisma.$queryRaw<{ restaurantId: string; count: bigint }[]>`
        SELECT "restaurantId", COUNT(DISTINCT "sessionId") AS count
        FROM page_views WHERE "restaurantId" = ANY(${ids}::text[]) AND "createdAt" >= ${startOf30d}
        GROUP BY "restaurantId"`,
      this.prisma.$queryRaw<{ restaurantId: string; count: bigint }[]>`
        SELECT "restaurantId", COUNT(DISTINCT "sessionId") AS count
        FROM page_views WHERE "restaurantId" = ANY(${ids}::text[]) AND "createdAt" >= ${startOfDay}
        GROUP BY "restaurantId"`,
      this.prisma.$queryRaw<{ restaurantId: string; count: bigint }[]>`
        SELECT "restaurantId", COUNT(*) AS count FROM support_messages
        WHERE "restaurantId" = ANY(${ids}::text[])
        GROUP BY "restaurantId"`,
      this.prisma.$queryRaw<{ restaurantId: string; count: bigint }[]>`
        SELECT "restaurantId", COUNT(*) AS count FROM support_messages
        WHERE "restaurantId" = ANY(${ids}::text[]) AND "isAdmin" = false AND "createdAt" >= ${startOfMessagesLastDay}
        GROUP BY "restaurantId"`,
    ]);

    const byId = <T extends { restaurantId: string }>(rows: T[]) => {
      const m = new Map<string, T>();
      for (const r of rows) m.set(r.restaurantId, r);
      return m;
    };
    const s30 = byId(scans30dRows);
    const sToday = byId(scansTodayRows);
    const mTotal = byId(msgsTotalRows);
    const mLastDay = byId(msgsLastDayRows);

    // The 3 lifecycle email templates an admin can trigger; we report how many
    // distinct ones the owner has received (e.g. 1/3) instead of a date.
    const EMAIL_TEMPLATES = ["welcome_personal", "menu_almost_ready", "trial_ending"];

    return {
      restaurants: restaurants.map((r) => {
        const acctSub = r.account?.subscription ?? null;
        const subscriptionStatus = acctSub?.status ?? null;
        const isManualSub =
          subscriptionStatus === "ACTIVE" && !acctSub?.stripeSubscriptionId;
        // Owner = the user with addedBy === null (falls back to the first).
        const ownerRu = r.restaurantUsers.find((ru) => ru.addedBy === null) ?? r.restaurantUsers[0];
        const sent = (ownerRu?.user.emailsSent as Record<string, unknown> | null) ?? null;
        const emailsSentCount = sent ? EMAIL_TEMPLATES.filter((t) => t in sent).length : 0;
        return {
          id: r.id,
          title: r.title,
          slug: r.slug,
          defaultLanguage: r.defaultLanguage,
          billingCycle: acctSub?.billingCycle ?? null,
          subscriptionStatus,
          trialEndsAt: r.account?.trialEndsAt ? r.account.trialEndsAt.toISOString() : null,
          currentPeriodEnd: acctSub?.currentPeriodEnd ? acctSub.currentPeriodEnd.toISOString() : null,
          hasStripeSub: !!acctSub?.stripeSubscriptionId,
          isManualSub,
          hasAdminComment: !!(r.adminComment && r.adminComment.trim().length > 0),
          createdAt: r.createdAt.toISOString(),
          users: r.restaurantUsers.map((ru) => ({
            id: ru.user.id,
            email: ru.user.email,
          })),
          usersCount: r.restaurantUsers.length,
          categoriesCount: r._count.categories,
          itemsCount: r._count.items,
          scans30d: Number(s30.get(r.id)?.count ?? 0),
          scansToday: Number(sToday.get(r.id)?.count ?? 0),
          messagesCount: Number(mTotal.get(r.id)?.count ?? 0),
          messagesLastDayCount: Number(mLastDay.get(r.id)?.count ?? 0),
          emailsSentCount,
          emailTemplatesTotal: EMAIL_TEMPLATES.length,
        };
      }),
    };
  }

  // Full per-restaurant detail for the admin restaurant modal. Returns the
  // restaurant row + all attached users with their email-campaign history +
  // counts used in the modal header (categories/items/messages).
  @Get("restaurants/:id")
  async restaurantDetail(@Param("id") restaurantId: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        slug: true,
        address: true,
        phone: true,
        instagram: true,
        whatsapp: true,
        languages: true,
        defaultLanguage: true,
        reservationsEnabled: true,
        // Per-restaurant entitlement feature flags (admin toggles).
        featMenuOnline: true,
        featOrders: true,
        featKds: true,
        featReservations: true,
        featCustomDomain: true,
        account: {
          select: {
            stripeCustomerId: true,
            trialEndsAt: true,
            subscription: {
              select: {
                status: true,
                billingCycle: true,
                currentPeriodEnd: true,
                stripeSubscriptionId: true,
              },
            },
          },
        },
        paymentProcessing: true,
        adminComment: true,
        createdAt: true,
        _count: { select: { categories: true, items: true, supportMessages: true } },
        restaurantUsers: {
          orderBy: { addedAt: "asc" },
          select: {
            addedAt: true,
            addedBy: true,
            user: {
              select: {
                id: true,
                email: true,
                preferredLocale: true,
                emailsSent: true,
                emailUnsubscribed: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
    if (!restaurant) throw new NotFoundException("Restaurant not found");
    return {
      id: restaurant.id,
      title: restaurant.title,
      subtitle: restaurant.subtitle,
      description: restaurant.description,
      slug: restaurant.slug,
      address: restaurant.address,
      phone: restaurant.phone,
      instagram: restaurant.instagram,
      whatsapp: restaurant.whatsapp,
      languages: restaurant.languages,
      defaultLanguage: restaurant.defaultLanguage,
      reservationsEnabled: restaurant.reservationsEnabled,
      // Entitlement feature flags — drive the admin feature toggles.
      featMenuOnline: restaurant.featMenuOnline,
      featOrders: restaurant.featOrders,
      featKds: restaurant.featKds,
      featReservations: restaurant.featReservations,
      featCustomDomain: restaurant.featCustomDomain,
      billingCycle: restaurant.account?.subscription?.billingCycle ?? null,
      subscriptionStatus: restaurant.account?.subscription?.status ?? null,
      trialEndsAt: restaurant.account?.trialEndsAt?.toISOString() ?? null,
      currentPeriodEnd: restaurant.account?.subscription?.currentPeriodEnd?.toISOString() ?? null,
      hasStripeSub: !!restaurant.account?.subscription?.stripeSubscriptionId,
      paymentProcessing: restaurant.paymentProcessing,
      adminComment: restaurant.adminComment,
      createdAt: restaurant.createdAt.toISOString(),
      categoriesCount: restaurant._count.categories,
      itemsCount: restaurant._count.items,
      messagesCount: restaurant._count.supportMessages,
      users: restaurant.restaurantUsers.map((ru) => ({
        id: ru.user.id,
        email: ru.user.email,
        preferredLocale: ru.user.preferredLocale,
        // Stripe customer is account-level now (§3).
        hasStripeCustomer: !!restaurant.account?.stripeCustomerId,
        emailsSent: (ru.user.emailsSent as Record<string, string> | null) ?? null,
        emailUnsubscribed: ru.user.emailUnsubscribed,
        attachedAt: ru.addedAt.toISOString(),
        // null addedBy = original creator (owner); non-null = invited later.
        isOwner: ru.addedBy === null,
        userCreatedAt: ru.user.createdAt.toISOString(),
      })),
    };
  }

  // Update the admin-only note attached to a restaurant. Empty string clears
  // it back to null so the modal doesn't keep blank rows around.
  @Post("restaurants/:id/admin-comment")
  @HttpCode(HttpStatus.OK)
  async updateRestaurantAdminComment(
    @Param("id") restaurantId: string,
    @Body() body: { adminComment?: string | null },
  ) {
    const raw = body?.adminComment;
    if (raw !== null && raw !== undefined && typeof raw !== "string") {
      throw new BadRequestException("adminComment must be a string or null");
    }
    const next = typeof raw === "string" && raw.trim().length > 0 ? raw : null;
    const updated = await this.prisma.restaurant
      .update({
        where: { id: restaurantId },
        data: { adminComment: next },
        select: { adminComment: true },
      })
      .catch((err) => {
        const code = (err as { code?: string })?.code;
        if (code === "P2025") throw new NotFoundException("Restaurant not found");
        throw err;
      });
    return { ok: true, adminComment: updated.adminComment };
  }

  // Cascade-delete a restaurant. Removes RestaurantUsers, devices, orders,
  // menu, support history — everything keyed by restaurantId via Prisma's
  // onDelete: Cascade. RestaurantService.deleteByAdmin also cancels any
  // active Stripe subscription on the restaurant first (best-effort) so the
  // customer isn't billed for a deleted restaurant.
  @Delete("restaurants/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRestaurant(@Param("id") restaurantId: string) {
    await this.restaurants.deleteByAdmin(restaurantId).catch((err) => {
      if (err instanceof NotFoundException) throw err;
      // Prisma "record to delete does not exist" surfaces as P2025.
      const code = (err as { code?: string })?.code;
      if (code === "P2025") throw new NotFoundException("Restaurant not found");
      throw err;
    });
  }

  // Attach an existing user to a restaurant (formerly a "grant"). Type-ahead
  // search returns existing users only; signup for a brand-new email happens
  // through the normal OTP flow first.
  @Post("restaurants/:id/users")
  async attachUserToRestaurant(
    @Req() req: Request,
    @Param("id") restaurantId: string,
    @Body() body: { email?: string },
  ) {
    const email = validateEmail(body.email);
    if (!email) throw new BadRequestException("Valid email required");

    const [restaurant, user] = await Promise.all([
      this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { id: true },
      }),
      this.prisma.user.findUnique({ where: { email }, select: { id: true, email: true } }),
    ]);
    if (!restaurant) throw new NotFoundException("Restaurant not found");
    if (!user) throw new BadRequestException("user_not_registered");

    // addedBy = the admin attaching this user. Non-null marks the attached
    // user as a manager (viaGrant=true), which blocks billing and delete
    // actions in AuthGuard / RestaurantService. Without this, the row defaults
    // to addedBy=NULL, which the model interprets as "owner" — accidentally
    // granting cancel-subscription + delete-restaurant rights to anyone the
    // admin attaches.
    const adminUserId = (req as AuthedRequest).authUser.userId;
    const ru = await this.prisma.restaurantUser.upsert({
      where: { restaurantId_userId: { restaurantId, userId: user.id } },
      create: { restaurantId, userId: user.id, addedBy: adminUserId },
      update: {},
      select: { id: true, addedAt: true },
    });
    return { id: ru.id, userId: user.id, userEmail: user.email, addedAt: ru.addedAt.toISOString() };
  }

  @Delete("restaurants/:id/users/:userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async detachUserFromRestaurant(
    @Param("id") restaurantId: string,
    @Param("userId") userId: string,
  ) {
    // Block detaching the LAST user — that would orphan the restaurant.
    const count = await this.prisma.restaurantUser.count({ where: { restaurantId } });
    if (count <= 1) {
      throw new BadRequestException("cannot_remove_last_user");
    }
    await this.prisma.restaurantUser
      .delete({ where: { restaurantId_userId: { restaurantId, userId } } })
      .catch(() => {
        throw new NotFoundException("Membership not found");
      });
  }

  // ────────────────── USERS (per-restaurant model admin view) ──────────────────

  // Flat list of every user. Restaurants[] gives the admin a quick read of
  // "what does this person own/manage".
  @Get("users")
  async listUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        preferredLocale: true,
        createdAt: true,
        restaurantUsers: {
          select: {
            addedAt: true,
            restaurant: {
              select: {
                id: true,
                title: true,
                slug: true,
                account: {
                  select: {
                    stripeCustomerId: true,
                    trialEndsAt: true,
                    subscription: {
                      select: { status: true, stripeSubscriptionId: true },
                    },
                  },
                },
              },
            },
          },
          orderBy: { addedAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return {
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        preferredLocale: u.preferredLocale,
        createdAt: u.createdAt.toISOString(),
        // Stripe customer is account-level now (§3): true if any of the user's
        // restaurants' accounts has a customer.
        hasStripeCustomer: u.restaurantUsers.some((ru) => !!ru.restaurant.account?.stripeCustomerId),
        restaurantsCount: u.restaurantUsers.length,
        hasPaying: u.restaurantUsers.some((ru) => {
          const sub = ru.restaurant.account?.subscription;
          return sub?.status === "ACTIVE";
        }),
        hasActiveTrial: u.restaurantUsers.some(
          (ru) => ru.restaurant.account?.trialEndsAt && ru.restaurant.account.trialEndsAt > new Date(),
        ),
        restaurants: u.restaurantUsers.map((ru) => ({
          id: ru.restaurant.id,
          title: ru.restaurant.title,
          slug: ru.restaurant.slug,
          subscriptionStatus: ru.restaurant.account?.subscription?.status ?? null,
          hasStripeSub: !!ru.restaurant.account?.subscription?.stripeSubscriptionId,
        })),
      })),
    };
  }

  @Get("users/search")
  async searchUsers(@Query("q") q = "") {
    const term = (q || "").trim().toLowerCase();
    if (!term) return [];
    const users = await this.prisma.user.findMany({
      where: { email: { contains: term, mode: "insensitive" } },
      take: 20,
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true },
    });
    return users;
  }

  // ────────────────── RESTAURANT SUPPORT CHAT ──────────────────

  @Get("restaurants/:id/messages")
  async listMessages(@Param("id") restaurantId: string) {
    return this.prisma.supportMessage.findMany({
      where: { restaurantId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
        user: { select: { email: true } },
      },
    });
  }

  @Post("restaurants/:id/messages")
  async sendMessage(
    @Req() req: Request,
    @Param("id") restaurantId: string,
    @Body() body: { message?: string; locale?: string },
  ) {
    const adminEmail = (req as AuthedRequest).authUser.email;
    const text = (body.message ?? "").trim();
    if (!text) throw new BadRequestException("Message is required");
    if (text.length > 2000) throw new BadRequestException("Message too long");

    const adminUser = await this.prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminUser) throw new NotFoundException("Admin user not found");

    const created = await this.prisma.supportMessage.create({
      data: { message: text, restaurantId, userId: adminUser.id, isAdmin: true },
      select: {
        id: true,
        message: true,
        isAdmin: true,
        createdAt: true,
        user: { select: { email: true } },
      },
    });

    // Notify any user attached to the restaurant by email (best-effort).
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: {
        defaultLanguage: true,
        restaurantUsers: {
          take: 1,
          orderBy: { addedAt: "asc" },
          select: { user: { select: { email: true, preferredLocale: true } } },
        },
      },
    });
    const owner = restaurant?.restaurantUsers[0]?.user;
    const requestedLocale = (body.locale ?? "").trim().toLowerCase();
    const locale =
      requestedLocale ||
      owner?.preferredLocale ||
      restaurant?.defaultLanguage ||
      "en";
    if (owner?.email) {
      this.mail
        .sendSupportReplyNotification(owner.email, locale)
        .catch((err) => console.error("support email failed:", err));
    }

    return created;
  }

  /** Manually trigger an email template to a specific user.
   *  Records the send in User.emailsSent JSON for tracking + idempotency hint. */
  @Post("users/:id/send-email")
  async sendEmail(
    @Param("id") userId: string,
    @Body() body: { template?: string; locale?: string },
  ) {
    const template = body.template;
    if (
      template !== "welcome_personal" &&
      template !== "menu_almost_ready" &&
      template !== "trial_ending" &&
      template !== "payment_failed"
    ) {
      throw new BadRequestException("Unknown template");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        restaurantUsers: {
          take: 1,
          orderBy: { addedAt: "asc" },
          select: { restaurant: { select: { title: true, defaultLanguage: true } } },
        },
      },
    });
    if (!user?.email) throw new NotFoundException("User not found");
    if (user.emailUnsubscribed) throw new BadRequestException("User unsubscribed");

    const restaurant = user.restaurantUsers[0]?.restaurant;
    const requestedLocale = (body.locale ?? "").trim().toLowerCase();
    const locale = requestedLocale || user.preferredLocale || restaurant?.defaultLanguage || "en";

    if (template === "welcome_personal") {
      // The CTA is a one-click auto-login link: a permanent Session-backed
      // token, installed as cookies by the SPA's /<locale>/auth page.
      const loginToken = await this.auth.createEmailLoginSession(user.id);
      await this.mail.sendWelcomePersonal({ email: user.email, locale, loginToken });
    } else if (template === "trial_ending") {
      await this.mail.sendTrialEnding({ email: user.email, locale });
    } else if (template === "payment_failed") {
      await this.mail.sendPaymentFailed({ email: user.email, locale });
    } else {
      await this.mail.sendMenuAlmostReady({ email: user.email, locale });
    }

    const existing =
      user.emailsSent && typeof user.emailsSent === "object" && !Array.isArray(user.emailsSent)
        ? (user.emailsSent as Record<string, string>)
        : {};
    const updated = { ...existing, [template]: new Date().toISOString() };
    await this.prisma.user.update({ where: { id: userId }, data: { emailsSent: updated } });

    return { ok: true, template, sentAt: updated[template], to: user.email, locale };
  }

  // ────────────────── IMPERSONATE ──────────────────

  @Post("impersonate")
  @HttpCode(HttpStatus.OK)
  async impersonate(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { userId?: string },
  ) {
    if (!body.userId) throw new BadRequestException("userId required");

    const adminAuth = (req as AuthedRequest).authUser;
    const target = await this.prisma.user.findUnique({
      where: { id: body.userId },
      select: {
        id: true,
        email: true,
        // Impersonating a user without any attached restaurant locks the admin
        // out — AuthGuard would 401 every subsequent request inside the
        // impersonated session. Require ≥1 attachment so we fail loudly here
        // instead of stranding the admin behind a useless cookie swap.
        _count: { select: { restaurantUsers: true } },
      },
    });
    if (!target) throw new NotFoundException("User not found");
    if (target._count.restaurantUsers === 0) {
      throw new BadRequestException("Target user has no restaurants — cannot impersonate");
    }

    const cookies = req.cookies as Record<string, string | undefined>;
    const adminSession = cookies?.[SESSION_COOKIE];
    if (!adminSession) throw new ForbiddenException("Missing admin session cookie");

    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    const opts = authCookieOptions(domain);

    // Save admin originals so we can restore on exit. We deliberately keep
    // iqr_session unchanged (still the admin's token); only iqr_email points
    // to the target. resolveSession sees admin_original_* cookies and:
    //   - validates the admin's token against the admin user's sessionToken,
    //   - returns the target user's identity (looked up by iqr_email).
    // The target user's sessionToken is never touched, so they stay logged
    // in everywhere else.
    res.cookie(ADMIN_ORIG_SESSION, adminSession, { ...opts, httpOnly: true });
    res.cookie(ADMIN_ORIG_EMAIL, adminAuth.email, { ...opts, httpOnly: true });
    res.cookie(ADMIN_ORIG_USER_ID, adminAuth.userId, { ...opts, httpOnly: true });
    res.cookie(EMAIL_COOKIE, target.email, { ...opts, httpOnly: false });

    return { ok: true };
  }

  @Post("impersonate/exit")
  @HttpCode(HttpStatus.OK)
  async exitImpersonate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cookies = req.cookies as Record<string, string | undefined>;
    const origSession = cookies?.[ADMIN_ORIG_SESSION];
    const origEmail = cookies?.[ADMIN_ORIG_EMAIL];
    if (!origSession || !origEmail) {
      throw new BadRequestException("No impersonation session found");
    }

    const domain = this.config.get<string>("COOKIE_DOMAIN") || undefined;
    const opts = authCookieOptions(domain);

    res.cookie(SESSION_COOKIE, origSession, opts);
    res.cookie(EMAIL_COOKIE, origEmail, { ...opts, httpOnly: false });

    res.clearCookie(ADMIN_ORIG_SESSION, { path: "/", ...(domain ? { domain } : {}) });
    res.clearCookie(ADMIN_ORIG_EMAIL, { path: "/", ...(domain ? { domain } : {}) });
    res.clearCookie(ADMIN_ORIG_USER_ID, { path: "/", ...(domain ? { domain } : {}) });

    return { ok: true };
  }

  /** Support-chat threads: restaurants with at least one message, newest first. */
  @Get("messages/threads")
  async messageThreads() {
    type Row = {
      rid: string;
      title: string;
      lang: string | null;
      c: number;
      last_at: Date;
      last_msg: string;
      last_admin: boolean;
    };
    const rows = await this.prisma.$queryRaw<Row[]>(Prisma.sql`
      SELECT sm."restaurantId" AS rid, r.title, r."defaultLanguage" AS lang,
             count(*)::int AS c,
             max(sm."createdAt") AS last_at,
             (array_agg(sm.message ORDER BY sm."createdAt" DESC))[1] AS last_msg,
             (array_agg(sm."isAdmin" ORDER BY sm."createdAt" DESC))[1] AS last_admin
      FROM support_messages sm
      JOIN restaurants r ON r.id = sm."restaurantId"
      GROUP BY sm."restaurantId", r.title, r."defaultLanguage"
      ORDER BY max(sm."createdAt") DESC
    `);
    return {
      threads: rows.map((r) => ({
        restaurantId: r.rid,
        title: r.title,
        defaultLanguage: r.lang,
        count: r.c,
        lastMessage: r.last_msg,
        lastAt: r.last_at.toISOString(),
        lastFromAdmin: r.last_admin,
      })),
    };
  }
}
