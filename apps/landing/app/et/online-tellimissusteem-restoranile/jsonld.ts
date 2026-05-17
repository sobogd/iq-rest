import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/et/online-tellimissusteem-restoranile";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online tellimissüsteem restoranile", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "et", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Kuidas lülitada sisse online tellimissüsteem restoranile", description: "Aktiveeri otsesed online tellimused restoranile 4 sammuga — ilma POS riistvarata, ilma vahendajata.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Loo restoran", text: "Registreerumine e-posti või Google'iga 30 sekundiga." },
    { "@type": "HowToStep", position: 2, name: "Lisa menüü", text: "Drag-and-drop või AI-skannimine — AI impordib kategooriad, road ja hinnad." },
    { "@type": "HowToStep", position: 3, name: "Vali kanal", text: "Tellimused köögi tahvelarvutisse, restorani WhatsAppi või mõlemad korraga." },
    { "@type": "HowToStep", position: 4, name: "Prindi QR", text: "Laadi alla QR (üks laua kohta või üks restorani kohta) ja kleebi laudadele." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
