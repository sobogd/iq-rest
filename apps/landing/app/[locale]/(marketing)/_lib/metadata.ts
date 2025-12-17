import type { Metadata } from "next";

const BASE_URL = "https://grandqr.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

type LocaleKey = "en" | "es";

interface PageMetaConfig {
  titles: Record<LocaleKey, string>;
  descriptions: Record<LocaleKey, string>;
  path: string;
}

export function generatePageMetadata(
  locale: string,
  config: PageMetaConfig
): Metadata {
  const localeKey = (locale as LocaleKey) || "en";
  const title = config.titles[localeKey] || config.titles.en;
  const description = config.descriptions[localeKey] || config.descriptions.en;
  const url = `${BASE_URL}/${locale}${config.path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${BASE_URL}/en${config.path}`,
        es: `${BASE_URL}/es${config.path}`,
        "x-default": `${BASE_URL}/en${config.path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "GrandQR",
      locale,
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "GrandQR - QR Menu for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export const homeMetaConfig: PageMetaConfig = {
  titles: {
    en: "QR Menu & Restaurant Website in 5 Minutes | Free Digital Menu Creator - GrandQR",
    es: "Menú QR y Sitio Web de Restaurante en 5 Minutos | Creador de Menú Digital Gratis - GrandQR",
  },
  descriptions: {
    en: "Create QR menu and restaurant website with just your email. Instant setup, mobile-friendly management, AI translations, daily analytics. Perfect for restaurants and cafes. Start free today.",
    es: "Crea menú QR y sitio web de restaurante solo con tu email. Configuración instantánea, gestión móvil, traducciones IA, análisis diarios. Perfecto para restaurantes y cafeterías. Comienza gratis hoy.",
  },
  path: "",
};

export const pricingMetaConfig: PageMetaConfig = {
  titles: {
    en: "Pricing - GrandQR",
    es: "Precios - GrandQR",
  },
  descriptions: {
    en: "Choose the right plan for your restaurant. Free, Basic, and Pro plans available with multilingual menus, analytics, and more.",
    es: "Elige el plan adecuado para tu restaurante. Planes Free, Basic y Pro disponibles con menús multilingües, análisis y más.",
  },
  path: "/pricing",
};

export const featuresMetaConfig: PageMetaConfig = {
  titles: {
    en: "Features - GrandQR",
    es: "Características - GrandQR",
  },
  descriptions: {
    en: "Discover all features of GrandQR: AI translation, analytics, modern design, and more for your digital menu.",
    es: "Descubre todas las características de GrandQR: traducción IA, análisis, diseño moderno y más para tu menú digital.",
  },
  path: "/features",
};

export const contactsMetaConfig: PageMetaConfig = {
  titles: {
    en: "Contact Us - GrandQR",
    es: "Contáctanos - GrandQR",
  },
  descriptions: {
    en: "Get in touch with the GrandQR team. We're here to help with your digital menu needs.",
    es: "Ponte en contacto con el equipo de GrandQR. Estamos aquí para ayudarte con tus necesidades de menú digital.",
  },
  path: "/contacts",
};

export const faqMetaConfig: PageMetaConfig = {
  titles: {
    en: "FAQ - GrandQR",
    es: "Preguntas Frecuentes - GrandQR",
  },
  descriptions: {
    en: "Find answers to frequently asked questions about GrandQR digital menu solution.",
    es: "Encuentra respuestas a las preguntas frecuentes sobre la solución de menú digital GrandQR.",
  },
  path: "/faq",
};

export const changelogMetaConfig: PageMetaConfig = {
  titles: {
    en: "Changelog - GrandQR",
    es: "Historial de Cambios - GrandQR",
  },
  descriptions: {
    en: "See what's new in GrandQR. Latest updates, features, and improvements.",
    es: "Mira las novedades en GrandQR. Últimas actualizaciones, características y mejoras.",
  },
  path: "/changelog",
};

export const getStartedMetaConfig: PageMetaConfig = {
  titles: {
    en: "Get Started - GrandQR",
    es: "Comenzar - GrandQR",
  },
  descriptions: {
    en: "Create your digital QR menu in minutes. Sign up for free and start building your restaurant menu.",
    es: "Crea tu menú QR digital en minutos. Regístrate gratis y comienza a construir el menú de tu restaurante.",
  },
  path: "/get-started",
};
