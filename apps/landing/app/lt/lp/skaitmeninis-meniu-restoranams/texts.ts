import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /lt, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /lt page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Nuo 6,90 €/mėn · 14 dienų nemokamai · Atšauk kada nori",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Skaitmeninis meniu restoranams",
    sub: "500+ restoranų 30+ šalių aptarnauja daugiau staliukų, parduoda daugiau turistams ir panaikina pristatymo komisinius. Veikia per 5 minutes — 14 dienų nemokamai.",
    verticals: ["Užsakymai internetu", "Rezervacijos", "AI vertimas", "Meniu skeneris", "Alergenai", "Premium dizainas", "Analitika"],
    dynamicHeadlines: [],
    headlinePrefix: "Skaitmeninis meniu ",
    accentWord: "restoranams",
    accentWordRotation: ["restoranams", "kavinėms", "barams", "picerijoms", "bistro", "aludėms"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Su žmona atidarėme kavinę ir savaites ieškojome skaitmeninio meniu restoranams, kuris taip pat tvarko užsakymus prie staliuko ir rezervacijas, nebūdamas griozdiškas ar negražus —",
    quoteAccent: "todėl sukūrėme skaitmeninį meniu, kokio patys norėjome.",
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
        q: "Kas yra skaitmeninis meniu restoranams?",
        a: "Skaitmeninis meniu restoranams yra popierinio meniu internetinė versija: svečias telefonu nuskaito QR kodą prie staliuko ir iškart naršyklėje mato patiekalus, nuotraukas, alergenus ir kainas — be programėlės. Su IQ Rest skaitmeninis meniu apima ir tiesioginius užsakymus prie staliuko, rezervacijas 24/7 bei AI vertimą į 35 kalbas — viskas atnaujinama realiu laiku iš telefono.",
      },
      {
        q: "Kiek kainuoja skaitmeninis meniu restoranams?",
        a: "6,90 €/mėn, viskas įskaičiuota (nuolaida metiniam planui). Pilnas redaktorius, neribotas QR kodų skaičius, tiesioginiai užsakymai be komisinių, AI vertimas į 35 kalbas, rezervacijos ir analitika. 14 dienų nemokamas bandymas, be kortelės.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Skaitmeninis meniu restoranams.",
    headingAccent: "Paruošta per 5 minutes.",
    sub: "14 dienų nemokamai. Be kortelės. Prisijunk prie 500+ restoranų, kurie skaitmeninį meniu valdo IQ Rest.",
  },

  meta: {
    title: "Skaitmeninis Meniu Restoranams — 5 Min | IQ Rest",
    description: "Skaitmeninis meniu restoranams: spausdintinas QR kodas, tiesioginiai užsakymai be komisinių, AI vertimas į 35 kalbas. 5 min, 14 dienų nemokamai.",
    canonical: "https://iq-rest.com/lt/lp/skaitmeninis-meniu-restoranams",
    ogLocale: "lt_LT",
    ogTitle: "Skaitmeninis Meniu Restoranams — Per 5 Minutes",
    ogDescription: "Skaitmeninis meniu restoranams su QR kodu, tiesioginiais užsakymais ir 35 AI kalbomis. Veikia per 5 minutes — 14 dienų nemokamai.",
  },
};
