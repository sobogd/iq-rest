import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { MenuFeed } from "@/components/menu-feed";

interface MenuListPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getRestaurantWithMenu(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      companyId: true,
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
      items: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          imageUrl: true,
        },
      },
    },
  });

  return { restaurant, categories };
}

export default async function MenuListPage({ params }: MenuListPageProps) {
  const { slug } = await params;
  const [data, t] = await Promise.all([
    getRestaurantWithMenu(slug),
    getTranslations("publicMenu"),
  ]);

  if (!data) {
    notFound();
  }

  const { categories } = data;

  // Convert Decimal to number for client component
  const categoriesWithItems = categories.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({
      ...item,
      price: Number(item.price),
    })),
  }));

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: "#fff" }}>
      {/* Header - black */}
      <div
        className="h-14 flex items-center px-4 shrink-0"
        style={{ backgroundColor: "#000" }}
      >
        <Link href={`/m/${slug}`} className="p-2 -ml-2" style={{ color: "#fff" }}>
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="ml-2 text-lg font-semibold" style={{ color: "#fff" }}>
          {t("onlineMenu")}
        </h1>
      </div>

      {/* Menu feed */}
      {categories.length === 0 ? (
        <div
          className="flex-1 flex items-center justify-center"
          style={{ color: "#9ca3af" }}
        >
          {t("noCategories")}
        </div>
      ) : (
        <MenuFeed categories={categoriesWithItems} />
      )}
    </div>
  );
}
