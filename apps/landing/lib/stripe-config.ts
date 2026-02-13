// Client-safe Stripe configuration (no Stripe SDK import)

import { SupportedCurrency } from "./country-currency-map";

// Base lookup keys (currency will be appended: basic_monthly_eur, basic_monthly_mxn, etc.)
export const PRICE_LOOKUP_KEYS = {
  BASIC_MONTHLY: "basic_monthly",
  BASIC_YEARLY: "basic_yearly",
  PRO_MONTHLY: "pro_monthly",
  PRO_YEARLY: "pro_yearly",
} as const;

export type PriceLookupKey = typeof PRICE_LOOKUP_KEYS[keyof typeof PRICE_LOOKUP_KEYS];

/**
 * Получить полный lookup key с валютой
 * Например: basic_monthly + EUR = basic_monthly_eur
 */
export function getLookupKeyWithCurrency(
  baseKey: PriceLookupKey,
  currency: SupportedCurrency
): string {
  return `${baseKey}_${currency.toLowerCase()}`;
}

// Plan details for UI
export const PLANS = {
  FREE: {
    name: "Free",
    description: "Get started with basic features",
    price: { monthly: 0, yearly: 0 },
  },
  BASIC: {
    name: "Basic",
    description: "For small restaurants",
    price: { monthly: 9.9, yearly: 88.8 }, // €7.4/month when yearly
  },
  PRO: {
    name: "Pro",
    description: "For growing businesses",
    price: { monthly: 29.9, yearly: 249 }, // €20.75/month when yearly
  },
} as const;

export type PlanType = keyof typeof PLANS;
