import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import type { SupportedCurrency } from "@/lib/country-currency-map";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { HeroImages, ImageComposition, HeroCreateButton, PricingSection, ScrollToFeatures, MenuScanner, DemoPhone, ScrollToDemo } from "./_components";
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
import {
  Zap,
  Smartphone,
  Languages,
  Globe,
  ImageIcon,
  LayoutList,
  BarChart3,
  CalendarCheck,
  Video,
  Palette,
  HeadphonesIcon,
  UtensilsCrossed,
  Coffee,
  Wine,
  Hotel,
} from "lucide-react";
import Image from "next/image";

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

const FEATURE_ICONS = {
  "instant-setup": Zap,
  "mobile-management": Smartphone,
  "ai-translation": Languages,
  multilingual: Globe,
  "ai-images": ImageIcon,
  "easy-menu": LayoutList,
  analytics: BarChart3,
  reservations: CalendarCheck,
  "custom-design": Video,
  "color-scheme": Palette,
  "personal-support": HeadphonesIcon,
} as const;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v: variant } = await searchParams;
  const isVariantB = variant === "b";

  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("user_email")?.value;
  const currency = (cookieStore.get("currency")?.value as SupportedCurrency) || "EUR";

  const tHero = await getTranslations("home.hero");
  const tDemo = await getTranslations("home.demo");
  const tFeaturesPreview = await getTranslations("home.featuresPreview");
  const tFeatures = await getTranslations("features");

  const features = tFeatures.raw("list") as Array<{
    id: string;
    title: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
    cta: string;
  }>;

  // Show selected features on homepage in specific order
  const homeFeatureIds = [
    "color-scheme",
    "mobile-management",
    "custom-design",
    "easy-menu",
    "ai-translation",
    "reservations",
  ];
  const previewFeatures = homeFeatureIds
    .map((id) => features.find((f) => f.id === id))
    .filter(Boolean) as typeof features;

  return (
    <>
      <PageView slug="home" variant={isVariantB ? "b" : undefined} />
      <JsonLd data={productSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareSchema} />

      {/* Hero Section - Variant B: compact, no benefits inside */}
      {isVariantB ? (
        <section className="min-h-[calc(100svh-73px)] flex flex-col relative">
          <div className="container mx-auto px-4 flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              {/* Left side - Text content */}
              <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  {tHero("title")}
                </h1>
                <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  {tHero("subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <HeroCreateButton>{tHero("cta.create")}</HeroCreateButton>
                  <Button variant="outline" asChild className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg">
                    <a href="#pricing">{tHero("cta.view")}</a>
                  </Button>
                </div>
                <p className="text-[10px] md:text-sm text-muted-foreground text-center lg:text-left mt-3 md:mt-4">
                  {tHero("cta.noCreditCard")}
                </p>
              </div>

              {/* Right side - Images composition */}
              <div className="order-1 lg:order-2">
                <HeroImages />
              </div>
            </div>
          </div>
          <ScrollToDemo label={tHero("scrollToDemo")} />
        </section>
      ) : (
        <section className="min-h-[calc(100svh-73px)] flex flex-col relative">
          <div className="container mx-auto px-4 flex-1 flex items-center justify-center pt-4 pb-20 lg:pt-8 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8 lg:gap-12 items-center w-full">
              {/* Left side - Text content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                {/* Hero Images - mobile only */}
                <div className="w-full max-w-[240px] sm:max-w-[280px] mb-6 lg:hidden">
                  <HeroImages />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight lg:leading-tight mb-6">
                  {tHero("title")}
                </h1>

                {/* Perfect for badges */}
                <div className="flex justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3 mb-6">
                  {[
                    { icon: UtensilsCrossed, label: tHero("perfectFor.restaurants") },
                    { icon: Coffee, label: tHero("perfectFor.cafes") },
                    { icon: Wine, label: tHero("perfectFor.bars") },
                    { icon: Hotel, label: tHero("perfectFor.hotels") },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 px-1.5 sm:px-2.5 py-0.5 sm:py-1 lg:px-3.5 lg:py-1.5 rounded-full bg-muted/50 text-[10px] sm:text-xs md:text-sm lg:text-base text-muted-foreground"
                    >
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-3">
                  <HeroCreateButton>{tHero("cta.create")}</HeroCreateButton>
                  <Button variant="outline" asChild className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg">
                    <a href="#pricing">{tHero("cta.view")}</a>
                  </Button>
                </div>
                <p className="text-[10px] md:text-sm text-muted-foreground text-center lg:text-left mt-3 md:mt-4">
                  {tHero("cta.noCreditCard")}
                </p>
              </div>

              {/* Right side - Images (desktop only) */}
              <div className="hidden lg:block order-1 lg:order-2">
                <HeroImages />
              </div>
            </div>
          </div>
          <ScrollToDemo label={tHero("scrollToDemo")} />
        </section>
      )}

      {/* Demo Section */}
      <SectionTracker id="demo" section="demo" className="relative pt-16 pb-28 lg:py-0 bg-muted/50 min-h-svh">
        <div className="container mx-auto px-4 lg:h-svh">
          {/* Mobile: stacked */}
          <div className="flex flex-col items-center text-center lg:hidden">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              {tDemo("title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10">
              {tDemo("subtitle")}
            </p>
            <DemoPhone />
          </div>

          {/* Desktop: side by side */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center lg:h-full">
            <div className="flex justify-center">
              <DemoPhone />
            </div>
            <div className="flex flex-col items-start text-left">
              <h2 className="text-4xl font-bold tracking-tight mb-4">
                {tDemo("title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {tDemo("subtitle")}
              </p>
            </div>
          </div>
        </div>
        <ScrollToFeatures label={tHero("scrollToFeatures")} />
      </SectionTracker>

      {/* Features Header */}
      <section className="py-8 lg:py-12 bg-black text-white scroll-mt-20" id="features">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {tFeaturesPreview("title")}
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto">
            {tFeaturesPreview("subtitle")}
          </p>
        </div>
      </section>

      {/* Features Preview Section */}
      <SectionTracker section="features" className="pt-8 pb-8 lg:pt-16 lg:pb-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="space-y-0">
              {previewFeatures.map((feature, index) => {
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
                };

                const imageConfig = featureImages[feature.id];
                const isEven = index % 2 === 0;

                return (
                  <SectionTracker
                    key={feature.id}
                    section={`feature_${feature.id}`}
                    className="flex items-center py-8 lg:py-16"
                  >
                    <div className="container mx-auto px-4">
                      <div className="max-w-5xl mx-auto">
                        {/* Desktop: 2 columns */}
                        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                          {/* Text column */}
                          <div className={`flex flex-col ${isEven ? "lg:order-1 items-end text-right" : "lg:order-2 items-start text-left"}`}>
                            <h3 className="text-3xl font-bold mb-4">
                              {feature.title}
                            </h3>
                            <p className="text-lg text-muted-foreground">
                              {feature.shortDescription.split(/(\{link\}.*?\{\/link\}|\{br\})/).map((part, i) => {
                                if (part === '{br}') return <br key={i} />;
                                const linkMatch = part.match(/\{link\}(.*?)\{\/link\}/);
                                if (linkMatch) {
                                  return (
                                    <Link
                                      key={i}
                                      href={`/${feature.id}`}
                                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                                    >
                                      {linkMatch[1]}
                                    </Link>
                                  );
                                }
                                return part;
                              })}
                            </p>
                          </div>
                          {/* Image column */}
                          <div className={`flex justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                            {imageConfig && (
                              <ImageComposition
                                layout={imageConfig.layout}
                                images={imageConfig.images}
                              />
                            )}
                          </div>
                        </div>

                        {/* Mobile: Title → Image → Description */}
                        <div className="flex flex-col items-center text-center lg:hidden">
                          <h3 className="text-2xl font-bold mb-4">
                            {feature.title}
                          </h3>
                          <div className={`w-full max-w-[280px] ${imageConfig?.layout === "trio" ? "my-[47px]" : "my-[70px]"}`}>
                            {imageConfig && (
                              <ImageComposition
                                layout={imageConfig.layout}
                                images={imageConfig.images}
                              />
                            )}
                          </div>
                          <p className="text-base text-muted-foreground">
                            {feature.shortDescription.split(/(\{link\}.*?\{\/link\}|\{br\})/).map((part, i) => {
                              if (part === '{br}') return ' ';
                              const linkMatch = part.match(/\{link\}(.*?)\{\/link\}/);
                              if (linkMatch) {
                                return (
                                  <Link
                                    key={i}
                                    href={`/${feature.id}`}
                                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                                  >
                                    {linkMatch[1]}
                                  </Link>
                                );
                              }
                              return part;
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionTracker>
                );
              })}
            </div>
        </div>
      </SectionTracker>

      <SectionTracker id="pricing" section="pricing" className="scroll-mt-20">
        <PricingSection noIndex hideComparison currency={currency} />
      </SectionTracker>
    </>
  );
}
