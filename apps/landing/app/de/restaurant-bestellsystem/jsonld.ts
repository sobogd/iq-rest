import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/de/restaurant-bestellsystem";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Restaurant Bestellsystem",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "de",
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
    name: "Wie aktiviere ich ein Restaurant Bestellsystem",
    description:
      "Aktiviere direkte Online-Bestellungen für dein Restaurant in 4 Schritten — keine POS-Hardware, kein Aggregator.",
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
        name: "Restaurant anlegen",
        text: "Anmeldung per E-Mail oder Google in 30 Sekunden.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Karte hinzufügen",
        text: "Drag-and-drop oder KI-Scan einer Papier-Karte — die KI importiert Kategorien, Gerichte und Preise.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Kanal wählen",
        text: "Sende eingehende Bestellungen ans Küchen-Tablet, an WhatsApp oder an beides gleichzeitig.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "QR drucken",
        text: "Lade den QR (einen pro Tisch oder einen fürs ganze Lokal) herunter und platziere ihn an den Tischen.",
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
