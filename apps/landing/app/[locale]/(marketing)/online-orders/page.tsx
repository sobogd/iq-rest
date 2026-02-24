import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HeroCreateButton,
  ImageComposition,
  PricingSection,
  CtaSection,
  MenuPreviewModal,
} from "../_components";
import { JsonLd, createBreadcrumbSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import type { SupportedCurrency } from "@/lib/country-currency-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "onlineOrders" });

  const title = t("seo.title");
  const description = t("seo.description");
  const url = `https://iq-rest.com/${locale}/online-orders`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: buildAlternates("/online-orders"),
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
          alt: "IQ Rest - Online Ordering for Restaurants",
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

export default async function OnlineOrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, cookieStore] = await Promise.all([
    getTranslations("onlineOrders"),
    cookies(),
  ]);

  const currency =
    (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

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
    name: "IQ Rest Online Ordering",
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
    { name: "Online Orders" },
  ]);

  const featureImages = [
    {
      layout: "trio" as const,
      images: {
        left: {
          src: "/samples/order_public_3.webp",
          alt: "Order confirmation screen",
        },
        center: {
          src: "/samples/order_public_2.webp",
          alt: "Selecting items from restaurant menu",
        },
        right: {
          src: "/samples/order_public_1.webp",
          alt: "Customer browsing QR menu to place order",
        },
      },
    },
    {
      layout: "duo" as const,
      images: {
        left: {
          src: "/samples/order_1.webp",
          alt: "Orders list in restaurant dashboard",
        },
        center: { src: "/samples/order_1.webp", alt: "" },
        right: {
          src: "/samples/order_2.webp",
          alt: "Order details with table number",
        },
      },
    },
  ];

  return (
    <>
      <PageView slug="online-orders" />
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
              {t("hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-row flex-wrap gap-4 justify-center pt-2">
              <HeroCreateButton>{t("hero.cta")}</HeroCreateButton>
              <MenuPreviewModal buttonText={t("hero.ctaDemo")} menuUrl="/m/love-eatery" />
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t("hero.noCreditCard")}
            </p>
          </div>
        </div>
      </section>

      {/* Features Header */}
      <section className="py-8 lg:py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("features.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="pt-12 pb-12 lg:pt-24 lg:pb-36 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16 lg:space-y-36">
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
                      <p className="text-lg text-white/60">
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
                    <div className={`w-full max-w-[280px] ${imageConfig?.layout === "trio" ? "my-[47px]" : "my-[70px]"}`}>
                      {imageConfig && (
                        <ImageComposition
                          layout={imageConfig.layout}
                          images={imageConfig.images}
                        />
                      )}
                    </div>
                    <p className="text-base text-white/60">
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
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 sm:px-10 lg:px-4">
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
