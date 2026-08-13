import type { Metadata } from "next";
import { PRIVACY_POLICY_SECTIONS, PRIVACY_POLICY_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// The document body is identical English text on every locale (only the
// header/footer chrome is localized), so all locale URLs canonicalise to the
// root English copy at (en)/privacy — one indexed page, no duplicate-content
// noise. No hreflang on purpose: hreflang requires each variant to be
// self-canonical.
export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://iq-rest.com/privacy" },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const chrome = await getLandingChrome(locale);
  return (
    <LegalDocument
      title={PRIVACY_POLICY_TITLE}
      sections={PRIVACY_POLICY_SECTIONS}
      locale={locale}
      trackPage="privacy"
      chrome={chrome}
    />
  );
}
