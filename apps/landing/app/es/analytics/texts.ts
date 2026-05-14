import type { FeatureTexts } from "@/app/_landing/types";

export const TEXTS: FeatureTexts = {
  meta: {
    title: "Analítica de carta de restaurante — Escaneos QR, platos top, idiomas de turistas",
    description:
      "Mira exactamente cómo usan los clientes tu menú QR. Escaneos diarios, platos más vistos, preferencias de idioma, horas punta. Decisiones basadas en datos.",
    canonical: "https://iq-rest.com/es/analytics",
    ogLocale: "es_ES",
    ogTitle: "Analítica de restaurante — Mide escaneos QR, platos e idiomas",
    ogDescription:
      "Sabe qué platos miran realmente tus clientes, cuándo son las horas punta y qué nacionalidad turística está esta noche en tu sala. 14 días gratis.",
  },

  hero: {
    title: "Deja de adivinar. Sabe qué hacen los clientes.",
    subtitle:
      "Mira analíticas de la carta del restaurante en tiempo real — escaneos QR por hora, los platos en los que se detienen los clientes, los idiomas que usan los turistas, el día más flojo de la semana — y úsalo para imprimir menos cartas, programar mejor y empujar los especiales correctos.",
    trustLine: "Más de 500 restaurantes en más de 30 países",
  },

  seo: {
    description:
      "Analíticas de restaurante que no requieren un equipo de datos. IQ Rest registra cada escaneo, vista, cambio de idioma y pedido desde tu menú QR, y saca a la luz los patrones que importan: platos más vistos, horas pico de escaneos, día más fuerte de la semana, desglose por idioma de tu mezcla turística. Toma decisiones basadas en datos sin abrir una hoja de cálculo.",
    fullDescription:
      "La mayoría de restaurantes funcionan a instinto — 'me da que los martes son flojos', 'creo que la pasta se está vendiendo bien'. El instinto está bien, pero los datos están mejor. IQ Rest registra cada interacción con tu menú QR para que no tengas que adivinar: cuántas veces se ha escaneado tu QR hoy, qué platos han mirado los clientes durante más tiempo, cuáles añadieron al carrito pero no pidieron, qué idioma usaron los turistas.\n\nEl panel de analíticas te muestra las respuestas en tres vistas: hoy (escaneos en directo, pedidos actuales, qué se está pidiendo ahora), esta semana (top 10 de platos, horas punta, desglose por idioma, no-shows en reservas), y tendencias (crecimiento mes contra mes, estacionalidad, patrones por día de la semana). Puedes profundizar en cualquier plato para ver cuántas veces se ve frente a cuántas se pide (un plato visto 200 veces y pedido 5 tiene un problema de copy o foto), o en cualquier idioma para ver qué mezcla turística estás atendiendo.\n\nEl objetivo son decisiones, no dashboards: 'el martes que viene es históricamente flojo → push de hora feliz', 'los italianos piden pasta 3 veces más que los locales → pasta primero cuando idioma=it', 'este plato tiene 90% de visualización pero 5% de pedido → mejorar la foto'. Cambios reales, ingresos reales, sin MBA.",
    benefitsHeading: "Por qué los restaurantes prefieren la analítica de IQ Rest a Google Analytics",
    benefits: [
      "Contador de escaneos QR en directo — ve cómo se llena tu noche en tiempo real",
      "Platos más vistos y más pedidos — detecta lo que funciona y lo que no",
      "Desglose por idioma — sabe qué turistas están en tu sala",
      "Horas punta y patrones por día — programa mejor, prepara mejor",
      "Conversión vista-a-pedido por plato — corrige fotos malas y descripciones flojas",
      "Analítica de reservas — fuentes, ratio de no-shows, mezcla de tamaños de mesa",
    ],
  },

  pricing: {
    heading: "Un plan.",
    headingAccent: "Analítica completa incluida.",
    sub: "Analítica de restaurante, pedidos QR, traducción con IA y reservas — todo en un precio único. Sin nivel premium para datos, jamás.",
  },

  faq: {
    sub: "Todo lo que los hosteleros preguntan sobre la analítica de la carta. ¿No ves la tuya? Escríbenos por WhatsApp — responden personas reales.",
    items: [
      {
        q: "¿Qué puedo ver realmente en el panel de analíticas?",
        a: "Escaneos QR en directo (hoy, esta semana, este mes), platos más vistos, platos más pedidos, conversión vista-a-pedido por plato, desglose por idioma de los clientes, horas punta por día de la semana, ticket medio, mesas más concurridas, ratio de no-shows en reservas y tendencias temporales. Todo en un solo panel, sin configuración.",
      },
      {
        q: "¿Cómo uso esto realmente para crecer en ingresos?",
        a: "Tres patrones funcionan en la mayoría de restaurantes: (1) reordenar la carta para que los platos que más convierten salgan primero; (2) corregir foto o descripción en platos con muchas vistas y pocos pedidos; (3) empujar una hora feliz o especial en días/horas históricamente flojos. Hemos visto restaurantes subir ingresos entre semana un 15–30% solo con estos tres cambios.",
      },
      {
        q: "¿Es anónimo o seguís a personas individuales?",
        a: "Anónimo y agregado. Registramos vistas y pedidos por sesión, no por usuario identificable. Sin emails, sin teléfonos, sin direcciones IP guardadas a largo plazo. El panel te muestra patrones ('200 escaneos el viernes'), no personas. Cumple GDPR por diseño.",
      },
      {
        q: "¿Puedo exportar los datos?",
        a: "Sí. Exporta cualquier vista como CSV (top de platos, escaneos diarios, desglose horario, etc.) y ábrelo en Excel o Google Sheets. Útil para compartir con socios, contables o para combinar con tus datos del TPV.",
      },
      {
        q: "¿Necesito alguna configuración técnica para tener analítica?",
        a: "Cero. La analítica está activa por defecto desde el momento en que tu menú QR está online — cada escaneo, vista y pedido se registra automáticamente. El panel forma parte de la suscripción estándar, no es un upsell, y verás datos útiles desde el primer día de clientes escaneando.",
      },
    ],
  },

  finalCta: {
    heading: "Deja de adivinar.",
    headingAccent: "Empieza a medir.",
    sub: "Analítica de escaneos QR en directo, platos top, horas punta, desglose por idioma turístico. 14 días gratis, sin tarjeta.",
  },
};
