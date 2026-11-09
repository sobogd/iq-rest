import { LegalDocument } from "@/components/legal-document";
import { legalDocForLocale, legalMetadataForLocale } from "@/components/cookie-consent/legal-doc";
import { getLandingChrome } from "@/app/_landing/lib/landing-chrome";

// See [locale]/privacy/page.tsx — identical English document (canonical to the
// root) on every locale except es (self-canonical Spanish document).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return legalMetadataForLocale("cookies", locale);
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = legalDocForLocale("cookies", locale);
  const chrome = await getLandingChrome(locale);
  return (
    <LegalDocument
      title={doc.title}
      sections={doc.sections}
      locale={locale}
      lang={doc.lang}
      trackPage="cookies"
      chrome={chrome}
    />
  );
}
