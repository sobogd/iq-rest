import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/no/online-bestillingssystem-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online bestillingssystem for restaurant", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "no", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Slik slår du på et online bestillingssystem for restaurant", description: "Aktiver direkte online-bestillinger for restauranten på 4 steg — uten POS-maskinvare, uten aggregator.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Opprett restaurant", text: "Registrering med e-post eller Google på 30 sekunder." },
    { "@type": "HowToStep", position: 2, name: "Legg til meny", text: "Drag-and-drop eller AI-skanning — AI importerer kategorier, retter og priser." },
    { "@type": "HowToStep", position: 3, name: "Velg kanal", text: "Bestillinger på kjøkkennettbrett, i restaurantens WhatsApp eller begge samtidig." },
    { "@type": "HowToStep", position: 4, name: "Skriv ut QR", text: "Last ned QR (én per bord eller én per restaurant) og fest på bordene." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
