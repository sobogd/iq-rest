import {
  Languages,
  ShieldAlert,
  Palette,
  ShoppingCart,
  CalendarCheck,
  MonitorSmartphone,
} from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "es",
  slug: "menu-digital-restaurantes",
  trackPrefix: "l_es_digital",
  hideFeatureHeading: true,

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
    headline: "Una carta digital\nque lo tiene todo",
    cta: "Crear menú digital",
    sub: "Fotos, alérgenos y traducción a 35 idiomas. Además pedidos, WhatsApp y reserva de mesa — todo en un solo IQ Rest.",
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
      heading: "35 idiomas que todos leen",
      body: "Un QR, 35 idiomas. La IA traduce con contexto culinario, así cada plato suena natural. Los turistas piden sin dudar.",
      bullets: [
        "35 idiomas en tu plan",
        "IA culinaria, no Google",
        "Cambio de idioma en un toque",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dos comensales leen la misma carta digital en idiomas distintos desde sus propios móviles" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alérgenos",
      heading: "Alérgenos y dietas en cada plato",
      body: "Etiqueta gluten, lactosa, frutos secos, vegano y sin gluten. Los comensales filtran la carta a su dieta y piden sin problema.",
      bullets: [
        "14 categorías de alérgenos",
        "Etiquetas vegano y sin gluten",
        "Filtran por su dieta",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Comensal filtra la carta por alérgenos en el móvil mientras el propietario edita la lista de alérgenos en una tableta" },
    },
    {
      icon: Palette,
      eyebrow: "Diseño y marca",
      heading: "Carta premium en tu dominio",
      body: "Vídeo de bienvenida, tu propio diseño y una página de contacto con mapa y redes — en tu propio dominio, no un PDF.",
      bullets: [
        "Vídeo y diseño premium",
        "Tu dominio con SSL",
        "Contacto, mapa y redes",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos móviles sobre una mesa de cafetería: pantalla principal de la carta con vídeo de fondo y página de contacto con mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos",
      heading: "Pedidos online, cero comisión",
      body: "Los comensales piden desde la carta o directo a tu WhatsApp — llega a la sala o la cocina, con un 0% sobre las ventas.",
      bullets: [
        "Desde la carta o WhatsApp",
        "A sala o cocina, 0%",
        "Actívalo en los ajustes",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dos móviles sobre una mesa: cesta con el pedido y pantalla de pedido enviado" },
    },
    {
      icon: CalendarCheck,
      eyebrow: "Reservas",
      heading: "Reserva de mesa, 24/7",
      body: "Los comensales reservan mesa desde la carta o un enlace, tú ves el calendario por mesa y confirmas auto o manual.",
      bullets: [
        "Reservan ellos mismos",
        "Calendario por mesa",
        "Confirmación auto o manual",
      ],
    },
    {
      icon: MonitorSmartphone,
      eyebrow: "Gestión",
      heading: "Gestiónala desde donde estés",
      body: "El panel funciona en cualquier navegador — móvil, tableta o PC. Nada que instalar, y una carta básica se publica en minutos.",
      bullets: [
        "Cualquier equipo y navegador",
        "Nada que instalar",
        "Publica en minutos",
      ],
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
