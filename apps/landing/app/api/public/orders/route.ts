import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface OrderItemPayload {
  id: string;
  name: string;
  qty: number;
  price: number;
}

/**
 * POST /api/public/orders
 * Records an order and checks if the monthly limit is reached.
 * Body: { slug, items?, total?, customerName?, customerPhone?, customerAddress?, comment?, tableNumber? }
 * Returns: { ok: true, mode } or { error: "limit_reached", limit: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, items, total, customerName, customerPhone, customerAddress, comment, tableNumber } = body;

    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        id: true,
        companyId: true,
        ordersEnabled: true,
        orderMode: true,
        currency: true,
        company: {
          select: { plan: true, orderLimit: true },
        },
      },
    });

    if (!restaurant || !restaurant.ordersEnabled) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const { plan, orderLimit } = restaurant.company;
    const mode = restaurant.orderMode;

    // Save to DB only for internal/both modes
    if (mode === "internal" || mode === "both") {
      // Free plan: check monthly limit
      if (plan === "FREE") {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const monthlyOrders = await prisma.order.count({
          where: {
            companyId: restaurant.companyId,
            createdAt: { gte: startOfMonth },
          },
        });

        if (monthlyOrders >= orderLimit) {
          return NextResponse.json(
            { error: "limit_reached", limit: orderLimit },
            { status: 429 }
          );
        }
      }

      if (items && Array.isArray(items) && items.length > 0) {
        const orderItems = items.map((item: OrderItemPayload) => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
        }));

        await prisma.order.create({
          data: {
            restaurantId: restaurant.id,
            companyId: restaurant.companyId,
            items: orderItems,
            total: total || 0,
            currency: restaurant.currency,
            customerName: customerName || null,
            customerPhone: customerPhone || null,
            customerAddress: customerAddress || null,
            comment: comment || null,
            tableNumber: tableNumber != null ? Number(tableNumber) || null : null,
            status: "new",
          },
        });
      }
    }

    return NextResponse.json({ ok: true, mode });
  } catch (error) {
    console.error("Error recording order:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
