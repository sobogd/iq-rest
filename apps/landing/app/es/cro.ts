import {
  Languages,
  ChefHat,
  CalendarCheck,
  Receipt,
  ScanLine,
  Globe,
  BarChart3,
  QrCode,
  Smartphone,
  Palette,
  Rocket,
  MessagesSquare,
  ClipboardList,
  WheatOff,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { CroCopyV2 } from "@/app/_landing/templates/cro-home-template-v2";

export const CRO: CroCopyV2 = {
  hero: {
    verticals: ["Restaurantes","Cafeterías","Bares","Pizzerías"],
    title: "Tu restaurante, digital",
    titleAccent: "en 5 min.",
    sub: "Carta digital, pantalla de cocina y reservas 24/7 — todo lo que tu restaurante necesita, listo en 5 minutos.",
  },

  heroV2: {
    verticals: [
      { icon: "restaurant", label: "Restaurantes" },
      { icon: "cafe", label: "Cafeterías" },
      { icon: "bar", label: "Bares" },
      { icon: "pizza", label: "Pizzerías" },
    ],
    title: "Todo lo que necesita",
    titleAccent: "tu restaurante",
    sub: "Configura tus procesos en 10 minutos: lanza el menú online, optimiza el trabajo de la cocina y controla la ocupación de las mesas.",
    primaryLabel: "Empezar gratis",
    demoLabel: "Ver demo",
    mockups: {
      kds: { src: "/landing/hero-card-kds.webp", alt: "Tableta con la pantalla de cocina: comandas por mesa en columnas con estados" },
      reservations: { src: "/landing/hero-card-reservation.webp", alt: "Tableta con el calendario de reservas: vista mensual y reservas pendientes de confirmar" },
      phone1: { src: "/landing/hero-card-menu.webp", alt: "Móvil con la página principal del sitio web de un restaurante: foto, reservas y menú online" },
      phone2: { src: "/landing/hero-card-dish.webp", alt: "Móvil con la ficha de un plato: foto, precio y etiquetas de alérgenos" },
    },
  },

  heroCards: [
    { Icon: Rocket, title: "En marcha en 10 minutos", sub: "Sin comprar equipos caros ni configuraciones largas" },
    { Icon: MessagesSquare, title: "Soporte rápido", sub: "Respondemos por chat en pocas horas" },
    { Icon: Globe, title: "La elección de {count} locales", sub: "Restaurantes y cafeterías de más de 15 países confían en nosotros" },
    { Icon: Palette, title: "100% con tu marca", sub: "Adaptamos el diseño y la interfaz al estilo de tu local" },
  ],

  menu: {
    heading: "Sitio web y menú digital",
    sub: {
      link: "¡Más que un menú QR!",
      rest: " Consigue un sitio web completo con diseño único, página de contacto y reserva de mesas.",
    },
    moreLabel: "Saber más",
    mockupAlt: "Dos móviles: la página principal del sitio web de un restaurante y la página de un plato",
    bullets: [
      { Icon: Languages, title: "Traducción automática a 35 idiomas", sub: "Atiende a los turistas sin barrera de idioma: la traducción automática lo hace todo" },
      { Icon: ClipboardList, title: "Pedidos desde la mesa", sub: "Simplifica el servicio: recibe pedidos desde la mesa, rápido y sin camarero" },
      { Icon: WheatOff, title: "Alérgenos y dietas", sub: "Marca alérgenos y preferencias (vegano, picante) para que elegir sea fácil y seguro" },
    ],
  },

  reservations: {
    heading: "Reserva de mesas",
    sub: {
      link: "¡Reservas inteligentes de mesas!",
      rest: " Un sistema automático de reservas que controla por sí solo las mesas libres y tu horario.",
    },
    moreLabel: "Saber más",
    mockupAlt: "Tableta con el calendario de reservas: mesas por día y franja horaria",
    bullets: [
      { Icon: CalendarCheck, title: "Mapa de reservas claro", sub: "Un cuadro visual por días y mesas: los huecos libres se ven de un vistazo" },
      { Icon: SlidersHorizontal, title: "Configuración flexible", sub: "Define horarios, duración de las franjas, fotos de las mesas y recoge peticiones de los clientes" },
      { Icon: Users, title: "Control del flujo de clientes", sub: "Elige cómo gestionar las reservas y controla por completo el flujo de clientes" },
    ],
  },

  heroMicrocopy: "{count} restaurantes · 14 días gratis · Sin tarjeta",
  seeIncluded: "Ver qué incluye",

  trust: [
    { kind: "num", value: 35, label: "Idiomas" },
    { kind: "text", value: "24/7", label: "Reservas" },
    { kind: "num", value: 5, suffix: " min", label: "Puesta a punto" },
    { kind: "count", label: "Restaurantes" },
  ],

  bundle: {
    heading: "Todo lo que mueve tu restaurante.",
    headingAccent: "En una sola app.",
    sub: "Carta, cocina y reservas en un único lugar: moderno, rápido y pensado para cómo funcionan de verdad los restaurantes. Sin extras, sin pago por función.",
  },

  benefits: [
    { Icon: Languages, tag: "Carta digital", title: "Una carta que vende.", bullets: ["35 idiomas con IA","Diseño premium","Precios al instante"], image: "/landing/feature-design.webp", imageAlt: "Dos móviles en la mesa de un café: la pantalla de bienvenida de la carta digital y la página de contacto con un mapa" },
    { Icon: ChefHat, tag: "Pantalla de cocina", title: "Cocina más rápido, sin fallos.", bullets: ["En vivo en pantalla","Notas y alérgenos","Tablet o móvil"], image: "/landing/feature-kds-cards.webp", imageAlt: "Tablet en la barra mostrando la pantalla de cocina con comandas por mesa" },
    { Icon: CalendarCheck, tag: "Reservas", title: "Reservas en piloto automático.", bullets: ["Reserva sin llamadas","Confirmación automática","Calendario por mesa"], image: "/landing/feature-booking-calendar.webp", imageAlt: "Dos tablets mostrando el calendario de reservas: vista diaria por mesa y vista mensual" },
    { Icon: Receipt, tag: "Pedidos en mesa", title: "Pedidos directos a cocina.", bullets: ["Cliente o camarero","Directo a cocina","Actívalo cuando quieras"], image: "/landing/feature-orders-map.webp", imageAlt: "Tablet con la pantalla de pedidos: lista de pedidos y plano de sala con mesas por colores." },
  ],

  seeDetails: "Ver detalles",

  extras: {
    heading: "Y todo lo demás incluido.",
    items: [
      { Icon: ScanLine, label: "La IA digitaliza tu carta en papel en 60 segundos" },
      { Icon: QrCode, label: "Un código QR único para cada mesa" },
      { Icon: Smartphone, label: "Sin app para los clientes: se abre en el navegador" },
      { Icon: Globe, label: "Tu propio dominio con SSL" },
      { Icon: BarChart3, label: "Analíticas de ventas: ingresos, platos top, horas" },
      { Icon: Palette, label: "Etiquetas de alérgenos y dietas para filtrar" },
    ],
  },

  midCta: {
    heading: "Una app en lugar de cinco.",
    sub: "Sin malabares con herramientas distintas para la carta, la cocina y las reservas: todo en un solo lugar, en cualquier móvil o tablet y sin instalar nada.",
  },

  platform: {
    hardwareTitle: "Trabaja con tu propio hardware",
    hardwareSub: "Nunca te obligamos a comprarnos hardware. Usa los teléfonos, tablets y ordenadores que ya tienes.",
    anywhereTitle: "Funciona en cualquier dispositivo",
    anywhereSub: "Móvil, tablet, portátil, PC. Android, iOS, Windows, Mac, Linux. Funciona en cualquier navegador moderno, sin instalar nada.",
  },

  activities: {
    heading: "Un solo sistema,",
    headingAccent: "todo tu restaurante.",
    sub: "Servicio más rápido, una cocina más tranquila, menos costes y una experiencia que el cliente recuerda — todo en una plataforma.",
    groups: [
      {
        Icon: Smartphone,
        tag: "En la mesa — clientes",
        bullets: [
          "Carta QR en 35 idiomas",
          "Pedir sin esperar al camarero",
          "Llamar al camarero o pedir la cuenta",
          "Reservar mesa 24/7",
          "Un código QR único para cada mesa",
          "Sin app para los clientes: se abre en el navegador",
          "Etiquetas de alérgenos y dietas para filtrar",
        ],
      },
      {
        Icon: ChefHat,
        tag: "En la cocina",
        bullets: [
          "Los pedidos llegan a la pantalla al instante",
          "Columnas en preparación / listo / servido",
          "Alérgenos y notas resaltados",
          "Tablet o móvil — sin tickets en papel",
        ],
      },
      {
        Icon: BarChart3,
        tag: "Gestión",
        bullets: [
          "Cambios de carta y precios al instante",
          "Traducción con IA en un clic",
          "Analíticas de ventas e informes",
          "Varios restaurantes en una sola cuenta",
          "La IA digitaliza tu carta en papel en 60 segundos",
          "Tu propio dominio con SSL",
        ],
      },
    ],
  },
};
