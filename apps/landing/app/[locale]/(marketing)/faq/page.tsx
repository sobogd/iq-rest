import { getTranslations } from "next-intl/server";
import { JsonLd, createBreadcrumbSchema } from "../_lib";
import { CtaSection } from "../_components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://grandqr.com/${locale}/faq`,
      languages: {
        en: "https://grandqr.com/en/faq",
        es: "https://grandqr.com/es/faq",
        "x-default": "https://grandqr.com/en/faq",
      },
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://grandqr.com/${locale}/faq`,
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
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["https://grandqr.com/og-image.png"],
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("faq");
  const items = t.raw("questions") as Array<{
    question: string;
    answer: string;
  }>;

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("title") },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="w-full py-16 bg-background" aria-labelledby="faq-heading">
        <header className="text-center mb-16 px-4">
          <h1 id="faq-heading" className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
          <p className="text-lg md:text-xl text-muted-foreground">{t("subtitle")}</p>
        </header>

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4" role="list" aria-label="Frequently asked questions">
              {items.map((item, index) => (
                <article key={index} className="p-6 border rounded-lg bg-card" role="listitem">
                  <h2 className="text-lg font-semibold mb-3">{item.question}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
