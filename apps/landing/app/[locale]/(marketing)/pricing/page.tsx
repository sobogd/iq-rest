import { getTranslations } from "next-intl/server";
import { PricingCards } from "@/components/PricingCards";
import HowToSteps from "@/components/HowToSteps";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Pricing - QR Menu for Restaurant & Cafe | Affordable Plans - SobogdQR",
    es: "Precios - Menú QR para Restaurante y Cafetería | Planes Asequibles - SobogdQR"
  };

  const descriptions = {
    en: "Affordable pricing for QR menu solution. Free plan available for restaurants and cafes. Create your digital menu website starting from €0. No credit card required.",
    es: "Precios asequibles para solución de menú QR. Plan gratuito disponible para restaurantes y cafeterías. Crea tu sitio web de menú digital desde €0. No se requiere tarjeta de crédito."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://sobogdqr.com/${locale}/pricing`,
    },
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const merchantReturnPolicy = {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'WorldWide',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 30,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn'
  };

  const shippingDetails = {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: '0',
      currency: 'EUR'
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: 'WorldWide'
    },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 1,
        unitCode: 'DAY'
      },
      transitTime: {
        '@type': 'QuantitativeValue',
        minValue: 0,
        maxValue: 0,
        unitCode: 'DAY'
      }
    }
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'SobogdQR - QR Menu for Restaurant & Cafe',
    description: 'Professional QR menu system for restaurants and cafes with instant updates, multilingual support, and analytics',
    image: [
      'https://sobogdqr.com/logo.svg',
      'https://sobogdqr.com/product-image.svg'
    ],
    brand: {
      '@type': 'Brand',
      name: 'SobogdQR'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        url: 'https://sobogdqr.com/pricing',
        hasMerchantReturnPolicy: merchantReturnPolicy,
        shippingDetails: shippingDetails
      },
      {
        '@type': 'Offer',
        name: 'Basic Plan Monthly',
        price: '4',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        url: 'https://sobogdqr.com/pricing',
        hasMerchantReturnPolicy: merchantReturnPolicy,
        shippingDetails: shippingDetails
      },
      {
        '@type': 'Offer',
        name: 'Basic Plan Yearly',
        price: '36',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        url: 'https://sobogdqr.com/pricing',
        hasMerchantReturnPolicy: merchantReturnPolicy,
        shippingDetails: shippingDetails
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan Monthly',
        price: '7',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        url: 'https://sobogdqr.com/pricing',
        hasMerchantReturnPolicy: merchantReturnPolicy,
        shippingDetails: shippingDetails
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan Yearly',
        price: '72',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        url: 'https://sobogdqr.com/pricing',
        hasMerchantReturnPolicy: merchantReturnPolicy,
        shippingDetails: shippingDetails
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Restaurant Owner'
        },
        reviewBody: 'SobogdQR transformed our restaurant menu experience. Customers love the multilingual support and the ordering process is much smoother.'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Cafe Manager'
        },
        reviewBody: 'Easy to set up and maintain. The analytics help us understand what our customers prefer. Highly recommended!'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          {/* Pricing Cards with Toggle */}
          <PricingCards />
        </div>
      </div>

      {/* HowTo Steps - noindex since not homepage */}
      <HowToSteps noIndex />
    </>
  );
}
