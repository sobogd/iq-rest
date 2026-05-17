import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/es/sistema-de-pedidos-para-restaurantes";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Sistema de Pedidos para Restaurantes",
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

  const howTo = {
    "@type": "HowTo",
    name: "Cómo activar un sistema de pedidos para restaurantes",
    description:
      "Activa los pedidos online directos para tu restaurante en 4 pasos — sin hardware TPV, sin agregador.",
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
        name: "Crear el restaurante",
        text: "Registro con email o Google en 30 segundos.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Añadir la carta",
        text: "Drag-and-drop o escaneo IA del menú en papel — la IA importa categorías, platos y precios.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Elegir el canal",
        text: "Envía los pedidos a la tableta de cocina, al WhatsApp del local o a ambos a la vez.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Imprimir los QR",
        text: "Descarga el QR (uno por mesa o uno para todo el local) y pégalo en las mesas.",
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [softwareApp, faqPage, howTo],
  };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(
  /</g,
  "\\u003c",
);
