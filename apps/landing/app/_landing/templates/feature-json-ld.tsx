import type { FeatureContent } from "./types";
import { SCHEMA_PRICE_BASIC_EUR } from "@/lib/pricing";

const SITE = "https://iq-rest.com";

// Single JSON-LD block per feature page: BreadcrumbList + SoftwareApplication
// + FAQPage. Server-rendered as a static <script> — no runtime cost.
export function FeatureJsonLd({ content }: { content: FeatureContent }) {
  const localePath = `${SITE}/${content.locale}`;
  const pagePath = content.meta.canonical;
  const inLanguage = content.meta.ogLocale.split("_")[0] ?? content.locale;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "IQ Rest",
        url: SITE,
        logo: `${SITE}/logo.png`,
      },
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
        url: pagePath,
        inLanguage,
        publisher: { "@id": `${SITE}/#organization` },
        offers: {
          "@type": "Offer",
          price: SCHEMA_PRICE_BASIC_EUR,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: pagePath,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
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
