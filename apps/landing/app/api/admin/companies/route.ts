import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
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
                email: true,
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
          },
        },
        _count: {
          select: {
            categories: true,
            items: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = companies.map((company) => ({
      id: company.id,
      name: company.name,
      createdAt: company.createdAt,
      plan: company.plan,
      subscriptionStatus: company.subscriptionStatus,
      categoriesCount: company._count.categories,
      itemsCount: company._count.items,
      users: company.users.map((uc) => uc.user.email),
      restaurants: company.restaurants.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        slug: r.slug,
        accentColor: r.accentColor,
        createdAt: r.createdAt,
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
