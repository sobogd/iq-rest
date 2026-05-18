import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /hr, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /hr page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Od 6,90 €/mj · 14 dana besplatno · Otkazi kad želiš",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitalni jelovnik za restorane. Spreman za 5 minuta.",
    sub: "Digitalni jelovnik za vaš restoran za 5 minuta. Sve uključeno: mobilni uređivač bez koda, AI skeniranje jelovnika, QR kodovi za stolove i izravne narudžbe bez provizija.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Supruga i ja otvorili smo kafić i tjednima tražili digitalni jelovnik za restorane koji obrađuje i narudžbe za stolom i rezervacije, a da nije nezgrapan ili ružan —",
    quoteAccent: "pa smo izgradili digitalni jelovnik kakav smo sami htjeli.",
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
        q: "Što je digitalni jelovnik za restorane?",
        a: "Digitalni jelovnik za restorane je online verzija papirnatog jelovnika: gost skenira QR kod za stolom mobitelom i odmah vidi jela, fotografije, alergene i cijene u pregledniku — bez aplikacije. S IQ Restom digitalni jelovnik uključuje i izravne narudžbe za stolom, rezervacije 24/7 i AI prijevod na 35 jezika — sve se ažurira u stvarnom vremenu s mobitela.",
      },
      {
        q: "Koliko košta digitalni jelovnik za restorane?",
        a: "6,90 €/mjesec, sve uključeno (popust na godišnji plan). Potpuni urednik, neograničeni QR kodovi, izravne narudžbe bez provizije, AI prijevod na 35 jezika, rezervacije i analitika. 14 dana besplatnog probnog razdoblja, bez kartice.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitalni jelovnik za restorane.",
    headingAccent: "Gotovo za 5 minuta.",
    sub: "14 dana besplatno. Bez kartice. Pridruži se 500+ restoranima koji vode digitalni jelovnik na IQ Restu.",
  },

  meta: {
    title: "Digitalni Jelovnik za Restorane — 5 Min | IQ Rest",
    description: "Digitalni jelovnik za restorane: ispisivi QR kod, izravne narudžbe bez provizije, AI prijevod na 35 jezika. 5 minuta, 14 dana besplatno.",
    canonical: "https://iq-rest.com/hr/lp/digitalni-jelovnik-za-restorane",
    ogLocale: "hr_HR",
    ogTitle: "Digitalni Jelovnik za Restorane — Za 5 Minuta",
    ogDescription: "Digitalni jelovnik za restorane s QR kodom, izravnim narudžbama i 35 AI jezika. Uživo za 5 minuta — 14 dana besplatno.",
  },
};
