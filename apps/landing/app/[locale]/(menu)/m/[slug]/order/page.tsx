import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { OrderForm } from "./order-form";
import { MenuHeader, MenuPageWrapper } from "../_components";
import { trackPageView } from "../_lib/track";
import { getCartFromCookies } from "@/lib/cart-server";

interface OrderPageProps {
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
      orderNameEnabled: true,
      orderPhoneEnabled: true,
      orderAddressEnabled: true,
      orderMode: true,
      company: {
        select: { plan: true, orderLimit: true },
      },
    },
  });

  if (!restaurant) return null;

  const [categories, tables] = await Promise.all([
    prisma.category.findMany({
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
            price: true,
            translations: true,
          },
        },
      },
    }),
    prisma.table.findMany({
      where: { restaurantId: restaurant.id, isActive: true },
      orderBy: { number: "asc" },
      select: { number: true },
    }),
  ]);

  return { restaurant, categories, tableNumbers: tables.map((t) => t.number) };
}

export default async function OrderPage({ params, searchParams }: OrderPageProps) {
  const { slug, locale } = await params;
  const { preview, table } = await searchParams;
  const isPreview = preview === "1";
  if (!isPreview) trackPageView(slug, "order", locale).catch(() => {});
  const [data, t, cartMap] = await Promise.all([
    getRestaurantWithMenu(slug),
    getTranslations("publicMenu"),
    getCartFromCookies(),
  ]);

  if (!data) {
    notFound();
  }

  const { restaurant, categories, tableNumbers } = data;
  const hasTable = !!table;
  const mode = restaurant.orderMode || "whatsapp";

  // For whatsapp mode, require whatsapp number. For internal, no whatsapp needed.
  if (!restaurant.ordersEnabled) {
    redirect(`/${locale}/m/${slug}`);
  }
  if (mode === "whatsapp" && !restaurant.whatsapp) {
    redirect(`/${locale}/m/${slug}`);
  }

  // Block order page if limit reached (internal/both, FREE plan)
  if ((mode === "internal" || mode === "both") && restaurant.company.plan === "FREE") {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyOrders = await prisma.order.count({
      where: { companyId: restaurant.companyId, createdAt: { gte: startOfMonth } },
    });
    if (monthlyOrders >= restaurant.company.orderLimit) {
      redirect(`/${locale}/m/${slug}/menu`);
    }
  }

  const defaultLanguage = restaurant.defaultLanguage || "en";

  const getTranslatedValue = (
    translations: Translations | null,
    field: keyof TranslationData,
    fallback: string | null
  ): string | null => {
    if (locale === defaultLanguage) return fallback;
    const trans = translations as Translations | null;
    return trans?.[locale]?.[field] || fallback;
  };

  // Build flat items list with translated names
  const items = categories.flatMap((cat) =>
    cat.items.map((item) => ({
      id: item.id,
      name: getTranslatedValue(item.translations as Translations, "name", item.name) || item.name,
      price: Number(item.price),
    }))
  );

  const translations = {
    yourOrder: t("order.yourOrder"),
    emptyCart: t("order.emptyCart"),
    total: t("order.total"),
    yourName: t("order.yourName"),
    namePlaceholder: t("order.namePlaceholder"),
    yourPhone: t("order.yourPhone"),
    phonePlaceholder: t("order.phonePlaceholder"),
    yourAddress: t("order.yourAddress"),
    addressPlaceholder: t("order.addressPlaceholder"),
    comment: t("order.comment"),
    commentPlaceholder: t("order.commentPlaceholder"),
    sendWhatsApp: t("order.sendWhatsApp"),
    sendOrder: t("order.sendOrder"),
    tableLabel: t("order.tableLabel"),
    continue: t("order.continue"),
    clearCart: t("order.clearCart"),
    orderLimitReached: t("order.orderLimitReached"),
  };

  return (
    <MenuPageWrapper>
      <MenuHeader slug={slug} title={translations.yourOrder} sticky accentColor={restaurant.accentColor} isPreview={isPreview} backHref={`/m/${slug}/menu${isPreview ? "?preview=1" : ""}`} />

      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full">
          <OrderForm
            items={items}
            initialCart={Object.fromEntries(cartMap)}
            currency={restaurant.currency}
            whatsapp={restaurant.whatsapp || ""}
            restaurantTitle={restaurant.title}
            accentColor={restaurant.accentColor}
            translations={translations}
            slug={slug}
            isPreview={isPreview}
            nameEnabled={restaurant.orderNameEnabled}
            phoneEnabled={restaurant.orderPhoneEnabled}
            addressEnabled={restaurant.orderAddressEnabled}
            orderMode={mode}
            tableNumber={table ? parseInt(table, 10) : undefined}
            needsTableStep={!hasTable && tableNumbers.length > 0}
          />
        </div>
      </main>
    </MenuPageWrapper>
  );
}
