import type { Metadata } from "next";
import { PRIVACY_POLICY_SECTIONS, PRIVACY_POLICY_TITLE } from "@/components/cookie-consent/legal-text";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: PRIVACY_POLICY_TITLE,
  robots: { index: true, follow: true },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <LegalDocument
      title={PRIVACY_POLICY_TITLE}
      sections={PRIVACY_POLICY_SECTIONS}
      locale={locale}
    />
  );
}
