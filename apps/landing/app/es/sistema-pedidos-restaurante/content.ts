import { Map, ClipboardList, Receipt, Smartphone } from "lucide-react";
import type { FeatureContent } from "@/app/_landing/templates/types";

export const CONTENT: FeatureContent = {
  locale: "es",
  slug: "sistema-pedidos-restaurante",
  trackPrefix: "l_es_orders",

  meta: {
    title: "Sistema de pedidos para restaurante — Comensal y camarero | IQ Rest",
    description:
      "Sistema de pedidos para restaurante desde móvil o tableta: plano de sala, división de cuenta, estados, opciones y notas. El comensal pide desde la mesa; el camarero toma la comanda desde su dispositivo. 14 días gratis.",
    canonical: "https://iq-rest.com/es/sistema-pedidos-restaurante",
    ogLocale: "es_ES",
    ogTitle: "Sistema de pedidos para restaurante — Comensal y camarero",
    ogDescription:
      "Comensal en la mesa o camarero desde el móvil — el pedido llega al instante a la cocina. Plano de sala, división de cuenta, estados, opciones y notas.",
    brandLine: "IQ Rest — Sistema de pedidos para restaurante",
  },

  hero: {
    headline: "Pedidos: comensal y camarero — directo a la cocina.",
    sub: "El comensal pide a través de la carta QR en la mesa o el camarero toma la comanda desde su móvil o tableta — el pedido llega a la pantalla de cocina al instante. Plano de sala con mesas codificadas por color, división de cuenta, opciones flexibles y comentarios. Sin libretas y sin idas y venidas a la barra.",
    imageSrc: "/landing/feature-orders.webp",
    imageAlt: "Camarero toma una comanda en la mesa desde un smartphone — el pedido llega a la pantalla de cocina",
  },

  scan: {
    heading: "Pon en marcha el sistema de pedidos",
    headingAccent: "en 5 minutos.",
    sub: "Sube la carta en papel o en PDF — la IA reconoce platos, precios y categorías. Conecta una tableta en sala y empieza a recibir pedidos desde las mesas.",
    cta: "Escanear carta",
  },

  subFeatures: [
    {
      icon: Map,
      eyebrow: "Lista y plano de sala",
      heading: "Lista de pedidos junto al plano de la sala.",
      body: "Todos los pedidos activos a la derecha: estado, importe, hora y número de líneas. A la izquierda, el plano de la sala: las mesas se colorean según su estado — vacía, ocupada, requiere atención. Al tocar una mesa se abre el pedido; al tocar una tarjeta, su detalle. Sin saltar entre pantallas.",
      bullets: [
        "Plano de la sala con mesas codificadas por color según el pedido.",
        "Lista de pedidos al lado — importe, hora, número de líneas.",
        "Tocas una mesa y abres o creas un pedido.",
      ],
      image: { src: "/landing/feature-orders-map.webp", alt: "Tableta en la estación del camarero: lista de pedidos y plano de la sala con mesas de colores" },
    },
    {
      icon: ClipboardList,
      eyebrow: "Ficha del pedido",
      heading: "Ficha del pedido: estados, duplicar y eliminar — con un solo toque.",
      body: "Cada línea tiene su propio estado (Pendiente / En cocción / Listo / Servido) — cocina y camarero ven la misma información en tiempo real. Al tocar el punto de estado se abre el menú de acciones: cambiar estado, duplicar la línea con los mismos modificadores y opciones, eliminarla. Todo dentro de la ficha del pedido.",
      bullets: [
        "Estado por línea: Pendiente / En cocción / Listo / Servido.",
        "Duplica una línea con un toque, manteniendo las mismas opciones.",
        "Elimina una línea directamente desde la ficha del pedido.",
      ],
      image: { src: "/landing/feature-orders-detail.webp", alt: "Tableta con la ficha detallada del pedido: estados de los platos, duplicar y eliminar líneas" },
    },
    {
      icon: Receipt,
      eyebrow: "Dividir cuenta",
      heading: "Divide la cuenta cuando los comensales pagan por separado.",
      body: "Los comensales deciden pagar por separado — marca las líneas que se van a un nuevo ticket; el resto se queda en el actual. El sistema muestra al instante ambos importes. Un toque en «Dividir pedido» y tienes dos pedidos independientes con los totales correctos, ambos asignados a sus mesas.",
      bullets: [
        "Selección de líneas con casillas para dividir.",
        "Importe del nuevo ticket y del actual visibles al momento.",
        "Un toque y la cuenta se divide sin recalcular nada a mano.",
      ],
      image: { src: "/landing/feature-orders-split.webp", alt: "Tableta sobre una mesa de restaurante: división de la cuenta entre comensales" },
    },
    {
      icon: Smartphone,
      eyebrow: "Añadir desde el móvil",
      heading: "Añade líneas desde el móvil — en tres acciones.",
      body: "El camarero no depende de un único dispositivo: abre los pedidos en su móvil y añade una línea en tres pasos — categoría, plato, opciones (tamaño, punto, salsa o ingrediente extra). El precio se recalcula automáticamente. El comentario para la cocina se añade en el último paso.",
      bullets: [
        "Tres pasos: categoría → plato → opciones.",
        "Opciones (tamaño, extras, ingredientes) con precio en un clic.",
        "Campo de comentario en el último paso.",
      ],
      image: { src: "/landing/feature-orders-mobile.webp", alt: "Cuatro móviles con los pasos para añadir una línea al pedido: categoría, plato, tamaño, comentario" },
    },
  ],

  faq: {
    sub: "Lo que los restauradores preguntan sobre los pedidos en IQ Rest. ¿No encuentras tu pregunta? Escríbenos por WhatsApp.",
    items: [
      { q: "¿Pueden varios camareros trabajar a la vez desde dispositivos distintos?", a: "Sí. Cada camarero entra en la cuenta común del restaurante desde su móvil o tableta — todos ven las mismas mesas, pedidos y estados en tiempo real. Los cambios de un camarero aparecen al instante para el resto, sin conflictos ni bloqueos." },
      { q: "¿Pueden los camareros usar sus dispositivos personales?", a: "Sí. Es una aplicación web en el navegador: no hay que instalar nada. El camarero abre el enlace, entra en la cuenta del restaurante desde su iPhone, Android o tableta personal y empieza a trabajar. Al final del turno simplemente cierra la sesión." },
      { q: "¿Se pueden añadir opciones obligatorias a los platos (tamaño, punto, etc.)?", a: "Sí. En cada plato se pueden configurar tantos grupos de opciones como quieras — obligatorios (por ejemplo «Tamaño»: Pequeño / Mediano / Grande) y opcionales («Punto de cocción»: poco hecho / al punto / muy hecho). Las opciones pueden modificar el precio (+1,00 €). En las opciones obligatorias el sistema no deja añadir el plato sin elegir." },
      { q: "¿Se pueden añadir comentarios o extras (pan, salsa) al plato?", a: "Sí. En el último paso del alta hay un campo de texto libre («sin cebolla», «muy hecho», «alergia a frutos secos»). Los extras se gestionan como modificadores con precio («+ Salsa barbacoa +1,50 €», «+ Pan +2,00 €»). Los comentarios se muestran en la pantalla de cocina con un color destacado." },
      { q: "¿Hay estadísticas de los pedidos?", a: "Sí. En la sección de analíticas: ingresos por día y por hora, ticket medio, platos top, conversión carta → pedido, velocidad de servicio (tiempo de Pendiente a Servido). Ayuda a planificar turnos, compras y a ver qué platos rotan menos." },
      { q: "¿Se pueden dividir o mover pedidos entre mesas?", a: "Sí, ambos casos. Para dividir, marca las líneas que se van al nuevo ticket (cuando los comensales pagan por separado). Para mover, abre la ficha del pedido, elige una mesa nueva y el pedido se traslada por completo. Todo sin recalcular a mano y sin salir del panel." },
    ],
  },
};
