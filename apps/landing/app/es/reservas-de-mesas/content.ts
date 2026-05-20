import { CalendarPlus, CalendarDays } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "es",
  slug: "reservas-de-mesas",
  trackPrefix: "l_es_bookings",

  meta: {
    title: "Reservas de mesa 24/7 para restaurantes | IQ Rest",
    description:
      "Reservas de mesa 24/7 para restaurantes: los comensales reservan ellos mismos a través de la carta QR o la web. Calendario por mesa, confirmaciones automáticas y recordatorios. Ni un solo cliente perdido. 14 días gratis.",
    canonical: "https://iq-rest.com/es/reservas-de-mesas",
    ogLocale: "es_ES",
    ogTitle: "Reservas de mesa 24/7 — los comensales reservan ellos mismos",
    ogDescription:
      "Los comensales reservan mesa desde la carta QR o la web. Calendario, confirmaciones automáticas y recordatorios. Ni un solo cliente perdido.",
    brandLine: "IQ Rest — Reservas de mesa para restaurantes",
  },

  hero: {
    headline: "Reservas de mesa 24/7 — los comensales reservan ellos mismos.",
    sub: "Los comensales reservan a través de la carta QR o de un enlace directo. Calendario por mesa, confirmaciones automáticas y recordatorios. Ni un solo cliente perdido y ni una llamada en hora punta.",
    imageSrc: "/landing/feature-reservation.webp",
    imageAlt: "Maître gestiona las reservas desde una tableta en la entrada del restaurante",
  },

  scan: {
    heading: "Pon en marcha las reservas de mesa",
    headingAccent: "en 5 minutos.",
    sub: "Conecta el calendario, añade las mesas con fotos y aforo — los comensales empiezan a reservar el mismo día.",
    cta: "Activar reservas",
  },

  subFeatures: [
    {
      icon: CalendarPlus,
      eyebrow: "Formulario de reserva",
      heading: "Los comensales reservan solos — por fecha, hora y número de personas.",
      body: "El comensal abre la carta QR o un enlace directo, elige fecha, hora y número de personas — y ve al momento las mesas disponibles: con foto, descripción (terraza, junto a la ventana, sofá del bar) y aforo. La confirmación se envía automáticamente por correo y WhatsApp.",
      bullets: [
        "Selección de mesa por foto, descripción y aforo.",
        "Confirmación automática y recordatorio una hora antes de la visita.",
        "Mínimos campos en el formulario: nombre, teléfono, número de personas.",
      ],
      image: { src: "/landing/feature-booking-form.webp", alt: "Comensal reserva mesa en un restaurante desde el móvil: fecha, hora, número de personas y selección de mesa" },
    },
    {
      icon: CalendarDays,
      eyebrow: "Calendario de reservas",
      heading: "Calendario por días y mesas — todo a la vista de un golpe.",
      body: "En el panel de administración aparece el calendario de reservas distribuido por mesa, día, semana y mes. Huecos libres, mesas ocupadas, reservas confirmadas y pendientes — todo en una sola pantalla. Funciona en una tableta en sala y en un portátil en la oficina.",
      bullets: [
        "Vistas por día, semana y mes.",
        "Desglose por mesa: quién, cuándo y cuántas personas.",
        "Mover, cancelar o confirmar una reserva con un solo toque desde el móvil.",
      ],
      image: { src: "/landing/feature-booking-calendar.webp", alt: "Calendario de reservas en el panel de administración de IQ Rest sobre dos tabletas: vista diaria por mesas y vista mensual" },
    },
  ],

  faq: {
    sub: "Lo que los restauradores preguntan sobre las reservas de mesa en IQ Rest. ¿No encuentras tu pregunta? Escríbenos por WhatsApp.",
    items: [
      { q: "¿Puedo elegir los días y horarios disponibles para reservar?", a: "Sí. Desde el panel se configuran los horarios de apertura y los días disponibles — el sistema no muestra a los comensales franjas no disponibles. También puedes cerrar una fecha concreta (evento corporativo, reserva privada) o desactivar todo el calendario temporalmente." },
      { q: "¿Puedo subir una foto de cada mesa?", a: "Sí. Cada mesa puede tener foto, descripción (terraza, junto a la ventana, sofá del bar) y aforo. El comensal ve qué mesa está reservando y elige con criterio — esto reduce las expectativas no cumplidas." },
      { q: "¿Puedo desactivar las reservas en fechas concretas?", a: "Sí. En el calendario se cierran fechas concretas (fiestas, eventos privados, obras) o días enteros de la semana. Esos días los comensales ven un mensaje «reservas no disponibles temporalmente»." },
      { q: "¿Puedo personalizar qué datos pedimos al comensal?", a: "Sí. El conjunto estándar: nombre, teléfono, correo, número de personas. Puedes añadir campos personalizados (motivo, alergias, peticiones especiales) o retirar los que no necesites, para mantener el formulario lo más corto posible." },
      { q: "¿Se puede limitar el número de comensales por mesa?", a: "Sí. Cada mesa tiene un parámetro de «aforo» — el sistema no permite reservar una mesa de 2 para 6 personas. En las mesas grandes puedes definir un mínimo, para que los grupos pequeños no ocupen una de ocho cuando hace falta para grupos más grandes." },
      { q: "¿Es fácil ponerlo en marcha?", a: "La configuración lleva poco tiempo. Tres pasos: (1) añade las mesas con nombre, foto y aforo, (2) activa el modo reservas en los ajustes, (3) comparte el enlace o el QR con los comensales. La puesta en marcha completa tarda 5–10 minutos." },
      { q: "¿Puedo usar el sistema en mi propio dominio?", a: "Sí. Admitimos un dominio propio con certificado SSL: los comensales reservan en la dirección de tu restaurante (por ejemplo, reservas.turestaurante.com). Te ayudamos con la configuración DNS; suele llevar 5–10 minutos." },
      { q: "¿Se puede configurar confirmación automática o manual?", a: "Sí, el modo se elige en los ajustes. Con la confirmación automática el comensal recibe la confirmación al instante y la reserva se da por aceptada. Con la confirmación manual la solicitud aparece en el panel con estado «pendiente de confirmar» — el responsable la revisa y la confirma o rechaza. El modo manual es útil cuando hay pocas mesas o una política de admisión estricta." },
      { q: "¿Cobráis comisión por cada reserva?", a: "No. Las reservas de mesa están totalmente incluidas en el plan Pro — sin porcentaje al comensal, sin tarifa por hueco y sin comisiones de agregadores. Una única cuota mensual fija y reservas ilimitadas." },
    ],
  },
};
