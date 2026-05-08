import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { OrderForm } from "../components/order-form";
import { RouteSeo } from "../components/route-seo";

export const Route = createLazyFileRoute("/order/")({ component: OrderPage });

function OrderPage() {
  const { restaurant } = useMenu();
  const { t } = useTranslation();
  const label = t("publicMenu.order.yourOrder");
  return (
    <div className="h-dvh flex flex-col bg-white">
      <RouteSeo routeLabel={label} />
      <MenuHeader title={label} accentColor={restaurant.accentColor} backTo="/menu" sticky />
      <div className="flex-1 overflow-auto px-5 py-6">
        <div className="max-w-[440px] mx-auto">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
