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
  isSupportedCurrency,
  type SupportedCurrency,
  type VenueSel,
} from "../common/stripe";
import { getRequestBillingCurrency } from "../common/geo";

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
    // SEPA-by-invoice is yearly only.
    const quote = computeAccountQuote(catalog, currency, venues, "year");

    // Record the request as a PENDING manual subscription on the account.
    const data = {
      plan: venues.some((v) => v.ordersKds) ? "PRO" : "BASIC",
      billingCycle: "YEARLY",
      status: "PENDING",
      provider: "sepa_manual",
      amount: quote.amountCents,
      currency,
      interval: "year",
      priceProvenance: "custom",
      currentPeriodEnd: null,
      stripeSubscriptionId: null,
      appliesToRestaurantId: null,
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
    await this.provisionFlags(rawSelections);

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
    const currency: SupportedCurrency = stored ?? getRequestBillingCurrency(req);
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
    const count = Math.max(1, Math.min(99, Math.floor(body.count ?? 1)));
    const uniform = {
      menuOnline: true,
      reservations: !!feat.reservations,
      ordersKds: !!feat.ordersKds,
      domain: !!feat.domain,
    };
    // Price = the uniform feature set × `count` slots (volume discount applies).
    const quote = computeAccountQuote(catalog, currency, Array.from({ length: count }, () => uniform), cycle);
    if (quote.amountCents < 50) throw new BadRequestException("Amount too low");

    // Provision the uniform features onto every existing account venue; the
    // purchased `count` becomes the venue capacity (venueLimit).
    const accountVenues = await this.prisma.restaurant.findMany({ where: { accountId }, select: { id: true } });
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
    const price = await stripe.prices.create({
      currency: currency.toLowerCase(),
      product,
      unit_amount: toStripeUnitAmount(quote.amountCents, currency),
      recurring: { interval: cycle },
    });
    const meta = { accountId, sel: encodeSelections(sels.filter((s) => s.restaurantId)), prov: "custom", cap: String(count) };

    const sub = await this.prisma.subscription.findUnique({ where: { accountId } });
    if (sub?.stripeSubscriptionId && sub.status === "ACTIVE") {
      const live = await stripe.subscriptions.retrieve(sub.stripeSubscriptionId);
      const itemId = live.items.data[0]?.id;
      await stripe.subscriptions.update(sub.stripeSubscriptionId, {
        items: itemId ? [{ id: itemId, price: price.id }] : undefined,
        proration_behavior: "always_invoice",
        metadata: meta,
      });
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
      line_items: [{ price: price.id, quantity: 1 }],
      subscription_data: { metadata: meta },
      success_url: `${appUrl}/${locale}/dashboard/settings/billing?success=1`,
      cancel_url: `${appUrl}/${locale}/dashboard/settings/billing?canceled=1`,
    });
    return { redirectUrl: session.url };
  }

  // SetupIntent for changing / adding a card (no charge). The frontend confirms
  // it with the PaymentElement, then calls set-default-pm.
  @Post("billing/setup-intent")
  @UseGuards(AuthGuard)
  async setupIntent(@Req() req: Request) {
    const { customerId } = await this.getAccountStripe(req);
    const si = await getStripe().setupIntents.create({ customer: customerId, payment_method_types: ["card"] });
    return { clientSecret: si.client_secret };
  }

  @Post("billing/set-default-pm")
  @UseGuards(AuthGuard)
  async setDefaultPm(@Req() req: Request, @Body() body: { paymentMethodId?: string }) {
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

  // Cancel — immediately or at period end. The webhook reflects the state.
  @Post("billing/cancel")
  @UseGuards(AuthGuard)
  async cancel(@Req() req: Request, @Body() body: { atPeriodEnd?: boolean }) {
    if ((req as AuthedRequest).authUser.viaGrant) {
      throw new ForbiddenException("Billing is managed by the restaurant owner");
    }
    const accountId = await this.accountIdFor(req);
    const sub = await this.prisma.subscription.findUnique({ where: { accountId } });
    if (!sub?.stripeSubscriptionId) throw new BadRequestException("No active subscription");
    const stripe = getStripe();
    if (body.atPeriodEnd) {
      await stripe.subscriptions.update(sub.stripeSubscriptionId, { cancel_at_period_end: true });
    } else {
      await stripe.subscriptions.cancel(sub.stripeSubscriptionId);
      // Reflect immediately in our DB (don't wait for the webhook) so the UI
      // stops showing an active plan / "renews" date right away.
      await this.prisma.subscription
        .update({
          where: { accountId },
          data: { status: "CANCELED", plan: "FREE", currentPeriodEnd: null, stripeSubscriptionId: null, updatedFromStripeAt: new Date() },
        })
        .catch(() => undefined);
    }
    return { success: true, atPeriodEnd: !!body.atPeriodEnd };
  }

  // ── Admin: edit the pricing catalog ────────────────────────────────────────
  @Patch("admin/pricing")
  @UseGuards(AdminGuard)
  async setPricing(@Body() body: PricingCatalog) {
    if (!body || typeof body !== "object" || !body.currencies || !body.volumeDiscounts) {
      throw new BadRequestException("Invalid pricing catalog");
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
      featAiUnlimited?: boolean;
      manualAccess?: boolean;
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
      "featAiUnlimited",
      "manualAccess",
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
  private async provisionFlags(selections: SelectionBody[]): Promise<void> {
    await Promise.all(
      selections
        .filter((s) => s.restaurantId)
        .map((s) => {
          const sel = toSelection(s);
          return this.prisma.restaurant
            .update({
              where: { id: s.restaurantId! },
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
        }),
    );
  }
}
