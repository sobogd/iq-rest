import type { Metadata } from "next";
import { TERMS_SECTIONS, TERMS_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: TERMS_TITLE,
  robots: { index: true, follow: true },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LegalDocument
      title={TERMS_TITLE}
      sections={TERMS_SECTIONS}
      locale={locale}
    />
  );
}
