import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";

const PAGE_SIZE = 7;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = request.nextUrl;
    const page = Math.max(0, Number(searchParams.get("page") || 0));
    const email = searchParams.get("email") || null;
    const minViews = searchParams.get("minViews") === "true";

    // Build where clause
    const where: Record<string, unknown> = {};
    if (email) {
      where.users = { some: { user: { email: { contains: email, mode: "insensitive" as const } } } };
    }

    // If minViews filter is on, find companyIds with 20+ page views this month
    if (minViews) {
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const companiesWithViews = await prisma.$queryRaw<{ companyId: string }[]>`
        SELECT "companyId"
        FROM page_views
        WHERE "createdAt" >= ${startOfMonth}
        GROUP BY "companyId"
        HAVING COUNT(*) >= 20
      `;
      const ids = companiesWithViews.map((r) => r.companyId);
      where.id = { in: ids };
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        include: {
          users: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  createdAt: true,
                },
              },
            },
          },
          restaurants: {
            select: {
              id: true,
              title: true,
              description: true,
              slug: true,
              accentColor: true,
              createdAt: true,
              address: true,
              phone: true,
              instagram: true,
              whatsapp: true,
              reservationsEnabled: true,
              defaultLanguage: true,
              languages: true,
            },
          },
          _count: {
            select: {
              categories: true,
              items: true,
              supportMessages: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.company.count({ where }),
    ]);

    // Get monthly page views for this page of companies
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const companyIds = companies.map((c) => c.id);
    const monthlyViewCounts = await prisma.$queryRaw<{ companyId: string; count: bigint }[]>`
      SELECT "companyId", COUNT(*) as count
      FROM page_views
      WHERE "companyId" = ANY(${companyIds}::text[])
        AND "createdAt" >= ${startOfMonth}
      GROUP BY "companyId"
    `;
    const viewsMap = new Map(monthlyViewCounts.map((r) => [r.companyId, Number(r.count)]));

    const items = companies.map((company) => ({
      id: company.id,
      name: company.name,
      createdAt: company.createdAt,
      plan: company.plan,
      subscriptionStatus: company.subscriptionStatus,
      billingCycle: company.billingCycle,
      currentPeriodEnd: company.currentPeriodEnd,
      stripeCustomerId: company.stripeCustomerId,
      stripeSubscriptionId: company.stripeSubscriptionId,
      emailsSent: company.emailsSent as Record<string, string> | null,
      categoriesCount: company._count.categories,
      itemsCount: company._count.items,
      messagesCount: company._count.supportMessages,
      monthlyViews: viewsMap.get(company.id) || 0,
      users: company.users.map((uc) => ({
        id: uc.user.id,
        email: uc.user.email,
        createdAt: uc.user.createdAt,
        role: uc.role,
      })),
      restaurants: company.restaurants.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        slug: r.slug,
        accentColor: r.accentColor,
        createdAt: r.createdAt,
        address: r.address,
        phone: r.phone,
        instagram: r.instagram,
        whatsapp: r.whatsapp,
        reservationsEnabled: r.reservationsEnabled,
        defaultLanguage: r.defaultLanguage,
        languages: r.languages,
        url: r.slug ? `https://iq-rest.com/m/${r.slug}` : null,
      })),
    }));

    return NextResponse.json({
      companies: items,
      total,
      page,
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
