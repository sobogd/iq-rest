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
      "Carta QR, pedidos directos, reservas y traducción con IA. Lista en 2 minutos. 14 días gratis — sin tarjeta.",
  },

  ctaText: "Empieza gratis →",
  demoText: "Ver demo en vivo",
  microcopy: "14 días gratis · Sin tarjeta · Cancela cuando quieras",

  header: {
    navFeatures: "Funciones",
    navHow: "Cómo funciona",
    navPricing: "Precios",
    navFaq: "FAQ",
    signIn: "Entrar",
    cta: "Empieza gratis →",
  },

  hero: {
    verticals: ["Restaurantes", "Cafeterías", "Bares", "Hoteles", "Pizzerías"],
    variants: [
      {
        headline: "Deja de imprimir cartas.",
        headlineAccent: "Deja de pagar 30% a las apps de delivery.",
        sub: "Carta QR, pedidos directos, reservas y web multilingüe. Lista en 2 minutos — sin tarjeta de crédito.",
      },
      {
        headline: "Tu restaurante merece más que",
        headlineAccent: "una carta de papel y llamadas perdidas.",
        sub: "Pedidos directos, cambios de carta al instante y reservas 24/7. Configúralo en 2 minutos.",
      },
      {
        headline: "Un código QR.",
        headlineAccent: "Cero comisiones. Adiós a la carta de papel.",
        sub: "Carta QR, pedidos online y reservas — todo en un sitio. 14 días gratis, sin tarjeta.",
      },
      {
        headline: "Recibe pedidos directos.",
        headlineAccent: "Sáltate la comisión.",
        sub: "Tus clientes escanean, piden y pagan — directo a ti, sin que Glovo se lleve el 30%. Lista en 2 minutos.",
      },
      {
        headline: "Más pedidos. Más reservas.",
        headlineAccent: "Sin papel, sin apps.",
        sub: "Carta QR + reservas + web multilingüe en automático. Prueba gratis de 14 días.",
      },
      {
        headline: "¿Los turistas no entienden tu carta?",
        headlineAccent: "Arréglalo en 2 minutos.",
        sub: "La IA traduce toda tu carta a 35 idiomas. Y además incluye pedidos QR y reservas.",
      },
      {
        headline: "De carta de papel a código QR,",
        headlineAccent: "antes de que se enfríe el café.",
        sub: "Carta QR, pedidos directos y reservas 24/7. Lista en 2 minutos — sin tarjeta.",
      },
      {
        headline: "Carta QR sorprendentemente simple.",
        headlineAccent: "Y muy potente por dentro.",
        sub: "Pedidos directos, traducción IA, reservas y web — todo desde un toque en el móvil.",
      },
    ],
    painBullets: [
      "Sin imprimir — precios al instante",
      "Sin comisiones — pedidos directos",
      "Sin llamadas — reservas 24/7",
      "35 idiomas — no pierdas turistas",
    ],
    rating: "4,9 · más de 500 restaurantes en 30 países",
  },

  features: {
    heading: "Todo lo que necesitas.",
    headingAccent: "Nada de lo que no.",
    sub: "Hecho para restaurantes. Pensado para usar en mesa.",
    items: [
      {
        Icon: ScanLine,
        title: "Quédate con el 100% de cada pedido",
        desc: "Tus clientes escanean, piden y pagan — directo a ti. Sin descargar apps, sin que delivery se lleve el 30%. Cada pedido entra al panel con número de mesa y al instante.",
        tag: "Pedidos directos",
      },
      {
        Icon: Languages,
        title: "Vende a turistas en su idioma",
        desc: "Un toque traduce toda tu carta a 35 idiomas. La IA pilla el contexto culinario — los clientes piden más cuando entienden el plato.",
        tag: "Traducción IA",
      },
      {
        Icon: CalendarCheck,
        title: "No pierdas reservas mientras cocinas",
        desc: "Tus clientes reservan mesa 24/7, sin llamadas. Confirmación automática o manual, recordatorios por email — menos no-shows, cero estrés.",
        tag: "Reservas",
      },
      {
        Icon: Palette,
        title: "Inolvidable en 1 segundo",
        desc: "Pon un vídeo de tu cocina o una foto bonita como fondo de la carta. Los clientes paran de scrollear. Tu marca se queda.",
        tag: "Diseño a medida",
      },
      {
        Icon: Smartphone,
        title: "Cambia la carta en segundos, no en días",
        desc: "Cambia precios, cambia fotos, añade el plato del día — desde el móvil, entre mesas. En vivo al instante. Olvídate de reimprimir cartas.",
        tag: "Editor de carta",
      },
      {
        Icon: ChefHat,
        title: "Sirve más rápido cada turno",
        desc: "Los pedidos llegan a la pantalla de cocina en cuanto el cliente confirma. Cero papel, cero gritos, cero comandas perdidas — menos errores, más rotación de mesas, más cubiertos por noche.",
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
    heading: "Lista en menos de 2 minutos",
    sub: "Cuatro pasos cortos. Sin instalaciones, sin configuraciones técnicas.",
    steps: [
      { n: "1", t: "Regístrate", d: "Email o Google. Sin tarjeta. Listo en 10 segundos." },
      { n: "2", t: "Pon el nombre del restaurante", d: "Solo escribe el nombre. Aparece arriba de tu carta." },
      { n: "3", t: "Añade tu primer plato", d: "Categoría, nombre, precio, foto. Ya está." },
      { n: "4", t: "Elige una portada e imprime tu QR", d: "Elige fondo. Coge tu QR. Pégalo en las mesas." },
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
    heading: "Lista en 2 minutos.",
    headingAccent: "Gratis 14 días.",
    sub: "Sin tarjeta. Cancela cuando quieras. Únete a más de 500 restaurantes ya con IQ Rest.",
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
