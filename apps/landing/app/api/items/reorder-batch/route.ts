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

    const { categoryId, items } = await request.json() as { categoryId: string; items: SortItem[] };

    if (!categoryId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: categoryId and items array required" },
        { status: 400 }
      );
    }

    // Verify the category belongs to this company
    const category = await prisma.category.findFirst({
      where: { id: categoryId, companyId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found or unauthorized" },
        { status: 400 }
      );
    }

    // Verify all items belong to this company and category
    const itemIds = items.map((item) => item.id);
    const existingItems = await prisma.item.findMany({
      where: {
        id: { in: itemIds },
        companyId,
        categoryId,
      },
      select: { id: true },
    });

    if (existingItems.length !== items.length) {
      return NextResponse.json(
        { error: "Some items not found or unauthorized" },
        { status: 400 }
      );
    }

    // Batch update all sort orders
    await prisma.$transaction(
      items.map((item) =>
        prisma.item.update({
          where: { id: item.id },
          data: { sortOrder: item.sortOrder },
        })
      )
    );

    // Return updated items list for this category
    const updatedItems = await prisma.item.findMany({
      where: { companyId, categoryId },
      orderBy: { sortOrder: "asc" },
      include: {
        category: {
          select: { id: true, name: true, sortOrder: true },
        },
      },
    });

    const serializedItems = updatedItems.map((i) => ({
      ...i,
      price: Number(i.price),
    }));

    return NextResponse.json(serializedItems);
  } catch (error) {
    console.error("Error reordering items:", error);
    return NextResponse.json(
      { error: "Failed to reorder items" },
      { status: 500 }
    );
  }
}
