import type { Metadata } from "next";
import {
  COOKIE_POLICY_SECTIONS,
  COOKIE_POLICY_TITLE,
  PRIVACY_POLICY_SECTIONS,
  PRIVACY_POLICY_TITLE,
  TERMS_SECTIONS,
  TERMS_TITLE,
} from "./legal-text";
import {
  COOKIE_POLICY_SECTIONS_ES,
  COOKIE_POLICY_TITLE_ES,
  PRIVACY_POLICY_SECTIONS_ES,
  PRIVACY_POLICY_TITLE_ES,
  TERMS_SECTIONS_ES,
  TERMS_TITLE_ES,
} from "./legal-text.es";

type Section = { heading?: string; paragraphs: string[] };
type Kind = "privacy" | "terms" | "cookies";

export type LegalDoc = { title: string; sections: Section[]; lang: "en" | "es" };

const EN: Record<Kind, LegalDoc> = {
  privacy: { title: PRIVACY_POLICY_TITLE, sections: PRIVACY_POLICY_SECTIONS, lang: "en" },
  terms: { title: TERMS_TITLE, sections: TERMS_SECTIONS, lang: "en" },
  cookies: { title: COOKIE_POLICY_TITLE, sections: COOKIE_POLICY_SECTIONS, lang: "en" },
};

const ES: Record<Kind, LegalDoc> = {
  privacy: { title: PRIVACY_POLICY_TITLE_ES, sections: PRIVACY_POLICY_SECTIONS_ES, lang: "es" },
  terms: { title: TERMS_TITLE_ES, sections: TERMS_SECTIONS_ES, lang: "es" },
  cookies: { title: COOKIE_POLICY_TITLE_ES, sections: COOKIE_POLICY_SECTIONS_ES, lang: "es" },
};

const SITE = "https://iq-rest.com";

// One [locale] route serves every legal URL. es gets the equivalent Spanish
// document (self-canonical + reciprocal hreflang); every other locale gets the
// English document (canonical to the root English copy). es must NOT also have
// a static app/es/privacy route: both trees prerender the same URL to the same
// .next file and the [locale] render wins the collision.
export function legalDocForLocale(kind: Kind, locale: string): LegalDoc {
  return locale === "es" ? ES[kind] : EN[kind];
}

export function legalMetadataForLocale(kind: Kind, locale: string): Metadata {
  if (locale === "es") {
    const es = `${SITE}/es/${kind}`;
    const en = `${SITE}/${kind}`;
    return {
      title: ES[kind].title,
      robots: { index: true, follow: true },
      alternates: {
        canonical: es,
        languages: { "x-default": en, en, es },
      },
    };
  }
  return {
    title: EN[kind].title,
    robots: { index: true, follow: true },
    alternates: { canonical: `${SITE}/${kind}` },
  };
}
