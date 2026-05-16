import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /es, tuned for the PHRASE keyword "carta digital para
// restaurante". Inherits content from the indexed /es page and only
// overrides what should differ for the Google Ads landing: meta
// (canonical + og), microcopy with entry price, and hero/founder/faq/
// finalCta copy that hammers the exact phrase for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — the Ads crawler reads `headline` as the keyword phrase.
    // Browsers also see this for one frame before the rotator boots, so
    // hydration matches and there is no flicker on the keyword form.
    headline: "Carta digital para restaurante",
    sub: "500+ restaurantes españoles sirven más mesas, venden más a turistas y eliminan comisiones. Online en 5 minutos — 14 días gratis.",
    // Mobile renders these as an infinite-scroll marquee, desktop as a
    // static row. They advertise what ships with the system, not venue
    // types — the H1 already covers verticals via the accent-word rotator.
    verticals: [
      "Pedidos online",
      "Reservas",
      "Traducción IA",
      "Escáner carta",
      "Alérgenos",
      "Diseño premium",
      "Analytics",
    ],
    // Second-line accent disabled — the H1 already swaps the last word.
    dynamicHeadlines: [],
    // After hydration the H1 last word cycles through these in order. Order
    // matches venue popularity in Spain. The first item must equal
    // `accentWord` so the initial frame keeps the keyword phrase intact.
    headlinePrefix: "Carta digital para ",
    accentWord: "restaurante",
    accentWordRotation: [
      "restaurante",
      "bar",
      "cafetería",
      "pizzería",
      "taberna",
      "marisquería",
    ],
    headlineSuffix: "",
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Editor de carta digital creado por un hostelero",
    quoteStart:
      "Mi mujer y yo abrimos una cafetería y pasamos semanas buscando una carta digital para restaurante que gestionara también pedidos en mesa y reservas, sin ser pesada ni fea —",
    quoteAccent: "así que construimos la carta digital que nos habría gustado tener.",
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
        q: "¿Qué es una carta digital para restaurante?",
        a: "Una carta digital para restaurante es la versión online de la carta en papel: el cliente escanea un código QR sobre la mesa con la cámara y accede al instante a platos, fotos, alérgenos y precios en el navegador, sin descargar ninguna app. Con IQ Rest la carta digital para restaurante incluye también pedidos directos en mesa, reservas 24/7 y traducción IA a 35 idiomas — actualizas todo desde el móvil en tiempo real.",
      },
      {
        q: "¿Cuánto cuesta una carta digital para restaurante?",
        a: "6,90€/mes todo incluido (descuento en el plan anual). Editor completo, código QR ilimitado, pedidos directos sin comisiones, traducción IA a 35 idiomas, reservas y analytics. 14 días de prueba gratis, sin tarjeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Carta digital para restaurante.",
    headingAccent: "Lista en 5 minutos.",
    sub: "14 días gratis. Sin tarjeta. Únete a 500+ restaurantes que usan la carta digital de IQ Rest.",
  },

  meta: {
    title: "Carta Digital para Restaurante — Lista en 5 Min | IQ Rest",
    description:
      "Carta digital para restaurante: código QR imprimible, pedidos directos sin comisiones, traducción IA a 35 idiomas. Lista en 5 minutos, 14 días gratis.",
    canonical: "https://iq-rest.com/es/lp/carta-digital-para-restaurante",
    ogLocale: "es_ES",
    ogTitle: "Carta Digital para Restaurante — Lista en 5 Minutos",
    ogDescription:
      "Carta digital para restaurante con código QR, pedidos directos y 35 idiomas con IA. Online en 5 minutos — 14 días gratis.",
  },
};
