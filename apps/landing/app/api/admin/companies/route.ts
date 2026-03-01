import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = request.nextUrl;
    const filter = searchParams.get("filter") || "all"; // all | today_active

    const tz = searchParams.get("tz") || "UTC";
    const nowTz = new Date().toLocaleString("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
    const [y, m, d] = nowTz.split("-").map(Number);
    const todayLocal = new Date(Date.UTC(y, m - 1, d));
    const utcStr = todayLocal.toLocaleString("en-US", { timeZone: "UTC" });
    const tzStr = todayLocal.toLocaleString("en-US", { timeZone: tz });
    const offsetMs = new Date(utcStr).getTime() - new Date(tzStr).getTime();
    const todayStart = new Date(todayLocal.getTime() + offsetMs);

    // For today_active filter: companies with 1+ page view today
    let todayActiveIds: Set<string> | null = null;
    if (filter === "today_active") {
      const companiesWithTodayViews = await prisma.$queryRaw<{ companyId: string }[]>`
        SELECT DISTINCT "companyId"
        FROM page_views
        WHERE "createdAt" >= ${todayStart}
      `;
      todayActiveIds = new Set(companiesWithTodayViews.map((r) => r.companyId));
    }

    const where: Record<string, unknown> = {};
    if (filter === "today_active" && todayActiveIds) {
      if (todayActiveIds.size === 0) {
        return NextResponse.json({ companies: [], total: 0 });
      }
      where.id = { in: [...todayActiveIds] };
    }

    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const companies = await prisma.company.findMany({
      where,
      select: {
        id: true,
        plan: true,
        scanLimit: true,
        subscriptionStatus: true,
        emailsSent: true,
        restaurants: {
          select: { title: true },
          take: 1,
        },
        _count: {
          select: {
            categories: true,
            items: true,
            supportMessages: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Get monthly + today page views for all companies
    const companyIds = companies.map((c) => c.id);

    const [monthlyViewCounts, todayViewCounts] = companyIds.length > 0
      ? await Promise.all([
          prisma.$queryRaw<{ companyId: string; count: bigint }[]>`
            SELECT "companyId", COUNT(DISTINCT "sessionId") as count
            FROM page_views
            WHERE "companyId" = ANY(${companyIds}::text[])
              AND "createdAt" >= ${startOfMonth}
            GROUP BY "companyId"
          `,
          prisma.$queryRaw<{ companyId: string; count: bigint }[]>`
            SELECT "companyId", COUNT(DISTINCT "sessionId") as count
            FROM page_views
            WHERE "companyId" = ANY(${companyIds}::text[])
              AND "createdAt" >= ${todayStart}
            GROUP BY "companyId"
          `,
        ])
      : [[], []];
    const viewsMap = new Map(monthlyViewCounts.map((r) => [r.companyId, Number(r.count)]));
    const todayViewsMap = new Map(todayViewCounts.map((r) => [r.companyId, Number(r.count)]));

    const items = companies.map((c) => ({
      id: c.id,
      name: c.restaurants[0]?.title || null,
      plan: c.plan,
      subscriptionStatus: c.subscriptionStatus,
      categoriesCount: c._count.categories,
      itemsCount: c._count.items,
      messagesCount: c._count.supportMessages,
      monthlyViews: viewsMap.get(c.id) || 0,
      todayViews: todayViewsMap.get(c.id) || 0,
      scanLimit: c.plan === "FREE" ? c.scanLimit : null,
      emailsSent: c.emailsSent as Record<string, string> | null,
    }));

    return NextResponse.json({
      companies: items,
      total: items.length,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
