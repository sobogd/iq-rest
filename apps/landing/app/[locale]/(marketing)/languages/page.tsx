import { getTranslations } from "next-intl/server";
import { locales } from "@/i18n/routing";
import { JsonLd, createBreadcrumbSchema, buildAlternates } from "../_lib";
import { PageView } from "@/components/PageView";
import type { Metadata } from "next";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
  pl: "Polski",
  ru: "Русский",
  uk: "Українська",
  sv: "Svenska",
  da: "Dansk",
  no: "Norsk",
  fi: "Suomi",
  cs: "Čeština",
  el: "Ελληνικά",
  tr: "Türkçe",
  ro: "Română",
  hu: "Magyar",
  bg: "Български",
  hr: "Hrvatski",
  sk: "Slovenčina",
  sl: "Slovenščina",
  et: "Eesti",
  lv: "Latviešu",
  lt: "Lietuvių",
  sr: "Српски",
  ca: "Català",
  ga: "Gaeilge",
  is: "Íslenska",
  fa: "فارسی",
  ar: "العربية",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "languages" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://iq-rest.com/${locale}/languages`,
      languages: buildAlternates("/languages"),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://iq-rest.com/${locale}/languages`,
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

export default async function LanguagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("languages");

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: "Home", path: "" },
    { name: t("title") },
  ]);

  return (
    <>
      <PageView slug="languages" />
      <JsonLd data={breadcrumbSchema} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h1>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {locales.map((code) => (
              <a
                key={code}
                href={`/${code}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  code === locale
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <span className="text-xs uppercase opacity-60 w-5">{code}</span>
                <span className="text-sm font-medium">{LANGUAGE_NAMES[code] || code}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
