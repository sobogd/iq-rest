import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/pl/system-zamowien-online-dla-restauracji";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — System Zamówień Online dla Restauracji",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "pl",
    offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF },
  };
  const faqPage = {
    "@type": "FAQPage",
    mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const howTo = {
    "@type": "HowTo",
    name: "Jak włączyć system zamówień online dla restauracji",
    description: "Włącz bezpośrednie zamówienia online dla restauracji w 4 krokach — bez sprzętu POS, bez agregatora.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Stwórz restaurację", text: "Rejestracja email lub Google w 30 sekund." },
      { "@type": "HowToStep", position: 2, name: "Dodaj menu", text: "Drag-and-drop lub AI-skan papierowego menu — AI importuje kategorie, dania i ceny." },
      { "@type": "HowToStep", position: 3, name: "Wybierz kanał", text: "Zamówienia na tablet kuchni, WhatsApp lub oba naraz." },
      { "@type": "HowToStep", position: 4, name: "Wydrukuj QR", text: "Pobierz QR (po jednym na stolik lub jeden na lokal) i naklej na stoliki." },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
