import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/hr/online-sustav-narudzbi-restoran";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online sustav narudžbi za restoran", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "hr", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Kako uključiti online sustav narudžbi za restoran", description: "Aktivirajte izravne online narudžbe za restoran u 4 koraka — bez POS hardvera, bez agregatora.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Stvoriti restoran", text: "Registracija emailom ili Googleom u 30 sekundi." },
    { "@type": "HowToStep", position: 2, name: "Dodati jelovnik", text: "Drag-and-drop ili AI skeniranje — AI uvozi kategorije, jela i cijene." },
    { "@type": "HowToStep", position: 3, name: "Odabrati kanal", text: "Narudžbe na kuhinjski tablet, na WhatsApp restorana ili oba istovremeno." },
    { "@type": "HowToStep", position: 4, name: "Otisnuti QR", text: "Preuzmi QR (jedan po stolu ili jedan po restoranu) i zalijepi na stolove." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
