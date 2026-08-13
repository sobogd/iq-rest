import type { Metadata } from "next";
import { TERMS_SECTIONS, TERMS_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See (en)/privacy/page.tsx — root URL is the canonical copy.
export const metadata: Metadata = {
  title: TERMS_TITLE,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://iq-rest.com/terms" },
};

export default async function TermsPage() {
  const chrome = await getLandingChrome("en");
  return (
    <LegalDocument
      title={TERMS_TITLE}
      sections={TERMS_SECTIONS}
      locale="en"
      trackPage="terms"
      chrome={chrome}
    />
  );
}
