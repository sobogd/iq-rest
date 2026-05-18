import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /nl, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /nl page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Vanaf €6,90/mnd · 14 dagen gratis · Altijd opzegbaar",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitale menukaart voor restaurants. Klaar in 5 minuten.",
    sub: "Digitale menukaart voor jouw restaurant in 5 minuten. Alles inbegrepen: mobiele editor zonder code, AI menu-scan, QR-codes voor tafels en directe bestellingen zonder commissies.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Mijn vrouw en ik openden een café en zochten wekenlang een digitaal menu voor restaurants dat ook tafelbestellingen en reserveringen aankan, zonder log of lelijk te zijn —",
    quoteAccent: "dus bouwden we het digitale menu dat we zelf wilden hebben.",
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
        q: "Wat is een digitaal menu voor restaurants?",
        a: "Een digitaal menu voor restaurants is de online versie van uw papieren kaart: de gast scant een QR-code aan tafel met zijn telefoon en ziet meteen gerechten, foto's, allergenen en prijzen in de browser — zonder app. Met IQ Rest bevat het digitale menu ook directe bestellingen aan tafel, 24/7 reserveringen en AI-vertaling in 35 talen — alles realtime aanpasbaar vanaf de telefoon.",
      },
      {
        q: "Wat kost een digitaal menu voor restaurants?",
        a: "€6,90/maand, alles inbegrepen (korting op het jaarplan). Volledige editor, onbeperkte QR-codes, directe bestellingen zonder commissie, AI-vertaling in 35 talen, reserveringen en analytics. 14 dagen gratis proberen, zonder kaart.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitaal menu voor restaurants.",
    headingAccent: "Klaar in 5 minuten.",
    sub: "14 dagen gratis. Geen kaart. Sluit aan bij 500+ restaurants die hun digitale menu via IQ Rest beheren.",
  },

  meta: {
    title: "Digitaal Menu voor Restaurants — Klaar in 5 Min | IQ Rest",
    description: "Digitaal menu voor restaurants: printbare QR-code, directe bestellingen zonder commissie, AI-vertaling in 35 talen. 5 minuten, 14 dagen gratis.",
    canonical: "https://iq-rest.com/nl/lp/digitaal-menu-voor-restaurants",
    ogLocale: "nl_NL",
    ogTitle: "Digitaal Menu voor Restaurants — Klaar in 5 Minuten",
    ogDescription: "Digitaal menu voor restaurants met QR-code, directe bestellingen en 35 AI-talen. In 5 minuten live — 14 dagen gratis.",
  },
};
