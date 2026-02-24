import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { MenuFeed } from "@/components/menu-feed";
import { MenuHeader, MenuPageWrapper } from "../_components";
import { trackPageView } from "../_lib/track";
import { getCartFromCookies } from "@/lib/cart-server";

interface MenuListPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string; table?: string }>;
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
      whatsapp: true,
      ordersEnabled: true,
      orderMode: true,
      company: {
        select: { plan: true, orderLimit: true },
      },
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

export default async function MenuListPage({ params, searchParams }: MenuListPageProps) {
  const { slug, locale } = await params;
  const { preview, table } = await searchParams;
  const isPreview = preview === "1";
  if (!isPreview) trackPageView(slug, "menu", locale).catch(() => {});
  const [data, t, cartMap] = await Promise.all([
    getRestaurantWithMenu(slug),
    getTranslations("publicMenu"),
    getCartFromCookies(),
  ]);

  if (!data) {
    notFound();
  }

  const { restaurant, categories } = data;
  const defaultLanguage = restaurant.defaultLanguage || "en";

  // Check order limit for internal/both on FREE plan
  let ordersAvailable = restaurant.ordersEnabled;
  const mode = restaurant.orderMode || "whatsapp";
  if (ordersAvailable && (mode === "internal" || mode === "both") && restaurant.company.plan === "FREE") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyOrders = await prisma.order.count({
      where: { companyId: restaurant.companyId, createdAt: { gte: startOfMonth } },
    });
    if (monthlyOrders >= restaurant.company.orderLimit) {
      ordersAvailable = false;
    }
  }

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

  // Convert Decimal to number, apply translations, and filter out empty categories
  const categoriesWithItems = categories
    .filter((cat) => cat.items.length > 0)
    .map((cat) => ({
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
      <MenuHeader slug={slug} title={t("onlineMenu")} accentColor={restaurant.accentColor} isPreview={isPreview} />

      {/* Menu feed */}
      {categoriesWithItems.length === 0 ? (
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
          slug={slug}
          ordersEnabled={ordersAvailable}
          addLabel={t("order.add")}
          isPreview={isPreview}
          tableNumber={table}
          initialCart={Object.fromEntries(cartMap)}
        />
      )}
    </MenuPageWrapper>
  );
}
