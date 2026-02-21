"use client";

import { useState, useEffect, useMemo } from "react";
import { useBackIntercept } from "../_hooks/use-back-intercept";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";

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
      {/* Custom header */}
      <header className="shrink-0 shadow-sm px-6 bg-muted/50">
        <div className="flex items-center py-3 max-w-lg mx-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center h-10 w-10 -ml-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold flex-1 ml-3">{pageTitle}</h1>
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
        </div>
      </header>

      {/* Content */}
      <div className="relative flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto">
        {tables.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-muted-foreground text-center">{t("noTables")}</p>
            <Button onClick={() => { track(DashboardEvent.CLICKED_ADD_TABLE); router.push("/dashboard/tables/add"); }} variant="destructive" className="h-12 w-full rounded-2xl shadow-md">
              <Plus className="h-4 w-4" />
              {t("addTable")}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col min-h-full">
            <div className="flex-1 pb-4">
              <div className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                <div className="flex items-center px-4 h-12 bg-muted/30">
                  <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{pageTitle}</span>
                </div>
                {sortedTables.map((table, index) => (
                  <div
                    key={table.id}
                    className="flex items-center border-t border-foreground/5"
                  >
                    <div
                      onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_TABLE_ROW); router.push(`/dashboard/tables/${table.id}`); } }}
                      className={`flex items-center flex-1 min-w-0 h-12 px-4 transition-colors ${
                        sortMode ? "" : "cursor-pointer hover:bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {!sortMode && (
                          <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                            <Switch
                              checked={table.isActive}
                              onCheckedChange={() => {
                                track(DashboardEvent.TOGGLED_TABLES_LIST_ACTIVE);
                                handleToggleActive(table.id, table.isActive, table.number);
                              }}
                            />
                          </div>
                        )}
                        <span className="text-sm font-medium truncate">{t("table")} {table.number}</span>
                      </div>
                      {!sortMode && (
                        <span className="text-sm text-muted-foreground ml-2">
                          {table.capacity} {t("guests").slice(0, 3)}.
                        </span>
                      )}
                    </div>
                    {sortMode && (
                      <div className="flex items-center gap-0.5 pr-2">
                        <button
                          onClick={() => handleMoveTable(table.id, "up")}
                          disabled={index === 0 || !!moving}
                          className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/30 transition-colors disabled:opacity-30"
                        >
                          {moving && moving.id === table.id && moving.direction === "up" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowUp className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleMoveTable(table.id, "down")}
                          disabled={index === sortedTables.length - 1 || !!moving}
                          className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/30 transition-colors disabled:opacity-30"
                        >
                          {moving && moving.id === table.id && moving.direction === "down" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {!sortMode && (
                  <div
                    className="flex items-center h-12 px-4 border-t border-foreground/5 cursor-pointer transition-colors bg-green-500/5 hover:bg-green-500/10"
                    onClick={() => { track(DashboardEvent.CLICKED_ADD_TABLE); router.push("/dashboard/tables/add"); }}
                  >
                    <Plus className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-400">{t("addTable")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
