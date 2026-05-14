import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/es/menu-digital";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Menú Digital para Restaurantes",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "es",
    offers: {
      "@type": "Offer",
      price: "6.90",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: URL_SELF,
    },
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

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "IQ Rest",
        item: "https://iq-rest.com/es",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Menú Digital para Restaurantes",
        item: URL_SELF,
      },
    ],
  };

  const howTo = {
    "@type": "HowTo",
    name: "Cómo crear un menú digital para restaurantes",
    description:
      "Crea el menú digital de tu restaurante en 4 pasos, sin programadores y sin agencias.",
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "0",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Tipo y nombre",
        text: "Elige el tipo de negocio e introduce el nombre del restaurante.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Guarda la cuenta",
        text: "Introduce el email o accede con Google.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Crea el menú",
        text: "Créalo desde cero o escanea el menú en papel: la IA lo digitaliza en 60 segundos.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Listo",
        text: "Visualiza el menú digital, comparte el código QR para las mesas y recibe los pedidos.",
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [softwareApp, faqPage, breadcrumb, howTo],
  };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(
  /</g,
  "\\u003c",
);
