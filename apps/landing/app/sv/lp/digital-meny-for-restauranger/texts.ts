import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /sv, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /sv page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Från 6,90 €/mån · 14 dagar gratis · Avsluta när du vill",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digital meny för restauranger. Klar på 5 minuter.",
    sub: "Digital meny för din restaurang på 5 minuter. Allt inkluderat: mobil editor utan kod, AI-menyskanning, QR-koder för bord och direkta beställningar utan provisioner.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Min fru och jag öppnade ett café och letade i veckor efter en digital meny för restauranger som också klarar bordsbeställning och bokningar, utan att vara klumpig eller ful —",
    quoteAccent: "så vi byggde den digitala meny vi själva ville ha.",
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
        q: "Vad är en digital meny för restauranger?",
        a: "En digital meny för restauranger är onlineversionen av din pappersmeny: gästen skannar en QR-kod vid bordet med telefonen och ser direkt rätter, foton, allergener och priser i webbläsaren — utan app. Med IQ Rest innehåller den digitala menyn även direkt bordsbeställning, bokningar 24/7 och AI-översättning till 35 språk — allt kan uppdateras i realtid från telefonen.",
      },
      {
        q: "Vad kostar en digital meny för restauranger?",
        a: "6,90 €/månad, allt inkluderat (rabatt på årsplan). Komplett editor, obegränsade QR-koder, direktbeställning utan provision, AI-översättning till 35 språk, bokningar och analyser. 14 dagars gratis test, utan kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digital meny för restauranger.",
    headingAccent: "Klar på 5 minuter.",
    sub: "14 dagar gratis. Inget kort. Anslut till 500+ restauranger som kör sin digitala meny på IQ Rest.",
  },

  meta: {
    title: "Digital Meny för Restauranger — Klar på 5 Min | IQ Rest",
    description: "Digital meny för restauranger: utskrivbar QR-kod, direktbeställningar utan provision, AI-översättning till 35 språk. 5 minuter, 14 dagar gratis.",
    canonical: "https://iq-rest.com/sv/lp/digital-meny-for-restauranger",
    ogLocale: "sv_SE",
    ogTitle: "Digital Meny för Restauranger — Klar på 5 Minuter",
    ogDescription: "Digital meny för restauranger med QR-kod, direktbeställningar och 35 AI-språk. Live på 5 minuter — 14 dagar gratis.",
  },
};
