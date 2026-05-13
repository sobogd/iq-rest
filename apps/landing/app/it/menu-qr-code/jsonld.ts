import type { LandingTexts } from "@/app/_landing/types";

const URL_SELF = "https://iq-rest.com/it/menu-qr-code";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IQ Rest — Menu QR Code per Ristoranti",
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
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
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
        name: "Menu QR Code per Ristoranti",
        item: URL_SELF,
      },
    ],
  };

  // Real product onboarding flow. Steps mirror texts.how.steps in /it/texts.ts.
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Come generare un menu QR Code per il ristorante",
    description:
      "Genera il menu con QR Code per il tuo ristorante in 4 passi, stampabile per i tavoli, senza app per i clienti.",
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
        text: "Scegli il tipo di attività e inserisci il nome del locale.",
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
        name: "Stampa il QR Code",
        text: "Scarica il QR Code in PDF o PNG, stampalo per i tavoli e inizia a ricevere ordini.",
      },
    ],
  };

  return [softwareApp, faqPage, breadcrumb, howTo];
}
