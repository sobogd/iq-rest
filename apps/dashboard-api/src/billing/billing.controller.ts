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
