import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PLAN_LIMITS = {
  FREE: 500,
  BASIC: 2000,
  PRO: Infinity,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, page, sessionId, language, referrer } = body;

    if (!slug || !page || !sessionId || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
    await prisma.pageView.create({
      data: {
        companyId: company.id,
        sessionId,
        page,
        language,
        referrer: referrer || null,
      },
    });

    return NextResponse.json({
      success: true,
      showAd,
      remaining: limit === Infinity ? null : remaining,
    });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
