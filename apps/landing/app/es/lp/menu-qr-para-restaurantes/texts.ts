import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /es, tuned for the BROAD-MATCH keyword "qr menu
// for restaurants". Inherits content from the indexed /es page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: DEFAULT.microcopy,

  hero: {
    ...DEFAULT.hero,
    headline: "Menú QR para restaurantes",
    sub: "Más de 500 restaurantes en 30+ países usan un menú QR en lugar de cartas impresas, venden más a los turistas y eliminan las comisiones de delivery. Listo en 5 minutos — 14 días gratis.",
    dynamicHeadlines: [],
    headlinePrefix: "Menú QR para ",
    accentWord: "restaurantes",
    accentWordRotation: DEFAULT.hero.accentWordRotation ?? [],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    quoteStart: "Mi mujer y yo abrimos un café y pasamos semanas buscando un menú QR para restaurantes que también hiciera pedidos en mesa y reservas sin ser feo o complicado —",
    quoteAccent: "así que construimos el menú QR que queríamos nosotros mismos.",
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
        q: "¿Qué es un menú QR para restaurantes?",
        a: "Un menú QR para restaurantes es el código QR imprimible en la mesa que los clientes escanean con la cámara del móvil para abrir la carta en el navegador — sin app que instalar. Con IQ Rest el menú QR incluye pedidos en mesa, reservas 24/7 y traducción IA a 35 idiomas, todo actualizado desde el móvil.",
      },
      {
        q: "¿Cuánto cuesta un menú QR para restaurantes?",
        a: "6,90 €/mes, todo incluido. QR ilimitados para cada mesa, editor completo, pedidos directos sin comisión, traducción IA a 35 idiomas, reservas y analítica. 14 días gratis, sin tarjeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Menú QR para restaurantes.",
    headingAccent: "Listo en 5 minutos.",
    sub: "14 días gratis. Sin tarjeta. Más de 500 restaurantes ya usan su menú QR en IQ Rest.",
  },

  meta: {
    title: "Menú QR para Restaurantes — Listo en 5 Min | IQ Rest",
    description: "Menú QR para restaurantes: código QR en cada mesa, pedidos directos sin comisión, traducción IA a 35 idiomas. Listo en 5 minutos, 14 días gratis.",
    canonical: "https://iq-rest.com/es/lp/menu-qr-para-restaurantes",
    ogLocale: "es_ES",
    ogTitle: "Menú QR para Restaurantes — Listo en 5 Minutos",
    ogDescription: "Menú QR con pedidos directos, 35 idiomas IA y reservas. Listo en 5 minutos — 14 días gratis.",
  },
};
