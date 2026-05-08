import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { ReserveForm } from "../components/reserve-form";

export const Route = createLazyFileRoute("/reserve")({ component: ReservePage });

function ReservePage() {
  const { restaurant } = useMenu();
  const { t } = useTranslation();
  return (
    <div className="h-dvh flex flex-col bg-white">
      <MenuHeader title={t("publicReserve.title")} accentColor={restaurant.accentColor} sticky />
      <div className="flex-1 overflow-auto px-5 py-6">
        <div className="max-w-[440px] mx-auto">
          <ReserveForm />
        </div>
      </div>
    </div>
  );
}
