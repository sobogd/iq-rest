import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/es/carta-digital";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Editor de Carta Digital para Restaurantes",
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
        name: "Carta Digital para Restaurantes",
        item: URL_SELF,
      },
    ],
  };

  const howTo = {
    "@type": "HowTo",
    name: "Cómo crear una carta digital y un código QR para restaurantes",
    description:
      "Crea la carta digital y el código QR para tu restaurante en 4 pasos, desde el móvil, sin programadores y sin agencias.",
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
        name: "Regístrate y elige el tipo de local",
        text: "Crea la cuenta en 30 segundos: nombre del restaurante, email o acceso con Google.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Importa o crea la carta",
        text: "Sube una foto de la carta en papel (la IA la digitaliza en 60 segundos) o añade los platos uno a uno desde el editor móvil.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Personaliza fotos, colores e idiomas",
        text: "Añade las fotos de los platos, elige los colores de la marca y activa la traducción automática a los idiomas de tus clientes.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Publica e imprime el código QR",
        text: "Descarga el código QR en PDF o PNG, imprímelo para las mesas y empieza a recibir pedidos directos desde la carta digital.",
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
