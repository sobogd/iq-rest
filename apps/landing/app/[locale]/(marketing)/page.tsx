import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { HowToSteps, MenuPreviewModal, HeroImages, ImageComposition, CtaSection } from "./_components";
import { PageView } from "@/components/PageView";
import { SectionTracker } from "@/components/SectionTracker";
import {
  JsonLd,
  productSchema,
  organizationSchema,
  softwareSchema,
} from "./_lib";
import { generatePageMetadata, homeMetaConfig } from "./_lib";
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
} from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(locale, homeMetaConfig);
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

  const tHero = await getTranslations("home.hero");
  const tIntro = await getTranslations("home.intro");
  const tWhyUs = await getTranslations("home.whyUs");
  const tFeaturesPreview = await getTranslations("home.featuresPreview");
  const tFeatures = await getTranslations("features");

  const benefits = tHero.raw("benefits") as Array<{
    title: string;
    description: string;
  }>;
  const whyUsItems = tWhyUs.raw("items") as Array<{
    title: string;
    description: string;
  }>;

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
    "reservations",
    "custom-design",
    "color-scheme",
    "easy-menu",
    "multilingual",
    "ai-translation",
    "mobile-management",
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
        <SectionTracker section="hero_b" className="pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  {tHero("title")}
                </h1>
                <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  {tHero("subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/dashboard">{tHero("cta.create")}</Link>
                  </Button>
                  <MenuPreviewModal
                    buttonText={tHero("cta.view")}
                    menuUrl="/m/love-eatery"
                  />
                </div>
              </div>

              {/* Right side - Images composition */}
              <div className="order-1 lg:order-2">
                <HeroImages />
              </div>
            </div>
          </div>
        </SectionTracker>
      ) : (
        <SectionTracker section="hero" className="min-h-[calc(100vh-80px)] pt-8 pb-16 md:pt-12 md:pb-20 flex flex-col">
          <div className="container mx-auto px-4 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
              {/* Left side - Text content */}
              <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  {tHero("title")}
                </h1>
                <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  {tHero("subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/dashboard">{tHero("cta.create")}</Link>
                  </Button>
                  <MenuPreviewModal
                    buttonText={tHero("cta.view")}
                    menuUrl="/m/love-eatery"
                  />
                </div>
              </div>

              {/* Right side - Images composition */}
              <div className="order-1 lg:order-2">
                <HeroImages />
              </div>
            </div>
          </div>

          {/* Benefits cards - inside hero for variant A */}
          <div className="container mx-auto px-4 pt-14 md:pt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => {
                const icons = [Globe, CalendarCheck, Languages, BarChart3];
                const Icon = icons[index];
                return (
                  <Card key={index} className="border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6 lg:gap-3">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1.5 lg:mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-lg lg:text-base">{benefit.title}</h3>
                          <p className="text-base lg:text-sm text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </SectionTracker>
      )}

      {/* Benefits Section - separate for variant B */}
      {isVariantB && (
        <SectionTracker section="benefits_b" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => {
                const icons = [Globe, CalendarCheck, Languages, BarChart3];
                const Icon = icons[index];
                return (
                  <Card key={index} className="border bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6 lg:gap-3">
                        <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1.5 lg:mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-lg lg:text-base">{benefit.title}</h3>
                          <p className="text-base lg:text-sm text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </SectionTracker>
      )}

      {/* Features Preview Section */}
      <SectionTracker section="features" className="py-16 bg-muted/50 scroll-mt-20" threshold={0.2}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {tFeaturesPreview("title")}
              </h2>
              <p className="text-base sm:text-lg md:text-lg text-muted-foreground">
                {tFeaturesPreview("subtitle")}
              </p>
            </div>

            <div className="space-y-32 md:space-y-24">
              {previewFeatures.map((feature, index) => {
                const Icon =
                  FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS];
                const isEven = index % 2 === 0;

                return (
                  <SectionTracker
                    key={feature.id}
                    section={`feature_${feature.id}`}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-12 items-center ${
                      !isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`flex justify-center ${
                        !isEven ? "md:order-2" : ""
                      }`}
                    >
                      {feature.id === "reservations" ? (
                        <ImageComposition
                          layout="horizontal"
                          images={{
                            left: { src: "/samples/sample-reservation-1.webp", alt: "Restaurant table reservation form on mobile QR menu" },
                            center: { src: "/samples/sample-reservation-2.webp", alt: "Online booking confirmation for restaurant table" },
                            right: { src: "/samples/sample-reservation-3.webp", alt: "Guest reservation details in restaurant booking system" },
                          }}
                        />
                      ) : feature.id === "custom-design" ? (
                        <ImageComposition
                          layout="duo"
                          images={{
                            left: { src: "/samples/sample-background-1.webp", alt: "Restaurant QR menu with custom video background" },
                            center: { src: "/samples/sample-background-1.webp", alt: "" },
                            right: { src: "/samples/sample-background-2.webp", alt: "Digital menu with photo background for restaurant branding" },
                          }}
                        />
                      ) : feature.id === "color-scheme" ? (
                        <ImageComposition
                          layout="trio"
                          images={{
                            left: { src: "/samples/sample-red-color.webp", alt: "QR menu with red accent color scheme for restaurant" },
                            center: { src: "/samples/sample-green-color.webp", alt: "Restaurant digital menu with green brand colors" },
                            right: { src: "/samples/sample-blue-color.webp", alt: "Blue themed QR menu design for cafe" },
                          }}
                        />
                      ) : feature.id === "easy-menu" ? (
                        <ImageComposition
                          layout="duo"
                          images={{
                            left: { src: "/samples/sample-list-categories.webp", alt: "Restaurant menu category management dashboard" },
                            center: { src: "/samples/sample-list-categories.webp", alt: "" },
                            right: { src: "/samples/sample-list-items.webp", alt: "Easy drag-and-drop menu item editor for restaurants" },
                          }}
                        />
                      ) : feature.id === "multilingual" ? (
                        <ImageComposition
                          layout="duo"
                          images={{
                            left: { src: "/samples/sample-lang-settings.webp", alt: "Multilingual restaurant menu language settings" },
                            center: { src: "/samples/sample-lang-settings.webp", alt: "" },
                            right: { src: "/samples/sample-langs.webp", alt: "25+ language options for restaurant QR menu" },
                          }}
                        />
                      ) : feature.id === "ai-translation" ? (
                        <ImageComposition
                          layout="trio"
                          images={{
                            left: { src: "/samples/sample-edit-table.webp", alt: "AI translation for restaurant table descriptions" },
                            center: { src: "/samples/sample-edit-item.webp", alt: "Automatic menu item translation with AI" },
                            right: { src: "/samples/sample-edit-category.webp", alt: "AI-powered category translation for digital menu" },
                          }}
                        />
                      ) : feature.id === "mobile-management" ? (
                        <ImageComposition
                          layout="trio"
                          images={{
                            left: { src: "/samples/sample-analytics-1.webp", alt: "Restaurant menu analytics on mobile phone" },
                            center: { src: "/samples/sample-design-settings.webp", alt: "Mobile-friendly menu design settings" },
                            right: { src: "/samples/sample-qr-settings.webp", alt: "QR code customization from smartphone" },
                          }}
                        />
                      ) : (
                        <div className="w-full aspect-[4/3] rounded-lg border bg-muted overflow-hidden relative">
                          {feature.image ? (
                            <Image
                              src={feature.image}
                              alt={feature.imageAlt}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icon className="w-16 h-16 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={!isEven ? "md:order-1" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground mb-6">
                        {feature.shortDescription}
                      </p>
                      <Button asChild variant="outline">
                        <Link href={`/${feature.id}`}>
                          {feature.cta}
                        </Link>
                      </Button>
                    </div>
                  </SectionTracker>
                );
              })}
            </div>

          </div>
        </div>
      </SectionTracker>

      {/* Intro Section */}
      <SectionTracker section="intro" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-base md:text-lg font-medium text-primary">{tIntro("socialProof")}</p>
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">{tIntro("title")}</h2>
              <p className="text-base sm:text-lg md:text-lg text-muted-foreground leading-relaxed">
                {tIntro("description")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">{tHero("cta.create")}</Link>
              </Button>
              <MenuPreviewModal
                buttonText={tHero("cta.view")}
                menuUrl="/m/love-eatery"
              />
            </div>
          </div>
        </div>
      </SectionTracker>

      {/* Why Us Section */}
      <SectionTracker section="why_us" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {tWhyUs("title")}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                {tWhyUs("subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyUsItems.map((item, index) => (
                <Card key={index} className="border bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <span className="text-4xl font-bold text-primary/70">{index + 1}</span>
                      <div>
                        <h3 className="font-semibold text-lg lg:text-base">
                          {item.title}
                        </h3>
                        <p className="text-base lg:text-sm text-muted-foreground mt-1">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </SectionTracker>

      <SectionTracker section="cta">
        <CtaSection />
      </SectionTracker>
    </>
  );
}
