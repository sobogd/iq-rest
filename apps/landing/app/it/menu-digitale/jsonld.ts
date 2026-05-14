import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/it/menu-digitale";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Menu Digitale per Ristoranti",
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

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "IQ Rest",
        item: "https://iq-rest.com/it",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Menu Digitale per Ristoranti",
        item: URL_SELF,
      },
    ],
  };

  // Real product onboarding flow. Steps mirror texts.how.steps in /it/texts.ts.
  const howTo = {
    "@type": "HowTo",
    name: "Come creare un menu digitale per ristoranti",
    description:
      "Crea il menu digitale del tuo ristorante in 4 passi, senza sviluppatori e senza agenzie.",
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
        name: "Tipo e nome",
        text: "Scegli il tipo di attività e inserisci il nome del ristorante.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Salva l'account",
        text: "Inserisci l'email oppure accedi con Google.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Crea il menu",
        text: "Crealo da zero oppure scansiona quello cartaceo: l'IA lo digitalizza in 60 secondi.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Pronto",
        text: "Visualizza il menu digitale, condividi il QR Code per i tavoli e ricevi gli ordini.",
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [softwareApp, faqPage, breadcrumb, howTo],
  };
}

/** Precomputed at module load — no per-request stringify cost. */
export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(
  /</g,
  "\\u003c",
);
