import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ru, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /ru page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "От 6,90 €/мес · 14 дней бесплатно · Отмена в любой момент",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Цифровое меню для ресторанов. Готово за 5 минут.",
    sub: "Цифровое меню для твоего ресторана за 5 минут. Всё включено: мобильный редактор без кода, AI-сканирование меню, QR-коды для столов и прямые заказы без комиссий.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Мы с женой открыли кафе и неделями искали цифровое меню для ресторанов, которое также принимает заказы со стола и бронирования, не будучи громоздким или уродливым —",
    quoteAccent: "поэтому построили цифровое меню, которое хотели сами.",
  },

  footer: {
    ...DEFAULT.footer,
    featureLinks: [],
    navLinks: [],
  },

  faq: {
    ...DEFAULT.faq,
    items: [
      {
        q: "Что такое цифровое меню для ресторанов?",
        a: "Цифровое меню для ресторанов — это онлайн-версия бумажной карты: гость сканирует QR-код за столом телефоном и сразу видит блюда, фото, аллергены и цены в браузере — без приложения. С IQ Rest цифровое меню включает также прямой заказ со стола, бронирования 24/7 и AI-перевод на 35 языков — всё обновляется с телефона в реальном времени.",
      },
      {
        q: "Сколько стоит цифровое меню для ресторанов?",
        a: "6,90 €/месяц, всё включено (скидка на годовой план). Полный редактор, безлимитные QR-коды, прямые заказы без комиссии, AI-перевод на 35 языков, бронирования и аналитика. 14 дней пробного периода, без карты.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Цифровое меню для ресторанов.",
    headingAccent: "Готово за 5 минут.",
    sub: "14 дней бесплатно. Без карты. Присоединяйся к 500+ ресторанам, ведущим цифровое меню на IQ Rest.",
  },

  meta: {
    title: "Цифровое Меню для Ресторанов — Готово за 5 Мин | IQ Rest",
    description: "Цифровое меню для ресторанов: печатный QR-код, прямые заказы без комиссий, AI-перевод на 35 языков. 5 минут, 14 дней бесплатно.",
    canonical: "https://iq-rest.com/ru/lp/tsifrovoe-menyu-dlya-restoranov",
    ogLocale: "ru_RU",
    ogTitle: "Цифровое Меню для Ресторанов — Готово за 5 Минут",
    ogDescription: "Цифровое меню для ресторанов с QR-кодом, прямыми заказами и 35 AI-языками. Запуск за 5 минут — 14 дней бесплатно.",
  },
};
