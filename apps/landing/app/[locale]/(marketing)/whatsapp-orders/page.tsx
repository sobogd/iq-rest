import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Zap, TrendingUp, MessageCircle, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  HeroCreateButton,
  ImageComposition,
  PricingSection,
  CtaSection,
} from "../_components";
import { JsonLd, createBreadcrumbSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import { Link } from "@/i18n/routing";
import type { SupportedCurrency } from "@/lib/country-currency-map";

const BENEFIT_ICONS = [Zap, TrendingUp, MessageCircle, Palette] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whatsappOrders" });

  const title = t("seo.title");
  const description = t("seo.description");
  const url = `https://iq-rest.com/${locale}/whatsapp-orders`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: buildAlternates("/whatsapp-orders"),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "IQ Rest",
      locale,
      type: "website",
      images: [
        {
          url: "https://iq-rest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "IQ Rest - WhatsApp Orders for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

export default async function WhatsAppOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, cookieStore] = await Promise.all([
    getTranslations("whatsappOrders"),
    cookies(),
  ]);

  const currency =
    (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  const benefits = t.raw("benefits.items") as Array<{
    title: string;
    description: string;
  }>;

  const features = t.raw("features.items") as Array<{
    title: string;
    description: string;
  }>;

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  // JSON-LD schemas
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IQ Rest WhatsApp Ordering",
    description: t("seo.description"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: "WhatsApp Orders" },
  ]);

  const featureImages = [
    {
      layout: "duo" as const,
      images: {
        left: {
          src: "/samples/sample-main.webp",
          alt: "Restaurant QR menu with WhatsApp order button",
        },
        center: { src: "/samples/sample-main.webp", alt: "" },
        right: {
          src: "/samples/sample-main-page.webp",
          alt: "WhatsApp order message preview from QR menu",
        },
      },
    },
    {
      layout: "duo" as const,
      images: {
        left: {
          src: "/samples/sample-list-categories.webp",
          alt: "Menu categories for WhatsApp ordering",
        },
        center: { src: "/samples/sample-list-categories.webp", alt: "" },
        right: {
          src: "/samples/sample-list-items.webp",
          alt: "Menu items with prices for WhatsApp orders",
        },
      },
    },
  ];

  return (
    <>
      <PageView slug="whatsapp-orders" />
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {t("hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t("hero.title").split("WhatsApp").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="text-primary">WhatsApp</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <HeroCreateButton>{t("hero.cta")}</HeroCreateButton>
              <Button
                variant="outline"
                asChild
                className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
              >
                <Link href="/m/love-eatery">{t("hero.ctaDemo")}</Link>
              </Button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t("hero.noCreditCard")}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("benefits.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t("benefits.subtitle")}
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index];
              return (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-2">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("features.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t("features.subtitle")}
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-16 lg:space-y-24">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;
              const imageConfig = featureImages[index];

              return (
                <div key={index}>
                  {/* Desktop: 2 columns */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                    <div
                      className={`flex flex-col ${isEven ? "lg:order-1 items-end text-right" : "lg:order-2 items-start text-left"}`}
                    >
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    <div
                      className={`flex justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
                    >
                      {imageConfig && (
                        <ImageComposition
                          layout={imageConfig.layout}
                          images={imageConfig.images}
                        />
                      )}
                    </div>
                  </div>

                  {/* Mobile: stacked */}
                  <div className="flex flex-col items-center text-center lg:hidden">
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <div className="w-full max-w-[280px] my-[70px]">
                      {imageConfig && (
                        <ImageComposition
                          layout={imageConfig.layout}
                          images={imageConfig.images}
                        />
                      )}
                    </div>
                    <p className="text-base text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("faq.title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t("faq.subtitle")}
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="scroll-mt-20">
        <PricingSection currency={currency} hideComparison />
      </section>

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
