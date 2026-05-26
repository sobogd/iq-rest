import type { HelpDoc } from "./types";
import { ru } from "./content/ru";
import { en } from "./content/en";
import { it } from "./content/it";
import { es } from "./content/es";
import { pt } from "./content/pt";
import { de } from "./content/de";
import { fr } from "./content/fr";
import { nl } from "./content/nl";
import { pl } from "./content/pl";
import { tr } from "./content/tr";
import { uk } from "./content/uk";
import { cs } from "./content/cs";
import { sv } from "./content/sv";
import { da } from "./content/da";
import { no } from "./content/no";
import { fi } from "./content/fi";
import { ro } from "./content/ro";
import { sk } from "./content/sk";
import { sl } from "./content/sl";
import { hr } from "./content/hr";

// Single source of truth for which locales have a translated help guide.
// Templates (home/pricing/feature) and the sitemap read from here, so rolling
// out a new locale = add its doc import below (+ its app/<locale>/help/page.tsx).
const DOCS: Record<string, HelpDoc> = { ru, en, it, es, pt, de, fr, nl, pl, tr, uk, cs, sv, da, no, fi, ro, sk, sl, hr };

export const HELP_LOCALES = Object.keys(DOCS);

export function getHelpDoc(locale: string): HelpDoc | null {
  return DOCS[locale] ?? null;
}

// en lives at /help (root locale), others at /<locale>/help.
export function helpHref(locale: string): string {
  return locale === "en" ? "/help" : `/${locale}/help`;
}

export interface HelpBanner {
  title: string;
  sub: string;
  cta: string;
  href: string;
}

// Banner copy + link for a locale, or null if the guide isn't translated yet.
export function getHelpBanner(locale: string): HelpBanner | null {
  const doc = DOCS[locale];
  if (!doc) return null;
  return { ...doc.banner, href: helpHref(locale) };
}
