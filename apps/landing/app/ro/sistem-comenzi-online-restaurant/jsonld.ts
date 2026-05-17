import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ro/sistem-comenzi-online-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Sistem comenzi online pentru restaurant", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "ro", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Cum activezi un sistem comenzi online pentru restaurant", description: "Activează comenzi online directe pentru restaurant în 4 pași — fără hardware POS, fără agregator.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Creează restaurantul", text: "Înregistrare cu email sau Google în 30 de secunde." },
    { "@type": "HowToStep", position: 2, name: "Adaugă meniul", text: "Drag-and-drop sau scanare AI — AI importă categorii, preparate și prețuri." },
    { "@type": "HowToStep", position: 3, name: "Alege canalul", text: "Comenzi pe tableta de bucătărie, pe WhatsApp-ul restaurantului sau ambele simultan." },
    { "@type": "HowToStep", position: 4, name: "Tipărește QR", text: "Descarcă QR (unul pe masă sau unul pe restaurant) și lipește-l pe mese." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
