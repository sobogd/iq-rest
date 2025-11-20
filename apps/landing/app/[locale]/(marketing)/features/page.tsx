import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Languages, BarChart3, ShoppingCart, Palette } from "lucide-react";
import type { Metadata } from "next";
import HowToSteps from "@/components/HowToSteps";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Features - QR Menu for Restaurant & Cafe | Digital Menu Solutions - SobogdQR",
    es: "Caracteristicas - Menu QR para Restaurante y Cafeteria | Soluciones de Menu Digital - SobogdQR"
  };

  const descriptions = {
    en: "Discover powerful features for your restaurant QR menu: AI translation, advanced analytics, smart shopping cart, and modern design. Perfect for restaurants and cafes.",
    es: "Descubre caracteristicas potentes para tu menu QR de restaurante: traduccion IA, analisis avanzados, carrito inteligente y diseno moderno. Perfecto para restaurantes y cafeterias."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://sobogdqr.com/${locale}/features`,
    },
  };
}

export default function FeaturesPage() {
  const t = useTranslations("features");

  const features = t.raw("list") as Array<{
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = featureIcons[feature.id as keyof typeof featureIcons];
            return (
              <Card key={feature.id} className="flex flex-col">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={`/features/${feature.id}`}>
                      {feature.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* HowTo Steps - noindex since not homepage */}
      <HowToSteps noIndex />
    </div>
  );
}
