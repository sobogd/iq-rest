import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuLayoutClient } from "./menu-layout-client";

const PLAN_LIMITS = {
  FREE: 400,
  BASIC: Infinity,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: { title: true, description: true, source: true },
  });

  if (!restaurant) return {};

  return {
    title: restaurant.title,
    description: restaurant.description || `${restaurant.title} — Menu`,
    openGraph: {
      title: restaurant.title,
      description: restaurant.description || `${restaurant.title} — Menu`,
      ...(restaurant.source && !restaurant.source.match(/\.(mp4|webm|mov)$/i)
        ? { images: [{ url: restaurant.source }] }
        : {}),
    },
  };
}

interface MenuLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string; locale: string }>;
}

export default async function MenuLayout({ children, params }: MenuLayoutProps) {
  const { slug } = await params;
  const showAd = await checkAdStatus(slug);

  return (
    <div className="min-h-dvh bg-background">
      <MenuLayoutClient showAd={showAd}>
        {children}
      </MenuLayoutClient>
    </div>
  );
}
