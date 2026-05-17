import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ca/sistema-de-comandes-online-restaurant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Sistema de comandes online per a restaurant", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "ca", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Com activar un sistema de comandes online per a restaurant", description: "Activa comandes online directes per al restaurant en 4 passos — sense maquinari TPV, sense agregador.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Crear el restaurant", text: "Registre amb email o Google en 30 segons." },
    { "@type": "HowToStep", position: 2, name: "Afegir la carta", text: "Drag-and-drop o escaneig IA — la IA importa categories, plats i preus." },
    { "@type": "HowToStep", position: 3, name: "Triar canal", text: "Comandes a la tauleta de cuina, al WhatsApp del restaurant o tots dos alhora." },
    { "@type": "HowToStep", position: 4, name: "Imprimir el QR", text: "Descarrega el QR (un per taula o un per restaurant) i enganxa'l a les taules." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
