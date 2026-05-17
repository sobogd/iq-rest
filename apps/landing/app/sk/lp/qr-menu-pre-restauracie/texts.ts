import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sk, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /sk page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR menu pre reštaurácie",
    sub: "Viac ako 500 reštaurácií v 30+ krajinách nahrádza tlačené menu QR menu, predáva viac turistom a ruší provízie za rozvoz. Hotovo za 5 minút — 14 dní zadarmo.",
    dynamicHeadlines: [],
    headlinePrefix: "QR menu pre ",
    accentWord: "reštaurácie",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "S manželkou sme otvorili kaviareň a týždne sme hľadali QR menu pre reštaurácie s objednávkami pri stole a rezerváciami bez škaredého rozhrania —",
    quoteAccent: "tak sme si QR menu vyrobili sami.",
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
        q: "Čo je QR menu pre reštaurácie?",
        a: "QR menu pre reštaurácie je tlačiteľný QR kód pri stole, ktorý hosť naskenuje kamerou telefónu a otvorí jedálny lístok v prehliadači — bez aplikácie. S IQ Rest QR menu obsahuje objednávky pri stole, rezervácie 24/7 a AI preklad do 35 jazykov, všetko aktualizované z mobilu.",
      },
      {
        q: "Koľko stojí QR menu pre reštaurácie?",
        a: "6,90 €/mesiac, všetko v cene. Neobmedzené QR kódy pre každý stôl, kompletný editor, priame objednávky bez provízie, AI preklad do 35 jazykov, rezervácie a analytika. 14 dní zadarmo, bez karty.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR menu pre reštaurácie.",
    headingAccent: "Hotovo za 5 minút.",
    sub: "14 dní zadarmo. Bez karty. Viac ako 500 reštaurácií používa QR menu na IQ Rest.",
  },

  meta: {
    title: "QR Menu pre Reštaurácie — Hotovo za 5 Min | IQ Rest",
    description: "QR menu pre reštaurácie: QR kód pri každom stole, priame objednávky bez provízie, AI preklad do 35 jazykov. Hotovo za 5 minút, 14 dní zadarmo.",
    canonical: "https://iq-rest.com/sk/lp/qr-menu-pre-restauracie",
    ogLocale: "sk_SK",
    ogTitle: "QR Menu pre Reštaurácie — Hotovo za 5 Minút",
    ogDescription: "QR menu s priamymi objednávkami, 35 AI jazykmi a rezerváciami. Hotovo za 5 minút — 14 dní zadarmo.",
  },
};
