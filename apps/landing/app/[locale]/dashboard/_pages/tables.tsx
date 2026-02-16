"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, X, ArrowLeft, Check } from "lucide-react";
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
  const t = useTranslations("reservations");
  const { translations } = useDashboard();
  const router = useRouter();
  const pageTitle = translations.pages.tables;

  const [tables, setTables] = useState<Table[]>(initialTables);
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<Table[]>([]);
  const [savingSort, setSavingSort] = useState(false);

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
        toast.error(t("error"));
      } else {
        toast.success(newActive ? `${t("table")} ${tableNumber} ${t("active").toLowerCase()}` : `${t("table")} ${tableNumber} ${t("inactive").toLowerCase()}`);
      }
    } catch {
      setTables((prev) =>
        prev.map((table) => (table.id === tableId ? { ...table, isActive: currentActive } : table))
      );
      toast.error(t("error"));
    }
  }

  function handleStartSortMode() {
    setOriginalOrder([...tables]);
    setSortMode(true);
  }

  function handleCancelSortMode() {
    setTables(originalOrder);
    setSortMode(false);
  }

  function handleMoveTable(tableId: string, direction: "up" | "down") {
    track(DashboardEvent.SORTED_TABLE);
    const currentIndex = tables.findIndex((t) => t.id === tableId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= tables.length) return;

    const newTables = [...tables];
    [newTables[currentIndex], newTables[swapIndex]] = [
      newTables[swapIndex],
      newTables[currentIndex],
    ];
    setTables(newTables);
  }

  async function handleSaveSortOrder() {
    setSavingSort(true);

    try {
      const sortOrder = tables.map((table, index) => ({
        id: table.id,
        sortOrder: index,
      }));

      const res = await fetch("/api/tables/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: sortOrder }),
      });

      if (res.ok) {
        toast.success(t("save"));
        setSortMode(false);
      } else {
        toast.error(t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setSavingSort(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Custom header */}
      <header className="shrink-0 shadow-sm px-6">
        <div className="flex items-center py-3 max-w-lg mx-auto">
          {sortMode ? (
            <>
              <button
                onClick={handleCancelSortMode}
                disabled={savingSort}
                className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold flex-1 ml-3">{pageTitle}</h1>
              <button
                onClick={handleSaveSortOrder}
                disabled={savingSort}
                className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors text-primary"
              >
                {savingSort ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold flex-1 ml-3">{pageTitle}</h1>
              {tables.length > 1 && (
                <button
                  onClick={() => { track(DashboardEvent.CLICKED_SORT_TABLES); handleStartSortMode(); }}
                  className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <ArrowUpDown className="h-5 w-5" />
                </button>
              )}
            </>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="relative flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto">
        {tables.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-muted-foreground text-center">{t("noTables")}</p>
            <Button onClick={() => { track(DashboardEvent.CLICKED_ADD_TABLE); router.push("/dashboard/tables/add"); }} variant="destructive" className="h-10 rounded-xl shadow-md">
              <Plus className="h-4 w-4" />
              {t("addTable")}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2 pb-16">
              {tables.map((table, index) => (
                <div
                  key={table.id}
                  className="flex items-center gap-2"
                >
                  <div
                    onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_TABLE_ROW); router.push(`/dashboard/tables/${table.id}`); } }}
                    className={`flex items-center flex-1 min-w-0 h-12 px-4 bg-muted/30 rounded-xl transition-colors ${
                      sortMode ? "" : "hover:bg-muted/50 cursor-pointer"
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
                      <span className="text-sm font-medium">{t("table")} {table.number}</span>
                    </div>

                    {!sortMode && (
                      <span className="text-sm text-muted-foreground ml-2">
                        {table.capacity} {t("guests").slice(0, 3)}.
                      </span>
                    )}
                  </div>

                  {sortMode && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveTable(table.id, "up")}
                        disabled={index === 0}
                        className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveTable(table.id, "down")}
                        disabled={index === tables.length - 1}
                        className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </>
        )}

        {/* Fixed add button */}
        {tables.length > 0 && !sortMode && (
          <div className="sticky bottom-0 flex justify-end pt-4 pb-2">
            <Button onClick={() => { track(DashboardEvent.CLICKED_ADD_TABLE); router.push("/dashboard/tables/add"); }} variant="destructive" className="h-10 rounded-xl shadow-md">
              <Plus className="h-4 w-4" />
              {t("addTable")}
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
