import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

interface SortItem {
  id: string;
  sortOrder: number;
}

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await request.json() as { items: SortItem[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: items array required" },
        { status: 400 }
      );
    }

    // Verify all categories belong to this company
    const categoryIds = items.map((item) => item.id);
    const existingCategories = await prisma.category.findMany({
      where: {
        id: { in: categoryIds },
        companyId,
      },
      select: { id: true },
    });

    if (existingCategories.length !== items.length) {
      return NextResponse.json(
        { error: "Some categories not found or unauthorized" },
        { status: 400 }
      );
    }

    // Batch update all sort orders
    await prisma.$transaction(
      items.map((item) =>
        prisma.category.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );

    // Return updated categories list
    const categories = await prisma.category.findMany({
      where: { companyId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error reordering categories:", error);
    return NextResponse.json(
      { error: "Failed to reorder categories" },
      { status: 500 }
    );
  }
}
