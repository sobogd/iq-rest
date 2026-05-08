import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { RouteSeo } from "../components/route-seo";

export const Route = createLazyFileRoute("/order/success")({ component: OrderSuccessPage });

function OrderSuccessPage() {
  const { restaurant } = useMenu();
  const { t } = useTranslation();
  const label = t("publicMenu.order.successTitle", { defaultValue: "Order placed" });
  return (
    <div className="h-dvh flex flex-col items-center justify-center px-6 text-center gap-6 bg-white">
      <RouteSeo routeLabel={label} />
      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: restaurant.accentColor }}>
        <Check className="h-10 w-10 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-black">
        {label}
      </h1>
      <p className="text-gray-600 max-w-xs">
        {t("publicMenu.order.successBody", { defaultValue: "Thanks! The restaurant will get back to you shortly." })}
      </p>
      <Link to="/" className="px-5 py-3 rounded-lg text-white font-semibold" style={{ backgroundColor: restaurant.accentColor }}>
        {t("publicMenu.order.backHome", { defaultValue: "Back to home" })}
      </Link>
    </div>
  );
}
