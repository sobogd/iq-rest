import { notFound } from "next/navigation";
import { ArrowRight, Phone, Globe, CalendarDays } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MenuNavLink, HeroMedia } from "./_components";
import { getRestaurantBySlug } from "./_lib/get-restaurant";

export const revalidate = 300;

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

interface MenuPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string; table?: string }>;
}

export default async function MenuPage({ params, searchParams }: MenuPageProps) {
  const { slug, locale } = await params;
  const { preview, table } = await searchParams;
  const isPreview = preview === "1";
  const queryParams = new URLSearchParams();
  if (isPreview) queryParams.set("preview", "1");
  if (table) queryParams.set("table", table);
  const queryString = queryParams.toString();
  const previewParam = queryString ? `?${queryString}` : "";
  const [restaurant, t] = await Promise.all([
    getRestaurantBySlug(slug),
    getTranslations("publicMenu"),
  ]);

  if (!restaurant) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.title,
    ...(restaurant.description && { description: restaurant.description }),
    ...(restaurant.source && !isVideo(restaurant.source) && { image: restaurant.source }),
    ...(restaurant.address && { address: { "@type": "PostalAddress", streetAddress: restaurant.address } }),
    ...(restaurant.phone && { telephone: restaurant.phone }),
    ...(restaurant.x && restaurant.y && {
      geo: { "@type": "GeoCoordinates", latitude: restaurant.y, longitude: restaurant.x },
    }),
    url: `https://iq-rest.com/m/${slug}`,
  };

  return (
    <div className="h-dvh flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* Hero section with background - takes remaining space */}
      <div className="flex-1 relative overflow-hidden min-h-[50vh]">
        {/* Background media with loader */}
        {restaurant.source ? (
          <HeroMedia
            src={restaurant.source}
            alt={restaurant.title}
            accentColor={restaurant.accentColor || "#000000"}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: restaurant.accentColor || "#000000" }}
          />
        )}
        {/* Powered by IQ Rest - only when trial expired */}
        {restaurant.company.plan === "FREE" && restaurant.company.trialEndsAt !== null && restaurant.company.trialEndsAt <= new Date() && (
          <a
            href={`https://iq-rest.com?from=qrmenu&slug=${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            <span className="text-white/70 text-sm">Powered by IQ Rest</span>
          </a>
        )}
        {/* Dark overlay and title - hidden if hideTitle is true */}
        {!restaurant.hideTitle && (
          <>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 z-[2]" />
            {/* Restaurant name at 30% from top */}
            <div className="absolute inset-x-0 top-[30%] z-10 flex justify-center px-[8%]">
              <div className="max-w-[440px] w-full">
                <h1 className="text-6xl font-black text-white break-words">{restaurant.title}</h1>
                {restaurant.description ? (
                  <p className="text-xl text-white/90 mt-3">{restaurant.description}</p>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation links */}
      <nav className="bg-white">
        {restaurant.reservationsEnabled && restaurant._count.tables > 0 && (
          <MenuNavLink href={`/m/${slug}/reserve${previewParam}`} className="border-t border-gray-300/25 flex justify-center px-[8%]">
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <CalendarDays className="h-5 w-5" />
              {t("reserve")}
            </span>
          </MenuNavLink>
        )}
        {(restaurant.phone || restaurant.instagram || restaurant.whatsapp || restaurant.address) && (
          <MenuNavLink href={`/m/${slug}/contacts${previewParam}`} className="border-t border-gray-300/25 flex justify-center px-[8%]">
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <Phone className="h-5 w-5" />
              {t("contacts")}
            </span>
          </MenuNavLink>
        )}
        {(restaurant.languages?.length || 0) > 1 && (
          <MenuNavLink href={`/m/${slug}/language/${previewParam}`} className="border-t border-gray-300/25 flex justify-center px-[8%]">
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <Globe className="h-5 w-5" />
              {t("language")}
            </span>
          </MenuNavLink>
        )}
      </nav>

      {/* Online Menu block */}
      <MenuNavLink
        href={`/m/${slug}/menu/${previewParam}`}
        className="flex justify-center px-[8%]"
        style={{ backgroundColor: restaurant.accentColor }}
        prefetch
      >
        <span className="max-w-[440px] w-full py-8 flex items-center justify-between text-white font-bold uppercase text-xl">
          {t("onlineMenu")}
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
        </span>
      </MenuNavLink>
    </div>
  );
}
