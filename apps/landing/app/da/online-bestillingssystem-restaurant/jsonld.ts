import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/da/online-bestillingssystem-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online bestillingssystem til restaurant", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "da", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Sådan tænder du for et online bestillingssystem til restaurant", description: "Aktivér direkte online bestillinger for restauranten på 4 trin — ingen POS-hardware, ingen aggregator.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Opret restauranten", text: "Tilmelding med e-mail eller Google på 30 sekunder." },
    { "@type": "HowToStep", position: 2, name: "Tilføj menu", text: "Drag-and-drop eller AI-scan — AI importerer kategorier, retter og priser." },
    { "@type": "HowToStep", position: 3, name: "Vælg kanal", text: "Bestillinger på køkkentablet, i restaurantens WhatsApp eller begge samtidig." },
    { "@type": "HowToStep", position: 4, name: "Print QR", text: "Download QR (én pr. bord eller én pr. restaurant) og sæt den på bordene." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
