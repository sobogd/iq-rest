import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const PLAN_LIMITS = {
  FREE: 500,
  BASIC: 2000,
  PRO: Infinity,
};

function getOrCreateSessionId(request: NextRequest): {
  sessionId: string;
  isNew: boolean;
} {
  const existing = request.cookies.get("sqr_session_id")?.value;
  if (existing) return { sessionId: existing, isNew: false };
  return { sessionId: crypto.randomUUID(), isNew: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, page, language, referrer } = body;

    if (!slug || !page || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { sessionId, isNew } = getOrCreateSessionId(request);

    // Find restaurant and company by slug
    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        companyId: true,
        company: {
          select: {
            id: true,
            plan: true,
          },
        },
      },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const { company } = restaurant;
    const limit = PLAN_LIMITS[company.plan];

    // Get current month's view count
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const currentMonthViews = await prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfMonth },
      },
    });

    const showAd = currentMonthViews >= limit;
    const remaining = Math.max(0, limit - currentMonthViews);

    // Always record the view (even if limit exceeded)
    const userAgent = request.headers.get("user-agent") || null;
    const ip = request.cookies.get("geo_ip")?.value || null;

    await prisma.pageView.create({
      data: {
        companyId: company.id,
        sessionId,
        page,
        language,
        referrer: referrer || null,
        userAgent,
        ip,
      },
    });

    const response = NextResponse.json({
      success: true,
      showAd,
      remaining: limit === Infinity ? null : remaining,
    });

    // Set session cookie (no maxAge = dies when browser closes)
    if (isNew) {
      response.cookies.set("sqr_session_id", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
