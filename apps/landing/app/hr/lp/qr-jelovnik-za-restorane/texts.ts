import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /hr, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /hr page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR jelovnik za restorane",
    sub: "Više od 500 restorana u 30+ zemalja zamjenjuje tiskani jelovnik QR jelovnikom, više prodaje turistima i ukida provizije dostave. Spreman za 5 minuta — 14 dana besplatno.",
    dynamicHeadlines: [],
    headlinePrefix: "QR jelovnik za ",
    accentWord: "restorane",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Sa ženom sam otvorio kafić i tjednima tražio QR jelovnik za restorane s narudžbama za stolom i rezervacijama bez ružnog sučelja —",
    quoteAccent: "pa smo sami napravili QR jelovnik kakav smo željeli.",
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
        q: "Što je QR jelovnik za restorane?",
        a: "QR jelovnik za restorane je printabilan QR kod na stolu koji gost skenira kamerom mobitela kako bi otvorio jelovnik u pregledniku — bez aplikacije. S IQ Rest QR jelovnik uključuje narudžbe za stolom, rezervacije 24/7 i AI prijevod na 35 jezika, sve ažurirano s mobitela.",
      },
      {
        q: "Koliko košta QR jelovnik za restorane?",
        a: "6,90 €/mjesec, sve uključeno. Neograničeni QR kodovi za svaki stol, potpuni urednik, direktne narudžbe bez provizije, AI prijevod na 35 jezika, rezervacije i analitika. 14 dana besplatno, bez kartice.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR jelovnik za restorane.",
    headingAccent: "Spreman za 5 minuta.",
    sub: "14 dana besplatno. Bez kartice. Više od 500 restorana koristi QR jelovnik na IQ Rest.",
  },

  meta: {
    title: "QR Jelovnik za Restorane — Spreman za 5 Min | IQ Rest",
    description: "QR jelovnik za restorane: QR kod na svakom stolu, direktne narudžbe bez provizije, AI prijevod na 35 jezika. Spreman za 5 minuta, 14 dana besplatno.",
    canonical: "https://iq-rest.com/hr/lp/qr-jelovnik-za-restorane",
    ogLocale: "hr_HR",
    ogTitle: "QR Jelovnik za Restorane — Spreman za 5 Minuta",
    ogDescription: "QR jelovnik s direktnim narudžbama, 35 AI jezika i rezervacijama. Spreman za 5 minuta — 14 dana besplatno.",
  },
};
