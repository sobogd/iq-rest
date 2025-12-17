import { getTranslations } from "next-intl/server";
import { ContactForm, CtaSection } from "../_components";
import { JsonLd, contactPageSchema, createBreadcrumbSchema } from "../_lib";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    en: "Contact Us - Get Help with Your Restaurant QR Menu | GrandQR",
    es: "Contáctanos - Obtén Ayuda con tu Menú QR de Restaurante | GrandQR",
  };

  const descriptions = {
    en: "Get in touch with the GrandQR team. We're here to help with your digital QR menu for restaurant or cafe. Personal support from real people.",
    es: "Ponte en contacto con el equipo de GrandQR. Estamos aquí para ayudarte con tu menú QR digital para restaurante o cafetería. Soporte personal de personas reales.",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://grandqr.com/${locale}/contacts`,
      languages: {
        en: "https://grandqr.com/en/contacts",
        es: "https://grandqr.com/es/contacts",
        "x-default": "https://grandqr.com/en/contacts",
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://grandqr.com/${locale}/contacts`,
      type: "website",
      images: [
        {
          url: "https://grandqr.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "GrandQR - QR Menu for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ["https://grandqr.com/og-image.png"],
    },
  };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("contacts");

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("title") },
  ]);

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="text-center mb-16 px-4 pt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          {t("subtitle")}
        </p>
        <div className="flex justify-center">
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden">
            <Image
              src="/contacts.webp"
              alt="Bogdan's photos"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>

      <CtaSection />
    </>
  );
}
