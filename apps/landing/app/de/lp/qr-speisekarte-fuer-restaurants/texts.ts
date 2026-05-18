import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /de, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /de page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR-Speisekarte für Restaurants. In 5 Minuten startklar.",
    sub: "QR-Speisekarte für Ihr Restaurant in 5 Minuten. Alles inklusive: mobiler Editor ohne Code, KI-Menüscan, QR-Codes für Tische und Direktbestellungen ohne Provisionen.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Meine Frau und ich haben ein Café eröffnet und wochenlang nach einer QR-Speisekarte für Restaurants gesucht, die auch Tischbestellungen und Reservierungen kann ohne klobig zu sein —",
    quoteAccent: "also haben wir die QR-Speisekarte selbst gebaut.",
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
        q: "Was ist eine QR-Speisekarte für Restaurants?",
        a: "Eine QR-Speisekarte für Restaurants ist der druckbare QR-Code am Tisch, den Gäste mit der Handykamera scannen, um die Karte im Browser zu öffnen — keine App nötig. Mit IQ Rest enthält die QR-Speisekarte Tischbestellungen, Reservierungen rund um die Uhr und KI-Übersetzung in 35 Sprachen, alles per Mobile aktualisierbar.",
      },
      {
        q: "Was kostet eine QR-Speisekarte für Restaurants?",
        a: "6,90 €/Monat, alles inklusive. Unbegrenzte QR-Codes für jeden Tisch, voller Editor, Direktbestellung ohne Provisionen, KI-Übersetzung in 35 Sprachen, Reservierungen und Analytics. 14 Tage gratis, ohne Karte.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR-Speisekarte für Restaurants.",
    headingAccent: "Bereit in 5 Minuten.",
    sub: "14 Tage kostenlos. Ohne Karte. Über 500 Restaurants nutzen ihre QR-Speisekarte auf IQ Rest.",
  },

  meta: {
    title: "QR-Speisekarte für Restaurants — In 5 Min Bereit | IQ Rest",
    description: "QR-Speisekarte für Restaurants: QR-Code an jedem Tisch, Direktbestellungen ohne Provision, KI-Übersetzung in 35 Sprachen. Live in 5 Minuten, 14 Tage gratis.",
    canonical: "https://iq-rest.com/de/lp/qr-speisekarte-fuer-restaurants",
    ogLocale: "de_DE",
    ogTitle: "QR-Speisekarte für Restaurants — In 5 Minuten Bereit",
    ogDescription: "QR-Speisekarte mit Direktbestellung, 35 KI-Sprachen und Reservierungen. Live in 5 Minuten — 14 Tage gratis.",
  },
};
