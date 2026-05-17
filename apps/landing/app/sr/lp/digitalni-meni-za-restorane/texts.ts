import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sr, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /sr page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Od 6,90 €/mes · 14 dana besplatno · Otkaži kad god želiš",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitalni meni za restorane",
    sub: "500+ restorana u 30+ zemalja opslužuje više stolova, prodaje više turistima i ukida provizije za dostavu. Uživo za 5 minuta — 14 dana besplatno.",
    verticals: ["Online porudžbine", "Rezervacije", "AI prevod", "Skener menija", "Alergeni", "Premium dizajn", "Analitika"],
    dynamicHeadlines: [],
    headlinePrefix: "Digitalni meni za ",
    accentWord: "restorane",
    accentWordRotation: ["restorane", "kafiće", "barove", "picerije", "bistroe", "kafane"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Žena i ja smo otvorili kafić i nedeljama tražili digitalni meni za restorane koji obrađuje i porudžbine za stolom i rezervacije, a da nije nezgrapan ni ružan —",
    quoteAccent: "zato smo izgradili digitalni meni kakav smo sami želeli.",
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
        q: "Šta je digitalni meni za restorane?",
        a: "Digitalni meni za restorane je online verzija papirnog menija: gost mobilnim telefonom skenira QR kod za stolom i odmah u pretraživaču vidi jela, fotografije, alergene i cene — bez aplikacije. Sa IQ Rest digitalni meni uključuje i direktne porudžbine za stolom, rezervacije 24/7 i AI prevod na 35 jezika — sve se ažurira u realnom vremenu sa telefona.",
      },
      {
        q: "Koliko košta digitalni meni za restorane?",
        a: "6,90 €/mesec, sve uključeno (popust za godišnji plan). Potpuni urednik, neograničeni QR kodovi, direktne porudžbine bez provizije, AI prevod na 35 jezika, rezervacije i analitika. 14 dana besplatnog probnog perioda, bez kartice.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitalni meni za restorane.",
    headingAccent: "Spremno za 5 minuta.",
    sub: "14 dana besplatno. Bez kartice. Pridruži se 500+ restorana koji digitalni meni vode na IQ Rest.",
  },

  meta: {
    title: "Digitalni Meni za Restorane — 5 Min | IQ Rest",
    description: "Digitalni meni za restorane: štampani QR kod, direktne porudžbine bez provizije, AI prevod na 35 jezika. 5 min, 14 dana besplatno.",
    canonical: "https://iq-rest.com/sr/lp/digitalni-meni-za-restorane",
    ogLocale: "sr_RS",
    ogTitle: "Digitalni Meni za Restorane — Za 5 Minuta",
    ogDescription: "Digitalni meni za restorane sa QR kodom, direktnim porudžbinama i 35 AI jezika. Uživo za 5 minuta — 14 dana besplatno.",
  },
};
