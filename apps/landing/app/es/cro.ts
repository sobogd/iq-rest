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
    sub: "La plataforma completa para gestionar un restaurante moderno: bonita, todo en un solo lugar y sin conocimientos técnicos.",
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
    { Icon: Receipt, tag: "Pedidos en mesa", title: "Pedidos directos a cocina.", bullets: ["Cliente o camarero","Directo a cocina","Actívalo cuando quieras"], image: "/landing/feature-orders.webp", imageAlt: "Camarero toma un pedido en la mesa desde el móvil y llega a la pantalla de cocina" },
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

  how: {
    heading: "Listo en 5 minutos",
    sub: "Cuatro pasos. Sin instalaciones, sin configuración técnica, sin tarjeta.",
    steps: [
      { n: "1", t: "Tipo y nombre", d: "Tipo de local y nombre: ese es todo el registro." },
      { n: "2", t: "Entra", d: "Email o Google. Sin tarjeta." },
      { n: "3", t: "Añade la carta", d: "Escríbela o deja que la IA escanee tu carta en papel." },
      { n: "4", t: "Ya estás", d: "Carta, cocina y reservas — listas." },
    ],
  },
};
