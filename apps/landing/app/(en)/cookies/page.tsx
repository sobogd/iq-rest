import type { Metadata } from "next";
import { COOKIE_POLICY_SECTIONS, COOKIE_POLICY_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See (en)/privacy/page.tsx — root URL is the canonical English copy; es is the
// self-canonical Spanish variant with reciprocal hreflang below (served by
// app/[locale]/cookies, see legal-doc.ts).
export const metadata: Metadata = {
  title: COOKIE_POLICY_TITLE,
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://iq-rest.com/cookies",
    languages: {
      "x-default": "https://iq-rest.com/cookies",
      en: "https://iq-rest.com/cookies",
      es: "https://iq-rest.com/es/cookies",
    },
  },
};

export default async function CookiesPage() {
  const chrome = await getLandingChrome("en");
  return (
    <LegalDocument
      title={COOKIE_POLICY_TITLE}
      sections={COOKIE_POLICY_SECTIONS}
      locale="en"
      trackPage="cookies"
      chrome={chrome}
    />
  );
}
