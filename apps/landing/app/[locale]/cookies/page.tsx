import type { Metadata } from "next";
import { COOKIE_POLICY_SECTIONS, COOKIE_POLICY_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: COOKIE_POLICY_TITLE,
  robots: { index: true, follow: true },
};

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LegalDocument
      title={COOKIE_POLICY_TITLE}
      sections={COOKIE_POLICY_SECTIONS}
      locale={locale}
    />
  );
}
