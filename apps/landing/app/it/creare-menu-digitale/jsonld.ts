import type { LandingTexts } from "@/app/_landing/types";

const URL_SELF = "https://iq-rest.com/it/creare-menu-digitale";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IQ Rest — Editor per creare menu digitali",
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
        name: "Creare Menu Digitale per Ristoranti",
        item: URL_SELF,
      },
    ],
  };

  // Real product onboarding flow. Steps mirror texts.how.steps in /it/texts.ts.
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Come creare un menu digitale e un QR Code menu per il ristorante",
    description:
      "Crea il menu digitale e il QR Code menu del tuo ristorante in 4 passi, dal telefono, senza sviluppatori e senza agenzie.",
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
        name: "Registrati e scegli il tipo di locale",
        text: "Crea l'account in 30 secondi: inserisci il nome del ristorante, l'email o accedi con Google.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Importa o crea il menu",
        text: "Carica una foto del menu cartaceo (l'IA lo digitalizza in 60 secondi) oppure aggiungi i piatti uno per uno dall'editor mobile.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Personalizza foto, colori e lingue",
        text: "Aggiungi le foto dei piatti, scegli i colori del brand e attiva la traduzione automatica nelle lingue dei tuoi clienti.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Pubblica e stampa il QR Code",
        text: "Scarica il QR Code in PDF o PNG, stampalo per i tavoli e inizia a ricevere ordini diretti dal menu digitale.",
      },
    ],
  };

  return [softwareApp, faqPage, breadcrumb, howTo];
}
