import { getTranslations } from "next-intl/server";
import { JsonLd, createWebPageSchema } from "../_lib";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Privacy Policy - IQ Rest",
    es: "Política de Privacidad - IQ Rest",
  };

  const descriptions = {
    en: "Privacy Policy for IQ Rest - QR menu solution for restaurants and cafes. Learn how we collect, use, and protect your data.",
    es: "Política de Privacidad de IQ Rest - solución de menú QR para restaurantes y cafeterías. Aprende cómo recopilamos, usamos y protegemos tus datos.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/privacy`,
      languages: {
        en: "https://iq-rest.com/en/privacy",
        es: "https://iq-rest.com/es/privacy",
        "x-default": "https://iq-rest.com/en/privacy",
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://iq-rest.com/${locale}/privacy`,
      type: "website",
      images: [
        {
          url: "https://iq-rest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "IQ Rest - Privacy Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("privacy");

  const sections = t.raw("sections") as Array<{
    title: string;
    content: string[];
  }>;

  const webPageSchema = createWebPageSchema(
    t("title"),
    "Privacy Policy for IQ Rest - QR menu solution for restaurants and cafes",
    `https://iq-rest.com/${locale}/privacy`
  );

  return (
    <>
      <JsonLd data={webPageSchema} />
      <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-center mb-12">
          {t("lastUpdated")}
        </p>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground">{t("contact.description")}</p>
          <p className="text-muted-foreground mt-2">
            <strong>Email:</strong> support@iq-rest.com
          </p>
          <p className="text-muted-foreground mt-1">
            <strong>{t("contact.controller")}:</strong> Bogdan Sokolov (Autónomo), NIE: Z1894474S
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
