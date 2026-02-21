import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuLayoutClient } from "./menu-layout-client";

async function getMenuLayoutData(slug: string): Promise<{ showAd: boolean; accentColor: string }> {
  try {
    const restaurant = await prisma.restaurant.findFirst({
      where: { slug },
      select: {
        accentColor: true,
        company: {
          select: {
            id: true,
            plan: true,
            scanLimit: true,
          },
        },
      },
    });

    if (!restaurant) return { showAd: false, accentColor: "#000000" };

    const { company } = restaurant;
    const limit = company.plan === "FREE" ? company.scanLimit : Infinity;
    const accentColor = restaurant.accentColor || "#000000";

    if (limit === Infinity) return { showAd: false, accentColor };

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const currentMonthViews = await prisma.pageView.count({
      where: {
        companyId: company.id,
        createdAt: { gte: startOfMonth },
      },
    });

    return { showAd: currentMonthViews >= limit, accentColor };
  } catch {
    return { showAd: false, accentColor: "#000000" };
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
  const { showAd, accentColor } = await getMenuLayoutData(slug);

  return (
    <div
      className="min-h-dvh bg-background"
      style={{ "--menu-accent": accentColor } as React.CSSProperties}
    >
      <MenuLayoutClient showAd={showAd}>
        {children}
      </MenuLayoutClient>
    </div>
  );
}
