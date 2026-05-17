import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/en/restaurant-online-ordering-system";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Restaurant Online Ordering System",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "en",
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
    name: "How to set up a restaurant online ordering system",
    description:
      "Turn on direct online ordering for your restaurant in 4 steps — no POS hardware, no aggregator.",
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
        name: "Create the restaurant",
        text: "Sign up with email or Google in 30 seconds.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add the menu",
        text: "Drag-and-drop or scan a paper menu — AI imports categories, items and prices.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose the channel",
        text: "Send incoming orders to the kitchen tablet, to WhatsApp or to both at once.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Print the QR codes",
        text: "Download the QR (one per table or one for the whole venue) and place it on the tables.",
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
