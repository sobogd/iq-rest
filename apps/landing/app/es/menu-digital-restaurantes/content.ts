import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "es",
  slug: "menu-digital-restaurantes",
  trackPrefix: "l_es_digital",

  meta: {
    title: "Carta digital para restaurantes | IQ Rest",
    description:
      "Carta digital para restaurantes: carta online con fotos, alérgenos, traducción con IA y actualización de precios en tiempo real. 14 días gratis, sin tarjeta.",
    canonical: "https://iq-rest.com/es/menu-digital-restaurantes",
    ogLocale: "es_ES",
    ogTitle: "Carta digital para restaurantes",
    ogDescription:
      "Versión online de la carta en papel — fotos, alérgenos, traducción con IA y actualizaciones en tiempo real.",
    brandLine: "IQ Rest — Carta digital para restaurantes",
  },

  hero: {
    headline: "Carta digital para restaurantes.",
    cta: "Crear menú digital",
    sub: "Versión online de la carta en papel con fotos, alérgenos, descripciones y actualización de precios en tiempo real. Los comensales ven la carta en su propio idioma; el restaurante ahorra en impresión.",
  },

  scan: {
    heading: "¿Tienes la carta en papel o en PDF?",
    headingAccent: "La IA la digitaliza en 60 segundos.",
    sub: "Sube una foto o un documento — la IA reconoce categorías, platos y precios automáticamente.",
    cta: "Escanear carta",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "35 idiomas con IA",
      heading: "35 idiomas con IA — cada comensal lee la carta en el suyo.",
      body: "Un único QR, 35 idiomas. La IA tiene en cuenta el contexto gastronómico — los nombres y las descripciones suenan naturales. Los turistas piden con más confianza y el ticket medio sube sin que un camarero tenga que ir traduciendo plato a plato.",
      bullets: [
        "35 idiomas incluidos en la suscripción, sin sobrecoste.",
        "IA con sensibilidad culinaria, no es Google Translate sin más.",
        "El comensal cambia el idioma con un solo toque dentro de la carta.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dos comensales leen la misma carta digital en idiomas distintos desde sus móviles" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alérgenos",
      heading: "Alérgenos y etiquetas dietéticas.",
      body: "Marca los platos con gluten, lactosa, frutos secos, marisco, opciones veganas y sin gluten. Los comensales filtran la carta según sus restricciones y piden con mayor tranquilidad.",
      bullets: [
        "14 categorías estándar de alérgenos en cada plato.",
        "Etiquetas vegano, vegetariano y sin gluten con un clic.",
        "El comensal filtra la carta según sus restricciones.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Comensal filtra la carta por alérgenos en el móvil mientras el propietario edita la lista de alérgenos en una tableta" },
    },
    {
      icon: Palette,
      eyebrow: "Diseño premium",
      heading: "Diseño premium con vídeo de fondo y página de contacto.",
      body: "Un vídeo o una fotografía en la pantalla de bienvenida, la descripción del restaurante, una página de contacto con mapa, teléfonos y redes sociales. La carta digital se ve como la web del restaurante, no como un PDF detrás de un QR.",
      bullets: [
        "Vídeo de fondo o foto destacada en la pantalla principal.",
        "Descripción del restaurante y de las categorías — explica el concepto.",
        "Página de contacto: mapa, teléfono, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos móviles sobre una mesa de cafetería: pantalla principal de la carta con vídeo de fondo y página de contacto con mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos desde la carta · opcional",
      heading: "El comensal hace el pedido directamente desde la carta.",
      body: "El comensal arma su cesta en la carta QR y envía el pedido — llega al camarero en sala o a la tableta de la cocina. La función puede activarse o desactivarse en los ajustes en cualquier momento.",
      bullets: [
        "Cesta, comentarios y envío del pedido con un solo toque.",
        "El pedido llega al instante al panel, a WhatsApp o a la pantalla de cocina.",
        "Función opcional, activable o desactivable en los ajustes.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dos móviles sobre una mesa: cesta con el pedido y pantalla de pedido enviado" },
    },
  ],

  faq: {
    sub: "Lo que los restauradores preguntan sobre la carta digital de IQ Rest. ¿No encuentras tu pregunta? Escríbenos por WhatsApp.",
    items: [
      { q: "¿Necesito conocimientos técnicos o experiencia con un CMS?", a: "No, no hace falta. Todas las acciones del panel se hacen con clics y arrastrar y soltar, sin código. Añadir un plato a la carta toma unos segundos: nombre, precio, foto. La configuración completa suele llevar entre 30 minutos y una hora." },
      { q: "¿Qué es la carta digital de IQ Rest?", a: "IQ Rest es una plataforma en la nube para restaurantes. La carta digital es la versión online de tu carta, accesible para los comensales mediante un código QR o un enlace directo: fotos de los platos, precios, alérgenos, traducción con IA en 35 idiomas y actualizaciones en tiempo real. La carta está alojada en nuestros servidores — no hay que instalar ni mantener nada, basta con abrir el navegador." },
      { q: "¿Los comensales necesitan una app o hardware especial?", a: "No. Enfocan la cámara del móvil al QR y la carta se abre en el navegador. El panel de administración funciona también en cualquier navegador moderno — móvil, tableta o portátil. Los QR se imprimen en una impresora de oficina." },
      { q: "¿Puedo usar mi propio dominio?", a: "Sí. Admitimos un dominio propio con certificado SSL: los comensales ven la carta en la dirección de tu restaurante (por ejemplo, carta.turestaurante.com). Te ayudamos con la configuración DNS; suele llevar 5–10 minutos." },
      { q: "¿Puedo gestionar varios restaurantes desde una sola cuenta?", a: "Sí, bajo petición. Una cuenta puede agrupar varios restaurantes: cada local con su propia carta, diseño, códigos QR y analíticas. Escríbenos por WhatsApp y activamos el modo multirrestaurante para tu grupo." },
      { q: "¿Es complicado montar la carta desde cero?", a: "La configuración tiene tres pasos: (1) crea las categorías; (2) añade los platos con nombre, precio y foto; (3) imprime los QR de las mesas. Si ya tienes una carta en papel o un PDF, súbelo — la IA reconoce categorías, nombres y precios y rellena las fichas automáticamente. Una carta básica se puede poner en marcha en 5 minutos; el tiempo de configuración completa depende del número de platos." },
      { q: "¿Qué tipo de soporte ofrecéis?", a: "Estamos disponibles por WhatsApp en horario laboral y respondemos rápido por correo. Te ayudamos con la configuración inicial, la conexión del dominio, el diseño de la carta y cualquier situación fuera de lo habitual. Si necesitas una demo o acompañamiento en el lanzamiento, escríbenos." },
    ],
  },
};
