import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /cs, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /cs page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Od 6,90 €/měs · 14 dní zdarma · Zruš kdykoliv",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Digitální menu pro restaurace. Hotové za 5 minut.",
    sub: "Digitální menu pro vaši restauraci za 5 minut. Vše v ceně: mobilní editor bez kódu, AI skenování menu, QR kódy pro stoly a přímé objednávky bez provizí.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "S manželkou jsme otevřeli kavárnu a týdny hledali digitální menu pro restaurace, které zvládá i objednávky u stolu a rezervace, aniž by bylo neohrabané nebo ošklivé —",
    quoteAccent: "tak jsme postavili digitální menu, které jsme sami chtěli.",
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
        q: "Co je digitální menu pro restaurace?",
        a: "Digitální menu pro restaurace je online verze papírového jídelníčku: host naskenuje QR kód u stolu telefonem a hned vidí jídla, fotky, alergeny a ceny v prohlížeči — bez aplikace. S IQ Rest digitální menu obsahuje i přímou objednávku u stolu, rezervace 24/7 a AI překlad do 35 jazyků — vše lze aktualizovat z telefonu v reálném čase.",
      },
      {
        q: "Kolik stojí digitální menu pro restaurace?",
        a: "6,90 €/měsíc, vše v ceně (sleva na ročním plánu). Plný editor, neomezené QR kódy, přímé objednávky bez provize, AI překlad do 35 jazyků, rezervace a analytika. 14denní zkušební doba zdarma, bez karty.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Digitální menu pro restaurace.",
    headingAccent: "Hotovo za 5 minut.",
    sub: "14 dní zdarma. Bez karty. Připoj se k 500+ restauracím, které provozují digitální menu na IQ Rest.",
  },

  meta: {
    title: "Digitální Menu pro Restaurace — Za 5 Min | IQ Rest",
    description: "Digitální menu pro restaurace: tisknutelný QR kód, přímé objednávky bez provize, AI překlad do 35 jazyků. 5 minut, 14 dní zdarma.",
    canonical: "https://iq-rest.com/cs/lp/digitalni-menu-pro-restaurace",
    ogLocale: "cs_CZ",
    ogTitle: "Digitální Menu pro Restaurace — Za 5 Minut",
    ogDescription: "Digitální menu pro restaurace s QR kódem, přímými objednávkami a 35 AI jazyky. Spuštěno za 5 minut — 14 dní zdarma.",
  },
};
