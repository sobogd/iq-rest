import type { Metadata } from "next";
import { TERMS_SECTIONS, TERMS_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See privacy/page.tsx for why every locale canonicalises to the root en URL.
export const metadata: Metadata = {
  title: TERMS_TITLE,
  robots: { index: true, follow: true },
  alternates: { canonical: "https://iq-rest.com/terms" },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const chrome = await getLandingChrome(locale);
  return (
    <LegalDocument
      title={TERMS_TITLE}
      sections={TERMS_SECTIONS}
      locale={locale}
      trackPage="terms"
      chrome={chrome}
    />
  );
}
