import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
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

export default function PricingPage() {
  const t = useTranslations("pricing");

  const plans = ["free", "base", "pro"] as const;

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
        name: 'Base Plan',
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
        name: 'Pro Plan',
        price: '9',
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan}
                className={
                  plan === "base"
                    ? "border-primary shadow-lg relative"
                    : ""
                }
              >
                {plan === "base" && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{t(`plans.${plan}.name`)}</CardTitle>
                  <CardDescription>{t(`plans.${plan}.description`)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">{t(`plans.${plan}.price`)}</div>
                    <div className="text-sm text-muted-foreground">
                      {t(`plans.${plan}.period`)}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {(t.raw(`plans.${plan}.features`) as string[]).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant={plan === "base" ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href="/get-started">{t(`plans.${plan}.cta`)}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* HowTo Steps - noindex since not homepage */}
      <HowToSteps noIndex />
    </>
  );
}
