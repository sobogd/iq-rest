import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /uk, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /uk page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-меню для ресторанів",
    sub: "Понад 500 ресторанів у 30+ країнах замінили паперове меню QR-меню, більше продають туристам і скасували комісії доставок. Готово за 5 хвилин — 14 днів безкоштовно.",
    dynamicHeadlines: [],
    headlinePrefix: "QR-меню для ",
    accentWord: "ресторанів",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Ми з дружиною відкрили кафе й кілька тижнів шукали QR-меню для ресторанів із замовленнями за столом та бронюваннями без потворного інтерфейсу —",
    quoteAccent: "тож зробили QR-меню самі.",
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
        q: "Що таке QR-меню для ресторанів?",
        a: "QR-меню для ресторанів — це QR-код на столі, який гість сканує камерою телефону, щоб відкрити меню в браузері — без застосунку. У IQ Rest QR-меню включає замовлення за столом, бронювання 24/7 та AI-переклад на 35 мов, усе оновлюється зі смартфону.",
      },
      {
        q: "Скільки коштує QR-меню для ресторанів?",
        a: "6,90 €/міс, усе включено. Безлімітні QR-коди на кожен стіл, повний редактор, прямі замовлення без комісії, AI-переклад на 35 мов, бронювання та аналітика. 14 днів безкоштовно, без картки.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-меню для ресторанів.",
    headingAccent: "Готово за 5 хвилин.",
    sub: "14 днів безкоштовно. Без картки. 500+ ресторанів уже користуються QR-меню в IQ Rest.",
  },

  meta: {
    title: "QR-меню для Ресторанів — За 5 Хв | IQ Rest",
    description: "QR-меню для ресторанів: QR-код на кожному столі, прямі замовлення без комісії, AI-переклад на 35 мов. Готово за 5 хвилин, 14 днів безкоштовно.",
    canonical: "https://iq-rest.com/uk/lp/qr-menyu-dlya-restoraniv",
    ogLocale: "uk_UA",
    ogTitle: "QR-меню для Ресторанів — Готово за 5 Хвилин",
    ogDescription: "QR-меню з прямими замовленнями, 35 мов AI та бронюваннями. Готово за 5 хвилин — 14 днів безкоштовно.",
  },
};
