import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserCompanyId } from "@/lib/auth";

export async function GET() {
  try {
    const companyId = await getUserCompanyId();
    if (!companyId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const restaurants = await prisma.restaurant.findMany({
      where: { companyId },
      select: { id: true },
      orderBy: { createdAt: "asc" },
    });

    if (restaurants.length === 0) {
      return NextResponse.json([]);
    }

    const reservations = await prisma.reservation.findMany({
      where: { restaurantId: { in: restaurants.map((r) => r.id) } },
      include: {
        table: {
          select: { number: true, zone: true },
        },
      },
      orderBy: [{ date: "desc" }, { startTime: "desc" }],
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
