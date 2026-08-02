import { CalendarCheck, ChefHat, Receipt, Monitor } from "lucide-react";
import type { LandingTexts } from "@/app/_landing/types";

export const TEXTS: LandingTexts = {
  htmlLang: "es",
  htmlDir: "ltr",

  meta: {
    title: "Carta Digital, Pantalla de Cocina y Reservas — IQ Rest",
    description:
      "Gestiona tu restaurante desde una sola app: carta digital multilingüe, pantalla de cocina y reservas 24/7. Listo en 5 minutos. 14 días gratis, sin tarjeta.",
    canonical: "https://iq-rest.com/es",
    ogLocale: "es_ES",
    ogTitle: "Carta Digital, Pantalla de Cocina y Reservas",
    ogDescription:
      "Gestiona tu restaurante desde una sola app: carta digital multilingüe, pantalla de cocina y reservas 24/7. Listo en 5 minutos. 14 días gratis, sin tarjeta.",
  },

  ctaText: "Pruébalo gratis",
  homeCtaText: "Pruébalo gratis",
  trust: [
    { kind: "num", value: 35, label: "Idiomas del menú" },
    { kind: "text", value: "24/7", label: "Reservas online" },
    { kind: "num", value: 5, suffix: " min", label: "Para activarlo" },
    { kind: "count", label: "Restaurantes con nosotros" },
  ],
  demoText: "Ver demo",
  microcopy: "14 días gratis · Sin tarjeta · Cancelas cuando quieras",

  header: {
    navFeatures: "Funciones",
    navHow: "Cómo funciona",
    navPricing: "Precios",
    navFaq: "FAQ",
    signIn: "Iniciar sesión",
    viewFeatures: "Ver funciones",
    cta: "Pruébalo gratis",
  },

  hero: {
    verticals: ["Restaurantes", "Cafeterías", "Bares", "Hoteles", "Pizzerías"],
    headline: "Carta digital para restaurantes.\nLista en 5 minutos.",
    sub: "Carta digital para tu restaurante en 5 minutos. Todo incluido: editor sin código, escaneo de la carta con IA, códigos QR para las mesas y pedidos directos sin comisiones.",
    dynamicHeadlines: ["0 % de comisión.", "35 idiomas con IA.", "Pedidos online.", "Reservas 24/7.", "Diseño premium."],
    painBullets: [
      "0 % de comisión: cada pedido llega directamente a tu restaurante.",
      "Traducción con IA en 35 idiomas — los turistas entienden la carta y piden más.",
      "Reservas 24/7: los comensales reservan ellos mismos, sin llamadas en horas punta.",
      "Precios flexibles: los cambios de la carta se publican al instante.",
    ],
    rating: "Más de 500 restaurantes en más de 30 países",
  },

  features: {
    heading: "Todo lo que necesitas.",
    headingAccent: "Nada de sobra.",
    sub: "Creado para restaurantes. Se usa cada día en la mesa, en la cocina y en sala.",
    items: [
      { Icon: Monitor, title: "Carta digital", desc: "Carta en el navegador con fotos, precios, alérgenos y descripciones. Se actualiza en tiempo real desde el móvil. Los comensales ven la carta en su idioma; el restaurante ahorra en impresión.", tag: "Carta digital", href: "/es/menu-digital-restaurantes" },
      { Icon: Receipt, title: "Pedidos: comensal y camarero", desc: "Código QR en la mesa para el comensal o el camarero toma la comanda desde el móvil — ambas van directas a la cocina o a WhatsApp. Sin comisiones y con el número de mesa en cada ticket.", tag: "Pedidos", href: "/es/sistema-pedidos-restaurante" },
      { Icon: CalendarCheck, title: "Reservas de mesa 24/7", desc: "Los comensales reservan ellos mismos desde la web o la carta QR mientras tú estás en sala. Calendario por mesa, confirmaciones y recordatorios automáticos. Ni un solo cliente perdido.", tag: "Reservas", href: "/es/reservas-de-mesas" },
      { Icon: ChefHat, title: "Pantalla de cocina (KDS)", desc: "Adiós a los tickets de papel. Los pedidos de sala llegan directos a la pantalla del chef — columnas «en cocción / listo / servido», alérgenos y notas resaltados. En tableta o móvil.", tag: "KDS", href: "/es/pantalla-de-cocina" },
    ],
  },

  founder: {
    eyebrow: "Creado por restauradores",
    quoteStart:
      "Mi mujer y yo llevamos nuestra propia cafetería y conocemos de primera mano cómo es el día a día de un restaurante por dentro: pedidos, reservas, sala y cocina. Buscábamos una única herramienta — moderna, sencilla de poner en marcha y clara a primera vista —",
    quoteAccent: "así nació la idea de la plataforma que desarrollamos para otros restauradores.",
    sign: "Bogdan Sokolov · fundador, antes propietario de una cafetería",
    photoAlt: "Bogdan Sokolov, fundador de IQ Rest",
  },

  how: {
    heading: "Listo en 5 minutos",
    sub: "Cuatro pasos cortos. Sin instalaciones ni configuración técnica.",
    steps: [
      { n: "1", t: "Tipo y nombre", d: "Selecciona el tipo de local e introduce el nombre." },
      { n: "2", t: "Guardar", d: "Introduce tu correo o inicia sesión con Google." },
      { n: "3", t: "Carta", d: "Añade los platos manualmente o sube tu carta impresa para escanear con IA." },
      { n: "4", t: "Listo", d: "Comparte el enlace o el código QR y empieza a recibir pedidos." },
    ],
  },

  pricing: {
    badge: "Sin comisiones · Sin contratos",
    heading: "Un único plan.",
    headingAccent: "Todo incluido.",
    sub: "Carta QR, pedidos, traducción con IA, web del restaurante y reservas. Un único precio mensual transparente.",
    monthlyLabel: "Mensual",
    yearlyLabel: "Anual",
    saveBadge: "Ahorras un 25 %",
    perMonth: "al mes",
    billedAnnually: "Facturación anual: {total}",
    youSave: "Ahorras {amount}",
    trust: { secure: "Pago seguro con Stripe", noCommitment: "Sin compromiso", quick: "Activo en minutos", restaurants: "Más de 500 restaurantes" },
  },

  faq: {
    eyebrow: "¿Tienes preguntas?",
    heading: "Preguntas",
    headingAccent: "frecuentes.",
    sub: "Lo que los restauradores preguntan antes de registrarse. ¿No encuentras tu pregunta? Escríbenos por WhatsApp — responden personas, no un bot.",
    whatsappCta: "Preguntar por WhatsApp",
    whatsappPrefill: "Hola, tengo una pregunta sobre IQ Rest",
    items: [
      { q: "¿Qué incluye el periodo de prueba y qué pasa después?", a: "Acceso completo a todas las funciones durante 14 días, sin tarjeta. Pasados los 14 días la cuenta se pone en pausa si no se ha añadido método de pago — nunca cargamos automáticamente. Puedes añadir el pago más tarde y continuar desde donde lo dejaste. Cancelación en un clic." },
      { q: "¿Cobráis comisión por los pedidos?", a: "No. Cada pedido de la carta QR va directo al restaurante — sin porcentaje por nuestra parte, sin comisiones de agregadores. Una única tarifa mensual fija y nada más." },
      { q: "¿Los comensales necesitan una app y nosotros conocimientos técnicos?", a: "Los comensales no necesitan ninguna app: enfocan la cámara del móvil al QR y la carta se abre en el navegador. El restaurante tampoco necesita conocimientos técnicos: el panel de administración funciona en cualquier navegador moderno — móvil, tableta o portátil. Todo es a base de toques y arrastrar y soltar, sin código." },
      { q: "¿Con qué rapidez se actualizan los precios y se añaden los platos?", a: "Al instante. Cambias un precio desde el móvil — los comensales lo ven en segundos. ¿Un plato nuevo? Unos toques: nombre, precio, foto. Sin reimpresiones, sin esperar al diseñador." },
      { q: "¿Cuántos idiomas se soportan?", a: "35 idiomas con traducción con IA integrada. Un solo toque y toda la carta queda traducida; la IA entiende el contexto gastronómico — nombres y descripciones suenan naturales en cualquier idioma. Los turistas piden con más confianza cuando comprenden de verdad la carta." },
    ],
  },

  finalCta: {
    heading: "Listo en 5 minutos.",
    headingAccent: "14 días gratis.",
    sub: "Sin tarjeta, cancelas cuando quieras. Únete a más de 500 restaurantes que ya funcionan con IQ Rest.",
  },

  featureHighlights: {
    heading: "Todo incluido",
    sub: "Las funciones que convierten las visitas en pedidos, en todos los planes y sin extras.",
  },

  scan: {
    heading: "¿Tienes la carta en papel o en PDF?",
    headingAccent: "La IA la digitaliza en 60 segundos.",
    sub: "Sube una foto o un documento — la IA reconoce categorías, platos y precios automáticamente.",
    cta: "Escanear carta →",
  },

  pricingQuiz: {
    heading: "Crea tu plan",
    sub: "Paga solo por lo que usas. Empieza con la carta y añade lo que necesites.",
    billingLabel: "Facturación:",
    monthly: "Mensual",
    yearly: "Anual",
    restaurantsLabel: "Restaurantes:",
    fewerAria: "Menos restaurantes",
    moreAria: "Más restaurantes",
    menuTitle: "Carta digital",
    menuHint: "Siempre incluida",
    reservationsTitle: "Reservas",
    reservationsHint: "Reservas de mesa",
    kdsTitle: "Pantalla de cocina",
    kdsHint: "Pedidos en una pantalla de cocina",
    domainTitle: "Dominio propio",
    domainHint: "Tu propia dirección web",
    perMonthSuffix: "/mes",
    perYearSuffix: "/año",
    perMonthLongSuffix: "/mes",
    saveYearlyTemplate: "Ahorra {amount} al año con la facturación anual",
    volumeDiscountTemplate: "{percent}% de descuento por volumen · {count} restaurantes",
    saveUpToHint: "Ahorra hasta un 50% con 5+ restaurantes",
    billedYearly: "Se factura una vez al año",
    billedMonthly: "Se factura mensualmente",
    enterprisePre: "¿Necesitas un plan a medida o más restaurantes?",
    enterpriseCta: "Habla con nosotros",
    enterprisePost: "y te lo preparamos a tu medida.",
    enterpriseWa: "¡Hola! Me gustaría un plan a medida para mis restaurantes.",
  },

  pricingCta: {
    heading: "Precios simples y flexibles",
    sub: "Paga solo por las funciones que necesitas — crea tu propio plan en un minuto.",
    fromTemplate: "desde {price}/mes",
    button: "Calcula tu plan",
  },

  footer: {
    featureLinks: [
      { href: "/es/menu-digital-restaurantes", label: "Carta digital" },
      { href: "/es/sistema-pedidos-restaurante", label: "Pedidos" },
      { href: "/es/reservas-de-mesas", label: "Reservas" },
      { href: "/es/pantalla-de-cocina", label: "Pantalla de cocina" },
    ],
    navLinks: [
      { href: "/es/precios", label: "Precios" },
      { href: "#faq", label: "FAQ" },
      { href: "/es/languages", label: "Cambiar idioma" },
    ],
    copyrightTemplate: "© {year} IQ Rest. Todos los derechos reservados.",
  },
};
