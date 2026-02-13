/**
 * Валюты которые поддерживаем (есть цены в Stripe)
 */
export const supportedCurrencies = [
  "EUR", // Европа (fallback)
  "PLN", // Польша
  "MXN", // Мексика
  "BRL", // Бразилия
  "ARS", // Аргентина
  "COP", // Колумбия
  "CLP", // Чили (zero-decimal!)
  "PEN", // Перу
  "UYU", // Уругвай
] as const;

export type SupportedCurrency = (typeof supportedCurrencies)[number];

/**
 * Маппинг код страны → валюта
 * Только страны на которые рекламируемся
 */
export const countryToCurrency: Record<string, SupportedCurrency> = {
  // Польша
  PL: "PLN",

  // Латинская Америка
  MX: "MXN", // Мексика
  BR: "BRL", // Бразилия
  AR: "ARS", // Аргентина
  CO: "COP", // Колумбия
  CL: "CLP", // Чили
  PE: "PEN", // Перу
  UY: "UYU", // Уругвай

  // Еврозона → EUR
  ES: "EUR", // Испания
  DE: "EUR", // Германия
  FR: "EUR", // Франция
  IT: "EUR", // Италия
  PT: "EUR", // Португалия
  NL: "EUR", // Нидерланды
  BE: "EUR", // Бельгия
  AT: "EUR", // Австрия
  IE: "EUR", // Ирландия
  FI: "EUR", // Финляндия
  GR: "EUR", // Греция
  LU: "EUR", // Люксембург
  MT: "EUR", // Мальта
  CY: "EUR", // Кипр
  SK: "EUR", // Словакия
  SI: "EUR", // Словения
  EE: "EUR", // Эстония
  LV: "EUR", // Латвия
  LT: "EUR", // Литва
  HR: "EUR", // Хорватия
};

/**
 * Информация о валютах для отображения
 */
export const currencyInfo: Record<SupportedCurrency, {
  symbol: string;
  name: string;
  symbolPosition: "before" | "after";
  zeroDecimal: boolean;
}> = {
  EUR: { symbol: "€", name: "Euro", symbolPosition: "before", zeroDecimal: false },
  PLN: { symbol: "zł", name: "Polish Zloty", symbolPosition: "after", zeroDecimal: false },
  MXN: { symbol: "$", name: "Mexican Peso", symbolPosition: "before", zeroDecimal: false },
  BRL: { symbol: "R$", name: "Brazilian Real", symbolPosition: "before", zeroDecimal: false },
  ARS: { symbol: "$", name: "Argentine Peso", symbolPosition: "before", zeroDecimal: false },
  COP: { symbol: "$", name: "Colombian Peso", symbolPosition: "before", zeroDecimal: false },
  CLP: { symbol: "$", name: "Chilean Peso", symbolPosition: "before", zeroDecimal: true },
  PEN: { symbol: "S/", name: "Peruvian Sol", symbolPosition: "before", zeroDecimal: false },
  UYU: { symbol: "$", name: "Uruguayan Peso", symbolPosition: "before", zeroDecimal: false },
};

/**
 * Получить валюту по коду страны
 * @returns код валюты или EUR как fallback
 */
export function getCurrencyByCountry(countryCode: string | null): SupportedCurrency {
  if (!countryCode) return "EUR";
  return countryToCurrency[countryCode.toUpperCase()] || "EUR";
}
