import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/fi/online-tilausjarjestelma-ravintolalle";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online-tilausjärjestelmä ravintolalle", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "fi", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Miten käynnistää online-tilausjärjestelmä ravintolalle", description: "Aktivoi suorat online-tilaukset ravintolalle 4 askeleessa — ei POS-laitteistoa, ei välittäjää.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Luo ravintola", text: "Rekisteröinti sähköpostilla tai Googlella 30 sekunnissa." },
    { "@type": "HowToStep", position: 2, name: "Lisää menu", text: "Drag-and-drop tai AI-skannaus — AI tuo kategoriat, ruoat ja hinnat." },
    { "@type": "HowToStep", position: 3, name: "Valitse kanava", text: "Tilaukset keittiön tablettiin, ravintolan WhatsAppiin tai molempiin yhtä aikaa." },
    { "@type": "HowToStep", position: 4, name: "Tulosta QR", text: "Lataa QR (yksi pöytää kohti tai yksi ravintolaa kohti) ja kiinnitä pöytiin." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
