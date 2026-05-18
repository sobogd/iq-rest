import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ga, tuned for the BROAD-MATCH keyword
// "digital menu for restaurants" → translated as the local equivalent.
// Inherits content from the indexed /ga page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Ó €6.90/mí · 14 lá saor in aisce · Cealaigh am ar bith",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — Ads crawler reads `headline` as the keyword phrase.
    headline: "Biachlár Digiteach do Bhialanna. Réidh i 5 nóiméad.",
    sub: "Biachlár digiteach do bhialann i 5 nóiméad. Gach rud san áireamh: eagarthóir soghluaiste gan chód, scanadh biachláir le AI, cóid QR do bhoird agus orduithe díreacha gan choimisiún.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "D'oscail mé féin agus mo bhean caifé agus chaitheamar seachtainí ag lorg biachláir dhigiteach do bhialanna a láimhseálann orduithe ag an mbord agus áirithintí, gan a bheith trom nó gránna —",
    quoteAccent: "mar sin thógamar an biachlár digiteach a theastaigh uainn féin.",
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
        q: "Cad is biachlár digiteach do bhialanna ann?",
        a: "Is é biachlár digiteach do bhialanna an leagan ar líne den bhiachlár páipéir: scanann an t-aoi cód QR ag an mbord lena ghuthán agus feiceann sé miasa, grianghraif, ailléirginí agus praghsanna sa bhrabhsálaí láithreach — gan aip. Le IQ Rest cuimsíonn an biachlár digiteach orduithe díreacha ag an mbord, áirithintí 24/7 agus aistriúchán AI go 35 teanga — gach rud nuashonraithe i bhfíor-am ón nguthán.",
      },
      {
        q: "Cé mhéad a chosnaíonn biachlár digiteach do bhialanna?",
        a: "€6.90/mí, gach rud san áireamh (lascaine ar an bplean bliantúil). Eagarthóir iomlán, cóid QR gan teorainn, orduithe díreacha gan choimisiún, aistriúchán AI go 35 teanga, áirithintí agus anailísíocht. Triail 14 lá saor in aisce, gan chárta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Biachlár digiteach do bhialanna.",
    headingAccent: "Réidh i 5 nóiméad.",
    sub: "14 lá saor in aisce. Gan chárta. Bí leis na 500+ bialann a reáchtálann a mbiachlár digiteach ar IQ Rest.",
  },

  meta: {
    title: "Biachlár Digiteach do Bhialanna — 5 Nóim | IQ Rest",
    description: "Biachlár digiteach do bhialanna: cód QR inphriontáilte, orduithe díreacha gan choimisiún, aistriúchán AI go 35 teanga. 5 nóim, 14 lá saor in aisce.",
    canonical: "https://iq-rest.com/ga/lp/biachlar-digiteach-do-bhialanna",
    ogLocale: "ga_IE",
    ogTitle: "Biachlár Digiteach do Bhialanna — I 5 Nóiméad",
    ogDescription: "Biachlár digiteach do bhialanna le cód QR, orduithe díreacha agus 35 teanga AI. Beo i 5 nóiméad — 14 lá saor in aisce.",
  },
};
