import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /de, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /de page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Ab 6,90 €/Monat · 14 Tage gratis · Jederzeit kündbar",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitale Speisekarte für Restaurants. In 5 Minuten startklar.",
    sub: "Digitale Speisekarte für Ihr Restaurant in 5 Minuten. Alles inklusive: mobiler Editor ohne Code, KI-Menüscan, QR-Codes für Tische und Direktbestellungen ohne Provisionen.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Meine Frau und ich eröffneten ein Café und suchten wochenlang eine digitale Speisekarte für Restaurants, die auch Tischbestellung und Reservierungen abdeckt, ohne klobig oder hässlich zu sein —",
    quoteAccent: "also bauten wir die digitale Speisekarte, die wir selbst haben wollten.",
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
        q: "Was ist eine digitale Speisekarte für Restaurants?",
        a: "Eine digitale Speisekarte für Restaurants ist die Online-Version Ihrer Papierkarte: der Gast scannt einen QR-Code am Tisch mit der Handykamera und sieht Gerichte, Fotos, Allergene und Preise im Browser — ohne App. Mit IQ Rest enthält die digitale Speisekarte auch direkte Tischbestellung, 24/7-Reservierungen und KI-Übersetzung in 35 Sprachen — alles in Echtzeit vom Handy aktualisierbar.",
      },
      {
        q: "Was kostet eine digitale Speisekarte für Restaurants?",
        a: "6,90 €/Monat, alles inklusive (Jahresplan-Rabatt). Voller Editor, unbegrenzte QR-Codes, Direktbestellung ohne Provision, KI-Übersetzung in 35 Sprachen, Reservierungen und Analytics. 14 Tage kostenlos, ohne Karte.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitale Speisekarte für Restaurants.",
    headingAccent: "In 5 Minuten bereit.",
    sub: "14 Tage gratis. Keine Karte. Werden Sie Teil von 500+ Restaurants, die ihre digitale Speisekarte über IQ Rest betreiben.",
  },

  meta: {
    title: "Digitale Speisekarte für Restaurants — In 5 Min | IQ Rest",
    description: "Digitale Speisekarte für Restaurants: druckbarer QR-Code, Direktbestellung ohne Provision, KI-Übersetzung in 35 Sprachen. 5 Minuten live, 14 Tage gratis.",
    canonical: "https://iq-rest.com/de/lp/digitale-speisekarte-fuer-restaurants",
    ogLocale: "de_DE",
    ogTitle: "Digitale Speisekarte für Restaurants — In 5 Minuten Bereit",
    ogDescription: "Digitale Speisekarte für Restaurants mit QR-Code, Direktbestellungen und 35 KI-Sprachen. 5 Minuten live — 14 Tage gratis.",
  },
};
