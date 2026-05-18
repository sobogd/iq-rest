import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /bg, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /bg page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR меню за ресторанти. Готово за 5 минути.",
    sub: "QR меню за вашия ресторант за 5 минути. Всичко включено: мобилен редактор без код, AI сканиране на менюто, QR кодове за маси и директни поръчки без комисиони.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Със съпругата ми отворихме кафене и седмици търсихме QR меню за ресторанти с поръчки на масата и резервации без грозен интерфейс —",
    quoteAccent: "затова направихме QR менюто сами.",
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
        q: "Какво е QR меню за ресторанти?",
        a: "QR меню за ресторанти е принтиращ се QR код на масата, който гостът сканира с камерата на телефона и отваря менюто в браузъра — без приложение. С IQ Rest QR менюто включва поръчки на масата, резервации 24/7 и AI превод на 35 езика, всичко се обновява от телефона.",
      },
      {
        q: "Колко струва QR меню за ресторанти?",
        a: "6,90 €/месец, всичко включено. Неограничени QR кодове за всяка маса, пълен редактор, директни поръчки без комисиона, AI превод на 35 езика, резервации и анализи. 14 дни безплатно, без карта.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR меню за ресторанти.",
    headingAccent: "Готово за 5 минути.",
    sub: "14 дни безплатно. Без карта. 500+ ресторанта вече използват QR меню в IQ Rest.",
  },

  meta: {
    title: "QR Меню за Ресторанти — Готово за 5 Мин | IQ Rest",
    description: "QR меню за ресторанти: QR код на всяка маса, директни поръчки без комисиона, AI превод на 35 езика. Готово за 5 минути, 14 дни безплатно.",
    canonical: "https://iq-rest.com/bg/lp/qr-menyu-za-restoranti",
    ogLocale: "bg_BG",
    ogTitle: "QR Меню за Ресторанти — Готово за 5 Минути",
    ogDescription: "QR меню с директни поръчки, 35 езика AI и резервации. Готово за 5 минути — 14 дни безплатно.",
  },
};
