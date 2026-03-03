import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { MenuFeed } from "@/components/menu-feed";
import { MenuHeader, MenuPageWrapper } from "../_components";
import { trackPageView } from "../_lib/track";
import { getRestaurantBySlug } from "../_lib/get-restaurant";
import { getCartFromCookies } from "@/lib/cart-server";

export const revalidate = 300;

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return {};

  const title = `${restaurant.title} — Menu`;
  return {
    title,
    description: restaurant.description || title,
    openGraph: {
      title,
      description: restaurant.description || title,
      ...(restaurant.source && !restaurant.source.match(/\.(mp4|webm|mov)$/i)
        ? { images: [{ url: restaurant.source }] }
        : {}),
    },
  };
}

export default async function MenuListPage({ params, searchParams }: MenuListPageProps) {
  const { slug, locale } = await params;
  const { preview, table } = await searchParams;
  const isPreview = preview === "1";
  if (!isPreview) trackPageView(slug, "menu", locale).catch(() => {});
  const [restaurant, t, cartMap] = await Promise.all([
    getRestaurantBySlug(slug),
    getTranslations("publicMenu"),
    getCartFromCookies(),
  ]);

  if (!restaurant) {
    notFound();
  }

  const defaultLanguage = restaurant.defaultLanguage || "en";

  // Fetch categories separately
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

  // JSON-LD for menu
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${restaurant.title} — Menu`,
    hasMenuSection: categoriesWithItems.map((cat) => ({
      "@type": "MenuSection",
      name: cat.name,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.description && { description: item.description }),
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: restaurant.currency,
        },
        ...(item.imageUrl && { image: item.imageUrl }),
      })),
    })),
  };

  return (
    <MenuPageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
          allergenNames={t.raw("allergenNames") as Record<string, string>}
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
