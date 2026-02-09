import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { MenuFeed } from "@/components/menu-feed";
import { MenuHeader, MenuPageWrapper } from "../_components";

interface MenuListPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

type TranslationData = {
  name?: string;
  description?: string;
};

type Translations = Record<string, TranslationData>;

async function getRestaurantWithMenu(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      companyId: true,
      defaultLanguage: true,
      accentColor: true,
      currency: true,
    },
  });

  if (!restaurant) return null;

  const categories = await prisma.category.findMany({
    where: {
      companyId: restaurant.companyId,
      isActive: true,
    },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      translations: true,
      items: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
          allergens: true,
          translations: true,
        },
      },
    },
  });

  return { restaurant, categories };
}

export default async function MenuListPage({ params }: MenuListPageProps) {
  const { slug, locale } = await params;
  const [data, t] = await Promise.all([
    getRestaurantWithMenu(slug),
    getTranslations("publicMenu"),
  ]);

  if (!data) {
    notFound();
  }

  const { restaurant, categories } = data;
  const defaultLanguage = restaurant.defaultLanguage || "en";

  // Helper to get translated value
  const getTranslatedValue = (
    translations: Translations | null,
    field: keyof TranslationData,
    fallback: string | null
  ): string | null => {
    if (locale === defaultLanguage) return fallback;
    const trans = translations as Translations | null;
    return trans?.[locale]?.[field] || fallback;
  };

  // Convert Decimal to number and apply translations
  const categoriesWithItems = categories.map((cat) => ({
    id: cat.id,
    name: getTranslatedValue(cat.translations as Translations, "name", cat.name) || cat.name,
    items: cat.items.map((item) => ({
      id: item.id,
      name: getTranslatedValue(item.translations as Translations, "name", item.name) || item.name,
      description: getTranslatedValue(item.translations as Translations, "description", item.description),
      price: Number(item.price),
      imageUrl: item.imageUrl,
      allergens: item.allergens,
    })),
  }));

  return (
    <MenuPageWrapper slug={slug}>
      {/* Header */}
      <MenuHeader slug={slug} title={t("onlineMenu")} accentColor={restaurant.accentColor} />

      {/* Menu feed */}
      {categories.length === 0 ? (
        <div
          className="flex-1 flex items-center justify-center"
          style={{ color: "#9ca3af" }}
        >
          {t("noCategories")}
        </div>
      ) : (
        <MenuFeed
          categories={categoriesWithItems}
          accentColor={restaurant.accentColor}
          currency={restaurant.currency}
          allergenTranslations={{
            title: t("allergens"),
            info: t("allergensInfo"),
            names: t.raw("allergenNames") as Record<string, string>,
          }}
        />
      )}
    </MenuPageWrapper>
  );
}
