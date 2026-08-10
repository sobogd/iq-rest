import type { Locale } from "@/i18n/routing";

/**
 * Запоминает ЯВНЫЙ выбор языка пользователем (клик в language-switcher или
 * lang-auto модалке). Middleware читает NEXT_LOCALE и уважает его во всех
 * geo-редиректах (/d/, /detect-lang, no-prefix), так что выбранный язык
 * прилипает и переживает клики по рекламным ссылкам.
 * Только client-side.
 */
export function rememberLocale(locale: Locale | string): void {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}
