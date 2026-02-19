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
    let activeCompanyIds: Set<string> | null = null;
    if (filter === "active" || filter === "inactive") {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
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

    // Default to last page if no page param
    const pageParam = searchParams.get("page");
    const page = pageParam !== null
      ? Math.max(0, Math.min(Number(pageParam), totalPages - 1))
      : Math.max(0, totalPages - 1);

    const companies = await prisma.company.findMany({
      where,
      select: {
        id: true,
        plan: true,
        subscriptionStatus: true,
        restaurants: {
          select: { title: true },
          take: 1,
        },
      },
      orderBy: { createdAt: "asc" },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    const items = companies.map((c) => ({
      id: c.id,
      name: c.restaurants[0]?.title || null,
      plan: c.plan,
      subscriptionStatus: c.subscriptionStatus,
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
