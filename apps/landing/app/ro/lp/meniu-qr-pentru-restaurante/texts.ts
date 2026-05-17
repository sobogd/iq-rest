import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ro, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /ro page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Meniu QR pentru restaurante",
    sub: "Peste 500 de restaurante din 30+ țări înlocuiesc meniul tipărit cu un meniu QR, vând mai mult turiștilor și elimină comisioanele de livrare. Gata în 5 minute — 14 zile gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "Meniu QR pentru ",
    accentWord: "restaurante",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Eu și soția am deschis o cafenea și am căutat săptămâni un meniu QR pentru restaurante cu comenzi la masă și rezervări fără interfață urâtă —",
    quoteAccent: "așa că am construit meniul QR pe care îl voiam.",
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
        q: "Ce este un meniu QR pentru restaurante?",
        a: "Un meniu QR pentru restaurante este codul QR imprimabil pe masă pe care clienții îl scanează cu camera telefonului pentru a deschide meniul în browser — fără aplicație. Cu IQ Rest meniul QR include comenzi la masă, rezervări 24/7 și traducere AI în 35 de limbi, totul actualizat de pe telefon.",
      },
      {
        q: "Cât costă un meniu QR pentru restaurante?",
        a: "6,90 €/lună, totul inclus. Coduri QR nelimitate pe fiecare masă, editor complet, comenzi directe fără comision, traducere AI în 35 de limbi, rezervări și analitică. 14 zile gratis, fără card.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Meniu QR pentru restaurante.",
    headingAccent: "Gata în 5 minute.",
    sub: "14 zile gratis. Fără card. Peste 500 de restaurante folosesc meniul QR pe IQ Rest.",
  },

  meta: {
    title: "Meniu QR pentru Restaurante — Gata în 5 Min | IQ Rest",
    description: "Meniu QR pentru restaurante: cod QR pe fiecare masă, comenzi directe fără comision, traducere AI în 35 de limbi. Gata în 5 minute, 14 zile gratis.",
    canonical: "https://iq-rest.com/ro/lp/meniu-qr-pentru-restaurante",
    ogLocale: "ro_RO",
    ogTitle: "Meniu QR pentru Restaurante — Gata în 5 Minute",
    ogDescription: "Meniu QR cu comenzi directe, 35 de limbi AI și rezervări. Gata în 5 minute — 14 zile gratis.",
  },
};
