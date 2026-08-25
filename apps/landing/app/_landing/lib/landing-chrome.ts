import type { LandingTexts } from "../types";
// English chrome fallback for the reset locales (see (auth)/layout.tsx — same
// reasoning: never show Russian nav to a non-ru visitor while the marketing
// pages are being rebuilt).
import EN_CHROME_JSON from "@/app/[locale]/(auth)/en-chrome.json";

// The blog pages under app/[locale]/blog need the shared CTA copy + blog
// namespace on top of the header/footer chrome — the loaders below return the
// FULL texts.json at runtime, this type just names the slices pages may use.
export type LandingChrome = Pick<
  LandingTexts,
  "header" | "footer" | "common" | "auth" | "finalCta" | "ctaText" | "demoText" | "microcopy" | "blog"
>;

const EN_CHROME = EN_CHROME_JSON as unknown as LandingChrome;

// Locales whose marketing pages (and thus full texts.json chrome) exist today.
// Lazy imports — only the requested locale's copy is loaded. When a locale's
// landing is re-translated (new app/<locale>/texts.json), add it here.
const CHROME_LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  en: () => import("@/app/(en)/texts.json"),
  es: () => import("@/app/es/texts.json"),
  fr: () => import("@/app/fr/texts.json"),
  it: () => import("@/app/it/texts.json"),
  pt: () => import("@/app/pt/texts.json"),
  ru: () => import("@/app/ru/texts.json"),
  de: () => import("@/app/de/texts.json"),
  nl: () => import("@/app/nl/texts.json"),
  pl: () => import("@/app/pl/texts.json"),
  uk: () => import("@/app/uk/texts.json"),
  sv: () => import("@/app/sv/texts.json"),
  da: () => import("@/app/da/texts.json"),
  no: () => import("@/app/no/texts.json"),
  cs: () => import("@/app/cs/texts.json"),
  el: () => import("@/app/el/texts.json"),
  hr: () => import("@/app/hr/texts.json"),
  sl: () => import("@/app/sl/texts.json"),
  lt: () => import("@/app/lt/texts.json"),
  sr: () => import("@/app/sr/texts.json"),
  ca: () => import("@/app/ca/texts.json"),
  ga: () => import("@/app/ga/texts.json"),
  fa: () => import("@/app/fa/texts.json"),
  ar: () => import("@/app/ar/texts.json"),
  ja: () => import("@/app/ja/texts.json"),
  zh: () => import("@/app/zh/texts.json"),
  tr: () => import("@/app/tr/texts.json"),
  ro: () => import("@/app/ro/texts.json"),
  hu: () => import("@/app/hu/texts.json"),
  bg: () => import("@/app/bg/texts.json"),
  sk: () => import("@/app/sk/texts.json"),
  et: () => import("@/app/et/texts.json"),
  lv: () => import("@/app/lv/texts.json"),
  is: () => import("@/app/is/texts.json"),
  fi: () => import("@/app/fi/texts.json"),
  ko: () => import("@/app/ko/texts.json"),
};

/** Header/footer copy for pages under `app/[locale]/` (legal docs), which sit
 *  outside the per-locale marketing folders and can't colocate a texts.json. */
export async function getLandingChrome(locale: string): Promise<LandingChrome> {
  const load = CHROME_LOADERS[locale];
  if (load) return (await load()).default as LandingChrome;
  return EN_CHROME;
}
