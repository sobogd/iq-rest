import { getTranslations } from "next-intl/server";
import { JsonLd, createWebPageSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/terms`,
      languages: buildAlternates("/terms"),
    },
    openGraph: {
      title,
      description,
      url: `https://iq-rest.com/${locale}/terms`,
      type: "website",
      images: [{ url: "https://iq-rest.com/og-image.png", width: 1200, height: 630, alt: "IQ Rest - Terms and Conditions" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("terms");

  const sections = t.raw("sections") as Array<{
    title: string;
    content: string[];
  }>;

  const webPageSchema = createWebPageSchema(
    t("title"),
    "Terms and Conditions for using IQ Rest - QR menu solution for restaurants and cafes",
    `https://iq-rest.com/${locale}/terms`
  );

  return (
    <>
      <PageView slug="terms" />
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
        </div>
      </div>
    </div>
    </>
  );
}
