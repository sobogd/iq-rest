import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { OrderForm } from "../components/order-form";

export const Route = createLazyFileRoute("/order/")({ component: OrderPage });

function OrderPage() {
  const { restaurant, tables } = useMenu();
  const { t } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const tableQ = params.get("table");
  if (tables.length > 0 && !tableQ) {
    return <Navigate to="/order/table" search={Object.fromEntries(params.entries())} replace />;
  }
  return (
    <div className="h-dvh flex flex-col bg-white">
      <MenuHeader title={t("publicMenu.order.yourOrder")} accentColor={restaurant.accentColor} backTo="/menu" sticky />
      <div className="flex-1 overflow-auto px-5 py-6">
        <div className="max-w-[440px] mx-auto">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
