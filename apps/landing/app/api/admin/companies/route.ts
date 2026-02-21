import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = request.nextUrl;
    const filter = searchParams.get("filter") || "all"; // all | active | inactive

    // For active/inactive we need to find companies with 20+ views this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let activeCompanyIds: Set<string> | null = null;
    if (filter === "active" || filter === "inactive") {
      const companiesWithViews = await prisma.$queryRaw<{ companyId: string }[]>`
        SELECT "companyId"
        FROM page_views
        WHERE "createdAt" >= ${startOfMonth}
        GROUP BY "companyId"
        HAVING COUNT(*) >= 20
      `;
      activeCompanyIds = new Set(companiesWithViews.map((r) => r.companyId));
    }

    const where: Record<string, unknown> = {};
    if (filter === "active" && activeCompanyIds) {
      where.id = { in: [...activeCompanyIds] };
    } else if (filter === "inactive" && activeCompanyIds) {
      where.id = activeCompanyIds.size > 0 ? { notIn: [...activeCompanyIds] } : undefined;
    }

    const total = await prisma.company.count({ where });
    const totalPages = Math.ceil(total / PAGE_SIZE);

    // Default to first page if no page param
    const pageParam = searchParams.get("page");
    const page = pageParam !== null
      ? Math.max(0, Math.min(Number(pageParam), totalPages - 1))
      : 0;

    const companies = await prisma.company.findMany({
      where,
      select: {
        id: true,
        plan: true,
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
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    // Get monthly + today page views for this page of companies
    const companyIds = companies.map((c) => c.id);

    const tz = searchParams.get("tz") || "UTC";
    const nowTz = new Date().toLocaleString("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
    const [y, m, d] = nowTz.split("-").map(Number);
    const todayLocal = new Date(Date.UTC(y, m - 1, d));
    const utcStr = todayLocal.toLocaleString("en-US", { timeZone: "UTC" });
    const tzStr = todayLocal.toLocaleString("en-US", { timeZone: tz });
    const offsetMs = new Date(utcStr).getTime() - new Date(tzStr).getTime();
    const todayStart = new Date(todayLocal.getTime() + offsetMs);

    const [monthlyViewCounts, todayViewCounts] = companyIds.length > 0
      ? await Promise.all([
          prisma.$queryRaw<{ companyId: string; count: bigint }[]>`
            SELECT "companyId", COUNT(*) as count
            FROM page_views
            WHERE "companyId" = ANY(${companyIds}::text[])
              AND "createdAt" >= ${startOfMonth}
            GROUP BY "companyId"
          `,
          prisma.$queryRaw<{ companyId: string; count: bigint }[]>`
            SELECT "companyId", COUNT(*) as count
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
      emailsSent: c.emailsSent as Record<string, string> | null,
    }));

    return NextResponse.json({
      companies: items,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
