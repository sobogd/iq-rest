import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ro, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /ro page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "De la 6,90 €/lună · 14 zile gratuit · Anulezi oricând",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Meniu digital pentru restaurante. Gata în 5 minute.",
    sub: "Meniu digital pentru restaurantul tău în 5 minute. Totul inclus: editor mobil fără cod, scanare AI a meniului, coduri QR pentru mese și comenzi directe fără comisioane.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Soția mea și cu mine am deschis o cafenea și am petrecut săptămâni căutând un meniu digital pentru restaurante care să gestioneze și comenzi la masă și rezervări, fără să fie stângaci sau urât —",
    quoteAccent: "așa că am construit meniul digital pe care îl voiam noi.",
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
        q: "Ce este un meniu digital pentru restaurante?",
        a: "Un meniu digital pentru restaurante este versiunea online a meniului tipărit: clientul scanează un cod QR la masă cu telefonul și vede instant preparatele, fotografiile, alergenii și prețurile în browser — fără aplicație. Cu IQ Rest meniul digital include și comenzi directe la masă, rezervări 24/7 și traducere AI în 35 de limbi — totul actualizabil în timp real de pe telefon.",
      },
      {
        q: "Cât costă un meniu digital pentru restaurante?",
        a: "6,90 €/lună, totul inclus (reducere pe planul anual). Editor complet, coduri QR nelimitate, comenzi directe fără comision, traducere AI în 35 de limbi, rezervări și analitică. 14 zile gratuit, fără card.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Meniu digital pentru restaurante.",
    headingAccent: "Gata în 5 minute.",
    sub: "14 zile gratuit. Fără card. Alătură-te celor 500+ restaurante care își rulează meniul digital pe IQ Rest.",
  },

  meta: {
    title: "Meniu Digital pentru Restaurante — 5 Min | IQ Rest",
    description: "Meniu digital pentru restaurante: cod QR imprimabil, comenzi directe fără comision, traducere AI în 35 de limbi. 5 minute, 14 zile gratuit.",
    canonical: "https://iq-rest.com/ro/lp/meniu-digital-pentru-restaurante",
    ogLocale: "ro_RO",
    ogTitle: "Meniu Digital pentru Restaurante — În 5 Minute",
    ogDescription: "Meniu digital pentru restaurante cu cod QR, comenzi directe și 35 de limbi AI. Live în 5 minute — 14 zile gratuit.",
  },
};
