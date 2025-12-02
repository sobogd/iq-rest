import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user and company from session
    const user = await prisma.user.findFirst({
      where: {
        companies: {
          some: {},
        },
      },
      include: {
        companies: {
          include: {
            company: true,
          },
        },
      },
    });

    // For now, find by session token in a simpler way
    // This should match your auth implementation
    const userCompany = await prisma.userCompany.findFirst({
      where: {
        user: {
          id: sessionToken,
        },
      },
      include: {
        company: true,
      },
    });

    if (!userCompany) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const companyId = userCompany.companyId;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "7d":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get total views
    const totalViews = await prisma.pageView.count({
      where: {
        companyId,
        createdAt: { gte: startDate },
      },
    });

    // Get unique sessions
    const uniqueSessions = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: {
        companyId,
        createdAt: { gte: startDate },
      },
    });

    // Get views by page
    const viewsByPage = await prisma.pageView.groupBy({
      by: ["page"],
      where: {
        companyId,
        createdAt: { gte: startDate },
      },
      _count: {
        page: true,
      },
    });

    // Get views by language
    const viewsByLanguage = await prisma.pageView.groupBy({
      by: ["language"],
      where: {
        companyId,
        createdAt: { gte: startDate },
      },
      _count: {
        language: true,
      },
    });

    // Get views by day
    const viewsByDay = await prisma.$queryRaw<
      { date: string; count: bigint }[]
    >`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM page_views
      WHERE company_id = ${companyId}
        AND created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Get current month usage for limit display
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyViews = await prisma.pageView.count({
      where: {
        companyId,
        createdAt: { gte: startOfMonth },
      },
    });

    return NextResponse.json({
      totalViews,
      uniqueSessions: uniqueSessions.length,
      viewsByPage: viewsByPage.map((v) => ({
        page: v.page,
        count: v._count.page,
      })),
      viewsByLanguage: viewsByLanguage.map((v) => ({
        language: v.language,
        count: v._count.language,
      })),
      viewsByDay: viewsByDay.map((v) => ({
        date: v.date,
        count: Number(v.count),
      })),
      monthlyViews,
      plan: userCompany.company.plan,
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
