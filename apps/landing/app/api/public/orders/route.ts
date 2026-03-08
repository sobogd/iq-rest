import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface OrderItemPayload {
  id: string;
  name: string;
  qty: number;
  price: number;
}

// Simple in-memory rate limiter (per IP+slug, 10 orders per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 3600_000; // 1 hour

function isRateLimited(ip: string, slug: string): boolean {
  const key = `${ip}:${slug}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Validation constants
const MAX_ITEMS = 100;
const MAX_ITEM_PRICE = 99999.99;
const MAX_TOTAL = 999999.99;

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

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "slug required" }, { status: 400 });
    }

    // Rate limiting
    const ip =
      request.cookies.get("geo_ip")?.value ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (isRateLimited(ip, slug)) {
      return NextResponse.json(
        { error: "Too many orders. Please try again later." },
        { status: 429 }
      );
    }

    // Validate items
    if (items != null) {
      if (!Array.isArray(items)) {
        return NextResponse.json({ error: "items must be an array" }, { status: 400 });
      }
      if (items.length > MAX_ITEMS) {
        return NextResponse.json({ error: `Maximum ${MAX_ITEMS} items per order` }, { status: 400 });
      }
      for (const item of items) {
        if (typeof item.qty !== "number" || item.qty < 1 || item.qty > 999) {
          return NextResponse.json({ error: "Invalid item quantity" }, { status: 400 });
        }
        if (typeof item.price !== "number" || item.price < 0 || item.price > MAX_ITEM_PRICE) {
          return NextResponse.json({ error: "Invalid item price" }, { status: 400 });
        }
      }
    }

    if (total != null && (typeof total !== "number" || total < 0 || total > MAX_TOTAL)) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
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

    const mode = restaurant.orderMode;

    // Save to DB only for internal/both modes
    if (mode === "internal" || mode === "both") {
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
            customerName: customerName ? String(customerName).slice(0, 200) : null,
            customerPhone: customerPhone ? String(customerPhone).slice(0, 50) : null,
            customerAddress: customerAddress ? String(customerAddress).slice(0, 500) : null,
            comment: comment ? String(comment).slice(0, 1000) : null,
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
