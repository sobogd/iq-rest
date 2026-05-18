import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /da, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /da page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-menu til restauranter. Klar på 5 minutter.",
    sub: "QR-menu til din restaurant på 5 minutter. Alt inkluderet: mobil editor uden kode, AI menu-scanning, QR-koder til borde og direkte ordrer uden kommissioner.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Min kone og jeg åbnede en café og brugte uger på at lede efter en QR-menu til restauranter med bordbestilling og reservationer uden grim brugerflade —",
    quoteAccent: "så vi byggede selv den QR-menu, vi ville have.",
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
        q: "Hvad er en QR-menu til restauranter?",
        a: "En QR-menu til restauranter er den printbare QR-kode på bordet, som gæsten scanner med telefonens kamera for at åbne menukortet i browseren — uden app. Med IQ Rest indeholder QR-menuen bordbestillinger, reservationer 24/7 og AI-oversættelse til 35 sprog, alt opdateres fra mobilen.",
      },
      {
        q: "Hvad koster en QR-menu til restauranter?",
        a: "6,90 €/måned, alt inkluderet. Ubegrænsede QR-koder til hvert bord, fuld editor, direkte bestillinger uden provision, AI-oversættelse til 35 sprog, reservationer og analytics. 14 dage gratis, intet kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-menu til restauranter.",
    headingAccent: "Klar på 5 minutter.",
    sub: "14 dage gratis. Intet kort. Over 500 restauranter bruger allerede QR-menu på IQ Rest.",
  },

  meta: {
    title: "QR-menu til Restauranter — Klar på 5 Min | IQ Rest",
    description: "QR-menu til restauranter: QR-kode ved hvert bord, direkte bestillinger uden provision, AI-oversættelse til 35 sprog. Klar på 5 minutter, 14 dage gratis.",
    canonical: "https://iq-rest.com/da/lp/qr-menu-til-restauranter",
    ogLocale: "da_DK",
    ogTitle: "QR-menu til Restauranter — Klar på 5 Minutter",
    ogDescription: "QR-menu med direkte bestillinger, 35 AI-sprog og reservationer. Klar på 5 minutter — 14 dage gratis.",
  },
};
