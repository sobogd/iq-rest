import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

const D = DEFAULT.features.items;

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  ctaText: "Crea tu menú digital",
  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  meta: {
    title: "Menú Digital para Restaurantes — Online en 5 Min | IQ Rest",
    description:
      "Crea el menú digital de tu restaurante online en 5 minutos. Código QR imprimible para las mesas, pedidos directos sin comisiones, 35 idiomas con IA. 14 días gratis.",
    canonical: "https://iq-rest.com/es/menu-digital",
    ogLocale: "es_ES",
    ogTitle: "Menú Digital para Restaurantes — Online en 5 Min",
    ogDescription:
      "Menú digital online para tu restaurante. Código QR, pedidos directos, 35 idiomas con IA. Listo en 5 minutos.",
  },

  hero: {
    ...DEFAULT.hero,
    verticals: ["Restaurantes", "Bares", "Cafeterías", "Pizzerías", "Tabernas"],
    headline: "Menú Digital para Restaurantes.",
    sub:
      "Tu menú digital online para el restaurante, listo en 5 minutos. Código QR imprimible para las mesas, pedidos directos sin comisiones, reservas 24/7 y traducción IA a 35 idiomas.",
    dynamicHeadlines: [
      "Menú digital completo.",
      "Código QR para las mesas.",
      "Pedidos directos, cero comisiones.",
      "35 idiomas con IA.",
      "Reservas 24/7.",
    ],
    painBullets: [
      "Menú digital online: actualizas precios y platos en tiempo real.",
      "Cero comisiones: cada pedido del menú digital llega directo a ti.",
      "Traducción IA: 35 idiomas para que los turistas pidan más.",
      "Listo en 5 minutos: sin agencias, sin programadores.",
    ],
  },

  features: {
    ...DEFAULT.features,
    heading: "Qué incluye un menú digital",
    headingAccent: "completo.",
    sub: "Todo lo que tu restaurante necesita en una sola plataforma.",
    items: [
      {
        Icon: D[0].Icon,
        title: "Menú digital completo",
        desc: "Fotos, alérgenos, precios, variantes y descripciones en un menú digital que vive online y se actualiza en tiempo real.",
        tag: "Menú digital",
      },
      {
        Icon: D[4].Icon,
        title: "Editor móvil en tiempo real",
        desc: "Gestiona el menú digital desde el móvil: añade un plato, cambia un precio, activa la stop-list — visible para los clientes en segundos.",
        tag: "Editor",
      },
      {
        Icon: D[1].Icon,
        title: "Traducción IA (35 idiomas)",
        desc: "Tu menú digital habla el idioma de los huéspedes. La IA entiende de gastronomía: los turistas piden un 20% más cuando comprenden los platos.",
        tag: "Traducción IA",
      },
      D[2],
      D[3],
      D[5],
    ],
  },

  how: {
    ...DEFAULT.how,
    heading: "Crea tu menú digital en menos de 5 minutos",
  },

  pricing: {
    ...DEFAULT.pricing,
    badge: "Menú digital completo · Cero comisiones",
    heading: "Un plan para tu menú digital.",
    headingAccent: "Todo incluido.",
    sub: "Menú digital, código QR, pedidos directos, traducción IA y reservas. Un precio simple, facturado al mes o al año.",
  },

  faq: {
    ...DEFAULT.faq,
    heading: "Preguntas sobre el",
    headingAccent: "menú digital.",
    sub: "Lo que los hosteleros preguntan antes de pasar al menú digital. ¿No ves la tuya? Escríbenos por WhatsApp — contestan personas reales.",
    items: [
      {
        q: "¿Cómo crear un menú digital para el restaurante?",
        a: "En 5 minutos. Registras la cuenta, eliges el tipo de negocio, añades los platos (a mano o escaneando el menú en papel: la IA lo digitaliza en 60 segundos), personalizas colores y fotos y recibes el código QR imprimible para las mesas. Sin programadores, sin agencias — todo desde el móvil.",
      },
      {
        q: "¿Cuánto cuesta un menú digital online?",
        a: "Un plan único: 6,90€/mes (o descuento anual). Incluye menú digital completo, código QR ilimitado, pedidos directos sin comisiones, traducción IA a 35 idiomas, reservas y analítica. 14 días de prueba gratis, sin tarjeta.",
      },
      {
        q: "¿Puedo actualizar el menú digital en tiempo real?",
        a: "Sí. Cambias un precio desde el móvil y los clientes lo ven en segundos. Añades un plato, activas la stop-list, modificas una descripción — todo en vivo, sin reimpresiones y sin esperas.",
      },
      {
        q: "¿El menú digital soporta varios idiomas?",
        a: "35 idiomas con traducción IA integrada. Un toque traduce todo el menú digital y la IA entiende el contexto culinario: los nombres y descripciones suenan naturales en cada idioma. Los turistas piden más cuando entienden de verdad los platos.",
      },
      {
        q: "¿Los clientes necesitan una app para abrir el menú digital?",
        a: "Cero apps. El cliente apunta con la cámara al código QR y el menú digital se abre en el navegador al instante. Compatible con iPhone, Android y cualquier smartphone moderno.",
      },
      {
        q: "¿Cómo imprimo el código QR del menú digital para las mesas?",
        a: "Desde el panel descargas el código QR en PDF o PNG listo para imprimir. Funciona en papel, PVC, vinilo o expositor de mesa. Si cambias el menú, el código QR sigue siendo el mismo — no hace falta reimprimir nada.",
      },
      {
        q: "¿Puedo aceptar pedidos directamente desde el menú digital?",
        a: "Sí. Los clientes piden desde la mesa directamente en el menú digital, el pedido llega al instante a WhatsApp o al panel con el número de mesa. Servicio más rápido, menos errores, sin comisiones de Glovo / Uber Eats / Just Eat.",
      },
      {
        q: "¿Os lleváis comisión de los pedidos del menú digital?",
        a: "Cero. Cada pedido que llega de tu menú digital va directo a ti — sin nuestra parte, sin comisiones de terceros. Solo pagas la cuota mensual fija.",
      },
      {
        q: "¿Qué pasa con el menú digital tras los 14 días gratis?",
        a: "Si no añades un método de pago, la cuenta se pausa — nunca cobramos de forma automática. El menú digital permanece guardado; añade los datos de pago más tarde para reactivarlo. Cancelas con un clic.",
      },
    ],
  },

  finalCta: {
    heading: "Crea hoy tu menú digital.",
    headingAccent: "Gratis 14 días.",
    sub: "Sin tarjeta. Cancela cuando quieras. Únete a más de 500 restaurantes que usan el menú digital de IQ Rest.",
  },

  scan: {
    heading: "¿Ya tienes un menú en papel o PDF?",
    headingAccent: "La IA lo convierte en menú digital en 60 segundos.",
    sub: "Sube una foto — la IA extrae categorías, platos y precios y los importa a tu menú digital.",
    cta: "Escanear el menú →",
  },
};
