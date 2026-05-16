import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ca, tuned for the PHRASE keyword "carta digital per a
// restaurant". Inherits content from the indexed /ca page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Des de 6,90€/mes · 14 dies gratis · Cancel·la quan vulguis",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — the Ads crawler reads `headline` as the keyword phrase.
    // Browsers also see this for one frame before the rotator boots, so
    // hydration matches and there is no flicker on the keyword form.
    headline: "Carta digital per a restaurant",
    sub: "500+ restaurants serveixen més taules, venen més a turistes i eliminen comissions. En línia en 5 minuts — 14 dies gratis.",
    // Mobile renders these as an infinite-scroll marquee, desktop as a
    // static row. They advertise what ships with the system, not venue
    // types — the H1 already covers verticals via the accent-word rotator.
    verticals: [
      "Comandes online",
      "Reserves",
      "Traducció IA",
      "Escàner carta",
      "Al·lèrgens",
      "Disseny premium",
      "Analytics",
    ],
    // Second-line accent disabled — the H1 already swaps the last word.
    dynamicHeadlines: [],
    // After hydration the H1 last word cycles through these in order. Order
    // matches venue popularity in Catalan-speaking regions. The first item
    // must equal `accentWord` so the initial frame keeps the keyword
    // phrase intact.
    headlinePrefix: "Carta digital per a ",
    accentWord: "restaurant",
    accentWordRotation: [
      "restaurant",
      "bar",
      "cafeteria",
      "pizzeria",
      "taverna",
      "marisqueria",
    ],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Editor de carta digital creat per un hostaler",
    quoteStart:
      "La meva dona i jo vam obrir una cafeteria i vam passar setmanes buscant una carta digital per a restaurant que també gestionés comandes a taula i reserves, sense ser pesada ni lletja —",
    quoteAccent: "així que vam construir la carta digital que ens hauria agradat tenir.",
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
        q: "Què és una carta digital per a restaurant?",
        a: "Una carta digital per a restaurant és la versió en línia de la carta en paper: el client escaneja un codi QR sobre la taula amb la càmera i accedeix a l'instant a plats, fotos, al·lèrgens i preus al navegador, sense descarregar cap app. Amb IQ Rest la carta digital per a restaurant inclou també comandes directes a taula, reserves 24/7 i traducció IA a 35 idiomes — actualitzes tot des del mòbil en temps real.",
      },
      {
        q: "Quant costa una carta digital per a restaurant?",
        a: "6,90€/mes tot inclòs (descompte al pla anual). Editor complet, codi QR il·limitat, comandes directes sense comissions, traducció IA a 35 idiomes, reserves i analytics. 14 dies de prova gratis, sense targeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Carta digital per a restaurant.",
    headingAccent: "Llesta en 5 minuts.",
    sub: "14 dies gratis. Sense targeta. Uneix-te a 500+ restaurants que utilitzen la carta digital d'IQ Rest.",
  },

  meta: {
    title: "Carta Digital per a Restaurant — Llesta en 5 Min | IQ Rest",
    description:
      "Carta digital per a restaurant: codi QR imprimible, comandes directes sense comissions, traducció IA a 35 idiomes. Llesta en 5 minuts, 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/lp/carta-digital-per-a-restaurant",
    ogLocale: "ca_ES",
    ogTitle: "Carta Digital per a Restaurant — Llesta en 5 Minuts",
    ogDescription:
      "Carta digital per a restaurant amb codi QR, comandes directes i 35 idiomes amb IA. En línia en 5 minuts — 14 dies gratis.",
  },
};
