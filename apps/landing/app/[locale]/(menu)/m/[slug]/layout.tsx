import { Metadata } from "next";
import { getRestaurantBySlug } from "./_lib/get-restaurant";
import { getCompanyAccess } from "@/lib/access";
import { TrialExpiredOverlay, MenuPageTracker } from "./_components";

const DEMO_SLUG = "love-eatery";

export const revalidate = 300; // 5 minutes

interface MenuLayoutData {
  accentColor: string;
  trialExpired: boolean;
  defaultLanguage: string;
}

async function getMenuLayoutData(slug: string): Promise<MenuLayoutData> {
  const fallback: MenuLayoutData = { accentColor: "#000000", trialExpired: false, defaultLanguage: "en" };
  try {
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) return fallback;

    const access = getCompanyAccess(restaurant.company);
    return {
      accentColor: restaurant.accentColor || "#000000",
      defaultLanguage: restaurant.defaultLanguage || "en",
      trialExpired: slug !== DEMO_SLUG && access.trialExpired,
    };
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
  const { accentColor, trialExpired, defaultLanguage } = await getMenuLayoutData(slug);
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
      {children}
      {trialExpired && <TrialExpiredOverlay defaultLanguage={defaultLanguage} />}
    </div>
  );
}
