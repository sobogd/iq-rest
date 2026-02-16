import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { isAdminEmail } from "@/lib/admin";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("user_email")?.value;

    if (!isAdminEmail(userEmail)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const companies = await prisma.company.findMany({
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
    });

    // Get unique menu scans (unique sessions) per company
    const companyIds = companies.map((c) => c.id);
    const scanCounts = await prisma.$queryRaw<{ companyId: string; count: bigint }[]>`
      SELECT "companyId", COUNT(DISTINCT "sessionId") as count
      FROM page_views
      WHERE "companyId" = ANY(${companyIds}::text[])
      GROUP BY "companyId"
    `;
    const scanMap = new Map(scanCounts.map((r) => [r.companyId, Number(r.count)]));

    const result = companies.map((company) => ({
      id: company.id,
      name: company.name,
      createdAt: company.createdAt,
      plan: company.plan,
      subscriptionStatus: company.subscriptionStatus,
      billingCycle: company.billingCycle,
      currentPeriodEnd: company.currentPeriodEnd,
      stripeCustomerId: company.stripeCustomerId,
      stripeSubscriptionId: company.stripeSubscriptionId,
      reminderSentAt: company.reminderSentAt,
      categoriesCount: company._count.categories,
      itemsCount: company._count.items,
      messagesCount: company._count.supportMessages,
      menuScans: scanMap.get(company.id) || 0,
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

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}
