import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /no, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /no page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-meny for restauranter",
    sub: "Over 500 restauranter i 30+ land erstatter den trykte menyen med en QR-meny, selger mer til turister og fjerner leveringsprovisjoner. Klar på 5 minutter — 14 dager gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "QR-meny for ",
    accentWord: "restauranter",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Min kone og jeg åpnet en kafé og brukte uker på å lete etter en QR-meny for restauranter med bordbestilling og reservasjoner uten stygt grensesnitt —",
    quoteAccent: "så vi bygde QR-menyen vi selv ville ha.",
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
        q: "Hva er en QR-meny for restauranter?",
        a: "En QR-meny for restauranter er den printbare QR-koden på bordet som gjester skanner med telefonkameraet for å åpne menyen i nettleseren — ingen app. Med IQ Rest inkluderer QR-menyen bordbestillinger, reservasjoner 24/7 og AI-oversettelse til 35 språk, alt oppdatert fra mobilen.",
      },
      {
        q: "Hva koster en QR-meny for restauranter?",
        a: "6,90 €/måned, alt inkludert. Ubegrensede QR-koder for hvert bord, full editor, direkte bestillinger uten provisjon, AI-oversettelse til 35 språk, reservasjoner og analytics. 14 dager gratis, uten kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-meny for restauranter.",
    headingAccent: "Klar på 5 minutter.",
    sub: "14 dager gratis. Uten kort. Over 500 restauranter bruker allerede QR-meny på IQ Rest.",
  },

  meta: {
    title: "QR-meny for Restauranter — Klar på 5 Min | IQ Rest",
    description: "QR-meny for restauranter: QR-kode ved hvert bord, direkte bestillinger uten provisjon, AI-oversettelse til 35 språk. Klar på 5 minutter, 14 dager gratis.",
    canonical: "https://iq-rest.com/no/lp/qr-meny-for-restauranter",
    ogLocale: "nb_NO",
    ogTitle: "QR-meny for Restauranter — Klar på 5 Minutter",
    ogDescription: "QR-meny med direkte bestillinger, 35 AI-språk og reservasjoner. Klar på 5 minutter — 14 dager gratis.",
  },
};
