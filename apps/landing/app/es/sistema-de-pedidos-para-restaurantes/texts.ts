import { QrCode, MessageCircle, ChefHat, Settings2, Languages, BarChart3 } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

// /es/sistema-de-pedidos-para-restaurantes targets the broad-match
// keyword "sistema de pedidos para restaurantes" (Spain, 50/mo, LOW
// competition idx 3). NOT a delivery-aggregator competitor: the order
// goes straight from the guest's QR menu to your kitchen tablet or to
// your restaurant's WhatsApp number. Online card payment is opt-in
// custom integration, not enabled by default.
export const TEXTS: LandingTexts = {
  htmlLang: "es",
  htmlDir: "ltr",

  meta: {
    title: "Sistema de Pedidos para Restaurantes — QR y WhatsApp | IQ Rest",
    description:
      "Sistema de pedidos para restaurantes con QR en la mesa: el pedido llega directo a tu tableta de cocina o a tu WhatsApp. Sin comisiones, con número de mesa. 14 días gratis.",
    canonical: "https://iq-rest.com/es/sistema-de-pedidos-para-restaurantes",
    ogLocale: "es_ES",
    ogTitle: "Sistema de Pedidos para Restaurantes — Directo a la Cocina",
    ogDescription:
      "El cliente escanea el QR, monta el pedido y llega a tu tableta o a tu WhatsApp — sin agregador, sin comisiones, con número de mesa en cada ticket.",
  },

  ctaText: "Activar mis pedidos",
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
    verticals: ["Restaurantes", "Cafeterías", "Bares", "Pizzerías", "Asadores", "Tabernas"],
    headline: "Sistema de Pedidos para Restaurantes.",
    sub: "El cliente escanea el QR de su mesa, monta el pedido en el móvil y la comanda llega directa a tu tableta de cocina o a tu WhatsApp. Sin agregador, sin comisiones, con número de mesa en cada ticket.",
    dynamicHeadlines: [
      "Pedidos en la mesa.",
      "Directo a la cocina.",
      "O directo a WhatsApp.",
      "Sin comisiones.",
      "Con número de mesa.",
    ],
    painBullets: [
      "Sistema de pedidos para restaurantes que controla el propio restaurante — sin intermediarios ni comisiones.",
      "Las comandas llegan a la tableta de cocina o del responsable con número de mesa, modificadores, alérgenos y notas.",
      "O puedes enviar los pedidos directamente al WhatsApp del local — perfecto para take-away o equipos pequeños.",
      "QR por mesa (o uno único para todo el local) generado automáticamente.",
    ],
    rating: "+500 restaurantes en 30 países",
  },

  features: {
    heading: "Un sistema de pedidos",
    headingAccent: "pensado para la mesa.",
    sub: "Funcionalidad real, no un clon de los agregadores de delivery.",
    items: [
      {
        Icon: QrCode,
        title: "Carta QR con carrito en cada mesa",
        desc: "El cliente escanea el QR de la mesa, navega la carta en su idioma, añade platos con modificadores, deja una nota para la cocina y envía. Sin instalar ninguna app.",
        tag: "Pedidos por QR",
      },
      {
        Icon: ChefHat,
        title: "Comandas en tu tableta de cocina",
        desc: "Cada pedido aparece en la pestaña Cocina del panel — en la tableta que tengas en el pase — con número de mesa, platos, variantes, alérgenos y la nota del cliente. Lo pasas de en curso a completado en un toque.",
        tag: "Vista de cocina",
      },
      {
        Icon: MessageCircle,
        title: "O envíalos a WhatsApp",
        desc: "Cambia el restaurante a modo WhatsApp (o usa ambos a la vez) y cada pedido llega al WhatsApp del local como un mensaje formateado — ideal para take-away o cuando el encargado no está en el local.",
        tag: "Modo WhatsApp",
      },
      {
        Icon: Settings2,
        title: "Modificadores, variantes y alérgenos",
        desc: "Cada plato lleva sus grupos de variantes (tamaño, punto, añadidos) con diferencia de precio, etiquetas de alérgenos y descripción libre. El carrito lo respeta todo, así el ticket de tu tableta no tiene ambigüedades.",
        tag: "Carrito real",
      },
      {
        Icon: Languages,
        title: "Checkout multilingüe",
        desc: "Todo el flujo del pedido — carrito, modificadores, comentario, confirmación — está traducido a 35 idiomas y se adapta automáticamente al idioma del móvil del cliente. Los turistas piden con confianza.",
        tag: "35 idiomas",
      },
      {
        Icon: BarChart3,
        title: "Numeración diaria y registro",
        desc: "Cada pedido recibe su número del día para la cocina, queda en un registro con totales y marcas de tiempo, y alimenta la analítica. Las cancelaciones quedan en soft-delete para que los informes sigan limpios.",
        tag: "Registro de pedidos",
      },
    ],
  },

  founder: {
    eyebrow: "Hecho por un hostelero, no por una startup de delivery",
    quoteStart:
      "Mi mujer y yo abrimos una cafetería y pasamos semanas buscando una forma de tomar pedidos desde la mesa que no entregara el 30% a un agregador ni exigiera un TPV de 1.500€. Todo lo que probamos era torpe, caro o le faltaba lo básico —",
    quoteAccent: "así que construimos el sistema de pedidos que nos habría gustado tener.",
    sign: "Bogdan Sokolov · fundador, ex dueño de cafetería",
    photoAlt: "Bogdan, fundador de IQ Rest",
  },

  how: {
    heading: "Activa tu sistema de pedidos",
    headingAccent: "en 4 pasos",
    sub: "Sin instalaciones, sin integrador, sin llamadas al informático. Sólo el móvil y 5 minutos.",
    steps: [
      { n: "1", t: "Crea el restaurante", d: "Registro con email o Google — 30 segundos." },
      { n: "2", t: "Añade la carta", d: "Drag-and-drop, o escaneo IA del menú en papel." },
      { n: "3", t: "Elige el canal", d: "Tableta de cocina, WhatsApp o ambos a la vez." },
      { n: "4", t: "Imprime el QR", d: "Un QR por mesa: los clientes empiezan a pedir al momento." },
    ],
  },

  pricing: {
    badge: "Pedidos ilimitados · Cero comisiones",
    heading: "Un plan.",
    headingAccent: "Sin coste por pedido.",
    sub: "Pedidos online, carta QR, modo WhatsApp, checkout multilingüe y analítica — todo en una sola suscripción. Sin porcentaje por transacción.",
    monthlyLabel: "Mensual",
    yearlyLabel: "Anual",
    saveBadge: "Ahorra 25%",
    perMonth: "al mes",
    billedAnnually: "Facturado anualmente {total}",
    youSave: "Ahorras {amount}",
    trust: {
      secure: "Suscripción facturada con Stripe",
      noCommitment: "Sin permanencia",
      quick: "Activo en minutos",
      restaurants: "+500 restaurantes",
    },
  },

  faq: {
    eyebrow: "Sistema de pedidos — preguntas frecuentes",
    heading: "Sobre el sistema de",
    headingAccent: "pedidos.",
    sub: "Lo que preguntan los hosteleros antes de activar pedidos online con IQ Rest. ¿No ves tu pregunta? Escríbenos por WhatsApp — contestan personas reales.",
    whatsappCta: "Pregunta por WhatsApp",
    whatsappPrefill: "Hola, tengo una pregunta sobre los pedidos de IQ Rest",
    items: [
      {
        q: "¿Es una plataforma de delivery tipo Uber Eats o Glovo?",
        a: "No, y esa es la idea. IQ Rest es el canal de pedidos propio del restaurante — el cliente pide desde tu QR, la comanda llega a tu tableta o a tu WhatsApp, tú la sirves. No hay marketplace ni catálogo de agregador, y nunca nos llevamos parte de la cuenta.",
      },
      {
        q: "¿Dónde aparecen exactamente los pedidos?",
        a: "En la pestaña Cocina del panel de IQ Rest, en cualquier tableta o teléfono que tengas en el pase o en la barra. Cada pedido muestra el número de mesa, los platos con variantes y alérgenos, el comentario del cliente y el número de pedido del día. Lo mueves de nuevo → en curso → completado con un toque.",
      },
      {
        q: "¿Puedo recibir los pedidos en WhatsApp en su lugar?",
        a: "Sí. Cada restaurante tiene tres modos: interno (sólo tableta de cocina), WhatsApp (el pedido llega como mensaje formateado al WhatsApp del local) o ambos a la vez. El modo es un único interruptor en el panel — lo cambias cuando quieras.",
      },
      {
        q: "¿Qué incluye un pedido — sólo los platos?",
        a: "Platos con sus variantes y añadidos (con diferencia de precio incluida), alérgenos, número de mesa, comentario libre del cliente y — si activas los campos — nombre, teléfono y dirección del cliente. Suficiente para mandar un take-away o avisar a la mesa de un alérgeno.",
      },
      {
        q: "¿Pueden los clientes pagar online desde la carta?",
        a: "No por defecto. IQ Rest está pensado para pago en la mesa — el cliente pide, tú llevas la cuenta, paga como siempre. Si necesitas pago con tarjeta online (típico para take-away) se puede integrar Stripe Connect bajo petición; escríbenos por WhatsApp.",
      },
      {
        q: "¿Necesito una tableta especial, impresora o hardware TPV?",
        a: "No. Cualquier tableta, portátil o teléfono con navegador sirve — abre el panel, inicia sesión, deja la pestaña Cocina abierta. Si ya tienes TPV, IQ Rest convive con él; no sustituye tu caja.",
      },
      {
        q: "¿Cómo sabe el cliente que el pedido ha llegado?",
        a: "Ve una confirmación en el navegador con el número de pedido del día. La pestaña Cocina se actualiza en tiempo real — cuando lo marcas en curso o completado, el cliente ve el estado sin recargar.",
      },
      {
        q: "¿Puedo desactivar los pedidos en algún local y dejar sólo la carta?",
        a: "Sí. Cada restaurante tiene un interruptor de Pedidos activados. Lo desactivas y la carta sigue funcionando — se puede navegar, filtrar alérgenos, cambiar de idioma — pero el carrito desaparece. Útil para locales que sólo quieren la carta QR sin el flujo de pedidos.",
      },
      {
        q: "¿Qué pasa después de los 14 días gratis?",
        a: "Si no añades método de pago, la cuenta se pausa — nunca cobramos automáticamente. La carta, los pedidos y los ajustes quedan guardados; añades los datos cuando quieras para reactivar. Cancelas con un clic, sin permanencia.",
      },
    ],
  },

  finalCta: {
    heading: "Activa tu sistema de pedidos.",
    headingAccent: "Listo en 5 minutos.",
    sub: "14 días gratis, sin tarjeta. Cancela cuando quieras. Únete a más de 500 restaurantes que usan IQ Rest para sus pedidos.",
  },

  scan: {
    heading: "De carta de papel a sistema de pedidos",
    headingAccent: "en 60 segundos",
    sub: "Sube una foto de la carta — la IA extrae categorías, platos y precios y los lleva al editor. A partir de ahí, el carrito y el QR están a un clic.",
    cta: "Escanear mi carta →",
  },

  footer: {
    featureLinks: [
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
