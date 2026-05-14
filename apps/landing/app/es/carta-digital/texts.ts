import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

const D = DEFAULT.features.items;

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  ctaText: "Crear mi carta digital",
  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  meta: {
    title: "Carta Digital para Restaurantes — Crear en 5 Min | IQ Rest",
    description:
      "Crear carta digital para restaurante en 5 minutos. Editor móvil, código QR para las mesas, pedidos directos sin comisiones, 35 idiomas. 14 días gratis, sin tarjeta.",
    canonical: "https://iq-rest.com/es/carta-digital",
    ogLocale: "es_ES",
    ogTitle: "Carta Digital para Restaurantes — Crear en 5 Min",
    ogDescription:
      "Carta digital para tu restaurante: edita desde el móvil, código QR para las mesas, pedidos directos. Lista en 5 minutos.",
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Editor de carta digital creado por un hostelero",
  },

  hero: {
    ...DEFAULT.hero,
    verticals: ["Restaurantes", "Tabernas", "Pizzerías", "Cafeterías", "Bares de tapas", "Asadores"],
    headline: "Carta Digital para Restaurantes.",
    sub:
      "Crear la carta digital de tu restaurante desde el móvil, en 5 minutos. Editor sin código, escaneo IA del menú en papel, código QR imprimible para las mesas y pedidos directos. Sin comisiones, sin agencias.",
    dynamicHeadlines: [
      "Carta digital en 5 minutos.",
      "Editor desde el móvil.",
      "Código QR para las mesas.",
      "Pedidos directos.",
      "35 idiomas con IA.",
    ],
    painBullets: [
      "Crear carta digital sin programadores: editor móvil con drag-and-drop.",
      "Escanea tu carta en papel: la IA digitaliza platos, precios y categorías en 60 segundos.",
      "Carta digital para restaurante con código QR único o uno por mesa.",
      "Pedidos directos sin comisiones de delivery: cada euro entra en caja.",
    ],
  },

  features: {
    ...DEFAULT.features,
    heading: "Todo lo que necesitas para",
    headingAccent: "crear la carta digital.",
    sub: "Una plataforma pensada para hosteleros, no para programadores.",
    items: [
      {
        Icon: D[4].Icon,
        title: "Crear carta digital desde el móvil",
        desc: "Editor con drag-and-drop: añades platos con un toque, reordenas con arrastre, publicas con un swipe. Sin HTML, sin instalaciones.",
        tag: "Editor móvil",
      },
      {
        Icon: D[0].Icon,
        title: "Escaneo IA del menú en papel",
        desc: "Subes una foto o un PDF de tu carta y la IA extrae categorías, platos y precios en 60 segundos. Te ahorras horas de transcripción.",
        tag: "Importación IA",
      },
      {
        Icon: D[1].Icon,
        title: "Carta digital multilingüe",
        desc: "Tu carta digital traducida a 35 idiomas con IA gastronómica. Los turistas leen los platos en su idioma y comprenden lo que piden.",
        tag: "35 idiomas",
      },
      D[3],
      D[2],
      D[5],
    ],
  },

  how: {
    ...DEFAULT.how,
    heading: "Crear tu carta digital en 4 pasos",
  },

  pricing: {
    ...DEFAULT.pricing,
    badge: "Carta digital sin límites · Cero comisiones",
    heading: "Un plan para crear",
    headingAccent: "tu carta digital.",
    sub: "Crea la carta digital, genera código QR, recibe pedidos directos, traduce con IA y gestiona reservas. Precio simple, factura mensual o anual.",
  },

  faq: {
    ...DEFAULT.faq,
    heading: "Preguntas sobre la",
    headingAccent: "carta digital.",
    sub: "Lo que los hosteleros preguntan antes de crear la carta digital. ¿No ves la tuya? Escríbenos por WhatsApp.",
    items: [
      {
        q: "¿Cómo crear una carta digital para un restaurante?",
        a: "En 5 minutos. Registras la cuenta, eliges el tipo de local, importas la carta en papel con escaneo IA (60 segundos) o añades los platos manualmente, personalizas colores y fotos y descargas el código QR para imprimir en las mesas. Todo desde el móvil, sin programadores ni agencias.",
      },
      {
        q: "¿Cuánto cuesta crear una carta digital?",
        a: "6,90€/mes con todo incluido (o descuento al pagar anual). Editor completo, código QR ilimitado, pedidos directos sin comisiones, traducción IA a 35 idiomas, reservas y analítica. 14 días de prueba gratis, sin tarjeta.",
      },
      {
        q: "¿Cuál es la diferencia entre carta digital y menú digital?",
        a: "Son lo mismo conceptualmente: la versión online de la carta del restaurante, accesible mediante código QR o enlace. En España \"carta\" es el término tradicional para la lista de platos y bebidas, mientras que \"menú\" suele referirse al menú del día o al menú degustación. IQ Rest gestiona ambos formatos en la misma plataforma.",
      },
      {
        q: "¿Puedo crear varias cartas digitales (comida, bebidas, postres)?",
        a: "Sí. Puedes crear cartas separadas con horarios distintos (carta de comidas, carta de noches, carta de vinos, menú del día solo de 13:00 a 16:00) o cartas distintas para terraza, sala interior, eventos o delivery. Los clientes ven automáticamente la carta correcta según la hora y el QR escaneado.",
      },
      {
        q: "¿Necesito conocimientos técnicos para crear la carta digital?",
        a: "Cero. El editor funciona como una app de redes sociales: tocas para añadir un plato, arrastras para reordenar, deslizas para publicar. Si sabes usar WhatsApp e Instagram, ya sabes crear tu carta digital con IQ Rest.",
      },
      {
        q: "¿Cómo modifico la carta digital después de crearla?",
        a: "En tiempo real, desde el móvil. Cambias un precio y los clientes lo ven en segundos. Activas la stop-list de un plato agotado y desaparece de la carta inmediatamente. Sin reimpresiones, sin esperas, sin depender de nadie.",
      },
      {
        q: "¿La carta digital se puede traducir automáticamente?",
        a: "Sí, a 35 idiomas con IA gastronómica. Creas la carta en español, activas las traducciones con un toque y la IA genera nombres y descripciones culturalmente correctos en cada idioma. Nada de traducciones literales: \"tortilla\" se traduce con contexto, igual que \"jamón ibérico\" o \"pulpo a la gallega\".",
      },
      {
        q: "¿Puedo crear la carta digital para varios restaurantes a la vez?",
        a: "Sí. Desde un único panel gestionas varios locales (grupos, cadenas, restaurantes de temporada). Cada restaurante tiene su propia carta digital, su código QR, sus reservas y su analítica. Plan dedicado para grupos bajo consulta.",
      },
      {
        q: "¿Qué pasa con mi carta digital después de los 14 días gratis?",
        a: "Si no añades método de pago, la cuenta se pausa — nunca cobramos automáticamente. La carta digital queda guardada; añade los datos de pago cuando quieras para reactivarla. Cancelas con un clic, sin permanencia.",
      },
    ],
  },

  finalCta: {
    heading: "Empieza a crear tu carta digital.",
    headingAccent: "Lista en 5 minutos.",
    sub: "14 días gratis, sin tarjeta. Cancela cuando quieras. Únete a más de 500 hosteleros que crearon su carta digital con IQ Rest.",
  },

  scan: {
    heading: "¿Ya tienes una carta en papel o PDF?",
    headingAccent: "La IA la convierte en carta digital en 60 segundos.",
    sub: "Sube una foto — la IA extrae categorías, platos y precios y los importa directamente al editor.",
    cta: "Escanear mi carta →",
  },
};
