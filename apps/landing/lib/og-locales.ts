// Open Graph locale codes for every supported landing locale. Used to emit
// `og:locale:alternate` from page-level metadata: the root layout's
// `openGraph.alternateLocale` is dropped whenever a page defines its own
// `openGraph` object (Next.js replaces the whole object, it does not merge),
// so each page passes `ogAlternateLocales(currentOgLocale)` explicitly.
export const OG_LOCALES = [
  "en_US",
  "ar_SA",
  "bg_BG",
  "ca_ES",
  "cs_CZ",
  "da_DK",
  "de_DE",
  "el_GR",
  "es_ES",
  "et_EE",
  "fa_IR",
  "fi_FI",
  "fr_FR",
  "ga_IE",
  "hr_HR",
  "hu_HU",
  "is_IS",
  "it_IT",
  "ja_JP",
  "ko_KR",
  "lt_LT",
  "lv_LV",
  "nl_NL",
  "no_NO",
  "pl_PL",
  "pt_PT",
  "ro_RO",
  "ru_RU",
  "sk_SK",
  "sl_SI",
  "sr_RS",
  "sv_SE",
  "tr_TR",
  "uk_UA",
  "zh_CN",
] as const;

// All OG locales except the page's own — the value for `og:locale:alternate`.
export function ogAlternateLocales(current: string): string[] {
  return OG_LOCALES.filter((l) => l !== current);
}
