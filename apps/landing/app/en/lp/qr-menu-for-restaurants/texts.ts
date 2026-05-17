import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /en, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /en page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR menu for restaurants",
    sub: "500+ restaurants in 30+ countries replace printed menus with a QR menu, sell more to tourists, and cut delivery commissions to zero. Live in 5 minutes — 14 days free.",
    dynamicHeadlines: [],
    headlinePrefix: "QR menu for ",
    accentWord: "restaurants",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "My wife and I opened a café and spent weeks looking for a QR menu for restaurants that also handled table ordering and reservations without being clunky or ugly —",
    quoteAccent: "so we built the QR menu we wanted ourselves.",
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
        q: "What is a QR menu for restaurants?",
        a: "A QR menu for restaurants is the printable QR code at the table that guests scan with their phone camera to open the menu in the browser — no app to install. With IQ Rest the QR menu also includes direct table ordering, 24/7 reservations, and AI translation into 35 languages, all updated from your phone in real time.",
      },
      {
        q: "How much does a QR menu for restaurants cost?",
        a: "€6.90/month, all included. Unlimited QR codes for every table, full menu editor, direct ordering with zero commissions, AI translation into 35 languages, reservations, and analytics. 14-day free trial, no card required.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR menu for restaurants.",
    headingAccent: "Ready in 5 minutes.",
    sub: "14 days free. No card required. Join 500+ restaurants running their QR menu on IQ Rest.",
  },

  meta: {
    title: "QR Menu for Restaurants — Ready in 5 Min | IQ Rest",
    description: "QR menu for restaurants: printable QR code at every table, direct orders with zero commissions, AI translation in 35 languages. Live in 5 minutes, 14 days free.",
    canonical: "https://iq-rest.com/en/lp/qr-menu-for-restaurants",
    ogLocale: "en_US",
    ogTitle: "QR Menu for Restaurants — Ready in 5 Minutes",
    ogDescription: "QR menu for restaurants with direct orders, 35 AI languages and table reservations. Live in 5 minutes — 14 days free.",
  },
};
