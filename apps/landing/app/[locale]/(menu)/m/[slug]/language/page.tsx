import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { MenuHeader, MenuPageWrapper, LanguageLink } from "../_components";
import { trackPageView } from "../_lib/track";

interface LanguagePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string }>;
}

async function getRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      languages: true,
      defaultLanguage: true,
      accentColor: true,
    },
  });
  return restaurant;
}

export default async function LanguagePage({ params, searchParams }: LanguagePageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const [restaurant, t] = await Promise.all([
    getRestaurant(slug),
    getTranslations("publicMenu"),
    ...(!isPreview ? [trackPageView(slug, "language", locale)] : []),
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

  const previewParam = isPreview ? "?preview=1" : "";

  return (
    <MenuPageWrapper slug={slug}>
      {/* Header */}
      <MenuHeader slug={slug} title={t("language")} accentColor={restaurant.accentColor} isPreview={isPreview} />

      {/* Language list */}
      <nav className="flex-1 pt-5 bg-white flex justify-center">
        <div className="max-w-[440px] w-full">
          {languages.map((lang) => (
            <LanguageLink
              key={lang.code}
              href={`/m/${slug}${previewParam}`}
              locale={lang.code}
              className="h-14 flex items-center justify-between border-b border-gray-100 text-black px-5"
            >
              <span className="font-medium">{lang.name}</span>
              {locale === lang.code && <Check className="h-5 w-5" />}
            </LanguageLink>
          ))}
        </div>
      </nav>
    </MenuPageWrapper>
  );
}
