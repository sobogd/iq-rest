// ─────────────────────────────────────────────────────────────────────────────
// @iq-rest/pricing — à-la-carte price catalog + volume-discount + quote compute.
//
// The SINGLE source of truth for prices (billing-features-constructor). The live
// catalog is stored in the DB (PricingConfig singleton) and edited from the
// dashboard admin; DEFAULT_PRICING_CATALOG here is the seed + fallback. The
// landing quiz, the dashboard constructor and Stripe ad-hoc checkout all compute
// amounts through computeAccountQuote so they can never drift.
//
// Model (Model A): venue price = menu(base) + Σ selected add-ons. Account total =
// Σ venue prices × (1 − volumeDiscount(N)), where N = number of billing venues.
// Amounts in the catalog are MAJOR units (e.g. 9.9); checkout converts to cents.
// ─────────────────────────────────────────────────────────────────────────────

export type Cycle = "month" | "year";

// Per-item price: `mo` = monthly plan price/month, `yr` = yearly plan price/month
// (the discounted per-month rate shown when billed annually).
export type ItemPrice = { mo: number; yr: number };

// The four à-la-carte line items. `menu` is the always-present base (Basic);
// the rest are add-ons. "ordersKds" is a single add-on (orders + kitchen display
// together, per product decision).
export type CurrencyPricing = {
  menu: ItemPrice;
  reservations: ItemPrice;
  ordersKds: ItemPrice;
  domain: ItemPrice;
};

// Volume discount by restaurant count. Fraction off (0.25 = 25% off). Tier "1"
// is implicit (no discount). Same multipliers for every currency/preset.
export type VolumeDiscounts = {
  "2-4": { mo: number; yr: number };
  "5+": { mo: number; yr: number };
};

export type PricingCatalog = {
  currencies: Record<string, CurrencyPricing>;
  volumeDiscounts: VolumeDiscounts;
};

// The per-venue feature selection that drives its price. menuOnline is the base
// (billable) flag; the three add-ons map to the catalog line items.
export type VenueSelection = {
  menuOnline: boolean; // base (Basic) — a venue with this false is not billed
  reservations: boolean;
  ordersKds: boolean; // orders + kitchen display (single add-on)
  domain: boolean;
};

// ─── Volume discount (§Q1) ───────────────────────────────────────────────────
// N=1 → 0%. 2–4 → yr 25% / mo 15%. 5+ → yr 50% / mo 25%.
export const DEFAULT_VOLUME_DISCOUNTS: VolumeDiscounts = {
  "2-4": { mo: 0.15, yr: 0.25 },
  "5+": { mo: 0.25, yr: 0.5 },
};

export function volumeDiscount(discounts: VolumeDiscounts, n: number, cycle: Cycle): number {
  const key = cycle === "year" ? "yr" : "mo";
  if (n >= 5) return discounts["5+"][key];
  if (n >= 2) return discounts["2-4"][key];
  return 0;
}

// ─── Default catalog (seed / fallback) ───────────────────────────────────────
// EUR is authoritative (agreed, market-justified). The other 14 billing
// currencies are derived from the current Basic/Pro anchors (menu = Basic; the
// Pro−Basic delta split reservations:ordersKds ≈ 9:13; domain ≈ half of Basic),
// rounded to nice numbers. All editable later in the dashboard admin.

const EUR_PRICING: CurrencyPricing = {
  menu: { mo: 9.9, yr: 6.9 },
  reservations: { mo: 9.0, yr: 7.0 },
  ordersKds: { mo: 13.0, yr: 11.0 },
  domain: { mo: 5.0, yr: 4.0 },
};

// Round to a "nice" number by magnitude (keeps foreign currencies clean).
function niceRound(v: number): number {
  if (v <= 0) return 0;
  if (v >= 1000) return Math.round(v / 100) * 100;
  if (v >= 100) return Math.round(v / 10) * 10;
  if (v >= 10) return Math.round(v);
  return Math.round(v * 10) / 10;
}

// Basic/Pro per-month anchors (mirrors the old BILLING_PRICES / landing table).
const ANCHORS: Record<string, { basicMo: number; basicYr: number; proMo: number; proYr: number }> = {
  EUR: { basicMo: 9.9, basicYr: 6.9, proMo: 31.9, proYr: 24.9 },
  NOK: { basicMo: 109, basicYr: 79, proMo: 349, proYr: 269 },
  SEK: { basicMo: 109, basicYr: 79, proMo: 349, proYr: 269 },
  DKK: { basicMo: 79, basicYr: 49, proMo: 239, proYr: 189 },
  MXN: { basicMo: 149, basicYr: 99, proMo: 449, proYr: 299 },
  USD: { basicMo: 14.9, basicYr: 9.9, proMo: 44.9, proYr: 29.9 },
  AUD: { basicMo: 16.9, basicYr: 11.9, proMo: 49.9, proYr: 39.9 },
  GBP: { basicMo: 8.9, basicYr: 5.9, proMo: 27.9, proYr: 19.9 },
  PLN: { basicMo: 39, basicYr: 29, proMo: 99, proYr: 75 },
  CZK: { basicMo: 249, basicYr: 169, proMo: 799, proYr: 619 },
  HUF: { basicMo: 3990, basicYr: 2790, proMo: 12900, proYr: 9900 },
  ISK: { basicMo: 1490, basicYr: 990, proMo: 4790, proYr: 3790 },
  CHF: { basicMo: 9.9, basicYr: 6.9, proMo: 31.9, proYr: 24.9 },
  RSD: { basicMo: 1190, basicYr: 790, proMo: 3790, proYr: 2890 },
};

function derivePricing(a: { basicMo: number; basicYr: number; proMo: number; proYr: number }): CurrencyPricing {
  const dMo = a.proMo - a.basicMo;
  const dYr = a.proYr - a.basicYr;
  return {
    menu: { mo: a.basicMo, yr: a.basicYr },
    reservations: { mo: niceRound((dMo * 9) / 22), yr: niceRound((dYr * 9) / 22) },
    ordersKds: { mo: niceRound((dMo * 13) / 22), yr: niceRound((dYr * 13) / 22) },
    domain: { mo: niceRound(a.basicMo * 0.5), yr: niceRound(a.basicYr * 0.5) },
  };
}

function buildDefaultCurrencies(): Record<string, CurrencyPricing> {
  const out: Record<string, CurrencyPricing> = { EUR: EUR_PRICING };
  for (const [cur, a] of Object.entries(ANCHORS)) {
    if (cur === "EUR") continue;
    out[cur] = derivePricing(a);
  }
  return out;
}

export const DEFAULT_PRICING_CATALOG: PricingCatalog = {
  currencies: buildDefaultCurrencies(),
  volumeDiscounts: DEFAULT_VOLUME_DISCOUNTS,
};

// ─── Quote computation ───────────────────────────────────────────────────────

// Per-venue price/month IN CENTS for the chosen cycle. Integer cents throughout
// keeps the arithmetic exact (a discount like ×0.85 on a 2-decimal price would
// otherwise lose a half-cent to float error). A menuOnline=false venue → 0.
export function computeVenuePriceCents(pricing: CurrencyPricing, sel: VenueSelection, cycle: Cycle): number {
  if (!sel.menuOnline) return 0;
  const k = cycle === "year" ? "yr" : "mo";
  const c = (v: number) => Math.round(v * 100);
  let p = c(pricing.menu[k]);
  if (sel.reservations) p += c(pricing.reservations[k]);
  if (sel.ordersKds) p += c(pricing.ordersKds[k]);
  if (sel.domain) p += c(pricing.domain[k]);
  return p;
}

// Per-venue price/month in MAJOR units (for display).
export function computeVenuePrice(pricing: CurrencyPricing, sel: VenueSelection, cycle: Cycle): number {
  return computeVenuePriceCents(pricing, sel, cycle) / 100;
}

export type AccountQuote = {
  currency: string;
  cycle: Cycle;
  interval: Cycle; // alias for Stripe (`recurring.interval`)
  billingVenues: number; // N used for the volume discount
  discount: number; // fraction off applied to the subtotal
  subtotalPerMonth: number; // Σ venue prices/month, before discount
  perMonthAfterDiscount: number; // subtotal × (1 − discount)
  // What Stripe charges per interval: monthly = perMonthAfterDiscount;
  // yearly = perMonthAfterDiscount × 12 (billed once up front).
  amountMajor: number;
  amountCents: number;
};

// The whole-account quote: sum venues, apply the volume discount for N billing
// venues, produce the amount Stripe charges per interval (and its cents value).
export function computeAccountQuote(
  catalog: PricingCatalog,
  currency: string,
  venues: VenueSelection[],
  cycle: Cycle,
): AccountQuote {
  const pricing = catalog.currencies[currency] ?? catalog.currencies.EUR;
  const billing = venues.filter((v) => v.menuOnline);
  const n = billing.length;
  const subtotalCents = billing.reduce((sum, v) => sum + computeVenuePriceCents(pricing, v, cycle), 0);
  const discount = volumeDiscount(catalog.volumeDiscounts, n, cycle);
  // Integer cents: subtotal × (1 − d) is exact to the half-cent; round half-up.
  const perMonthAfterCents = Math.round(subtotalCents * (1 - discount));
  const amountCents = cycle === "year" ? Math.round(subtotalCents * (1 - discount) * 12) : perMonthAfterCents;
  return {
    currency,
    cycle,
    interval: cycle,
    billingVenues: n,
    discount,
    subtotalPerMonth: subtotalCents / 100,
    perMonthAfterDiscount: perMonthAfterCents / 100,
    amountMajor: amountCents / 100,
    amountCents,
  };
}

// ─── Restaurant feature flags ⇄ VenueSelection ───────────────────────────────
// Bridge between the persisted Restaurant.feat* columns and the pricing model.
export function selectionFromFlags(flags: {
  featMenuOnline?: boolean | null;
  featOrders?: boolean | null;
  featKds?: boolean | null;
  featReservations?: boolean | null;
  featCustomDomain?: boolean | null;
}): VenueSelection {
  return {
    menuOnline: flags.featMenuOnline ?? true,
    reservations: !!flags.featReservations,
    // orders + KDS are one add-on; either flag means the add-on is bought.
    ordersKds: !!flags.featOrders || !!flags.featKds,
    domain: !!flags.featCustomDomain,
  };
}

// The feature flags a VenueSelection provisions (orders + kds move together;
// aiUnlimited rides with the ordersKds/Pro add-on).
export function flagsFromSelection(sel: VenueSelection): {
  featMenuOnline: boolean;
  featOrders: boolean;
  featKds: boolean;
  featReservations: boolean;
  featCustomDomain: boolean;
  featAiUnlimited: boolean;
} {
  return {
    featMenuOnline: sel.menuOnline,
    featOrders: sel.ordersKds,
    featKds: sel.ordersKds,
    featReservations: sel.reservations,
    featCustomDomain: sel.domain,
    featAiUnlimited: sel.ordersKds,
  };
}
