import { getTranslations } from "next-intl/server";
import { PricingSection, CtaSection } from "../_components";
import { JsonLd, createBreadcrumbSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/pricing`,
      languages: buildAlternates("/pricing"),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://iq-rest.com/${locale}/pricing`,
      images: [{ url: "https://iq-rest.com/og-image.png", width: 1200, height: 630, alt: "IQ Rest - QR Menu for Restaurants" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iq-rest.com/og-image.png"],
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
  priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
  url: "https://iq-rest.com/pricing",
  hasMerchantReturnPolicy: merchantReturnPolicy,
  shippingDetails,
});

const pricingProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "QR Menu & Website for Restaurant and Cafe - IQ Rest",
  description:
    "Create a QR menu and website for your restaurant or cafe. Digital menu with QR code access, AI translations, analytics, and instant updates. Free plan available.",
  image: ["https://iq-rest.com/logo.svg", "https://iq-rest.com/product-image.svg"],
  brand: {
    "@type": "Brand",
    name: "IQ Rest",
  },
  category: "Restaurant Software",
  offers: [
    createOffer("QR Menu Free Plan - Restaurant Website", "0"),
    createOffer("QR Menu Basic Plan Monthly - Restaurant Website", "9.9"),
    createOffer("QR Menu Basic Plan Yearly - Restaurant Website", "88.8"),
    createOffer("QR Menu Pro Plan Monthly - Restaurant Website", "29.9"),
    createOffer("QR Menu Pro Plan Yearly - Restaurant Website", "249"),
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
        "IQ Rest is the best QR menu solution for our restaurant. Customers scan the code and see our menu instantly. The multilingual support helps us serve tourists.",
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
      <PageView slug="pricing" />
      <JsonLd data={pricingProductSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PricingSection />
      <CtaSection />
    </>
  );
}
