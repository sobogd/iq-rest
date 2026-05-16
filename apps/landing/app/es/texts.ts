import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /es targets the broad-match keyword "carta digital para restaurante".
// The PPC variant for Google Ads lives at
// /es/lp/carta-digital-para-restaurante with the same content + simplified
// footer (the older /es/lp/carta-digital 301s into it). /es/menu-digital,
// /es/qr-carta and the old /es/carta-digital 301 here to consolidate SEO
// weight.
export const TEXTS: LandingTexts = {
  htmlLang: "es",
  htmlDir: "ltr",

  meta: {
    title: "Carta Digital para Restaurantes — Crear en 5 Min | IQ Rest",
    description:
      "Crear carta digital para restaurante en 5 minutos. Editor móvil, código QR para las mesas, pedidos directos sin comisiones, 35 idiomas. 14 días gratis, sin tarjeta.",
    canonical: "https://iq-rest.com/es",
    ogLocale: "es_ES",
    ogTitle: "Carta Digital para Restaurantes — Crear en 5 Min",
    ogDescription:
      "Carta digital para tu restaurante: edita desde el móvil, código QR para las mesas, pedidos directos. Lista en 5 minutos.",
  },

  ctaText: "Crear mi carta digital",
  demoText: "Ver demo en vivo",
  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  header: {
    navFeatures: "Funciones",
    navHow: "Cómo funciona",
    navPricing: "Precios",
    navFaq: "FAQ",
    signIn: "Entrar",
    cta: "Prueba gratis",
  },

  hero: {
    verticals: ["Restaurantes", "Tabernas", "Pizzerías", "Cafeterías", "Bares de tapas", "Asadores"],
    headline: "Carta Digital para Restaurantes.",
    sub: "Carta digital para tu restaurante en 5 minutos. Editor móvil sin código, escaneo IA del menú, código QR para mesas y pedidos directos sin comisiones.",
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
    rating: "Más de 500 restaurantes en 30 países",
  },

  features: {
    heading: "Todo lo necesario para",
    headingAccent: "crear la carta digital.",
    sub: "Una plataforma pensada para hosteleros, no para programadores.",
    items: [
      {
        Icon: Smartphone,
        title: "Crear carta digital desde el móvil",
        desc: "Editor con drag-and-drop: añades platos con un toque, reordenas con arrastre, publicas con un swipe. Sin HTML, sin instalaciones.",
        tag: "Editor móvil",
      },
      {
        Icon: ScanLine,
        title: "Escaneo IA del menú en papel",
        desc: "Subes una foto o un PDF de tu carta y la IA extrae categorías, platos y precios en 60 segundos. Te ahorras horas de transcripción.",
        tag: "Importación IA",
      },
      {
        Icon: Languages,
        title: "Carta digital multilingüe",
        desc: "Tu carta digital traducida a 35 idiomas con IA gastronómica. Los turistas leen los platos en su idioma y comprenden lo que piden.",
        tag: "35 idiomas",
      },
      {
        Icon: Palette,
        title: "Diseño moderno",
        desc: "Fondos de vídeo y fotos increíbles. Tu carta parece premium y despierta el apetito al momento.",
        tag: "Diseño a medida",
      },
      {
        Icon: CalendarCheck,
        title: "Reserva de mesas",
        desc: "El sistema acepta reservas mientras estás en la cocina. Ni un cliente perdido.",
        tag: "Reservas",
      },
      {
        Icon: ChefHat,
        title: "Próximamente: Pantalla de cocina",
        desc: "Olvida los tiquets de papel. Los pedidos de la sala van directo a la pantalla del chef.",
        tag: "Próximamente",
      },
    ],
  },

  founder: {
    eyebrow: "Editor de carta digital creado por un hostelero",
    quoteStart:
      "Mi mujer y yo abrimos una cafetería y pasamos semanas buscando un sistema que aceptara pedidos online, reservas y que encima pareciera moderno. Todo lo que probamos era torpe, feo o le faltaba la mitad de las funciones —",
    quoteAccent: "así que construimos el que nos hubiera gustado tener.",
    sign: "Bogdan Sokolov · fundador, ex dueño de cafetería",
    photoAlt: "Bogdan, fundador de IQ Rest",
  },

  how: {
    heading: "Crear tu carta digital",
    headingAccent: "en 4 pasos",
    sub: "Cuatro pasos cortos. Sin instalaciones, sin configuraciones técnicas.",
    steps: [
      { n: "1", t: "Tipo y nombre", d: "Elige el tipo y escribe el nombre." },
      { n: "2", t: "Guardar", d: "Introduce tu email o entra con Google." },
      { n: "3", t: "Carta", d: "Créala tú o escanea una en papel." },
      { n: "4", t: "Listo", d: "Mira, comparte y empieza a recibir pedidos." },
    ],
  },

  pricing: {
    badge: "Carta digital sin límites · Cero comisiones",
    heading: "Un plan para crear",
    headingAccent: "tu carta digital.",
    sub: "Crea la carta digital, genera código QR, recibe pedidos directos, traduce con IA y gestiona reservas. Precio simple, factura mensual o anual.",
    monthlyLabel: "Mensual",
    yearlyLabel: "Anual",
    saveBadge: "Ahorra 25%",
    perMonth: "al mes",
    billedAnnually: "Facturado anualmente {total}",
    youSave: "Ahorras {amount}",
    trust: {
      secure: "Pago seguro con Stripe",
      noCommitment: "Sin permanencia",
      quick: "Activo en minutos",
      restaurants: "+500 restaurantes",
    },
  },

  faq: {
    eyebrow: "¿Tienes dudas?",
    heading: "Preguntas sobre la",
    headingAccent: "carta digital.",
    sub: "Lo que los hosteleros preguntan antes de crear la carta digital. ¿No ves la tuya? Escríbenos por WhatsApp — contestan personas reales.",
    whatsappCta: "Escríbenos por WhatsApp",
    whatsappPrefill: "Hola, tengo una pregunta sobre IQ Rest",
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
    heading: "De papel a digital",
    headingAccent: "en 60 segundos",
    sub: "Sube una foto — la IA extrae categorías, platos y precios y los importa directamente al editor.",
    cta: "Escanear mi carta →",
  },

  footer: {
    featureLinks: [
      { href: "/es/online-orders", label: "Pedidos online" },
      { href: "/es/ai-translation", label: "Traducción con IA" },
      { href: "/es/reservations", label: "Reservas" },
      { href: "/es/mobile-management", label: "Gestión desde el móvil" },
      { href: "/es/easy-menu", label: "Editor de carta" },
      { href: "/es/custom-design", label: "Fondos en vídeo y foto" },
      { href: "/es/color-scheme", label: "Colores de marca" },
      { href: "/es/multilingual", label: "Web multilingüe" },
      { href: "/es/ai-images", label: "Optimización de fotos con IA" },
      { href: "/es/analytics", label: "Analíticas" },
      { href: "/es/instant-setup", label: "Configuración al instante" },
      { href: "/es/personal-support", label: "Soporte personal" },
    ],
    navLinks: [
      { href: "#pricing", label: "Precios" },
      { href: "#faq", label: "Preguntas" },
      { href: "/es/changelog", label: "Novedades" },
      { href: "/es/languages", label: "Cambiar idioma" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Todos los derechos reservados.",
  },
};
