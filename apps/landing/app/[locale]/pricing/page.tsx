import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import FAQ from "@/components/FAQ";
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
      canonical: `https://yourdomain.com/${locale}/pricing`,
    },
  };
}

export default function PricingPage() {
  const t = useTranslations("pricing");

  const plans = ["free", "base", "pro"] as const;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'SobogdQR - QR Menu for Restaurant & Cafe',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Base Plan',
        price: '4',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '9',
        priceCurrency: 'EUR',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.raw('faq.questions'),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
      <FAQ showCTA={true} />
    </>
  );
}
