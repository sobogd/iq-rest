import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/lv/tiessaistes-pasutijumu-sistema-restoranam";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Tiešsaistes pasūtījumu sistēma restorānam", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "lv", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Kā ieslēgt tiešsaistes pasūtījumu sistēmu restorānam", description: "Aktivizē tiešus tiešsaistes pasūtījumus restorānam 4 soļos — bez POS aparatūras, bez agregatora.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Izveidot restorānu", text: "Reģistrācija ar e-pastu vai Google 30 sekundēs." },
    { "@type": "HowToStep", position: 2, name: "Pievienot ēdienkarti", text: "Drag-and-drop vai AI skenēšana — AI importē kategorijas, ēdienus un cenas." },
    { "@type": "HowToStep", position: 3, name: "Izvēlēties kanālu", text: "Pasūtījumi uz virtuves planšeti, uz restorāna WhatsApp vai abi vienlaikus." },
    { "@type": "HowToStep", position: 4, name: "Izdrukāt QR", text: "Lejupielādē QR (vienu uz galdiņu vai vienu uz restorānu) un pielīmē pie galdiņiem." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
