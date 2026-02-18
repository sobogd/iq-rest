"use client";

import { useState, useMemo, useEffect } from "react";
import { ArrowUp, ArrowDown, Plus, ArrowUpDown, ArrowLeft, Loader2, Check, X, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useDashboard } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import type { Category } from "@/types";
import { formatPrice } from "@/lib/currencies";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface ItemWithTranslations {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  allergens: string[];
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
  category: Pick<Category, "id" | "name" | "sortOrder">;
}

interface MenuPageProps {
  initialItems: ItemWithTranslations[];
  initialCategories: Category[];
  initialCurrency: string;
  checklistMenuEdited: boolean;
  startedFromScratch: boolean;
}

export function MenuPage({ initialItems, initialCategories, initialCurrency, checklistMenuEdited, startedFromScratch }: MenuPageProps) {
  const { translations } = useDashboard();
  const router = useRouter();
  const tItems = translations.items;
  const tCategories = translations.categories;
  const tMenu = translations.menu;
  const pageTitle = translations.pages.menu;

  const [items, setItems] = useState<ItemWithTranslations[]>(initialItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [currency] = useState(initialCurrency);
  const [sortMode, setSortMode] = useState(false);
  const [moving, setMoving] = useState<{ id: string; direction: "up" | "down" } | null>(null);
  const hasNoItems = initialItems.length === 0;
  const [showBanner, setShowBanner] = useState(hasNoItems || !checklistMenuEdited);
  const isSampleMenu = !checklistMenuEdited;

  useEffect(() => {
    track(DashboardEvent.SHOWED_MENU);
  }, []);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sortOrder - b.sortOrder),
    [categories]
  );

  async function handleToggleItemActive(
    itemId: string,
    currentActive: boolean,
    itemName: string
  ) {
    const newActive = !currentActive;

    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, isActive: newActive } : i))
    );

    try {
      const res = await fetch(`/api/items/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setItems((prev) =>
          prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
        );
        toast.error(tItems.updateError);
      } else {
        toast.success(newActive ? `${itemName} ${tItems.enabled}` : `${itemName} ${tItems.disabled}`);
      }
    } catch {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
      );
      toast.error(tItems.updateError);
    }
  }

  async function handleMoveCategory(categoryId: string, direction: "up" | "down") {
    track(DashboardEvent.SORTED_CATEGORY);
    const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
    const currentIndex = sorted.findIndex((c) => c.id === categoryId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    const current = sorted[currentIndex];
    const swap = sorted[swapIndex];

    setMoving({ id: categoryId, direction });

    try {
      const newSorted = sorted.map((c) => {
        if (c.id === current.id) return { ...c, sortOrder: swap.sortOrder };
        if (c.id === swap.id) return { ...c, sortOrder: current.sortOrder };
        return c;
      }).sort((a, b) => a.sortOrder - b.sortOrder);

      const categoryOrder = newSorted.map((cat, index) => ({
        id: cat.id,
        sortOrder: index,
      }));

      const res = await fetch("/api/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: categoryOrder }),
      });

      if (res.ok) {
        setCategories((prev) =>
          prev.map((c) => {
            if (c.id === current.id) return { ...c, sortOrder: swap.sortOrder };
            if (c.id === swap.id) return { ...c, sortOrder: current.sortOrder };
            return c;
          })
        );
      } else {
        toast.error(tItems.sortError);
      }
    } catch {
      toast.error(tItems.sortError);
    } finally {
      setMoving(null);
    }
  }

  async function handleMoveItem(itemId: string, direction: "up" | "down") {
    track(DashboardEvent.SORTED_ITEM);
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const categoryItems = items
      .filter((i) => i.categoryId === item.categoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const currentIndex = categoryItems.findIndex((i) => i.id === itemId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= categoryItems.length) return;

    const swapItem = categoryItems[swapIndex];

    setMoving({ id: itemId, direction });

    try {
      const newItems = items.map((i) => {
        if (i.id === itemId) return { ...i, sortOrder: swapItem.sortOrder };
        if (i.id === swapItem.id) return { ...i, sortOrder: item.sortOrder };
        return i;
      });

      const newCategoryItems = newItems
        .filter((i) => i.categoryId === item.categoryId)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((i, index) => ({ id: i.id, sortOrder: index }));

      const res = await fetch("/api/items/reorder-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryId: item.categoryId, items: newCategoryItems }),
      });

      if (res.ok) {
        setItems(newItems);
      } else {
        toast.error(tItems.sortError);
      }
    } catch {
      toast.error(tItems.sortError);
    } finally {
      setMoving(null);
    }
  }

  const showSortButton = categories.length > 1 || items.length > 1;

  return (
    <div className="flex flex-col h-full">
      {/* Custom header */}
      <header className="shrink-0 shadow-sm px-6 bg-muted/50">
        <div className="flex items-center py-3 max-w-lg mx-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center h-10 w-10 -webkit-tap-highlight-color-transparent"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold flex-1 ml-3">{pageTitle}</h1>
          {showSortButton && (
            sortMode ? (
              <button
                onClick={() => setSortMode(false)}
                className="flex items-center justify-center h-10 w-10"
              >
                <Check className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => { track(DashboardEvent.CLICKED_SORT_MENU); setSortMode(true); }}
                className="flex items-center justify-center h-10 w-10"
              >
                <ArrowUpDown className="h-5 w-5" />
              </button>
            )
          )}
        </div>
      </header>

      {/* Content */}
      <div className="relative flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto h-full">
        {categories.length === 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300 flex-1">
                {tMenu.scratchBanner}
              </p>
            </div>
            <div className="flex items-center justify-center flex-1">
              <p className="text-sm text-muted-foreground text-center">
                {tCategories.noCategories}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => { track(DashboardEvent.CLICKED_ADD_CATEGORY); router.push("/dashboard/categories/add"); }}
              className="w-full h-12 rounded-2xl shadow-md shrink-0"
            >
              <Plus className="h-4 w-4" />
              {tMenu.addCategory}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col min-h-full">
            <div className="pb-4 flex flex-col gap-4 flex-1">
              {showBanner && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300 flex-1">
                    {items.length === 0 ? tMenu.noItemsBanner : tMenu.sampleBanner}
                  </p>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="shrink-0 text-blue-400 hover:text-blue-600 dark:hover:text-blue-200 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {sortedCategories.map((category, catIndex) => {
                const categoryItems = items
                  .filter((i) => i.categoryId === category.id)
                  .sort((a, b) => a.sortOrder - b.sortOrder);

                return (
                  <div key={category.id} className="rounded-2xl border border-border bg-muted/50 overflow-hidden">
                    {/* Category header */}
                    <div
                      onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_CATEGORY_ROW); router.push(`/dashboard/categories/${category.id}`); } }}
                      className={`flex items-center gap-2 px-4 h-12 bg-muted/30 transition-colors ${
                        sortMode ? "" : "cursor-pointer hover:bg-muted/50"
                      }`}
                    >
                      {sortMode && (
                        <div className="flex items-center gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveCategory(category.id, "up")}
                            disabled={catIndex === 0 || !!moving}
                            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-30"
                          >
                            {moving && moving.id === category.id && moving.direction === "up" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <ArrowUp className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleMoveCategory(category.id, "down")}
                            disabled={catIndex === sortedCategories.length - 1 || !!moving}
                            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-30"
                          >
                            {moving && moving.id === category.id && moving.direction === "down" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      )}
                      <div className={`flex items-center flex-1 min-w-0 ${sortMode ? "ml-2" : ""}`}>
                        <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground truncate">{category.name}</span>
                        {!sortMode && <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0 ml-1" />}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      {categoryItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 border-t border-foreground/5"
                        >
                          <div
                            onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_ITEM_ROW); router.push(`/dashboard/items/${item.id}`); } }}
                            className={`flex items-center flex-1 min-w-0 h-12 px-4 transition-colors ${
                              sortMode ? "" : "hover:bg-muted/30 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {!sortMode && !isSampleMenu && (
                                <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                                  <Switch
                                    checked={item.isActive}
                                    onCheckedChange={() => {
                                      track(DashboardEvent.TOGGLED_MENU_ITEM_ACTIVE);
                                      handleToggleItemActive(item.id, item.isActive, item.name);
                                    }}
                                  />
                                </div>
                              )}
                              <span className="text-sm font-medium truncate">{item.name}</span>
                            </div>

                            {!sortMode && (
                              <span className="text-sm text-muted-foreground ml-2">
                                {formatPrice(item.price, currency)}
                              </span>
                            )}
                          </div>

                          {sortMode && (
                            <div className="flex items-center gap-0.5 pr-2">
                              <button
                                onClick={() => handleMoveItem(item.id, "up")}
                                disabled={index === 0 || !!moving}
                                className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/30 transition-colors disabled:opacity-30"
                              >
                                {moving && moving.id === item.id && moving.direction === "up" ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <ArrowUp className="h-4 w-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleMoveItem(item.id, "down")}
                                disabled={index === categoryItems.length - 1 || !!moving}
                                className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/30 transition-colors disabled:opacity-30"
                              >
                                {moving && moving.id === item.id && moving.direction === "down" ? (
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
                          onClick={() => { track(DashboardEvent.CLICKED_ADD_ITEM); router.push(`/dashboard/items/add?categoryId=${category.id}`); }}
                        >
                          <Plus className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-400">{tMenu.addItem}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add category button */}
            {!sortMode && (
              <Button
                variant="destructive"
                onClick={() => { track(DashboardEvent.CLICKED_ADD_CATEGORY); router.push("/dashboard/categories/add"); }}
                className="w-full h-12 rounded-2xl shadow-md"
              >
                <Plus className="h-4 w-4" />
                {tMenu.addCategory}
              </Button>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
