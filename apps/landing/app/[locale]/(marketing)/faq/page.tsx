import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
    },
  };
}

export default async function FAQPage() {
  const t = await getTranslations("faq");
  const items = t.raw("questions") as Array<{ question: string; answer: string }>;

  // FAQPage Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="w-full py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
              <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
            </div>

            {/* FAQ Cards */}
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="p-6 border rounded-lg bg-card">
                  <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
