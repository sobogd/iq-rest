import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  FeatureLinks,
} from "../_components";
import { JsonLd, createBreadcrumbSchema, createHowToSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import { FEATURE_IMAGES, FEATURE_NAMESPACE, VALID_FEATURE_IDS, type FeatureId } from "../_lib/feature-data";
import type { SupportedCurrency } from "@/lib/country-currency-map";

function buildImageComposition(images: { src: string; alt: string }[]) {
  if (images.length >= 3) {
    return {
      layout: "trio" as const,
      images: {
        left: { src: images[0].src, alt: images[0].alt },
        center: { src: images[1].src, alt: images[1].alt },
        right: { src: images[2].src, alt: images[2].alt },
      },
    };
  }
  if (images.length === 2) {
    return {
      layout: "duo" as const,
      images: {
        left: { src: images[0].src, alt: images[0].alt },
        center: { src: images[0].src, alt: "" },
        right: { src: images[1].src, alt: images[1].alt },
      },
    };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; featureId: string }>;
}): Promise<Metadata> {
  const { locale, featureId } = await params;

  if (!VALID_FEATURE_IDS.includes(featureId as FeatureId)) return {};

  const ns = FEATURE_NAMESPACE[featureId];
  if (!ns) return {};

  const t = await getTranslations({ locale, namespace: ns });
  const title = t("seo.title");
  const description = t("seo.description");
  const url = `https://iq-rest.com/${locale}/${featureId}`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: buildAlternates(`/${featureId}`),
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
          alt: "IQ Rest - QR Menu for Restaurants",
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

export function generateStaticParams() {
  return VALID_FEATURE_IDS.map((featureId) => ({ featureId }));
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ locale: string; featureId: string }>;
}) {
  const { locale, featureId } = await params;

  if (!VALID_FEATURE_IDS.includes(featureId as FeatureId)) notFound();

  const ns = FEATURE_NAMESPACE[featureId];
  if (!ns) notFound();

  const [t, tFeatures, cookieStore] = await Promise.all([
    getTranslations(ns),
    getTranslations("features"),
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

  // HowItWorks data (optional — graceful fallback)
  type HowItWorksData = {
    title: string;
    subtitle: string;
    steps: Array<{ title: string; description: string }>;
  };
  let howItWorks: HowItWorksData | null = null;
  try {
    howItWorks = t.raw("howItWorks") as HowItWorksData;
  } catch {
    // Key not present yet — section will be hidden
  }

  // Get benefits from main features list
  const featuresList = tFeatures.raw("list") as Array<{
    id: string;
    benefits: string[];
  }>;
  const featureData = featuresList.find((f) => f.id === featureId);
  const benefits = featureData?.benefits || [];

  // Images — one composition per feature section
  const featureImageSets = FEATURE_IMAGES[featureId] || [];
  const imageCompositions = featureImageSets.map(buildImageComposition);

  // JSON-LD
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t("seo.title"),
    description: t("seo.description"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  const howToSchema = howItWorks?.steps?.length
    ? createHowToSchema(
        howItWorks.title,
        howItWorks.subtitle,
        howItWorks.steps,
        featureId,
        locale
      )
    : null;

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("hero.badge") },
  ]);

  return (
    <>
      <PageView slug={featureId} />
      <JsonLd data={softwareAppSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      {howToSchema && <JsonLd data={howToSchema} />}
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
              const imageComposition = imageCompositions[index] ?? null;

              return (
                <div key={index}>
                  {/* Desktop */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                    <div
                      className={`flex flex-col ${
                        imageComposition
                          ? isEven ? "lg:order-1 items-end text-right" : "lg:order-2 items-start text-left"
                          : "lg:col-span-2 items-center text-center max-w-2xl mx-auto"
                      }`}
                    >
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-white/60">
                        {feature.description}
                      </p>
                    </div>
                    {imageComposition && (
                      <div className={`flex justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        <ImageComposition
                          layout={imageComposition.layout}
                          images={imageComposition.images}
                        />
                      </div>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="flex flex-col items-center text-center lg:hidden">
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    {imageComposition && (
                      <div className={`w-full max-w-[280px] ${imageComposition.layout === "trio" ? "my-[47px]" : "my-[70px]"}`}>
                        <ImageComposition
                          layout={imageComposition.layout}
                          images={imageComposition.images}
                        />
                      </div>
                    )}
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

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8">
                {tFeatures("keyBenefits")}
              </h2>
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:justify-center">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start md:items-center gap-2 px-0 py-1 md:px-4 md:py-2.5 md:bg-background md:rounded-full md:border w-full md:w-auto">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 md:mt-0" />
                    <span className="text-sm md:text-base text-left">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {howItWorks?.steps?.length && (
        <section id="how-it-works" className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {howItWorks.title}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                {howItWorks.subtitle}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {howItWorks.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 border rounded-lg bg-card">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqItems.length > 0 && (
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
      )}

      {/* Pricing Section */}
      <section id="pricing" className="scroll-mt-20">
        <PricingSection currency={currency} hideComparison />
      </section>

      {/* Feature Links */}
      <FeatureLinks excludeFeatureId={featureId} />

      {/* CTA Section */}
      <CtaSection />
    </>
  );
}
