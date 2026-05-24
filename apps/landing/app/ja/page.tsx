import type { Metadata } from "next";
import { HomeTemplate } from "@/app/_landing/templates/home-template";
import { TEXTS } from "./texts";
import { homeAlternates } from "@/lib/hreflang";
import { SCHEMA_PRICE_BASIC_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "ja";
const SITE = "https://iq-rest.com";

const HOME_HERO = {
  title: "レストランに必要なものすべて。",
  titleAccent: "1つのプラットフォームで。",
  sub: "メニュー、注文受付、予約、キッチンディスプレイ、AI翻訳 — 5つの別々のサービスの代わりに1つのプラットフォーム。詳細については下記の機能をお選びください。",
};

const FEATURE_IMAGES: Record<string, string> = {
  "デジタルメニュー": "/landing/hero-cafe.webp",
  "注文": "/landing/feature-orders.webp",
  "予約": "/landing/feature-reservation.webp",
  "KDS": "/landing/feature-kitchen.webp",
};

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${SITE}/#organization`, name: "IQ Rest", url: SITE, logo: `${SITE}/logo.png` },
    { "@type": "WebSite", url: `${SITE}/${LOCALE}`, name: "IQ Rest", inLanguage: LOCALE, publisher: { "@id": `${SITE}/#organization` } },
    {
      "@type": "SoftwareApplication",
      name: "IQ Rest — Restaurant management platform",
      description: "Restaurant management platform: digital menu, QR ordering, table booking and kitchen display. Launch in 5 minutes.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      url: `${SITE}/${LOCALE}`,
      inLanguage: LOCALE,
      publisher: { "@id": `${SITE}/#organization` },
      offers: { "@type": "Offer", price: SCHEMA_PRICE_BASIC_EUR, priceCurrency: "EUR", availability: "https://schema.org/InStock" },
    },
  ],
}).replace(/</g, "\\u003c");

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
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
  twitter: { card: "summary_large_image", title: TEXTS.meta.ogTitle, description: TEXTS.meta.ogDescription, images: ["/og-image.png"] },
};

export default function HomePage() {
  return (
    <HomeTemplate
      locale={LOCALE}
      texts={TEXTS}
      hero={HOME_HERO}
      featureImages={FEATURE_IMAGES}
      jsonLd={JSON_LD}
      learnMoreText="詳細を見る"
    />
  );
}
