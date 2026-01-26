import type { FeatureId } from "./feature-data";

// SEO-optimized metadata for each feature
export const FEATURE_METADATA = {
  en: {
    "instant-setup": {
      title: "Instant QR Menu & Restaurant Website Setup | Create in 5 Minutes - IQ Rest",
      description: "Create your restaurant website and QR menu with just an email. Ready in 5 minutes, no technical skills needed. Instant setup for restaurants and cafes.",
    },
    "mobile-management": {
      title: "Mobile Restaurant Menu Management | Manage QR Menu from Phone - IQ Rest",
      description: "Manage your entire restaurant menu from your smartphone. Add dishes, update prices, upload photos - all from your mobile device. 100% mobile-friendly dashboard.",
    },
    "ai-translation": {
      title: "AI Menu Translation for Restaurants | Multilingual QR Menu - IQ Rest",
      description: "Translate your restaurant menu into 10+ languages with AI. Context-aware translation that understands food and culinary terms. Serve international customers.",
    },
    multilingual: {
      title: "Multilingual Restaurant Website | Multi-Language QR Menu - IQ Rest",
      description: "Create a multilingual website for your restaurant. Customers can switch languages with one tap. Perfect for tourist areas and international cities.",
    },
    "ai-images": {
      title: "AI Image Optimization for Restaurant Menu | Fast Loading Photos - IQ Rest",
      description: "Automatic image optimization for your restaurant menu. AI enhances and compresses photos for fast loading while maintaining quality. Beautiful dish photos.",
    },
    "easy-menu": {
      title: "Easy Restaurant Menu Management | Drag & Drop Menu Editor - IQ Rest",
      description: "Easily manage your restaurant menu with intuitive drag-and-drop. Add categories, create dishes, set prices - changes appear instantly on your QR menu.",
    },
    analytics: {
      title: "Restaurant Menu Analytics | QR Menu Statistics & Insights - IQ Rest",
      description: "Track your restaurant menu performance with detailed analytics. Daily views, language preferences, popular pages - make data-driven decisions.",
    },
    reservations: {
      title: "Online Table Reservations for Restaurants | Booking System - IQ Rest",
      description: "Accept online table bookings directly from your restaurant website. Automatic or manual confirmation, email notifications, table management.",
    },
    "custom-design": {
      title: "Video & Photo Backgrounds for Restaurant Website - IQ Rest",
      description: "Create stunning first impressions with video or photo backgrounds on your restaurant website. Upload ambiance videos or beautiful food photography.",
    },
    "color-scheme": {
      title: "Custom Color Scheme for Restaurant Website | Brand Colors - IQ Rest",
      description: "Match your restaurant brand with custom color schemes. Choose accent colors, automatic light/dark theme support. Professional branded menu.",
    },
    "personal-support": {
      title: "Personal Support for Restaurant QR Menu | Real Human Help - IQ Rest",
      description: "Get individual online support for your restaurant. Real people, not chatbots, help you with setup, optimization, and any questions.",
    },
  },
  es: {
    "instant-setup": {
      title: "Configuración Instantánea de Menú QR y Sitio Web de Restaurante | Crear en 5 Minutos - IQ Rest",
      description: "Crea tu sitio web de restaurante y menú QR solo con un email. Listo en 5 minutos, sin habilidades técnicas. Configuración instantánea para restaurantes y cafeterías.",
    },
    "mobile-management": {
      title: "Gestión de Menú de Restaurante Móvil | Administrar Menú QR desde Teléfono - IQ Rest",
      description: "Gestiona todo el menú de tu restaurante desde tu smartphone. Agrega platos, actualiza precios, sube fotos - todo desde tu dispositivo móvil.",
    },
    "ai-translation": {
      title: "Traducción de Menú con IA para Restaurantes | Menú QR Multilingüe - IQ Rest",
      description: "Traduce el menú de tu restaurante a más de 10 idiomas con IA. Traducción consciente del contexto que entiende términos gastronómicos.",
    },
    multilingual: {
      title: "Sitio Web de Restaurante Multilingüe | Menú QR Multi-Idioma - IQ Rest",
      description: "Crea un sitio web multilingüe para tu restaurante. Los clientes pueden cambiar de idioma con un toque. Perfecto para áreas turísticas.",
    },
    "ai-images": {
      title: "Optimización de Imágenes con IA para Menú de Restaurante - IQ Rest",
      description: "Optimización automática de imágenes para el menú de tu restaurante. IA mejora y comprime fotos para carga rápida manteniendo calidad.",
    },
    "easy-menu": {
      title: "Gestión Fácil de Menú de Restaurante | Editor Arrastrar y Soltar - IQ Rest",
      description: "Gestiona fácilmente el menú de tu restaurante con arrastrar y soltar intuitivo. Agrega categorías, crea platos, establece precios - cambios instantáneos.",
    },
    analytics: {
      title: "Análisis de Menú de Restaurante | Estadísticas e Información de Menú QR - IQ Rest",
      description: "Rastrea el rendimiento del menú de tu restaurante con análisis detallados. Vistas diarias, preferencias de idioma, páginas populares.",
    },
    reservations: {
      title: "Reservaciones de Mesa Online para Restaurantes | Sistema de Reservas - IQ Rest",
      description: "Acepta reservaciones de mesa online directamente desde tu sitio web de restaurante. Confirmación automática o manual, notificaciones por email.",
    },
    "custom-design": {
      title: "Fondos de Video y Foto para Sitio Web de Restaurante - IQ Rest",
      description: "Crea primeras impresiones impactantes con fondos de video o foto en tu sitio web de restaurante. Sube videos de ambiente o fotografía gastronómica.",
    },
    "color-scheme": {
      title: "Esquema de Colores Personalizado para Sitio Web de Restaurante - IQ Rest",
      description: "Combina la marca de tu restaurante con esquemas de colores personalizados. Elige colores de acento, soporte automático de tema claro/oscuro.",
    },
    "personal-support": {
      title: "Soporte Personal para Menú QR de Restaurante | Ayuda Humana Real - IQ Rest",
      description: "Obtén soporte online individual para tu restaurante. Personas reales, no chatbots, te ayudan con configuración, optimización y cualquier pregunta.",
    },
  },
} as const;

export function getFeatureMetadata(locale: string, featureId: FeatureId) {
  return (
    FEATURE_METADATA[locale as keyof typeof FEATURE_METADATA]?.[featureId] ||
    FEATURE_METADATA.en[featureId]
  );
}
