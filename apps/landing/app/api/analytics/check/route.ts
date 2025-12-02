import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const PLAN_LIMITS = {
  FREE: 500,
  BASIC: 2000,
  PRO: Infinity,
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
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

    return NextResponse.json({
      showAd,
      plan: company.plan,
    });
  } catch (error) {
    console.error("Analytics check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
