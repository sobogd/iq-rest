import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /bg, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /bg page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "От 6,90 €/мес · 14 дни безплатно · Откажи когато искаш",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Дигитално меню за ресторанти",
    sub: "500+ ресторанта в 30+ страни обслужват повече маси, продават повече на туристи и махат комисионите за доставка. Готово за 5 минути — 14 дни безплатно.",
    verticals: ["Онлайн поръчки", "Резервации", "AI превод", "Скенер на меню", "Алергени", "Премиум дизайн", "Анализи"],
    dynamicHeadlines: [],
    headlinePrefix: "Дигитално меню за ",
    accentWord: "ресторанти",
    accentWordRotation: ["ресторанти", "кафенета", "барове", "пицарии", "бистра", "кръчми"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Със съпругата ми отворихме кафене и седмици търсихме дигитално меню за ресторанти, което управлява и поръчки на масата и резервации, без да е тромаво или грозно —",
    quoteAccent: "така че построихме дигиталното меню, което сами искахме.",
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
        q: "Какво е дигитално меню за ресторанти?",
        a: "Дигитално меню за ресторанти е онлайн версията на хартиеното меню: гостът сканира QR код на масата с телефон и веднага вижда ястия, снимки, алергени и цени в браузъра — без приложение. С IQ Rest дигиталното меню включва и директни поръчки на масата, резервации 24/7 и AI превод на 35 езика — всичко се актуализира в реално време от телефона.",
      },
      {
        q: "Колко струва дигитално меню за ресторанти?",
        a: "6,90 €/месец, всичко включено (отстъпка за годишен план). Пълен редактор, неограничени QR кодове, директни поръчки без комисиона, AI превод на 35 езика, резервации и анализи. 14 дни безплатен пробен период, без карта.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Дигитално меню за ресторанти.",
    headingAccent: "Готово за 5 минути.",
    sub: "14 дни безплатно. Без карта. Присъединете се към 500+ ресторанти, които управляват дигиталното си меню в IQ Rest.",
  },

  meta: {
    title: "Дигитално Меню за Ресторанти — 5 Мин | IQ Rest",
    description: "Дигитално меню за ресторанти: QR код за печат, директни поръчки без комисиона, AI превод на 35 езика. 5 минути, 14 дни безплатно.",
    canonical: "https://iq-rest.com/bg/lp/digitalno-menyu-za-restoranti",
    ogLocale: "bg_BG",
    ogTitle: "Дигитално Меню за Ресторанти — За 5 Минути",
    ogDescription: "Дигитално меню за ресторанти с QR код, директни поръчки и 35 AI езика. Готово за 5 минути — 14 дни безплатно.",
  },
};
