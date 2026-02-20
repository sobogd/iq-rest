import { getTranslations } from "next-intl/server";
import { ContactForm, CtaSection } from "../_components";
import { JsonLd, createContactPageSchema, createBreadcrumbSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/contacts`,
      languages: buildAlternates("/contacts"),
    },
    openGraph: {
      title,
      description,
      url: `https://iq-rest.com/${locale}/contacts`,
      type: "website",
      images: [{ url: "https://iq-rest.com/og-image.png", width: 1200, height: 630, alt: "IQ Rest - QR Menu for Restaurants" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iq-rest.com/og-image.png"],
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
      <PageView slug="contacts" />
      <JsonLd data={createContactPageSchema(locale)} />
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
