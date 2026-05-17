import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /da, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /da page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Fra 6,90 €/md · 14 dage gratis · Afslut når du vil",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digital menu til restauranter",
    sub: "500+ restauranter i 30+ lande betjener flere borde, sælger mere til turister og dropper leveringsgebyrer. Live på 5 minutter — 14 dage gratis.",
    verticals: ["Onlinebestilling", "Bookinger", "AI-oversættelse", "Menu-scanner", "Allergener", "Premium-design", "Analyser"],
    dynamicHeadlines: [],
    headlinePrefix: "Digital menu til ",
    accentWord: "restauranter",
    accentWordRotation: ["restauranter", "caféer", "barer", "pizzeriaer", "bistroer", "værtshuse"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Min kone og jeg åbnede en café og brugte uger på at finde en digital menu til restauranter, der også klarer bordbestillinger og bookinger uden at være klodset eller grim —",
    quoteAccent: "så vi byggede den digitale menu, vi selv ville have.",
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
        q: "Hvad er en digital menu til restauranter?",
        a: "En digital menu til restauranter er onlineversionen af din papirmenu: gæsten scanner en QR-kode ved bordet med telefonen og ser straks retter, fotos, allergener og priser i browseren — uden app. Med IQ Rest indeholder den digitale menu også direkte bordbestilling, bookinger 24/7 og AI-oversættelse til 35 sprog — alt kan opdateres i realtid fra telefonen.",
      },
      {
        q: "Hvad koster en digital menu til restauranter?",
        a: "6,90 €/måned, alt inkluderet (rabat på årsplan). Fuld editor, ubegrænsede QR-koder, direkte bestillinger uden provision, AI-oversættelse til 35 sprog, bookinger og analyser. 14 dages gratis prøve, intet kort.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digital menu til restauranter.",
    headingAccent: "Klar på 5 minutter.",
    sub: "14 dage gratis. Intet kort. Bliv en del af 500+ restauranter, der kører deres digitale menu på IQ Rest.",
  },

  meta: {
    title: "Digital Menu til Restauranter — Klar på 5 Min | IQ Rest",
    description: "Digital menu til restauranter: printbar QR-kode, direkte bestillinger uden provision, AI-oversættelse til 35 sprog. 5 minutter, 14 dage gratis.",
    canonical: "https://iq-rest.com/da/lp/digital-menu-til-restauranter",
    ogLocale: "da_DK",
    ogTitle: "Digital Menu til Restauranter — Klar på 5 Minutter",
    ogDescription: "Digital menu til restauranter med QR-kode, direkte bestillinger og 35 AI-sprog. Live på 5 minutter — 14 dage gratis.",
  },
};
