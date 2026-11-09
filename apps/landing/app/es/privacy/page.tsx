import type { Metadata } from "next";
import { PRIVACY_POLICY_SECTIONS_ES, PRIVACY_POLICY_TITLE_ES } from "@/components/cookie-consent/legal-text.es";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// Self-canonical Spanish variant: the body is the equivalent translation in
// legal-text.es.ts, not the English copy. Reciprocal hreflang with the root
// English page; every other locale keeps canonicalising to /privacy via
// app/[locale] (English body, localized chrome).
export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE_ES,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://iq-rest.com/es/privacy",
    languages: {
      "x-default": "https://iq-rest.com/privacy",
      en: "https://iq-rest.com/privacy",
      es: "https://iq-rest.com/es/privacy",
    },
  },
};

export default async function PrivacyPageEs() {
  const chrome = await getLandingChrome("es");
  return (
    <LegalDocument
      title={PRIVACY_POLICY_TITLE_ES}
      sections={PRIVACY_POLICY_SECTIONS_ES}
      locale="es"
      lang="es"
      trackPage="privacy"
      chrome={chrome}
    />
  );
}
