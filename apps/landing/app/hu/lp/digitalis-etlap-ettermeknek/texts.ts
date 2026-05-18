import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /hu, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /hu page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "6,90 €/hó-tól · 14 nap ingyen · Bármikor lemondod",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitális étlap éttermeknek. 5 perc alatt kész.",
    sub: "Digitális étlap az éttermednek 5 perc alatt. Minden benne: mobil szerkesztő kódolás nélkül, AI étlap-szkennelés, QR-kódok az asztalokhoz és közvetlen rendelések jutalék nélkül.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Feleségemmel kávézót nyitottunk, és heteket töltöttünk azzal, hogy találjunk digitális étlapot éttermeknek, ami az asztali rendelést és foglalást is kezeli, anélkül hogy nehézkes vagy csúnya lenne —",
    quoteAccent: "ezért megépítettük azt a digitális étlapot, amit mi magunknak akartunk.",
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
        q: "Mi az a digitális étlap éttermeknek?",
        a: "A digitális étlap éttermeknek a papír étlap online változata: a vendég az asztalnál egy QR-kódot olvas be telefonnal és azonnal látja az ételeket, fényképeket, allergéneket és árakat a böngészőben — alkalmazás nélkül. Az IQ Rest digitális étlapja közvetlen asztali rendelést, 24/7 foglalásokat és 35 nyelvű AI fordítást is tartalmaz — mindent valós időben frissíthetsz telefonról.",
      },
      {
        q: "Mennyibe kerül a digitális étlap éttermeknek?",
        a: "6,90 €/hó, minden benne van (éves csomagra kedvezmény). Teljes szerkesztő, korlátlan QR-kódok, jutalékmentes közvetlen rendelés, 35 nyelvű AI fordítás, foglalások és analitika. 14 nap ingyenes próba, kártya nélkül.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitális étlap éttermeknek.",
    headingAccent: "5 perc alatt kész.",
    sub: "14 nap ingyen. Nincs kártya. Csatlakozz az 500+ étteremhez, amelyek digitális étlapjukat IQ Resten futtatják.",
  },

  meta: {
    title: "Digitális Étlap Éttermeknek — 5 Perc | IQ Rest",
    description: "Digitális étlap éttermeknek: nyomtatható QR-kód, jutalékmentes közvetlen rendelések, 35 nyelvű AI fordítás. 5 perc, 14 nap ingyen.",
    canonical: "https://iq-rest.com/hu/lp/digitalis-etlap-ettermeknek",
    ogLocale: "hu_HU",
    ogTitle: "Digitális Étlap Éttermeknek — 5 Perc Alatt",
    ogDescription: "Digitális étlap éttermeknek QR-kóddal, közvetlen rendelésekkel és 35 AI nyelvvel. Élesben 5 perc alatt — 14 nap ingyen.",
  },
};
