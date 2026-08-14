import type { Metadata } from "next";
import { PricingTemplate } from "@/app/_landing/templates/pricing-template";
import type { LandingTexts } from "@/app/_landing/types";
import DEFAULT_JSON from "../texts.json";
import PRICING_JSON from "./pricing.json";
import {
  SCHEMA_PRICE_MENU_EUR,
  SCHEMA_PRICE_RESERVATIONS_EUR,
  SCHEMA_PRICE_ORDERS_KDS_EUR,
  SCHEMA_PRICE_DOMAIN_EUR,
} from "@/lib/pricing";
import { featureAlternates } from "@/lib/hreflang";
import { restaurantCount } from "@/lib/restaurant-count";

export const dynamic = "force-static";
export const revalidate = false;

const SITE = "https://iq-rest.com";

const DEFAULT = DEFAULT_JSON as unknown as LandingTexts;
const TEXTS: LandingTexts = {
  ...DEFAULT,
  meta: PRICING_JSON.meta,
  finalCta: PRICING_JSON.finalCta ?? DEFAULT.finalCta,
};

const PRICING_FAQ = {
  ...DEFAULT.faq,
  sub: PRICING_JSON.faqSub,
  items: PRICING_JSON.faqItems,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical, languages: featureAlternates("/pricing") },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `IQ Rest — ${PRICING_JSON.breadcrumbLabel}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

// Organization + WebSite are emitted once globally by <BrandSchema> (rendered
// in the landing layout), so this page only adds page-specific nodes and
// references the org by @id. The FAQ is NOT duplicated here — <Faq> already
// bakes schema.org FAQPage microdata into the DOM (faq.tsx), so a second
// JSON-LD FAQPage would be a duplicate on the same URL. Every string comes from
// the colocated JSON — this file is locale-agnostic.
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "IQ Rest", item: DEFAULT.meta.canonical },
        { "@type": "ListItem", position: 2, name: PRICING_JSON.breadcrumbLabel, item: TEXTS.meta.canonical },
      ],
    },
    {
      "@type": "Product",
      name: "IQ Rest",
      description: TEXTS.meta.description,
      brand: { "@type": "Brand", name: "IQ Rest" },
      offers: [
        { "@type": "Offer", name: "Digital menu (base)", price: SCHEMA_PRICE_MENU_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Table reservations (add-on)", price: SCHEMA_PRICE_RESERVATIONS_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Order taking + kitchen display (add-on)", price: SCHEMA_PRICE_ORDERS_KDS_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
        { "@type": "Offer", name: "Custom menu domain (add-on)", price: SCHEMA_PRICE_DOMAIN_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: TEXTS.meta.canonical },
      ],
    },
  ],
}).replace(/</g, "\\u003c");

export default function PricingPage() {
  return (
    <PricingTemplate
      locale={DEFAULT.htmlLang}
      texts={TEXTS}
      faq={PRICING_FAQ}
      jsonLd={JSON_LD}
      count={restaurantCount()}
    />
  );
}
