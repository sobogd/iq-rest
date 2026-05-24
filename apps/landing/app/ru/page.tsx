import type { Metadata } from "next";
import { HomeTemplate } from "@/app/_landing/templates/home-template";
import { TEXTS } from "./texts";
import { homeAlternates } from "@/lib/hreflang";
import { SCHEMA_PRICE_BASIC_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ru";
const SITE = "https://iq-rest.com";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "IQ Rest",
      url: SITE,
      logo: `${SITE}/logo.png`,
    },
    {
      "@type": "WebSite",
      url: `${SITE}/${LOCALE}`,
      name: "IQ Rest",
      inLanguage: LOCALE,
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "IQ Rest — Платформа управления рестораном",
      description: "Платформа управления рестораном: цифровое меню, QR-заказы, бронирование столов и кухонный дисплей. Запуск за 5 минут.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      url: `${SITE}/${LOCALE}`,
      inLanguage: LOCALE,
      publisher: { "@id": `${SITE}/#organization` },
      offers: {
        "@type": "Offer",
        price: SCHEMA_PRICE_BASIC_EUR,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
    },
  ],
}).replace(/</g, "\\u003c");

const HOME_HERO = {
  title: "Всё для вашего ресторана.",
  titleAccent: "В одной платформе.",
  sub: "Меню, приём заказов, бронирование, кухонный дисплей и AI-перевод — единая платформа вместо пяти разных сервисов. Выберите интересующую возможность ниже, чтобы узнать подробнее.",
};

const FEATURE_IMAGES: Record<string, string> = {
  "Цифровое меню": "/landing/hero-cafe.webp",
  "Приём заказов": "/landing/feature-orders.webp",
  "Бронирование": "/landing/feature-reservation.webp",
  "KDS": "/landing/feature-kitchen.webp",
  "QR-меню": "/samples/sample-qr-settings.webp",
  "AI-перевод": "/landing/feature-multilang.webp",
  "AI-фото": "/landing/burrata.webp",
  "Мобильное управление": "/landing/feature-mobile.webp",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://iq-rest.com"),
  title: TEXTS.meta.title,
  description: TEXTS.meta.description,
  alternates: { canonical: TEXTS.meta.canonical, languages: homeAlternates() },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    url: TEXTS.meta.canonical,
    siteName: "IQ Rest",
    locale: TEXTS.meta.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IQ Rest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TEXTS.meta.ogTitle,
    description: TEXTS.meta.ogDescription,
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  return (
    <HomeTemplate
      locale={LOCALE}
      texts={TEXTS}
      hero={HOME_HERO}
      featureImages={FEATURE_IMAGES}
      jsonLd={JSON_LD}
      learnMoreText="Подробнее"
    />
  );
}
