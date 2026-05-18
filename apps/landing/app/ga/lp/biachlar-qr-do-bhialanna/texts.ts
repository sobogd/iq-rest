import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ga, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /ga page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Biachlár QR do Bhialanna. Réidh i 5 nóiméad.",
    sub: "Biachlár QR do bhialann i 5 nóiméad. Gach rud san áireamh: eagarthóir soghluaiste gan chód, scanadh biachláir le AI, cóid QR do bhoird agus orduithe díreacha gan choimisiún.",
    dynamicHeadlines: [],
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "D'oscail mé féin agus mo bhean caife agus chaitheamar seachtainí ag cuardach biachlár QR do bhialanna le horduithe ag an mbord agus áirithintí gan comhéadan gránna —",
    quoteAccent: "mar sin thógamar an biachlár QR a theastaigh uainn féin.",
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
        q: "Cad is biachlár QR do bhialanna ann?",
        a: "Is é biachlár QR do bhialanna an cód QR inphriontáilte ag an mbord a scananálann an custaiméir lena cheamara fóin chun an biachlár a oscailt sa bhrabhsálaí — gan aip. Le IQ Rest cuimsíonn an biachlár QR orduithe boird, áirithintí 24/7 agus aistriúchán AI go 35 teanga, gach rud nuashonraithe ón bhfón.",
      },
      {
        q: "Cé mhéad a chosnaíonn biachlár QR do bhialanna?",
        a: "€6.90 sa mhí, gach rud san áireamh. Cóid QR gan teorainn do gach bord, eagarthóir iomlán, orduithe díreach gan choimisiún, aistriúchán AI go 35 teanga, áirithintí agus anailísíocht. 14 lá saor in aisce, gan cárta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Biachlár QR do bhialanna.",
    headingAccent: "Réidh i 5 nóiméad.",
    sub: "14 lá saor in aisce. Gan cárta. Tá níos mó ná 500 bialann ag baint úsáide as biachlár QR ar IQ Rest.",
  },

  meta: {
    title: "Biachlár QR do Bhialanna — Réidh i 5 Nóim | IQ Rest",
    description: "Biachlár QR do bhialanna: cód QR ag gach bord, orduithe díreach gan choimisiún, aistriúchán AI go 35 teanga. Réidh i 5 nóiméad, 14 lá saor.",
    canonical: "https://iq-rest.com/ga/lp/biachlar-qr-do-bhialanna",
    ogLocale: "ga_IE",
    ogTitle: "Biachlár QR do Bhialanna — Réidh i 5 Nóiméad",
    ogDescription: "Biachlár QR le horduithe díreacha, 35 teanga AI agus áirithintí. Réidh i 5 nóiméad — 14 lá saor.",
  },
};
