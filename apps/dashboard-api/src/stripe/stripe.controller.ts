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
  type PriceLookupKey,
  type SupportedCurrency,
  getLookupKeyWithCurrency,
  isSupportedCurrency,
  getAdhocProductId,
  encodeSelections,
  decodeSelections,
  type VenueSel,
} from "../common/stripe";
import { getRequestBillingCurrency } from "../common/geo";
import {
  DEFAULT_PRICING_CATALOG,
  computeAccountQuote,
  type PricingCatalog,
  type Cycle,
} from "@iq-rest/pricing";

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
}

// A per-venue selection sent by the constructor / quiz checkout.
type CheckoutSelection = {
  restaurantId: string;
  menuOnline?: boolean;
  reservations?: boolean;
  ordersKds?: boolean;
  domain?: boolean;
};

@Controller("stripe")
export class StripeController {
  constructor(private readonly prisma: PrismaService) {}

  @Post("checkout")
  @UseGuards(AuthGuard)
  async createCheckout(
    @Req() req: Request,
    @Body()
    body: {
      priceLookupKey?: string;
      locale?: string;
      currency?: string;
      // billing-features-constructor: ad-hoc à-la-carte checkout. When present,
      // the amount is computed from the pricing catalog (not a lookup key) and a
      // one-off immutable price_data drives the subscription.
      selections?: CheckoutSelection[];
      cycle?: string;
    },
  ) {
    // Per-restaurant billing — checkout creates a Stripe subscription scoped
    // to the CURRENTLY ACTIVE restaurant. Each restaurant has its own sub.
    // The Stripe customer is per-human (User.stripeCustomerId).
    const { userId, restaurantId, viaGrant } = (req as AuthedRequest).authUser;
    if (viaGrant) throw new ForbiddenException("Billing is managed by the restaurant owner");
    const stripe = getStripe();
    const [restaurant, user] = await Promise.all([
      this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        include: { account: { include: { subscription: true } } },
      }),
      this.prisma.user.findUnique({ where: { id: userId } }),
    ]);
    if (!restaurant) throw new BadRequestException("Restaurant not found");
    if (!user) throw new BadRequestException("User not found");
    // Billing is account-level now (§3): one Stripe customer + subscription per
    // account. Read customer/currency/sub-state off the account.
    const acct = restaurant.account;
    const acctSub = acct?.subscription ?? null;
    // Demo accounts can't pay — they convert via the "save your menu" email
    // claim, not Stripe. The billing UI is hidden for them client-side too.
    if (user.isDemo) throw new ForbiddenException("Demo accounts cannot start a subscription");

    const isAdhoc = Array.isArray(body.selections) && body.selections.length > 0;

    const validKeys: string[] = [
      PRICE_LOOKUP_KEYS.BASIC_MONTHLY,
      PRICE_LOOKUP_KEYS.BASIC_YEARLY,
      PRICE_LOOKUP_KEYS.PRO_MONTHLY,
      PRICE_LOOKUP_KEYS.PRO_YEARLY,
    ];
    if (!isAdhoc && (!body.priceLookupKey || !validKeys.includes(body.priceLookupKey))) {
      throw new BadRequestException("Invalid price lookup key");
    }

    // Resolve billing currency. The restaurant's stored billingCurrency (set at
    // onboarding / via the pricing selector) wins; an explicit body.currency or
    // the geo-derived currency is the fallback. Currency is locked once a Stripe
    // customer exists for the restaurant (Stripe won't mix currencies), so for
    // an active sub we always reuse the stored one.
    const requested = isSupportedCurrency(body.currency?.toUpperCase())
      ? (body.currency!.toUpperCase() as SupportedCurrency)
      : null;
    const stored = isSupportedCurrency(acct?.billingCurrency)
      ? (acct!.billingCurrency as SupportedCurrency)
      : null;
    // Active sub → currency is locked to whatever the customer already pays in.
    // Otherwise the selector/cookie choice wins, then the stored value, then geo.
    const locked = acctSub?.status === "ACTIVE";
    const currency: SupportedCurrency = locked
      ? (stored ?? requested ?? getRequestBillingCurrency(req))
      : (requested ?? stored ?? getRequestBillingCurrency(req));
    const baseLookupKey = body.priceLookupKey as PriceLookupKey;
    const fullLookupKey = getLookupKeyWithCurrency(baseLookupKey, currency);

    // When there's already an active subscription and this is a LEGACY lookup-key
    // switch, route to the Stripe Billing Portal (proration preview). Ad-hoc
    // changes are handled below (subscription item swap, immediate proration).
    if (!isAdhoc && acctSub?.status === "ACTIVE" && acctSub.stripeSubscriptionId) {
      const customer = acct?.stripeCustomerId;
      if (!customer) {
        throw new BadRequestException("Subscription is active but no Stripe customer found");
      }
      const appUrl = process.env.APP_URL;
      if (!appUrl) throw new BadRequestException("APP_URL not configured");
      const locale = body.locale || "en";
      const portal = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${appUrl}/${locale}/dashboard/settings/billing`,
      });
      return { url: portal.url };
    }

    // One Stripe customer per ACCOUNT (§3). Reuse the account's customer if it
    // has one; otherwise create a fresh one for the account.
    let customerId = acct?.stripeCustomerId ?? null;
    if (customerId) {
      try {
        const existing = await stripe.customers.retrieve(customerId);
        if ((existing as { deleted?: boolean }).deleted) customerId = null;
      } catch {
        customerId = null;
      }
    }
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { restaurantId: restaurant.id, userId: user.id, accountId: acct?.id ?? "" },
      });
      customerId = customer.id;
    }
    // Persist the Stripe customer + currency on the account (source of truth, §3).
    if (acct) {
      await this.prisma.account.update({
        where: { id: acct.id },
        data: { stripeCustomerId: customerId, billingCurrency: currency },
      });
    }

    const appUrl = process.env.APP_URL;
    if (!appUrl) throw new BadRequestException("APP_URL not configured");
    const locale = body.locale || "en";

    // ── Ad-hoc à-la-carte path (billing-features-constructor) ─────────────────
    if (isAdhoc) {
      const catalog = await this.pricingCatalog();
      const cycle: Cycle = body.cycle === "year" || body.cycle === "yearly" ? "year" : "month";
      const sels: VenueSel[] = body.selections!.map((s) => ({
        restaurantId: s.restaurantId,
        menuOnline: s.menuOnline ?? true,
        reservations: !!s.reservations,
        ordersKds: !!s.ordersKds,
        domain: !!s.domain,
      }));
      const quote = computeAccountQuote(
        catalog,
        currency,
        sels.map((s) => ({
          menuOnline: s.menuOnline,
          reservations: s.reservations,
          ordersKds: s.ordersKds,
          domain: s.domain,
        })),
        cycle,
      );
      if (quote.amountCents < 50) throw new BadRequestException("Amount too low");
      const productId = await getAdhocProductId();
      const selMeta = encodeSelections(sels);
      const meta = { restaurantId: restaurant.id, userId: user.id, accountId: acct?.id ?? "", sel: selMeta, prov: "custom" };

      // CHANGE an existing subscription in place → immediate proration (§Q6).
      if (acctSub?.status === "ACTIVE" && acctSub.stripeSubscriptionId) {
        const price = await stripe.prices.create({
          currency: currency.toLowerCase(),
          product: productId,
          unit_amount: quote.amountCents,
          recurring: { interval: cycle },
        });
        const stripeSub = (await stripe.subscriptions.retrieve(acctSub.stripeSubscriptionId)) as unknown as SubscriptionData;
        const itemId = stripeSub.items.data[0]?.id;
        await stripe.subscriptions.update(acctSub.stripeSubscriptionId, {
          items: itemId ? [{ id: itemId, price: price.id }] : undefined,
          proration_behavior: "always_invoice",
          metadata: meta,
        });
        // The customer.subscription.updated webhook applies state + provisions flags.
        return { url: `${appUrl}/${locale}/dashboard/settings/billing?success=true` };
      }

      // NEW subscription via Checkout with a one-off immutable price_data.
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product: productId,
              unit_amount: quote.amountCents,
              recurring: { interval: cycle },
            },
            quantity: 1,
          },
        ],
        success_url: `${appUrl}/${locale}/dashboard/settings/billing?success=true`,
        cancel_url: `${appUrl}/${locale}/dashboard/settings/billing?canceled=true`,
        subscription_data: { metadata: meta },
        metadata: meta,
      });
      if (!session.url) throw new BadRequestException("Stripe did not return a checkout URL");
      await this.prisma.restaurant.update({ where: { id: restaurant.id }, data: { paymentProcessing: true } });
      return { url: session.url };
    }

    // ── Legacy lookup-key path ────────────────────────────────────────────────
    let prices = await stripe.prices.list({ lookup_keys: [fullLookupKey], active: true, limit: 1 });
    if (prices.data.length === 0) {
      // Fallback to base lookup key without currency suffix.
      prices = await stripe.prices.list({ lookup_keys: [baseLookupKey], active: true, limit: 1 });
    }
    if (prices.data.length === 0) {
      throw new BadRequestException(`Price not found for ${fullLookupKey} or ${baseLookupKey}`);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: prices.data[0].id, quantity: 1 }],
      success_url: `${appUrl}/${locale}/dashboard/settings/billing?success=true`,
      cancel_url: `${appUrl}/${locale}/dashboard/settings/billing?canceled=true`,
      subscription_data: { metadata: { restaurantId: restaurant.id, userId: user.id } },
      metadata: { restaurantId: restaurant.id, userId: user.id },
    });

    if (!session.url) {
      throw new BadRequestException("Stripe did not return a checkout URL");
    }

    await this.prisma.restaurant.update({
      where: { id: restaurant.id },
      data: { paymentProcessing: true },
    });

    return { url: session.url };
  }

  // Live pricing catalog (PricingConfig singleton) with the built-in fallback.
  private async pricingCatalog(): Promise<PricingCatalog> {
    const row = await this.prisma.pricingConfig.findUnique({ where: { id: "default" } }).catch(() => null);
    return (row?.data as unknown as PricingCatalog) ?? DEFAULT_PRICING_CATALOG;
  }

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
        const targetRestaurantId = await this.resolveRestaurantId(sub.id, null);
        if (targetRestaurantId) {
          // Cancel the restaurant's PREVIOUS subscription if a different one is
          // now taking over. Done for BOTH created AND updated (and BEFORE
          // applySubscription overwrites stripeSubscriptionId) because Stripe
          // doesn't guarantee event ordering — if `updated` for the new sub
          // lands before `created`, doing this only on `created` would miss the
          // swap and leave two active subs (double charge).
          const r = await this.prisma.restaurant.findUnique({
            where: { id: targetRestaurantId },
            select: { account: { select: { subscription: { select: { stripeSubscriptionId: true } } } } },
          });
          const prevSubId = r?.account?.subscription?.stripeSubscriptionId ?? null;
          if (prevSubId && prevSubId !== sub.id) {
            try {
              await stripe.subscriptions.cancel(prevSubId);
            } catch (err) {
              console.error("Cancel old sub error:", err);
            }
          }
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
            select: { account: { select: { subscription: { select: { stripeSubscriptionId: true } } } } },
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

  private async applySubscription(
    restaurantId: string,
    sub: SubscriptionData,
  ): Promise<void> {
    const item = sub.items.data[0];
    const lookupKey = item?.price.lookup_key;

    // ── Ad-hoc à-la-carte subscription (billing-features-constructor) ─────────
    // Identified by the `sel` metadata (per-venue selection encoded at checkout).
    // Amount/interval come from the price; the plan label is cosmetic (features
    // live on the per-restaurant flags we provision here).
    const selEncoded = sub.metadata?.sel;
    if (selEncoded) {
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
    const sels = decodeSelections(sub.metadata?.sel);

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
    const amount = typeof item?.price.unit_amount === "number" ? item.price.unit_amount : null;
    const subCurrency = (sub.currency ?? item?.price.currency ?? "").toUpperCase();
    const billingCurrency = isSupportedCurrency(subCurrency) ? subCurrency : undefined;
    const provenance = sub.metadata?.prov ?? "custom";

    await this.prisma.restaurant
      .update({ where: { id: restaurantId }, data: { paymentProcessing: false } })
      .catch(() => undefined);

    // Provision feature flags per venue, and deactivate account venues that are
    // not in this paid selection (unless manually comped).
    await this.provisionAdhocFlags(restaurantId, sels);

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
    });
  }

  /** Write the paid selection's feature flags onto each selected venue, and turn
   *  OFF venues in the same account that weren't paid for (and aren't comped). */
  private async provisionAdhocFlags(restaurantId: string, sels: VenueSel[]): Promise<void> {
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { accountId: true },
    });
    if (!r?.accountId) return;
    const selectedIds = new Set(sels.map((s) => s.restaurantId));
    const venues = await this.prisma.restaurant.findMany({
      where: { accountId: r.accountId },
      select: { id: true, manualAccess: true },
    });
    await Promise.all(
      venues.map((v) => {
        const sel = sels.find((s) => s.restaurantId === v.id);
        if (sel) {
          return this.prisma.restaurant
            .update({
              where: { id: v.id },
              data: {
                featMenuOnline: sel.menuOnline,
                featOrders: sel.ordersKds,
                featKds: sel.ordersKds,
                featReservations: sel.reservations,
                featCustomDomain: sel.domain,
                featAiUnlimited: sel.ordersKds,
              },
            })
            .catch(() => undefined);
        }
        // Not in the paid selection. Leave manually-comped venues alone; otherwise
        // deactivate so an unpaid venue doesn't stay online under the account sub.
        if (v.manualAccess || selectedIds.has(v.id)) return undefined;
        return this.prisma.restaurant
          .update({
            where: { id: v.id },
            data: {
              featMenuOnline: false,
              featOrders: false,
              featKds: false,
              featReservations: false,
              featCustomDomain: false,
              featAiUnlimited: false,
            },
          })
          .catch(() => undefined);
      }),
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
