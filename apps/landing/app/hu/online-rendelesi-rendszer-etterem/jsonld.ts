import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/hu/online-rendelesi-rendszer-etterem";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online rendelési rendszer étteremnek", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "hu", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Hogyan kapcsolj be online rendelési rendszert étteremnek", description: "Aktiváld a közvetlen online rendeléseket az étteremhez 4 lépésben — POS hardver nélkül, aggregátor nélkül.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Étterem létrehozása", text: "Regisztráció e-mailben vagy Google-lal 30 másodperc alatt." },
    { "@type": "HowToStep", position: 2, name: "Étlap hozzáadása", text: "Drag-and-drop vagy AI szkennelés — az AI importálja a kategóriákat, ételeket és árakat." },
    { "@type": "HowToStep", position: 3, name: "Csatorna választása", text: "Rendelések konyhai tabletre, az étterem WhatsApp-jára vagy mindkettőre egyszerre." },
    { "@type": "HowToStep", position: 4, name: "QR nyomtatása", text: "Tölts le QR-t (asztalonként egyet vagy étterenként egyet) és ragaszd az asztalokra." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
