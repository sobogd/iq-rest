import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS } from "./texts";

const URL_SELF = "https://iq-rest.com/bg/sistema-za-onlayn-porachki-restorant";

export function buildJsonLd(texts: LandingTexts) {
  const softwareApp = { "@type": "SoftwareApplication", name: "IQ Rest — Система за онлайн поръчки за ресторант", applicationCategory: "BusinessApplication", operatingSystem: "Web, iOS, Android", url: URL_SELF, inLanguage: "bg", offers: { "@type": "Offer", price: "6.90", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: URL_SELF } };
  const faqPage = { "@type": "FAQPage", mainEntity: texts.faq.items.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  const howTo = { "@type": "HowTo", name: "Как да активирате система за онлайн поръчки за ресторант", description: "Активирайте директни онлайн поръчки за ресторант за 4 стъпки — без POS хардуер, без агрегатор.", totalTime: "PT5M", estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" }, step: [
    { "@type": "HowToStep", position: 1, name: "Създайте ресторант", text: "Регистрация с email или Google за 30 секунди." },
    { "@type": "HowToStep", position: 2, name: "Добавете меню", text: "Drag-and-drop или AI сканиране — AI импортира категории, ястия и цени." },
    { "@type": "HowToStep", position: 3, name: "Изберете канал", text: "Поръчките на кухненския таблет, в WhatsApp на ресторанта или двата заедно." },
    { "@type": "HowToStep", position: 4, name: "Отпечатайте QR", text: "Изтеглете QR (един на маса или един на ресторант) и залепете на масите." },
  ] };
  return { "@context": "https://schema.org", "@graph": [softwareApp, faqPage, howTo] };
}

export const JSON_LD_HTML = JSON.stringify(buildJsonLd(TEXTS)).replace(/</g, "\\u003c");
