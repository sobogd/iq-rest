// Versión española equivalente de los tres documentos legales (Política de
// privacidad / Condiciones del servicio / Política de cookies). Se sirve en
// las rutas self-canonical /es/privacy, /es/terms y /es/cookies (app/es/…),
// con hreflang recíproco con las copias ingles de la raíz.
//
// La estructura de secciones espeja 1:1 el archivo legal-text.tsx para que el
// diff de revisión jurídica sea sección a sección. Los datos del operador son
// idénticos; solo la prosa cambia de idioma.
//
// Mantenido en TypeScript (no JSON i18n) como en legal-text.tsx: los documentos
// legales pasan por revisión jurídica, no por el flujo de traducción de la app.

export const OPERATOR_ES = {
  legalName: "Bogdan Sokolov",
  status: "empresario individual (autónomo) inscrito en España",
  brand: "IQ Rest",
  domain: "iq-rest.com",
  contactEmail: "support@iq-rest.com",
  fiscalAddress: "Calle Boca Del Rio 2, 1A, Oviedo, 33010, Asturias, España",
  taxId: "ESZ1894474S",
  hostingProvider: "Hetzner Online GmbH, Núremberg, Alemania",
};

type Section = { heading?: string; paragraphs: string[] };

/** Cuerpo de la Política de cookies. Versión equivalente en español de
 *  COOKIE_POLICY_SECTIONS. */
export const COOKIE_POLICY_TITLE_ES = "Política de cookies";

// Cada documento lleva su propia fecha de revisión.
export const COOKIE_LAST_UPDATED_ES = "9 de noviembre de 2026";

export const COOKIE_POLICY_SECTIONS_ES: Section[] = [
  {
    paragraphs: [
      `Última actualización: ${COOKIE_LAST_UPDATED_ES}`,
      `Esta Política de cookies explica cómo ${OPERATOR_ES.brand} — un servicio operado por ${OPERATOR_ES.legalName}, ${OPERATOR_ES.status} («${OPERATOR_ES.brand}», «nosotros», «nuestro») — utiliza cookies y tecnologías similares en el sitio web principal de ${OPERATOR_ES.brand} en ${OPERATOR_ES.domain} y en el panel de control (el «Sitio»). Esta política debe leerse conjuntamente con nuestras Condiciones del servicio.`,
    ],
  },
  {
    heading: "1. Qué son las cookies",
    paragraphs: [
      `Las cookies son pequeños archivos de texto que un sitio web coloca en su dispositivo cuando lo visita. Permiten que el sitio recuerde sus selecciones, mantenga su sesión iniciada y comprenda cómo se utiliza el sitio. En el Sitio solo utilizamos cookies estrictamente necesarias para su funcionamiento, por lo que no se muestra ninguna banda de consentimiento de cookies.`,
    ],
  },
  {
    heading: "2. Quiénes somos y dónde se tratan los datos",
    paragraphs: [
      `${OPERATOR_ES.brand} es operado por ${OPERATOR_ES.legalName}, ${OPERATOR_ES.status}, con domicilio fiscal en ${OPERATOR_ES.fiscalAddress} (NIF: ${OPERATOR_ES.taxId}). Todos los datos que recopilamos se almacenan en nuestros propios servidores, operados por ${OPERATOR_ES.hostingProvider}. No utilizamos Google Analytics, PostHog, Facebook Pixel ni ningún otro analizador o rastreador publicitario de terceros. Todo el tratamiento analítico es de primera parte, sobre infraestructura bajo nuestro control directo.`,
    ],
  },
  {
    heading: "3. Cookies estrictamente necesarias",
    paragraphs: [
      `Estas son las únicas cookies que el Sitio establece. Son necesarias para mantenerle conectado, mostrar el idioma correcto y mostrar los precios en la moneda adecuada. Se establecen automáticamente y no requieren consentimiento en virtud del artículo 5.3 de la Directiva de privacidad electrónica (la exención de «estrictamente necesarias»).`,
      `Las cookies que utilizamos en el Sitio:`,
      `• iqr_session, iqr_email — mantienen su sesión iniciada en el panel de control`,
      `• geo_country, geo_locale, geo_currency — país detectado a partir de su IP mediante Cloudflare, y el idioma y la moneda de facturación derivados de él`,
      `• NEXT_LOCALE — recuerda el idioma que seleccionó explícitamente`,
    ],
  },
  {
    heading: "4. Analítica en el Sitio — sin cookies en su dispositivo",
    paragraphs: [
      `Medimos cómo se utiliza el sitio web principal mediante eventos anónimos de primera parte enviados a nuestro propio servidor. En el Sitio no se almacena ninguna cookie de analítica en su dispositivo, no existe ningún identificador cross-site y los eventos no pueden vincularse con usted como persona. Cada evento registra únicamente el nombre de la acción (p. ej. «l_pricing_view»), el momento en que ocurrió y la geografía aproximada (país y región a partir de su IP mediante Cloudflare). Es conforme con la Directiva de privacidad electrónica porque no se escribe nada en su dispositivo más allá de las cookies estrictamente necesarias anteriores.`,
    ],
  },
  {
    heading: "5. Medición publicitaria (identificadores de clic en anuncio)",
    paragraphs: [
      `Si llega al Sitio tras hacer clic en uno de nuestros propios anuncios, la plataforma de publicidad incluye un identificador de clic en la URL (Google Ads: gclid; Meta: fbclid). Capturamos ese identificador en nuestros propios servidores únicamente para medir cuántas visitas y registros aporta cada uno de nuestros anuncios. El identificador sin procesar se almacena durante un máximo de 24 horas y después se anonimita de forma irreversible (se ha haheado con una clave efímera que se destruye inmediatamente), tras lo cual ya no puede vincularse con usted ni con un clic concreto. Nunca se comparte con las plataformas de publicidad ni con ningún tercero. Se apoya en nuestro interés legítimo de evaluar la eficacia de nuestra propia publicidad (art. 6.1.f) del RGPD). No requiere banda de consentimiento de cookies porque no se establece ninguna cookie en su dispositivo para esta finalidad. Puede oponerse en cualquier momento enviando un correo a ${OPERATOR_ES.contactEmail} con el identificador de clic de la URL original del anuncio.`,
    ],
  },
  {
    heading: "6. Sin rastreadores de marketing ni de terceros",
    paragraphs: [
      `No utilizamos cookies publicitarias, píxeles de retargeting, rastreadores de marketing de terceros, Google Analytics, Facebook Pixel, Hotjar ni servicios similares. Ningún dato publicitario sale de nuestros servidores.`,
    ],
  },
  {
    heading: "7. Sus derechos",
    paragraphs: [
      `En virtud del RGPD tiene derecho a acceder a los datos personales que conservamos sobre usted, a rectificarlos, suprimirlos, limitar su tratamiento, oponerse a él y a la portabilidad de los mismos. Para ejercer estos derechos, contacte con nosotros en ${OPERATOR_ES.contactEmail}. También tiene derecho a presentar una reclamación ante su autoridad nacional de protección de datos; en España, ante la Agencia Española de Protección de Datos (AEPD, www.aepd.es).`,
    ],
  },
  {
    heading: "8. Cambios en esta política",
    paragraphs: [
      `Podemos actualizar esta Política de cookies de vez en cuando para reflejar cambios en las cookies que utilizamos o en los requisitos legales. La fecha en la parte superior de esta página indica cuándo se actualizó por última vez. El uso continuado del Sitio tras la actualización implica la aceptación de la política revisada.`,
    ],
  },
  {
    heading: "9. Contacto",
    paragraphs: [
      `Las preguntas sobre esta Política de cookies pueden enviarse a ${OPERATOR_ES.contactEmail}.`,
    ],
  },
];

/** Cuerpo de la Política de privacidad. Enumera todos los campos de datos
 *  personales que almacena la plataforma, conforme a los artículos 13/14 RGPD.
 *  Versión equivalente en español de PRIVACY_POLICY_SECTIONS. */
export const PRIVACY_POLICY_TITLE_ES = "Política de privacidad";

export const PRIVACY_LAST_UPDATED_ES = "9 de noviembre de 2026";

export const PRIVACY_POLICY_SECTIONS_ES: Section[] = [
  {
    paragraphs: [
      `Última actualización: ${PRIVACY_LAST_UPDATED_ES}`,
      `Esta Política de privacidad explica cómo ${OPERATOR_ES.brand} — un servicio operado por ${OPERATOR_ES.legalName}, ${OPERATOR_ES.status}, con domicilio fiscal en ${OPERATOR_ES.fiscalAddress} (NIF: ${OPERATOR_ES.taxId}) («${OPERATOR_ES.brand}», «nosotros», «nuestro») — recopila, utiliza, almacena y protege sus datos personales cuando utiliza la plataforma de ${OPERATOR_ES.brand} en ${OPERATOR_ES.domain} y sus subdominios.`,
      `En resumen: todo lo que usted y sus clientes introducen en el Servicio reside en nuestra propia base de datos, en nuestros propios servidores en la Unión Europea. No utilizamos analítica ni rastreadores publicitarios de terceros, y nuestro propio seguimiento de uso no almacena datos personales sobre usted más allá de los identificadores de clic en anuncio de vida breve descritos en la sección 6.`,
      `Cumplimos el Reglamento General de Protección de Datos (RGPD), la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) y la Directiva de privacidad electrónica.`,
    ],
  },
  {
    heading: "1. Responsable del tratamiento",
    paragraphs: [
      `${OPERATOR_ES.brand} es operado por ${OPERATOR_ES.legalName}, ${OPERATOR_ES.status}, quien es el responsable del tratamiento de sus datos personales (NIF: ${OPERATOR_ES.taxId}, domicilio fiscal ${OPERATOR_ES.fiscalAddress}).`,
      `En cuanto a los datos de los clientes presentados a un restaurante concreto a través del Servicio (pedidos, reservas), el restaurante es el responsable del tratamiento y nosotros actuamos como encargado del mismo — ver la sección 7 de las Condiciones del servicio.`,
      `Para cualquier consulta de privacidad, incluido el ejercicio de sus derechos como interesado, contacte con ${OPERATOR_ES.contactEmail}.`,
    ],
  },
  {
    heading: "2. Datos que recopilamos",
    paragraphs: [
      `Solo recopilamos los datos necesarios para operar el Servicio. Las categorías siguientes cubren todo lo que se almacena en nuestra base de datos.`,
      `Datos de la cuenta — al registrarse: dirección de correo electrónico (usada para la iniciación de sesión mediante código de un solo uso y para avisos operativos); idioma preferido del panel; el tipo de cocina y el nombre del restaurante que indica durante el registro.`,
      `Datos de autenticación — códigos de un solo uso (OTP) de vida breve, tokens de sesión hasheados, número de intentos de verificación fallidos. La iniciación de sesión es sin contraseña (código por correo, Google o Apple); no se almacenan contraseñas.`,
      `Datos de facturación — su estado de suscripción, las funciones seleccionadas y el intervalo de facturación, e identificadores de cliente y suscripción de Stripe. Las tarjetas de pago las gestiona íntegramente Stripe; nunca vemos ni almacenamos los datos de la tarjeta.`,
      `Perfil del restaurante — nombre, subtítulo, descripción, dirección pública (slug), moneda, color de marca, imagen de portada, dirección postal, coordenadas geográficas, número de teléfono, usuario de Instagram, número de WhatsApp, idiomas, horario de trabajo, zona horaria, configuración de mesas y reservas.`,
      `Contenido del menú — categorías, platos (nombre, descripción, precio, foto, alérgenos, opciones, traducciones), mesas (número, capacidad, zona, posición en planta).`,
      `Reservas — por cada reserva: nombre del cliente, correo del cliente, teléfono del cliente (opcional), tamaño del grupo, fecha, hora, duración, asignación de mesa, estado, notas internas.`,
      `Pedidos — por cada pedido: nombre del cliente (opcional), teléfono del cliente (opcional), comentario, número de mesa, artículos pedidos, descuentos, importe total, moneda, estado.`,
      `Dispositivos conectados — si empareja tabletas (pantalla de cocina, panel de camareros, panel de reservas): nombre del dispositivo, tipo de dispositivo y última vez que se vio. No se recopila ningún dato personal del personal que utiliza la tableta.`,
      `Soporte y mensajería — contenido de los mensajes que intercambia con nuestro equipo de soporte, incluidos los mensajes enviados por WhatsApp si nos contacta por ahí.`,
      `Seguimiento de uso — solo seguimiento, sin datos personales: eventos anónimos de primera parte que consisten en un nombre de acción (p. ej. «pricing_view»), una marca de tiempo y una región aproximada (país/región derivados de la IP). Sin nombre, sin correo, sin identificador cross-site — los eventos no pueden identificarle como persona. Ver la sección 5.`,
    ],
  },
  {
    heading: "3. Base jurídica del tratamiento",
    paragraphs: [
      `Cada categoría se trata bajo una de las bases jurídicas del artículo 6 del RGPD:`,
      `Ejecución del contrato (art. 6.1.b)) — datos de la cuenta, datos de autenticación, datos de facturación, perfil del restaurante, contenido del menú, reservas, pedidos, dispositivos conectados, mensajes de soporte. Necesario para prestar el Servicio al que se ha suscrito.`,
      `Interés legítimo (art. 6.1.f)) — seguimiento de uso anónimo, registros operativos de corto plazo, prevención de fraudes y abusos, medición de nuestra propia publicidad (sección 6). Sopesado frente a sus derechos; puede oponerse en cualquier momento enviando un correo a ${OPERATOR_ES.contactEmail}.`,
      `Obligación legal (art. 6.1.c)) — datos de facturación que estamos obligados a conservar por la legislación fiscal española.`,
    ],
  },
  {
    heading: "4. Cómo usamos sus datos",
    paragraphs: [
      `Prestar y mantener el Servicio: operar su panel y sus páginas de menú público, generar códigos QR, procesar pedidos y reservas, alimentar las pantallas de cocina y de camareros.`,
      `Autenticarle: enviar códigos de inicio de sesión por correo, validar la iniciación de sesión con Google/Apple, gestionar sesiones.`,
      `Facturarle: procesar los pagos de la suscripción a través de Stripe, enviar facturas.`,
      `Asistirle con las funciones de IA: si importa un menú desde fotos o utiliza la traducción automática, las imágenes o el texto del menú que envíe se procesan mediante un modelo de IA para producir el menú o la traducción en borrador. Los resultados se almacenan solo en su propio menú.`,
      `Comunicarnos con usted: avisos de cuenta y de servicio, respuestas de soporte, cambios importantes en el Servicio. No enviamos correos de marketing sin su consentimiento separado.`,
      `Mejorar la plataforma: seguimiento de uso anónimo, depuración, monitorización de rendimiento.`,
      `Cumplir obligaciones legales: registros fiscales, informes regulatorios cuando proceda.`,
    ],
  },
  {
    heading: "5. Seguimiento de uso — sin datos personales",
    paragraphs: [
      `Medimos cómo se utilizan el sitio web principal y el panel mediante nuestros propios eventos de primera parte, almacenados en nuestra propia base de datos. El seguimiento se limita a lo que ocurrió, no a quién lo hizo: cada evento registra un nombre de acción, el momento en que ocurrió y una región aproximada. No se coloca ninguna cookie de analítica en su dispositivo, no se crea ningún identificador publicitario, no se comparte ningún dato con ninguna empresa de analítica y los eventos no contienen datos personales.`,
      `Las acciones realizadas dentro de su propio panel mientras está conectado pueden asociarse adicionalmente a su cuenta — únicamente para poder ayudarle en casos de soporte y detectar abusos, nunca para publicidad.`,
    ],
  },
  {
    heading: "6. Medición publicitaria (identificadores de clic en anuncio)",
    paragraphs: [
      `Si llega a nuestro sitio tras hacer clic en uno de nuestros propios anuncios, la plataforma de publicidad añade un identificador de clic a la URL (Google Ads: gclid; Meta: fbclid). Lo capturamos en nuestros propios servidores para medir qué anuncios nuestros atraen visitantes y registros. El identificador sin procesar se almacena durante un máximo de 24 horas y después se anonimita de forma irreversible (se ha haheado con una clave efímera que se destruye), de modo que ya no puede vincularse con usted ni con un clic concreto. No se ejecuta en nuestro sitio ningún píxel, etiqueta o rastreador de estas plataformas, y nunca compartimos el identificador con las plataformas de publicidad u otros terceros.`,
      `Este tratamiento se apoya en nuestro interés legítimo de medir nuestra propia publicidad (art. 6.1.f) del RGPD). Puede oponerse en cualquier momento enviando un correo a ${OPERATOR_ES.contactEmail} (incluya el identificador de clic de la URL original del anuncio si desea que se excluya la atribución anterior).`,
    ],
  },
  {
    heading: "7. Dónde se almacenan los datos",
    paragraphs: [
      `Todos los datos del cliente — su cuenta, contenido del restaurante, pedidos, reservas, eventos de uso — se almacenan en un único lugar: nuestra propia base de datos en un servidor dedicado operado para nosotros por ${OPERATOR_ES.hostingProvider}, bajo nuestro control directo. El tratamiento principal no sale de la Unión Europea.`,
      `Las copias de seguridad están cifradas y se almacenan en la misma región de la UE.`,
      `Los datos se cifran en tránsito mediante TLS y en reposo mediante cifrado a nivel de disco.`,
    ],
  },
  {
    heading: "8. Prestadores de servicios",
    paragraphs: [
      `No vendemos, alquilamos ni compartimos sus datos personales con nadie con fines propios, y no utilizamos analítica ni rastreadores publicitarios de terceros. Un pequeño número de prestadores de infraestructura es técnicamente necesario para entregar el Servicio:`,
      `Stripe — procesamiento de pagos. Recibe su correo de facturación y el importe y producto de cada transacción. Privacidad: https://stripe.com/privacy`,
      `Hetzner Online GmbH — aloja nuestro servidor (Alemania, UE). Encargado del tratamiento bajo un acuerdo de encargo de tratamiento; no puede acceder al contenido de la base de datos en funcionamiento normal.`,
      `Cloudflare — CDN y protección DDoS ante nuestro servidor; ve las peticiones entrantes como cualquier operador de red. Encargado del tratamiento.`,
      `Google — solo en dos casos concretos: si elige «Iniciar sesión con Google» (OAuth estándar: correo, nombre, foto); o si utiliza las funciones de importación de menú con IA o de traducción (las imágenes o el texto enviados se procesan mediante la API de IA de Google y no se usan para entrenar modelos).`,
      `Apple — solo si elige «Iniciar sesión con Apple» (alcance OAuth estándar).`,
      `Meta — solo si nos envía un mensaje por WhatsApp (WhatsApp reenvía los mensajes, como en cualquier conversación de WhatsApp).`,
    ],
  },
  {
    heading: "9. Transferencias internacionales de datos",
    paragraphs: [
      `Todo el tratamiento principal se realiza dentro de la Unión Europea. Cuando alguno de los prestadores enumerados (Stripe, Cloudflare, Google, Apple, Meta) transfiere datos a Estados Unidos, la transferencia está cubierta por el Marco de Privacidad de Datos UE-EE. UU. (EU-U.S. Data Privacy Framework) o por las cláusulas contractuales tipo.`,
    ],
  },
  {
    heading: "10. Cuánto tiempo conservamos sus datos",
    paragraphs: [
      `Datos de la cuenta — mientras su cuenta esté activa. Dentro de los 30 días siguientes a la supresión de la cuenta, todos los datos personales se eliminan definitivamente de nuestra base de datos. Las copias de seguridad se sobrescriben dentro de los 90 días.`,
      `Códigos OTP — se eliminan inmediatamente al verificar con éxito o transcurridos 15 minutos, lo que ocurra primero.`,
      `Reservas y pedidos — se conservan mientras mantenga su restaurante en el Servicio (alimentan su historial de pedidos y estadísticas), y se eliminan con la cuenta.`,
      `Eventos de uso anónimos — se conservan sin límite fijo; no contienen datos personales.`,
      `Identificadores de clic en anuncio — el identificador sin procesar se conserva durante un máximo de 24 horas en nuestros propios servidores y después se anonimita de forma irreversible; nunca se comparte con las plataformas de publicidad.`,
      `Datos de facturación — se conservan durante 6 años, conforme a la obligación establecida por la legislación fiscal española (Ley General Tributaria).`,
      `Mensajes de soporte — se conservan durante 24 meses desde la última respuesta.`,
    ],
  },
  {
    heading: "11. Sus derechos",
    paragraphs: [
      `En virtud del RGPD tiene derecho a:`,
      `Acceso — solicitar una copia de los datos personales que conservamos sobre usted.`,
      `Rectificación — corregir datos inexactos o incompletos.`,
      `Supresión («derecho al olvido») — solicitar la eliminación de sus datos; la atenderemos salvo que la conservación esté exigida por la ley.`,
      `Limitación — pausar el tratamiento mientras se investiga una reclamación.`,
      `Portabilidad — recibir sus datos en un formato estructurado y legible por máquina y transmitirlos a otro prestador.`,
      `Oposición — oponerse a un tratamiento basado en el interés legítimo, incluida la medición publicitaria (sección 6). Envíe un correo a ${OPERATOR_ES.contactEmail}.`,
      `Presentar una reclamación — presentarla ante la autoridad española de protección de datos, la Agencia Española de Protección de Datos (AEPD), en www.aepd.es.`,
      `Para ejercer cualquiera de estos derechos, envíe un correo a ${OPERATOR_ES.contactEmail}. Respondemos en un plazo de 30 días.`,
    ],
  },
  {
    heading: "12. Menores",
    paragraphs: [
      `El Servicio no está destinado a menores de 18 años. No recopilamos a sabiendas datos personales de menores. Si cree que un menor nos ha proporcionado datos, contáctenos y los eliminaremos.`,
    ],
  },
  {
    heading: "13. Seguridad",
    paragraphs: [
      `Aplicamos medidas técnicas y organizativas apropiadas al riesgo: TLS para todo el tráfico, cifrado en reposo, tokens de sesión hasheados, limitación de frecuencia, copias de seguridad automatizadas, acceso restringido al servidor y actualización periódica de dependencias. Ningún sistema es 100 % seguro; si tenemos conocimiento de una brecha de seguridad de datos personales que le afecte, le notificaremos a usted y a la AEPD dentro de las 72 horas, conforme al artículo 33 del RGPD.`,
    ],
  },
  {
    heading: "14. Cambios en esta política",
    paragraphs: [
      `Podemos actualizar esta Política de privacidad de vez en cuando. La fecha de «Última actualización» en la parte superior refleja la revisión más reciente. La utilización continuada del Servicio tras un cambio implica la aceptación.`,
    ],
  },
  {
    heading: "15. Contacto",
    paragraphs: [
      `Las preguntas, reclamaciones o solicitudes relativas a esta Política de privacidad pueden enviarse a ${OPERATOR_ES.contactEmail}. Respondemos en un plazo de 30 días.`,
    ],
  },
];

/** Cuerpo de las Condiciones del servicio. Versión equivalente en español de
 *  TERMS_SECTIONS. */
export const TERMS_TITLE_ES = "Condiciones del servicio";

export const TERMS_LAST_UPDATED_ES = "9 de noviembre de 2026";

export const TERMS_SECTIONS_ES: Section[] = [
  {
    paragraphs: [
      `Última actualización: ${TERMS_LAST_UPDATED_ES}`,
    ],
  },
  {
    heading: "Resumen",
    paragraphs: [
      `${OPERATOR_ES.brand} es una plataforma software como servicio (SaaS) que permite a los restaurantes crear menús QR digitales, aceptar pedidos, gestionar reservas de mesa, operar pantallas de cocina y de camareros y ver analítica (el «Servicio»). Se presta a través del sitio web en ${OPERATOR_ES.domain} y sus subdominios, y es operado por ${OPERATOR_ES.legalName}, ${OPERATOR_ES.status}, con domicilio fiscal en ${OPERATOR_ES.fiscalAddress} (NIF: ${OPERATOR_ES.taxId}) («${OPERATOR_ES.brand}», «nosotros», «nuestro»).`,
      `Al visitar nuestro sitio o utilizar el Servicio, usted acepta estas Condiciones del servicio («Condiciones»). Si no está de acuerdo con todas estas Condiciones, no utilice el sitio ni el Servicio.`,
      `Estas Condiciones se aplican a todos los visitantes y usuarios: restaurantes y su personal suscritos al Servicio («Establecimientos») y clientes finales que consultan menús, realizan pedidos o hacen reservas («Clientes»).`,
      `Si utiliza el Servicio como consumidor, nada en estas Condiciones limita ni excluye los derechos que tenga en virtud de la legislación imperativa de protección de consumidores que no pueda renunciarse por contrato.`,
    ],
  },
  {
    heading: "1. Requisitos y cuentas",
    paragraphs: [
      `Debe tener al menos 18 años (o la mayoría de edad en su jurisdicción) para registrar una cuenta. Al registrarse, confirma que la información que proporciona es exacta y que está facultado para comprometer a cualquier empresa por la que se inscriba.`,
      `Es responsable de salvaguardar el acceso a su cuenta y de cualquier actividad que tenga lugar en ella, incluida la actividad de los miembros de su personal a los que invite. Notifíquenos inmediatamente en ${OPERATOR_ES.contactEmail} si sospecha un acceso no autorizado.`,
    ],
  },
  {
    heading: "2. Uso aceptable",
    paragraphs: [
      `Usted se compromete a no utilizar el Servicio para ningún fin ilícito; a no cargar código malicioso, virus o contenido que sea ilegal, engañoso o infrinja derechos de terceros; a no intentar eludir los límites de frecuencia, los controles de seguridad, las cuotas o la facturación; y a no extraer sistemáticamente por medios automatizados datos del Servicio.`,
      `El incumplimiento de estas normas puede dar lugar a la suspensión o terminación inmediata de su cuenta.`,
    ],
  },
  {
    heading: "3. Prueba gratuita, suscripción y facturación",
    paragraphs: [
      `Prueba gratuita. Las cuentas nuevas reciben un período de prueba gratuito (actualmente 14 días) con acceso completo al Servicio. No se requiere tarjeta de pago para comenzar la prueba.`,
      `Precios modulares. Usted compone su propio plan: el menú QR digital es la base, y solo añade las funciones que necesita (como las reservas de mesa, la pantalla de cocina con toma de pedidos, o un dominio propio). El precio se calcula por restaurante, y se aplican automáticamente descuentos por volumen desde el segundo restaurante en la misma cuenta. El precio recurrente exacto, el intervalo de facturación y la moneda se le muestran siempre antes de confirmar la compra.`,
      `Facturación. Las suscripciones se facturan mensualmente o anualmente y se renuevan automáticamente hasta su cancelación. La facturación anual incluye un descuento frente a la mensual. Los pagos se procesan de forma segura por nuestro prestador de pagos (Stripe); nunca recibimos ni almacenamos los datos completos de su tarjeta. Cuando se haya acordado individualmente, podemos facturarle en su lugar con pago por transferencia bancaria.`,
      `Sin comisiones. No cobramos ninguna comisión ni porcentaje sobre los pedidos realizados a través del Servicio. Su único coste es la cuota de suscripción.`,
      `Cancelación. Puede cancelar en cualquier momento desde la configuración de su cuenta. La cancelación surte efectos al final del período de facturación en curso; el Servicio sigue disponible hasta entonces. No reembolsamos la parte no utilizada de un período de facturación, salvo que la legislación imperativa de protección de consumidores disponga lo contrario.`,
      `Pausa. Si su suscripción termina o vence, su menú público pasa a estar fuera de línea, pero sus datos — menú, fotos, historial de pedidos, reservas, configuración, estadísticas — se conservan íntegros. Volver a suscribirse recupera todo tal como estaba.`,
      `Cambios de precio. Podemos cambiar los precios con al menos 30 días de antelación; el nuevo precio se aplica a partir de su siguiente renovación. Si no está de acuerdo con un cambio de precio, puede cancelar antes de que surta efectos.`,
    ],
  },
  {
    heading: "4. Su contenido",
    paragraphs: [
      `Usted conserva la propiedad de todo el contenido que cargue en el Servicio (artículos del menú, fotos, detalles del restaurante, etc.). Al cargarlo, nos concede una licencia limitada y no exclusiva para alojar, almacenar, transmitir, mostrar y hacer copias de seguridad de ese contenido con el único fin de prestarle a usted y a sus Clientes el Servicio.`,
      `Usted es el único responsable de garantizar que su contenido es exacto, no infringe derechos de terceros y cumple la normativa aplicable en su jurisdicción sobre etiquetado alimentario, alérgenos, precios e información al consumidor.`,
    ],
  },
  {
    heading: "5. Funciones asistidas por IA",
    paragraphs: [
      `Algunas funciones del Servicio utilizan inteligencia artificial para ahorrarle tiempo — por ejemplo, importar un menú desde fotos y la traducción automática del contenido del menú a otros idiomas.`,
      `El resultado generado por IA puede contener errores u omisiones. Se ofrece como borrador para su revisión: usted es responsable de revisar y corregir el contenido importado o traducido — en particular los nombres de platos, los precios y la información de alérgenos — antes de publicarlo para los Clientes.`,
    ],
  },
  {
    heading: "6. Clientes (usuarios finales)",
    paragraphs: [
      `Los Clientes pueden consultar menús, realizar pedidos y solicitar reservas sin crear una cuenta. Cualquier pedido o reserva realizado a través del Servicio es una transacción entre el Cliente y el Establecimiento: el Establecimiento es el único responsable de aceptar, preparar y ejecutar los pedidos y reservas, de la calidad y seguridad de sus alimentos y del servicio, y de la exactitud de su menú, precios e información de alérgenos.`,
      `${OPERATOR_ES.brand} solo presta la plataforma de software y no es parte en ninguna transacción entre un Cliente y un Establecimiento.`,
    ],
  },
  {
    heading: "7. Datos, privacidad y alojamiento",
    paragraphs: [
      `Todos los datos del cliente — cuentas, contenido del menú, pedidos, reservas y analítica — se almacenan en nuestros propios servidores situados en la Unión Europea, bajo nuestro control directo. No utilizamos analítica ni rastreadores publicitarios de terceros en el Servicio.`,
      `Cuando los Clientes envían datos personales a un Establecimiento a través del Servicio (por ejemplo, al realizar un pedido o reservar una mesa), el Establecimiento es el responsable del tratamiento de esos datos y los tratamos en nombre del Establecimiento, únicamente para prestar el Servicio, de conformidad con nuestra Política de privacidad.`,
      `Para más detalles sobre cómo se tratan los datos personales y las cookies, consulte nuestra Política de privacidad y nuestra Política de cookies, que forman parte de estas Condiciones.`,
    ],
  },
  {
    heading: "8. Disponibilidad del servicio y modificaciones",
    paragraphs: [
      `Nos esforzamos por ofrecer una alta disponibilidad, pero no garantizamos un funcionamiento ininterrumpido y exento de errores. Podemos realizar mantenimiento programado, con aviso previo cuando sea posible.`,
      `Nos reservamos el derecho de modificar, suspender o dejar de ofrecer cualquier parte del Servicio en cualquier momento, con aviso razonable para los cambios sustanciales que afecten a funciones de pago.`,
    ],
  },
  {
    heading: "9. Propiedad intelectual",
    paragraphs: [
      `El nombre y el logotipo de ${OPERATOR_ES.brand}, el código, los diseños y cualquier otro material proporcionado a través del Servicio (excepto el contenido que usted cargue) son propiedad intelectual de ${OPERATOR_ES.legalName} y están protegidos por la legislación aplicable en materia de derechos de autor y marcas.`,
    ],
  },
  {
    heading: "10. Exclusión de garantías",
    paragraphs: [
      `El Servicio se presta «tal cual» y «según disponibilidad», sin garantías de ningún tipo, expresas o implícitas. No garantizamos que el Servicio sea ininterrumpido o exento de errores, ni que los defectos se corrigan. Usted utiliza el Servicio bajo su propio riesgo.`,
    ],
  },
  {
    heading: "11. Limitación de responsabilidad",
    paragraphs: [
      `En la máxima medida permitida por la ley, ${OPERATOR_ES.legalName} no será responsable de ningún daño indirecto, incidental, especial, consecuente o ejemplar, ni de beneficios perdidos, ingresos perdidos, datos perdidos o interrupción de la actividad que se deriven de o estén relacionados con el Servicio. La responsabilidad total por cualquier reclamación surgida de estas Condiciones se limita a la cantidad que haya pagado en los 12 meses anteriores a la reclamación, o a 100 EUR, lo que sea mayor.`,
      `Nada en estas Condiciones excluye ni limita una responsabilidad que no pueda excluirse o limitarse en virtud de la legislación aplicable, incluida la responsabilidad por dolo o culpa grave, ni los derechos legales de los consumidores.`,
    ],
  },
  {
    heading: "12. Indemnización",
    paragraphs: [
      `Usted acepta indemnizar y mantener indemne a ${OPERATOR_ES.legalName} frente a cualquier reclamación o requerimiento formulado por un tercero como consecuencia de su incumplimiento de estas Condiciones o de su violación de cualquier ley o derecho de terceros.`,
    ],
  },
  {
    heading: "13. Terminación",
    paragraphs: [
      `Cualquiera de las partes puede poner fin a este acuerdo en cualquier momento. Usted puede ponerlo fin cerrando su cuenta desde el panel. Nosotros podemos ponerlo fin de inmediato y sin previo aviso por incumplimiento de estas Condiciones, fraude presuntivo, abuso o actividad ilícita.`,
      `Al terminar, su derecho a acceder al Servicio cesa de inmediato. Conservaremos una copia de seguridad de sus datos durante un máximo de 30 días, transcurridos los cuales se suprimirá de forma permanente, salvo los registros que estemos obligados a conservar por ley (como los datos de facturación según la legislación fiscal española).`,
    ],
  },
  {
    heading: "14. Ley aplicable y jurisdicción",
    paragraphs: [
      `Estas Condiciones se rigen por el ordenamiento jurídico del Reino de España. Cualquier disputa derivada de estas Condiciones se someterá a los tribunales competentes de la ciudad de Oviedo, España.`,
      `Si es un consumidor residente en la Unión Europea, esta cláusula no le priva de la protección de las disposiciones imperativas de la legislación de su país de residencia, ni de su derecho a entablar o defender un procedimiento ante los tribunales de ese país.`,
    ],
  },
  {
    heading: "15. Cambios en estas Condiciones",
    paragraphs: [
      `Podemos actualizar estas Condiciones de vez en cuando. La versión más actual está siempre disponible en esta página. Los cambios sustanciales se comunicarán por correo electrónico o aviso en la aplicación, con al menos 30 días de antelación a su entrada en vigor. La utilización continuada del Servicio tras el cambio implica la aceptación de las Condiciones revisadas.`,
    ],
  },
  {
    heading: "16. Contacto",
    paragraphs: [
      `Las preguntas sobre estas Condiciones pueden enviarse a ${OPERATOR_ES.contactEmail}.`,
    ],
  },
];
