import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, buildAlternates } from "../_lib";
import { CtaSection } from "../_components";
import { PageView } from "@/components/PageView";
import Image from "next/image";
import { FEATURE_IMAGES, VALID_FEATURE_IDS, type FeatureId } from "../_lib/feature-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; featureId: string }>;
}): Promise<Metadata> {
  const { locale, featureId } = await params;

  if (!VALID_FEATURE_IDS.includes(featureId as FeatureId)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "features" });
  const title = t(`seo.${featureId}.title`);
  const description = t(`seo.${featureId}.description`);

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/${featureId}`,
      languages: buildAlternates(`/${featureId}`),
    },
    openGraph: {
      title,
      description,
      url: `https://iq-rest.com/${locale}/${featureId}`,
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

  if (!VALID_FEATURE_IDS.includes(featureId as FeatureId)) {
    notFound();
  }

  const t = await getTranslations("features");
  const features = t.raw("list") as Array<{
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    shortDescription: string;
    benefits: string[];
    image: string;
    imageAlt: string;
    cta: string;
  }>;

  const feature = features.find((f) => f.id === featureId);

  if (!feature) {
    notFound();
  }

  const featureImages = FEATURE_IMAGES[featureId] || [];
  const faqData = t.raw("faq") as Record<string, { q: string; a: string }[]>;
  const faq = faqData[featureId] || [];

  // JSON-LD structured data
  const featureJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: feature.title,
    description: feature.description,
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://iq-rest.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: feature.title,
        item: `https://iq-rest.com/${locale}/${featureId}`,
      },
    ],
  };

  return (
    <>
      <PageView slug={featureId} />
      <JsonLd data={featureJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />

      <div className="container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {feature.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {feature.description}
            </p>
          </div>

          {/* Feature images - vertical phone screenshots */}
          {featureImages.length > 0 && (
            <div className="mb-12">
              <div className={`grid gap-6 ${
                featureImages.length === 2
                  ? "grid-cols-2 max-w-md mx-auto"
                  : featureImages.length === 3
                    ? "grid-cols-3 max-w-2xl mx-auto"
                    : "grid-cols-1 max-w-xs mx-auto"
              }`}>
                {featureImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={280}
                      height={560}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 280px"
                      className="w-full h-auto"
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full description */}
          <article className="p-6 md:p-8 border rounded-lg bg-card mb-16">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {feature.fullDescription}
            </p>
          </article>

          {/* Benefits */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {t("keyBenefits")}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {feature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm md:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          {faq.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                {t("faqTitle")}
              </h2>
              <div className="space-y-4">
                {faq.map((item, index) => (
                  <article key={index} className="p-6 border rounded-lg bg-card">
                    <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <CtaSection />
    </>
  );
}
