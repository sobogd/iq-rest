import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Carta de restaurante con tu marca — Esquema de color y tema personalizados",
    description:
      "Adapta la marca de tu restaurante con colores de acento personalizados. Modos claro y oscuro automáticos según el móvil. Carta QR con tu marca en segundos.",
    canonical: "https://iq-rest.com/es/color-scheme",
    ogLocale: "es_ES",
    ogTitle: "Esquema de color personalizado — Carta de restaurante con tu marca en segundos",
    ogDescription:
      "Elige tu color de acento, ten una carta de restaurante con tu marca. Modo claro/oscuro automático según el móvil de cada cliente. Sin herramientas de diseño.",
  },

  hero: {
    title: "Tu carta. Tus colores. Tu marca.",
    subtitle:
      "Elige un color de acento, sube tu logo, y tu menú QR parece al instante una marca real en lugar de una plantilla. Los modos claro y oscuro se cambian automáticamente con el móvil de cada cliente — tu carta siempre se ve intencional.",
    trustLine: "4,9 · más de 500 restaurantes en más de 30 países",
  },

  seo: {
    description:
      "Un esquema de color personalizado es la diferencia entre un menú QR genérico y una experiencia de marca de restaurante. IQ Rest te permite elegir tu color de acento exacto (o pegar un código hex de tu manual de marca), subir tu logo, y toda la carta — botones, enlaces, destacados, etiquetas de categoría — adopta tu color de marca en segundos.",
    fullDescription:
      "La mayoría de constructores de menú QR te dan un esquema de color fijo: azul o rojo, lo tomas o lo dejas. IQ Rest trata tu marca como lo que es — elige cualquier color de acento desde un selector o pega tu código hex exacto del manual de marca (el mismo naranja de tu rótulo, el mismo verde de tu logo). Cada acento de la carta — botones primarios, enlaces, destacados de categoría, estado activo en el selector de idioma — adopta ese color al instante.\n\nLos modos claro y oscuro se gestionan automáticamente. Cuando el móvil de un cliente está en modo oscuro (la mayoría a la hora de la cena), tu carta se muestra en oscuro con tu color de acento más vivo. Cuando están al sol en modo claro, la carta se adapta. Tú no eliges claro u oscuro — eliges un color de marca y la carta hace lo correcto en cada dispositivo.\n\nTu logo aparece en la parte de arriba de la carta, en la plantilla de impresión de la pegatina QR, en el recibo del pedido y en el email de confirmación de reserva. Cada punto de contacto con el cliente se siente como la misma marca porque es la misma marca. Sin diseñador, sin sesión de Photoshop, sin un caro 'pack de branding para restaurante' — solo un selector de color y subida de logo.",
    benefitsHeading: "Por qué un esquema de color con marca convierte mejor que un tema por defecto",
    benefits: [
      "Elige cualquier color de acento — selector o pega un código hex",
      "Modo claro/oscuro automático según el móvil de cada cliente",
      "Logo en carta, pegatina QR, recibos y emails",
      "Imagen con marca desde el primer minuto — sin Photoshop ni diseñador",
      "Cambia colores cuando quieras para promos estacionales (rojo San Valentín, verde Navidad)",
      "El color se mantiene accesible — los ratios de contraste se ajustan automáticamente",
    ],
  },

  pricing: {
    heading: "Un plan.",
    headingAccent: "Tus colores de marca.",
    sub: "Esquema de color personalizado más menú QR, pedidos online, traducción con IA y reservas — todo en un precio único. Branding sin diseñador.",
  },

  faq: {
    sub: "Todo lo que los hosteleros preguntan sobre poner marca a la carta. ¿No ves la tuya? Escríbenos por WhatsApp — responden personas reales.",
    items: [
      {
        q: "¿Puedo igualar el color exacto de mi logo o rótulo?",
        a: "Sí — pega tu código hex exacto (p. ej., #C24A2D) y la carta usa exactamente ese color en cada acento. Generamos automáticamente un tono más oscuro para hovers y otro más claro para fondos, así un solo color de marca te da una paleta UI completa sin que hagas nada.",
      },
      {
        q: "¿La carta soporta modo claro y oscuro?",
        a: "Sí, automáticamente. La carta detecta el tema del móvil de cada cliente y cambia entre claro y oscuro en tiempo real. Tu color de acento se mantiene; el resto de la UI se invierte. La mayoría de restaurantes nunca configuran claro vs oscuro — eligen un color y dejan que la carta se adapte.",
      },
      {
        q: "¿Puedo cambiar el esquema de color más adelante?",
        a: "Cuando quieras. Abre los ajustes de diseño, elige un color nuevo, guarda. Cada página de tu menú QR, flujo de reservas y UI de pedidos se actualiza en segundos. Útil para promos estacionales (rojo San Valentín, verde Navidad, dorado Año Nuevo) — cambia una semana, vuelve a tu color.",
      },
      {
        q: "¿Dónde aparece mi logo?",
        a: "En la parte de arriba de tu menú QR (junto al nombre del restaurante), en la plantilla de impresión de la pegatina QR (para que la pegatina de las mesas case con tu marca), en los recibos de pedido y en los emails de confirmación de reserva. Súbelo una vez en PNG o SVG y se usa en todo automáticamente.",
      },
      {
        q: "¿Y si mi color de marca es difícil de leer sobre el fondo de la carta?",
        a: "El sistema verifica automáticamente el contraste y oscurece o aclara suavemente tu color para casos de uso de texto (para que un amarillo pálido no aparezca como texto ilegible), manteniendo tu color exacto en acentos como botones y destacados. No tienes que pensar en WCAG — la carta lo hace por ti.",
      },
    ],
  },

  finalCta: {
    heading: "Elige un color.",
    headingAccent: "Parece una marca real.",
    sub: "Esquema de color personalizado, recibos con marca, modo claro/oscuro automático. 14 días gratis, sin diseñador, sin tarjeta.",
  },
};
