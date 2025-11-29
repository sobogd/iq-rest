import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface MenuListPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getRestaurantWithCategories(slug: string) {
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
      description: true,
    },
  });

  return { restaurant, categories };
}

export default async function MenuListPage({ params }: MenuListPageProps) {
  const { slug } = await params;
  const [data, t] = await Promise.all([
    getRestaurantWithCategories(slug),
    getTranslations("publicMenu"),
  ]);

  if (!data) {
    notFound();
  }

  const { categories } = data;

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

      {/* Categories list */}
      <div className="flex-1 overflow-auto">
        {categories.length === 0 ? (
          <div
            className="flex items-center justify-center h-full"
            style={{ color: "#9ca3af" }}
          >
            {t("noCategories")}
          </div>
        ) : (
          <div className="py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/m/${slug}/menu/${category.id}`}
                className="block px-4 py-4 border-b hover:bg-gray-50 transition-colors"
                style={{ borderColor: "#f3f4f6" }}
              >
                <h2 className="font-semibold text-lg" style={{ color: "#000" }}>
                  {category.name}
                </h2>
                {category.description && (
                  <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                    {category.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
