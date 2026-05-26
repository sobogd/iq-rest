import type { Metadata } from "next";
import { HomeTemplate } from "@/app/_landing/templates/home-template";
import { TEXTS } from "./texts";
import { homeAlternates } from "@/lib/hreflang";
import { SCHEMA_PRICE_BASIC_EUR } from "@/lib/pricing";

export const dynamic = "force-static";
export const revalidate = false;

const LOCALE = "fa";
const SITE = "https://iq-rest.com";

const HOME_HERO = {
  title: "هر چه رستوران شما نیاز دارد.",
  titleAccent: "در یک پلتفرم.",
  sub: "منو، دریافت سفارش، رزرو، نمایشگر آشپزخانه و ترجمه AI — یک پلتفرم به‌جای پنج سرویس جداگانه. برای دانستن بیشتر، یک ویژگی را در زیر انتخاب کنید.",
  imageAlt: "مهمان منوی QR را روی گوشی بر اساس آلرژن‌ها فیلتر می‌کند در حالی که مالک فهرست را از تبلت ویرایش می‌کند",
};

const FEATURE_IMAGES: Record<string, string> = {
  "منوی دیجیتال": "/landing/hero-cafe.webp",
  "سفارش‌ها": "/landing/feature-orders.webp",
  "رزرو": "/landing/feature-reservation.webp",
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
      learnMoreText="بیشتر بدانید"
    />
  );
}
