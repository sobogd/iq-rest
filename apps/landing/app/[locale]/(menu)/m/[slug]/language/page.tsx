import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface LanguagePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      languages: true,
      defaultLanguage: true,
    },
  });
  return restaurant;
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { slug, locale } = await params;
  const [restaurant, t] = await Promise.all([
    getRestaurant(slug),
    getTranslations("publicMenu"),
  ]);

  if (!restaurant) {
    notFound();
  }

  const languageNames: Record<string, string> = {
    en: "English",
    es: "Español",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
    pt: "Português",
    ru: "Русский",
    zh: "中文",
    ja: "日本語",
    ko: "한국어",
  };

  const languages = restaurant.languages
    .map((code) => ({
      code,
      name: languageNames[code] || code,
    }))
    .sort((a, b) => {
      // Default language first
      if (a.code === restaurant.defaultLanguage) return -1;
      if (b.code === restaurant.defaultLanguage) return 1;
      return 0;
    });

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: "#fff" }}>
      {/* Header - black */}
      <div
        className="h-14 flex items-center px-4"
        style={{ backgroundColor: "#000" }}
      >
        <Link href={`/m/${slug}`} className="p-2 -ml-2" style={{ color: "#fff" }}>
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="ml-2 text-lg font-semibold" style={{ color: "#fff" }}>{t("language")}</h1>
      </div>

      {/* Language list */}
      <div className="flex-1" style={{ backgroundColor: "#fff" }}>
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={`/m/${slug}`}
            locale={lang.code}
            className="h-14 px-4 flex items-center justify-between border-b"
            style={{ color: "#000", borderColor: "#f3f4f6" }}
          >
            <span className="font-medium">{lang.name}</span>
            {locale === lang.code && (
              <Check className="h-5 w-5" style={{ color: "#000" }} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
