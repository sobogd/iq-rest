import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /es, tuned for the BROAD-MATCH keyword cluster
// "codigo qr restaurante / codigos qr restaurante / carta qr /
// qr carta / qr carta restaurante / carta qr restaurante / menu qr /
// qr restaurante". Inherits content from the indexed /es page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers "código QR" + "carta" + "restaurante"
// for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Código QR y carta digital para restaurantes",
    sub: "Más de 500 restaurantes en 30+ países pegan un código QR en cada mesa: el cliente escanea, abre la carta en el móvil y pide sin esperar al camarero. Sin app, sin comisiones de delivery. Listo en 5 minutos — 14 días gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "Código QR y carta digital para ",
    accentWord: "restaurantes",
    accentWordRotation: ["tabernas", "pizzerías", "cafeterías", "bares de tapas", "asadores", "restaurantes"],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Mi mujer y yo abrimos un café y pasamos semanas buscando un código QR para la carta del restaurante que también hiciera pedidos en mesa y reservas sin ser feo o complicado —",
    quoteAccent: "así que construimos la carta QR que queríamos nosotros mismos.",
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
        q: "¿Qué es un código QR para la carta de un restaurante?",
        a: "Un código QR para restaurante es el código imprimible que pegas en cada mesa: el cliente lo escanea con la cámara del móvil y abre tu carta en el navegador — sin app que instalar. Con IQ Rest la carta QR incluye pedidos en mesa, reservas 24/7 y traducción IA a 35 idiomas, todo actualizado desde el móvil.",
      },
      {
        q: "¿Cuánto cuesta un código QR para la carta del restaurante?",
        a: "6,90 €/mes, todo incluido. Códigos QR ilimitados para cada mesa, editor completo de la carta, pedidos directos sin comisión, traducción IA a 35 idiomas, reservas y analítica. 14 días gratis, sin tarjeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Código QR y carta digital para restaurantes.",
    headingAccent: "Listo en 5 minutos.",
    sub: "14 días gratis. Sin tarjeta. Más de 500 restaurantes ya usan su carta QR en IQ Rest.",
  },

  meta: {
    title: "Código QR para la Carta del Restaurante — 5 Min | IQ Rest",
    description: "Código QR y carta digital para restaurantes: QR en cada mesa, pedidos directos sin comisión, traducción IA a 35 idiomas. Listo en 5 minutos, 14 días gratis.",
    canonical: "https://iq-rest.com/es/lp/codigo-qr-carta-restaurante",
    ogLocale: "es_ES",
    ogTitle: "Código QR para la Carta del Restaurante — 5 Minutos",
    ogDescription: "Código QR para tu carta. Pedidos directos, 35 idiomas IA y reservas. Listo en 5 minutos — 14 días gratis.",
  },
};
