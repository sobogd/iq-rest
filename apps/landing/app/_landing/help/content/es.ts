import type { HelpDoc } from "../types";

// ES help guide. Section ids shared across locales.
export const es: HelpDoc = {
  metaTitle: "Cómo usar IQ Rest — guía paso a paso",
  metaDescription:
    "Guía completa de IQ Rest: registro, menú, pedidos, reservas, pantalla de cocina y ajustes — para restaurantes.",
  h1: "Ayuda",
  intro: "Una guía detallada de IQ Rest — desde el registro hasta los ajustes más finos.",
  banner: {
    title: "Es más fácil de lo que parece",
    sub: "Una guía paso a paso: del registro a los ajustes más finos — cualquiera puede hacerlo.",
    cta: "Cómo se usa",
  },
  tipLabel: "Consejo",
  noteLabel: "Importante",
  sections: [
    {
      id: "start",
      title: "1. Primeros pasos",
      blocks: [
        { type: "h3", text: "Qué es este sistema" },
        {
          type: "p",
          text: "IQ Rest es un servicio para restaurantes: creas un menú online con código QR, recibes pedidos y reservas de mesa directamente desde el móvil de los clientes, mientras que en la cocina y los camareros funcionan tablets-terminal. Todo se gestiona desde un único panel de administración (el dashboard).",
        },
        { type: "h3", text: "Registro e inicio de sesión" },
        { type: "p", text: "Puedes entrar de tres formas — elige cualquiera en la pantalla de acceso:" },
        {
          type: "list",
          items: [
            "Con Google — pulsa “Continuar con Google” y elige la cuenta.",
            "Con Apple — pulsa “Continuar con Apple”.",
            "Por email — pulsa “Continuar con email”, introduce la dirección y te enviaremos un código de 6 dígitos. Introdúcelo en la pantalla siguiente. No hace falta contraseña.",
          ],
        },
        {
          type: "note",
          text: "Por email solo recibes un código de acceso de un solo uso — sin spam ni newsletters.",
        },
        { type: "h3", text: "Crear el restaurante (onboarding)" },
        {
          type: "p",
          text: "En el primer acceso el sistema te guía por una configuración rápida. Después se crea automáticamente un restaurante con un menú de ejemplo que luego sustituirás por el tuyo.",
        },
        {
          type: "steps",
          items: [
            "Indica el nombre del restaurante.",
            "Elige el tipo de cocina (determina la plantilla de menú inicial).",
            "Listo: entras en el dashboard con un menú de ejemplo ya cargado.",
          ],
        },
        {
          type: "note",
          text: "La moneda se detecta automáticamente según tu región — no hace falta elegirla al inicio. Podrás cambiarla más tarde en Ajustes → Región.",
        },
        { type: "h3", text: "Vista general del dashboard" },
        {
          type: "p",
          text: "La navegación entre secciones: en ordenador es una barra superior, en el móvil una barra inferior. Secciones: Menú, Pedidos, Reservas, Cocina, Analíticas y Ajustes.",
        },
        {
          type: "list",
          items: [
            "Junto al nombre del restaurante, en la barra superior, hay un pequeño indicador de conexión: un punto verde significa que los pedidos se sincronizan en tiempo real.",
            "En la página “Menú”, arriba, está el botón “Vista previa” — abre tu menú tal como lo ve el cliente.",
            "Ahí mismo el botón “Compartir” — muestra el código QR y el enlace al menú (puedes copiar el enlace, descargar el QR o abrir el menú).",
          ],
        },
        {
          type: "tip",
          text: "Pulsa “Vista previa” después de cada cambio en el menú — ves al instante cómo le aparece al cliente.",
        },
      ],
    },
    {
      id: "menu",
      title: "2. Menú",
      blocks: [
        {
          type: "p",
          text: "La sección “Menú” es el corazón del sistema. Aquí montas la estructura: categorías → platos → opciones. Ábrela desde la navegación.",
        },
        { type: "h3", text: "Categorías y subcategorías" },
        {
          type: "steps",
          items: [
            "Pulsa “Añadir categoría” e introduce un nombre (por ejemplo “Entrantes”).",
            "Para editar una categoría — pasa el cursor por encima y pulsa “Editar categoría”.",
            "El orden de las categorías se cambia con los botones “Arriba” / “Abajo” — el cliente las verá exactamente en ese orden.",
            "Puedes crear un “Grupo” (con “Añadir grupo”) — una categoría-sección que contiene otras categorías dentro.",
          ],
        },
        { type: "h3", text: "Añadir platos" },
        {
          type: "steps",
          items: [
            "Despliega una categoría (flecha a la izquierda) y pulsa “Añadir plato”.",
            "Rellena el nombre, el precio y la descripción.",
            "Añade una foto: “Añadir foto” — sube la tuya, o pulsa “Generar” y describe el plato con palabras para que la IA cree la imagen.",
            "Guarda. El plato aparece en la categoría.",
          ],
        },
        {
          type: "tip",
          text: "La foto se puede generar con IA: indica el ángulo, la iluminación o el fondo (por ejemplo “Pizza Margarita sobre una tabla de madera, vista desde arriba”).",
        },
        { type: "h3", text: "Opciones y variantes (modificadores)" },
        {
          type: "p",
          text: "Las opciones son elecciones dentro de un plato: tamaño, punto de cocción, ingredientes extra. Cada opción tiene variantes, y a una variante se le puede añadir un recargo (por ejemplo “+1.50 cada una”).",
        },
        {
          type: "list",
          items: [
            "Ejemplo: una opción “Tamaño” con variantes “Pequeña / Grande (+2.00)”.",
            "Ejemplo: una opción “Extra” con varias variantes donde el cliente elige una o varias.",
          ],
        },
        { type: "h3", text: "Alérgenos y dietas" },
        {
          type: "p",
          text: "En un plato puedes marcar alérgenos (gluten, frutos secos, etc.) y etiquetas dietéticas (vegetariano, vegano). El cliente los verá como iconos en el menú público.",
        },
        { type: "h3", text: "Visibilidad de los platos" },
        {
          type: "p",
          text: "El botón “Ocultar plato” / “Mostrar plato” quita temporalmente un elemento del menú público sin eliminarlo — útil cuando un plato se ha agotado.",
        },
        { type: "h3", text: "Subir un menú en papel (escaneo)" },
        {
          type: "p",
          text: "Si ya tienes un menú como foto o PDF — no lo escribas a mano. Usa el escaneo:",
        },
        {
          type: "steps",
          items: [
            "Pulsa el banner “Subir menú” (o “Sube tu menú en papel”).",
            "Añade hasta 5 archivos (foto/escaneo, hasta 20 MB cada uno) y pulsa “Escanear”.",
            "Espera hasta un minuto — la IA reconoce categorías y platos.",
            "Revisa lo reconocido, marca los elementos que quieras y pulsa “Continuar”.",
            "Elige: reemplazar el menú actual o añadir los nuevos elementos al existente.",
          ],
        },
        {
          type: "note",
          text: "Los ejemplos de la plantilla inicial se eliminan al guardar el menú escaneado — es normal.",
        },
      ],
    },
    {
      id: "tables",
      title: "3. Mesas y códigos QR",
      blocks: [
        {
          type: "p",
          text: "Las mesas sirven para vincular pedidos y reservas a sitios concretos e imprimir códigos QR personales. Sección: Ajustes → Mesas.",
        },
        { type: "h3", text: "Crear mesas" },
        {
          type: "steps",
          items: [
            "Abre Ajustes → Mesas y pulsa “Añadir mesa”.",
            "Indica el número de mesa, las plazas y (opcional) un nombre — por ejemplo “Ventana”, “Barra”, “Terraza”.",
            "Añade una foto de la mesa — los clientes la ven y entienden exactamente dónde está su mesa.",
            "Asigna un color de mesa — con ese color la mesa se resalta en la cocina y en la sección “Pedidos”, para que el personal la encuentre rápido.",
            "Si quieres, añade una breve descripción.",
            "Guarda.",
          ],
        },
        {
          type: "note",
          text: "La foto de la mesa es para los clientes (referencia “dónde está mi mesa”). El color es para el personal (una marca visual rápida de la mesa en la cocina y en los pedidos).",
        },
        { type: "h3", text: "Código QR de la mesa" },
        {
          type: "p",
          text: "Cada mesa tiene su propio código QR. El cliente lo escanea con el móvil y entra directamente en el menú de esa mesa — el pedido se vincula automáticamente a la mesa correcta.",
        },
        {
          type: "steps",
          items: [
            "Pulsa “Mostrar código QR” en la mesa que necesites.",
            "Pulsa “Descargar QR” para guardar la imagen.",
            "Imprímelo y colócalo en la mesa (en un soporte, en el menú, en una pegatina).",
          ],
        },
        {
          type: "tip",
          text: "El “Enlace de la mesa” es el mismo enlace que el QR pero en texto. Puedes enviárselo al cliente por mensajería.",
        },
      ],
    },
    {
      id: "orders",
      title: "4. Pedidos",
      blocks: [
        { type: "h3", text: "Cómo pide el cliente" },
        {
          type: "p",
          text: "El cliente escanea el QR de la mesa → se abre el menú → elige platos, opciones y cantidad → realiza el pedido. El pedido aparece al instante en tu dashboard y en el terminal de cocina/camarero.",
        },
        {
          type: "note",
          text: "Para que los clientes puedan pedir, en Ajustes → Pedidos debe estar activado “Aceptar pedidos”. Si está desactivado, el cliente ve el menú pero no hay botón de pedido.",
        },
        { type: "h3", text: "Gestionar pedidos en el dashboard" },
        {
          type: "p",
          text: "La sección “Pedidos” muestra el plano de la sala. Las mesas ocupadas están resaltadas y muestran el número de pedidos activos. Toca una mesa para abrir sus pedidos.",
        },
        {
          type: "steps",
          items: [
            "Toca una mesa → “Iniciar pedido” (o abre uno existente).",
            "“Añadir elemento” → elige categoría → plato → opciones → si hace falta indica cantidad y notas (por ejemplo “sin cebolla”).",
            "Pulsa “Añadir” — el elemento entra en el pedido.",
          ],
        },
        { type: "h3", text: "Estados de los elementos" },
        {
          type: "p",
          text: "Cada elemento tiene un estado: Pendiente → Cocinando → Listo → Servido. Toca un elemento para cambiar su estado. Los estados se sincronizan con la cocina en tiempo real.",
        },
        { type: "h3", text: "Descuentos, división, cambio de mesa" },
        {
          type: "list",
          items: [
            "Descuento: “Añadir descuento” — porcentaje o importe fijo, sobre todo el pedido o sobre un elemento, con motivo.",
            "Dividir pedido: “Dividir pedido” — elige los elementos que irán a una cuenta nueva e independiente.",
            "Cambiar mesa: “Cambiar mesa” — mueve el pedido a otra mesa.",
            "Duplicar elemento: añade rápidamente otro igual.",
          ],
        },
        { type: "h3", text: "Cerrar un pedido" },
        {
          type: "steps",
          items: [
            "Cuando todos los elementos estén servidos, pulsa “Cerrar pedido”.",
            "Elige un método de pago (si hay métodos configurados).",
            "El pedido se cierra y sale de la lista de activos.",
          ],
        },
      ],
    },
    {
      id: "kitchen",
      title: "5. Cocina (KDS)",
      blocks: [
        {
          type: "p",
          text: "La pantalla de cocina (KDS) es una pantalla en tablet para los cocineros. Los nuevos pedidos llegan en tiempo real y el cocinero marca los platos como listos.",
        },
        { type: "h3", text: "Qué muestra la pantalla" },
        {
          type: "list",
          items: [
            "Tarjetas de pedido con elementos, opciones y el tiempo “en el pase”.",
            "Indicación por colores del estado: qué se está cocinando, qué está listo.",
            "Una señal sonora al llegar un nuevo pedido.",
          ],
        },
        { type: "h3", text: "Cómo se usa" },
        {
          type: "steps",
          items: [
            "Toca un elemento para pasarlo al siguiente estado (Cocinando → Listo).",
            "Activa el sonido con el botón “Activar sonido” — así los nuevos pedidos llegan con aviso sonoro.",
            "Con el zoom ajustas el tamaño de las tarjetas a la tablet.",
            "Con los filtros puedes mostrar solo las categorías que necesitas (por ejemplo solo la línea caliente).",
          ],
        },
        {
          type: "note",
          text: "Si la tablet pierde internet aparece el aviso “Sin conexión”. Conecta el Wi-Fi y los pedidos volverán a llegar.",
        },
      ],
    },
    {
      id: "reservations",
      title: "6. Reservas",
      blocks: [
        {
          type: "p",
          text: "Los clientes pueden reservar mesa desde tu menú, y tú gestionas las reservas en la sección “Reservas” (vista “Mes” / “Día”).",
        },
        { type: "h3", text: "Configurar las reservas" },
        { type: "p", text: "Primero activa y configura las reservas: Ajustes → Reservas." },
        {
          type: "steps",
          items: [
            "Activa “Activar reservas”.",
            "Elige el modo de confirmación: “Automático” (las reservas se confirman solas) o “Manual” (confirmas tú cada una).",
            "Define la “Duración de la reserva” — cuánto tiempo se mantiene la mesa para el cliente.",
            "Rellena el “Horario semanal”: para cada día — abierto/cerrado, horario y, si hace falta, la pausa de comida.",
          ],
        },
        {
          type: "note",
          text: "Para aceptar reservas hacen falta mesas. Si no hay, el sistema te pedirá añadirlas primero.",
        },
        { type: "h3", text: "Gestionar las reservas" },
        {
          type: "list",
          items: [
            "Las nuevas reservas a la espera de decisión están en el bloque “Pendientes de confirmación”.",
            "Botones “Confirmar” / “Rechazar” — para cada reserva.",
            "“Completar” — marca que el cliente ha llegado y la reserva está hecha.",
            "Cambia entre “Mes” y “Día”, navega el periodo con “Atrás” / “Adelante”.",
          ],
        },
      ],
    },
    {
      id: "devices",
      title: "7. Dispositivos (tablets)",
      blocks: [
        {
          type: "p",
          text: "Los terminales de cocina, camarero y reservas son tablets independientes que se conectan a tu cuenta con un código. Sección: Ajustes → Dispositivos.",
        },
        {
          type: "note",
          text: "Los dispositivos están disponibles con un plan de pago o durante una prueba activa.",
        },
        { type: "h3", text: "Conectar una tablet (emparejamiento)" },
        {
          type: "steps",
          items: [
            "En el dashboard: Ajustes → Dispositivos → “Añadir dispositivo”.",
            "Indica un nombre (por ejemplo “Cocina — línea caliente”) y un tipo: Cocina, Camarero o Reservas.",
            "Pulsa “Generar código” — aparece un código de 6 dígitos (válido 2 minutos).",
            "En la tablet abre la pantalla de conexión e introduce este código.",
            "La tablet se conecta y empieza a funcionar de inmediato en el rol elegido.",
          ],
        },
        { type: "tip", text: "Si el código ha caducado — pulsa “Nuevo código” e introduce el nuevo." },
        { type: "h3", text: "Gestionar dispositivos" },
        {
          type: "list",
          items: [
            "Estados: En línea / Sin conexión / Pendiente de conexión / Revocado.",
            "“Revocar” — desconecta la tablet (por ejemplo si se pierde). Para volver a entrar hace falta un código nuevo.",
            "“Eliminar” — quita el dispositivo de la lista de forma permanente.",
          ],
        },
      ],
    },
    {
      id: "analytics",
      title: "8. Analíticas",
      blocks: [
        {
          type: "p",
          text: "La sección “Analíticas” muestra las cifras clave del local: ingresos, número de pedidos y su desglose (por ejemplo por método de pago y por hora). Úsala para entender qué se vende mejor y cuándo.",
        },
      ],
    },
    {
      id: "settings",
      title: "9. Ajustes",
      blocks: [
        {
          type: "p",
          text: "La sección “Ajustes” se abre como un conjunto de tarjetas-sección. Arriba está el selector del restaurante activo (si tienes más de uno). Debajo — cada tarjeta en orden.",
        },
        { type: "h3", text: "Sitio" },
        {
          type: "list",
          items: [
            "URL del menú público — la dirección única de tu menú (puedes poner tu propio slug corto y copiar el enlace).",
            "El nombre (título) del local en el sitio público.",
            "Color de acento — el color principal de botones y resaltados del menú.",
            "Fondo — una imagen o vídeo en la portada; sube el tuyo o genera un fondo con IA a partir de una descripción.",
            "Diseño del menú — cómo se muestran los platos al cliente.",
          ],
        },
        { type: "h3", text: "Contactos y dirección" },
        {
          type: "p",
          text: "Teléfono, Instagram, WhatsApp y un marcador en el mapa — todo se muestra al cliente en la página de contacto de tu menú.",
        },
        { type: "h3", text: "Región" },
        { type: "p", text: "Moneda (usada para todos los precios) y zona horaria del local." },
        { type: "h3", text: "Mesas" },
        { type: "p", text: "Plano de la sala, plazas y códigos QR de las mesas — en detalle en la sección 3." },
        { type: "h3", text: "Dispositivos" },
        {
          type: "p",
          text: "Conexión de tablets para la pantalla de cocina y los terminales de camarero — en detalle en la sección 7.",
        },
        { type: "h3", text: "Pedidos" },
        {
          type: "list",
          items: [
            "“Aceptar pedidos” — el interruptor principal para recibir pedidos.",
            "“Modo de pedidos” — Interno y/o WhatsApp.",
            "“Campos obligatorios” — qué datos debe dar el cliente (Nombre, Teléfono, Dirección).",
            "“Métodos de pago” — para integrar la pasarela de pago del restaurante contacta con soporte.",
          ],
        },
        { type: "h3", text: "Reservas" },
        {
          type: "p",
          text: "Activación de reservas, confirmación automática o manual, duración y horario — en detalle en la sección 6.",
        },
        { type: "h3", text: "Idiomas" },
        {
          type: "steps",
          items: [
            "Abre Ajustes → Idiomas.",
            "Elige los idiomas a los que se traduce el menú público (toca para añadir/quitar).",
            "Define el idioma predeterminado.",
            "Los textos se traducen manualmente o con el botón “Traducir con IA” — el sistema traduce los nombres y descripciones de los platos a los idiomas elegidos.",
          ],
        },
        { type: "h3", text: "Pago" },
        { type: "p", text: "Plan de suscripción, estado de la prueba y gestión de pagos." },
        {
          type: "list",
          items: [
            "Facturación mensual o anual (la anual es más barata).",
            "“Suscribirse” / “Cambiar” — elige o cambia de plan.",
            "“Gestionar” — cambia el método de pago o cancela la suscripción.",
          ],
        },
        {
          type: "note",
          text: "El pago es en EUR. Para pagar en otra moneda, contacta con soporte.",
        },
        { type: "h3", text: "Soporte" },
        {
          type: "p",
          text: "Un chat integrado con nuestro equipo en tiempo real. Escribe un mensaje — respondemos aquí mismo.",
        },
        { type: "h3", text: "Cambiar y añadir restaurantes" },
        {
          type: "p",
          text: "Si tienes varios locales, el selector de restaurante está en la parte superior de la sección “Ajustes”.",
        },
        {
          type: "steps",
          items: [
            "Abre el selector de restaurantes en la parte superior de “Ajustes”.",
            "“Añadir restaurante” → introduce un nombre.",
            "Elige “Duplicar el menú y los ajustes actuales” (inicio rápido) o “Empezar desde cero” (un restaurante vacío).",
            "Créalo — y cambia entre restaurantes en cualquier momento aquí mismo.",
          ],
        },
      ],
    },
    {
      id: "public-menu",
      title: "10. El menú público para los clientes",
      blocks: [
        {
          type: "p",
          text: "El menú público es lo que ve el cliente tras escanear el QR. Se compone automáticamente a partir de tu menú, tu marca y tus contactos.",
        },
        {
          type: "list",
          items: [
            "La dirección del menú se define en Ajustes → Región (“Enlace del menú”).",
            "El código QR general y el enlace al menú se obtienen con el botón “Compartir” en la página “Menú”.",
            "Cada mesa tiene su propio QR independiente (Ajustes → Mesas) que lleva al menú de esa mesa concreta.",
            "El aspecto (fondo, color de acento, diseño) se configura en la sección “Sitio”.",
            "El botón “Vista previa” abre el menú tal como lo ve el cliente.",
          ],
        },
        {
          type: "tip",
          text: "Tras cualquier cambio en el menú/ajustes pulsa “Vista previa” para comprobar cómo le aparece al cliente.",
        },
      ],
    },
    {
      id: "faq",
      title: "11. Preguntas frecuentes y detalles",
      blocks: [
        { type: "h3", text: "El cliente no puede hacer un pedido" },
        {
          type: "p",
          text: "Comprueba Ajustes → Pedidos → “Aceptar pedidos” (debe estar activo) y que esté seleccionado al menos un modo de pedido.",
        },
        { type: "h3", text: "No llegan reservas" },
        {
          type: "p",
          text: "Asegúrate de que las reservas están activadas en Ajustes → Reservas, que hay mesas añadidas y que el día no está marcado como “Cerrado” en el horario.",
        },
        { type: "h3", text: "La tablet no se conecta" },
        {
          type: "p",
          text: "El código es válido 2 minutos. Si ha caducado — genera uno nuevo en Ajustes → Dispositivos. Si el dispositivo fue revocado — crea un código nuevo.",
        },
        { type: "h3", text: "Un plato se ha agotado" },
        {
          type: "p",
          text: "No lo elimines — pulsa “Ocultar plato”. Desaparece del menú público y lo recuperas con “Mostrar plato”.",
        },
        { type: "h3", text: "Necesitas dispositivos/terminales pero no los tienes" },
        {
          type: "p",
          text: "La sección “Dispositivos” está disponible con un plan de pago o durante una prueba activa. Comprueba Ajustes → Pago.",
        },
        { type: "h3", text: "Aún tienes dudas" },
        {
          type: "p",
          text: "Escríbenos en Ajustes → Soporte — es un chat integrado con nuestro equipo.",
        },
      ],
    },
  ],
};
