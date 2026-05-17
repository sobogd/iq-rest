import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/it/tablet-per-ordinazioni-ristorante";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Tablet per Ordinazioni Ristorante",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "it",
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
    name: "Come attivare un tablet per ordinazioni ristorante",
    description:
      "Attiva gli ordini online diretti per il tuo ristorante in 4 passi — niente hardware POS, niente aggregatore.",
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
        name: "Crea il ristorante",
        text: "Registrazione con email o Google in 30 secondi.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Aggiungi il menu",
        text: "Drag-and-drop o scansione IA del menu cartaceo — l'IA importa categorie, piatti e prezzi.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Scegli il canale",
        text: "Invia gli ordini al tablet di cucina, al WhatsApp del locale o a entrambi insieme.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Stampa i QR",
        text: "Scarica il QR (uno per tavolo o uno per tutto il locale) e applicalo sui tavoli.",
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
