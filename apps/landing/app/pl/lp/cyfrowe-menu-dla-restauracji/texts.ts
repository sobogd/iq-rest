import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /pl, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /pl page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Od 6,90 €/mies · 14 dni za darmo · Anuluj kiedy chcesz",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Cyfrowe menu dla restauracji. Gotowe w 5 minut.",
    sub: "Cyfrowe menu dla Twojej restauracji w 5 minut. Wszystko w cenie: mobilny edytor bez kodu, skanowanie menu AI, kody QR dla stolików i bezpośrednie zamówienia bez prowizji.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Z żoną otworzyliśmy kawiarnię i tygodniami szukaliśmy cyfrowego menu dla restauracji, które obsługuje także zamówienia przy stoliku i rezerwacje, bez bycia ciężkim ani brzydkim —",
    quoteAccent: "więc zbudowaliśmy cyfrowe menu, którego sami chcieliśmy.",
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
        q: "Co to jest cyfrowe menu dla restauracji?",
        a: "Cyfrowe menu dla restauracji to wersja online papierowej karty: gość skanuje kod QR przy stoliku telefonem i widzi dania, zdjęcia, alergeny i ceny w przeglądarce — bez aplikacji. Z IQ Rest cyfrowe menu obejmuje także bezpośrednie zamawianie przy stoliku, rezerwacje 24/7 i tłumaczenie AI w 35 językach — wszystko aktualizujesz z telefonu w czasie rzeczywistym.",
      },
      {
        q: "Ile kosztuje cyfrowe menu dla restauracji?",
        a: "6,90 €/miesiąc, wszystko w cenie (zniżka na plan roczny). Pełny edytor, nieograniczone kody QR, bezpośrednie zamawianie bez prowizji, tłumaczenie AI w 35 językach, rezerwacje i analityka. 14 dni próby za darmo, bez karty.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Cyfrowe menu dla restauracji.",
    headingAccent: "Gotowe w 5 minut.",
    sub: "14 dni za darmo. Bez karty. Dołącz do 500+ restauracji, które prowadzą cyfrowe menu w IQ Rest.",
  },

  meta: {
    title: "Cyfrowe Menu dla Restauracji — Gotowe w 5 Min | IQ Rest",
    description: "Cyfrowe menu dla restauracji: kod QR do druku, zamówienia bez prowizji, tłumaczenie AI w 35 językach. 5 minut, 14 dni za darmo.",
    canonical: "https://iq-rest.com/pl/lp/cyfrowe-menu-dla-restauracji",
    ogLocale: "pl_PL",
    ogTitle: "Cyfrowe Menu dla Restauracji — Gotowe w 5 Minut",
    ogDescription: "Cyfrowe menu dla restauracji z kodem QR, bezpośrednimi zamówieniami i 35 językami AI. Online w 5 minut — 14 dni za darmo.",
  },
};
