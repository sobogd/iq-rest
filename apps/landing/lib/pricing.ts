import { SupportedCurrency } from "./country-currency-map";

/**
 * Цены для каждого плана в каждой валюте
 * Латам страны имеют скидку ~20-25% от EUR эквивалента
 */

export interface PlanPricing {
  monthly: number;
  yearly: number; // цена за месяц при годовой оплате
  yearlyTotal: number;
}

export interface CurrencyPricing {
  free: PlanPricing;
  basic: PlanPricing;
  pro: PlanPricing;
}

export const pricing: Record<SupportedCurrency, CurrencyPricing> = {
  // Европа (базовые цены)
  EUR: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 9.9, yearly: 6.9, yearlyTotal: 82.8 },
    pro: { monthly: 31.9, yearly: 24.9, yearlyTotal: 298.8 },
  },

  // США
  USD: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 14.9, yearly: 9.9, yearlyTotal: 118.8 },
    pro: { monthly: 44.9, yearly: 29.9, yearlyTotal: 358.8 },
  },

  // Польша
  PLN: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 39, yearly: 29, yearlyTotal: 348 },
    pro: { monthly: 99, yearly: 75, yearlyTotal: 900 },
  },

  // Мексика
  MXN: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 149, yearly: 99, yearlyTotal: 1188 },
    pro: { monthly: 449, yearly: 299, yearlyTotal: 3588 },
  },

  // Бразилия
  BRL: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 39, yearly: 29, yearlyTotal: 348 },
    pro: { monthly: 119, yearly: 79, yearlyTotal: 948 },
  },

  // Аргентина
  ARS: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 7900, yearly: 4900, yearlyTotal: 58800 },
    pro: { monthly: 24900, yearly: 16900, yearlyTotal: 202800 },
  },

  // Колумбия
  COP: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 34900, yearly: 24900, yearlyTotal: 298800 },
    pro: { monthly: 99900, yearly: 74900, yearlyTotal: 898800 },
  },

  // Чили (zero-decimal currency!)
  CLP: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 7900, yearly: 4900, yearlyTotal: 58800 },
    pro: { monthly: 24900, yearly: 16900, yearlyTotal: 202800 },
  },

  // Перу
  PEN: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 29, yearly: 19, yearlyTotal: 228 },
    pro: { monthly: 89, yearly: 59, yearlyTotal: 708 },
  },

  // Уругвай
  UYU: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 349, yearly: 249, yearlyTotal: 2988 },
    pro: { monthly: 990, yearly: 690, yearlyTotal: 8280 },
  },

  // Турция
  TRY: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 349, yearly: 249, yearlyTotal: 2988 },
    pro: { monthly: 999, yearly: 669, yearlyTotal: 8028 },
  },

  // Норвегия (≈ EUR × 10.8, charm-rounded)
  NOK: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 109, yearly: 79, yearlyTotal: 948 },
    pro: { monthly: 349, yearly: 269, yearlyTotal: 3228 },
  },

  // Швеция (≈ EUR × 10.78, charm-rounded)
  SEK: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 109, yearly: 79, yearlyTotal: 948 },
    pro: { monthly: 349, yearly: 269, yearlyTotal: 3228 },
  },

  // Дания (≈ EUR × 7.46, charm-rounded)
  DKK: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 79, yearly: 49, yearlyTotal: 588 },
    pro: { monthly: 239, yearly: 189, yearlyTotal: 2268 },
  },

  // Австралия (≈ EUR × 1.65, charm-rounded)
  AUD: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 16.9, yearly: 11.9, yearlyTotal: 142.8 },
    pro: { monthly: 49.9, yearly: 39.9, yearlyTotal: 478.8 },
  },
};

// Headline EUR prices rendered as JSON-LD `price` strings (2 decimals).
// Single source for structured data across home / pricing / feature pages —
// derived from the model above, so a price change propagates to all markup.
export const SCHEMA_PRICE_BASIC_EUR = pricing.EUR.basic.yearly.toFixed(2); // "6.90"
export const SCHEMA_PRICE_PRO_EUR = pricing.EUR.pro.yearly.toFixed(2); // "24.90"

export type PlanId = "free" | "basic" | "pro";

/**
 * Получить цены для валюты
 */
export function getPricing(currency: SupportedCurrency): CurrencyPricing {
  return pricing[currency] || pricing.EUR;
}

/**
 * Получить цену плана в валюте
 */
export function getPlanPrice(
  currency: SupportedCurrency,
  planId: PlanId,
  isYearly: boolean
): number {
  const currencyPricing = getPricing(currency);
  const plan = currencyPricing[planId];
  return isYearly ? plan.yearly : plan.monthly;
}

/**
 * Получить годовую сумму плана
 */
export function getYearlyTotal(
  currency: SupportedCurrency,
  planId: PlanId
): number {
  const currencyPricing = getPricing(currency);
  return currencyPricing[planId].yearlyTotal;
}
