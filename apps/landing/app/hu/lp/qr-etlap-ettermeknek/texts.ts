import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /hu, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /hu page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-étlap éttermeknek. 5 perc alatt kész.",
    sub: "QR-étlap az éttermednek 5 perc alatt. Minden benne: mobil szerkesztő kódolás nélkül, AI étlap-szkennelés, QR-kódok az asztalokhoz és közvetlen rendelések jutalék nélkül.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "A feleségemmel kávézót nyitottunk és hetekig kerestünk QR étlapot éttermeknek asztali rendeléssel és foglalással, de a megoldások csúnyák voltak —",
    quoteAccent: "így mi magunk építettük meg a QR étlapot, amit szerettünk volna.",
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
        q: "Mi az a QR étlap éttermeknek?",
        a: "A QR étlap éttermeknek az asztalon lévő nyomtatható QR kód, amelyet a vendég a telefonja kamerájával beolvas, hogy megnyissa az étlapot a böngészőben — alkalmazás nélkül. Az IQ Rest QR étlap tartalmazza az asztali rendeléseket, 24/7 foglalásokat és AI fordítást 35 nyelvre, mindent telefonról frissíthet.",
      },
      {
        q: "Mennyibe kerül egy QR étlap éttermeknek?",
        a: "Havi 6,90 €, minden benne. Korlátlan QR kódok minden asztalra, teljes szerkesztő, közvetlen rendelések jutalék nélkül, AI fordítás 35 nyelvre, foglalások és analitika. 14 nap ingyenes, kártya nélkül.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR étlap éttermeknek.",
    headingAccent: "Kész 5 perc alatt.",
    sub: "14 nap ingyenes. Kártya nélkül. Több mint 500 étterem használja a QR étlapot az IQ Rest-en.",
  },

  meta: {
    title: "QR Étlap Éttermeknek — Kész 5 Perc Alatt | IQ Rest",
    description: "QR étlap éttermeknek: QR kód minden asztalon, közvetlen rendelések jutalék nélkül, AI fordítás 35 nyelvre. Kész 5 perc alatt, 14 nap ingyenes.",
    canonical: "https://iq-rest.com/hu/lp/qr-etlap-ettermeknek",
    ogLocale: "hu_HU",
    ogTitle: "QR Étlap Éttermeknek — Kész 5 Perc Alatt",
    ogDescription: "QR étlap közvetlen rendelésekkel, 35 AI nyelvvel és foglalásokkal. Kész 5 perc alatt — 14 nap ingyenes.",
  },
};
