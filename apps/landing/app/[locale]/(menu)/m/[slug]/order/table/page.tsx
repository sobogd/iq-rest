import { notFound, redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { TableSelect } from "./table-select";
import { MenuHeader, MenuPageWrapper } from "../../_components";

interface TablePageProps {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

async function getRestaurantWithTables(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      companyId: true,
      accentColor: true,
      currency: true,
      whatsapp: true,
      ordersEnabled: true,
      orderMode: true,
    },
  });

  if (!restaurant) return null;

  const tables = await prisma.table.findMany({
    where: { restaurantId: restaurant.id, isActive: true },
    orderBy: { number: "asc" },
    select: {
      id: true,
      number: true,
      capacity: true,
      zone: true,
      translations: true,
      imageUrl: true,
    },
  });

  return { restaurant, tables };
}

export default async function TablePage({ params, searchParams }: TablePageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";

  const [data, t] = await Promise.all([
    getRestaurantWithTables(slug),
    getTranslations("publicMenu"),
  ]);

  if (!data) notFound();

  const { restaurant, tables } = data;

  if (!restaurant.ordersEnabled) {
    redirect(`/${locale}/m/${slug}`);
  }

  const tr = await getTranslations("reservations");

  const translations = {
    selectTable: t("order.selectTable"),
    tableLabel: t("order.tableLabel"),
    table: tr("table"),
    guests: tr("guests"),
    sendWhatsApp: t("order.sendWhatsApp"),
    sendOrder: t("order.sendOrder"),
    orderLimitReached: t("order.orderLimitReached"),
  };

  const serializedTables = tables.map((tbl) => ({
    id: tbl.id,
    number: tbl.number,
    capacity: tbl.capacity,
    zone: tbl.zone,
    translations: tbl.translations as Record<string, { zone?: string }> | null,
    imageUrl: tbl.imageUrl,
  }));

  return (
    <MenuPageWrapper>
      <MenuHeader
        slug={slug}
        title={translations.selectTable}
        sticky
        accentColor={restaurant.accentColor}
        isPreview={isPreview}
        backHref={`/m/${slug}/order${isPreview ? "?preview=1" : ""}`}
      />
      <main className="flex-1 flex justify-center px-5 py-6 bg-white overflow-auto">
        <div className="max-w-[440px] w-full">
          <TableSelect
            tables={serializedTables}
            slug={slug}
            locale={locale}
            currency={restaurant.currency}
            whatsapp={restaurant.whatsapp || ""}
            restaurantTitle={restaurant.title}
            accentColor={restaurant.accentColor}
            orderMode={restaurant.orderMode || "whatsapp"}
            isPreview={isPreview}
            translations={translations}
          />
        </div>
      </main>
    </MenuPageWrapper>
  );
}
