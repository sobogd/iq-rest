import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function GET() {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
      select: { id: true },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const tables = await prisma.table.findMany({
      where: { restaurantId: restaurant.id },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    return NextResponse.json(
      { error: "Failed to fetch tables" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const companyId = await getUserCompanyId();

    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { companyId },
      select: { id: true },
    });

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }

    const data = await request.json();

    if (!data.number || typeof data.number !== "number") {
      return NextResponse.json(
        { error: "Table number is required" },
        { status: 400 }
      );
    }

    if (!data.capacity || typeof data.capacity !== "number" || data.capacity < 1) {
      return NextResponse.json(
        { error: "Capacity must be at least 1" },
        { status: 400 }
      );
    }

    // Get max sortOrder
    const maxSort = await prisma.table.aggregate({
      where: { restaurantId: restaurant.id },
      _max: { sortOrder: true },
    });

    const table = await prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        number: data.number,
        capacity: data.capacity,
        zone: data.zone || null,
        translations: data.translations || null,
        imageUrl: data.imageUrl || null,
        isActive: data.isActive ?? true,
        sortOrder: (maxSort._max.sortOrder || 0) + 1,
      },
    });

    return NextResponse.json(table, { status: 201 });
  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json(
      { error: "Failed to create table" },
      { status: 500 }
    );
  }
}
