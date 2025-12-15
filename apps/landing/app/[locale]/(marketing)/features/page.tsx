import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
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
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { HowToSteps } from "../_components";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Features - QR Menu & Restaurant Website | Digital Menu Solutions - SobogdQR",
    es: "Características - Menú QR y Sitio Web de Restaurante | Soluciones de Menú Digital - SobogdQR",
  };

  const descriptions = {
    en: "Discover 11 powerful features for your restaurant: instant setup, mobile management, AI translation, analytics, reservations, custom design and more. Create QR menu for restaurant or cafe.",
    es: "Descubre 11 características potentes para tu restaurante: configuración instantánea, gestión móvil, traducción IA, análisis, reservaciones, diseño personalizado y más. Crea menú QR para restaurante o cafetería.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://sobogdqr.com/${locale}/features`,
    },
    keywords: [
      "qr menu",
      "restaurant website",
      "cafe website",
      "digital menu",
      "qr code menu",
      "restaurant qr menu",
      "menu qr para restaurante",
      "sitio web restaurante",
    ],
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

export default function FeaturesPage() {
  const t = useTranslations("features");

  const features = t.raw("list") as Array<{
    id: string;
    title: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
    cta: string;
  }>;

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon =
                FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS];
              return (
                <Card
                  key={feature.id}
                  className="flex flex-col hover:shadow-lg transition-shadow group"
                >
                  {/* Image placeholder - 4:3 aspect ratio */}
                  <div className="aspect-[4/3] bg-muted overflow-hidden relative rounded-t-lg">
                    {feature.image ? (
                      <Image
                        src={feature.image}
                        alt={feature.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {feature.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {feature.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/features/${feature.id}`}>
                        {feature.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {t("readyTitle")}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("readyDescription")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/dashboard">{t("getStarted")}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pricing">{t("viewPricing")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <HowToSteps noIndex />
    </>
  );
}
