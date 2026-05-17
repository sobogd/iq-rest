import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /uk, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /uk page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Від 6,90 €/міс · 14 днів безкоштовно · Скасуй будь-коли",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Цифрове меню для ресторанів",
    sub: "500+ ресторанів у 30+ країнах обслуговують більше столів, продають більше туристам і прибирають комісії доставки. Запуск за 5 хвилин — 14 днів безкоштовно.",
    verticals: ["Онлайн-замовлення", "Бронювання", "AI-переклад", "Сканер меню", "Алергени", "Преміум-дизайн", "Аналітика"],
    dynamicHeadlines: [],
    headlinePrefix: "Цифрове меню для ",
    accentWord: "ресторанів",
    accentWordRotation: ["ресторанів", "кав'ярень", "барів", "піцерій", "бістро", "пабів"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Ми з дружиною відкрили кав'ярню і тижнями шукали цифрове меню для ресторанів, що також приймає замовлення зі столу і бронювання, без громіздкості й потворності —",
    quoteAccent: "тож побудували цифрове меню, яке хотіли самі.",
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
        q: "Що таке цифрове меню для ресторанів?",
        a: "Цифрове меню для ресторанів — це онлайн-версія паперової картки: гість сканує QR-код за столом телефоном і одразу бачить страви, фото, алергени й ціни в браузері — без застосунку. З IQ Rest цифрове меню включає також пряме замовлення зі столу, бронювання 24/7 та AI-переклад на 35 мов — все оновлюється з телефону в реальному часі.",
      },
      {
        q: "Скільки коштує цифрове меню для ресторанів?",
        a: "6,90 €/місяць, все включено (знижка на річний план). Повний редактор, безлімітні QR-коди, прямі замовлення без комісії, AI-переклад на 35 мов, бронювання й аналітика. 14 днів пробного періоду, без картки.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Цифрове меню для ресторанів.",
    headingAccent: "Готово за 5 хвилин.",
    sub: "14 днів безкоштовно. Без картки. Приєднуйся до 500+ ресторанів, що ведуть цифрове меню на IQ Rest.",
  },

  meta: {
    title: "Цифрове Меню для Ресторанів — Готово за 5 Хв | IQ Rest",
    description: "Цифрове меню для ресторанів: друкований QR-код, прямі замовлення без комісій, AI-переклад на 35 мов. 5 хвилин, 14 днів безкоштовно.",
    canonical: "https://iq-rest.com/uk/lp/tsyfrove-menyu-dlya-restoraniv",
    ogLocale: "uk_UA",
    ogTitle: "Цифрове Меню для Ресторанів — Готово за 5 Хвилин",
    ogDescription: "Цифрове меню для ресторанів з QR-кодом, прямими замовленнями й 35 AI-мовами. Запуск за 5 хвилин — 14 днів безкоштовно.",
  },
};
