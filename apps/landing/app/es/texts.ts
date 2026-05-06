import { ScanLine, Languages, CalendarCheck, Palette, Smartphone, ChefHat } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "es",
  htmlDir: "ltr",

  meta: {
    title: "Carta QR para Restaurantes — Pedidos Directos, Cero Comisiones | IQ Rest",
    description:
      "Olvídate de las cartas en papel y de las comisiones de las apps de delivery. Carta QR, pedidos directos, reservas y web multilingüe. Prueba gratis 14 días, sin tarjeta.",
    canonical: "https://iq-rest.com/es",
    ogLocale: "es_ES",
    ogTitle: "Carta QR para Restaurantes — Pedidos Directos, Cero Comisiones",
    ogDescription:
      "Carta QR, pedidos directos, reservas y traducción con IA. Lista en 5 minutos. 14 días gratis — sin tarjeta.",
  },

  ctaText: "Prueba gratis", ctaSite: "Crear web",
  demoText: "Ver demo en vivo",
  microcopy: "14 días gratis · Sin tarjeta · Cancela cuando quieras",

  header: {
    navFeatures: "Funciones",
    navHow: "Cómo funciona",
    navPricing: "Precios",
    navFaq: "FAQ",
    signIn: "Entrar",
    cta: "Prueba gratis",
  },

  hero: {
    verticals: ["Restaurantes", "Cafeterías", "Bares", "Hoteles", "Pizzerías"],
    qr: { headline: "Carta QR en 5 minutos.", sub: "Sitio web listo para tu restaurante — sin programadores ni contratistas. Pedidos directos, reservas y analítica de clientes en una sola suscripción." },
    web: { headline: "Web de restaurante en 5 min.", sub: "Sitio web listo para tu restaurante — sin programadores ni contratistas. Pedidos directos, reservas y analítica de clientes en una sola suscripción." },
    dynamicHeadlines: ["0% comisiones.", "35 idiomas con IA.", "Pedidos online.", "Reservas 24/7.", "Diseño premium."],
    painBullets: ["0% Comisiones: Todos los pedidos van directo a ti.", "Traducción IA: 35 idiomas para aumentar el ticket de turistas.", "Reservas 24/7: Sala llena sin llamadas innecesarias.", "Precios flexibles: Actualiza tu carta en segundos."],
    rating: "4,9 · más de 500 restaurantes en 30 países",
  },

  features: {
    heading: "Todo lo que necesitas.",
    headingAccent: "Nada de lo que no.",
    sub: "Hecho para restaurantes. Pensado para usar en mesa.",
    items: [
      
      {
        Icon: ScanLine,
        title: "Pedidos desde la mesa",
        desc: "Los pedidos llegan al instante por WhatsApp o a tu panel con número de mesa. Servicio más rápido.",
        tag: "Pedidos directos",
      },
      {
        Icon: Languages,
        title: "Traductor IA (35 idiomas)",
        desc: "Nuestra IA entiende de gastronomía. Los turistas piden un 20% más cuando entienden el plato.",
        tag: "Traducción IA",
      },
      {
        Icon: CalendarCheck,
        title: "Reserva de mesas",
        desc: "El sistema acepta reservas mientras estás en la cocina. Ni un cliente perdido.",
        tag: "Reservas",
      },
      {
        Icon: Palette,
        title: "Diseño moderno",
        desc: "Fondos de vídeo y fotos increíbles. Tu carta parece premium y despierta el apetito al momento.",
        tag: "Diseño a medida",
      },
      {
        Icon: Smartphone,
        title: "Editor rápido",
        desc: "Gestiona la lista de agotados y precios desde el móvil. Cambios en vivo para los clientes.",
        tag: "Editor de carta",
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
    eyebrow: "Hecho por un dueño de restaurante",
    quoteStart:
      "Mi mujer y yo abrimos una cafetería y pasamos semanas buscando un sistema que aceptara pedidos online, reservas y que encima pareciera moderno. Todo lo que probamos era torpe, feo o le faltaba la mitad de las funciones —",
    quoteAccent: "así que construimos el que nos hubiera gustado tener.",
    sign: "Bogdan Sokolov · fundador, ex dueño de cafetería",
    photoAlt: "Bogdan, fundador de IQ Rest",
  },

  how: {
    heading: "Lista en menos de 5 minutos",
    sub: "Cuatro pasos cortos. Sin instalaciones, sin configuraciones técnicas.",
    steps: [
      { n: "1", t: "Tipo y nombre", d: "Elige el tipo y escribe el nombre." },
      { n: "2", t: "Guardar", d: "Introduce tu email o entra con Google." },
      { n: "3", t: "Carta", d: "Créala tú o escanea una en papel." },
      { n: "4", t: "Listo", d: "Mira, comparte y empieza a recibir pedidos." },
    ],
  },

  pricing: {
    badge: "Sin comisiones · Sin contratos",
    heading: "Un solo plan.",
    headingAccent: "Todo incluido.",
    sub: "Carta QR, pedidos, traducción IA, web del restaurante y reservas. Un precio simple.",
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
    heading: "Preguntas",
    headingAccent: "frecuentes.",
    sub: "Lo que los dueños de restaurantes preguntan antes de registrarse. ¿No ves la tuya? Escríbenos por WhatsApp — contestan personas reales.",
    whatsappCta: "Escríbenos por WhatsApp",
    whatsappPrefill: "Hola, tengo una pregunta sobre IQ Rest",
    items: [
      {
        q: "¿Qué incluye la prueba gratis y qué pasa después?",
        a: "14 días, acceso completo, sin tarjeta. Pasados los 14 días, si no añades método de pago, la cuenta se pausa — nunca te cobramos automáticamente. Añade los datos cuando quieras para reactivarla. Y la cancelas con un clic.",
      },
      {
        q: "¿Os lleváis comisión por los pedidos?",
        a: "Cero. Cada pedido de tu carta QR llega directo a ti — sin nuestra parte, sin tasas tipo Glovo o Uber Eats. Un solo precio mensual, ya está.",
      },
      {
        q: "¿Mis clientes necesitan una app? ¿Yo necesito saber de tecnología?",
        a: "Cero apps para los clientes — escanean el QR con la cámara del móvil y la carta se abre en el navegador. Cero conocimientos técnicos para ti — todo el panel funciona desde el móvil, tocas para añadir un plato, arrastras para reordenar, eso es todo.",
      },
      {
        q: "¿Cómo de rápido cambio precios o añado platos?",
        a: "Al instante. Cambias un precio en el móvil y los clientes lo ven en segundos. ¿Plato nuevo? Tocas, escribes, subes foto, listo — sin reimpresiones, sin esperar al diseñador.",
      },
      {
        q: "¿A cuántos idiomas puedo traducir la carta?",
        a: "35 idiomas con traducción IA integrada. Un toque traduce toda la carta y la IA entiende el contexto culinario — los nombres y descripciones suenan naturales en cada idioma. Los turistas piden más cuando de verdad entienden el menú.",
      },
    ],
  },

  finalCta: {
    heading: "Lista en 5 minutos.",
    headingAccent: "Gratis 14 días.",
    sub: "Sin tarjeta. Cancela cuando quieras. Únete a más de 500 restaurantes ya con IQ Rest.",
  },

  scan: {
    heading: "¿Tienes un menú en papel o PDF?",
    headingAccent: "La IA lo digitaliza en 60 segundos.",
    sub: "Súbelo — la IA extrae categorías, platos y precios.",
    cta: "Escanear mi menú →",
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
