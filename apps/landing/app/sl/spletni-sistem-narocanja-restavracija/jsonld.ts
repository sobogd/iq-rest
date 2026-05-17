import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/sl/spletni-sistem-narocanja-restavracija";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Spletni sistem naročanja za restavracijo", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "sl", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Kako vklopiti spletni sistem naročanja za restavracijo", description: "Aktiviraj neposredna spletna naročila za restavracijo v 4 korakih — brez POS strojne opreme, brez agregatorja.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Ustvariti restavracijo", text: "Registracija z e-pošto ali Googlom v 30 sekundah." },
    { "@type": "HowToStep", position: 2, name: "Dodati meni", text: "Drag-and-drop ali AI skeniranje — AI uvozi kategorije, jedi in cene." },
    { "@type": "HowToStep", position: 3, name: "Izbrati kanal", text: "Naročila na kuhinjski tablet, v WhatsApp restavracije ali oba hkrati." },
    { "@type": "HowToStep", position: 4, name: "Natisniti QR", text: "Prenesi QR (enega na mizo ali enega na restavracijo) in nalepi na mize." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
