"use client";

import { useState, useEffect, useMemo } from "react";
import { useBackIntercept } from "../_hooks/use-back-intercept";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";
import { PageHeader } from "../_ui/page-header";

interface Table {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
}

interface TablesPageProps {
  initialTables: Table[];
}

export function TablesPage({ initialTables }: TablesPageProps) {
  useBackIntercept("/dashboard");
  const t = useTranslations("reservations");
  const { translations } = useDashboard();
  const router = useRouter();
  const pageTitle = translations.pages.tables;

  const [tables, setTables] = useState<Table[]>(initialTables);
  const [sortMode, setSortMode] = useState(false);
  const [moving, setMoving] = useState<{ id: string; direction: "up" | "down" } | null>(null);

  useEffect(() => {
    track(DashboardEvent.SHOWED_TABLES);
  }, []);

  async function handleToggleActive(tableId: string, currentActive: boolean, tableNumber: number) {
    const newActive = !currentActive;

    setTables((prev) =>
      prev.map((table) => (table.id === tableId ? { ...table, isActive: newActive } : table))
    );

    try {
      const res = await fetch(`/api/tables/${tableId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setTables((prev) =>
          prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
        );
        track(DashboardEvent.ERROR_TOGGLE, { page: "tables" });
        toast.error(t("error"));
      } else {
        toast.success(newActive ? `${t("table")} ${tableNumber} ${t("active").toLowerCase()}` : `${t("table")} ${tableNumber} ${t("inactive").toLowerCase()}`);
      }
    } catch {
      setTables((prev) =>
        prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
      );
      track(DashboardEvent.ERROR_TOGGLE, { page: "tables" });
      toast.error(t("error"));
    }
  }

  const sortedTables = useMemo(
    () => [...tables].sort((a, b) => a.sortOrder - b.sortOrder),
    [tables]
  );

  async function handleMoveTable(tableId: string, direction: "up" | "down") {
    track(DashboardEvent.SORTED_TABLE);
    const sorted = [...tables].sort((a, b) => a.sortOrder - b.sortOrder);
    const currentIndex = sorted.findIndex((t) => t.id === tableId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    const current = sorted[currentIndex];
    const swap = sorted[swapIndex];

    setMoving({ id: tableId, direction });

    try {
      const newSorted = sorted.map((t) => {
        if (t.id === current.id) return { ...t, sortOrder: swap.sortOrder };
        if (t.id === swap.id) return { ...t, sortOrder: current.sortOrder };
        return t;
      }).sort((a, b) => a.sortOrder - b.sortOrder);

      const tableOrder = newSorted.map((tbl, index) => ({
        id: tbl.id,
        sortOrder: index,
      }));

      const res = await fetch("/api/tables/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: tableOrder }),
      });

      if (res.ok) {
        setTables((prev) =>
          prev.map((t) => {
            if (t.id === current.id) return { ...t, sortOrder: swap.sortOrder };
            if (t.id === swap.id) return { ...t, sortOrder: current.sortOrder };
            return t;
          })
        );
      } else {
        track(DashboardEvent.ERROR_SORT, { page: "tables" });
        toast.error(t("error"));
      }
    } catch {
      track(DashboardEvent.ERROR_SORT, { page: "tables" });
      toast.error(t("error"));
    } finally {
      setMoving(null);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
        <PageHeader title={pageTitle} backHref="/dashboard">
          {tables.length > 1 && (
            sortMode ? (
              <button
                onClick={() => setSortMode(false)}
                className="flex items-center justify-center h-10 w-10 -mr-2"
              >
                <Check className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => { track(DashboardEvent.CLICKED_SORT_TABLES); setSortMode(true); }}
                className="flex items-center justify-center h-10 w-10 -mr-2"
              >
                <ArrowUpDown className="h-5 w-5" />
              </button>
            )
          )}
        </PageHeader>
      </div>

      <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">
          {tables.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <p className="text-muted-foreground/60 text-center">{t("noTables")}</p>
              <button
                onClick={() => { track(DashboardEvent.CLICKED_ADD_TABLE); router.push("/dashboard/tables/add"); }}
                className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
              >
                <Plus className="h-4 w-4" />
                {t("addTable")}
              </button>
            </div>
          ) : (
            <>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{pageTitle}</p>
                <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                  {sortedTables.map((table, index) => (
                    <div key={table.id}>
                      {index > 0 && <div className="border-t border-border mx-4" />}
                      <div className="flex items-center h-11 px-4">
                        {!sortMode && (
                          <div className="mr-3" onClick={(e) => e.stopPropagation()}>
                            <Switch
                              checked={table.isActive}
                              onCheckedChange={() => {
                                track(DashboardEvent.TOGGLED_TABLES_LIST_ACTIVE);
                                handleToggleActive(table.id, table.isActive, table.number);
                              }}
                            />
                          </div>
                        )}
                        <div
                          className={`flex items-center flex-1 min-w-0 ${!sortMode ? "cursor-pointer" : ""}`}
                          onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_TABLE_ROW); router.push(`/dashboard/tables/${table.id}`); } }}
                        >
                          <span className="text-sm font-medium truncate">{t("table")} {table.number}</span>
                          {!sortMode && (
                            <span className="text-sm text-muted-foreground ml-auto shrink-0">
                              {table.capacity} {t("guests").slice(0, 3)}.
                            </span>
                          )}
                        </div>
                        {sortMode && (
                          <div className="flex items-center gap-0.5 ml-auto -mr-1">
                            <button
                              onClick={() => handleMoveTable(table.id, "up")}
                              disabled={index === 0 || !!moving}
                              className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-30"
                            >
                              {moving?.id === table.id && moving.direction === "up" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <ArrowUp className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleMoveTable(table.id, "down")}
                              disabled={index === sortedTables.length - 1 || !!moving}
                              className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-30"
                            >
                              {moving?.id === table.id && moving.direction === "down" ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <ArrowDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!sortMode && (
                <div className="flex justify-center">
                  <button
                    onClick={() => { track(DashboardEvent.CLICKED_ADD_TABLE); router.push("/dashboard/tables/add"); }}
                    className="flex items-center gap-2 h-10 px-5 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
                  >
                    <Plus className="h-4 w-4" />
                    {t("addTable")}
                  </button>
                </div>
              )}
            </>
          )}
        </DashboardContent>
      </div>
    </div>
  );
}
