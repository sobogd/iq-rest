import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function GET() {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [restaurant, categoriesCount, itemsCount] = await Promise.all([
      prisma.restaurant.findFirst({
        where: { companyId },
        select: {
          title: true,
          slug: true,
          phone: true,
          instagram: true,
          whatsapp: true,
          address: true,
        },
      }),
      prisma.category.count({ where: { companyId } }),
      prisma.item.count({ where: { companyId } }),
    ]);

    const progress = {
      hasInfo: Boolean(
        restaurant?.title && restaurant.title.trim().length > 0 &&
        restaurant?.slug && restaurant.slug.trim().length > 0
      ),
      hasCategories: categoriesCount > 0,
      hasItems: itemsCount > 0,
      hasContacts: Boolean(
        restaurant?.phone ||
        restaurant?.instagram ||
        restaurant?.whatsapp ||
        restaurant?.address
      ),
    };

    const requiredCompleted =
      progress.hasInfo &&
      progress.hasCategories &&
      progress.hasItems &&
      progress.hasContacts;

    return NextResponse.json({
      progress,
      requiredCompleted,
      slug: restaurant?.slug || null,
    });
  } catch (error) {
    console.error("Error fetching onboarding progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
