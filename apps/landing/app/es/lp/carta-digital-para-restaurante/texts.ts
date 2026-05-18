import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../../texts";

// PPC variant of /es, tuned for the PHRASE keyword cluster
// "carta digital / carta digital restaurante / carta digital para
// restaurante / carta digital qr". Inherits content from the indexed
// /es page and only overrides what should differ for the Google Ads
// landing: meta (canonical + og), microcopy with entry price, and
// hero/founder/faq/finalCta copy that hammers "carta digital" + "QR"
// for ad relevance scoring.
export const TEXTS: LandingTexts = {
  ...DEFAULT,

  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  hero: {
    ...DEFAULT.hero,
    // SSR fallback — the Ads crawler reads `headline` as the keyword phrase.
    // Browsers also see this for one frame before the rotator boots, so
    // hydration matches and there is no flicker on the keyword form.
    headline: "Carta Digital para Restaurantes. Lista en 5 minutos.",
    sub: "Carta digital para tu restaurante en 5 minutos. Todo incluido: editor móvil sin código, escaneo IA del menú, código QR para mesas y pedidos directos sin comisiones.",
    // Mobile renders these as an infinite-scroll marquee, desktop as a
    // static row. They advertise what ships with the system, not venue
    // types — the H1 already covers verticals via the accent-word rotator.
    // Second-line accent disabled — the H1 already swaps the last word.
    dynamicHeadlines: [],
    // After hydration the H1 last word cycles through these in order. Order
    // matches venue popularity in Spain. The first item must equal
    // `accentWord` so the initial frame keeps the keyword phrase intact.
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Editor de carta digital QR creado por un hostelero",
    quoteStart:
      "Mi mujer y yo abrimos una cafetería y pasamos semanas buscando una carta digital QR para restaurante que gestionara también pedidos en mesa y reservas, sin ser pesada ni fea —",
    quoteAccent: "así que construimos la carta digital QR que nos habría gustado tener.",
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
        q: "¿Qué es una carta digital QR para restaurante?",
        a: "Una carta digital QR es la versión online de la carta en papel: el cliente escanea un código QR sobre la mesa con la cámara y accede al instante a platos, fotos, alérgenos y precios en el navegador, sin descargar ninguna app. Con IQ Rest la carta digital QR incluye también pedidos directos en mesa, reservas 24/7 y traducción IA a 35 idiomas — actualizas todo desde el móvil en tiempo real.",
      },
      {
        q: "¿Cuánto cuesta una carta digital para restaurante?",
        a: "6,90€/mes todo incluido (descuento en el plan anual). Editor completo de la carta digital, código QR ilimitado, pedidos directos sin comisiones, traducción IA a 35 idiomas, reservas y analytics. 14 días de prueba gratis, sin tarjeta.",
      },
      ...DEFAULT.faq.items,
    ],
  },

  finalCta: {
    ...DEFAULT.finalCta,
    heading: "Carta digital QR para restaurante.",
    headingAccent: "Lista en 5 minutos.",
    sub: "14 días gratis. Sin tarjeta. Únete a 500+ restaurantes que usan la carta digital QR de IQ Rest.",
  },

  features: {
    ...DEFAULT.features,
    heading: "",
    headingAccent: "",
    sub: "",
  },

  meta: {
    title: "Carta Digital QR para Restaurante — 5 Min | IQ Rest",
    description:
      "Carta digital QR para restaurante: código QR imprimible en cada mesa, pedidos directos sin comisiones, traducción IA a 35 idiomas. Lista en 5 minutos, 14 días gratis.",
    canonical: "https://iq-rest.com/es/lp/carta-digital-para-restaurante",
    ogLocale: "es_ES",
    ogTitle: "Carta Digital QR para Restaurante — 5 Minutos",
    ogDescription:
      "Carta digital QR con pedidos directos, 35 idiomas con IA y reservas. Online en 5 minutos — 14 días gratis.",
  },
};

// Conversion-focused alternating feature rows for this PPC LP. Each row
// gets a hero-style cinematic image on the left and a heading + body +
// bullets + CTA on the right. Order: reservations first, kitchen second.
export const FEATURE_ROWS = [
  {
    image: {
      src: "/landing/feature-reservation.webp",
      alt: "Anfitriona gestionando reservas desde una tablet en la entrada del restaurante",
    },
    eyebrow: "Reservas",
    heading: "Llena la sala mientras estás en la cocina.",
    body: "Reservas online 24/7 directamente en tu agenda. Cero llamadas, cero papel.",
    bullets: [
      "Calendario por mesa y turno.",
      "Confirmaciones y recordatorios automáticos.",
      "Reserva desde el QR de la mesa.",
    ],
    trackEvent: "land_feature_row_reservations_cta_click",
  },
  {
    image: {
      src: "/landing/feature-orders.webp",
      alt: "Camarero tomando un pedido en la mesa desde un smartphone con la app de pedidos",
    },
    eyebrow: "Pedidos en mesa",
    heading: "El camarero toma el pedido. Va directo a la cocina.",
    body: "Sin libreta, sin idas a la barra. Toca la mesa, marca los platos, listo.",
    bullets: [
      "Mapa visual de mesas en tiempo real.",
      "Comanda instantánea a cocina y caja.",
      "Modificadores, notas y alérgenos por plato.",
    ],
    trackEvent: "land_feature_row_orders_cta_click",
  },
  {
    image: {
      src: "/landing/feature-kitchen.webp",
      alt: "Cocina profesional con tablet en soporte de latón mostrando la pantalla de cocina",
    },
    eyebrow: "Pantalla de cocina",
    heading: "Del móvil del cliente a la pantalla del chef.",
    body: "Adiós tickets en papel. Pedidos por mesa, con notas y alérgenos, listos para preparar.",
    bullets: [
      "Columnas por mesa: Listo / En cocción / Servido.",
      "Alérgenos y notas destacados en cada plato.",
      "Sala, cocina y caja sincronizadas en tiempo real.",
    ],
    trackEvent: "land_feature_row_kitchen_cta_click",
  },
  {
    image: {
      src: "/landing/feature-multilang.webp",
      alt: "Dos huéspedes leyendo la misma carta digital en idiomas distintos desde sus teléfonos",
    },
    eyebrow: "35 idiomas con IA",
    heading: "Un QR. Cada huésped en su idioma.",
    body: "Traduce toda la carta a 35 idiomas con un toque. La IA entiende de gastronomía.",
    bullets: [
      "35 idiomas incluidos. Sin coste extra.",
      "Contexto culinario, no Google Translate.",
      "Idioma del cliente detectado automáticamente.",
    ],
    trackEvent: "land_feature_row_multilang_cta_click",
  },
  {
    image: {
      src: "/landing/feature-mobile.webp",
      alt: "Portátil y móvil sobre una mesa de cafetería editando el mismo plato del dashboard",
    },
    eyebrow: "Gestión móvil",
    heading: "Toda tu carta, en el bolsillo.",
    body: "Mismo panel en portátil, tablet y móvil. Cambios en directo en segundos.",
    bullets: [
      "Sin app que instalar — abre el navegador.",
      "Precios y fotos en un toque.",
      "Trabaja desde donde estés.",
    ],
    trackEvent: "land_feature_row_mobile_cta_click",
  },
] as const;
