// Feature images configuration
export const FEATURE_IMAGES: Record<string, { src: string; alt: string }[]> = {
  reservations: [
    { src: "/samples/sample-reservation-1.webp", alt: "Restaurant table reservation form on mobile QR menu" },
    { src: "/samples/sample-reservation-2.webp", alt: "Online booking confirmation for restaurant table" },
    { src: "/samples/sample-reservation-3.webp", alt: "Guest reservation details in restaurant booking system" },
  ],
  "custom-design": [
    { src: "/samples/sample-background-1.webp", alt: "Restaurant QR menu with custom video background" },
    { src: "/samples/sample-background-2.webp", alt: "Digital menu with photo background for restaurant branding" },
  ],
  "color-scheme": [
    { src: "/samples/sample-red-color.webp", alt: "QR menu with red accent color scheme for restaurant" },
    { src: "/samples/sample-green-color.webp", alt: "Restaurant digital menu with green brand colors" },
    { src: "/samples/sample-blue-color.webp", alt: "Blue themed QR menu design for cafe" },
  ],
  "easy-menu": [
    { src: "/samples/sample-list-categories.webp", alt: "Restaurant menu category management dashboard" },
    { src: "/samples/sample-list-items.webp", alt: "Easy drag-and-drop menu item editor for restaurants" },
  ],
  multilingual: [
    { src: "/samples/sample-lang-settings.webp", alt: "Multilingual restaurant menu language settings" },
    { src: "/samples/sample-langs.webp", alt: "25+ language options for restaurant QR menu" },
  ],
  "ai-translation": [
    { src: "/samples/sample-edit-table.webp", alt: "AI translation for restaurant table descriptions" },
    { src: "/samples/sample-edit-item.webp", alt: "Automatic menu item translation with AI" },
    { src: "/samples/sample-edit-category.webp", alt: "AI-powered category translation for digital menu" },
  ],
  "mobile-management": [
    { src: "/samples/sample-analytics-1.webp", alt: "Restaurant menu analytics on mobile phone" },
    { src: "/samples/sample-design-settings.webp", alt: "Mobile-friendly menu design settings" },
    { src: "/samples/sample-qr-settings.webp", alt: "QR code customization from smartphone" },
  ],
};

// FAQ data for each feature
export const FEATURE_FAQ: Record<string, { en: { q: string; a: string }[]; es: { q: string; a: string }[] }> = {
  reservations: {
    en: [
      { q: "How do customers make reservations?", a: "Customers can book directly from your restaurant website. They select date, time, and number of guests, then receive an email confirmation." },
      { q: "Can I approve reservations manually?", a: "Yes, you can choose between automatic confirmation or manual approval for each booking." },
      { q: "Will I get notified of new bookings?", a: "Yes, you receive email notifications for every new reservation." },
    ],
    es: [
      { q: "¿Cómo hacen las reservaciones los clientes?", a: "Los clientes pueden reservar directamente desde tu sitio web. Seleccionan fecha, hora y número de invitados, luego reciben confirmación por email." },
      { q: "¿Puedo aprobar reservaciones manualmente?", a: "Sí, puedes elegir entre confirmación automática o aprobación manual para cada reserva." },
      { q: "¿Recibiré notificaciones de nuevas reservas?", a: "Sí, recibes notificaciones por email de cada nueva reservación." },
    ],
  },
  "custom-design": {
    en: [
      { q: "What video formats are supported?", a: "MP4 and WebM formats are supported. Videos are optimized automatically for fast loading." },
      { q: "Can I use my own photos?", a: "Yes, upload any photo and it will be automatically optimized for web display." },
      { q: "Does video slow down the menu?", a: "No, videos are compressed and lazy-loaded to ensure fast page performance." },
    ],
    es: [
      { q: "¿Qué formatos de video se soportan?", a: "Se soportan formatos MP4 y WebM. Los videos se optimizan automáticamente para carga rápida." },
      { q: "¿Puedo usar mis propias fotos?", a: "Sí, sube cualquier foto y se optimizará automáticamente para visualización web." },
      { q: "¿El video ralentiza el menú?", a: "No, los videos se comprimen y cargan de forma diferida para asegurar rendimiento rápido." },
    ],
  },
  "color-scheme": {
    en: [
      { q: "How many colors can I choose from?", a: "Choose from 12 preset colors or enter your exact brand color using a hex code." },
      { q: "Does it support dark mode?", a: "Yes, your color scheme automatically adapts to both light and dark themes." },
      { q: "Can I change colors anytime?", a: "Yes, change your accent color instantly from the dashboard - updates appear immediately." },
    ],
    es: [
      { q: "¿De cuántos colores puedo elegir?", a: "Elige entre 12 colores preestablecidos o ingresa el color exacto de tu marca usando código hex." },
      { q: "¿Soporta modo oscuro?", a: "Sí, tu esquema de colores se adapta automáticamente a temas claro y oscuro." },
      { q: "¿Puedo cambiar colores en cualquier momento?", a: "Sí, cambia tu color de acento instantáneamente desde el panel - las actualizaciones aparecen inmediatamente." },
    ],
  },
  "easy-menu": {
    en: [
      { q: "How do I add a new dish?", a: "Tap 'Add Item', enter name, description, price, and optionally upload a photo. That's it!" },
      { q: "Can I reorder menu items?", a: "Yes, simply drag and drop items or categories to reorder them." },
      { q: "What if a dish is sold out?", a: "Toggle the item off temporarily - it disappears from the menu but isn't deleted." },
    ],
    es: [
      { q: "¿Cómo agrego un nuevo plato?", a: "Toca 'Agregar Artículo', ingresa nombre, descripción, precio y opcionalmente sube una foto. ¡Eso es todo!" },
      { q: "¿Puedo reordenar los artículos del menú?", a: "Sí, simplemente arrastra y suelta artículos o categorías para reordenarlos." },
      { q: "¿Qué pasa si un plato se agota?", a: "Desactiva el artículo temporalmente - desaparece del menú pero no se elimina." },
    ],
  },
  multilingual: {
    en: [
      { q: "How many languages are supported?", a: "25+ languages including all major European languages, Chinese, Japanese, Korean, Arabic, and Hebrew." },
      { q: "How do customers switch languages?", a: "A language selector appears on your menu - one tap to switch to any available language." },
      { q: "Is the translation automatic?", a: "You can use AI translation or manually enter translations for each language." },
    ],
    es: [
      { q: "¿Cuántos idiomas se soportan?", a: "Más de 25 idiomas incluyendo todos los principales idiomas europeos, chino, japonés, coreano, árabe y hebreo." },
      { q: "¿Cómo cambian de idioma los clientes?", a: "Un selector de idioma aparece en tu menú - un toque para cambiar a cualquier idioma disponible." },
      { q: "¿La traducción es automática?", a: "Puedes usar traducción IA o ingresar traducciones manualmente para cada idioma." },
    ],
  },
  "ai-translation": {
    en: [
      { q: "How accurate is AI translation?", a: "Our AI understands culinary context, preserving dish names and translating descriptions naturally." },
      { q: "How fast is the translation?", a: "Entire menus are translated in seconds, not hours." },
      { q: "Can I edit AI translations?", a: "Yes, all translations are editable - review and adjust as needed." },
    ],
    es: [
      { q: "¿Qué tan precisa es la traducción IA?", a: "Nuestra IA entiende el contexto culinario, preservando nombres de platos y traduciendo descripciones naturalmente." },
      { q: "¿Qué tan rápida es la traducción?", a: "Menús completos se traducen en segundos, no en horas." },
      { q: "¿Puedo editar las traducciones IA?", a: "Sí, todas las traducciones son editables - revisa y ajusta según sea necesario." },
    ],
  },
  "mobile-management": {
    en: [
      { q: "Do I need to install an app?", a: "No app needed - everything works in your phone's browser." },
      { q: "Can I upload photos from my phone?", a: "Yes, take photos with your camera and upload directly to your menu." },
      { q: "Does it work on tablets?", a: "Yes, the dashboard is optimized for phones, tablets, and desktop computers." },
    ],
    es: [
      { q: "¿Necesito instalar una app?", a: "No se necesita app - todo funciona en el navegador de tu teléfono." },
      { q: "¿Puedo subir fotos desde mi teléfono?", a: "Sí, toma fotos con tu cámara y súbelas directamente a tu menú." },
      { q: "¿Funciona en tablets?", a: "Sí, el panel está optimizado para teléfonos, tablets y computadoras de escritorio." },
    ],
  },
  "instant-setup": {
    en: [
      { q: "What do I need to get started?", a: "Just your email address. No credit card, no complex forms." },
      { q: "How long does setup take?", a: "Your website is ready instantly. Add your menu items and you're live in 5 minutes." },
      { q: "Is there a free plan?", a: "Yes, start free with all essential features included." },
    ],
    es: [
      { q: "¿Qué necesito para empezar?", a: "Solo tu dirección de email. Sin tarjeta de crédito, sin formularios complejos." },
      { q: "¿Cuánto tiempo toma la configuración?", a: "Tu sitio web está listo instantáneamente. Agrega tus artículos del menú y estarás en vivo en 5 minutos." },
      { q: "¿Hay un plan gratuito?", a: "Sí, comienza gratis con todas las funciones esenciales incluidas." },
    ],
  },
  "ai-images": {
    en: [
      { q: "What image formats are supported?", a: "Upload JPG, PNG, or WebP - images are automatically optimized." },
      { q: "Does optimization reduce quality?", a: "No, our AI maintains visual quality while reducing file size for fast loading." },
      { q: "Is there a file size limit?", a: "Upload images up to 10MB - they'll be optimized automatically." },
    ],
    es: [
      { q: "¿Qué formatos de imagen se soportan?", a: "Sube JPG, PNG o WebP - las imágenes se optimizan automáticamente." },
      { q: "¿La optimización reduce la calidad?", a: "No, nuestra IA mantiene la calidad visual mientras reduce el tamaño del archivo para carga rápida." },
      { q: "¿Hay límite de tamaño de archivo?", a: "Sube imágenes hasta 10MB - se optimizarán automáticamente." },
    ],
  },
  analytics: {
    en: [
      { q: "What metrics can I track?", a: "Daily views, page performance, language preferences, and trends over time." },
      { q: "How often is data updated?", a: "Analytics are updated in real-time - see today's visitors as they happen." },
      { q: "Can I export analytics data?", a: "View detailed reports directly in your dashboard." },
    ],
    es: [
      { q: "¿Qué métricas puedo rastrear?", a: "Vistas diarias, rendimiento de páginas, preferencias de idioma y tendencias en el tiempo." },
      { q: "¿Con qué frecuencia se actualizan los datos?", a: "Los análisis se actualizan en tiempo real - ve los visitantes de hoy mientras suceden." },
      { q: "¿Puedo exportar datos de análisis?", a: "Ve reportes detallados directamente en tu panel." },
    ],
  },
  "personal-support": {
    en: [
      { q: "How do I contact support?", a: "Use the contact form or email us directly - real humans respond, not bots." },
      { q: "What's the response time?", a: "We typically respond within a few hours during business days." },
      { q: "Is support available for free plans?", a: "Yes, personal support is available for all plans including free." },
    ],
    es: [
      { q: "¿Cómo contacto al soporte?", a: "Usa el formulario de contacto o envíanos email directamente - personas reales responden, no bots." },
      { q: "¿Cuál es el tiempo de respuesta?", a: "Típicamente respondemos en unas pocas horas durante días hábiles." },
      { q: "¿El soporte está disponible para planes gratuitos?", a: "Sí, el soporte personal está disponible para todos los planes incluyendo gratuito." },
    ],
  },
};

// Valid feature IDs
export const VALID_FEATURE_IDS = [
  "instant-setup",
  "mobile-management",
  "ai-translation",
  "multilingual",
  "ai-images",
  "easy-menu",
  "analytics",
  "reservations",
  "custom-design",
  "color-scheme",
  "personal-support",
] as const;

export type FeatureId = (typeof VALID_FEATURE_IDS)[number];
