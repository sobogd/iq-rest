import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import {
  DEFAULT_PRICING_CATALOG,
  computeAccountQuote,
  type PricingCatalog,
  type VenueSelection,
  type Cycle,
} from "@iq-rest/pricing";
import { AuthGuard, type AuthedRequest } from "../auth/auth.guard";
import { AdminGuard } from "../admin/admin.guard";
import { PrismaService } from "../prisma/prisma.service";
import {
  getStripe,
  getAdhocProductId,
  encodeSelections,
  toStripeUnitAmount,
  fromStripeUnitAmount,
  isSupportedCurrency,
  type SupportedCurrency,
  type VenueSel,
} from "../common/stripe";
import { getTrustedBillingCurrency } from "../common/geo";

// Body shape for a per-venue feature selection sent by the constructor / quiz.
type SelectionBody = {
  restaurantId?: string;
  menuOnline?: boolean;
  reservations?: boolean;
  ordersKds?: boolean;
  domain?: boolean;
};

function toSelection(s: SelectionBody): VenueSelection {
  return {
    menuOnline: s.menuOnline ?? true,
    reservations: !!s.reservations,
    ordersKds: !!s.ordersKds,
    domain: !!s.domain,
  };
}

function normalizeCycle(c: string | undefined): Cycle {
  return c === "year" || c === "yearly" || c === "YEARLY" ? "year" : "month";
}

// Provider-agnostic billing surface (billing-features-constructor):
//   - public pricing catalog (landing + dashboard read the same source)
//   - price quote for the constructor
//   - customer billing profile + invoices (read/write)
//   - SEPA-by-invoice request (manual provider, yearly only)
//   - admin: edit pricing, set per-restaurant feature flags
@Controller()
export class BillingController {
  constructor(private readonly prisma: PrismaService) {}

  // ── Public: the price catalog (single source of truth) ─────────────────────
  // No auth — the landing (ISR) and the dashboard both read this. Falls back to
  // the built-in default catalog when the admin hasn't customised it yet.
  @Get("pricing")
  async getPricing(): Promise<PricingCatalog> {
    const row = await this.prisma.pricingConfig
      .findUnique({ where: { id: "default" } })
      .catch(() => null);
    return (row?.data as unknown as PricingCatalog) ?? DEFAULT_PRICING_CATALOG;
  }

  private async catalog(): Promise<PricingCatalog> {
    return this.getPricing();
  }

  // ── Quote: compute the amount for a set of venue selections ────────────────
  @Post("billing/quote")
  @UseGuards(AuthGuard)
  async quote(
    @Body() body: { selections?: SelectionBody[]; cycle?: string; currency?: string },
  ) {
    const catalog = await this.catalog();
    const cycle = normalizeCycle(body.cycle);
    const currency = (body.currency || "EUR").toUpperCase();
    const venues = (body.selections ?? []).map(toSelection);
    if (venues.length === 0) throw new BadRequestException("No venues selected");
    return computeAccountQuote(catalog, currency, venues, cycle);
  }

  // ── Customer billing profile (payer legal data; all optional) ──────────────
  @Get("billing/profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: Request) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const accountId = await this.accountIdFor(req);
    const [profile, user] = await Promise.all([
      this.prisma.billingProfile.findUnique({ where: { accountId } }),
      this.prisma.user.findUnique({
        where: { id: (req as AuthedRequest).authUser.userId },
        select: { email: true },
      }),
    ]);
    return {
      legalName: profile?.legalName ?? "",
      taxId: profile?.taxId ?? "",
      address: profile?.address ?? "",
      // Prefill the invoice email with the logged-in user's email when unset.
      billingEmail: profile?.billingEmail ?? user?.email ?? "",
    };
  }

  @Put("billing/profile")
  @UseGuards(AuthGuard)
  async saveProfile(
    @Req() req: Request,
    @Body() body: { legalName?: string; taxId?: string; address?: string; billingEmail?: string },
  ) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const accountId = await this.accountIdFor(req);
    const data = {
      legalName: (body.legalName ?? "").trim() || null,
      taxId: (body.taxId ?? "").trim() || null,
      address: (body.address ?? "").trim() || null,
      billingEmail: (body.billingEmail ?? "").trim() || null,
    };
    await this.prisma.billingProfile.upsert({
      where: { accountId },
      create: { accountId, ...data },
      update: data,
    });
    return { success: true };
  }

  // ── Invoices (manual: rows inserted in the DB by the owner; read-only here) ─
  @Get("billing/invoices")
  @UseGuards(AuthGuard)
  async listInvoices(@Req() req: Request) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const accountId = await this.accountIdFor(req);
    const rows = await this.prisma.invoice.findMany({
      where: { accountId },
      orderBy: [{ issuedAt: "desc" }, { createdAt: "desc" }],
    });
    return rows.map((r) => ({
      id: r.id,
      number: r.number,
      issuedAt: r.issuedAt,
      amount: r.amount != null ? r.amount / 100 : null,
      currency: r.currency,
      fileUrl: r.fileUrl,
    }));
  }

  // ── SEPA-by-invoice request (manual provider; YEARLY only) ─────────────────
  // Creates a PENDING subscription and records the desired venue features.
  // Features stay dark (the entitlement gate ignores a PENDING sub) until the
  // owner marks the sub ACTIVE + sets currentPeriodEnd directly in the DB.
  @Post("billing/sepa-request")
  @UseGuards(AuthGuard)
  async sepaRequest(
    @Req() req: Request,
    @Body()
    body: { selections?: SelectionBody[]; currency?: string; email?: string },
  ) {
    const authUser = (req as AuthedRequest).authUser;
    if (authUser.viaGrant) throw new ForbiddenException("Billing is managed by the restaurant owner");
    const accountId = await this.accountIdFor(req);
    const catalog = await this.catalog();
    const currency = (body.currency || "EUR").toUpperCase();
    const rawSelections = body.selections ?? [];
    const venues = rawSelections.map(toSelection);
    if (venues.length === 0) throw new BadRequestException("No venues selected");

    // Never clobber a live Stripe subscription. The upsert below overwrites the
    // single per-account Subscription row; doing that while a Stripe sub is
    // ACTIVE/PAST_DUE would null out its stripeSubscriptionId (losing the link
    // to a sub Stripe keeps charging) and drop entitlement to PENDING. Require
    // the owner to cancel the Stripe sub first.
    const existing = await this.prisma.subscription.findUnique({ where: { accountId } });
    if (
      existing?.stripeSubscriptionId &&
      existing.provider === "stripe" &&
      (existing.status === "ACTIVE" || existing.status === "PAST_DUE")
    ) {
      throw new BadRequestException("An active subscription already exists — cancel it before requesting SEPA billing");
    }

    // SEPA-by-invoice is yearly only.
    const quote = computeAccountQuote(catalog, currency, venues, "year");

    // Record the request as a PENDING manual subscription on the account. The
    // subscription is account-wide; the per-venue feature flags decide WHICH
    // features each venue keeps.
    const data = {
      billingCycle: "YEARLY",
      status: "PENDING",
      provider: "sepa_manual",
      amount: quote.amountCents,
      currency,
      interval: "year",
      priceProvenance: "custom",
      currentPeriodEnd: null,
      stripeSubscriptionId: null,
      updatedFromStripeAt: null,
    };
    await this.prisma.subscription.upsert({
      where: { accountId },
      create: { accountId, ...data },
      update: data,
    });

    // Prefill / store the invoice email on the billing profile.
    const email = (body.email ?? "").trim();
    if (email) {
      await this.prisma.billingProfile.upsert({
        where: { accountId },
        create: { accountId, billingEmail: email },
        update: { billingEmail: email },
      });
    }

    // Pre-provision the venue feature flags (gated dark until the sub is ACTIVE),
    // so the owner only has to flip the status in the DB to light everything up.
    await this.provisionFlags(accountId, rawSelections);

    return { success: true, amount: quote.amountMajor, currency, interval: "year" };
  }

  // ── Custom Stripe Elements flow (no hosted Checkout / no billing portal) ────

  // Resolve the account + its Stripe customer (creating one if missing).
  private async getAccountStripe(
    req: Request,
  ): Promise<{ accountId: string; customerId: string; currency: SupportedCurrency }> {
    const { userId, restaurantId } = (req as AuthedRequest).authUser;
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: { account: true },
    });
    const acct = restaurant?.account;
    if (!acct) throw new BadRequestException("No account");
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { email: true, isDemo: true } });
    if (!user) throw new BadRequestException("No user");
    if (user.isDemo) throw new ForbiddenException("Demo accounts cannot pay");
    const stripe = getStripe();
    const stored = isSupportedCurrency(acct.billingCurrency) ? (acct.billingCurrency as SupportedCurrency) : null;
    const currency: SupportedCurrency = stored ?? getTrustedBillingCurrency(req);
    let customerId = acct.stripeCustomerId ?? null;
    if (customerId) {
      try {
        const ex = await stripe.customers.retrieve(customerId);
        if ((ex as { deleted?: boolean }).deleted) customerId = null;
      } catch {
        customerId = null;
      }
    }
    if (!customerId) {
      const c = await stripe.customers.create({ email: user.email, metadata: { accountId: acct.id, userId } });
      customerId = c.id;
    }
    await this.prisma.account.update({
      where: { id: acct.id },
      data: { stripeCustomerId: customerId, billingCurrency: currency },
    });
    return { accountId: acct.id, customerId, currency };
  }

  // Create OR change a subscription. New sub → default_incomplete + returns the
  // PaymentIntent client_secret for the PaymentElement to confirm (SCA handled
  // there). Existing active sub → swap items in place (proration charged to the
  // saved card), no card entry needed.
  @Post("billing/subscribe")
  @UseGuards(AuthGuard)
  async subscribe(
    @Req() req: Request,
    @Body()
    body: {
      cycle?: string;
      locale?: string;
      // Uniform plan: one feature set applied to `count` restaurant slots.
      features?: { reservations?: boolean; ordersKds?: boolean; domain?: boolean };
      count?: number;
    },
  ) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const { accountId, customerId, currency } = await this.getAccountStripe(req);
    const catalog = await this.catalog();
    const cycle = normalizeCycle(body.cycle);
    const feat = body.features ?? {};

    // Provision the uniform features onto every existing account venue; the
    // purchased `count` becomes the venue capacity (venueLimit).
    const accountVenues = await this.prisma.restaurant.findMany({
      where: { accountId },
      select: { id: true },
    });
    // `count` is the number of billable slots. It can never be fewer than the
    // venues that already exist (every one of them gets provisioned below) —
    // otherwise the owner would pay for N slots while N+k venues go live. Clamp
    // server-side, not just in the UI, so a crafted request can't underpay.
    const count = Math.min(99, Math.max(accountVenues.length || 1, Math.floor(body.count ?? 1)));
    const uniform = {
      menuOnline: true,
      reservations: !!feat.reservations,
      ordersKds: !!feat.ordersKds,
      domain: !!feat.domain,
    };
    // Price = the uniform feature set × `count` slots (volume discount applies).
    const quote = computeAccountQuote(catalog, currency, Array.from({ length: count }, () => uniform), cycle);
    if (quote.amountCents < 50) throw new BadRequestException("Amount too low");
    // What Stripe will ACTUALLY charge, in our internal cents (major×100) — for
    // multiple-of-100 currencies (HUF/ISK) the charge is rounded to a whole major
    // unit, so store that (not the raw quote) to keep the card amount honest.
    const chargedCents = fromStripeUnitAmount(toStripeUnitAmount(quote.amountCents, currency), currency);

    const sels: VenueSel[] = accountVenues.map((v) => ({ restaurantId: v.id, ...uniform }));

    const stripe = getStripe();

    // Sync the Stripe customer with the payer's billing profile (entered in step
    // 2) so Checkout prefills the invoice email / name / address — not the
    // account login email.
    // Sync name/address from the profile (the email stays the account email).
    const bp = await this.prisma.billingProfile.findUnique({ where: { accountId } });
    if (bp && (bp.legalName || bp.address)) {
      await stripe.customers
        .update(customerId, {
          ...(bp.legalName ? { name: bp.legalName } : {}),
          ...(bp.address ? { address: { line1: bp.address } } : {}),
        })
        .catch(() => undefined);
    }

    const product = await getAdhocProductId();
    // Reuse an identical (currency, amount, interval) price across retries and
    // owners rather than minting a fresh Price object each call.
    const price = await stripe.prices.create(
      {
        currency: currency.toLowerCase(),
        product,
        unit_amount: toStripeUnitAmount(quote.amountCents, currency),
        recurring: { interval: cycle },
      },
      { idempotencyKey: `price:${currency}:${quote.amountCents}:${cycle}` },
    );
    // The uniform feature set as a compact bitmask (menu|res|kds|domain). The
    // webhook applies it to EVERY current account venue, so we don't need the
    // per-venue `sel` list — and a big account (16+ venues) would otherwise blow
    // Stripe's 500-char metadata limit. `sel` stays as a belt-and-braces hint but
    // is dropped when it would overflow.
    const ufBits =
      (uniform.menuOnline ? 1 : 0) | (uniform.reservations ? 2 : 0) | (uniform.ordersKds ? 4 : 0) | (uniform.domain ? 8 : 0);
    const encodedSel = encodeSelections(sels.filter((s) => s.restaurantId));
    const meta: Record<string, string> = { accountId, uf: String(ufBits), prov: "custom", cap: String(count) };
    if (encodedSel.length <= 450) meta.sel = encodedSel;

    const sub = await this.prisma.subscription.findUnique({ where: { accountId } });
    if (sub?.stripeSubscriptionId && sub.status === "ACTIVE") {
      const live = await stripe.subscriptions.retrieve(sub.stripeSubscriptionId);
      const itemId = live.items.data[0]?.id;
      // Resume a scheduled cancel — Stripe rejects passing BOTH params, so clear
      // whichever mechanism was used (cancel_at timestamp vs cancel_at_period_end).
      const resume =
        (live as { cancel_at?: number | null }).cancel_at != null
          ? { cancel_at: null as number | null }
          : { cancel_at_period_end: false };
      // Idempotency: a double-submit / retry within the same ~minute for the
      // same target state collapses to ONE proration invoice instead of two.
      // The minute bucket still lets a genuine later re-change go through.
      const bucket = Math.floor(Date.now() / 60000);
      await stripe.subscriptions.update(
        sub.stripeSubscriptionId,
        {
          items: itemId ? [{ id: itemId, price: price.id }] : undefined,
          proration_behavior: "always_invoice",
          metadata: meta,
          ...resume,
        },
        { idempotencyKey: `subchange:${accountId}:${quote.amountCents}:${cycle}:${count}:${ufBits}:${bucket}` },
      );
      // Apply the change synchronously (don't wait for the webhook) so the UI
      // reflects the new features / price / capacity immediately.
      await Promise.all(
        accountVenues
          .map((v) =>
            this.prisma.restaurant
              .update({
                where: { id: v.id },
                data: {
                  featMenuOnline: true,
                  featOrders: uniform.ordersKds,
                  featKds: uniform.ordersKds,
                  featReservations: uniform.reservations,
                  featCustomDomain: uniform.domain,
                },
              })
              .catch(() => undefined),
          ),
      );
      await this.prisma.subscription
        .update({
          where: { accountId },
          data: {
            billingCycle: cycle === "year" ? "YEARLY" : "MONTHLY",
            amount: chargedCents,
            currency,
            interval: cycle,
            priceProvenance: "custom",
            cancelAtPeriodEnd: false,
            updatedFromStripeAt: new Date(),
          },
        })
        .catch(() => undefined);
      await this.prisma.account.update({ where: { id: accountId }, data: { venueLimit: count } }).catch(() => undefined);
      return { changed: true };
    }

    // A prior non-active (e.g. incomplete after a failed attempt) Stripe sub is
    // superseded — cancel it so retries don't pile up dangling subscriptions.
    if (sub?.stripeSubscriptionId) {
      await stripe.subscriptions.cancel(sub.stripeSubscriptionId).catch(() => undefined);
    }

    // Hosted Stripe Checkout (subscription mode) — a clean pay page with every
    // enabled method (card / wallets / PayPal / SEPA), no downloadable Stripe
    // invoice, returns to the billing page. The sub is created on completion;
    // the webhook provisions features from the `sel` metadata. Our own invoices
    // are handled separately (Invoice table).
    const appUrl = process.env.APP_URL || "";
    const locale = body.locale || "en";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      // Card only (Apple/Google Pay ride on "card" in Checkout). Delayed methods
      // (SEPA Direct Debit / some wallets) create an ACTIVE sub while the payment
      // is still processing — that would grant PRO for days on an unpaid charge.
      // Bank-transfer SEPA has its own manual, yearly-only flow (sepa-request).
      payment_method_types: ["card"],
      line_items: [{ price: price.id, quantity: 1 }],
      subscription_data: { metadata: meta },
      success_url: `${appUrl}/${locale}/dashboard/settings/billing?success=1`,
      cancel_url: `${appUrl}/${locale}/dashboard/settings/billing?canceled=1`,
    });
    return { redirectUrl: session.url };
  }

  // Preview the IMMEDIATE proration charge for changing an already-active
  // subscription to a new feature set / slot count, without committing it. The
  // in-place swap (subscribe → proration_behavior:"always_invoice") bills the
  // saved card the moment it runs, so the UI shows "you'll be charged X now"
  // and asks for confirmation first. Returns immediateMajor=null when there is
  // no active sub (a brand-new subscription is paid in full at hosted Checkout,
  // where Stripe shows the amount). immediateMajor can be negative (downgrade
  // credit).
  @Post("billing/change-preview")
  @UseGuards(AuthGuard)
  async changePreview(
    @Req() req: Request,
    @Body()
    body: { cycle?: string; features?: { reservations?: boolean; ordersKds?: boolean; domain?: boolean }; count?: number },
  ) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const { accountId, customerId, currency } = await this.getAccountStripe(req);
    const sub = await this.prisma.subscription.findUnique({ where: { accountId } });
    const catalog = await this.catalog();
    const cycle = normalizeCycle(body.cycle);
    const feat = body.features ?? {};
    const accountVenues = await this.prisma.restaurant.count({ where: { accountId } });
    const count = Math.min(99, Math.max(accountVenues || 1, Math.floor(body.count ?? 1)));
    const uniform = { menuOnline: true, reservations: !!feat.reservations, ordersKds: !!feat.ordersKds, domain: !!feat.domain };
    const quote = computeAccountQuote(catalog, currency, Array.from({ length: count }, () => uniform), cycle);
    // No active Stripe sub → no proration to preview (full amount charged later).
    if (!sub?.stripeSubscriptionId || sub.status !== "ACTIVE") {
      return { immediateMajor: null, currency, recurringMajor: quote.amountMajor };
    }
    const stripe = getStripe();
    const live = (await stripe.subscriptions.retrieve(sub.stripeSubscriptionId).catch(() => null)) as {
      items?: { data?: Array<{ id?: string }> };
    } | null;
    const itemId = live?.items?.data?.[0]?.id;
    if (!itemId) return { immediateMajor: null, currency, recurringMajor: quote.amountMajor };
    const product = await getAdhocProductId();
    // Same idempotency key as the real change → reuses the identical Price
    // object instead of minting a throwaway one on every preview.
    const price = await stripe.prices.create(
      {
        currency: currency.toLowerCase(),
        product,
        unit_amount: toStripeUnitAmount(quote.amountCents, currency),
        recurring: { interval: cycle },
      },
      { idempotencyKey: `price:${currency}:${quote.amountCents}:${cycle}` },
    );
    const preview = await stripe.invoices
      .createPreview({
        customer: customerId,
        subscription: sub.stripeSubscriptionId,
        subscription_details: { items: [{ id: itemId, price: price.id }], proration_behavior: "always_invoice" },
      })
      .catch(() => null);
    const amountDue = preview && typeof preview.amount_due === "number" ? preview.amount_due : null;
    // fromStripeUnitAmount returns our internal cents convention (major×100).
    const immediateMajor = amountDue != null ? fromStripeUnitAmount(amountDue, currency) / 100 : null;
    return { immediateMajor, currency, recurringMajor: quote.amountMajor };
  }

  // SetupIntent for changing / adding a card (no charge). The frontend confirms
  // it with the PaymentElement, then calls set-default-pm.
  @Post("billing/setup-intent")
  @UseGuards(AuthGuard)
  async setupIntent(@Req() req: Request) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const { customerId } = await this.getAccountStripe(req);
    const si = await getStripe().setupIntents.create({ customer: customerId, payment_method_types: ["card"] });
    return { clientSecret: si.client_secret };
  }

  @Post("billing/set-default-pm")
  @UseGuards(AuthGuard)
  async setDefaultPm(@Req() req: Request, @Body() body: { paymentMethodId?: string }) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    if (!body.paymentMethodId) throw new BadRequestException("paymentMethodId required");
    const { accountId, customerId } = await this.getAccountStripe(req);
    const stripe = getStripe();
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: body.paymentMethodId },
    });
    const sub = await this.prisma.subscription.findUnique({ where: { accountId } });
    if (sub?.stripeSubscriptionId) {
      await stripe.subscriptions
        .update(sub.stripeSubscriptionId, { default_payment_method: body.paymentMethodId })
        .catch(() => undefined);
    }
    return { success: true };
  }

  // Cancel / resume happen in the Stripe billing portal; the webhook mirrors
  // cancel_at_period_end back into our DB. This endpoint pulls the live sub from
  // Stripe on demand (billing page load) so state is correct even if a webhook
  // was missed (e.g. local dev without `stripe listen`).
  @Post("billing/sync")
  @UseGuards(AuthGuard)
  async sync(@Req() req: Request) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const accountId = await this.accountIdFor(req);
    const sub = await this.prisma.subscription.findUnique({ where: { accountId } });
    if (!sub?.stripeSubscriptionId) return { synced: false };
    const live = (await getStripe()
      .subscriptions.retrieve(sub.stripeSubscriptionId)
      .catch(() => null)) as {
      status?: string;
      cancel_at_period_end?: boolean;
      cancel_at?: number | null;
      current_period_end?: number;
      currency?: string;
      items?: {
        data?: Array<{
          current_period_end?: number;
          price?: { unit_amount?: number | null; currency?: string; recurring?: { interval?: string | null } | null };
        }>;
      };
    } | null;
    if (!live) return { synced: false };
    const map: Record<string, string> = { active: "ACTIVE", trialing: "ACTIVE", past_due: "PAST_DUE", canceled: "CANCELED", unpaid: "CANCELED", incomplete: "EXPIRED", incomplete_expired: "EXPIRED" };
    const status = map[live.status ?? ""] ?? "INACTIVE";
    const ts = live.items?.data?.[0]?.current_period_end ?? live.current_period_end;
    const currentPeriodEnd = typeof ts === "number" && ts > 0 ? new Date(ts * 1000) : null;
    // The portal may express a scheduled cancel via cancel_at_period_end OR a
    // concrete cancel_at timestamp — treat either as "canceling".
    const canceling = !!live.cancel_at_period_end || (typeof live.cancel_at === "number" && live.cancel_at * 1000 > Date.now());
    // When cancel_at is set, prefer it as the cancels-on date.
    const cancelDate = typeof live.cancel_at === "number" && live.cancel_at > 0 ? new Date(live.cancel_at * 1000) : currentPeriodEnd;
    // Pull the amount/interval/currency off the live price too, so pre-migration
    // subscriptions (whose `amount` was never backfilled) show a price on the
    // current-plan card. Stored in our internal cents convention (major×100).
    const price = live.items?.data?.[0]?.price;
    const liveCurrency = (price?.currency ?? live.currency ?? "").toUpperCase();
    const amount =
      typeof price?.unit_amount === "number" ? fromStripeUnitAmount(price.unit_amount, liveCurrency) : undefined;
    const interval =
      price?.recurring?.interval === "year" ? "year" : price?.recurring?.interval === "month" ? "month" : undefined;
    await this.prisma.subscription
      .update({
        where: { accountId },
        data: {
          status,
          currentPeriodEnd: canceling ? cancelDate : currentPeriodEnd,
          cancelAtPeriodEnd: canceling,
          updatedFromStripeAt: new Date(),
          ...(amount !== undefined ? { amount } : {}),
          ...(interval ? { interval, billingCycle: interval === "year" ? "YEARLY" : "MONTHLY" } : {}),
          ...(isSupportedCurrency(liveCurrency) ? { currency: liveCurrency } : {}),
        },
      })
      .catch(() => undefined);
    return { synced: true };
  }

  // ── Admin: edit the pricing catalog ────────────────────────────────────────
  @Patch("admin/pricing")
  @UseGuards(AdminGuard)
  async setPricing(@Body() body: PricingCatalog) {
    if (!body || typeof body !== "object" || !body.currencies || !body.volumeDiscounts) {
      throw new BadRequestException("Invalid pricing catalog");
    }
    // Validate VALUES, not just shape. computeAccountQuote falls back to EUR when
    // a currency is missing, so a catalog without EUR (or with a broken/negative
    // price) would 500 every quote + subscribe. Fail the save instead.
    const eur = body.currencies.EUR;
    if (!eur) throw new BadRequestException("Pricing catalog must include EUR");
    const items = ["menu", "reservations", "ordersKds", "domain"] as const;
    for (const [code, cur] of Object.entries(body.currencies)) {
      if (!cur || typeof cur !== "object") throw new BadRequestException(`Invalid pricing for ${code}`);
      for (const item of items) {
        const p = cur[item];
        if (!p || typeof p.mo !== "number" || typeof p.yr !== "number" || p.mo < 0 || p.yr < 0 || !Number.isFinite(p.mo) || !Number.isFinite(p.yr)) {
          throw new BadRequestException(`Invalid ${item} price for ${code}`);
        }
      }
    }
    for (const tier of ["2-4", "5+"] as const) {
      const d = body.volumeDiscounts[tier];
      for (const k of ["mo", "yr"] as const) {
        if (!d || typeof d[k] !== "number" || d[k] < 0 || d[k] >= 1) {
          throw new BadRequestException(`Invalid volume discount for tier ${tier}`);
        }
      }
    }
    await this.prisma.pricingConfig.upsert({
      where: { id: "default" },
      create: { id: "default", data: body as unknown as object },
      update: { data: body as unknown as object },
    });
    return { success: true };
  }

  // ── Admin: set a restaurant's feature flags / manual comp ──────────────────
  @Patch("admin/restaurant/:id/features")
  @UseGuards(AdminGuard)
  async setFeatures(
    @Param("id") id: string,
    @Body()
    body: {
      featMenuOnline?: boolean;
      featOrders?: boolean;
      featKds?: boolean;
      featReservations?: boolean;
      featCustomDomain?: boolean;
      customDomain?: string | null;
    },
  ) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id }, select: { id: true } });
    if (!restaurant) throw new BadRequestException("Restaurant not found");
    const data: Record<string, unknown> = {};
    for (const k of [
      "featMenuOnline",
      "featOrders",
      "featKds",
      "featReservations",
      "featCustomDomain",
    ] as const) {
      if (typeof body[k] === "boolean") data[k] = body[k];
    }
    if (body.customDomain !== undefined) {
      data.customDomain = (body.customDomain || "").trim() || null;
    }
    await this.prisma.restaurant.update({ where: { id }, data });
    return { success: true };
  }

  // ── helpers ────────────────────────────────────────────────────────────────

  private async accountIdFor(req: Request): Promise<string> {
    const { restaurantId } = (req as AuthedRequest).authUser;
    const r = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
      select: { accountId: true },
    });
    if (!r?.accountId) throw new BadRequestException("No account for restaurant");
    return r.accountId;
  }

  // Write the selected features onto each restaurant. orders+kds move together;
  // unlimited AI rides with the ordersKds add-on. Menu-only venues get menu on.
  //
  // SECURITY: `selections` carries client-supplied restaurantIds. Never update a
  // restaurant by raw id — scope every write to the caller's own account, or a
  // crafted request could flip feature flags (e.g. featMenuOnline=false → dark
  // menu) on ANY venue in the system.
  private async provisionFlags(accountId: string, selections: SelectionBody[]): Promise<void> {
    const owned = new Set(
      (await this.prisma.restaurant.findMany({ where: { accountId }, select: { id: true } })).map((r) => r.id),
    );
    await Promise.all(
      selections
        .filter((s) => s.restaurantId && owned.has(s.restaurantId))
        .map((s) => {
          const sel = toSelection(s);
          return this.prisma.restaurant
            .updateMany({
              where: { id: s.restaurantId!, accountId },
              data: {
                featMenuOnline: sel.menuOnline,
                featOrders: sel.ordersKds,
                featKds: sel.ordersKds,
                featReservations: sel.reservations,
                featCustomDomain: sel.domain,
              },
            })
            .catch(() => undefined);
        }),
    );
  }
}
