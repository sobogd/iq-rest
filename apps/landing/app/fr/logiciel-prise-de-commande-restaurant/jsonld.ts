import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/fr/logiciel-prise-de-commande-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Logiciel de Prise de Commande Restaurant",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "fr",
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
    name: "Comment activer un logiciel de prise de commande pour restaurant",
    description:
      "Activez les commandes en ligne directes pour votre restaurant en 4 étapes — sans matériel TPV, sans agrégateur.",
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
        name: "Créer le restaurant",
        text: "Inscription email ou Google en 30 secondes.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Ajouter le menu",
        text: "Glisser-déposer ou scan IA d'un menu papier — l'IA importe catégories, plats et prix.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choisir le canal",
        text: "Envoyez les commandes à la tablette cuisine, au WhatsApp de l'établissement ou aux deux à la fois.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Imprimer les QR",
        text: "Téléchargez le QR (un par table ou un pour tout l'établissement) et placez-le sur les tables.",
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
