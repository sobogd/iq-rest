import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sv, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /sv page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-meny för restauranger",
    sub: "Över 500 restauranger i 30+ länder ersätter den tryckta menyn med en QR-meny, säljer mer till turister och tar bort leveransprovisioner. Klar på 5 minuter — 14 dagar gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "QR-meny för ",
    accentWord: "restauranger",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Min fru och jag öppnade ett café och letade i veckor efter en QR-meny för restauranger med bordsbeställning och bokningar utan fult gränssnitt —",
    quoteAccent: "så vi byggde QR-menyn vi själva ville ha.",
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
        q: "Vad är en QR-meny för restauranger?",
        a: "En QR-meny för restauranger är den utskrivbara QR-koden på bordet som gäster skannar med telefonkameran för att öppna menyn i webbläsaren — ingen app. Med IQ Rest inkluderar QR-menyn bordsbeställningar, bokningar 24/7 och AI-översättning till 35 språk, allt uppdateras från mobilen.",
      },
      {
        q: "Vad kostar en QR-meny för restauranger?",
        a: "6,90 €/månad, allt inkluderat. Obegränsade QR-koder för varje bord, full editor, direkta beställningar utan provision, AI-översättning till 35 språk, bokningar och analytics. 14 dagar gratis, inget kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-meny för restauranger.",
    headingAccent: "Klar på 5 minuter.",
    sub: "14 dagar gratis. Inget kort. Över 500 restauranger använder QR-meny på IQ Rest.",
  },

  meta: {
    title: "QR-meny för Restauranger — Klar på 5 Min | IQ Rest",
    description: "QR-meny för restauranger: QR-kod vid varje bord, direkta beställningar utan provision, AI-översättning till 35 språk. Klar på 5 minuter, 14 dagar gratis.",
    canonical: "https://iq-rest.com/sv/lp/qr-meny-for-restauranger",
    ogLocale: "sv_SE",
    ogTitle: "QR-meny för Restauranger — Klar på 5 Minuter",
    ogDescription: "QR-meny med direkta beställningar, 35 AI-språk och bokningar. Klar på 5 minuter — 14 dagar gratis.",
  },
};
