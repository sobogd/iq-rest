import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

export default function ChangelogPage() {
  const t = useTranslations("changelog");

  const entries = [
    {
      id: "user-authentication-interface",
      date: "2024-11-19",
      titleKey: "entries.auth.title",
      descriptionKey: "entries.auth.description",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <Link key={entry.id} href={`/changelog/${entry.id}`}>
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
  );
}
