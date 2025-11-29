import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId, direction } = await request.json();

    if (!itemId || !["up", "down"].includes(direction)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Get the item to move
    const item = await prisma.item.findFirst({
      where: { id: itemId, companyId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Find the adjacent item to swap with (within same category)
    const adjacentItem = await prisma.item.findFirst({
      where: {
        companyId,
        categoryId: item.categoryId,
        sortOrder: direction === "up"
          ? { lt: item.sortOrder }
          : { gt: item.sortOrder },
      },
      orderBy: {
        sortOrder: direction === "up" ? "desc" : "asc",
      },
    });

    if (!adjacentItem) {
      // Already at the top or bottom
      return NextResponse.json({ message: "No change needed" });
    }

    // Swap sortOrder values
    await prisma.$transaction([
      prisma.item.update({
        where: { id: item.id },
        data: { sortOrder: adjacentItem.sortOrder },
      }),
      prisma.item.update({
        where: { id: adjacentItem.id },
        data: { sortOrder: item.sortOrder },
      }),
    ]);

    // Return updated items list for the category
    const items = await prisma.item.findMany({
      where: { companyId, categoryId: item.categoryId },
      orderBy: { sortOrder: "asc" },
      include: {
        category: {
          select: { id: true, name: true, sortOrder: true },
        },
      },
    });

    const serializedItems = items.map((i) => ({
      ...i,
      price: Number(i.price),
    }));

    return NextResponse.json(serializedItems);
  } catch (error) {
    console.error("Error reordering item:", error);
    return NextResponse.json(
      { error: "Failed to reorder item" },
      { status: 500 }
    );
  }
}
