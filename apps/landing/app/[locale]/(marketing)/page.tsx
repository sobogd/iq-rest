import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import HowToSteps from "@/components/HowToSteps";
import type { Metadata } from "next";
import { Languages, BarChart3, ShoppingCart, Palette } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "QR Menu for Restaurant & Cafe | Create Digital Menu Website - SobogdQR",
    es: "Menú QR para Restaurante y Cafetería | Crear Sitio Web de Menú Digital - SobogdQR"
  };

  const descriptions = {
    en: "Create professional QR menu for restaurant and cafe in minutes. Build your digital menu website with instant updates, multilingual support, and analytics. Free trial available.",
    es: "Crea un menú QR profesional para restaurante y cafetería en minutos. Construye tu sitio web de menú digital con actualizaciones instantáneas, soporte multilingüe y análisis. Prueba gratuita disponible."
  };

  const baseUrl = 'https://sobogdqr.com';

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${baseUrl}/${locale}`,
      siteName: 'SobogdQR',
      locale: locale,
      type: 'website',
    }
  };
}

export default function HomePage() {
  const tHero = useTranslations("home.hero");
  const tIntro = useTranslations("home.intro");
  const tFeatures = useTranslations("features");

  const features = tFeatures.raw("list") as Array<{
    id: string;
    title: string;
    shortDescription: string;
    cta: string;
  }>;

  const featureIcons = {
    'ai-translation': Languages,
    'analytics': BarChart3,
    'shopping-cart': ShoppingCart,
    'modern-design': Palette,
  };

  // Product Schema for SobogdQR service
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'SobogdQR - QR Menu Solution for Restaurants',
    description: 'Professional QR menu system for restaurants and cafes with instant updates, multilingual support, and analytics',
    image: [
      'https://sobogdqr.com/logo.svg',
      'https://sobogdqr.com/product-image.svg'
    ],
    brand: {
      '@type': 'Brand',
      name: 'SobogdQR'
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '9',
      priceCurrency: 'EUR',
      offerCount: '3',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      url: 'https://sobogdqr.com/pricing',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'WorldWide',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
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
      }
    },
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

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SobogdQR',
    url: 'https://sobogdqr.com',
    logo: 'https://sobogdqr.com/logo.svg',
    description: 'Digital QR menu solution for restaurants and cafes worldwide',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Bogdan'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@sobogdqr.com'
    }
  };

  // Software Application Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SobogdQR',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <div className="container mx-auto px-4">
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center py-[6vh] md:py-0">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {tHero("title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {tHero("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/get-started">{tHero("cta.create")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                <Link href="/get-started">{tHero("cta.view")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Intro Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {tIntro("title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {tIntro("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {tFeatures("title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                {tFeatures("subtitle")}
              </p>
            </div>

            <div className="space-y-16">
              {features.map((feature, index) => {
                const Icon = featureIcons[feature.id as keyof typeof featureIcons];
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={feature.id}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Image Column */}
                    <div className={`flex justify-center ${!isEven ? 'md:order-2' : ''}`}>
                      <div className="w-full aspect-video rounded-lg border bg-muted flex items-center justify-center">
                        <Icon className="w-16 h-16 text-muted-foreground/30" />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={!isEven ? 'md:order-1' : ''}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground mb-6">
                        {feature.shortDescription}
                      </p>
                      <Button asChild variant="outline">
                        <Link href={`/features/${feature.id}`}>
                          {feature.cta}
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HowTo Steps - with schema (homepage only) */}
      <HowToSteps />
    </>
  );
}
