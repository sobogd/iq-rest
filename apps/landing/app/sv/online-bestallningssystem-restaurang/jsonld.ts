import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/sv/online-bestallningssystem-restaurang";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Online beställningssystem för restaurang", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "sv", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Så aktiverar du ett online beställningssystem för restaurang", description: "Aktivera direkta onlinebeställningar för restaurangen på 4 steg — ingen POS-hårdvara, ingen aggregator.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Skapa restaurang", text: "Registrering med e-post eller Google på 30 sekunder." },
    { "@type": "HowToStep", position: 2, name: "Lägg till meny", text: "Drag-and-drop eller AI-skanning — AI importerar kategorier, rätter och priser." },
    { "@type": "HowToStep", position: 3, name: "Välj kanal", text: "Beställningar på köksplatta, till restaurangens WhatsApp eller båda samtidigt." },
    { "@type": "HowToStep", position: 4, name: "Skriv ut QR", text: "Ladda ner QR (en per bord eller en per restaurang) och fäst på borden." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
