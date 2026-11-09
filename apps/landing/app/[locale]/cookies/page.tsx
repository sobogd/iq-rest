import type { Metadata } from "next";
import { COOKIE_POLICY_SECTIONS, COOKIE_POLICY_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See privacy/page.tsx — every locale canonicalises to the root en URL, except
// es (own self-canonical Spanish route under app/es).
export const metadata: Metadata = {
  title: COOKIE_POLICY_TITLE,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://iq-rest.com/cookies" },
};

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const chrome = await getLandingChrome(locale);
  return (
    <LegalDocument
      title={COOKIE_POLICY_TITLE}
      sections={COOKIE_POLICY_SECTIONS}
      locale={locale}
      trackPage="cookies"
      chrome={chrome}
    />
  );
}
