import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/nl/online-bestelsysteem-voor-restaurants";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Online Bestelsysteem voor Restaurants",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "nl",
    offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF },
  };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = {
    "@type": "HowTo",
    name: "Hoe activeer ik een online bestelsysteem voor een restaurant",
    description: "Activeer directe online bestellingen voor je restaurant in 4 stappen — geen POS-hardware, geen aggregator.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Restaurant aanmaken", text: "Aanmelden via email of Google in 30 seconden." },
      { "@type": "HowToStep", position: 2, name: "Menu toevoegen", text: "Drag-and-drop of AI-scan van een papieren menu — AI importeert categorieën, gerechten en prijzen." },
      { "@type": "HowToStep", position: 3, name: "Kanaal kiezen", text: "Stuur inkomende bestellingen naar de keuken-tablet, WhatsApp of beide tegelijk." },
      { "@type": "HowToStep", position: 4, name: "QR drukken", text: "Download de QR (één per tafel of één voor het hele restaurant) en plak op de tafels." },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
