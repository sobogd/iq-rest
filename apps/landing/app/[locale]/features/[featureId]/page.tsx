import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Languages, BarChart3, ShoppingCart, Palette, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const featureIcons = {
  'ai-translation': Languages,
  'analytics': BarChart3,
  'shopping-cart': ShoppingCart,
  'modern-design': Palette,
};

const validFeatureIds = ['ai-translation', 'analytics', 'shopping-cart', 'modern-design'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string; featureId: string }> }): Promise<Metadata> {
  const { locale, featureId } = await params;

  if (!validFeatureIds.includes(featureId)) {
    return {};
  }

  const metadataMap = {
    en: {
      'ai-translation': {
        title: "AI-Powered Menu Translation for Restaurant & Cafe | Multilingual QR Menu - SobogdQR",
        description: "Translate your restaurant or cafe menu instantly into multiple languages with AI. Serve international customers effortlessly with automatic menu translation powered by advanced artificial intelligence."
      },
      'analytics': {
        title: "Restaurant Menu Analytics & Insights | Track QR Menu Performance - SobogdQR",
        description: "Understand customer behavior with detailed menu analytics. Track views, clicks, and cart additions for every dish. Optimize your restaurant or cafe menu to increase sales with data-driven insights."
      },
      'shopping-cart': {
        title: "Smart Shopping Cart for Restaurant QR Menu | Order Management - SobogdQR",
        description: "Streamline restaurant service with intelligent shopping cart. Customers can build orders, see totals instantly, and show complete orders to waiters. Perfect for improving order accuracy in restaurants and cafes."
      },
      'modern-design': {
        title: "Modern QR Menu Design | Light & Dark Themes for Restaurant - SobogdQR",
        description: "Impress customers with sleek, modern menu design. Your restaurant or cafe QR menu adapts automatically to light and dark themes, ensuring perfect readability anytime."
      }
    },
    es: {
      'ai-translation': {
        title: "Traduccion de Menu con IA para Restaurante y Cafeteria | Menu QR Multilingue - SobogdQR",
        description: "Traduce el menu de tu restaurante o cafeteria instantaneamente a multiples idiomas con IA. Sirve a clientes internacionales sin esfuerzo con traduccion automatica de menu impulsada por inteligencia artificial avanzada."
      },
      'analytics': {
        title: "Analisis e Informacion del Menu de Restaurante | Seguimiento del Rendimiento del Menu QR - SobogdQR",
        description: "Comprende el comportamiento del cliente con analisis detallados del menu. Rastrea vistas, clics y adiciones al carrito de cada plato. Optimiza el menu de tu restaurante o cafeteria para aumentar las ventas con informacion basada en datos."
      },
      'shopping-cart': {
        title: "Carrito de Compras Inteligente para Menu QR de Restaurante | Gestion de Pedidos - SobogdQR",
        description: "Optimiza el servicio del restaurante con carrito inteligente. Los clientes pueden construir pedidos, ver totales instantaneamente y mostrar pedidos completos a los meseros. Perfecto para mejorar la precision de pedidos en restaurantes y cafeterias."
      },
      'modern-design': {
        title: "Diseno Moderno de Menu QR | Temas Claro y Oscuro para Restaurante - SobogdQR",
        description: "Impresiona a los clientes con un diseno de menu elegante y moderno. Tu menu QR de restaurante o cafeteria se adapta automaticamente a temas claros y oscuros, asegurando una legibilidad perfecta en cualquier momento."
      }
    }
  };

  const metadata = metadataMap[locale as keyof typeof metadataMap]?.[featureId as keyof typeof metadataMap.en] ||
                   metadataMap.en[featureId as keyof typeof metadataMap.en];

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `https://yourdomain.com/${locale}/features/${featureId}`,
    },
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ locale: string; featureId: string }> }) {
  const { locale, featureId } = await params;

  if (!validFeatureIds.includes(featureId)) {
    notFound();
  }

  const t = await getTranslations("features");
  const features = t.raw("list") as Array<{
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    cta: string;
  }>;

  const feature = features.find((f) => f.id === featureId);

  if (!feature) {
    notFound();
  }

  const Icon = featureIcons[featureId as keyof typeof featureIcons];
  const isEnglish = locale === 'en';

  const featureJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareFeature',
    name: feature.title,
    description: feature.description,
  };

  const contentMap = {
    'ai-translation': {
      subtitle: {
        en: "Automatic Translation for Global Reach",
        es: "Traduccion Automatica para Alcance Global"
      },
      paragraphs: [
        {
          en: "Break down language barriers and serve customers from around the world. Our AI-powered translation system instantly translates your entire menu into multiple languages, making your restaurant or cafe accessible to international visitors and tourists.",
          es: "Rompe las barreras del idioma y sirve a clientes de todo el mundo. Nuestro sistema de traduccion impulsado por IA traduce instantaneamente todo tu menu a multiples idiomas, haciendo tu restaurante o cafeteria accesible para visitantes internacionales y turistas."
        },
        {
          en: "The translation happens in real-time, ensuring that any updates to your menu are immediately available in all languages. This means you never have to worry about outdated translations or manually translating new items.",
          es: "La traduccion ocurre en tiempo real, asegurando que cualquier actualizacion de tu menu este disponible inmediatamente en todos los idiomas. Esto significa que nunca tienes que preocuparte por traducciones desactualizadas o traducir manualmente nuevos articulos."
        }
      ]
    },
    'analytics': {
      subtitle: {
        en: "Data-Driven Menu Optimization",
        es: "Optimizacion del Menu Basada en Datos"
      },
      paragraphs: [
        {
          en: "Make informed decisions about your menu with comprehensive analytics. Track which dishes are viewed most, which ones customers add to their cart, and identify patterns in customer behavior.",
          es: "Toma decisiones informadas sobre tu menu con analisis completos. Rastrea que platos se ven mas, cuales agregan los clientes a su carrito e identifica patrones en el comportamiento del cliente."
        },
        {
          en: "Our analytics dashboard provides clear insights into menu performance, helping you optimize pricing, identify popular items, and discover opportunities to increase revenue. Use data to create the perfect menu for your customers.",
          es: "Nuestro panel de analisis proporciona informacion clara sobre el rendimiento del menu, ayudandote a optimizar precios, identificar articulos populares y descubrir oportunidades para aumentar los ingresos. Usa datos para crear el menu perfecto para tus clientes."
        }
      ]
    },
    'shopping-cart': {
      subtitle: {
        en: "Enhanced Order Experience",
        es: "Experiencia de Pedido Mejorada"
      },
      paragraphs: [
        {
          en: "Transform the ordering experience with an intelligent shopping cart system. Customers can browse your menu, add items they want, and see their order total in real-time before calling a waiter.",
          es: "Transforma la experiencia de pedido con un sistema inteligente de carrito de compras. Los clientes pueden navegar tu menu, agregar articulos que desean y ver el total de su pedido en tiempo real antes de llamar a un mesero."
        },
        {
          en: "This feature improves order accuracy and reduces confusion. Customers can carefully review their selections, see exactly what they're paying, and show their complete order to the waiter. It's particularly helpful for large groups and complex orders.",
          es: "Esta caracteristica mejora la precision del pedido y reduce la confusion. Los clientes pueden revisar cuidadosamente sus selecciones, ver exactamente lo que estan pagando y mostrar su pedido completo al mesero. Es particularmente util para grupos grandes y pedidos complejos."
        }
      ]
    },
    'modern-design': {
      subtitle: {
        en: "Professional Menu Presentation",
        es: "Presentacion Profesional del Menu"
      },
      paragraphs: [
        {
          en: "First impressions matter. Your QR menu features a sleek, modern design that automatically adapts to your customer's device preferences. Whether they prefer light mode or dark mode, your menu will look perfect.",
          es: "Las primeras impresiones importan. Tu menu QR presenta un diseno elegante y moderno que se adapta automaticamente a las preferencias del dispositivo de tu cliente. Ya sea que prefieran modo claro o modo oscuro, tu menu se vera perfecto."
        },
        {
          en: "The design is optimized for readability and ease of use, with clear typography, beautiful spacing, and intuitive navigation. Your menu will look professional on any device, from phones to tablets, creating a memorable dining experience.",
          es: "El diseno esta optimizado para legibilidad y facilidad de uso, con tipografia clara, espaciado hermoso y navegacion intuitiva. Tu menu se vera profesional en cualquier dispositivo, desde telefonos hasta tabletas, creando una experiencia gastronomica memorable."
        }
      ]
    }
  };

  const content = contentMap[featureId as keyof typeof contentMap];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featureJsonLd) }}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/features">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {isEnglish ? "Back to Features" : "Volver a Caracteristicas"}
              </Link>
            </Button>
          </div>

          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {feature.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {feature.description}
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">
                {content.subtitle[locale as keyof typeof content.subtitle]}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph[locale as keyof typeof paragraph]}
                </p>
              ))}
            </CardContent>
          </Card>

          <div className="text-center">
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {isEnglish ? "Ready to Get Started?" : "Listo para Comenzar?"}
                </CardTitle>
                <CardDescription className="text-base">
                  {isEnglish
                    ? "Create your professional QR menu in minutes. All features included."
                    : "Crea tu menu QR profesional en minutos. Todas las caracteristicas incluidas."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/get-started">
                      {isEnglish ? "Get Started Free" : "Comenzar Gratis"}
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pricing">
                      {isEnglish ? "View Pricing" : "Ver Precios"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
