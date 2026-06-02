import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, CalendarDays, Globe, Phone } from "lucide-react";
import { useMenu } from "../lib/menu-context";
import { HeroMedia } from "../components/hero-media";
import { MenuNavLink } from "../components/menu-nav-link";
import { RouteSeo } from "../components/route-seo";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const { restaurant } = useMenu();
  const { t } = useTranslation();
  const accentColor = restaurant.accentColor || "#000000";

  // Hero font scale set in the dashboard design settings. Proportional steps;
  // classes are spelled out so Tailwind keeps them through purge.
  const scale = restaurant.titleScale ?? "large";
  const titleSizeCls =
    scale === "small" ? "text-4xl" : scale === "medium" ? "text-5xl" : "text-6xl";
  const descSizeCls =
    scale === "small" ? "text-base" : scale === "medium" ? "text-lg" : "text-xl";

  // Language switcher placement. "top" = a globe icon floating over the hero;
  // "inline" (default) = a row in the nav list below. Only meaningful with >1
  // language — otherwise no switcher shows at all.
  const multiLang = (restaurant.languages?.length ?? 0) > 1;
  const langTop = multiLang && restaurant.languageSwitcher === "top";
  const langInline = multiLang && restaurant.languageSwitcher !== "top";

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.title,
    url: window.location.origin + "/",
    ...(restaurant.description && { description: restaurant.description }),
    ...(restaurant.source && !/\.(mp4|webm|mov)$/i.test(restaurant.source) && { image: restaurant.source }),
    ...(restaurant.address && { address: { "@type": "PostalAddress", streetAddress: restaurant.address } }),
    ...(restaurant.phone && { telephone: restaurant.phone }),
    ...(restaurant.x && restaurant.y && {
      geo: { "@type": "GeoCoordinates", latitude: restaurant.y, longitude: restaurant.x },
    }),
  };

  return (
    <div className="h-dvh flex flex-col">
      <RouteSeo jsonLd={jsonLd} />
      <div className="flex-1 relative overflow-hidden min-h-[50vh]">
        {restaurant.source ? (
          <HeroMedia src={restaurant.source} alt={restaurant.title} accentColor={accentColor} />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: accentColor }} />
        )}

        {langTop ? (
          <MenuNavLink
            to="/language"
            className="absolute top-3 right-3 z-20 flex items-center justify-center h-11 w-11 rounded-full bg-black/35 backdrop-blur-sm text-white"
          >
            <Globe className="h-5 w-5" />
          </MenuNavLink>
        ) : null}

        {!restaurant.hideTitle ? (
          <>
            {restaurant.source ? <div className="absolute inset-0 bg-black/40 z-[2]" /> : null}
            <div className={`absolute inset-x-0 ${langTop ? "top-[34%]" : "top-[30%]"} z-10 flex justify-center px-[8%]`}>
              <div className="max-w-[440px] w-full">
                <h1 className={`${titleSizeCls} font-black text-white break-words`}>{restaurant.title}</h1>
                {restaurant.description ? (
                  <p className={`${descSizeCls} text-white/90 mt-3`}>{restaurant.description}</p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <nav className="bg-white">
        {restaurant.reservationsEnabled ? (
          <MenuNavLink to="/reserve" className="border-t border-gray-300/25 flex justify-center px-[8%]">
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <CalendarDays className="h-5 w-5" />
              {t("publicMenu.reserve")}
            </span>
          </MenuNavLink>
        ) : null}
        {restaurant.phone || restaurant.instagram || restaurant.whatsapp || restaurant.address ? (
          <MenuNavLink to="/contacts" className="border-t border-gray-300/25 flex justify-center px-[8%]">
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <Phone className="h-5 w-5" />
              {t("publicMenu.contacts")}
            </span>
          </MenuNavLink>
        ) : null}
        {langInline ? (
          <MenuNavLink to="/language" className="border-t border-gray-300/25 flex justify-center px-[8%]">
            <span className="max-w-[440px] w-full py-[22px] flex items-center gap-3 text-black font-semibold">
              <Globe className="h-5 w-5" />
              {t("publicMenu.language")}
            </span>
          </MenuNavLink>
        ) : null}
      </nav>

      <MenuNavLink to="/menu" className="flex justify-center px-[8%]" style={{ backgroundColor: accentColor }}>
        <span className="max-w-[440px] w-full py-8 flex items-center justify-between text-white font-bold uppercase text-xl">
          {t("publicMenu.onlineMenu")}
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
        </span>
      </MenuNavLink>
    </div>
  );
}
