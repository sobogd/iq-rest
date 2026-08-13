import type { Metadata } from "next";
import { PRIVACY_POLICY_SECTIONS, PRIVACY_POLICY_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// English lives at the root (no /en prefix), same as every other (en) page.
// This is the canonical copy of the document — every /<locale>/privacy
// variant (identical English body, localized chrome) canonicalises here.
export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://iq-rest.com/privacy" },
};

export default async function PrivacyPage() {
  const chrome = await getLandingChrome("en");
  return (
    <LegalDocument
      title={PRIVACY_POLICY_TITLE}
      sections={PRIVACY_POLICY_SECTIONS}
      locale="en"
      trackPage="privacy"
      chrome={chrome}
    />
  );
}
