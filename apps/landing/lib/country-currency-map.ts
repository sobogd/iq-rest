/**
 * Валюты которые поддерживаем (есть цены в Stripe)
 */
export const supportedCurrencies = [
  "EUR", // Европа (fallback)
  "USD", // США
  "PLN", // Польша
  "MXN", // Мексика
  "BRL", // Бразилия
  "ARS", // Аргентина
  "COP", // Колумбия
  "CLP", // Чили (zero-decimal!)
  "PEN", // Перу
  "UYU", // Уругвай
  "TRY", // Турция
  "NOK", // Норвегия
  "SEK", // Швеция
  "DKK", // Дания
  "AUD", // Австралия
  "GBP", // Великобритания
  "CZK", // Чехия
  "HUF", // Венгрия
  "ISK", // Исландия
  "CHF", // Швейцария
  "RSD", // Сербия
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

  // Турция
  TR: "TRY",

  // Скандинавия (своя валюта биллинга)
  NO: "NOK", // Норвегия
  SE: "SEK", // Швеция
  DK: "DKK", // Дания

  // США
  US: "USD",

  // Австралия
  AU: "AUD",

  // Великобритания
  GB: "GBP",

  // Прочая Европа (своя валюта биллинга; PL уже выше)
  CZ: "CZK", // Чехия
  HU: "HUF", // Венгрия
  IS: "ISK", // Исландия
  CH: "CHF", // Швейцария
  RS: "RSD", // Сербия

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
  USD: { symbol: "$", name: "US Dollar", symbolPosition: "before", zeroDecimal: false },
  PLN: { symbol: "zł", name: "Polish Zloty", symbolPosition: "after", zeroDecimal: false },
  MXN: { symbol: "MX$", name: "Mexican Peso", symbolPosition: "before", zeroDecimal: false },
  BRL: { symbol: "R$", name: "Brazilian Real", symbolPosition: "before", zeroDecimal: false },
  ARS: { symbol: "AR$", name: "Argentine Peso", symbolPosition: "before", zeroDecimal: false },
  COP: { symbol: "CO$", name: "Colombian Peso", symbolPosition: "before", zeroDecimal: false },
  CLP: { symbol: "CL$", name: "Chilean Peso", symbolPosition: "before", zeroDecimal: true },
  PEN: { symbol: "S/", name: "Peruvian Sol", symbolPosition: "before", zeroDecimal: false },
  UYU: { symbol: "UY$", name: "Uruguayan Peso", symbolPosition: "before", zeroDecimal: false },
  TRY: { symbol: "₺", name: "Turkish Lira", symbolPosition: "after", zeroDecimal: false },
  NOK: { symbol: "kr", name: "Norwegian Krone", symbolPosition: "after", zeroDecimal: false },
  SEK: { symbol: "kr", name: "Swedish Krona", symbolPosition: "after", zeroDecimal: false },
  DKK: { symbol: "kr", name: "Danish Krone", symbolPosition: "after", zeroDecimal: false },
  AUD: { symbol: "A$", name: "Australian Dollar", symbolPosition: "before", zeroDecimal: false },
  GBP: { symbol: "£", name: "British Pound", symbolPosition: "before", zeroDecimal: false },
  CZK: { symbol: "Kč", name: "Czech Koruna", symbolPosition: "after", zeroDecimal: false },
  HUF: { symbol: "Ft", name: "Hungarian Forint", symbolPosition: "after", zeroDecimal: false },
  ISK: { symbol: "kr", name: "Icelandic Króna", symbolPosition: "after", zeroDecimal: false },
  CHF: { symbol: "CHF", name: "Swiss Franc", symbolPosition: "after", zeroDecimal: false },
  RSD: { symbol: "RSD", name: "Serbian Dinar", symbolPosition: "after", zeroDecimal: false },
};

/**
 * Получить валюту по коду страны
 * @returns код валюты или EUR как fallback
 */
export function getCurrencyByCountry(countryCode: string | null): SupportedCurrency {
  if (!countryCode) return "EUR";
  return countryToCurrency[countryCode.toUpperCase()] || "EUR";
}

/** Validate a raw string against the supported set, else EUR. */
export function asSupportedCurrency(raw: string | null | undefined): SupportedCurrency {
  const up = (raw || "").toUpperCase();
  return (supportedCurrencies as readonly string[]).includes(up) ? (up as SupportedCurrency) : "EUR";
}

/** Client-side: billing currency from the `geo_currency` cookie (default EUR).
 *  Kept here (no next/headers) so client components can import it safely. */
export function readBillingCurrencyFromDocument(): SupportedCurrency {
  if (typeof document === "undefined") return "EUR";
  const m = /(?:^|;\s*)geo_currency=([^;]+)/.exec(document.cookie);
  return asSupportedCurrency(m ? decodeURIComponent(m[1]) : null);
}

/** Format a plan price: no decimals for whole numbers, symbol placed per
 *  currency (e.g. "€9.90", "109 kr"). Non-breaking space before "kr". */
export function formatMoney(amount: number, currency: SupportedCurrency): string {
  const info = currencyInfo[currency];
  const n = amount.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return info.symbolPosition === "after" ? `${n} ${info.symbol}` : `${info.symbol}${n}`;
}
