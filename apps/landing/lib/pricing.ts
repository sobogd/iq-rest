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
    basic: { monthly: 9.9, yearly: 7.4, yearlyTotal: 88.8 },
    pro: { monthly: 29.9, yearly: 20.75, yearlyTotal: 249 },
  },

  // Польша
  PLN: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 39, yearly: 29, yearlyTotal: 349 },
    pro: { monthly: 99, yearly: 75, yearlyTotal: 899 },
  },

  // Мексика
  MXN: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 149, yearly: 107, yearlyTotal: 1290 },
    pro: { monthly: 449, yearly: 325, yearlyTotal: 3900 },
  },

  // Бразилия
  BRL: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 39, yearly: 29, yearlyTotal: 349 },
    pro: { monthly: 119, yearly: 82, yearlyTotal: 990 },
  },

  // Аргентина
  ARS: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 7900, yearly: 5750, yearlyTotal: 69000 },
    pro: { monthly: 24900, yearly: 16580, yearlyTotal: 199000 },
  },

  // Колумбия
  COP: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 34900, yearly: 24920, yearlyTotal: 299000 },
    pro: { monthly: 99900, yearly: 74170, yearlyTotal: 890000 },
  },

  // Чили (zero-decimal currency!)
  CLP: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 7900, yearly: 5750, yearlyTotal: 69000 },
    pro: { monthly: 24900, yearly: 16580, yearlyTotal: 199000 },
  },

  // Перу
  PEN: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 29, yearly: 21, yearlyTotal: 249 },
    pro: { monthly: 89, yearly: 66, yearlyTotal: 790 },
  },

  // Уругвай
  UYU: {
    free: { monthly: 0, yearly: 0, yearlyTotal: 0 },
    basic: { monthly: 349, yearly: 249, yearlyTotal: 2990 },
    pro: { monthly: 990, yearly: 742, yearlyTotal: 8900 },
  },
};

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
