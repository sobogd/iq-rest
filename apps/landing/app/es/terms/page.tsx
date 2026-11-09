import type { Metadata } from "next";
import { TERMS_SECTIONS_ES, TERMS_TITLE_ES } from "@/components/cookie-consent/legal-text.es";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See app/es/privacy/page.tsx — self-canonical Spanish variant with reciprocal
// hreflang; every other locale canonicalises to /terms via app/[locale].
export const metadata: Metadata = {
  title: TERMS_TITLE_ES,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://iq-rest.com/es/terms",
    languages: {
      "x-default": "https://iq-rest.com/terms",
      en: "https://iq-rest.com/terms",
      es: "https://iq-rest.com/es/terms",
    },
  },
};

export default async function TermsPageEs() {
  const chrome = await getLandingChrome("es");
  return (
    <LegalDocument
      title={TERMS_TITLE_ES}
      sections={TERMS_SECTIONS_ES}
      locale="es"
      lang="es"
      trackPage="terms"
      chrome={chrome}
    />
  );
}
