import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /nl, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /nl page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-menu voor restaurants",
    sub: "Meer dan 500 restaurants in 30+ landen vervangen hun papieren menu door een QR-menu, verkopen meer aan toeristen en schrappen bezorg-commissies. Live in 5 minuten — 14 dagen gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "QR-menu voor ",
    accentWord: "restaurants",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Mijn vrouw en ik openden een café en zochten weken naar een QR-menu voor restaurants dat ook tafelbestellingen en reserveringen aankan zonder lelijk te zijn —",
    quoteAccent: "dus bouwden we het QR-menu dat we zelf wilden.",
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
        q: "Wat is een QR-menu voor restaurants?",
        a: "Een QR-menu voor restaurants is de printbare QR-code op tafel die gasten met hun telefooncamera scannen om de kaart in de browser te openen — geen app nodig. Met IQ Rest bevat het QR-menu tafelbestellingen, reserveringen 24/7 en AI-vertaling naar 35 talen, alles vanaf de telefoon bij te werken.",
      },
      {
        q: "Wat kost een QR-menu voor restaurants?",
        a: "€ 6,90/maand, alles inbegrepen. Onbeperkte QR-codes voor elke tafel, volledige editor, directe bestellingen zonder commissie, AI-vertaling naar 35 talen, reserveringen en analytics. 14 dagen gratis, geen kaart nodig.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-menu voor restaurants.",
    headingAccent: "Klaar in 5 minuten.",
    sub: "14 dagen gratis. Geen kaart. Meer dan 500 restaurants gebruiken al hun QR-menu op IQ Rest.",
  },

  meta: {
    title: "QR-menu voor Restaurants — Klaar in 5 Min | IQ Rest",
    description: "QR-menu voor restaurants: QR-code op elke tafel, directe bestellingen zonder commissie, AI-vertaling naar 35 talen. Live in 5 minuten, 14 dagen gratis.",
    canonical: "https://iq-rest.com/nl/lp/qr-menu-voor-restaurants",
    ogLocale: "nl_NL",
    ogTitle: "QR-menu voor Restaurants — Klaar in 5 Minuten",
    ogDescription: "QR-menu met directe bestellingen, 35 AI-talen en reserveringen. Live in 5 minuten — 14 dagen gratis.",
  },
};
