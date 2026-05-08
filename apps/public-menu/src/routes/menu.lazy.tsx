import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuFeed } from "../components/menu-feed";
import { MenuHeader } from "../components/menu-header";
import { PageTitle } from "../components/page-title";

export const Route = createLazyFileRoute("/menu")({ component: MenuPage });

function MenuPage() {
  const { restaurant } = useMenu();
  const { t } = useTranslation();
  const label = t("publicMenu.onlineMenu");
  return (
    <div className="h-dvh flex flex-col">
      <PageTitle routeLabel={label} />
      <MenuHeader title={label} accentColor={restaurant.accentColor} sticky />
      <MenuFeed />
    </div>
  );
}
