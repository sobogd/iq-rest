import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /en, tuned for the BROAD-MATCH keyword "digital menu
// for restaurants". Inherits content from the indexed /en page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "From €6.90/mo · 14 days free · Cancel anytime",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    // Browsers also see this for one frame before the rotator boots, so
    // hydration matches and there is no flicker on the keyword form.
    headline: "Digital Menu for Restaurants. Ready in 5 minutes.",
    sub: "Digital menu for your restaurant in 5 minutes. Everything included: no-code mobile editor, AI menu scan, QR codes for tables and direct orders without commissions.",
    // Mobile renders these as an infinite-scroll marquee, desktop as a
    // static row. They advertise what ships with the system, not venue
    // types — the H1 already covers verticals via the accent-word rotator.
    // Second-line accent disabled — the H1 already swaps the last word.
    dynamicHeadlines: [],
    // After hydration the H1 last word cycles through these in order. The
    // first item must equal `accentWord` so the initial frame keeps the
    // keyword phrase intact for the Ads crawler.
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart:
      "My wife and I opened a café and spent weeks looking for a digital menu for restaurants that also handled table ordering and reservations without being clunky or ugly —",
    quoteAccent: "so we built the digital menu we wanted ourselves.",
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
        q: "What is a digital menu for restaurants?",
        a: "A digital menu for restaurants is the online version of your printed menu: the guest scans a QR code at the table with their phone camera and instantly opens dishes, photos, allergens, and prices in the browser — no app to install. With IQ Rest the digital menu for restaurants also includes direct table ordering, 24/7 reservations, and AI translation into 35 languages — update everything from your phone in real time.",
      },
      {
        q: "How much does a digital menu for restaurants cost?",
        a: "€6.90/month, all included (annual plan discount available). Full editor, unlimited QR codes, direct ordering with zero commissions, AI translation into 35 languages, reservations, and analytics. 14-day free trial, no card required.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digital menu for restaurants.",
    headingAccent: "Ready in 5 minutes.",
    sub: "14 days free. No card required. Join 500+ restaurants running their digital menu on IQ Rest.",
  },

  meta: {
    title: "Digital Menu for Restaurants — Ready in 5 Min | IQ Rest",
    description:
      "Digital menu for restaurants: printable QR code, direct orders with zero commissions, AI translation in 35 languages. Live in 5 minutes, 14 days free.",
    canonical: "https://iq-rest.com/en/lp/digital-menu-for-restaurants",
    ogLocale: "en_US",
    ogTitle: "Digital Menu for Restaurants — Ready in 5 Minutes",
    ogDescription:
      "Digital menu for restaurants with QR code, direct orders, and 35 AI languages. Live in 5 minutes — 14 days free.",
  },
};
