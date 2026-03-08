import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuLayoutClient } from "./menu-layout-client";
import { getRestaurantBySlug } from "./_lib/get-restaurant";
import { getCompanyAccess } from "@/lib/access";

export const revalidate = 300; // 5 minutes

async function getMenuLayoutData(slug: string): Promise<{ showAd: boolean; accentColor: string }> {
  try {
    const restaurant = await getRestaurantBySlug(slug);

    if (!restaurant) return { showAd: false, accentColor: "#000000" };

    const { company } = restaurant;
    const access = getCompanyAccess(company);
    const limit = access.hasScanLimit ? access.scanLimit : Infinity;
    const accentColor = restaurant.accentColor || "#000000";

    if (limit === Infinity) return { showAd: false, accentColor };

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(DISTINCT "sessionId") as count
      FROM "page_views"
      WHERE "companyId" = ${company.id}
        AND "createdAt" >= ${startOfMonth}
    `;
    const scanCount = Number(result[0]?.count ?? 0);

    return { showAd: scanCount >= limit, accentColor };
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
  const restaurant = await getRestaurantBySlug(slug);

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
  const s3Host = process.env.S3_HOST;

  return (
    <div
      className="min-h-dvh bg-background"
      style={{ "--menu-accent": accentColor } as React.CSSProperties}
    >
      {s3Host && (
        <link rel="preconnect" href={s3Host} crossOrigin="anonymous" />
      )}
      <MenuLayoutClient showAd={showAd}>
        {children}
      </MenuLayoutClient>
    </div>
  );
}
