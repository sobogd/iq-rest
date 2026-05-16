import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/es/lp/carta-digital-para-restaurante";
const URL_HOME_ES = "https://iq-rest.com/es";
const ORG_ID = "https://iq-rest.com/#organization";

export function buildJsonLd(texts: LandingTexts) {
  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "IQ Rest",
    url: "https://iq-rest.com",
    logo: "https://iq-rest.com/logo.png",
  };

  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Carta Digital para Restaurantes",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "es",
    publisher: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: "6.90",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: URL_SELF,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: URL_HOME_ES,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Carta Digital para Restaurantes",
        item: URL_SELF,
      },
    ],
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: texts.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, softwareApp, breadcrumb, faqPage],
  };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(
  /</g,
  "\\u003c",
);
