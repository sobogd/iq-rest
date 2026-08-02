import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { Plan, BillingCycle, SubscriptionStatus } from "@iq-rest/db";
import { AuthGuard, type AuthedRequest } from "../auth/auth.guard";
import { PrismaService } from "../prisma/prisma.service";
import {
  getStripe,
  PRICE_LOOKUP_KEYS,
  type SupportedCurrency,
  isSupportedCurrency,
  decodeSelections,
  fromStripeUnitAmount,
  type VenueSel,
} from "../common/stripe";

interface SubscriptionData {
  id: string;
  status: string;
  current_period_end?: number;
  currency?: string;
  items: {
    data: Array<{
      current_period_end?: number;
      id?: string;
      price: {
        id: string;
        lookup_key?: string | null;
        currency?: string;
        unit_amount?: number | null;
        recurring?: { interval?: string | null } | null;
      };
    }>;
  };
  metadata?: Record<string, string>;
  customer?: string;
  cancel_at_period_end?: boolean;
  cancel_at?: number | null;
}

@Controller("stripe")
export class StripeController {
  constructor(private readonly prisma: PrismaService) {}

  @Post("processing")
  @UseGuards(AuthGuard)
  async setProcessing(@Req() req: Request) {
    const { restaurantId, viaGrant } = (req as AuthedRequest).authUser;
    if (viaGrant) throw new ForbiddenException("Billing is managed by the restaurant owner");
    await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: { paymentProcessing: true },
    });
    return { success: true };
  }

  @Post("portal")
  @UseGuards(AuthGuard)
  async createPortal(@Req() req: Request, @Body() body: { locale?: string }) {
    const { userId, restaurantId, viaGrant } = (req as AuthedRequest).authUser;
    if (viaGrant) throw new ForbiddenException("Billing is managed by the restaurant owner");
    const stripe = getStripe();
    const [restaurant, user] = await Promise.all([
      this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        include: { account: true },
      }),
      this.prisma.user.findUnique({ where: { id: userId } }),
    ]);
    if (user?.isDemo) throw new ForbiddenException("Demo accounts cannot manage billing");
    // Account-level Stripe customer (§3); fall back to the legacy per-user
    // customer for subscriptions created before the account migration.
    const customer = restaurant?.account?.stripeCustomerId;
    if (!customer) {
      throw new BadRequestException("No subscription found");
    }
    const appUrl = process.env.APP_URL;
    if (!appUrl) throw new BadRequestException("APP_URL not configured");
    const locale = body?.locale || "en";
    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${appUrl}/${locale}/dashboard/settings/billing`,
    });
    return { url: session.url };
  }

  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  async webhook(@Req() req: Request, @Headers("stripe-signature") signature?: string) {
    if (!signature) throw new BadRequestException("Missing stripe-signature");
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new BadRequestException("STRIPE_WEBHOOK_SECRET not configured");
    const stripe = getStripe();

    const rawBody: Buffer = (req as unknown as { rawBody?: Buffer }).rawBody as Buffer;
    if (!rawBody) throw new BadRequestException("Missing raw body");

    let event: { id?: string; type: string; data: { object: unknown } };
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, secret) as { id?: string; type: string; data: { object: unknown } };
    } catch (e) {
      console.error("Webhook signature verification failed:", e);
      throw new BadRequestException("Invalid signature");
    }

    // Idempotency / replay guard (Phase 2). Best-effort: if the dedup machinery
    // itself fails we fall through to processing, so this can never make the
    // webhook worse than before. The seen-marker is written AFTER the switch
    // (below), so a handler that throws for a Stripe retry is NOT recorded and
    // gets reprocessed — no payment is silently dropped.
    const eventId = event.id;
    if (eventId) {
      try {
        const seen = await this.prisma.stripeEvent.findUnique({ where: { id: eventId } });
        if (seen) return { received: true, deduped: true };
      } catch (e) {
        console.error("stripe_events dedup check failed (continuing):", e);
      }
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as { subscription?: string; metadata?: Record<string, string> };
        const subId = session.subscription;
        const fallbackRestaurantId = session.metadata?.restaurantId ?? null;
        if (subId) {
          const targetRestaurantId = await this.resolveRestaurantId(subId, fallbackRestaurantId);
          if (targetRestaurantId) {
            const sub = (await stripe.subscriptions.retrieve(subId)) as unknown as SubscriptionData;
            await this.applySubscription(targetRestaurantId, sub);
          }
        } else if (fallbackRestaurantId) {
          await this.prisma.restaurant.update({
            where: { id: fallbackRestaurantId },
            data: { paymentProcessing: false },
          }).catch(() => undefined);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as unknown as SubscriptionData;
        // Mirror the cancel-at-period-end flag directly (robust for both ad-hoc
        // and legacy subs, and independent of restaurant resolution). A portal
        // cancel fires this event with cancel_at_period_end=true.
        {
          const canceling = !!sub.cancel_at_period_end || (typeof sub.cancel_at === "number" && sub.cancel_at * 1000 > Date.now());
          await this.prisma.subscription
            .updateMany({ where: { stripeSubscriptionId: sub.id }, data: { cancelAtPeriodEnd: canceling } })
            .catch(() => undefined);
        }
        const targetRestaurantId = await this.resolveRestaurantId(sub.id, null);
        if (targetRestaurantId) {
          // applySubscription cancels any superseded prev sub before mirroring.
          await this.applySubscription(targetRestaurantId, sub);
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as unknown as SubscriptionData;
        const targetRestaurantId = await this.resolveRestaurantId(sub.id, null);
        if (targetRestaurantId) {
          const r = await this.prisma.restaurant.findUnique({
            where: { id: targetRestaurantId },
            select: {
              account: {
                select: {
                  id: true,
                  subscription: { select: { stripeSubscriptionId: true } },
                  _count: { select: { restaurants: true } },
                },
              },
            },
          });
          if (r?.account?.subscription?.stripeSubscriptionId === sub.id) {
            await this.prisma.restaurant.update({
              where: { id: targetRestaurantId },
              data: { paymentProcessing: false },
            });
            // Cancellation → account Subscription goes FREE/CANCELED (§3).
            await this.mirrorAccountSubscription(targetRestaurantId, {
              plan: "FREE",
              billingCycle: null,
              status: "CANCELED",
              currentPeriodEnd: null,
              stripeSubscriptionId: null,
              customerId: null,
            });
            // Deflate the purchased capacity back to reality (never below the
            // default 4, nor below venues that actually exist) so a re-subscribe
            // re-quotes from the real count instead of a stale inflated cap.
            const realCount = Math.max(4, r.account._count?.restaurants ?? 0);
            await this.prisma.account
              .update({ where: { id: r.account.id }, data: { venueLimit: realCount } })
              .catch(() => undefined);
          }
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as { subscription?: string | null };
        if (invoice.subscription) {
          const targetRestaurantId = await this.resolveRestaurantId(invoice.subscription, null);
          // Only apply if this invoice's subscription is still the restaurant's
          // CURRENT one — a late/retry invoice for a superseded sub must not
          // re-activate a restaurant that has moved on (or been cancelled).
          if (targetRestaurantId && (await this.isCurrentSub(targetRestaurantId, invoice.subscription))) {
            await this.prisma.restaurant.update({
              where: { id: targetRestaurantId },
              data: { paymentProcessing: false },
            });
            const r = await this.prisma.restaurant.findUnique({
              where: { id: targetRestaurantId },
              select: { accountId: true },
            });
            if (r?.accountId) {
              await this.prisma.subscription.updateMany({
                where: { accountId: r.accountId },
                data: { status: "ACTIVE", updatedFromStripeAt: new Date() },
              });
            }
          }
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as { subscription?: string | null };
        if (invoice.subscription) {
          const targetRestaurantId = await this.resolveRestaurantId(invoice.subscription, null);
          if (targetRestaurantId && (await this.isCurrentSub(targetRestaurantId, invoice.subscription))) {
            const r = await this.prisma.restaurant.findUnique({
              where: { id: targetRestaurantId },
              select: { accountId: true },
            });
            if (r?.accountId) {
              await this.prisma.subscription.updateMany({
                where: { accountId: r.accountId },
                data: { status: "PAST_DUE", updatedFromStripeAt: new Date() },
              });
            }
          }
        }
        break;
      }
    }

    // Mark the event handled (best-effort, AFTER successful processing). A unique
    // violation from a concurrent duplicate delivery is fine to ignore.
    if (eventId) {
      try {
        await this.prisma.stripeEvent.create({ data: { id: eventId, type: event.type } });
      } catch {
        /* already recorded / table absent — non-fatal */
      }
    }

    return { received: true };
  }

  /** Find the restaurantId for a Stripe subscription event.
   *  Prefers Restaurant.stripeSubscriptionId; falls back to subscription
   *  metadata for fresh ones whose DB row has not been written yet
   *  (checkout.session.completed race); finally falls back to looking up the
   *  customer's first attached restaurant. */
  private async resolveRestaurantId(
    subscriptionId: string,
    fallbackRestaurantId: string | null,
  ): Promise<string | null> {
    // Prefer the account Subscription carrying this Stripe sub id → its target
    // venue (BASIC applies to one; else the account's first restaurant).
    const subRow = await this.prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
      select: {
        appliesToRestaurantId: true,
        account: { select: { restaurants: { select: { id: true }, orderBy: { createdAt: "asc" }, take: 1 } } },
      },
    });
    if (subRow) return subRow.appliesToRestaurantId ?? subRow.account?.restaurants[0]?.id ?? null;

    try {
      const stripe = getStripe();
      const sub = (await stripe.subscriptions.retrieve(subscriptionId)) as unknown as SubscriptionData;
      const metaRestaurantId = sub.metadata?.restaurantId || fallbackRestaurantId;
      if (metaRestaurantId) {
        const r = await this.prisma.restaurant.findUnique({
          where: { id: metaRestaurantId },
          select: { id: true },
        });
        if (r) return r.id;
      }
      if (sub.customer) {
        // Account-level Stripe customer → the account's first restaurant.
        const acc = await this.prisma.account.findFirst({
          where: { stripeCustomerId: sub.customer },
          select: { restaurants: { select: { id: true }, orderBy: { createdAt: "asc" }, take: 1 } },
        });
        if (acc?.restaurants[0]) return acc.restaurants[0].id;
      }
    } catch (err) {
      // A permanently-missing subscription (deleted) is a legitimate "no target"
      // → return null and let the webhook succeed. Any OTHER error (transient
      // Stripe/DB failure) MUST propagate so the handler 500s and Stripe RETRIES
      // — swallowing it here would silently drop a real payment's PRO forever.
      const code = (err as { code?: string })?.code;
      if (code === "resource_missing") {
        console.error("resolveRestaurantId: subscription missing", subscriptionId);
        return null;
      }
      console.error("resolveRestaurantId (transient, will retry):", err);
      throw err;
    }
    return null;
  }

  /** True if `subscriptionId` is still the restaurant's current subscription.
   *  Guards late/duplicate invoice events for a superseded subscription. */
  private async isCurrentSub(restaurantId: string, subscriptionId: string): Promise<boolean> {
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { account: { select: { subscription: { select: { stripeSubscriptionId: true } } } } },
    });
    return r?.account?.subscription?.stripeSubscriptionId === subscriptionId;
  }

  /** Cancel the account's PREVIOUS Stripe subscription when a different one is
   *  taking over, BEFORE we overwrite stripeSubscriptionId. Runs for every event
   *  that applies a subscription (checkout.session.completed AND
   *  customer.subscription.created/updated) because Stripe does not guarantee
   *  event ordering — if `checkout.session.completed` for the new sub lands first
   *  and overwrites the id, a later `created`/`updated` would see prev == new and
   *  miss the swap, leaving two active subs (double charge). */
  private async cancelSupersededSub(restaurantId: string, newSubId: string): Promise<void> {
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { account: { select: { subscription: { select: { stripeSubscriptionId: true } } } } },
    });
    const prevSubId = r?.account?.subscription?.stripeSubscriptionId ?? null;
    if (prevSubId && prevSubId !== newSubId) {
      try {
        await getStripe().subscriptions.cancel(prevSubId);
      } catch (err) {
        console.error("Cancel old sub error:", err);
      }
    }
  }

  private async applySubscription(
    restaurantId: string,
    sub: SubscriptionData,
  ): Promise<void> {
    // Cancel a superseded sub before mirroring overwrites stripeSubscriptionId.
    await this.cancelSupersededSub(restaurantId, sub.id);

    const item = sub.items.data[0];
    const lookupKey = item?.price.lookup_key;

    // ── Ad-hoc à-la-carte subscription (billing-features-constructor) ─────────
    // Identified by the `sel` (per-venue) or `uf` (uniform bitmask) metadata.
    // Amount/interval come from the price; the plan label is cosmetic (features
    // live on the per-restaurant flags we provision here). `uf` is the fallback
    // for big accounts where the per-venue `sel` would blow Stripe's 500-char
    // metadata limit — the feature set is uniform, so one bitmask suffices.
    if (sub.metadata?.sel || sub.metadata?.uf) {
      await this.applyAdhocSubscription(restaurantId, sub);
      return;
    }


    let plan: Plan = "FREE";
    let billingCycle: BillingCycle | null = null;
    let matched = false;
    if (lookupKey) {
      if (lookupKey.startsWith(PRICE_LOOKUP_KEYS.BASIC_MONTHLY)) {
        plan = "BASIC"; billingCycle = "MONTHLY"; matched = true;
      } else if (lookupKey.startsWith(PRICE_LOOKUP_KEYS.BASIC_YEARLY)) {
        plan = "BASIC"; billingCycle = "YEARLY"; matched = true;
      } else if (lookupKey.startsWith(PRICE_LOOKUP_KEYS.PRO_MONTHLY)) {
        plan = "PRO"; billingCycle = "MONTHLY"; matched = true;
      } else if (lookupKey.startsWith(PRICE_LOOKUP_KEYS.PRO_YEARLY)) {
        plan = "PRO"; billingCycle = "YEARLY"; matched = true;
      }
    }

    let subscriptionStatus: SubscriptionStatus = "INACTIVE";
    switch (sub.status) {
      case "active":
      case "trialing":
        subscriptionStatus = "ACTIVE"; break;
      case "past_due":
        subscriptionStatus = "PAST_DUE"; break;
      case "canceled":
      case "unpaid":
        subscriptionStatus = "CANCELED"; break;
      case "incomplete":
      case "incomplete_expired":
        subscriptionStatus = "EXPIRED"; break;
    }

    const periodEnd = item?.current_period_end ?? sub.current_period_end;
    let currentPeriodEnd: Date | null = null;
    if (typeof periodEnd === "number" && periodEnd > 0) {
      const d = new Date(periodEnd * 1000);
      if (!isNaN(d.getTime())) currentPeriodEnd = d;
    }

    // Stripe reports the subscription currency in lowercase ISO (e.g. "nok").
    const subCurrency = (sub.currency ?? item?.price.currency ?? "").toUpperCase();
    const billingCurrency = isSupportedCurrency(subCurrency) ? subCurrency : undefined;

    // Misconfigured Stripe price: a live sub whose lookup_key maps to no known
    // plan. Do NOT silently stamp plan=FREE over the restaurant (that would mean
    // "charged but no PRO"). Log loudly for a human to fix the price, and leave
    // plan/billingCycle untouched (write only status/period/customer).
    const liveStatus = subscriptionStatus === "ACTIVE" || subscriptionStatus === "PAST_DUE";
    if (!matched && liveStatus) {
      console.error(
        `applySubscription: unrecognized price lookup_key "${lookupKey ?? "<none>"}" ` +
          `for sub ${sub.id} (restaurant ${restaurantId}, status ${sub.status}). ` +
          `Plan NOT changed — fix the Stripe price lookup_key.`,
      );
    }

    // Clear the checkout-in-progress spinner (transient per-restaurant flag).
    await this.prisma.restaurant.update({
      where: { id: restaurantId },
      data: { paymentProcessing: false },
    });

    // Billing state lives on the account Subscription now (§3). Write plan/cycle
    // only for a recognized price; an unrecognized live price still updates the
    // status/period on the existing sub (already logged loudly above).
    if (matched) {
      await this.mirrorAccountSubscription(restaurantId, {
        plan,
        billingCycle,
        status: subscriptionStatus,
        currentPeriodEnd,
        stripeSubscriptionId: sub.id,
        billingCurrency,
        customerId: typeof sub.customer === "string" ? sub.customer : null,
      });
    } else if (liveStatus) {
      const r = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { accountId: true },
      });
      if (r?.accountId) {
        await this.prisma.subscription.updateMany({
          where: { accountId: r.accountId },
          data: {
            status: subscriptionStatus,
            currentPeriodEnd,
            stripeSubscriptionId: sub.id,
            updatedFromStripeAt: new Date(),
          },
        });
      }
    }
  }

  /** Ad-hoc à-la-carte subscription: amount/interval from the price, features
   *  from the encoded per-venue selection. The plan label is set to PRO so the
   *  entitlement gate grants account-wide access; the per-venue feature flags
   *  (which we provision here) decide what each venue actually gets. Venues NOT
   *  in the paid selection (and not manually comped) are deactivated so they
   *  don't stay online for free. */
  private async applyAdhocSubscription(restaurantId: string, sub: SubscriptionData): Promise<void> {
    const item = sub.items.data[0];
    let sels = decodeSelections(sub.metadata?.sel);
    // Fallback: no per-venue `sel` (dropped to stay under Stripe's metadata
    // limit) → expand the uniform `uf` bitmask across every current account venue.
    const uf = Number(sub.metadata?.uf);
    if (sels.length === 0 && Number.isFinite(uf)) {
      const r = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { accountId: true },
      });
      if (r?.accountId) {
        const venues = await this.prisma.restaurant.findMany({
          where: { accountId: r.accountId },
          select: { id: true },
        });
        sels = venues.map((v) => ({
          restaurantId: v.id,
          menuOnline: !!(uf & 1),
          reservations: !!(uf & 2),
          ordersKds: !!(uf & 4),
          domain: !!(uf & 8),
        }));
      }
    }

    let status: SubscriptionStatus = "INACTIVE";
    switch (sub.status) {
      case "active":
      case "trialing":
        status = "ACTIVE"; break;
      case "past_due":
        status = "PAST_DUE"; break;
      case "canceled":
      case "unpaid":
        status = "CANCELED"; break;
      case "incomplete":
      case "incomplete_expired":
        status = "EXPIRED"; break;
    }

    const periodEnd = item?.current_period_end ?? sub.current_period_end;
    let currentPeriodEnd: Date | null = null;
    if (typeof periodEnd === "number" && periodEnd > 0) {
      const d = new Date(periodEnd * 1000);
      if (!isNaN(d.getTime())) currentPeriodEnd = d;
    }

    const interval = item?.price.recurring?.interval === "year" ? "year" : "month";
    const billingCycle: BillingCycle = interval === "year" ? "YEARLY" : "MONTHLY";
    const subCurrency = (sub.currency ?? item?.price.currency ?? "").toUpperCase();
    // Store `amount` in our internal cents convention (major×100) regardless of
    // the currency's Stripe unit — so `amount / 100` renders correctly for
    // zero-decimal currencies (e.g. CLP) too.
    const amount =
      typeof item?.price.unit_amount === "number"
        ? fromStripeUnitAmount(item.price.unit_amount, subCurrency)
        : null;
    const billingCurrency = isSupportedCurrency(subCurrency) ? subCurrency : undefined;
    const provenance = sub.metadata?.prov ?? "custom";

    await this.prisma.restaurant
      .update({ where: { id: restaurantId }, data: { paymentProcessing: false } })
      .catch(() => undefined);

    // Provision feature flags for each paid venue (venues absent from the
    // selection are left untouched — see provisionAdhocFlags).
    await this.provisionAdhocFlags(restaurantId, sels);

    // Purchased capacity → the account's venue limit (how many restaurants the
    // owner can have). `cap` is the count of slots bought in the constructor.
    const cap = Number(sub.metadata?.cap);
    if (Number.isFinite(cap) && cap >= 1 && (status === "ACTIVE" || status === "PAST_DUE")) {
      const r = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { accountId: true },
      });
      if (r?.accountId) {
        await this.prisma.account
          .update({ where: { id: r.accountId }, data: { venueLimit: Math.floor(cap) } })
          .catch(() => undefined);
      }
    }

    // plan = PRO → account-wide access active; features gated by the flags above.
    await this.mirrorAccountSubscription(restaurantId, {
      plan: "PRO",
      billingCycle,
      status,
      currentPeriodEnd,
      stripeSubscriptionId: sub.id,
      billingCurrency,
      customerId: typeof sub.customer === "string" ? sub.customer : null,
      appliesToRestaurantId: null,
      amount,
      currency: billingCurrency,
      interval,
      provider: "stripe",
      priceProvenance: provenance,
      // A scheduled cancel is expressed EITHER as cancel_at_period_end OR as a
      // concrete cancel_at timestamp — treat both as canceling, else a portal
      // cancel-by-date would mirror as cancelAtPeriodEnd=false and the UI would
      // wrongly show the sub as fully active (no "Cancels on…", no Resume).
      cancelAtPeriodEnd:
        !!sub.cancel_at_period_end || (typeof sub.cancel_at === "number" && sub.cancel_at * 1000 > Date.now()),
    });
  }

  /** Write the paid selection's feature flags onto each selected venue.
   *
   *  Only venues present in `sels` are touched. We deliberately do NOT deactivate
   *  account venues that are absent from `sels`: the `sel` metadata is a SNAPSHOT
   *  from checkout time, and a `customer.subscription.updated` (fires on every
   *  renewal / card change / portal action) would otherwise darken any venue the
   *  owner added AFTER purchasing — turning its public menu off mid-period. Venues
   *  added later inherit the purchased feature set at creation time; unpaid
   *  capacity is already bounded by the account venueLimit gate. */
  private async provisionAdhocFlags(restaurantId: string, sels: VenueSel[]): Promise<void> {
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { accountId: true },
    });
    if (!r?.accountId) return;
    const accountId = r.accountId;
    await Promise.all(
      sels
        .filter((s) => s.restaurantId)
        .map((sel) =>
          // Scope to the account (the id came from metadata, not a live check).
          this.prisma.restaurant
            .updateMany({
              where: { id: sel.restaurantId, accountId },
              data: {
                featMenuOnline: sel.menuOnline,
                featOrders: sel.ordersKds,
                featKds: sel.ordersKds,
                featReservations: sel.reservations,
                featCustomDomain: sel.domain,
                featAiUnlimited: sel.ordersKds,
              },
            })
            .catch(() => undefined),
        ),
    );
  }

  /** Mirror a reconciled subscription into the account-level Subscription row.
   *  PRO applies to the whole account (appliesToRestaurantId null); BASIC applies
   *  to the single paying venue. New-table-only; callers guard with .catch. */
  private async mirrorAccountSubscription(
    restaurantId: string,
    s: {
      plan: Plan;
      billingCycle: BillingCycle | null;
      status: SubscriptionStatus;
      currentPeriodEnd: Date | null;
      stripeSubscriptionId: string | null;
      billingCurrency?: string;
      customerId: string | null;
      // billing-features-constructor extras (ad-hoc). When omitted, the legacy
      // plan-based appliesToRestaurantId pinning is used.
      appliesToRestaurantId?: string | null;
      amount?: number | null;
      currency?: string;
      interval?: string;
      provider?: string;
      priceProvenance?: string;
      cancelAtPeriodEnd?: boolean;
    },
  ): Promise<void> {
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { accountId: true },
    });
    if (!r?.accountId) return;
    const appliesToRestaurantId =
      s.appliesToRestaurantId !== undefined
        ? s.appliesToRestaurantId
        : s.plan === "BASIC"
          ? restaurantId
          : null;
    const data = {
      plan: s.plan,
      billingCycle: s.billingCycle,
      status: s.status,
      currentPeriodEnd: s.currentPeriodEnd,
      stripeSubscriptionId: s.stripeSubscriptionId,
      appliesToRestaurantId,
      updatedFromStripeAt: new Date(),
      ...(s.provider ? { provider: s.provider } : {}),
      ...(s.amount !== undefined ? { amount: s.amount } : {}),
      ...(s.currency ? { currency: s.currency } : {}),
      ...(s.interval ? { interval: s.interval } : {}),
      ...(s.priceProvenance ? { priceProvenance: s.priceProvenance } : {}),
      ...(s.cancelAtPeriodEnd !== undefined ? { cancelAtPeriodEnd: s.cancelAtPeriodEnd } : {}),
    };
    await this.prisma.subscription.upsert({
      where: { accountId: r.accountId },
      create: { accountId: r.accountId, ...data },
      update: data,
    });
    // Keep the account's Stripe customer + currency in sync when known.
    if (s.customerId || s.billingCurrency) {
      await this.prisma.account
        .update({
          where: { id: r.accountId },
          data: {
            ...(s.customerId ? { stripeCustomerId: s.customerId } : {}),
            ...(s.billingCurrency ? { billingCurrency: s.billingCurrency } : {}),
          },
        })
        .catch((e) => console.error("account customer/currency sync failed (non-fatal):", e));
    }
  }
}
