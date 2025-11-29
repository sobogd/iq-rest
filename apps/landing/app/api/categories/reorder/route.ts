import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { categoryId, direction } = await request.json();

    if (!categoryId || !["up", "down"].includes(direction)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Get the category to move
    const category = await prisma.category.findFirst({
      where: { id: categoryId, companyId },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Find the adjacent category to swap with
    const adjacentCategory = await prisma.category.findFirst({
      where: {
        companyId,
        sortOrder: direction === "up"
          ? { lt: category.sortOrder }
          : { gt: category.sortOrder },
      },
      orderBy: {
        sortOrder: direction === "up" ? "desc" : "asc",
      },
    });

    if (!adjacentCategory) {
      // Already at the top or bottom
      return NextResponse.json({ message: "No change needed" });
    }

    // Swap sortOrder values
    await prisma.$transaction([
      prisma.category.update({
        where: { id: category.id },
        data: { sortOrder: adjacentCategory.sortOrder },
      }),
      prisma.category.update({
        where: { id: adjacentCategory.id },
        data: { sortOrder: category.sortOrder },
      }),
    ]);

    // Return updated categories list
    const categories = await prisma.category.findMany({
      where: { companyId },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error reordering category:", error);
    return NextResponse.json(
      { error: "Failed to reorder category" },
      { status: 500 }
    );
  }
}
