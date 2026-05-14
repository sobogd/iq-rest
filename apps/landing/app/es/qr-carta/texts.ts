import type { LandingTexts } from "@/app/_landing/types";
import { TEXTS as DEFAULT } from "../texts";

const D = DEFAULT.features.items;

export const TEXTS: LandingTexts = {
  ...DEFAULT,

  ctaText: "Genera tu QR de carta gratis",
  microcopy: "Desde 6,90€/mes · 14 días gratis · Cancela cuando quieras",

  meta: {
    title: "QR Carta para Restaurantes — Código QR Imprimible, Sin App | IQ Rest",
    description:
      "Genera el código QR de la carta para tu restaurante. QR imprimible para las mesas, los clientes escanean sin app, pedidos directos, 35 idiomas. 14 días gratis.",
    canonical: "https://iq-rest.com/es/qr-carta",
    ogLocale: "es_ES",
    ogTitle: "QR Carta para Restaurantes — Código QR Imprimible, Sin App",
    ogDescription:
      "Carta con código QR para restaurantes, bares y cafeterías. QR imprimible, escaneo sin app, pedidos directos.",
  },

  founder: {
    ...DEFAULT.founder,
    eyebrow: "Sistema QR creado por un hostelero",
  },

  hero: {
    ...DEFAULT.hero,
    verticals: ["Restaurantes", "Bares", "Cafeterías", "Pizzerías", "Tabernas", "Pubs"],
    headline: "QR Carta para Restaurantes.",
    sub:
      "Genera el código QR de la carta en 5 minutos. Imprimible para las mesas, los clientes escanean con la cámara — sin app, sin descargas. Pedidos directos, 35 idiomas, reservas 24/7.",
    dynamicHeadlines: [
      "Código QR imprimible.",
      "Escaneo sin app.",
      "Pedidos desde la mesa.",
      "QR carta en 5 min.",
      "Cero comisiones.",
    ],
    painBullets: [
      "Código QR carta imprimible: PDF/PNG listos para expositor, vinilo o papel plastificado.",
      "Sin app: el cliente apunta con la cámara al QR de la carta y se abre al instante.",
      "Pedidos desde la mesa: cada pedido llega con el número de mesa, cero comisiones.",
      "Actualizas la carta, el QR sigue siendo el mismo: no hay que reimprimir.",
    ],
  },

  features: {
    ...DEFAULT.features,
    heading: "Todo lo que necesita un",
    headingAccent: "QR carta completo.",
    sub: "Generación, impresión, escaneo y pedidos en una sola plataforma.",
    items: [
      {
        Icon: D[0].Icon,
        title: "Código QR carta imprimible",
        desc: "Descarga el QR de la carta en PDF o PNG listo para expositor, vinilo, papel plastificado o pegatinas. Un QR único o uno por mesa.",
        tag: "QR imprimible",
      },
      {
        Icon: D[2].Icon,
        title: "Escaneo sin app",
        desc: "El cliente apunta con la cámara al QR carta y la carta se abre en el navegador en menos de un segundo. Compatible con iPhone y Android.",
        tag: "Sin app",
      },
      {
        Icon: D[4].Icon,
        title: "Actualizas sin reimprimir",
        desc: "Cambias precios, activas stop-list o añades un plato desde el móvil: el código QR sigue siendo válido, los clientes ven los cambios al instante.",
        tag: "Editor móvil",
      },
      D[1],
      D[3],
      D[5],
    ],
  },

  how: {
    ...DEFAULT.how,
    heading: "Crea tu QR carta en menos de 5 minutos",
  },

  pricing: {
    ...DEFAULT.pricing,
    badge: "QR carta sin límites · Cero comisiones",
    heading: "Un plan para tu QR carta.",
    headingAccent: "Todo incluido.",
    sub: "Código QR ilimitado, pedidos directos, traducción IA, reservas y analítica. Un precio simple, facturado al mes o al año.",
  },

  faq: {
    ...DEFAULT.faq,
    heading: "Preguntas sobre la",
    headingAccent: "carta con código QR.",
    sub: "Lo que hosteleros, bares y cafeterías preguntan antes de adoptar el QR carta. ¿No ves la tuya? Escríbenos por WhatsApp.",
    items: [
      {
        q: "¿Cómo generar el código QR de la carta del restaurante?",
        a: "Registras la cuenta en 30 segundos, añades los platos (manualmente o escaneando la carta en papel: la IA la digitaliza en 60 segundos) y la plataforma genera automáticamente el código QR carta imprimible. Puedes elegir un QR único para todo el local o uno distinto por mesa.",
      },
      {
        q: "¿En qué formatos puedo descargar el código QR de la carta?",
        a: "PDF y PNG de alta resolución, listos para imprimir. Funcionan en papel plastificado, vinilo, PVC, expositor de mesa, pegatinas o impresión directa sobre la carta en papel. Vectorial para impresiones grandes en escaparate.",
      },
      {
        q: "Si actualizo la carta, ¿tengo que reimprimir el QR?",
        a: "No. El código QR apunta a una URL que siempre es la misma. Modificas precios, platos y descripciones desde el móvil y los clientes ven los cambios en el siguiente escaneo — el QR impreso sigue funcionando indefinidamente.",
      },
      {
        q: "¿Los clientes necesitan una app para escanear el código QR carta?",
        a: "Cero apps. Todos los smartphones modernos (iPhone desde iOS 11, Android desde la versión 8) leen el QR directamente desde la cámara. La carta se abre en el navegador en menos de un segundo.",
      },
      {
        q: "¿Puedo aceptar pedidos directamente desde la carta con QR?",
        a: "Sí. El cliente escanea el QR en la mesa, navega la carta, añade platos al carrito y envía el pedido. El pedido llega al instante al panel y a WhatsApp, con el número de mesa ya indicado.",
      },
      {
        q: "¿Funciona también para bares y cafeterías o solo para restaurantes?",
        a: "Funciona para cualquier negocio de hostelería: restaurantes, tabernas, pizzerías, bares, cafeterías, pubs, hoteles con bar interior. La estructura de la carta se adapta — categorías, variantes, alérgenos, horarios.",
      },
      {
        q: "¿Cuánto cuesta una carta con código QR?",
        a: "6,90€/mes (o descuento anual) por todo: QR ilimitado, carta completa, pedidos directos sin comisiones, 35 idiomas con IA, reservas y analítica. 14 días de prueba gratis, sin tarjeta.",
      },
      {
        q: "¿Puedo tener un código QR distinto por mesa?",
        a: "Sí. Puedes generar un QR carta distinto para cada mesa: cuando el cliente pide, el pedido llega al panel ya asociado al número de mesa. Servicio más rápido para el personal, cero confusión en cocina.",
      },
      {
        q: "¿El QR funciona sin conexión?",
        a: "El QR impreso siempre se puede escanear, pero para abrir la carta el cliente necesita conexión (Wi-Fi del local o datos móviles). Recomendamos Wi-Fi gratis para los clientes — aumenta también el tiempo de permanencia.",
      },
    ],
  },

  finalCta: {
    heading: "Crea hoy tu QR carta.",
    headingAccent: "Gratis 14 días.",
    sub: "Sin tarjeta. Cancela cuando quieras. Únete a más de 500 locales que ya usan el QR carta de IQ Rest.",
  },

  scan: {
    heading: "¿Ya tienes una carta en papel o PDF?",
    headingAccent: "Conviértela en QR carta en 60 segundos.",
    sub: "Sube una foto de la carta — la IA extrae platos, precios y categorías y los convierte en una carta con código QR lista para imprimir.",
    cta: "Escanear mi carta →",
  },
};
