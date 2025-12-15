import { prisma } from "@/lib/prisma";
import { MenuLayoutClient } from "./menu-layout-client";

const PLAN_LIMITS = {
  FREE: 500,
  BASIC: 2000,
  PRO: Infinity,
};

async function checkAdStatus(slug: string): Promise<boolean> {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        company: {
          select: {
            id: true,
            plan: true,
          },
        },
      },
    });

    if (!restaurant) return false;

    const { company } = restaurant;
    const limit = PLAN_LIMITS[company.plan];

    if (limit === Infinity) return false;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const currentMonthViews = await prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfMonth },
      },
    });

    return currentMonthViews >= limit;
  } catch {
    return false;
  }
}

interface MenuLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}

export default async function MenuLayout({ children, params }: MenuLayoutProps) {
  const { slug, locale } = await params;
  const showAd = await checkAdStatus(slug);

  return (
    <div className="min-h-dvh bg-background">
      <MenuLayoutClient slug={slug} locale={locale} showAd={showAd}>
        {children}
      </MenuLayoutClient>
    </div>
  );
}
