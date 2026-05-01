// Hand-translated. Source-of-truth: app/en/changelog/texts.ts.
import type { ChangelogTexts } from "@/app/_landing/changelog/types";

export const CHANGELOG_TEXTS: ChangelogTexts = {
  meta: {
    title: "Novedades — Actualizaciones y nuevas funciones de IQ Rest",
    description:
      "Cada lanzamiento de IQ Rest en un solo lugar. Nuevas funciones, mejoras de IA y novedades del producto para cartas QR, pedidos online y reservas.",
  },
  pageTitle: "Novedades",
  pageSubtitle:
    "Cada actualización que lanzamos para mejorar tu carta QR, los pedidos online y las reservas. Las más recientes primero.",
  readMore: "Leer más",
  backToList: "Volver a novedades",
  publishedOn: "Publicado el",

  entries: {
    "ai-dish-photos-restaurant-menu": {
      meta: {
        title: "Fotos de platos con IA para tu carta QR | IQ Rest",
        description:
          "Genera fotos de platos con un estilo coherente para toda tu carta QR en un clic. Sin bancos de imágenes, sin fotógrafo, sin retoque.",
      },
      title: "Fotos de platos generadas con IA para toda tu carta QR",
      subtitle:
        "Olvídate de buscar en galerías de stock y de organizar sesiones de fotos. IQ Rest genera ahora un set completo de fotos de platos apetecibles, con un estilo único y coherente, directamente desde los nombres de tu carta.",
      intro:
        "Fotografiar cada plato de tu carta es caro, lento y rara vez consistente. Las galerías de stock dejan huecos y el estilo nunca encaja del todo con tu marca. IQ Rest cierra ese hueco con fotografía de platos por IA integrada: escribes el nombre del plato y obtienes una foto de alta calidad que combina con el resto de la carta. Cada imagen se genera específicamente para ti, optimizada tanto para la carta QR como para imprimir.",
      sections: [
        {
          title: "Un mismo estilo de fotografía en toda la carta",
          body: "Cuando un cliente recorre la carta, los estilos dispares rompen la experiencia: una foto luminosa, otra oscura, una desde arriba, otra de lado. IQ Rest genera todas las fotos en un único estilo coherente con tu marca: misma dirección de luz, mismo lenguaje de plato, mismo ambiente de fondo. Parece una sesión profesional, salvo que cada plato se generó en el momento de añadirlo a la carta. A medida que añades platos nuevos, el estilo se mantiene automáticamente.",
        },
        {
          title: "Del nombre del plato al plato emplatado en segundos",
          body: "No hay que dar instrucciones. Añades un plato — por ejemplo, «Tagliatelle de trufa con setas silvestres» — y IQ Rest crea la foto en segundo plano. La imagen se sube a tu carta, se optimiza en WebP y queda lista antes de que termines de añadir el siguiente plato. Si una foto no es lo que tenías en mente, la regeneras con un toque. Cada restaurante recibe generaciones de IA gratuitas para empezar, con recargas asequibles si quieres fotos para una carta entera de 80 platos.",
        },
        {
          title: "Optimizadas para móvil y SEO",
          body: "Cada imagen se codifica como WebP comprimido al 80% de calidad y se sirve desde una CDN en Núremberg con submuestreo inteligente. Las páginas son rápidas en 4G, sin esqueletos ni saltos de diseño. Las fotos también son indexables por Google Images, así que los clientes que buscan tus platos por imagen pueden encontrar tu carta directamente.",
        },
      ],
      benefitsTitle: "Por qué importan las fotos de platos con IA",
      benefits: [
        "Sin suscripciones a bancos de imágenes ni honorarios de fotógrafo",
        "Estilo coherente con tu marca en todos los platos",
        "Los platos nuevos reciben automáticamente una foto del mismo estilo",
        "WebP comprimido — rápido en móvil, sin saltos de diseño",
        "Generaciones gratuitas incluidas en todos los planes",
        "Regenera cualquier foto con un toque hasta que sea perfecta",
      ],
      conclusionTitle: "Una foto para cada plato, sin la producción",
      conclusionBody:
        "Los restaurantes que incluyen fotos venden más platos de margen alto — no es una suposición, es una mecánica de ingresos conocida. La razón por la que la mayoría de cartas no tienen fotos es el coste de producción. IQ Rest elimina ese coste por completo. Cada plato que añades obtiene una foto bonita y alineada con tu marca antes de terminar la configuración. Combínalo con pedidos por QR y verás cómo suben las ventas adicionales sin tocar una cámara.",
      ctaText: "Genera fotos con IA para todos los platos de tu carta — gratis durante tu prueba.",
      ctaButton: "Pruébalo gratis",
    },

    "ai-restaurant-cover-background": {
      meta: {
        title: "Fondo de portada de restaurante generado por IA | IQ Rest",
        description:
          "Genera automáticamente una imagen de portada bonita para tu carta QR en segundos. Acorde a tu cocina, ambiente y marca — sin bancos de imágenes.",
      },
      title: "Fondo de portada del restaurante generado por IA",
      subtitle:
        "Tu carta QR transmite el ambiente adecuado antes incluso de que el cliente baje. IQ Rest genera ahora una imagen de portada personalizada que encaja con tu cocina y atmósfera — automáticamente.",
      intro:
        "La primera impresión cuenta, especialmente cuando el cliente escanea un QR en la mesa. Una imagen de portada genérica desmonta todo lo que invertiste en interiorismo. IQ Rest genera ahora una imagen de portada única y atmosférica para cada restaurante, basada en la cocina que eliges al registrarte. Trattoria italiana, izakaya japonés, bar de tapas español — cada uno recibe una portada que encaja.",
      sections: [
        {
          title: "Adaptada a tu cocina y ambiente",
          body: "Cuando completas el asistente de registro, IQ Rest toma la cocina que has seleccionado y genera una portada acorde. La italiana recibe luz cálida de trattoria con pasta enfocada con suavidad. La japonesa recibe líneas limpias y composición equilibrada. La mexicana recibe colores vibrantes y energía de comida callejera. La coincidencia es automática, pero puedes regenerar la portada en cualquier momento, con tus propias indicaciones creativas si quieres algo concreto.",
        },
        {
          title: "Optimizada para la cabecera de la carta QR",
          body: "Las imágenes de portada se generan en la proporción exacta que usa la cabecera de la carta QR — nítidas en cualquier móvil, sin recortes incómodos. Se codifican como WebP, se sirven rápido y con carga diferida para que el resto de la carta se pinte primero. La portada marca el tono y luego desaparece a medida que el cliente empieza a explorar los platos.",
        },
        {
          title: "Coherencia de marca de serie",
          body: "El estilo de la imagen de portada se empareja automáticamente con las fotos de platos generadas por IA para tu carta — mismo lenguaje de luz, misma paleta de color, mismo ambiente. Los clientes perciben tu restaurante como cohesionado y diseñado profesionalmente, aunque hayas montado todo en cinco minutos desde el móvil.",
        },
      ],
      benefitsTitle: "Por qué una portada con IA gana al stock",
      benefits: [
        "Única para tu restaurante — no es una foto de stock que usan todos",
        "Adaptada a la cocina que elegiste al registrarte",
        "Mismo lenguaje visual que las fotos de platos generadas por IA",
        "Tamaño correcto para la cabecera de la carta QR — sin recortes manuales",
        "WebP comprimido para carga rápida en móvil",
        "Regenera cuando quieras con un toque",
      ],
      conclusionTitle: "Una portada que dice «sabemos lo que hacemos»",
      conclusionBody:
        "Cuando un cliente escanea tu QR, lo primero que ve es tu portada. Una imagen pulida y atmosférica transmite calidad antes de leer el primer plato. Con IQ Rest, esa pulcritud es automática — generada gratis al registrarte y regenerable cuando cambies de idea. Sin galerías de stock, sin trabajo de diseño, solo una portada que encaja.",
      ctaText: "Consigue una portada personalizada con IA para tu carta QR en menos de un minuto.",
      ctaButton: "Empezar prueba gratis",
    },

    "three-step-signup-wizard-restaurant-menu": {
      meta: {
        title: "Asistente de registro en 3 pasos para carta QR | IQ Rest",
        description:
          "Elige cocina, nombre del restaurante, email — e IQ Rest construye tu carta QR. El registro más rápido del sector.",
      },
      title: "Asistente de registro en 3 pasos: del email a una carta QR funcional en menos de un minuto",
      subtitle:
        "Elige tu cocina. Escribe el nombre del restaurante. Confirma tu email. Listo — tu carta QR está preparada, con platos de muestra y fotos generadas por IA.",
      intro:
        "Los dueños de restaurantes no tienen tiempo para un formulario de registro de 10 pantallas. Así que lo redujimos a tres. Elige la cocina que encaja con tu sitio. Escribe el nombre del restaurante. Confirma tu email. Cuando inicies sesión por primera vez, tu carta QR ya estará llena de platos de muestra propios de la cocina y con fotografía con IA acorde. Puedes atender a un cliente en menos de 60 segundos desde que empezaste el registro.",
      sections: [
        {
          title: "Paso 1 — Selección de cocina",
          body: "Elige entre una amplia lista de cocinas: italiana, española, japonesa, mexicana, francesa, mediterránea, india, americana, cafetería, bar, pizzería y más. Esa elección impulsa todos los valores por defecto del asistente: platos de muestra, estilo de portada con IA, divisa por defecto y estructura inicial de categorías. No estás configurando nada — eliges un punto de partida.",
        },
        {
          title: "Paso 2 — Nombre del restaurante",
          body: "Escribe el nombre tal como lo verán los clientes. Lo usamos en todas partes: la cabecera de la carta QR, el título de la página, el slug de SEO, la previsualización para redes. No hay que decidir entre nombre de marca y nombre visible — un único campo, una única fuente de verdad. Se puede saltar si quieres aplazar la decisión; rellenamos un marcador de posición que puedes renombrar luego.",
        },
        {
          title: "Paso 3 — Email o iniciar sesión con Google",
          body: "Confirma con email + código de un solo uso, o pulsa «Iniciar sesión con Google» para crear la cuenta al instante. Sin contraseña que recordar. En cuanto confirmas, el asistente lanza el sembrador de carta en segundo plano — categorías creadas, platos de muestra insertados, fotos con IA generadas, portada de restaurante lista. Aterrizas directamente en el panel con una carta funcional.",
        },
      ],
      benefitsTitle: "Por qué un registro de 3 pasos gana a un formulario",
      benefits: [
        "Menos de 60 segundos desde la landing hasta una carta QR funcional",
        "Cero decisiones que no puedas cambiar luego — solo valores por defecto desde donde partir",
        "Platos de muestra precargados por cocina — contenido al instante para editar",
        "Fotos con IA y portada listas cuando inicies sesión",
        "Opción de Google sign-in — sin contraseña que gestionar",
        "Progreso anónimo guardado si abandonas a mitad del asistente",
      ],
      conclusionTitle: "El registro de carta QR más rápido, sin discusión",
      conclusionBody:
        "La mayoría de servicios de carta QR te hacen rellenar decenas de campos antes de ver algo útil. IQ Rest le da la vuelta — primero te damos una carta funcional, luego personalizas. El asistente elimina cualquier barrera entre la curiosidad y un producto utilizable. Los restaurantes que terminan el registro en menos de 60 segundos tienen muchas más probabilidades de publicar realmente su carta, recibir su primer pedido y mantener la suscripción.",
      ctaText: "Empieza el asistente de 3 pasos ahora — tu carta estará en línea en 60 segundos.",
      ctaButton: "Empezar prueba gratis",
    },

    "ai-built-sample-menu-on-signup": {
      meta: {
        title: "Carta de muestra generada por IA al registrarte | IQ Rest",
        description:
          "Olvida la pantalla en blanco. IQ Rest genera automáticamente una carta QR de inicio según tu cocina — categorías, platos, precios y fotos.",
      },
      title: "Carta de muestra creada por IA justo después del registro",
      subtitle:
        "Se acabó mirar un panel vacío. IQ Rest siembra tu cuenta con categorías, platos y fotos con IA acordes a tu cocina, para que edites en lugar de empezar de cero.",
      intro:
        "Lo más difícil de cualquier herramienta nueva es la pantalla en blanco. Los nuevos dueños se sientan, ven una carta vacía y cierran la pestaña. IQ Rest lo soluciona poblando tu carta en el momento del registro. Eliges italiana — recibes antipasti, pasta, pizza, postre. Eliges japonesa — recibes sushi, ramen, donburi, sake. Cada categoría trae entre 6 y 10 platos iniciales con fotos generadas por IA en un estilo coherente. Tu trabajo pasa a ser editar precios y matizar nombres, no construir desde cero.",
      sections: [
        {
          title: "Categorías y platos según la cocina",
          body: "El sembrador no vuelca platos al azar. Usa la cocina que elegiste en el asistente para traer un set curado de categorías que tienen sentido para tu tipo de restaurante. Una pizzería recibe «Pizza Classica», «Pizza Speciale», «Antipasti», «Bevande». Un bistró francés recibe «Entrées», «Plats principaux», «Fromages», «Desserts». El contenido inicial coincide con la convención que los comensales esperan para esa cocina.",
        },
        {
          title: "Fotos y precios de serie",
          body: "Cada plato inicial trae una foto generada por IA en estilo coherente y un precio razonable por defecto en tu divisa local (autodetectada por geolocalización). Los precios son marcadores — los cambiarás — pero hacen que la carta se vea real al instante, para que puedas previsualizar la carta QR y sentir cómo quedará. Es clave para enseñársela a socios, recibir feedback o decidir «sí, esta es la herramienta».",
        },
        {
          title: "Edita, no empieces de cero",
          body: "Una vez sembrados, todos los platos llevan una marca isExample. En cuanto editas un plato — cambias nombre, precio o descripción — la marca desaparece. Los platos de ejemplo que quedan se distinguen visualmente para que sepas qué contenido sigue siendo de muestra. Esa separación deja claro qué está hecho y qué falta, convirtiendo el problema de la pantalla en blanco en un flujo de edición productivo.",
        },
      ],
      benefitsTitle: "Por qué gana una carta precargada",
      benefits: [
        "Cero pantalla vacía — abres el panel y ves una carta funcional",
        "Categorías y platos que encajan con la cocina que elegiste",
        "Fotos con IA para cada plato inicial en estilo unificado",
        "Divisa local autodetectada, precios por defecto en su sitio",
        "La marca de ejemplo desaparece a medida que editas — señal clara de progreso",
        "Enseña una carta de aspecto real a interesados en minutos",
      ],
      conclusionTitle: "Salta la página en blanco",
      conclusionBody:
        "Construir una carta desde cero intimida. Editar una es fácil. IQ Rest te entrega una carta de inicio completa al registrarte y te deja ajustarla a tu oferta real. ¿Resultado? Más restaurantes terminan la configuración, más cartas llegan a publicarse y más clientes escanean QR que llevan a cartas reales, editadas y de producción.",
      ctaText: "Regístrate y obtén una carta de inicio completa en tu cocina.",
      ctaButton: "Crear mi carta",
    },

    "interactive-menu-tour-first-visit": {
      meta: {
        title: "Tour interactivo de la carta para nuevos usuarios | IQ Rest",
        description:
          "Una guía interactiva de 7 pasos acompaña a los nuevos dueños por el panel de la carta QR — sin documentación, sin vídeos, todo práctico.",
      },
      title: "Tour interactivo de 7 pasos en tu primera visita",
      subtitle:
        "No te hacemos leer documentación. La primera vez que abres la carta, IQ Rest te guía paso a paso — añadir categoría, añadir plato, editar, ordenar, previsualizar, compartir, en siete toques.",
      intro:
        "La mayoría de productos SaaS esconden el onboarding en un centro de ayuda que nadie lee. IQ Rest hace lo contrario: la primera vez que un usuario nuevo aterriza en la carta, un tour interactivo destaca cada acción clave en orden. Añade una categoría. Añade tu primer plato. Edítalo. Cambia su visibilidad. Reordena. Previsualiza la carta en vivo. Compártela con un cliente. Al llegar al paso siete, ya has usado todas las funciones que necesitarás el 95% del tiempo.",
      sections: [
        {
          title: "Dentro del producto, no en una base de conocimiento",
          body: "Cada paso del tour resalta el elemento real de la interfaz en tu pantalla. Una burbuja explica qué hace y por qué importa. No hay capturas — la captura ES tu panel. A medida que avanzas, aprendes haciendo, no leyendo. Saltar en cualquier momento; el tour persiste entre sesiones hasta que lo terminas o lo descartas para siempre.",
        },
        {
          title: "Diseñado en torno al flujo real",
          body: "Los siete pasos no son un volcado de funciones — siguen el flujo que un restaurante nuevo realmente realiza. Primero categorías (bebidas, principales, postres), luego platos, luego pulir cada plato, luego ordenar cómo aparecen, luego previsualizar para asegurar que se ve bien, luego compartir por QR. Al final has cerrado el ciclo desde la carta vacía hasta el código QR impreso en una tarjeta de mesa.",
        },
        {
          title: "Localizado en 35 idiomas",
          body: "El texto del tour está traducido a todos los idiomas que IQ Rest soporta — igual que el resto del panel. Los dueños hispanohablantes reciben burbujas en español, los alemanes en alemán, los catalanes en catalán. Nada en el tour asume conocimiento de inglés.",
        },
      ],
      benefitsTitle: "Por qué un tour dentro del producto gana a un centro de ayuda",
      benefits: [
        "Aprende haciendo, no leyendo documentación",
        "7 pasos cubren ~95% del flujo",
        "Descártalo cuando quieras — nunca bloquea el panel",
        "Persiste entre sesiones hasta que lo completas o saltas",
        "Localizado en 35 idiomas — sin necesidad de inglés",
        "Sin vídeos que cargar — superposición instantánea sobre la UI nativa",
      ],
      conclusionTitle: "De confundido a confiado en siete pasos",
      conclusionBody:
        "El momento más duro en cualquier producto son los primeros 30 segundos. El usuario abre el panel, mira alrededor y o lo entiende o se va. El tour interactivo de IQ Rest elimina ese riesgo — en menos de un minuto, todo nuevo usuario sabe dónde añadir un plato, cómo previsualizar, cómo compartir. Completar el tour correlaciona fuertemente con publicar la carta. No solo enseñamos el producto — ponemos la carta en línea.",
      ctaText: "Regístrate y deja que te guíen por tu primera carta QR en siete toques.",
      ctaButton: "Empezar prueba gratis",
    },

    "custom-landing-page-per-country": {
      meta: {
        title: "Páginas de aterrizaje específicas por país para carta QR | IQ Rest",
        description:
          "Los visitantes desde España ven una landing pensada para restaurantes españoles. Francia ve la suya. 35 países, 35 páginas optimizadas.",
      },
      title: "Página de aterrizaje a medida en cada idioma",
      subtitle:
        "Los visitantes ya no reciben una página traducida automáticamente. Cada uno de los 35 idiomas soportados tiene su propia landing, escrita para ese mercado.",
      intro:
        "Las landings traducidas a máquina convierten mal. La gramática chirría, las referencias culturales fallan y las condiciones de pago locales se notan importadas. IQ Rest envía ahora una landing única para cada uno de los 35 idiomas — escrita para el mercado, no solo traducida. Los visitantes españoles reciben una página sobre restaurantes y cafeterías. Los franceses, sobre cafés y bistrós. Los alemanes, sobre Restaurants und Imbisse. Cada página lidera con la propuesta de valor que más importa a esa audiencia.",
      sections: [
        {
          title: "Una página por idioma, no traducción automática",
          body: "Cada landing vive en /<locale> como ruta independiente de Next.js. Los textos están en objetos TypeScript — versionados, comprobados de tipos, desplegables por separado. Podemos hacer A/B test de una variante de hero en español sin tocar la alemana. Podemos localizar una llamada a precio para Real brasileño sin afectar a mercados en euros. ¿Resultado? Iteración más rápida en las landings que realmente convierten.",
        },
        {
          title: "Geolocalización auto-encamina a los visitantes",
          body: "La primera vez que un visitante llega a iq-rest.com, nuestro módulo geo de nginx lee su código de país y redirige a la /<locale> correcta. Las IPs españolas aterrizan en /es. Las alemanas en /de. Brasil en /pt. Incluso encaminamos las zonas catalanohablantes de España a /ca en vez de /es. Los visitantes nunca ven un modal de «elige idioma» — ven el suyo por defecto.",
        },
        {
          title: "hreflang y canónicas en toda la marca",
          body: "Las 35 landings se referencian entre sí mediante etiquetas hreflang para que Google indexe la correcta para cada consulta. Las URLs canónicas apuntan a la URL por idioma, no a una raíz genérica. La configuración sigue al pie de la letra las directrices de SEO internacional de Google, así que cada landing compite en su idioma sin canibalizar a las otras.",
        },
      ],
      benefitsTitle: "Por qué las landings por país convierten mejor",
      benefits: [
        "Frases nativas en cada mercado — no traducciones automáticas",
        "El geo-routing sirve la página correcta automáticamente",
        "hreflang y canónicas siguen las directrices de Google",
        "Los visitantes catalanes en Cataluña ven catalán, no castellano",
        "Divisa, precios y CTAs localizados por mercado",
        "A/B testing independiente por idioma sin contaminación cruzada",
      ],
      conclusionTitle: "35 idiomas, 35 puertas de entrada",
      conclusionBody:
        "Si un dueño de restaurante español aterriza en una página medio traducida al inglés con precios en estilo americano, se va. Si aterriza en una página que le habla en español, con precios en euros y referencias españolas, convierte. IQ Rest hace ahora lo segundo en todos los mercados — 35 landings, 35 puertas de entrada optimizadas, todas con geo-routing automático.",
      ctaText: "Prueba IQ Rest en tu idioma — landing a medida para tu mercado.",
      ctaButton: "Abrir mi idioma",
    },

    "sign-in-with-google-restaurant-dashboard": {
      meta: {
        title: "Iniciar sesión con Google en el panel de carta QR | IQ Rest",
        description:
          "Salta contraseñas y códigos por email. Pulsa «Iniciar sesión con Google» y entra al panel de tu carta QR en un segundo.",
      },
      title: "Iniciar sesión con Google — acceso de un toque a tu carta QR",
      subtitle:
        "Salta los emails con OTP y las contraseñas olvidadas. Pulsa «Continuar con Google» y estás dentro del panel en menos de un segundo.",
      intro:
        "La autenticación con email + código de un solo uso es segura pero lenta. Escribes el email, esperas el código, abres tu bandeja, copias el código, pegas, envías. Es un flujo de 30 segundos en el mejor caso. IQ Rest ofrece ahora «Iniciar sesión con Google» como alternativa: pulsas un botón, eliges tu cuenta de Google y estás dentro. Sin contraseña que olvidar, sin viaje a la bandeja, sin fricción.",
      sections: [
        {
          title: "OAuth de Google nativo, no un bucle de redirecciones",
          body: "Usamos el SDK oficial de Identity Services de Google con la UI One Tap en navegadores compatibles. El flujo ocurre en un popup nativo, no en una redirección al dominio de Google y vuelta. Todo dura aproximadamente un segundo tras el primer toque. Verificamos el ID token de Google en el servidor contra las claves públicas de Google, así que el flujo es criptográficamente seguro de extremo a extremo.",
        },
        {
          title: "Misma cuenta, cualquiera de los dos métodos",
          body: "Si te registraste con email-OTP y luego eliges Google, vinculamos las cuentas por email. Puedes alternar entre métodos en cada inicio de sesión. No hay una «cuenta de Google aparte» que gestionar y no pierdes tu carta por iniciar sesión de otra forma. También reenviamos el idioma del panel durante el inicio con Google para que los emails a tu cuenta lleguen en el idioma correcto desde el día uno.",
        },
        {
          title: "Mobile-first — funciona en iOS Safari y Android Chrome",
          body: "El SDK oficial de Google ha sido históricamente frágil en móvil. Lo solucionamos superponiendo un botón real de Google sobre nuestra UI en lugar de disparar clics programáticos (que iOS Safari ahora bloquea). Resultado: el botón funciona en cualquier navegador móvil moderno, sin instalación, sin app store.",
        },
      ],
      benefitsTitle: "Por qué Google sign-in gana al OTP por email",
      benefits: [
        "Un toque para iniciar sesión — sin viaje al email",
        "Sin contraseña que recordar o restablecer",
        "Misma cuenta uses email o Google",
        "Verificado criptográficamente en el servidor con el ID token de Google",
        "Funciona de forma fiable en iOS Safari y Android Chrome",
        "Idioma reenviado para que los emails sigan en tu lengua",
      ],
      conclusionTitle: "La forma más rápida de volver a tu panel",
      conclusionBody:
        "Los dueños de restaurantes consultan sus cartas decenas de veces a la semana — entre servicios, después de imprimir, al ajustar precios. Cada segundo ahorrado en el inicio de sesión se acumula. Google sign-in convierte un flujo de 30 segundos con OTP en un toque de un segundo. El email-OTP sigue disponible para quien lo prefiera, pero la mayoría elegirá Google después de probarlo una vez.",
      ctaText: "Salta la contraseña — inicia sesión con Google en un toque.",
      ctaButton: "Abrir panel",
    },

    "multilingual-email-notifications-35-languages": {
      meta: {
        title: "Notificaciones por email multilingües en 35 idiomas | IQ Rest",
        description:
          "Recordatorios de prueba, respuestas de soporte, emails de suscripción — cada notificación de IQ Rest llega en el idioma de tu panel.",
      },
      title: "Notificaciones por email multilingües en los 35 idiomas",
      subtitle:
        "Cada email que IQ Rest envía — respuestas de soporte, recordatorios de prueba, recibos de suscripción — llega en el idioma que has fijado en tu panel. Incluye disposiciones de derecha a izquierda.",
      intro:
        "Un email en el idioma equivocado es fricción en el mejor caso, eliminación en el peor. IQ Rest envía ahora cada email transaccional en el idioma fijado en tu panel, en los 35 idiomas soportados. Bienvenidas, recordatorios de fin de prueba, confirmaciones de suscripción, respuestas de soporte — todos llegan en tu idioma, con gramática correcta y frases culturalmente apropiadas. Los idiomas de derecha a izquierda como árabe y persa reciben disposiciones espejadas correctamente.",
      sections: [
        {
          title: "preferredLocale viaja con tu cuenta",
          body: "Cada usuario tiene un campo preferredLocale fijado la primera vez que inicia sesión. Tanto si te registraste por email-OTP, Google o el asistente, tu idioma queda capturado y persistido. Cada tarea de backend que emite un email — webhooks de Stripe, notificaciones de respuesta de soporte, tareas cron — toma el preferredLocale del usuario y lo usa para elegir la plantilla correcta. Cambia idioma en el panel y el siguiente email reflejará el cambio.",
        },
        {
          title: "Plantillas RTL para árabe y persa",
          body: "Las disposiciones de derecha a izquierda no son solo traducción — toda la jerarquía visual se invierte. Enviamos plantillas RTL dedicadas para árabe y persa: la navegación fluye de derecha a izquierda, números en arábigo-índico cuando procede, logo de marca colocado correctamente. ¿Resultado? Un email que se siente nativo para lectores RTL, no una plantilla LTR traducida con la alineación rota.",
        },
        {
          title: "Traducidas por expertos del sector hostelero",
          body: "Los servicios genéricos de traducción producen traducciones literales pero envaradas. Tradujimos cada plantilla con terminología de cocina y hostelería que suena natural a operadores de restaurantes en cada mercado. «Trial» se convierte en «período de prueba» en español (no en «juicio»). «Reservation» se convierte en «Reservierung» en alemán. El nivel de detalle suma — los restaurantes notan cuando una herramienta habla bien su idioma.",
        },
      ],
      benefitsTitle: "Por qué importan los emails multilingües",
      benefits: [
        "Todos los emails transaccionales en el idioma de tu panel",
        "preferredLocale persiste entre inicios de sesión",
        "Disposiciones RTL para árabe y persa",
        "Terminología hostelera apropiada por idioma",
        "Cambiar idioma actualiza los emails futuros al instante",
        "35 idiomas incluyendo catalán, esloveno, estonio, letón",
      ],
      conclusionTitle: "Emails que hablan tu idioma",
      conclusionBody:
        "La comunicación que llega en el idioma equivocado es comunicación que no funciona. IQ Rest envía cada email en el idioma que realmente usas, con la disposición y terminología que encajan. Suena pequeño hasta que eres un dueño español recibiendo una alerta de fin de prueba solo en inglés y se te pasa. Ya no.",
      ctaText: "Regístrate y recibe tu panel y cada email en tu idioma.",
      ctaButton: "Empezar prueba gratis",
    },

    "ios-native-feel-mobile-restaurant-management": {
      meta: {
        title: "Panel de restaurante móvil con sensación nativa de iOS | IQ Rest",
        description:
          "Navegación inferior, gestión de safe-area, formularios sin zoom — el panel móvil de IQ Rest se siente como una app nativa en iPhone.",
      },
      title: "Sensación nativa de iOS en tu móvil",
      subtitle:
        "Navegación inferior por pestañas, soporte completo de safe-area, campos de formulario sin zoom y transiciones de página instantáneas. Gestionar tu carta QR desde el móvil se siente ahora como usar una app nativa de iOS.",
      intro:
        "La mayoría de paneles SaaS para restaurantes son adaptaciones a posteriori del escritorio en móvil. IQ Rest hace lo opuesto — diseñado para dueños que gestionan su carta desde el móvil entre servicios. El panel móvil usa ahora navegación inferior por pestañas, respeta los insets de safe-area del iPhone, evita el zoom de inputs de iOS y usa transiciones SPA casi instantáneas. Se ve y se siente como una app nativa, salvo que no hay app que instalar.",
      sections: [
        {
          title: "Pestañas inferiores, no hamburguesa",
          body: "Los menús hamburguesa en móvil son lentos — toca para abrir, toca el ítem, espera la página. Reemplazamos la barra lateral de escritorio por una barra de pestañas inferior en móviles: Carta, Pedidos, Reservas, Ajustes. Un toque accesible al pulgar, navegación instantánea. La pestaña activa usa el color de acento de tu marca, así que la ubicación actual siempre es obvia.",
        },
        {
          title: "Insets de safe-area e indicador de inicio",
          body: "Los iPhones modernos tienen un indicador de inicio abajo y una muesca arriba. Las web apps que ignoran esto acaban con la UI superpuesta al indicador o tapada por la muesca. Usamos env(safe-area-inset-*) en todas partes — la barra inferior queda por encima del indicador, el padding del contenido tiene en cuenta la dynamic island. ¿Resultado? Se siente diseñado para el dispositivo, no adaptado de un navegador de escritorio.",
        },
        {
          title: "Inputs sin zoom y envío instantáneo de formularios",
          body: "iOS Safari hace zoom en formularios con tamaño de fuente inferior a 16px. Subimos cada input a 16px y configuramos el viewport con maximum-scale=1, así que los toques no disparan el zoom-y-salto que rompe cualquier otro panel web. Los envíos de formulario son acciones de servidor con UI optimista — el cambio aparece al instante, la red confirma en segundo plano.",
        },
      ],
      benefitsTitle: "Por qué la sensación nativa importa en móvil",
      benefits: [
        "Pestañas inferiores — acceso de un toque a cada sección",
        "Consciente de safe-area — sin solapes con el indicador o la muesca",
        "Inputs de 16px — sin zoom-y-salto en iOS al tocar formularios",
        "Pestaña activa con el color de acento de tu marca",
        "Transiciones SPA — sin recargas completas entre secciones",
        "Sin app que instalar — funciona en Safari y Chrome",
      ],
      conclusionTitle: "Un panel web que se siente como una app",
      conclusionBody:
        "La línea entre web y nativo es sobre todo cuestión de atención al detalle. El panel móvil de IQ Rest pone esa atención — pestañas inferiores, safe-area, sin zoom, transiciones instantáneas — y el resultado se confunde con algo construido en Swift. Salvo que también funciona en Android y no hay nada que instalar o actualizar a través de una app store.",
      ctaText: "Abre IQ Rest en tu móvil y siente la diferencia.",
      ctaButton: "Probar gratis 14 días",
    },

    "gdpr-cookie-consent-banner-restaurant-website": {
      meta: {
        title: "Banner de consentimiento de cookies RGPD para web de restaurante | IQ Rest",
        description:
          "Banner de consentimiento legal, alineado con la AEPD, sin scripts de terceros. La analítica sin cookies se dispara incluso antes del consentimiento.",
      },
      title: "Banner de consentimiento de cookies conforme al RGPD",
      subtitle:
        "Banner construido a medida sin CMP de terceros, sin etiqueta de Cookiebot u OneTrust. Alineado con la AEPD y la directiva ePrivacy, con analítica sin cookies que se dispara antes del consentimiento.",
      intro:
        "Toda web comercial en la UE necesita un banner de cookies. La mayoría usa CMPs de terceros que arrastran scripts pesados y ralentizan la página. IQ Rest construyó el suyo, ligero, alineado con la AEPD, como parte del bundle de la página — sin DNS extras, sin tracking de terceros. Los visitantes ven una opción clara Aceptar / Rechazar, con ambos botones con el mismo estilo (el patrón oscuro de esconder «rechazar» es ilegal en muchos países de la UE — no lo hacemos).",
      sections: [
        {
          title: "Alineado con la AEPD y ePrivacy",
          body: "La AEPD y la directiva ePrivacy en general exigen botones Aceptar y Rechazar con la misma prominencia. Muchos CMPs ofrecen por defecto un patrón oscuro «aceptar grande, rechazar pequeño». Nos negamos — ambos botones tienen el mismo tamaño, el mismo estilo, solo distinto color. A los visitantes que rechazan los seguimos solo mediante contadores agregados sin cookies; nunca almacenamos un identificador en su dispositivo, así que no queda ninguna cookie propia tras un rechazo.",
        },
        {
          title: "Sin scripts de terceros",
          body: "La mayoría de banners de consentimiento cargan Cookiebot, OneTrust o similares desde un CDN. Eso añade 50-100 KB de JavaScript, una resolución DNS extra y una relación de compartición de datos con un tercero que declarar en tu política de privacidad. El banner de IQ Rest es parte del bundle de la landing — sin peticiones externas, sin compartición de datos con terceros, carga más rápida.",
        },
        {
          title: "Privacidad, cookies y términos en modales",
          body: "Pulsar «Política de privacidad», «Política de cookies» o «Términos» en el banner abre un modal — sin navegar, sin perder tu posición de scroll en la landing. El texto legal completo está ahí, scrollable, con encabezados adecuados. Tras leer, cierra el modal y elige Aceptar o Rechazar. El flujo es sin fricción para el usuario y nos permite evitar saltos de página extra que perjudicarían la conversión.",
        },
      ],
      benefitsTitle: "Por qué nuestro banner gana a los CMPs de terceros",
      benefits: [
        "Alineado con AEPD y ePrivacy — Aceptar/Rechazar con la misma prominencia",
        "Sin scripts de terceros, sin DNS extras",
        "Privacidad/Cookies/Términos en modales — sin saltos de página",
        "Analítica sin cookies se dispara incluso antes del consentimiento — nunca pierdes datos",
        "Cookie propia eliminada al Rechazar",
        "Ligero — parte del bundle de la landing",
      ],
      conclusionTitle: "Cumplimiento sin lastre de conversión",
      conclusionBody:
        "El consentimiento de cookies es innegociable en la UE pero no tiene por qué ralentizar tu página o perjudicar tu conversión. El banner de IQ Rest es rápido, justo y plenamente conforme. Los visitantes que Aceptan habilitan analítica por sesión; los que Rechazan siguen registrándose en nuestros contadores anónimos agregados, así sabemos qué pasa en la landing sin identificar nunca a nadie.",
      ctaText: "Mira el flujo de consentimiento en acción — abre IQ Rest en un navegador limpio.",
      ctaButton: "Visitar landing",
    },

    "privacy-terms-in-modals-no-page-jumps": {
      meta: {
        title: "Privacidad y términos en modales — sin saltos de página | IQ Rest",
        description:
          "Política de privacidad, condiciones del servicio y política de cookies se abren ahora en modales en la landing — sin perder tu scroll, sin navegación extra.",
      },
      title: "Privacidad, términos y cookies en modales — sin saltos de página",
      subtitle:
        "Pulsa cualquier enlace legal en la landing o en la página de auth y la política se abre en un modal limpio. Sin navegación, sin perder tu posición de scroll, sin romper tu flujo de conversión.",
      intro:
        "Las páginas independientes /privacy, /terms y /cookies eran el patrón estándar — y el error estándar. Los visitantes pulsaban el enlace, perdían su sitio en la landing, leían la política y olvidaban volver. La conversión caía. IQ Rest abre ahora los tres documentos legales como modales en la propia página: misma posición de scroll preservada, misma experiencia de landing sin interrupciones, cumplimiento legal completo mantenido.",
      sections: [
        {
          title: "Un componente Modal, tres documentos",
          body: "Usamos un único componente Modal con un switch sobre el tipo de documento. Ábrelo desde el banner de cookies, la página de auth, el footer — mismo componente, mismo bloqueo de scroll, mismo cierre con escape. El texto legal vive en constantes TypeScript compartidas, así que actualizar una cláusula una vez se propaga a todos los lugares donde aparece la política. Sin duplicación, sin desfase.",
        },
        {
          title: "Pila de modales — abrir uno desde dentro de otro",
          body: "Si estás leyendo la Política de cookies y quieres pasar a la Política de privacidad, el enlace dentro del modal abre el siguiente modal encima — no como redirección. La pila gestiona la navegación atrás correctamente, escape cierra el modal superior, clicar fuera cierra elegantemente. La interacción es lo que los usuarios esperan de una app nativa.",
        },
        {
          title: "Los 35 idiomas — mismo texto fuente único",
          body: "El texto legal está en inglés (idioma de nuestra entidad legal, autónomo registrado en España), pero el chrome del modal — títulos, botón de cierre, etiquetas de enlaces — está totalmente localizado a los 35 idiomas. Los visitantes en español, alemán, polaco o coreano ven un modal localizado que abre el texto legal en inglés, exactamente como nuestro enfoque de cumplimiento exige.",
        },
      ],
      benefitsTitle: "Por qué los modales ganan a las páginas legales independientes",
      benefits: [
        "Sin pérdida de scroll — los visitantes se quedan en la landing",
        "Mayor conversión — menos rebotes no intencionados",
        "Componente único, tres documentos — sin duplicación",
        "Pila de modales — abre uno desde dentro de otro limpiamente",
        "Chrome localizado en 35 idiomas",
        "Cumplimiento legal completo preservado",
      ],
      conclusionTitle: "Legal sin fricción",
      conclusionBody:
        "Los abogados quieren que la política sea legible. Los marketers quieren que el visitante convierta. Los modales contentan a ambos: la política está a un toque, totalmente legible, sin impacto en el flujo de la landing. La postura de cumplimiento de IQ Rest sigue fuerte sin el lastre de conversión de las páginas legales independientes.",
      ctaText: "Prueba el nuevo flujo — abre el banner de cookies y pulsa cualquier enlace de política.",
      ctaButton: "Visitar landing",
    },

    "auto-catalan-language-catalonia-visitors": {
      meta: {
        title: "Catalán automático para visitantes de Cataluña | IQ Rest",
        description:
          "Los visitantes desde Barcelona, Tarragona, Lleida y Girona ven IQ Rest en catalán por defecto en lugar de en castellano.",
      },
      title: "Detección automática de catalán para visitantes de Cataluña",
      subtitle:
        "Los visitantes desde Barcelona, Tarragona, Lleida y Girona aterrizan por defecto en la versión en catalán de IQ Rest. El resto de España sigue viendo castellano.",
      intro:
        "Cataluña tiene una identidad lingüística fuerte — millones de catalanes usan el catalán como primera lengua, distinta del castellano. IQ Rest respeta ahora esa distinción a nivel geo: los visitantes cuya IP geolocaliza en una provincia catalana reciben la landing /ca automáticamente. El castellano sigue siendo el idioma por defecto para el resto de España. Los visitantes pueden cambiar de idioma cuando quieran mediante el modal de idiomas en el footer.",
      sections: [
        {
          title: "Geo-detección en el edge",
          body: "Leemos el país y la región del visitante desde nuestro módulo geo de nginx en cada petición. Si el país es España y la región coincide con Barcelona, Tarragona, Lleida o Girona (o el nombre contiene «Catalonia»/«Catalunya»), redirigimos a /ca. Si no, el visitante sigue el enrutamiento estándar país-a-locale y aterriza en la página del idioma apropiado.",
        },
        {
          title: "La cookie de idioma anula el geo",
          body: "Una vez eliges idioma manualmente con el selector, tu elección se persiste en una cookie que anula la geo en visitas futuras. Un visitante catalanohablante que prefiere leer IQ Rest en inglés no será redirigido constantemente a /ca — su elección explícita siempre gana. La geo es un valor por defecto, no una restricción.",
        },
        {
          title: "Traducción al catalán completa, no automática",
          body: "La landing /ca no está traducida automáticamente desde el español — cada palabra está traducida profesionalmente por copywriters catalanohablantes del sector restaurantero. Terminología hostelera, condiciones de pago, referencias culturales, todo coincide con cómo habla realmente un dueño de restaurante catalán. La página se lee como escrita para el mercado, porque lo está.",
        },
      ],
      benefitsTitle: "Por qué importa el catalán automático",
      benefits: [
        "Los visitantes desde Barcelona/Tarragona/Lleida/Girona ven catalán automáticamente",
        "El resto de España sigue recibiendo castellano — sin sobre-enrutamiento",
        "La elección manual de idioma persiste vía cookie",
        "Traducción profesional completa, no automática",
        "Geo-detección ocurre en el edge — sin parpadeo en cliente",
        "Misma landing optimizada para conversión que cualquier otro idioma",
      ],
      conclusionTitle: "Respeto a la identidad lingüística",
      conclusionBody:
        "Devolver a los visitantes catalanes al castellano es algo pequeño técnicamente pero grande política y culturalmente. El geo-routing de IQ Rest trata ahora al catalán como idioma de primera clase para los visitantes de Cataluña. Resultado: una landing con mayor conversión para los dueños catalanohablantes, que se sienten respetados desde el primer segundo en la web.",
      ctaText: "Visita IQ Rest desde Cataluña y verás la página en tu idioma.",
      ctaButton: "Abrir landing en catalán",
    },

    "trial-expired-modal-keep-menu-public": {
      meta: {
        title: "Modal de prueba expirada — la carta QR sigue pública | IQ Rest",
        description:
          "Cuando termina tu prueba, tu carta no desaparece. Los clientes pueden seguir escaneando y viendo; tú ves un modal de actualización en el panel.",
      },
      title: "¿Prueba expirada? Tu carta QR sigue en línea para los clientes",
      subtitle:
        "El fin de la prueba ya no apaga tu carta pública. Los clientes pueden seguir escaneando y viendo; solo el panel te invita a actualizar. Sin sorpresas en mitad del servicio.",
      intro:
        "El comportamiento antiguo del fin de prueba era duro: cuando terminaban tus 14 días, tu carta QR pública se apagaba para los clientes. Si pillaba a mitad de servicio, era un desastre. Lo cambiamos. Ahora el fin de prueba muestra un modal dentro del panel invitándote a actualizar, pero tu carta pública sigue funcionando con normalidad. Actualizas cuando quieres, no cuando un cliente está agitando el móvil delante del QR de la mesa.",
      sections: [
        {
          title: "La carta pública sigue activa",
          body: "La prueba de 14 días termina silenciosamente desde la perspectiva del cliente. La carta QR, los pedidos online, las reservas — todo sigue funcionando. El dueño ve el modal de actualización al iniciar sesión la próxima vez. Esta separación significa que el fin de prueba nunca puede romper un servicio o avergonzarte ante los clientes.",
        },
        {
          title: "Modal en el panel, no redirección dura",
          body: "Antes, el fin de prueba redirigía el panel a una página de facturación. Eso rompía enlaces directos y confundía a los usuarios que se veían rebotados a mitad de tarea. Ahora mostramos un modal limpio: «Tu prueba ha terminado. Elige un plan para seguir usando funciones avanzadas». El modal se puede cerrar; puedes seguir navegando el panel, pero las acciones nuevas que requieren un plan de pago muestran avisos de upsell en línea.",
        },
        {
          title: "Previsualización siempre disponible",
          body: "Aunque la prueba haya expirado, sigues pudiendo previsualizar tu carta QR desde el panel. No te bloqueamos para ver lo que ven los clientes. Edita la carta, previsualiza el resultado — solo las acciones relacionadas con publicar sugieren actualizar. Esto mantiene el panel productivo incluso a mitad de decisión, así que no pierdes acceso mientras comparas planes.",
        },
      ],
      benefitsTitle: "Por qué un fin de prueba suave gana al corte duro",
      benefits: [
        "La carta QR pública sigue activa para los clientes",
        "Sin caídas sorpresa a mitad de servicio",
        "Modal en el panel en lugar de redirección forzada a facturación",
        "Previsualización siempre disponible, sin importar el estado del plan",
        "Avisos de upsell en línea reemplazan a los bloqueos abruptos",
        "El dueño actualiza a su propio ritmo",
      ],
      conclusionTitle: "Respetar las horas de servicio del restaurante",
      conclusionBody:
        "Los restaurantes funcionan con márgenes ajustados y horarios más ajustados aún. Una carta QR cayéndose porque expiró una prueba gratuita es peor que el propio límite — daña la confianza. El fin suave deja las luces encendidas para los clientes mientras sigue empujando al dueño hacia un plan de pago. Las conversiones se mantienen altas; el downtime cae a cero.",
      ctaText: "Empieza tu prueba de 14 días sabiendo que tu carta sigue activa pase lo que pase.",
      ctaButton: "Empezar prueba gratis",
    },

    "item-renamed-to-dish-clearer-menu-editor": {
      meta: {
        title: "Item → Plato: terminología más clara en el editor | IQ Rest",
        description:
          "Renombramos «Item» a «Plato» en todo el panel. Los dueños de restaurantes no deberían tener que traducir terminología SaaS genérica en su cabeza.",
      },
      title: "Item → Plato: terminología más clara en todo el editor",
      subtitle:
        "Reemplazamos la etiqueta genérica «Item» por «Plato» en todas las superficies del panel. Cambio pequeño, gran ganancia de claridad para los dueños que no hablan SaaS.",
      intro:
        "Los técnicos dicen «item». Los restauranteros dicen «plato». El desencaje era pequeño pero constante — cada vez que mostrábamos «Add Item», el dueño tenía que traducirlo mentalmente a «Añadir plato». Renombramos todo: botones, etiquetas, mensajes de éxito, errores, títulos de páginas. El panel habla ahora el mismo idioma que las personas que lo usan.",
      sections: [
        {
          title: "Dónde aplica el renombrado",
          body: "Cada superficie de cara al usuario: «Añadir item» pasó a «Añadir plato». La pestaña «Items» en la carta pasó a «Platos». «Ajustes de item» pasó a «Ajustes de plato». Toasts de éxito («Item creado») pasaron a («Plato creado»). Errores de validación de formulario, breadcrumbs, encabezados — todos actualizados. La columna interna de la base de datos sigue llamándose «item» por compatibilidad, pero ningún usuario la ve.",
        },
        {
          title: "Traducido a los 35 idiomas",
          body: "Cada idioma tiene su palabra correcta para «plato» distinta de «item». Español «plato», francés «plat», alemán «Gericht», italiano «piatto», catalán «plat», japonés «料理». Actualizamos la clave de traducción en cada idioma y verificamos que el resultado se lee con naturalidad en cada uno. Sin traducción automática; revisores nativos validaron cada uno.",
        },
        {
          title: "Categoría por defecto auto-creada también",
          body: "Mientras estábamos en el editor, también auto-creamos una categoría por defecto llamada «Carta» en la primera visita al panel. Comportamiento antiguo: los dueños aterrizaban en una carta vacía, tenían que pulsar «Añadir categoría» antes de añadir un plato, a menudo se rendían. Comportamiento nuevo: existe una categoría Carta, pulsas «Añadir plato», estás editando al instante. Una barrera eliminada.",
        },
      ],
      benefitsTitle: "Por qué importa la terminología",
      benefits: [
        "«Plato» encaja con cómo hablan realmente los dueños",
        "Actualizado en todas las superficies del panel — botones, etiquetas, toasts",
        "Traducido a los 35 idiomas por revisores nativos",
        "Categoría por defecto auto-creada — sin carta vacía al empezar",
        "Más rápido del registro al primer plato añadido",
        "Menos traducción mental = menor rebote en onboarding",
      ],
      conclusionTitle: "Habla el idioma del usuario",
      conclusionBody:
        "La terminología SaaS genérica («item», «entity», «object») está bien para ingenieros. Los dueños de restaurantes necesitan palabras que coincidan con lo que dicen en su trabajo. IQ Rest habla ahora el mismo idioma que las personas que lo usan — en cada botón, etiqueta y notificación — y los datos de conversión ya reflejan el cambio.",
      ctaText: "Regístrate y añade tu primer plato en menos de un minuto.",
      ctaButton: "Crear mi carta",
    },

    "auto-default-category-restaurant-menu-onboarding": {
      meta: {
        title: "Categoría por defecto automática en el onboarding | IQ Rest",
        description:
          "Los nuevos usuarios ya no se enfrentan a una carta vacía. IQ Rest auto-crea una categoría por defecto para que añadas tu primer plato al instante.",
      },
      title: "Categoría por defecto automática — salta la carta vacía",
      subtitle:
        "Los nuevos usuarios aterrizan en una carta con una categoría por defecto ya creada. Pulsa «Añadir plato» y empieza a editar. Se acabó la barrera de «crea una categoría primero».",
      intro:
        "El onboarding antiguo exigía a los usuarios crear una categoría antes de añadir un plato. Las cartas vacías intimidan — muchos usuarios nuevos se rendían en ese punto. IQ Rest auto-crea ahora una categoría por defecto «Carta» la primera vez que abres el panel, así la primera acción es añadir un plato, no configurar una jerarquía. Más rápido, más fluido, más cartas se construyen de verdad.",
      sections: [
        {
          title: "Categoría por defecto creada al iniciar sesión",
          body: "La primera vez que inicias sesión en un panel nuevo, IQ Rest comprueba si tienes alguna categoría. Si no, crea una llamada «Carta» (traducida a tu idioma). La categoría está lista para recibir platos al instante. Puedes renombrarla o añadir más cuando quieras — pero no tienes que hacerlo antes de añadir tu primer plato.",
        },
        {
          title: "Renombrada según tu cocina si usas el asistente",
          body: "Si usaste el asistente de registro de 3 pasos, el sembrador genera categorías propias de la cocina en su lugar — «Pizza», «Pasta», «Antipasti» para italiana; «Sushi», «Ramen», «Sake» para japonesa. La categoría por defecto «Carta» solo entra en juego para usuarios que saltan el asistente o se registran directamente con Google.",
        },
        {
          title: "Compatible con cartas existentes",
          body: "Si ya tienes categorías — de uso pasado, datos importados, el sembrador — la por defecto no se crea. Solo intervenimos cuando la carta está genuinamente vacía. Los usuarios existentes no ven cambios en su estructura de carta.",
        },
      ],
      benefitsTitle: "Por qué la categoría por defecto acelera el onboarding",
      benefits: [
        "Sin barrera de «crea una categoría primero» para usuarios nuevos",
        "Pulsa «Añadir plato» como primera acción, no la segunda",
        "Categoría nombrada en tu idioma, no inglés por defecto",
        "El flujo del asistente sigue sembrando categorías propias de la cocina",
        "Cartas existentes intactas",
        "Más rápido del inicio de sesión al primer plato añadido",
      ],
      conclusionTitle: "Elimina el estado vacío",
      conclusionBody:
        "Los estados vacíos son donde rebotan los usuarios nuevos. Cada barrera entre el usuario y su primera acción productiva te cuesta conversiones. Auto-crear una categoría por defecto elimina una de esas barreras. Es un cambio pequeño con un impacto medible en cuán rápido los nuevos restaurantes llegan a una carta publicable.",
      ctaText: "Regístrate y empieza a añadir platos al instante.",
      ctaButton: "Crear mi carta",
    },

    "skip-restaurant-name-step-onboarding": {
      meta: {
        title: "Salta el paso del nombre del restaurante en el onboarding | IQ Rest",
        description:
          "Eliminamos el paso «nombre del restaurante» del onboarding. Pónlo después en ajustes — o desde la cabecera de la carta que vas a editar igualmente.",
      },
      title: "Salta el paso del nombre del restaurante en el onboarding",
      subtitle:
        "No hace falta escribir el nombre del restaurante para empezar a construir una carta. Eliminamos ese paso del onboarding — pon el nombre luego desde el panel, o desde la cabecera de la carta en vivo.",
      intro:
        "Los flujos de onboarding que exigen información por adelantado se sienten como rellenar formularios. El onboarding antiguo de IQ Rest pedía un nombre de restaurante en el paso uno. Los usuarios nuevos a menudo no habían decidido la grafía exacta, la variante de marca o la puntuación — así que se atascaban antes incluso de ver el panel. Quitamos el paso. Te registras, aterrizas en el panel, fijas el nombre cuando estés listo. La carta funciona bien sin él.",
      sections: [
        {
          title: "Qué pasa si saltas",
          body: "Si saltas el paso del nombre, el restaurante recibe un marcador de posición («Tu restaurante») oculto por defecto en la carta pública. Los clientes que escanean tu QR ven la carta sin nombre en la cabecera — lo cual está bien para muchos sitios de servicio rápido. En cuanto fijas el nombre en ajustes, aparece en la cabecera, el título de página, el slug de SEO y los compartidos en redes.",
        },
        {
          title: "Fíjalo desde cualquier sitio",
          body: "El campo del nombre se puede editar desde ajustes, desde la cabecera de la carta (toca para editar en línea) y desde la pantalla de previsualización pública. Tres superficies distintas, un único campo subyacente. Lo hicimos fácil de aplazar y trivialmente fácil de comprometer cuando estés listo.",
        },
        {
          title: "Sin penalización SEO por usar el por defecto",
          body: "Usamos el slug («tu-restaurante») como respaldo para el título de página y meta tags hasta que pongas un nombre real. Los buscadores no te penalizan — solo ven un título genérico. En cuanto pones un nombre real, todas las meta tags se actualizan y Google re-indexa en horas.",
        },
      ],
      benefitsTitle: "Por qué saltar acelera el onboarding",
      benefits: [
        "Sin presión de decisión en el momento equivocado",
        "Aterriza en el panel más rápido",
        "Pon el nombre cuando llegue la inspiración — o cuando esté la entidad legal registrada",
        "Edición en línea desde la cabecera de la carta",
        "La carta pública funciona sin un nombre fijado",
        "Sin penalización SEO por usar el marcador",
      ],
      conclusionTitle: "Menos decisiones, más hecho",
      conclusionBody:
        "Cada campo de formulario en el onboarding es una oportunidad de rebote. Al quitar el campo del nombre del restaurante, quitamos una de esas oportunidades. Los usuarios nuevos aterrizan ahora en el panel con una carta funcional y la libertad de nombrar (o no) su restaurante a su propio ritmo. El aumento de conversión fue inmediato.",
      ctaText: "Regístrate en segundos — no se requiere nombre del restaurante.",
      ctaButton: "Empezar prueba gratis",
    },

    "try-menu-before-signup-anonymous-onboarding": {
      meta: {
        title: "Prueba la carta QR antes de registrarte — anónimo | IQ Rest",
        description:
          "Construye una carta de muestra antes de crear cuenta. Guarda tu progreso por email cuando quieras conservarla. Sin compromiso, sin fricción.",
      },
      title: "Prueba una carta QR antes de registrarte",
      subtitle:
        "Construye una carta de muestra, mira cómo queda tu QR, previsualiza la experiencia en vivo — todo antes de crear una cuenta. Guarda tu progreso por enlace de email cuando estés listo.",
      intro:
        "La mayoría de servicios de carta QR exigen crear cuenta antes de poder hacer nada. Es el orden equivocado. Los nuevos dueños quieren sentir el producto primero — ver cómo queda un plato, cómo se siente el flujo de escaneo de QR — y solo entonces comprometerse a registrarse. IQ Rest deja construir una carta de muestra completa de forma anónima. Cuando quieras conservarla, te la guardamos por email. Sin fricción, sin compromiso.",
      sections: [
        {
          title: "Una sesión anónima guarda tu trabajo",
          body: "Se crea un ID de sesión anónima en tu primera visita y se almacena en una cookie. Cada categoría que añades, cada plato que creas, cada foto que subes se asocia a esa sesión. Puedes cerrar la página, volver y tu carta sigue ahí. Persistimos la sesión 7 días — tiempo de sobra para evaluar el producto sin presión.",
        },
        {
          title: "Guarda el progreso por enlace de email",
          body: "Cuando decidas que quieres conservar la carta, pulsa «Guardar progreso». Escribe tu email. Te enviamos un enlace mágico que, al pulsarlo, convierte la sesión anónima en una cuenta real asociada a tu email. Todo tu trabajo se transfiere automáticamente — sin reentrada, sin progreso perdido, sin «vaya, lo borró». La conversión a cliente de pago ocurre en tus términos.",
        },
        {
          title: "Reduce a cero la ansiedad del registro",
          body: "Al dejar a los usuarios probar antes de registrarse, invertimos el patrón SaaS típico. Los visitantes no necesitan decidir si IQ Rest merece su email — pueden verlo por sí mismos. Los restaurantes que prueban anónimamente y luego se registran convierten más que los obligados a registrarse primero, porque ya invirtieron en la carta y no quieren perderla.",
        },
      ],
      benefitsTitle: "Por qué gana el onboarding anónimo",
      benefits: [
        "Construye una carta real sin crear cuenta",
        "La sesión anónima persiste 7 días",
        "Guarda el progreso al email cuando decidas comprometerte",
        "Sin reentrada — el trabajo se transfiere a tu cuenta real",
        "Evaluación del producto sin fricción",
        "Mayor conversión global de registro",
      ],
      conclusionTitle: "Deja que el producto se venda solo",
      conclusionBody:
        "La mejor manera de convencer a un dueño de restaurante de que IQ Rest es para él es dejarle usarlo. El onboarding anónimo convierte un visitante curioso en un usuario comprometido sin pedir nada a cambio. Cuando pides el email, el usuario ya invirtió tiempo en su carta — guardarla no le cuesta nada y conserva lo construido.",
      ctaText: "Prueba IQ Rest ahora — sin cuenta necesaria.",
      ctaButton: "Pruébalo gratis",
    },

    "save-menu-progress-via-email-link": {
      meta: {
        title: "Guarda el progreso de tu carta por enlace de email | IQ Rest",
        description:
          "¿Construiste una carta de muestra anónimamente? Guárdala a tu email y te enviamos un enlace mágico para reclamar la cuenta.",
      },
      title: "Guarda el progreso de tu carta por enlace de email",
      subtitle:
        "¿Construiste una carta anónimamente y quieres conservarla? Escribe tu email. Te enviamos un enlace mágico que convierte tu trabajo anónimo en una cuenta real en un toque.",
      intro:
        "Cuando has pasado cinco minutos construyendo una carta de muestra sin cuenta, no quieres perderla. La función «Guardar progreso» de IQ Rest convierte tu sesión anónima en una cuenta real mediante un enlace mágico. Escribe tu email, pulsa el enlace en tu bandeja, tu carta queda asociada permanentemente a tu cuenta. Sin contraseña, sin formulario de registro, sin reentrada de datos.",
      sections: [
        {
          title: "Flujo de enlace mágico — sin contraseña",
          body: "Enviamos un enlace de un solo uso a tu email. Pulsa dentro de 10 minutos y entras en una cuenta nueva que contiene la carta que construiste anónimamente. Sin contraseña que elegir, sin preguntas de seguridad, sin paso de verificación de email — el clic del enlace ES la verificación. Luego emitimos una cookie de sesión y estás dentro del panel con todo tu trabajo preservado.",
        },
        {
          title: "Gestión de conflictos para cuentas existentes",
          body: "Si el email que escribiste ya tiene cuenta, no la sobrescribimos. Enviamos el enlace, lo pulsas y te preguntamos si fusionar la carta anónima con tu cuenta existente o descartarla. La mayoría elige fusionar — tus platos existentes se quedan, los nuevos de la edición anónima se añaden. Claro, seguro, predecible.",
        },
        {
          title: "Limitado por tasa y resistente a spam",
          body: "Limitamos las peticiones de guardar progreso por IP y por email para prevenir abuso. El enlace expira en 10 minutos y es de un solo uso. Si alguien más intenta reclamar tu sesión anónima, necesita acceso a tu bandeja — el mismo modelo de seguridad que cualquier flujo de auth con enlace mágico moderno.",
        },
      ],
      benefitsTitle: "Por qué gana el guardado por enlace mágico",
      benefits: [
        "Sin contraseña que elegir, recordar o restablecer",
        "El trabajo anónimo se transfiere a tu cuenta real intacto",
        "Cuentas existentes: elige fusionar o descartar",
        "Limitado por tasa y por tiempo — seguro por diseño",
        "Un toque para comprometerte — sin formulario de registro",
        "El email mismo actúa como paso de verificación",
      ],
      conclusionTitle: "Conversión sin fricción",
      conclusionBody:
        "El momento en que un usuario quiere convertirse de anónimo a identificado es el momento en que más probablemente rebote en un formulario de registro largo. Los enlaces mágicos colapsan ese formulario en un solo campo de email más un clic en la bandeja. El usuario gasta 30 segundos y termina con una cuenta real y persistida que contiene todo lo construido. Es el flujo de conversión con menos fricción del sector.",
      ctaText: "Construye una carta anónimamente y luego guárdala por email cuando estés listo.",
      ctaButton: "Pruébalo gratis",
    },

    "one-click-stripe-checkout-returning-users": {
      meta: {
        title: "Checkout de Stripe en un clic para usuarios recurrentes | IQ Rest",
        description:
          "¿Ya iniciaste sesión? Pulsa un plan en pricing y vas directo al checkout de Stripe. Sin reintroducir datos, sin pantallas extra.",
      },
      title: "Checkout de Stripe en un clic para usuarios recurrentes",
      subtitle:
        "¿Usuario logado pulsa un plan? Directo al checkout de Stripe, sin pantalla de confirmación extra. Dos clics desde la página de precios hasta la suscripción activa.",
      intro:
        "Los usuarios recurrentes que ya tienen cuenta en IQ Rest no deberían tener que reconfirmar nada al actualizar. Eliminamos cada pantalla intermedia entre «pulsar plan en pricing» y «aterrizar en checkout de Stripe». Dos clics totales: elige plan, introduce datos de tarjeta. La suscripción está activa antes de que termines el café.",
      sections: [
        {
          title: "Detectar estado logado en pricing",
          body: "Nuestra página de precios comprueba la cookie de sesión autenticada al cargar. Si estás logado, los botones de plan saltan el desvío de «regístrate primero» y van directo a /api/stripe/checkout, que crea una Sesión de Checkout de Stripe y devuelve la URL para redirigir. Si no estás logado, los botones te llevan por el flujo estándar de registro primero — sin cambio de comportamiento para usuarios nuevos.",
        },
        {
          title: "Idioma de UI reenviado a Stripe",
          body: "Tu idioma del panel se reenvía al Checkout de Stripe vía el parámetro locale, así la página de checkout se renderiza en tu idioma. Los usuarios españoles ven Stripe en español; los alemanes en alemán. El flujo de checkout se siente sin costuras porque nunca rompe la continuidad lingüística desde tu panel.",
        },
        {
          title: "Return URL te lleva de vuelta al panel",
          body: "Tras un pago exitoso, Stripe redirige a una return URL que fijamos al panel raíz en tu idioma (p. ej. /es/dashboard). El webhook actualiza tu estado de suscripción en el servidor antes de que llegues, así el panel al que aterrizas ya refleja el plan nuevo — sin estado «pendiente», sin parpadeo de contenido sin actualizar.",
        },
      ],
      benefitsTitle: "Por qué convierte el checkout en un clic",
      benefits: [
        "Dos clics desde pricing hasta suscripción activa",
        "Sin intersticial de «confirma tu cuenta» para usuarios logados",
        "Checkout de Stripe se muestra en el idioma de tu panel",
        "Return URL te lleva al panel actualizado",
        "Webhook actualiza el plan antes de que llegues — sin parpadeo",
        "Usuarios nuevos siguen teniendo el flujo estándar de registro → upgrade",
      ],
      conclusionTitle: "Haz trivialmente fácil el camino fácil",
      conclusionBody:
        "El usuario que ya está convencido no necesita más convicción — necesita menos clics. El checkout en un clic elimina cada pantalla entre intención y pago para usuarios recurrentes. Resultado: mayor conversión de prueba a pago, menos upgrades abandonados, reconocimiento de ingresos más rápido por expansión de suscripción.",
      ctaText: "¿Ya eres usuario? Elige tu plan y actualiza en dos clics.",
      ctaButton: "Ver precios",
    },

    "dashboard-ui-redesign-consistent-cards-navigation": {
      meta: {
        title: "Rediseño UI del panel: tarjetas, navegación y formularios | IQ Rest",
        description:
          "Panel de IQ Rest rediseñado con componentes de tarjeta consistentes, navegación lateral persistente con resaltado de página activa y mejores acciones de formulario.",
      },
      title: "Rediseño UI del panel: tarjetas consistentes, navegación y acciones de formulario",
      subtitle:
        "Un panel pulido con estilo de tarjeta unificado, navegación lateral persistente, estados activos en color de acento y acciones de guardar/borrar al pie en cada página de formulario.",
      intro:
        "IQ Rest ha pasado por un rediseño UI integral del panel. Cada página usa ahora estilo de tarjeta consistente con radios de borde unificados, una navegación lateral persistente con estados activos en color de acento, y páginas de formulario mejoradas con acciones de guardar y borrar al pie. El resultado es una experiencia más limpia y pulida para gestionar la carta QR digital de tu restaurante.",
      sections: [
        {
          title: "Diseño de tarjeta consistente en todas las páginas",
          body: "Cada página del panel usa ahora un componente DashboardCard unificado con bordes redondeados consistentes, colores de fondo sutiles y encabezados de sección opcionales. Analítica, facturación, ajustes, contactos, ajustes de reservas y todas las páginas de formulario comparten el mismo lenguaje visual. Etiquetas de pista con tooltips popover reemplazan al texto descriptivo en línea, manteniendo la interfaz limpia mientras siguen aportando contexto útil cuando hace falta.",
        },
        {
          title: "Navegación lateral persistente con estados activos",
          body: "En pantallas de escritorio, una navegación lateral persistente está ahora visible en cada página. La página activa se resalta con un fondo de color de acento, dejando claro al instante dónde estás. Las sub-páginas como categorías, platos y pedidos resaltan correctamente el ítem padre Carta. La barra lateral incluye acceso rápido a Carta, Imprimir QR, Reservas, Analítica, Ajustes, Contactos, Facturación y Soporte — todo sin salir de la vista actual.",
        },
        {
          title: "Páginas de formulario mejoradas con acciones al pie",
          body: "Todas las páginas de formulario — categorías, platos, mesas, diseño, ajustes, contactos y ajustes de reservas — incorporan ahora un botón de guardar duplicado al pie en color de acento. Los botones de borrar aparecen a la izquierda con un estilo discreto. Esto significa que ya no necesitas volver al inicio para guardar tus cambios. El botón de cerrar sesión se ha movido de la barra lateral al pie de la página de diseño, manteniendo la navegación enfocada en acciones esenciales.",
        },
      ],
      benefitsTitle: "Beneficios del rediseño UI",
      benefits: [
        "Estilo de tarjeta unificado con bordes y fondos consistentes en todas las páginas",
        "Navegación lateral persistente en escritorio con estados activos en color de acento",
        "Botones de guardar al pie en todos los formularios — sin necesidad de subir para guardar",
        "Acciones de borrar y guardar claramente separadas — borrar a la izquierda, guardar a la derecha",
        "Encabezados de sección en tarjetas de formulario para mejor organización visual",
        "Página de analítica más limpia con envoltorios DashboardCard y mejor disposición de stats de dispositivos",
      ],
      conclusionTitle: "Una experiencia de panel más pulida",
      conclusionBody:
        "Este rediseño UI aporta consistencia visual y mejor usabilidad a cada rincón del panel de IQ Rest. Tanto si estás editando platos, revisando analítica o gestionando reservas, la interfaz se siente cohesionada e intuitiva. Combinado con la navegación lateral persistente, gestionar la carta QR digital de tu restaurante es más rápido y agradable que nunca.",
      ctaText: "Vive el panel rediseñado",
      ctaButton: "Abrir panel",
    },

    "ai-menu-scanner-create-digital-qr-menu": stub("Escáner de carta con IA — Crea una carta QR digital con una foto"),
    "redesigned-dashboard-qr-menu-management": stub("Panel rediseñado para gestión de carta QR"),
    "reservation-emails-analytics-digital-qr-menu": stub("Emails de reservas y analítica para tu carta QR digital"),
    "multi-currency-geo-pricing-qr-menu": stub("Precios multi-divisa por geo para tu carta QR"),
    "support-qr-menu-restaurant-cafe": stub("Soporte integrado para tu carta QR"),
    "detailed-analytics-restaurant-qr-menu-website": stub("Analítica detallada para tu web de carta QR"),
    "instant-qr-menu-restaurant-website-generator": stub("Generador instantáneo de carta QR y web de restaurante"),
    "subscription-plans-qr-menu-restaurant-website": stub("Planes de suscripción para tu carta QR"),
    "public-restaurant-qr-menu-website": stub("Web pública de carta QR de restaurante"),
    "add-items-restaurant-qr-menu-website": stub("Añade platos a tu carta QR en segundos"),
    "qr-menu-restaurant-categories": stub("Categorías para tu carta QR de restaurante"),
    "easy-qr-menu-cafe-control-panel": stub("Panel de control fácil de carta QR para cafetería"),
    "faq-page-organization": stub("Organización de la página de FAQ"),
    "free-restaurant-website-improvements": stub("Mejoras de la web gratuita para restaurante"),
    "user-authentication-interface": stub("Interfaz de autenticación de usuario"),
  },
};

function stub(title: string) {
  return {
    meta: { title: `${title} | IQ Rest`, description: title },
    title,
    subtitle: title,
    intro: title,
    sections: [],
    benefitsTitle: "Beneficios",
    benefits: [],
    conclusionTitle: title,
    conclusionBody: title,
    ctaText: "Prueba IQ Rest",
    ctaButton: "Empezar prueba gratis",
  };
}
