import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";

const PLAN_LIMITS: Record<string, number> = {
  FREE: 400,
  BASIC: Infinity,
  PRO: Infinity,
};

function getLast7Days(viewsByDay: { date: Date; count: bigint }[]) {
  const result: { date: string; count: number }[] = [];
  const dataMap = new Map(
    viewsByDay.map((v) => [v.date.toISOString().split("T")[0], Number(v.count)])
  );

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    result.push({
      date: dateStr,
      count: dataMap.get(dateStr) || 0,
    });
  }

  return result;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email");

    if (!userEmail?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail.value },
      include: {
        companies: {
          include: { company: true },
          take: 1,
        },
      },
    });

    const company = user?.companies[0]?.company;
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get stats
    const [monthlyViews, weeklyViews, todayViews, uniqueSessions, viewsByPage, viewsByLanguage, viewsByDay] = await Promise.all([
      // Monthly views
      prisma.pageView.count({
        where: {
          companyId: company.id,
          createdAt: { gte: startOfMonth },
        },
      }),
      // Weekly views
      prisma.pageView.count({
        where: {
          companyId: company.id,
          createdAt: { gte: startOfWeek },
        },
      }),
      // Today views
      prisma.pageView.count({
        where: {
          companyId: company.id,
          createdAt: { gte: startOfToday },
        },
      }),
      // Unique sessions this week
      prisma.pageView.groupBy({
        by: ["sessionId"],
        where: {
          companyId: company.id,
          createdAt: { gte: startOfWeek },
        },
      }),
      // Views by page this week
      prisma.pageView.groupBy({
        by: ["page"],
        where: {
          companyId: company.id,
          createdAt: { gte: startOfWeek },
        },
        _count: {
          page: true,
        },
      }),
      // Views by language this week
      prisma.pageView.groupBy({
        by: ["language"],
        where: {
          companyId: company.id,
          createdAt: { gte: startOfWeek },
        },
        _count: {
          language: true,
        },
      }),
      // Views by day (last 7 days)
      prisma.$queryRaw<{ date: Date; count: bigint }[]>`
        SELECT DATE("createdAt") as date, COUNT(*) as count
        FROM page_views
        WHERE "companyId" = ${company.id}
          AND "createdAt" >= ${startOfWeek}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,
    ]);

    // Get device stats from userAgent (last 7 days, one per session)
    const viewsWithUA = await prisma.pageView.findMany({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfWeek },
        userAgent: { not: null },
      },
      select: { sessionId: true, userAgent: true },
      distinct: ["sessionId"],
    });

    const deviceMap = new Map<string, number>();
    const browserMap = new Map<string, number>();
    const osMap = new Map<string, number>();

    for (const view of viewsWithUA) {
      if (!view.userAgent) continue;
      const result = UAParser(view.userAgent);
      const device = result.device.type || "desktop";
      const browser = result.browser.name || "Unknown";
      const os = result.os.name || "Unknown";
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
      osMap.set(os, (osMap.get(os) || 0) + 1);
    }

    const sortByCount = (map: Map<string, number>) =>
      Array.from(map.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    const limit = PLAN_LIMITS[company.plan] || 400;

    return NextResponse.json({
      plan: company.plan,
      limit: limit === Infinity ? null : limit,
      monthlyViews,
      weeklyViews,
      todayViews,
      uniqueSessions: uniqueSessions.length,
      viewsByPage: viewsByPage.map((v) => ({
        page: v.page,
        count: v._count.page,
      })),
      viewsByLanguage: viewsByLanguage.map((v) => ({
        language: v.language,
        count: v._count.language,
      })),
      viewsByDay: getLast7Days(viewsByDay),
      deviceStats: {
        devices: sortByCount(deviceMap),
        browsers: sortByCount(browserMap),
        os: sortByCount(osMap),
      },
    });
  } catch (error) {
    console.error("Dashboard analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
