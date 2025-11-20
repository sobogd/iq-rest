import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import HowToSteps from "@/components/HowToSteps";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });

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

export default async function ChangelogPage() {
  const t = await getTranslations("changelog");

  const entries = [
    {
      id: "faq-page-organization",
      date: "2025-11-20",
      titleKey: "entries.faq-page-organization.title",
      descriptionKey: "entries.faq-page-organization.description",
    },
    {
      id: "free-restaurant-website-improvements",
      date: "2025-11-20",
      titleKey: "entries.free-restaurant-website-improvements.title",
      descriptionKey: "entries.free-restaurant-website-improvements.description",
    },
    {
      id: "get-started-page-redesign",
      date: "2025-11-19",
      titleKey: "entries.landing-redesign.title",
      descriptionKey: "entries.landing-redesign.description",
    },
    {
      id: "user-authentication-interface",
      date: "2024-11-19",
      titleKey: "entries.auth.title",
      descriptionKey: "entries.auth.description",
    },
  ];

  // Blog/ItemList Schema for SEO
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SobogdQR Changelog",
    description: "Latest updates and new features for SobogdQR - digital QR menu solution for restaurants",
    url: "https://sobogdqr.com/changelog",
    publisher: {
      "@type": "Organization",
      name: "SobogdQR",
      logo: {
        "@type": "ImageObject",
        url: "https://sobogdqr.com/logo.svg"
      }
    },
    blogPost: entries.map((entry) => ({
      "@type": "BlogPosting",
      headline: t(entry.titleKey),
      description: t(entry.descriptionKey),
      datePublished: entry.date,
      url: `https://sobogdqr.com/changelog/${entry.id}`,
      author: {
        "@type": "Organization",
        name: "SobogdQR"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <Link key={entry.id} href={`/changelog/${entry.id}`} className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{t(entry.titleKey)}</CardTitle>
                    <time className="text-sm text-muted-foreground" dateTime={entry.date}>
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <CardDescription className="mt-2">
                    {t(entry.descriptionKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-primary text-sm font-medium">
                    {t("readMore")} →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* SEO Content */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("seo.title")}</h2>
          <p className="text-muted-foreground">{t("seo.description")}</p>
        </div>
      </div>
    </div>

    {/* HowTo Steps - noindex since not homepage */}
    <HowToSteps noIndex />
    </>
  );
}
