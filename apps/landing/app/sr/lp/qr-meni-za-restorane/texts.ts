import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sr, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /sr page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR meni za restorane. Spreman za 5 minuta.",
    sub: "QR meni za vaš restoran za 5 minuta. Sve uključeno: mobilni uređivač bez koda, AI skeniranje menija, QR kodovi za stolove i direktne porudžbine bez provizija.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Sa ženom sam otvorio kafić i nedeljama tražio QR meni za restorane sa porudžbinama za stolom i rezervacijama bez ružnog dizajna —",
    quoteAccent: "pa smo QR meni napravili sami.",
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
        q: "Šta je QR meni za restorane?",
        a: "QR meni za restorane je štampani QR kod na stolu koji gost skenira kamerom telefona da otvori meni u pregledaču — bez aplikacije. Sa IQ Rest QR meni uključuje porudžbine za stolom, rezervacije 24/7 i AI prevod na 35 jezika, sve ažurirano sa telefona.",
      },
      {
        q: "Koliko košta QR meni za restorane?",
        a: "6,90 €/mesec, sve uključeno. Neograničeni QR kodovi za svaki sto, kompletan editor, direktne porudžbine bez provizije, AI prevod na 35 jezika, rezervacije i analitika. 14 dana besplatno, bez kartice.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR meni za restorane.",
    headingAccent: "Spreman za 5 minuta.",
    sub: "14 dana besplatno. Bez kartice. Više od 500 restorana koristi QR meni na IQ Rest.",
  },

  meta: {
    title: "QR Meni za Restorane — Spreman za 5 Min | IQ Rest",
    description: "QR meni za restorane: QR kod na svakom stolu, direktne porudžbine bez provizije, AI prevod na 35 jezika. Spreman za 5 minuta, 14 dana besplatno.",
    canonical: "https://iq-rest.com/sr/lp/qr-meni-za-restorane",
    ogLocale: "sr_RS",
    ogTitle: "QR Meni za Restorane — Spreman za 5 Minuta",
    ogDescription: "QR meni sa direktnim porudžbinama, 35 AI jezika i rezervacijama. Spreman za 5 minuta — 14 dana besplatno.",
  },
};
