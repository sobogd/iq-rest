import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/ru/sistema-onlayn-zakazov-restorana";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = {
    "@type": "SoftwareApplication",
    name: "IQ Rest — Система онлайн-заказов для ресторана",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    url: URL_SELF,
    inLanguage: "ru",
    offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF },
  };
  const faqPage = {
    "@type": "FAQPage",
    mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };
  const howTo = {
    "@type": "HowTo",
    name: "Как включить систему онлайн-заказов для ресторана",
    description: "Включите прямые онлайн-заказы для ресторана за 4 шага — без POS-железа, без агрегатора.",
    totalTime: "PT5M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Создать ресторан", text: "Регистрация email или Google за 30 секунд." },
      { "@type": "HowToStep", position: 2, name: "Добавить меню", text: "Drag-and-drop или AI-сканирование — AI импортирует категории, блюда и цены." },
      { "@type": "HowToStep", position: 3, name: "Выбрать канал", text: "Заказы на планшет кухни, в WhatsApp ресторана или оба сразу." },
      { "@type": "HowToStep", position: 4, name: "Распечатать QR", text: "Скачайте QR (один на стол или один на ресторан) и наклейте на столы." },
    ],
  };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
