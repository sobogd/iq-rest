import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuFeed } from "../components/menu-feed";
import { MenuHeader } from "../components/menu-header";
import { RouteSeo } from "../components/route-seo";
import { tField } from "../lib/translations";

export const Route = createLazyFileRoute("/menu")({ component: MenuPage });

function MenuPage() {
  const { restaurant, categories, items } = useMenu();
  const { t, i18n } = useTranslation();
  const label = t("publicMenu.onlineMenu");

  const lang = i18n.language;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${restaurant.title} — ${label}`,
    hasMenuSection: categories.map((cat) => ({
      "@type": "MenuSection",
      name: tField(cat.name, cat.translations, "name", lang),
      hasMenuItem: items
        .filter((it) => it.categoryId === cat.id)
        .map((it) => ({
          "@type": "MenuItem",
          name: tField(it.name, it.translations, "name", lang),
          ...(it.description && { description: tField(it.description, it.translations, "description", lang) }),
          ...(it.imageUrl && { image: it.imageUrl }),
          offers: { "@type": "Offer", price: it.price, priceCurrency: restaurant.currency },
        })),
    })),
  };

  return (
    <div className="h-dvh flex flex-col">
      <RouteSeo routeLabel={label} jsonLd={jsonLd} />
      <MenuHeader title={label} accentColor={restaurant.accentColor} sticky />
      <MenuFeed />
    </div>
  );
}
