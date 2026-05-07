import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuLayoutClient } from "./menu-layout-client";
import { getRestaurantBySlug } from "./_lib/get-restaurant";
import { getCompanyAccess } from "@/lib/access";
import { TrialExpiredOverlay, MenuPageTracker } from "./_components";

const DEMO_SLUG = "love-eatery";

export const revalidate = 300; // 5 minutes

interface MenuLayoutData {
  showAd: boolean;
  accentColor: string;
  trialExpired: boolean;
  defaultLanguage: string;
}

async function getMenuLayoutData(slug: string): Promise<MenuLayoutData> {
  const fallback: MenuLayoutData = { showAd: false, accentColor: "#000000", trialExpired: false, defaultLanguage: "en" };
  try {
    const restaurant = await getRestaurantBySlug(slug);

    if (!restaurant) return fallback;

    const { company } = restaurant;
    const access = getCompanyAccess(company);
    const limit = access.hasScanLimit ? access.scanLimit : Infinity;
    const accentColor = restaurant.accentColor || "#000000";
    const defaultLanguage = restaurant.defaultLanguage || "en";
    const trialExpired = slug !== DEMO_SLUG && access.trialExpired;

    if (limit === Infinity) return { showAd: false, accentColor, trialExpired, defaultLanguage };

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

    return { showAd: scanCount >= limit, accentColor, trialExpired, defaultLanguage };
  } catch {
    return fallback;
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
  const { slug, locale } = await params;
  const { showAd, accentColor, trialExpired, defaultLanguage } = await getMenuLayoutData(slug);
  const s3Host = process.env.S3_HOST;

  return (
    <div
      className="min-h-dvh bg-background"
      style={{ "--menu-accent": accentColor } as React.CSSProperties}
    >
      {s3Host && (
        <link rel="preconnect" href={s3Host} crossOrigin="anonymous" />
      )}
      <MenuPageTracker slug={slug} locale={locale} />
      <MenuLayoutClient showAd={showAd}>
        {children}
      </MenuLayoutClient>
      {trialExpired && <TrialExpiredOverlay defaultLanguage={defaultLanguage} />}
    </div>
  );
}
