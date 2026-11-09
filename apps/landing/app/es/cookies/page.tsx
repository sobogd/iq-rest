import type { Metadata } from "next";
import { COOKIE_POLICY_SECTIONS_ES, COOKIE_POLICY_TITLE_ES } from "@/components/cookie-consent/legal-text.es";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See app/es/privacy/page.tsx — self-canonical Spanish variant with reciprocal
// hreflang; every other locale canonicalises to /cookies via app/[locale].
export const metadata: Metadata = {
  title: COOKIE_POLICY_TITLE_ES,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://iq-rest.com/es/cookies",
    languages: {
      "x-default": "https://iq-rest.com/cookies",
      en: "https://iq-rest.com/cookies",
      es: "https://iq-rest.com/es/cookies",
    },
  },
};

export default async function CookiesPageEs() {
  const chrome = await getLandingChrome("es");
  return (
    <LegalDocument
      title={COOKIE_POLICY_TITLE_ES}
      sections={COOKIE_POLICY_SECTIONS_ES}
      locale="es"
      lang="es"
      trackPage="cookies"
      chrome={chrome}
    />
  );
}
