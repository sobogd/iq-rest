import { LegalDocument } from "@/components/legal-document";
import { legalDocForLocale, legalMetadataForLocale } from "@/components/cookie-consent/legal-doc";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// Non-es locales render the identical English document (localized chrome only),
// canonicalised to the root English copy at (en)/privacy — one indexed page,
// no hreflang. es renders the equivalent Spanish document, self-canonical with
// reciprocal hreflang. Document + metadata switch live in legal-doc.ts.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return legalMetadataForLocale("privacy", locale);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = legalDocForLocale("privacy", locale);
  const chrome = await getLandingChrome(locale);
  return (
    <LegalDocument
      title={doc.title}
      sections={doc.sections}
      locale={locale}
      lang={doc.lang}
      trackPage="privacy"
      chrome={chrome}
    />
  );
}
