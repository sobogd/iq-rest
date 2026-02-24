import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { OrderForm } from "./order-form";
import { MenuHeader, MenuPageWrapper } from "../_components";
import { trackPageView } from "../_lib/track";

interface OrderPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string }>;
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
          price: true,
          translations: true,
        },
      },
    },
  });

  return { restaurant, categories };
}

export default async function OrderPage({ params, searchParams }: OrderPageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  if (!isPreview) trackPageView(slug, "order", locale).catch(() => {});
  const [data, t] = await Promise.all([
    getRestaurantWithMenu(slug),
    getTranslations("publicMenu"),
  ]);

  if (!data) {
    notFound();
  }

  const { restaurant, categories } = data;

  if (!restaurant.ordersEnabled || !restaurant.whatsapp) {
    redirect(`/${locale}/m/${slug}`);
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
    clearCart: t("order.clearCart"),
    orderLimitReached: t("order.orderLimitReached"),
  };

  return (
    <MenuPageWrapper slug={slug}>
      <MenuHeader slug={slug} title={translations.yourOrder} sticky accentColor={restaurant.accentColor} isPreview={isPreview} backHref={`/m/${slug}/menu${isPreview ? "?preview=1" : ""}`} />

      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full">
          <OrderForm
            items={items}
            currency={restaurant.currency}
            whatsapp={restaurant.whatsapp}
            restaurantTitle={restaurant.title}
            accentColor={restaurant.accentColor}
            translations={translations}
            slug={slug}
            isPreview={isPreview}
            nameEnabled={restaurant.orderNameEnabled}
            phoneEnabled={restaurant.orderPhoneEnabled}
            addressEnabled={restaurant.orderAddressEnabled}
          />
        </div>
      </main>
    </MenuPageWrapper>
  );
}
