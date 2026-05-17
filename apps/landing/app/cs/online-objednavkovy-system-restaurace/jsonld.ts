import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/cs/online-objednavkovy-system-restaurace";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online objednávkový systém pro restauraci", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "cs", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Jak zapnout online objednávkový systém pro restauraci", description: "Aktivujte přímé online objednávky pro restauraci ve 4 krocích — bez POS hardwaru, bez agregátoru.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Vytvořit restauraci", text: "Registrace e-mailem nebo Google za 30 sekund." },
    { "@type": "HowToStep", position: 2, name: "Přidat menu", text: "Drag-and-drop nebo AI skenování — AI importuje kategorie, jídla a ceny." },
    { "@type": "HowToStep", position: 3, name: "Vybrat kanál", text: "Objednávky na kuchyňský tablet, do WhatsAppu restaurace nebo oba současně." },
    { "@type": "HowToStep", position: 4, name: "Vytisknout QR", text: "Stáhněte QR (jeden na stůl nebo jeden na restauraci) a nalepte na stoly." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
