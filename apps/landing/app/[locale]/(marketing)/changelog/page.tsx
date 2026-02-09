import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { HowToSteps } from "../_components";
import { JsonLd, createBreadcrumbSchema, buildAlternates } from "../_lib";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/changelog`,
      languages: buildAlternates("/changelog"),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `https://iq-rest.com/${locale}/changelog`,
      type: "website",
      images: [
        {
          url: "https://iq-rest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "IQ Rest - QR Menu for Restaurants",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["https://iq-rest.com/og-image.png"],
    },
  };
}

const CHANGELOG_ENTRIES = [
  {
    id: "support-qr-menu-restaurant-cafe",
    date: "2025-12-02",
    titleKey: "entries.support-qr-menu-restaurant-cafe.title",
    descriptionKey: "entries.support-qr-menu-restaurant-cafe.description",
  },
  {
    id: "detailed-analytics-restaurant-qr-menu-website",
    date: "2025-12-02",
    titleKey: "entries.detailed-analytics-restaurant-qr-menu-website.title",
    descriptionKey:
      "entries.detailed-analytics-restaurant-qr-menu-website.description",
  },
  {
    id: "instant-qr-menu-restaurant-website-generator",
    date: "2025-12-01",
    titleKey: "entries.instant-qr-menu-restaurant-website-generator.title",
    descriptionKey:
      "entries.instant-qr-menu-restaurant-website-generator.description",
  },
  {
    id: "subscription-plans-qr-menu-restaurant-website",
    date: "2025-11-30",
    titleKey: "entries.subscription-plans-qr-menu-restaurant-website.title",
    descriptionKey:
      "entries.subscription-plans-qr-menu-restaurant-website.description",
  },
  {
    id: "public-restaurant-qr-menu-website",
    date: "2025-11-30",
    titleKey: "entries.public-restaurant-qr-menu-website.title",
    descriptionKey: "entries.public-restaurant-qr-menu-website.description",
  },
  {
    id: "add-items-restaurant-qr-menu-website",
    date: "2025-11-29",
    titleKey: "entries.add-items-restaurant-qr-menu-website.title",
    descriptionKey: "entries.add-items-restaurant-qr-menu-website.description",
  },
  {
    id: "qr-menu-restaurant-categories",
    date: "2025-11-29",
    titleKey: "entries.qr-menu-restaurant-categories.title",
    descriptionKey: "entries.qr-menu-restaurant-categories.description",
  },
  {
    id: "easy-qr-menu-cafe-control-panel",
    date: "2025-11-29",
    titleKey: "entries.easy-qr-menu-cafe-control-panel.title",
    descriptionKey: "entries.easy-qr-menu-cafe-control-panel.description",
  },
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
] as const;

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("changelog");

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("title") },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "IQ Rest Changelog",
    description:
      "Latest updates and new features for IQ Rest - digital QR menu solution for restaurants",
    url: "https://iq-rest.com/changelog",
    publisher: {
      "@type": "Organization",
      name: "IQ Rest",
      logo: {
        "@type": "ImageObject",
        url: "https://iq-rest.com/logo.svg",
      },
    },
    blogPost: CHANGELOG_ENTRIES.map((entry) => ({
      "@type": "BlogPosting",
      headline: t(entry.titleKey),
      description: t(entry.descriptionKey),
      datePublished: entry.date,
      url: `https://iq-rest.com/changelog/${entry.id}`,
      author: {
        "@type": "Organization",
        name: "IQ Rest",
      },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div className="space-y-4">
            {CHANGELOG_ENTRIES.map((entry) => (
              <Link
                key={entry.id}
                href={`/changelog/${entry.id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {t(entry.titleKey)}
                      </CardTitle>
                      <time
                        className="text-sm text-muted-foreground"
                        dateTime={entry.date}
                      >
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

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("seo.title")}</h2>
            <p className="text-muted-foreground">{t("seo.description")}</p>
          </div>
        </div>
      </div>
      <HowToSteps noIndex />
    </>
  );
}
