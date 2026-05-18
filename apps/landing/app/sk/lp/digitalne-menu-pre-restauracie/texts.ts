import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sk, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /sk page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Od 6,90 €/mes · 14 dní zadarmo · Zruš kedykoľvek",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitálne menu pre reštaurácie. Hotové za 5 minút.",
    sub: "Digitálne menu pre vašu reštauráciu za 5 minút. Všetko v cene: mobilný editor bez kódu, AI skenovanie menu, QR kódy pre stoly a priame objednávky bez provízií.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "S manželkou sme otvorili kaviareň a týždne sme hľadali digitálne menu pre reštaurácie, ktoré zvláda aj objednávky pri stole a rezervácie bez toho, aby bolo neohrabané alebo škaredé —",
    quoteAccent: "tak sme postavili digitálne menu, aké sme sami chceli.",
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
        q: "Čo je digitálne menu pre reštaurácie?",
        a: "Digitálne menu pre reštaurácie je online verzia papierového jedálneho lístka: hosť naskenuje QR kód pri stole telefónom a hneď vidí jedlá, fotky, alergény a ceny v prehliadači — bez aplikácie. S IQ Rest digitálne menu obsahuje aj priame objednávky pri stole, rezervácie 24/7 a AI preklad do 35 jazykov — všetko sa aktualizuje v reálnom čase z telefónu.",
      },
      {
        q: "Koľko stojí digitálne menu pre reštaurácie?",
        a: "6,90 €/mesiac, všetko v cene (zľava na ročný plán). Plný editor, neobmedzené QR kódy, priame objednávky bez provízie, AI preklad do 35 jazykov, rezervácie a analytika. 14 dní zadarmo na skúšku, bez karty.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitálne menu pre reštaurácie.",
    headingAccent: "Hotové za 5 minút.",
    sub: "14 dní zadarmo. Bez karty. Pridaj sa k 500+ reštauráciám, ktoré prevádzkujú digitálne menu na IQ Rest.",
  },

  meta: {
    title: "Digitálne Menu pre Reštaurácie — 5 Min | IQ Rest",
    description: "Digitálne menu pre reštaurácie: tlačiteľný QR kód, priame objednávky bez provízie, AI preklad do 35 jazykov. 5 min, 14 dní zadarmo.",
    canonical: "https://iq-rest.com/sk/lp/digitalne-menu-pre-restauracie",
    ogLocale: "sk_SK",
    ogTitle: "Digitálne Menu pre Reštaurácie — Za 5 Minút",
    ogDescription: "Digitálne menu pre reštaurácie s QR kódom, priamymi objednávkami a 35 AI jazykmi. Spustené za 5 minút — 14 dní zadarmo.",
  },
};
