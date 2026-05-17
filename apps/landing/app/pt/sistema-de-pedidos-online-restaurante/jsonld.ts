import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/pt/sistema-de-pedidos-online-restaurante";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Sistema de Pedidos Online para Restaurante",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "pt",
    offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF },
  };
  const faqPage = {
    "@type": "FAQPage",
    mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const howTo = {
    "@type": "HowTo",
    name: "Como ativar um sistema de pedidos online para restaurante",
    description: "Ativa pedidos online diretos para o teu restaurante em 4 passos — sem hardware POS, sem agregador.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Cria o restaurante", text: "Registo com email ou Google em 30 segundos." },
      { "@type": "HowToStep", position: 2, name: "Adiciona o menu", text: "Drag-and-drop ou scan IA de menu em papel — IA importa categorias, pratos e preços." },
      { "@type": "HowToStep", position: 3, name: "Escolhe o canal", text: "Envia pedidos para o tablet de cozinha, WhatsApp do local ou ambos." },
      { "@type": "HowToStep", position: 4, name: "Imprime os QR", text: "Descarrega o QR (um por mesa ou um para o local) e cola nas mesas." },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
