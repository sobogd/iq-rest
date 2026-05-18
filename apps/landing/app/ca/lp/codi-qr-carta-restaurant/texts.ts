import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ca, tuned for the BROAD-MATCH keyword cluster
// "codigo qr restaurante / codigos qr restaurante / carta qr /
// qr carta / qr carta restaurante / carta qr restaurante / menu qr /
// qr restaurante". Inherits content from the indexed /ca page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers "codi QR" + "carta" + "restaurant"
// for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Carta QR per a Restaurants. Llesta en 5 minuts.",
    sub: "Carta QR per al teu restaurant en 5 minuts. Tot inclòs: editor mòbil sense codi, escaneig IA del menú, codi QR per a taules i comandes directes sense comissions.",
    dynamicHeadlines: [],
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Amb la meva dona vam obrir una cafeteria i vam passar setmanes buscant un codi QR per a la carta del restaurant amb comandes a taula i reserves sense ser lleig —",
    quoteAccent: "així que vam fer la carta QR nosaltres mateixos.",
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
        q: "Què és un codi QR per a la carta d'un restaurant?",
        a: "Un codi QR per a restaurant és el codi imprimible que enganxes a cada taula: el client l'escaneja amb la càmera del mòbil i obre la carta al navegador — sense aplicació. Amb IQ Rest la carta QR inclou comandes a taula, reserves 24/7 i traducció IA a 35 idiomes, tot actualitzat des del mòbil.",
      },
      {
        q: "Quant costa un codi QR per a la carta del restaurant?",
        a: "6,90 €/mes, tot inclòs. Codis QR il·limitats per a cada taula, editor complet de la carta, comandes directes sense comissió, traducció IA a 35 idiomes, reserves i analítica. 14 dies gratis, sense targeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Codi QR i carta digital per a restaurants.",
    headingAccent: "Llest en 5 minuts.",
    sub: "14 dies gratis. Sense targeta. Més de 500 restaurants ja usen la carta QR a IQ Rest.",
  },

  meta: {
    title: "Codi QR per a la Carta del Restaurant — 5 Min | IQ Rest",
    description: "Codi QR i carta digital per a restaurants: QR a cada taula, comandes directes sense comissió, traducció IA a 35 idiomes. Llest en 5 minuts, 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/lp/codi-qr-carta-restaurant",
    ogLocale: "ca_ES",
    ogTitle: "Codi QR per a la Carta del Restaurant — 5 Minuts",
    ogDescription: "Codi QR per a la teva carta. Comandes directes, 35 idiomes IA i reserves. Llest en 5 minuts — 14 dies gratis.",
  },
};
