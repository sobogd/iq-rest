import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /no, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /no page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Fra 6,90 €/mnd · 14 dager gratis · Avslutt når du vil",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digital meny for restauranter. Klar på 5 minutter.",
    sub: "Digital meny for restauranten din på 5 minutter. Alt inkludert: mobil redigerer uten kode, AI meny-skanning, QR-koder for bord og direkte bestillinger uten provisjoner.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Kona og jeg åpnet en kafé og brukte uker på å lete etter en digital meny for restauranter som også håndterer bordbestilling og bookinger uten å være klumpete eller stygg —",
    quoteAccent: "så vi bygde den digitale menyen vi selv ville ha.",
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
        q: "Hva er en digital meny for restauranter?",
        a: "En digital meny for restauranter er nettversjonen av papirmenyen: gjesten skanner en QR-kode ved bordet med telefonen og ser retter, bilder, allergener og priser i nettleseren — uten app. Med IQ Rest inkluderer den digitale menyen også direkte bordbestilling, bookinger 24/7 og AI-oversettelse til 35 språk — alt kan oppdateres i sanntid fra telefonen.",
      },
      {
        q: "Hva koster en digital meny for restauranter?",
        a: "6,90 €/måned, alt inkludert (rabatt på årsplan). Full editor, ubegrenset med QR-koder, direkte bestillinger uten provisjon, AI-oversettelse til 35 språk, bookinger og analyser. 14 dagers gratis prøveperiode, uten kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digital meny for restauranter.",
    headingAccent: "Klar på 5 minutter.",
    sub: "14 dager gratis. Ingen kort. Bli med 500+ restauranter som kjører sin digitale meny på IQ Rest.",
  },

  meta: {
    title: "Digital Meny for Restauranter — Klar på 5 Min | IQ Rest",
    description: "Digital meny for restauranter: utskrivbar QR-kode, direkte bestillinger uten provisjon, AI-oversettelse til 35 språk. 5 minutter, 14 dager gratis.",
    canonical: "https://iq-rest.com/no/lp/digital-meny-for-restauranter",
    ogLocale: "no_NO",
    ogTitle: "Digital Meny for Restauranter — Klar på 5 Minutter",
    ogDescription: "Digital meny for restauranter med QR-kode, direkte bestillinger og 35 AI-språk. Live på 5 minutter — 14 dager gratis.",
  },
};
