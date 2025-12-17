import { getTranslations } from "next-intl/server";
import { PricingCards, CtaSection } from "../_components";
import { JsonLd, createBreadcrumbSchema } from "../_lib";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "QR Menu & Website for Restaurant or Cafe | Pricing from €0 - GrandQR",
    es: "Menú QR y Sitio Web para Restaurante o Cafetería | Precios desde €0 - GrandQR",
  };

  const descriptions = {
    en: "Create a QR menu and website for your restaurant or cafe. Free plan with 300 scans/month. Digital menu with AI translations, analytics, and instant updates. Start free today!",
    es: "Crea un menú QR y sitio web para tu restaurante o cafetería. Plan gratuito con 300 escaneos/mes. Menú digital con traducciones IA, analíticas y actualizaciones instantáneas. ¡Comienza gratis hoy!",
  };

  const keywords = {
    en: "QR menu, restaurant website, cafe website, digital menu, QR code menu, restaurant QR menu, cafe QR menu, menu website, free QR menu, restaurant menu online",
    es: "menú QR, sitio web restaurante, sitio web cafetería, menú digital, menú código QR, menú QR restaurante, menú QR cafetería, sitio web menú, menú QR gratis, menú restaurante online",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords[locale as keyof typeof keywords] || keywords.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://grandqr.com/${locale}/pricing`,
      languages: {
        en: "https://grandqr.com/en/pricing",
        es: "https://grandqr.com/es/pricing",
        "x-default": "https://grandqr.com/en/pricing",
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: "website",
      url: `https://grandqr.com/${locale}/pricing`,
      images: [
        {
          url: "https://grandqr.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "GrandQR - QR Menu for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ["https://grandqr.com/og-image.png"],
    },
  };
}

const merchantReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "WorldWide",
  returnPolicyCategory:
    "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
};

const shippingDetails = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "EUR",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "WorldWide",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 1,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 0,
      maxValue: 0,
      unitCode: "DAY",
    },
  },
};

const createOffer = (name: string, price: string) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "EUR",
  availability: "https://schema.org/InStock",
  priceValidUntil: "2026-12-31",
  url: "https://grandqr.com/pricing",
  hasMerchantReturnPolicy: merchantReturnPolicy,
  shippingDetails,
});

const pricingProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "QR Menu & Website for Restaurant and Cafe - GrandQR",
  description:
    "Create a QR menu and website for your restaurant or cafe. Digital menu with QR code access, AI translations, analytics, and instant updates. Free plan available.",
  image: ["https://grandqr.com/logo.svg", "https://grandqr.com/product-image.svg"],
  brand: {
    "@type": "Brand",
    name: "GrandQR",
  },
  category: "Restaurant Software",
  offers: [
    createOffer("QR Menu Free Plan - Restaurant Website", "0"),
    createOffer("QR Menu Basic Plan Monthly - Restaurant Website", "4"),
    createOffer("QR Menu Basic Plan Yearly - Restaurant Website", "36"),
    createOffer("QR Menu Pro Plan Monthly - Restaurant Website", "7"),
    createOffer("QR Menu Pro Plan Yearly - Restaurant Website", "72"),
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Restaurant Owner" },
      reviewBody:
        "GrandQR is the best QR menu solution for our restaurant. Customers scan the code and see our menu instantly. The multilingual support helps us serve tourists.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Cafe Manager" },
      reviewBody:
        "Our cafe website with QR menu is easy to maintain. Analytics show what customers prefer. The free plan was perfect to start!",
    },
  ],
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("pricing");

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("title") },
  ]);

  return (
    <>
      <JsonLd data={pricingProductSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </header>
          <PricingCards />
        </div>
      </div>

      <CtaSection />
    </>
  );
}
