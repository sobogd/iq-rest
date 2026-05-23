import { Languages, ShieldAlert, Palette, ShoppingCart } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "es",
  slug: "codigo-qr-restaurante",
  trackPrefix: "l_es_qr",

  meta: {
    title: "Código QR para restaurantes | IQ Rest",
    description:
      "Código QR para restaurantes: el comensal escanea el QR de la mesa, abre la carta en el navegador y pide en su idioma. 14 días gratis, sin tarjeta.",
    canonical: "https://iq-rest.com/es/codigo-qr-restaurante",
    ogLocale: "es_ES",
    ogTitle: "Código QR para restaurantes",
    ogDescription:
      "QR en la mesa, carta en el móvil — fotos, alérgenos, 35 idiomas y actualizaciones en tiempo real.",
    brandLine: "IQ Rest — Código QR para restaurantes",
  },

  hero: {
    headline: "Código QR para restaurantes.",
    sub: "El comensal enfoca el código QR de la mesa y la carta se abre al instante en el navegador del móvil: fotos de los platos, alérgenos, precios siempre al día y traducción automática a 35 idiomas. Sin descargar aplicaciones, sin reimprimir cartas cada vez que cambia un precio.",
  },

  scan: {
    heading: "¿Ya tienes una carta en papel o en PDF?",
    headingAccent: "La IA la convierte en código QR en 60 segundos.",
    sub: "Sube una foto de la carta o el PDF — la IA extrae categorías, platos y precios y los conecta de inmediato al menú del código QR.",
    cta: "Crear el menú QR",
  },

  subFeatures: [
    {
      icon: Languages,
      eyebrow: "Un QR, 35 idiomas",
      heading: "Un único código QR, la carta en 35 idiomas.",
      body: "El comensal escanea el QR y elige su idioma: la traducción la gestiona una IA con criterio gastronómico, no un traductor genérico. Olvídate de cartas distintas para turistas y de hojas sueltas sobre la mesa.",
      bullets: [
        "Una sola impresión del QR cubre 35 idiomas, incluidos en la suscripción.",
        "La IA entiende el lenguaje culinario — los nombres suenan naturales en cada idioma.",
        "El comensal cambia de idioma dentro de la carta, sin reescanear el QR.",
      ],
      image: { src: "/landing/feature-multilang.webp", alt: "Dos comensales escanean el mismo código QR de la mesa y leen la carta en idiomas distintos" },
    },
    {
      icon: ShieldAlert,
      eyebrow: "Alérgenos en el QR",
      heading: "Alérgenos y etiquetas dietéticas dentro de la carta QR.",
      body: "Cada plato de la carta conectada al QR puede llevar etiquetas de gluten, lactosa, frutos secos, marisco, opciones veganas y sin gluten. El comensal filtra desde el móvil los platos compatibles con sus restricciones, sin tener que preguntar al personal.",
      bullets: [
        "14 categorías de alérgenos a nivel de plato.",
        "Etiquetas vegano, vegetariano y sin gluten con un clic en el panel.",
        "El comensal filtra el menú QR según sus restricciones.",
      ],
      image: { src: "/landing/feature-allergens.webp", alt: "Comensal filtra el menú QR por alérgenos en el móvil mientras el propietario edita la lista desde una tableta" },
    },
    {
      icon: Palette,
      eyebrow: "Más que un simple QR",
      heading: "Una carta con QR cuidada como la web del restaurante.",
      body: "Tras escanear el código, el comensal no se topa con un PDF plano: ve una pantalla de bienvenida con vídeo o foto destacada, la descripción del local y una página de contacto con mapa, teléfonos y redes sociales. El QR se convierte en la puerta de entrada al restaurante online.",
      bullets: [
        "Vídeo de fondo o foto destacada en la pantalla inicial del menú QR.",
        "Espacio para contar el concepto del local y de cada categoría.",
        "Página de contacto integrada: mapa, teléfono, Instagram, WhatsApp.",
      ],
      image: { src: "/landing/feature-design.webp", alt: "Dos móviles sobre una mesa: pantalla inicial del menú QR con vídeo de fondo y página de contacto con mapa" },
    },
    {
      icon: ShoppingCart,
      eyebrow: "Pedidos desde el QR · opcional",
      heading: "Desde el código QR el comensal también puede pedir.",
      body: "Además de consultar la carta, el menú QR puede convertirse en un canal de pedidos: el comensal añade los platos a la cesta y envía la solicitud. El pedido llega al camarero en sala, a WhatsApp o a la pantalla de cocina. La función se activa o desactiva en los ajustes cuando hace falta.",
      bullets: [
        "Cesta, comentarios y envío del pedido directamente desde el escaneo del QR.",
        "El pedido llega al instante a sala, WhatsApp o pantalla de cocina.",
        "Función activable por horarios, salas o restaurantes concretos.",
      ],
      image: { src: "/landing/feature-ordering.webp", alt: "Dos móviles sobre una mesa: cesta creada desde el menú QR y confirmación de pedido enviado" },
    },
  ],

  faq: {
    sub: "Lo que los restauradores preguntan sobre el menú con código QR de IQ Rest. ¿No encuentras tu pregunta? Escríbenos por WhatsApp.",
    items: [
      { q: "¿Cómo funciona el menú con código QR de IQ Rest?", a: "Cada mesa lleva un código QR impreso. El comensal lo escanea con la cámara del móvil y el navegador abre el menú del restaurante — fotos, descripciones, alérgenos y precios actualizados. No hace falta descargar ninguna aplicación, ni para el cliente ni para el personal." },
      { q: "¿Necesito conocimientos técnicos para crear la carta QR?", a: "No. El panel funciona con clics y arrastrar y soltar, sin código ni configuraciones complicadas. Añadir un plato lleva unos segundos: nombre, precio, foto. La configuración inicial suele llevar entre 30 minutos y una hora; si ya tienes un PDF del menú, la IA lo convierte automáticamente." },
      { q: "¿Los comensales tienen que instalar una app para leer el QR?", a: "No. La cámara nativa de iPhone y Android reconoce el código QR en segundos y abre el menú directamente en el navegador. El panel de administración también funciona desde cualquier navegador moderno — móvil, tableta o portátil." },
      { q: "¿Cómo se imprimen los códigos QR para las mesas?", a: "Los códigos QR se generan automáticamente en el panel (uno por mesa o uno único para todo el local) y se descargan en PDF listos para imprimir. Basta con una impresora de oficina y un soporte: caballete, pegatina o posavasos." },
      { q: "¿Puedo usar un dominio propio para el menú QR?", a: "Sí. Admitimos un dominio del restaurante con certificado SSL (por ejemplo carta.turestaurante.es): cuando el comensal escanea el QR ve la dirección de tu restaurante en lugar de un subdominio genérico. La configuración DNS lleva 5–10 minutos y te acompañamos en el proceso." },
      { q: "¿Puedo gestionar los QR de varios restaurantes desde una sola cuenta?", a: "Sí, bajo petición. Una cuenta puede agrupar varios locales, cada uno con sus propios códigos QR, carta, diseño y analíticas. Escríbenos por WhatsApp y activamos el modo multirrestaurante." },
      { q: "¿Es complicado lanzar el menú QR desde cero?", a: "Tres pasos: (1) crea las categorías; (2) añade los platos con nombre, precio y foto; (3) imprime los QR y colócalos en las mesas. Si ya tienes una carta en papel o un PDF, súbelo — la IA reconoce categorías y precios y rellena las fichas. Una carta básica puede estar online en 5 minutos." },
    ],
  },
};
