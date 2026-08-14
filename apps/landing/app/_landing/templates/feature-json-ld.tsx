import type { FeatureContent } from "./types";
import { SCHEMA_PRICE_MENU_EUR } from "@/lib/pricing";
import { SCHEMA_DATE_MODIFIED } from "@/lib/page-meta";

const SITE = "https://iq-rest.com";

// Single JSON-LD block per feature page: BreadcrumbList + SoftwareApplication.
// Organization + WebSite are emitted once globally by <BrandSchema> (landing
// layout) and referenced here by @id via publisher — no duplicate node. The
// FAQ is NOT emitted here either: <Faq> already bakes schema.org FAQPage
// microdata into the DOM (faq.tsx), so a JSON-LD FAQPage would duplicate it on
// the same URL. Server-rendered as a static <script> — no runtime cost.
export function FeatureJsonLd({ content }: { content: FeatureContent }) {
  // en is served at the root — `${SITE}/en` would 301, and breadcrumbs must
  // point at canonical URLs.
  const localePath = content.locale === "en" ? SITE : `${SITE}/${content.locale}`;
  const pagePath = content.meta.canonical;
  const inLanguage = content.meta.ogLocale.split("_")[0] ?? content.locale;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "IQ Rest", item: localePath },
          { "@type": "ListItem", position: 2, name: content.meta.title, item: pagePath },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: content.meta.brandLine ?? content.meta.ogTitle,
        description: content.meta.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        dateModified: SCHEMA_DATE_MODIFIED,
        url: pagePath,
        inLanguage,
        publisher: { "@id": `${SITE}/#organization` },
        offers: {
          "@type": "Offer",
          price: SCHEMA_PRICE_MENU_EUR,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: pagePath,
        },
      },
    ],
  };

  const html = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
