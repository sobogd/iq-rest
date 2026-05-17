import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /lt, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /lt page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "QR meniu restoranams",
    sub: "Daugiau nei 500 restoranų 30+ šalių keičia spausdintą meniu QR meniu, daugiau parduoda turistams ir naikina pristatymo komisinius. Paruošta per 5 minutes — 14 dienų nemokamai.",
    dynamicHeadlines: [],
    headlinePrefix: "QR meniu ",
    accentWord: "restoranams",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Su žmona atidarėme kavinę ir savaites ieškojome QR meniu restoranams su užsakymais prie staliuko ir rezervacijomis be bjauraus dizaino —",
    quoteAccent: "todėl QR meniu pasidarėme patys.",
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
        q: "Kas yra QR meniu restoranams?",
        a: "QR meniu restoranams yra spausdinamas QR kodas ant stalo, kurį svečias nuskaito telefono kamera ir atveria meniu naršyklėje — be programėlės. Su IQ Rest QR meniu apima užsakymus prie staliuko, rezervacijas 24/7 ir AI vertimą į 35 kalbas, viskas atnaujinama iš telefono.",
      },
      {
        q: "Kiek kainuoja QR meniu restoranams?",
        a: "6,90 €/mėn, viskas įskaičiuota. Neriboti QR kodai kiekvienam stalui, visas redaktorius, tiesioginiai užsakymai be komisinių, AI vertimas į 35 kalbas, rezervacijos ir analitika. 14 dienų nemokamai, be kortelės.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "QR meniu restoranams.",
    headingAccent: "Paruošta per 5 minutes.",
    sub: "14 dienų nemokamai. Be kortelės. Daugiau nei 500 restoranų naudoja QR meniu IQ Rest.",
  },

  meta: {
    title: "QR Meniu Restoranams — Per 5 Min | IQ Rest",
    description: "QR meniu restoranams: QR kodas ant kiekvieno stalo, tiesioginiai užsakymai be komisinių, AI vertimas į 35 kalbas. Paruošta per 5 minutes, 14 dienų nemokamai.",
    canonical: "https://iq-rest.com/lt/lp/qr-meniu-restoranams",
    ogLocale: "lt_LT",
    ogTitle: "QR Meniu Restoranams — Paruošta per 5 Minutes",
    ogDescription: "QR meniu su tiesioginiais užsakymais, 35 AI kalbomis ir rezervacijomis. Paruošta per 5 minutes — 14 dienų nemokamai.",
  },
};
