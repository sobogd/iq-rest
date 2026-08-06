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
// Explicit per-currency prices (owner-approved). EUR is the reference; the rest
// mirror its value at ≈ local FX, rounded to nice psychological numbers. 21
// currencies. All editable later in the dashboard admin (PricingConfig row).
// High-inflation currencies (ARS/TRY/COP/CLP) need periodic manual refresh.

const p = (mo: number, yr: number): ItemPrice => ({ mo, yr });
const cur = (
  menu: [number, number],
  reservations: [number, number],
  ordersKds: [number, number],
  domain: [number, number],
): CurrencyPricing => ({
  menu: p(menu[0], menu[1]),
  reservations: p(reservations[0], reservations[1]),
  ordersKds: p(ordersKds[0], ordersKds[1]),
  domain: p(domain[0], domain[1]),
});

const DEFAULT_CURRENCIES: Record<string, CurrencyPricing> = {
  // code:            menu          reservations   ordersKds      domain      (mo, yr)
  EUR: cur([14.9, 9.9], [9, 7], [13, 11], [5, 4]),
  USD: cur([15.9, 10.9], [9.9, 7.9], [14.9, 11.9], [5.9, 4.9]),
  GBP: cur([12.9, 8.9], [7.9, 5.9], [11.9, 8.9], [4.9, 3.9]),
  CHF: cur([14.9, 9.9], [9, 7], [13, 11], [5, 4]),
  NOK: cur([169, 109], [99, 79], [149, 119], [59, 44]),
  SEK: cur([169, 109], [99, 79], [149, 119], [59, 44]),
  DKK: cur([109, 79], [69, 54], [99, 84], [39, 29]),
  PLN: cur([59, 45], [39, 29], [55, 45], [25, 19]),
  CZK: cur([379, 249], [229, 179], [329, 269], [129, 99]),
  HUF: cur([5900, 3900], [3490, 2790], [4990, 3990], [1990, 1490]),
  ISK: cur([2290, 1490], [1290, 990], [1990, 1490], [690, 490]),
  MXN: cur([299, 199], [129, 89], [189, 129], [79, 49]),
  AUD: cur([24.9, 16.9], [14.9, 10.9], [19.9, 16.9], [8.9, 5.9]),
  RSD: cur([1790, 1190], [990, 790], [1490, 1190], [590, 390]),
  BRL: cur([89, 59], [49, 39], [79, 59], [29, 19]),
  COP: cur([64900, 42900], [38900, 29900], [55900, 46900], [21900, 16900]),
  CLP: cur([15900, 9900], [9900, 6900], [13900, 11900], [4900, 3900]),
  PEN: cur([59, 39], [35, 29], [49, 44], [19, 15]),
  UYU: cur([649, 429], [399, 299], [559, 469], [219, 169]),
  ARS: cur([16900, 10900], [9900, 7900], [14900, 11900], [5900, 3900]),
  TRY: cur([549, 369], [349, 269], [499, 419], [189, 149]),
};

export const DEFAULT_PRICING_CATALOG: PricingCatalog = {
  currencies: DEFAULT_CURRENCIES,
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

// The feature flags a VenueSelection provisions (orders + kds move together).
export function flagsFromSelection(sel: VenueSelection): {
  featMenuOnline: boolean;
  featOrders: boolean;
  featKds: boolean;
  featReservations: boolean;
  featCustomDomain: boolean;
} {
  return {
    featMenuOnline: sel.menuOnline,
    featOrders: sel.ordersKds,
    featKds: sel.ordersKds,
    featReservations: sel.reservations,
    featCustomDomain: sel.domain,
  };
}
