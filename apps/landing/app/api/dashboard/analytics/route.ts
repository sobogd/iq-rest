import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";
import { getTimezoneForCountry } from "@/lib/country-timezone-map";

const PLAN_LIMITS: Record<string, number> = {
  FREE: 400,
  BASIC: Infinity,
  PRO: Infinity,
};

function nowInTimezone(tz: string) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(new Date());
  const year = Number(parts.find((p) => p.type === "year")!.value);
  const month = Number(parts.find((p) => p.type === "month")!.value) - 1;
  const day = Number(parts.find((p) => p.type === "day")!.value);
  return { year, month, day };
}

function localToUtc(year: number, month: number, day: number, tz: string): Date {
  const local = new Date(Date.UTC(year, month, day));
  const utcStr = local.toLocaleString("en-US", { timeZone: "UTC" });
  const tzStr = local.toLocaleString("en-US", { timeZone: tz });
  const offsetMs = new Date(utcStr).getTime() - new Date(tzStr).getTime();
  return new Date(local.getTime() + offsetMs);
}

function getLast7Days(viewsByDay: { date: string; count: bigint }[], tz: string) {
  const result: { date: string; count: number }[] = [];
  const dataMap = new Map(
    viewsByDay.map((v) => [v.date, Number(v.count)])
  );

  const { year, month, day } = nowInTimezone(tz);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.UTC(year, month, day - i));
    const dateStr = d.toISOString().split("T")[0];
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

    const country = cookieStore.get("geo_country")?.value || "";
    const tz = getTimezoneForCountry(country);

    const { year, month, day } = nowInTimezone(tz);
    const startOfToday = localToUtc(year, month, day, tz);
    const startOfWeek = localToUtc(year, month, day - 7, tz);
    const startOfMonth = localToUtc(year, month, 1, tz);

    const [monthlyViews, weeklyViews, todayViews, uniqueSessions, viewsByPage, viewsByLanguage, viewsByDay] = await Promise.all([
      prisma.pageView.count({
        where: { companyId: company.id, createdAt: { gte: startOfMonth } },
      }),
      prisma.pageView.count({
        where: { companyId: company.id, createdAt: { gte: startOfWeek } },
      }),
      prisma.pageView.count({
        where: { companyId: company.id, createdAt: { gte: startOfToday } },
      }),
      prisma.pageView.groupBy({
        by: ["sessionId"],
        where: { companyId: company.id, createdAt: { gte: startOfWeek } },
      }),
      prisma.pageView.groupBy({
        by: ["page"],
        where: { companyId: company.id, createdAt: { gte: startOfWeek } },
        _count: { page: true },
      }),
      prisma.pageView.groupBy({
        by: ["language"],
        where: { companyId: company.id, createdAt: { gte: startOfWeek } },
        _count: { language: true },
      }),
      prisma.$queryRaw<{ date: string; count: bigint }[]>`
        SELECT to_char(DATE("createdAt" AT TIME ZONE ${tz}), 'YYYY-MM-DD') as date,
               COUNT(*) as count
        FROM page_views
        WHERE "companyId" = ${company.id}
          AND "createdAt" >= ${startOfWeek}
        GROUP BY DATE("createdAt" AT TIME ZONE ${tz})
        ORDER BY DATE("createdAt" AT TIME ZONE ${tz}) ASC
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
      viewsByDay: getLast7Days(viewsByDay, tz),
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
