import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useMenu } from "../lib/menu-context";
import { MenuHeader } from "../components/menu-header";
import { tField } from "../lib/translations";
import { PageTitle } from "../components/page-title";

export const Route = createLazyFileRoute("/order/table")({ component: OrderTablePage });

function OrderTablePage() {
  const { restaurant, tables } = useMenu();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const accentColor = restaurant.accentColor || "#000";
  const isPreview = new URLSearchParams(window.location.search).get("preview") === "1";

  function pick(num: number) {
    navigate({
      to: "/order",
      search: { table: String(num), ...(isPreview ? { preview: "1" } : {}) },
    });
  }

  const label = t("publicReserve.selectTable", { defaultValue: "Select a table" });
  return (
    <div className="h-dvh flex flex-col bg-white">
      <PageTitle routeLabel={label} />
      <MenuHeader
        title={label}
        accentColor={accentColor}
        backTo="/menu"
        sticky
      />
      <div className="flex-1 overflow-auto px-5 py-6">
        <div className="max-w-[440px] mx-auto flex flex-col gap-3">
          {tables.map((table) => {
            const zone = tField(table.zone, table.translations, "zone", i18n.language);
            return (
              <button
                key={table.id}
                onClick={() => pick(table.number)}
                className="flex items-center gap-3 w-full text-left"
              >
                {table.imageUrl ? (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img src={table.imageUrl} alt={`${t("publicReserve.table")} ${table.number}`} className="w-full h-full object-cover" />
                  </div>
                ) : null}
                <div
                  className="flex-1 h-16 rounded-lg border-2 transition-colors flex flex-col justify-center px-4"
                  style={{ borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#000" }}
                >
                  <span className="text-sm font-semibold">
                    {zone || `${t("publicReserve.table")} ${table.number}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {table.capacity} {t("publicReserve.guests")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
