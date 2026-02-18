import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Phone, Globe, CalendarDays } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { MenuNavLink } from "./_components";
import { trackPageView } from "./_lib/track";

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

interface MenuPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{ preview?: string }>;
}

async function getRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      hideTitle: true,
      source: true,
      address: true,
      phone: true,
      instagram: true,
      whatsapp: true,
      accentColor: true,
      reservationsEnabled: true,
      languages: true,
      company: {
        select: {
          plan: true,
        },
      },
      _count: {
        select: {
          tables: {
            where: { isActive: true },
          },
        },
      },
    },
  });

  return restaurant;
}

export default async function MenuPage({ params, searchParams }: MenuPageProps) {
  const { slug, locale } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "1";
  const previewParam = isPreview ? "?preview=1" : "";
  const [restaurant, t] = await Promise.all([
    getRestaurant(slug),
    getTranslations("publicMenu"),
    ...(!isPreview ? [trackPageView(slug, "home", locale)] : []),
  ]);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="h-dvh flex flex-col">
      {/* Hero section with background - takes remaining space */}
      <div className="flex-1 relative overflow-hidden min-h-[50vh]">
        {/* Background media */}
        {restaurant.source ? (
          isVideo(restaurant.source) ? (
            <video
              src={restaurant.source}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={restaurant.source}
              alt={restaurant.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}
        {/* Powered by IQ Rest - only for free plan */}
        {restaurant.company.plan === "FREE" && (
          <a
            href="https://iq-rest.com?from=qrmenu"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            <span className="text-white/70 text-sm">Powered by IQ Rest</span>
          </a>
        )}
        {/* Dark overlay and title - hidden if hideTitle is true */}
        {!restaurant.hideTitle && (
          <>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Restaurant name at 30% from top */}
            <div className="absolute inset-x-0 top-[30%] z-10 flex justify-center px-[8%]">
              <div className="max-w-[440px] w-full">
                <h1 className="text-6xl font-black text-white break-words">{restaurant.title}</h1>
                {restaurant.description && (
                  <p className="text-xl text-white/90 mt-3">{restaurant.description}</p>
                )}
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
      >
        <span className="max-w-[440px] w-full py-8 flex items-center justify-between text-white font-bold uppercase text-xl">
          {t("onlineMenu")}
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
        </span>
      </MenuNavLink>
    </div>
  );
}
