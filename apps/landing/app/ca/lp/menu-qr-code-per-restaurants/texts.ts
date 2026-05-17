import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /ca, tuned for the BROAD-MATCH keyword cluster
// "qr menu / qr code menu / qr code restaurant / qr menu restaurant".
// Inherits content from the indexed /ca page and only overrides what
// should differ for the Google Ads landing: meta (canonical + og),
// microcopy with entry price, and hero/founder/faq/finalCta copy that
// hammers "QR code" + "menú" + "restaurants" for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menú QR Code per a restaurants",
    sub: "Més de 500 restaurants a 30+ països substitueixen la carta impresa per un menú QR code, venen més als turistes i eliminen comissions de delivery. Llest en 5 minuts — 14 dies gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "Menú QR Code per a ",
    accentWord: "restaurants",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Amb la meva dona vam obrir una cafeteria i vam passar setmanes buscant un menú QR code per a restaurants amb comandes a taula i reserves sense ser lleig —",
    quoteAccent: "així que vam fer el menú QR code nosaltres mateixos.",
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
        q: "Què és un menú QR code per a restaurants?",
        a: "Un menú QR code per a restaurants és el codi QR imprimible a la taula que el client escaneja amb la càmera del mòbil per obrir la carta al navegador — sense aplicació. Amb IQ Rest el menú QR code inclou comandes a taula, reserves 24/7 i traducció IA a 35 idiomes, tot actualitzat des del mòbil.",
      },
      {
        q: "Quant costa un menú QR code per a restaurants?",
        a: "6,90 €/mes, tot inclòs. QR code il·limitats per a cada taula, editor complet, comandes directes sense comissió, traducció IA a 35 idiomes, reserves i analítica. 14 dies gratis, sense targeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menú QR code per a restaurants.",
    headingAccent: "Llest en 5 minuts.",
    sub: "14 dies gratis. Sense targeta. Més de 500 restaurants ja usen el menú QR code a IQ Rest.",
  },

  meta: {
    title: "Menú QR Code per a Restaurants — Llest en 5 Min | IQ Rest",
    description: "Menú QR code per a restaurants: codi QR a cada taula, comandes directes sense comissió, traducció IA a 35 idiomes. Llest en 5 minuts, 14 dies gratis.",
    canonical: "https://iq-rest.com/ca/lp/menu-qr-code-per-restaurants",
    ogLocale: "ca_ES",
    ogTitle: "Menú QR Code per a Restaurants — Llest en 5 Minuts",
    ogDescription: "Menú QR code amb comandes directes, 35 idiomes IA i reserves. Llest en 5 minuts — 14 dies gratis.",
  },
};
