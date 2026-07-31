import Stripe from "stripe";

let stripeInstance: InstanceType<typeof Stripe> | null = null;

export function getStripe(): InstanceType<typeof Stripe> {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    stripeInstance = new Stripe(key, { typescript: true });
  }
  return stripeInstance;
}

export const PRICE_LOOKUP_KEYS = {
  BASIC_MONTHLY: "basic_monthly",
  BASIC_YEARLY: "basic_yearly",
  PRO_MONTHLY: "pro_monthly",
  PRO_YEARLY: "pro_yearly",
} as const;

// ─── billing-features-constructor: ad-hoc pricing ────────────────────────────
// A single reusable Stripe Product that every ad-hoc Price attaches to. Ad-hoc
// prices carry the amount; the Product is just the umbrella ("IQ Rest"). If the
// env var is unset we lazily create/reuse one by name.
let cachedProductId: string | null = null;
export async function getAdhocProductId(): Promise<string> {
  const fromEnv = process.env.STRIPE_PRODUCT_ID;
  if (fromEnv) return fromEnv;
  if (cachedProductId) return cachedProductId;
  const stripe = getStripe();
  // Reuse an existing "IQ Rest" product if present, else create one.
  const existing = await stripe.products.search({ query: 'name:"IQ Rest"', limit: 1 }).catch(() => null);
  if (existing && existing.data[0]) {
    cachedProductId = existing.data[0].id;
    return cachedProductId;
  }
  const product = await stripe.products.create({ name: "IQ Rest" });
  cachedProductId = product.id;
  return cachedProductId;
}

// Compact per-venue selection carried in Stripe subscription metadata so the
// webhook can provision the Restaurant feature flags on payment. Encoded as a
// bitmask per restaurant: menu=1, reservations=2, ordersKds=4, domain=8.
export type VenueSel = {
  restaurantId: string;
  menuOnline: boolean;
  reservations: boolean;
  ordersKds: boolean;
  domain: boolean;
};

export function encodeSelections(sels: VenueSel[]): string {
  const obj: Record<string, number> = {};
  for (const s of sels) {
    obj[s.restaurantId] =
      (s.menuOnline ? 1 : 0) | (s.reservations ? 2 : 0) | (s.ordersKds ? 4 : 0) | (s.domain ? 8 : 0);
  }
  return JSON.stringify(obj);
}

export function decodeSelections(encoded: string | undefined | null): VenueSel[] {
  if (!encoded) return [];
  try {
    const obj = JSON.parse(encoded) as Record<string, number>;
    return Object.entries(obj).map(([restaurantId, m]) => ({
      restaurantId,
      menuOnline: !!(m & 1),
      reservations: !!(m & 2),
      ordersKds: !!(m & 4),
      domain: !!(m & 8),
    }));
  } catch {
    return [];
  }
}

export type PriceLookupKey = (typeof PRICE_LOOKUP_KEYS)[keyof typeof PRICE_LOOKUP_KEYS];

// Billing currencies we actually price in Stripe. EUR is the base/fallback;
// NOK/SEK/DKK have currency-suffixed Stripe prices (e.g. `basic_monthly_nok`).
export const SUPPORTED_CURRENCIES = ["EUR", "NOK", "SEK", "DKK", "MXN", "USD", "AUD", "GBP", "PLN", "CZK", "HUF", "ISK", "CHF", "RSD"] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export function isSupportedCurrency(c: string | null | undefined): c is SupportedCurrency {
  return !!c && (SUPPORTED_CURRENCIES as readonly string[]).includes(c);
}

// EUR keeps the plain lookup key (`basic_monthly`); other currencies append a
// lowercase suffix (`basic_monthly_nok`). Stripe must have a price with that
// exact lookup_key — the checkout falls back to the plain key if missing.
export function getLookupKeyWithCurrency(baseKey: PriceLookupKey, currency: SupportedCurrency): string {
  if (currency === "EUR") return baseKey;
  return `${baseKey}_${currency.toLowerCase()}`;
}

// Billing currency by country: only the Scandinavian trio map to their krone;
// everything else (incl. the eurozone and rest of world) bills in EUR.
const BILLING_CURRENCY_BY_COUNTRY: Record<string, SupportedCurrency> = {
  NO: "NOK",
  SE: "SEK",
  DK: "DKK",
  MX: "MXN",
  US: "USD",
  AU: "AUD",
  GB: "GBP",
  PL: "PLN",
  CZ: "CZK",
  HU: "HUF",
  IS: "ISK",
  CH: "CHF",
  RS: "RSD",
};

export function getCurrencyByCountry(countryCode: string | null): SupportedCurrency {
  if (!countryCode) return "EUR";
  return BILLING_CURRENCY_BY_COUNTRY[countryCode.toUpperCase()] ?? "EUR";
}

export const CURRENCY_INFO: Record<SupportedCurrency, { symbol: string; name: string; symbolPosition: "before" | "after"; zeroDecimal: boolean }> = {
  EUR: { symbol: "€", name: "Euro", symbolPosition: "before", zeroDecimal: false },
  NOK: { symbol: "kr", name: "Norwegian krone", symbolPosition: "after", zeroDecimal: false },
  SEK: { symbol: "kr", name: "Swedish krona", symbolPosition: "after", zeroDecimal: false },
  DKK: { symbol: "kr", name: "Danish krone", symbolPosition: "after", zeroDecimal: false },
  MXN: { symbol: "MX$", name: "Mexican peso", symbolPosition: "before", zeroDecimal: false },
  USD: { symbol: "$", name: "US Dollar", symbolPosition: "before", zeroDecimal: false },
  AUD: { symbol: "A$", name: "Australian Dollar", symbolPosition: "before", zeroDecimal: false },
  GBP: { symbol: "£", name: "British Pound", symbolPosition: "before", zeroDecimal: false },
  PLN: { symbol: "zł", name: "Polish Zloty", symbolPosition: "after", zeroDecimal: false },
  CZK: { symbol: "Kč", name: "Czech Koruna", symbolPosition: "after", zeroDecimal: false },
  HUF: { symbol: "Ft", name: "Hungarian Forint", symbolPosition: "after", zeroDecimal: false },
  ISK: { symbol: "kr", name: "Icelandic Króna", symbolPosition: "after", zeroDecimal: false },
  CHF: { symbol: "CHF", name: "Swiss Franc", symbolPosition: "after", zeroDecimal: false },
  RSD: { symbol: "RSD", name: "Serbian Dinar", symbolPosition: "after", zeroDecimal: false },
};
