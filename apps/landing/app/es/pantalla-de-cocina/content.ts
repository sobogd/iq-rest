import { LayoutGrid, Timer } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "es",
  slug: "pantalla-de-cocina",
  trackPrefix: "l_es_kds",

  meta: {
    title: "Pantalla de cocina (KDS) para restaurantes | IQ Rest",
    description:
      "Pantalla de cocina KDS para restaurantes: los pedidos de sala y de la carta QR llegan al instante a la pantalla del chef. Columnas por mesa, estados Pendiente / En cocción / Listo / Servido, filtros por zona. Funciona en tableta o móvil.",
    canonical: "https://iq-rest.com/es/pantalla-de-cocina",
    ogLocale: "es_ES",
    ogTitle: "Pantalla de cocina (KDS) — Pedidos a la pantalla del chef",
    ogDescription:
      "Pedidos de sala en la pantalla del chef. Columnas por mesa, estados y temporizador. Un toque cambia el estado.",
    brandLine: "IQ Rest — Pantalla de cocina para restaurantes",
  },

  hero: {
    headline: "Pantalla de cocina: los pedidos directos a la pantalla del chef.",
    sub: "Adiós a los tickets de papel. Los pedidos de sala o de la carta QR llegan al instante a la pantalla de la cocina — con comentarios, alérgenos y temporizador. Un solo toque cambia el estado. Funciona tanto en una tableta en el pase como en el móvil del jefe de cocina.",
    imageSrc: "/landing/feature-kitchen.webp",
    imageAlt: "Cocina profesional con una tableta sobre un soporte de latón mostrando la pantalla de cocina con los pedidos activos",
  },

  scan: {
    heading: "Pon en marcha la pantalla de cocina",
    headingAccent: "en 5 minutos.",
    sub: "Sube la carta en papel o en PDF — la IA reconoce platos, categorías y alérgenos. Conecta una tableta en la cocina y empieza a recibir pedidos.",
    cta: "Escanear carta",
  },

  subFeatures: [
    {
      icon: LayoutGrid,
      eyebrow: "Control y filtros",
      heading: "Varias pantallas por zonas: cocina y barra.",
      body: "Coloca tabletas independientes en la cocina caliente, en la barra o en la sección de postres — cada pantalla muestra solo los platos que le corresponden. Los filtros por estado (Pendiente / En cocción / Listo / Servido) y por categoría retiran el ruido de la pantalla: el cocinero ve únicamente lo que afecta a su sección.",
      bullets: [
        "Varias pantallas KDS con filtro por categoría de platos.",
        "Filtro de estado: muestra solo «en cocción» y «listo».",
        "Cada zona ve solo su propio flujo de pedidos.",
      ],
      image: { src: "/landing/feature-kds-filters.webp", alt: "Tableta sobre un soporte de latón en el pase de la cocina — KDS con filtro por estado de los platos" },
    },
    {
      icon: Timer,
      eyebrow: "Tarjetas y temporizador",
      heading: "Un toque cambia el estado. Comentarios y alérgenos resaltados en color.",
      body: "La tarjeta del plato muestra las opciones elegidas (sin cebolla, muy hecho), el comentario del comensal, los alérgenos y un temporizador desde que llegó el pedido. Al tocar la tarjeta el estado pasa al siguiente: Pendiente → En cocción → Listo → Servido. La lista se ordena automáticamente por prioridad de tiempo.",
      bullets: [
        "Tocar una tarjeta — cambio de estado al instante.",
        "Opciones, comentarios y alérgenos resaltados en color.",
        "Orden por prioridad: las líneas que más esperan suben arriba.",
      ],
      image: { src: "/landing/feature-kds-cards.webp", alt: "Tableta sobre un soporte de latón en la barra — KDS con tarjetas de pedidos por mesa" },
    },
  ],

  faq: {
    sub: "Lo que los restauradores preguntan sobre la pantalla de cocina de IQ Rest. ¿No encuentras tu pregunta? Escríbenos por WhatsApp.",
    items: [
      { q: "¿Qué estados tiene cada línea en la cocina?", a: "Cuatro estados con colores distintos en la tarjeta: Pendiente (gris) — el pedido está aceptado y a la espera; En cocción (naranja) — el plato está preparándose; Listo (azul) — listo para servir; Servido (verde) — entregado al comensal. Al tocar la tarjeta se pasa al siguiente estado, sin menús ni confirmaciones." },
      { q: "¿Se pueden poner varias pantallas KDS en zonas distintas?", a: "Sí. Una tableta en la cocina caliente, otra en la barra, otra en la sección de postres — cada una con su filtro por categoría. Todas las pantallas se sincronizan en tiempo real: un estado cambiado en una pantalla se actualiza en todas." },
      { q: "¿Qué hardware necesito para el KDS?", a: "El KDS es una aplicación web que funciona en cualquier navegador moderno. Para una cocina grande, una tableta en un soporte en el pase o una televisión en la pared. Para un local pequeño, basta con el móvil del jefe de cocina. No hace falta hardware especial ni instalación: se abre un enlace y se inicia sesión." },
      { q: "¿De dónde llegan los pedidos a la pantalla de cocina?", a: "De todas las fuentes: el comensal que pidió a través de la carta QR en la mesa, el camarero que tomó la comanda desde su móvil, el comensal que envió el pedido desde la web. Todos llegan al KDS con la etiqueta de origen y el número de mesa. Sin traspasos manuales desde un TPV." },
      { q: "¿Qué se muestra en la tarjeta de un pedido?", a: "El nombre del plato, los modificadores elegidos (sin cebolla, muy hecho, añadir salsa), el comentario del comensal, los alérgenos resaltados, el estado (Pendiente / En cocción / Listo / Servido) y un temporizador con el tiempo que lleva en cola. Las tarjetas se ordenan por prioridad: cuanto más tiempo esperando, más arriba." },
      { q: "¿Se pueden filtrar las tarjetas en pantalla?", a: "Sí. Hay dos filtros: por estado (por ejemplo mostrar solo Pendiente y En cocción, ocultar Servido) y por categoría (solo bebidas en la barra, solo platos calientes en la cocina). Los ajustes se guardan por dispositivo, así cada zona conserva su propio conjunto." },
    ],
  },
};
