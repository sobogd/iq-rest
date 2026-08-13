// Plain replacement for next-intl's `i18n/routing.ts` — the app no longer
// uses next-intl (no messages, no useTranslations/useLocale, no <Link>/
// navigation helpers), so this is just the locale list + RTL set that
// middleware.ts, generateStaticParams and the hreflang/slug libs still need.

export const locales = [
  "en", "es", "de", "fr", "it", "pt", "nl", "pl", "ru", "uk",
  "sv", "da", "no", "fi", "cs", "el", "tr", "ro", "hu", "bg",
  "hr", "sk", "sl", "et", "lv", "lt", "sr", "ca", "ga", "is",
  "fa", "ar", "ja", "ko", "zh",
] as const;

export const defaultLocale: Locale = "en";

// RTL languages
export const rtlLocales = ["fa", "ar"] as const;

export type Locale = (typeof locales)[number];
