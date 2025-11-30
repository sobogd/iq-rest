import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Phone, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url);
}

interface MenuPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

async function getRestaurant(slug: string) {
  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: {
      id: true,
      title: true,
      description: true,
      source: true,
      address: true,
      phone: true,
      instagram: true,
      whatsapp: true,
    },
  });

  return restaurant;
}

export default async function MenuPage({ params }: MenuPageProps) {
  const { slug, locale } = await params;
  const [restaurant, t] = await Promise.all([
    getRestaurant(slug),
    getTranslations("publicMenu"),
  ]);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Hero section with background - takes remaining space */}
      <div className="flex-1 bg-black relative overflow-hidden">
        {/* Background media */}
        {restaurant.source && (
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
              priority
            />
          )
        )}
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
      </div>

      {/* Navigation links */}
      <nav className="bg-white">
        <Link href={`/m/${slug}/contacts`} className="border-t border-gray-300/25 flex justify-center px-[8%]">
          <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
            <Phone className="h-5 w-5" />
            {t("contacts")}
          </span>
        </Link>
        <Link href={`/m/${slug}/language/`} className="border-t border-gray-300/25 flex justify-center px-[8%]">
          <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
            <Globe className="h-5 w-5" />
            {t("language")}
          </span>
        </Link>
      </nav>

      {/* Online Menu block */}
      <Link href={`/m/${slug}/menu/`} className="bg-black flex justify-center px-[8%]">
        <span className="max-w-[440px] w-full pt-8 pb-12 flex items-center justify-between text-white font-bold uppercase text-xl">
          {t("onlineMenu")}
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
        </span>
      </Link>
    </div>
  );
}
