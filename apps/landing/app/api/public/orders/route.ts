import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

/**
 * POST /api/public/orders
 * Records an order and checks if the monthly limit is reached.
 * Body: { slug: string }
 * Returns: { ok: true } or { error: "limit_reached", limit: number }
 */
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        id: true,
        companyId: true,
        ordersEnabled: true,
        company: {
          select: { plan: true, orderLimit: true },
        },
      },
    });

    if (!restaurant || !restaurant.ordersEnabled) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const { plan, orderLimit } = restaurant.company;

    // Free plan: check monthly limit
    if (plan === "FREE") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const monthlyOrders = await prisma.analyticsEvent.count({
        where: {
          event: "order_sent",
          meta: { path: ["slug"], equals: slug },
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

    // Record the order event with a one-off session
    const sessionId = `order_${randomUUID()}`;
    await prisma.session.create({
      data: { id: sessionId },
    });
    await prisma.analyticsEvent.create({
      data: {
        event: "order_sent",
        sessionId,
        meta: { slug },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error recording order:", error);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
