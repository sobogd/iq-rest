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
} from "lucide-react";
import type { CroCopy } from "@/app/_landing/templates/cro-home-template";

export const CRO: CroCopy = {
  hero: {
    verticals: ["Restaurantes","Cafeterías","Bares","Pizzerías"],
    title: "Tu restaurante,",
    titleAccent: "100% digital en 5 minutos.",
    sub: "Una carta digital preciosa, una pantalla de cocina y reservas 24/7 — la plataforma completa para un restaurante moderno.",
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
        ],
      },
    ],
  },
};
