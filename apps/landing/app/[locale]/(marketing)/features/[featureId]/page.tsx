import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import {
  Zap,
  Smartphone,
  Languages,
  Globe,
  ImageIcon,
  LayoutList,
  BarChart3,
  CalendarCheck,
  Video,
  Palette,
  HeadphonesIcon,
  ArrowLeft,
  Check,
  ChevronDown,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "../../_components";
import { JsonLd } from "../../_lib";
import Image from "next/image";

const FEATURE_ICONS = {
  "instant-setup": Zap,
  "mobile-management": Smartphone,
  "ai-translation": Languages,
  multilingual: Globe,
  "ai-images": ImageIcon,
  "easy-menu": LayoutList,
  analytics: BarChart3,
  reservations: CalendarCheck,
  "custom-design": Video,
  "color-scheme": Palette,
  "personal-support": HeadphonesIcon,
} as const;

const VALID_FEATURE_IDS = [
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

type FeatureId = (typeof VALID_FEATURE_IDS)[number];

// Feature images configuration
const FEATURE_IMAGES: Record<string, { src: string; alt: string }[]> = {
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
const FEATURE_FAQ: Record<string, { en: { q: string; a: string }[]; es: { q: string; a: string }[] }> = {
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

// SEO-optimized metadata for each feature
const METADATA_MAP = {
  en: {
    "instant-setup": {
      title: "Instant QR Menu & Restaurant Website Setup | Create in 5 Minutes - SobogdQR",
      description: "Create your restaurant website and QR menu with just an email. Ready in 5 minutes, no technical skills needed. Instant setup for restaurants and cafes.",
      keywords: "qr menu setup, restaurant website creator, instant qr menu, create restaurant website, qr code menu generator",
    },
    "mobile-management": {
      title: "Mobile Restaurant Menu Management | Manage QR Menu from Phone - SobogdQR",
      description: "Manage your entire restaurant menu from your smartphone. Add dishes, update prices, upload photos - all from your mobile device. 100% mobile-friendly dashboard.",
      keywords: "mobile menu management, restaurant app, manage menu from phone, mobile qr menu, restaurant dashboard mobile",
    },
    "ai-translation": {
      title: "AI Menu Translation for Restaurants | Multilingual QR Menu - SobogdQR",
      description: "Translate your restaurant menu into 10+ languages with AI. Context-aware translation that understands food and culinary terms. Serve international customers.",
      keywords: "ai menu translation, multilingual restaurant menu, translate menu, restaurant translation, qr menu languages",
    },
    multilingual: {
      title: "Multilingual Restaurant Website | Multi-Language QR Menu - SobogdQR",
      description: "Create a multilingual website for your restaurant. Customers can switch languages with one tap. Perfect for tourist areas and international cities.",
      keywords: "multilingual restaurant website, multi-language menu, international restaurant, tourist menu, language selector",
    },
    "ai-images": {
      title: "AI Image Optimization for Restaurant Menu | Fast Loading Photos - SobogdQR",
      description: "Automatic image optimization for your restaurant menu. AI enhances and compresses photos for fast loading while maintaining quality. Beautiful dish photos.",
      keywords: "restaurant image optimization, menu photo enhancement, fast loading menu, webp conversion, dish photography",
    },
    "easy-menu": {
      title: "Easy Restaurant Menu Management | Drag & Drop Menu Editor - SobogdQR",
      description: "Easily manage your restaurant menu with intuitive drag-and-drop. Add categories, create dishes, set prices - changes appear instantly on your QR menu.",
      keywords: "easy menu management, drag drop menu, restaurant menu editor, menu builder, category management",
    },
    analytics: {
      title: "Restaurant Menu Analytics | QR Menu Statistics & Insights - SobogdQR",
      description: "Track your restaurant menu performance with detailed analytics. Daily views, language preferences, popular pages - make data-driven decisions.",
      keywords: "restaurant analytics, menu statistics, qr menu tracking, customer insights, menu performance",
    },
    reservations: {
      title: "Online Table Reservations for Restaurants | Booking System - SobogdQR",
      description: "Accept online table bookings directly from your restaurant website. Automatic or manual confirmation, email notifications, table management.",
      keywords: "restaurant reservations, online booking, table reservation system, restaurant booking, cafe reservations",
    },
    "custom-design": {
      title: "Video & Photo Backgrounds for Restaurant Website - SobogdQR",
      description: "Create stunning first impressions with video or photo backgrounds on your restaurant website. Upload ambiance videos or beautiful food photography.",
      keywords: "restaurant video background, menu design, custom restaurant website, photo background, visual menu",
    },
    "color-scheme": {
      title: "Custom Color Scheme for Restaurant Website | Brand Colors - SobogdQR",
      description: "Match your restaurant brand with custom color schemes. Choose accent colors, automatic light/dark theme support. Professional branded menu.",
      keywords: "restaurant branding, custom colors, brand identity, theme customization, restaurant design",
    },
    "personal-support": {
      title: "Personal Support for Restaurant QR Menu | Real Human Help - SobogdQR",
      description: "Get individual online support for your restaurant. Real people, not chatbots, help you with setup, optimization, and any questions.",
      keywords: "restaurant support, qr menu help, personal assistance, customer service, setup help",
    },
  },
  es: {
    "instant-setup": {
      title: "Configuración Instantánea de Menú QR y Sitio Web de Restaurante | Crear en 5 Minutos - SobogdQR",
      description: "Crea tu sitio web de restaurante y menú QR solo con un email. Listo en 5 minutos, sin habilidades técnicas. Configuración instantánea para restaurantes y cafeterías.",
      keywords: "configurar menú qr, creador sitio web restaurante, menú qr instantáneo, crear sitio web restaurante",
    },
    "mobile-management": {
      title: "Gestión de Menú de Restaurante Móvil | Administrar Menú QR desde Teléfono - SobogdQR",
      description: "Gestiona todo el menú de tu restaurante desde tu smartphone. Agrega platos, actualiza precios, sube fotos - todo desde tu dispositivo móvil.",
      keywords: "gestión menú móvil, app restaurante, administrar menú desde teléfono, menú qr móvil",
    },
    "ai-translation": {
      title: "Traducción de Menú con IA para Restaurantes | Menú QR Multilingüe - SobogdQR",
      description: "Traduce el menú de tu restaurante a más de 10 idiomas con IA. Traducción consciente del contexto que entiende términos gastronómicos.",
      keywords: "traducción menú ia, menú restaurante multilingüe, traducir menú, traducción restaurante",
    },
    multilingual: {
      title: "Sitio Web de Restaurante Multilingüe | Menú QR Multi-Idioma - SobogdQR",
      description: "Crea un sitio web multilingüe para tu restaurante. Los clientes pueden cambiar de idioma con un toque. Perfecto para áreas turísticas.",
      keywords: "sitio web restaurante multilingüe, menú multi-idioma, restaurante internacional, menú turístico",
    },
    "ai-images": {
      title: "Optimización de Imágenes con IA para Menú de Restaurante - SobogdQR",
      description: "Optimización automática de imágenes para el menú de tu restaurante. IA mejora y comprime fotos para carga rápida manteniendo calidad.",
      keywords: "optimización imágenes restaurante, mejora fotos menú, menú carga rápida, fotografía platos",
    },
    "easy-menu": {
      title: "Gestión Fácil de Menú de Restaurante | Editor Arrastrar y Soltar - SobogdQR",
      description: "Gestiona fácilmente el menú de tu restaurante con arrastrar y soltar intuitivo. Agrega categorías, crea platos, establece precios - cambios instantáneos.",
      keywords: "gestión menú fácil, arrastrar soltar menú, editor menú restaurante, constructor menú",
    },
    analytics: {
      title: "Análisis de Menú de Restaurante | Estadísticas e Información de Menú QR - SobogdQR",
      description: "Rastrea el rendimiento del menú de tu restaurante con análisis detallados. Vistas diarias, preferencias de idioma, páginas populares.",
      keywords: "análisis restaurante, estadísticas menú, seguimiento menú qr, información clientes",
    },
    reservations: {
      title: "Reservaciones de Mesa Online para Restaurantes | Sistema de Reservas - SobogdQR",
      description: "Acepta reservaciones de mesa online directamente desde tu sitio web de restaurante. Confirmación automática o manual, notificaciones por email.",
      keywords: "reservaciones restaurante, reserva online, sistema reservación mesas, reservas cafetería",
    },
    "custom-design": {
      title: "Fondos de Video y Foto para Sitio Web de Restaurante - SobogdQR",
      description: "Crea primeras impresiones impactantes con fondos de video o foto en tu sitio web de restaurante. Sube videos de ambiente o fotografía gastronómica.",
      keywords: "fondo video restaurante, diseño menú, sitio web restaurante personalizado, fondo foto",
    },
    "color-scheme": {
      title: "Esquema de Colores Personalizado para Sitio Web de Restaurante - SobogdQR",
      description: "Combina la marca de tu restaurante con esquemas de colores personalizados. Elige colores de acento, soporte automático de tema claro/oscuro.",
      keywords: "marca restaurante, colores personalizados, identidad de marca, personalización tema",
    },
    "personal-support": {
      title: "Soporte Personal para Menú QR de Restaurante | Ayuda Humana Real - SobogdQR",
      description: "Obtén soporte online individual para tu restaurante. Personas reales, no chatbots, te ayudan con configuración, optimización y cualquier pregunta.",
      keywords: "soporte restaurante, ayuda menú qr, asistencia personal, servicio al cliente",
    },
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; featureId: string }>;
}): Promise<Metadata> {
  const { locale, featureId } = await params;

  if (!VALID_FEATURE_IDS.includes(featureId as FeatureId)) {
    return {};
  }

  const metadata =
    METADATA_MAP[locale as keyof typeof METADATA_MAP]?.[featureId as FeatureId] ||
    METADATA_MAP.en[featureId as FeatureId];

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `https://sobogdqr.com/${locale}/features/${featureId}`,
      languages: {
        en: `https://sobogdqr.com/en/features/${featureId}`,
        es: `https://sobogdqr.com/es/features/${featureId}`,
        "x-default": `https://sobogdqr.com/en/features/${featureId}`,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://sobogdqr.com/${locale}/features/${featureId}`,
      siteName: "SobogdQR",
      locale,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return VALID_FEATURE_IDS.map((featureId) => ({ featureId }));
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ locale: string; featureId: string }>;
}) {
  const { locale, featureId } = await params;

  if (!VALID_FEATURE_IDS.includes(featureId as FeatureId)) {
    notFound();
  }

  const t = await getTranslations("features");
  const tContacts = await getTranslations("contacts");
  const features = t.raw("list") as Array<{
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    shortDescription: string;
    benefits: string[];
    image: string;
    imageAlt: string;
    cta: string;
  }>;

  const feature = features.find((f) => f.id === featureId);

  if (!feature) {
    notFound();
  }

  const Icon = FEATURE_ICONS[featureId as FeatureId];
  const featureImages = FEATURE_IMAGES[featureId] || [];
  const faq = FEATURE_FAQ[featureId]?.[locale as "en" | "es"] || FEATURE_FAQ[featureId]?.en || [];

  const featureJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: feature.title,
    description: feature.description,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  const faqJsonLd = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } : null;

  return (
    <>
      <JsonLd data={featureJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {locale === "es" ? "Volver al Inicio" : "Back to Home"}
              </Link>
            </Button>
          </div>

          {/* Hero section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {feature.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {feature.description}
            </p>
          </div>

          {/* Feature images - vertical phone screenshots */}
          {featureImages.length > 0 && (
            <div className="mb-12">
              <div className={`grid gap-6 ${
                featureImages.length === 2
                  ? "grid-cols-2 max-w-md mx-auto"
                  : featureImages.length === 3
                    ? "grid-cols-3 max-w-2xl mx-auto"
                    : "grid-cols-1 max-w-xs mx-auto"
              }`}>
                {featureImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={280}
                      height={560}
                      className="w-full h-auto"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          <Card className="mb-12">
            <CardContent className="p-6 md:p-8">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {feature.fullDescription}
              </p>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">
                {locale === "es" ? "Beneficios Clave" : "Key Benefits"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-base md:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          {faq.length > 0 && (
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {locale === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faq.map((item, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center justify-between cursor-pointer list-none p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <span className="font-medium">{item.q}</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-4 py-3 text-muted-foreground">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="mb-16 border-primary/50 bg-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("readyTitle")}</CardTitle>
              <CardDescription className="text-base">
                {t("readyDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/dashboard">{t("getStarted")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">{t("viewPricing")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{tContacts("title")}</h2>
              <p className="text-lg text-muted-foreground">
                {tContacts("subtitle")}
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
