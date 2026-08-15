import type { Metadata } from "next";
import { CroHomeTemplateV2, type CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";
import type { LandingTexts } from "@/app/_landing/types";
import TEXTS_JSON from "./texts.json";
import CRO_JSON from "./cro.json";
import { restaurantCount } from "@/lib/restaurant-count";
import { homeAlternates } from "@/lib/hreflang";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";
import { ogAlternateLocales } from "@/lib/og-locales";

const TEXTS = TEXTS_JSON as unknown as LandingTexts;
const CRO = CRO_JSON as unknown as CroCopyV2;

export const dynamic = "force-static";
export const revalidate = false;

const SITE = "https://iq-rest.com";

// Organization + WebSite are emitted once globally by <BrandSchema> (rendered
// in the landing layout, with @id #organization / #website), so this page only
// adds the SoftwareApplication node and references the org by @id via publisher.
// Every string comes from the colocated texts.json — this file is locale-agnostic
// and identical across all locales.
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: TEXTS.jsonLd?.appName,
      description: TEXTS.meta.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      dateModified: SCHEMA_DATE_MODIFIED,
      url: TEXTS.meta.canonical,
      inLanguage: TEXTS.htmlLang,
      publisher: { "@id": `${SITE}/#organization` },
      offers: {
        "@type": "Offer",
        price: SCHEMA_PRICE_MENU_EUR,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  ],
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical, languages: homeAlternates() },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    alternateLocale: ogAlternateLocales(TEXTS.meta.ogLocale),
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
      <CroHomeTemplateV2
        locale={TEXTS.htmlLang}
        texts={TEXTS}
        cro={CRO}
        count={restaurantCount()}
      />
    </>
  );
}
