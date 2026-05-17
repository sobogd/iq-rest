import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /pl, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /pl page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menu QR dla restauracji",
    sub: "Ponad 500 restauracji w 30+ krajach zastępuje drukowane menu menu QR, więcej sprzedaje turystom i eliminuje prowizje dostaw. Gotowe w 5 minut — 14 dni za darmo.",
    dynamicHeadlines: [],
    headlinePrefix: "Menu QR dla ",
    accentWord: "restauracji",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Z żoną otworzyliśmy kawiarnię i przez tygodnie szukaliśmy menu QR dla restauracji z zamówieniami przy stoliku i rezerwacjami bez brzydkiego interfejsu —",
    quoteAccent: "więc sami stworzyliśmy menu QR, którego chcieliśmy.",
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
        q: "Czym jest menu QR dla restauracji?",
        a: "Menu QR dla restauracji to drukowany kod QR przy stoliku, który gość skanuje aparatem telefonu i otwiera kartę w przeglądarce — bez aplikacji. Z IQ Rest menu QR zawiera zamówienia przy stoliku, rezerwacje 24/7 i tłumaczenie AI na 35 języków, wszystko aktualizowane z telefonu.",
      },
      {
        q: "Ile kosztuje menu QR dla restauracji?",
        a: "6,90 €/mies, wszystko w cenie. Nielimitowane kody QR na każdy stolik, pełny edytor, bezpośrednie zamówienia bez prowizji, tłumaczenie AI na 35 języków, rezerwacje i analityka. 14 dni za darmo, bez karty.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menu QR dla restauracji.",
    headingAccent: "Gotowe w 5 minut.",
    sub: "14 dni za darmo. Bez karty. Ponad 500 restauracji już używa menu QR na IQ Rest.",
  },

  meta: {
    title: "Menu QR dla Restauracji — Gotowe w 5 Min | IQ Rest",
    description: "Menu QR dla restauracji: kod QR na każdym stoliku, bezpośrednie zamówienia bez prowizji, tłumaczenie AI na 35 języków. Gotowe w 5 minut, 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/lp/menu-qr-dla-restauracji",
    ogLocale: "pl_PL",
    ogTitle: "Menu QR dla Restauracji — Gotowe w 5 Minut",
    ogDescription: "Menu QR z bezpośrednimi zamówieniami, 35 językami AI i rezerwacjami. Gotowe w 5 minut — 14 dni za darmo.",
  },
};
