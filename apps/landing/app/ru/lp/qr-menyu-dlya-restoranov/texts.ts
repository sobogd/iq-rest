import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ru, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /ru page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-меню для ресторанов",
    sub: "Более 500 ресторанов в 30+ странах заменили бумажное меню на QR-меню, больше продают туристам и убрали комиссии доставок. Готово за 5 минут — 14 дней бесплатно.",
    dynamicHeadlines: [],
    headlinePrefix: "QR-меню для ",
    accentWord: "ресторанов",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Мы с женой открыли кафе и долго искали QR-меню для ресторанов с заказами за столом и бронями без уродливого интерфейса —",
    quoteAccent: "поэтому сделали QR-меню сами.",
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
        q: "Что такое QR-меню для ресторанов?",
        a: "QR-меню для ресторанов — это QR-код на столе, который гость сканирует камерой телефона и открывает меню в браузере — без приложения. В IQ Rest QR-меню включает заказы за столом, брони 24/7 и AI-перевод на 35 языков, всё обновляется со смартфона.",
      },
      {
        q: "Сколько стоит QR-меню для ресторанов?",
        a: "6,90 €/мес, всё включено. Безлимит QR-кодов на каждый стол, полный редактор, прямые заказы без комиссии, AI-перевод на 35 языков, брони и аналитика. 14 дней бесплатно, без карты.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-меню для ресторанов.",
    headingAccent: "Готово за 5 минут.",
    sub: "14 дней бесплатно. Без карты. 500+ ресторанов уже используют QR-меню в IQ Rest.",
  },

  meta: {
    title: "QR-меню для Ресторанов — За 5 Мин | IQ Rest",
    description: "QR-меню для ресторанов: QR-код на каждом столе, прямые заказы без комиссии, AI-перевод на 35 языков. Готово за 5 минут, 14 дней бесплатно.",
    canonical: "https://iq-rest.com/ru/lp/qr-menyu-dlya-restoranov",
    ogLocale: "ru_RU",
    ogTitle: "QR-меню для Ресторанов — Готово за 5 Минут",
    ogDescription: "QR-меню с прямыми заказами, 35 языков AI и бронями. Готово за 5 минут — 14 дней бесплатно.",
  },
};
