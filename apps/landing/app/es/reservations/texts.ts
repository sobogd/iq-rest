import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Sistema de reservas para restaurantes — Reservas 24/7, sin llamadas",
    description:
      "Acepta reservas de mesa 24/7 desde tu menú QR y tu web. Widget de reservas con tu marca, recordatorios por email, menos no-shows. 14 días gratis.",
    canonical: "https://iq-rest.com/es/reservations",
    ogLocale: "es_ES",
    ogTitle: "Reservas de restaurante — Sistema de reserva de mesa 24/7",
    ogDescription:
      "Deja de perder reservas mientras cocinas. Los clientes reservan 24/7 desde tu menú QR, reciben recordatorios por email y reduces no-shows. 14 días gratis.",
  },

  hero: {
    title: "Deja de perder reservas mientras cocinas.",
    subtitle:
      "Acepta reservas de mesa 24/7 — directamente desde tu menú QR, web e Instagram. Los clientes eligen fecha, hora y comensales, tú confirmas con un toque y los recordatorios por email salen automáticamente. Menos llamadas, menos no-shows, más cubiertos por noche.",
    trustLine: "4,9 · más de 500 restaurantes en más de 30 países",
  },

  seo: {
    description:
      "Un sistema completo de reservas integrado en tu menú QR. Los clientes reservan mesa desde tu carta, tu web, el enlace de tu bio de Instagram o un botón en Google Maps — a cualquier hora, día o noche. Tú ves las reservas nuevas en tiempo real, confirmas o rechazas con un toque, y el sistema envía recordatorios por email que reducen drásticamente los no-shows. Sin recortes de OpenTable, sin comisión por cubierto, sin contrato.",
    fullDescription:
      "Las reservas por teléfono están muriendo. Los turistas no llaman (prefijo distinto, barrera idiomática), los millennials no llaman (generación que prefiere texto), y pierdes la mitad de las reservas durante el servicio cuando no contesta nadie. Las reservas de IQ Rest viven donde ya están tus clientes: en tu carta, en el navegador del móvil, en el enlace de tu bio de Instagram.\n\nEl flujo de reserva son dos pantallas — eligen fecha y comensales, dejan nombre y teléfono, opcionalmente añaden una nota ('cumpleaños', 'alergia: frutos secos', 'trona, por favor'). Recibes la reserva al instante con un confirmar/rechazar de un toque. Los clientes confirmados reciben automáticamente un recordatorio por email 24h antes, lo que ya reduce los no-shows en torno al 30%. También puedes definir cubiertos máximos por turno, fechas bloqueadas y qué mesas son reservables vs solo walk-in.\n\nA diferencia de OpenTable o ElTenedor, no hay comisión por cubierto, ni una app aparte que descargar, ni un tercero entre tú y el cliente. La reserva es tuya, los datos son tuyos y el sistema forma parte de tu suscripción — no es un impuesto por reserva.",
    benefitsHeading: "Por qué los restaurantes dejan OpenTable por las reservas de IQ Rest",
    benefits: [
      "Reservas 24/7 desde menú QR, web, Instagram y botón de Google Maps",
      "Sin comisión por cubierto — suscripción fija, te quedas con el 100% de los ingresos",
      "Recordatorios automáticos por email reducen los no-shows ~30% de media",
      "Confirmar / rechazar con un toque desde el móvil, sin sala de espera",
      "Cubiertos máximos por turno, fechas bloqueadas, reglas de reserva por mesa",
      "Peticiones especiales (alergias, cumpleaños) capturadas con cada reserva",
    ],
  },

  pricing: {
    heading: "Un plan.",
    headingAccent: "Reservas ilimitadas.",
    sub: "Reservas, menú QR, pedidos online y traducción con IA — todo en un precio único. Sin coste por cubierto, sin comisión, sin contrato.",
  },

  faq: {
    sub: "Todo lo que los hosteleros preguntan sobre las reservas online. ¿No ves la tuya? Escríbenos por WhatsApp — responden personas reales.",
    items: [
      {
        q: "¿Cobráis comisión por reserva como OpenTable o ElTenedor?",
        a: "Cero. Las reservas forman parte de tu suscripción mensual fija — reserves 10 cubiertos al día o 1.000, el precio es idéntico. Sin coste por cubierto, sin impuesto por reserva, sin recortar tus ingresos. Frente a los 1–2,50 € por cubierto de OpenTable, un restaurante de 50 cubiertos al día se ahorra 1.500–3.750 € al mes.",
      },
      {
        q: "¿Cómo reservan los clientes — necesitan una app?",
        a: "Sin app. Escanean tu QR o pulsan tu enlace de reserva — fecha, hora, comensales, nombre, teléfono, nota opcional. Listo. Todo el flujo dura menos de 30 segundos y funciona en cualquier navegador. También puedes incrustar el formulario de reserva en tu web o compartir una URL limpia de reserva en Instagram.",
      },
      {
        q: "¿Puedo confirmar las reservas manualmente o se autoconfirman?",
        a: "Los dos modos — tú eliges por turno o por día. Autoconfirmación si confías en tu disponibilidad y quieres parecer reactivo 24/7. Confirmación manual si quieres filtrar reservas (fines de semana fuertes, eventos especiales). Recibes la reserva al instante y la confirmas con un toque desde el móvil.",
      },
      {
        q: "¿Cómo gestiona el sistema los no-shows?",
        a: "Los recordatorios por email se envían 24h y (opcionalmente) 2h antes de la reserva — esto solo ya reduce los no-shows en torno al 30% frente a llamadas o sistemas sin recordatorio. También puedes pedir teléfono obligatorio, marcar clientes como 'no-show' en el panel y, con el tiempo, el sistema señala a los reincidentes.",
      },
      {
        q: "¿Puedo limitar cuántos cubiertos acepto por noche?",
        a: "Sí. Define cubiertos máximos por franja, cubiertos máximos por día y fechas bloqueadas (cierres, eventos privados). Incluso puedes marcar mesas concretas como 'reservables' vs 'solo walk-in', para que tus mejores ventanas queden libres para imprevistos. Turistas y locales reservan desde el mismo sistema sin pisar tu plano de sala.",
      },
    ],
  },

  finalCta: {
    heading: "Reservas mientras cocinas.",
    headingAccent: "Recordatorios para que aparezcan.",
    sub: "Acepta reservas 24/7 desde tu menú QR, web e Instagram. 14 días gratis, sin tarjeta, sin comisión por cubierto.",
  },
};
