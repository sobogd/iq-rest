import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import type { SupportedCurrency } from "@/lib/country-currency-map";
import { HeroImages, ImageComposition, HeroCreateButton, PricingSection, MenuPreviewModal, ScrollToPricing, FeatureLinks } from "./_components";
import { FeatureLearnMoreLink } from "./_components/feature-learn-more-link";
import { PageView } from "@/components/PageView";
import { SectionTracker } from "@/components/SectionTracker";
import {
  JsonLd,
  productSchema,
  organizationSchema,
  softwareSchema,
  buildAlternates,
} from "./_lib";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const title = t("meta.title");
  const description = t("meta.description");
  const url = `https://iq-rest.com/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildAlternates(""),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "IQ Rest",
      locale,
      type: "website",
      images: [{ url: "https://iq-rest.com/og-image.png", width: 1200, height: 630, alt: "IQ Rest - QR Menu for Restaurants" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iq-rest.com/og-image.png"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("user_email")?.value;
  const currency = (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  const tHero = await getTranslations("home.hero");
  const tFeatures = await getTranslations("features");

  const features = tFeatures.raw("list") as Array<{
    id: string;
    title: string;
    titleAccent?: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
    cta: string;
  }>;

  // Show selected features on homepage in specific order
  const homeFeatureIds = [
    "online-orders",
    "color-scheme",
    "reservations",
    "mobile-management",
    "custom-design",
    "easy-menu",
    "ai-translation",
  ];
  const previewFeatures = homeFeatureIds
    .map((id) => features.find((f) => f.id === id))
    .filter(Boolean) as typeof features;

  return (
    <>
      <PageView slug="home" />
      <JsonLd data={productSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />

      {/* Hero Section */}
      <section className="min-h-[calc(100svh-73px)] flex flex-col relative">
        <div className="container mx-auto px-4 flex-1 flex items-center justify-center pt-4 pb-20 lg:pt-8 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 lg:gap-12 items-center w-full">
            {/* Left side - Text content */}
            <div className="flex flex-col items-center text-center order-2 lg:order-1">
              {/* Hero Images - mobile only */}
              <div className="w-full max-w-[240px] sm:max-w-[280px] mb-6 lg:hidden">
                <HeroImages />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 lg:mb-6">
                {tHero("title")}{" "}
                <span className="bg-gradient-to-br from-[hsl(9,100%,58%)] to-amber-400 bg-clip-text text-transparent">
                  {tHero("titleAccent")}
                </span>
              </h1>

              {/* Subtitle — temporarily hidden */}
              {/* <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-6">
                {tHero("subtitle")}
              </p> */}

              {/* CTA Buttons */}
              <div className="flex flex-row flex-wrap justify-center gap-3">
                <HeroCreateButton>{tHero("cta.create")}</HeroCreateButton>
                <MenuPreviewModal buttonText={tHero("cta.demo")} menuUrl="/m/love-eatery" />
              </div>
            </div>

            {/* Right side - Images (desktop only) */}
            <div className="hidden lg:block order-1 lg:order-2">
              <HeroImages />
            </div>
          </div>
        </div>
        <ScrollToPricing label={tHero("cta.view")} />
      </section>

      {/* Feature Sections — alternating gray / black */}
      {(() => {
        const featureImages: Record<string, { layout: "trio" | "duo" | "horizontal"; images: { left: { src: string; alt: string }; center: { src: string; alt: string }; right: { src: string; alt: string } } }> = {
          "color-scheme": {
            layout: "trio",
            images: {
              left: { src: "/samples/sample-red-color.webp", alt: "QR menu with red accent color scheme" },
              center: { src: "/samples/sample-green-color.webp", alt: "Restaurant menu with green brand colors" },
              right: { src: "/samples/sample-blue-color.webp", alt: "Blue themed QR menu design" },
            },
          },
          "mobile-management": {
            layout: "trio",
            images: {
              left: { src: "/samples/sample-analytics-1.webp", alt: "Restaurant menu analytics on mobile" },
              center: { src: "/samples/sample-design-settings.webp", alt: "Mobile menu design settings" },
              right: { src: "/samples/sample-qr-settings.webp", alt: "QR code customization" },
            },
          },
          "custom-design": {
            layout: "duo",
            images: {
              left: { src: "/samples/sample-background-1.webp", alt: "QR menu with video background" },
              center: { src: "/samples/sample-background-1.webp", alt: "" },
              right: { src: "/samples/sample-background-2.webp", alt: "Menu with photo background" },
            },
          },
          "easy-menu": {
            layout: "duo",
            images: {
              left: { src: "/samples/sample-list-categories.webp", alt: "Menu category management" },
              center: { src: "/samples/sample-list-categories.webp", alt: "" },
              right: { src: "/samples/sample-list-items.webp", alt: "Menu item editor" },
            },
          },
          "ai-translation": {
            layout: "trio",
            images: {
              left: { src: "/samples/sample-edit-table.webp", alt: "AI translation for tables" },
              center: { src: "/samples/sample-edit-item.webp", alt: "Auto menu translation" },
              right: { src: "/samples/sample-edit-category.webp", alt: "AI category translation" },
            },
          },
          "reservations": {
            layout: "trio",
            images: {
              left: { src: "/samples/sample-reservation-1.webp", alt: "Table reservation form" },
              center: { src: "/samples/sample-reservation-2.webp", alt: "Reservation management" },
              right: { src: "/samples/sample-reservation-3.webp", alt: "Booking confirmation" },
            },
          },
          "online-orders": {
            layout: "duo",
            images: {
              left: { src: "/samples/order_2.webp", alt: "Order details in restaurant dashboard" },
              center: { src: "/samples/order_2.webp", alt: "" },
              right: { src: "/samples/order_public_2.webp", alt: "Customer placing order from QR menu" },
            },
          },
        };

        return previewFeatures.map((feature, index) => {
          const imageConfig = featureImages[feature.id];
          const isDark = index % 2 === 1;
          const isEven = index % 2 === 0;

          return (
            <SectionTracker
              key={feature.id}
              id={index === 0 ? "features" : undefined}
              section={`feature_${feature.id}`}
              className={`pt-16 pb-24 md:py-32 ${index === 0 ? "scroll-mt-20" : ""} ${isDark ? "bg-black text-white" : "bg-muted/50"}`}
            >
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  {/* Desktop: 2 columns, alternating sides */}
                  <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                    <div className={`flex flex-col items-center text-center ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                        {feature.title}{" "}
                        {feature.titleAccent && (
                          <span className="bg-gradient-to-br from-[hsl(9,100%,58%)] to-amber-400 bg-clip-text text-transparent">
                            {feature.titleAccent}
                          </span>
                        )}
                      </h2>
                      <p className={`text-lg ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                        {feature.shortDescription.split(/(\{link\}.*?\{\/link\}|\{br\})/).map((part, i) => {
                          if (part === '{br}') return <br key={i} />;
                          const linkMatch = part.match(/\{link\}(.*?)\{\/link\}/);
                          if (linkMatch) {
                            return (
                              <FeatureLearnMoreLink
                                key={i}
                                featureId={feature.id}
                                className={`underline underline-offset-2 ${isDark ? "text-amber-400 hover:text-amber-300" : "text-primary hover:text-primary/80"}`}
                              >
                                {linkMatch[1]}
                              </FeatureLearnMoreLink>
                            );
                          }
                          return part;
                        })}
                      </p>
                    </div>
                    <div className={`flex justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      {imageConfig && (
                        <ImageComposition
                          layout={imageConfig.layout}
                          images={imageConfig.images}
                        />
                      )}
                    </div>
                  </div>

                  {/* Mobile: title + subtitle → images */}
                  <div className="flex flex-col items-center text-center lg:hidden">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                      {feature.title}{" "}
                      {feature.titleAccent && (
                        <span className="bg-gradient-to-br from-[hsl(9,100%,58%)] to-amber-400 bg-clip-text text-transparent">
                          {feature.titleAccent}
                        </span>
                      )}
                    </h2>
                    <p className={`text-sm mb-4 ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
                      {feature.shortDescription.split(/(\{link\}.*?\{\/link\}|\{br\})/).map((part, i) => {
                        if (part === '{br}') return ' ';
                        const linkMatch = part.match(/\{link\}(.*?)\{\/link\}/);
                        if (linkMatch) {
                          return (
                            <FeatureLearnMoreLink
                              key={i}
                              featureId={feature.id}
                              className={`underline underline-offset-2 ${isDark ? "text-amber-400 hover:text-amber-300" : "text-primary hover:text-primary/80"}`}
                            >
                              {linkMatch[1]}
                            </FeatureLearnMoreLink>
                          );
                        }
                        return part;
                      })}
                    </p>
                    <div className={`w-full max-w-[280px] ${imageConfig?.layout === "trio" ? "mt-[47px]" : "mt-[70px]"}`}>
                      {imageConfig && (
                        <ImageComposition
                          layout={imageConfig.layout}
                          images={imageConfig.images}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SectionTracker>
          );
        });
      })()}

      <SectionTracker id="pricing" section="pricing" className="scroll-mt-20">
        <PricingSection currency={currency} />
      </SectionTracker>

      <FeatureLinks />
    </>
  );
}
