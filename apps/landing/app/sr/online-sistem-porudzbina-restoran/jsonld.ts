import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/sr/online-sistem-porudzbina-restoran";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online sistem porudžbina za restoran", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "sr", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Kako uključiti online sistem porudžbina za restoran", description: "Aktivirajte direktne online porudžbine za restoran u 4 koraka — bez POS hardvera, bez agregatora.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Napraviti restoran", text: "Registracija emailom ili Google u 30 sekundi." },
    { "@type": "HowToStep", position: 2, name: "Dodati meni", text: "Drag-and-drop ili AI skeniranje — AI uvozi kategorije, jela i cene." },
    { "@type": "HowToStep", position: 3, name: "Izabrati kanal", text: "Porudžbine na kuhinjski tablet, na WhatsApp restorana ili oba istovremeno." },
    { "@type": "HowToStep", position: 4, name: "Odštampati QR", text: "Preuzmi QR (jedan po stolu ili jedan po restoranu) i zalepi na stolove." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
