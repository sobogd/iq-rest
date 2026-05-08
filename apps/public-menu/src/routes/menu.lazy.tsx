import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuFeed } from "../components/menu-feed";
import { MenuHeader } from "../components/menu-header";

export const Route = createLazyFileRoute("/menu")({ component: MenuPage });

function MenuPage() {
  const { restaurant } = useMenu();
  const { t } = useTranslation();
  return (
    <div className="h-dvh flex flex-col">
      <MenuHeader title={t("publicMenu.onlineMenu")} accentColor={restaurant.accentColor} sticky />
      <MenuFeed />
    </div>
  );
}
