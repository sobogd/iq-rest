import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get restaurant for this company
    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
      select: { id: true },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const body = await request.json();

    // Support new batch format: { items: [{ id, sortOrder }] }
    if (body.items && Array.isArray(body.items)) {
      const updates = body.items.map((item: { id: string; sortOrder: number }) =>
        prisma.table.update({
          where: { id: item.id, restaurantId: restaurant.id },
          data: { sortOrder: item.sortOrder },
        })
      );

      await prisma.$transaction(updates);
      return NextResponse.json({ success: true });
    }

    // Legacy format: { tableId, direction }
    const { tableId, direction } = body;

    if (!tableId || !direction) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get the table
    const table = await prisma.table.findFirst({
      where: { id: tableId, restaurantId: restaurant.id },
    });

    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    // Get all tables sorted by sortOrder
    const tables = await prisma.table.findMany({
      where: { restaurantId: restaurant.id },
      orderBy: { sortOrder: "asc" },
    });

    const currentIndex = tables.findIndex((t) => t.id === tableId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= tables.length) {
      return NextResponse.json({ error: "Cannot move further" }, { status: 400 });
    }

    const swapTable = tables[swapIndex];

    // Swap sortOrders
    await prisma.$transaction([
      prisma.table.update({
        where: { id: tableId },
        data: { sortOrder: swapTable.sortOrder },
      }),
      prisma.table.update({
        where: { id: swapTable.id },
        data: { sortOrder: table.sortOrder },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reorder table error:", error);
    return NextResponse.json({ error: "Failed to reorder table" }, { status: 500 });
  }
}
