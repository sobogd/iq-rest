"use client";

import { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, Plus, ArrowUpDown, ArrowLeft, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useDashboard } from "../_context/dashboard-context";
import { useRouter } from "@/i18n/routing";
import type { Category } from "@/types";
import { formatPrice } from "@/lib/currencies";

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
}

export function MenuPage({ initialItems, initialCategories, initialCurrency }: MenuPageProps) {
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
      <header className="flex shrink-0 items-center px-6 py-4 shadow-sm">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1 ml-3">{pageTitle}</h1>
        {showSortButton && (
          sortMode ? (
            <button
              onClick={() => setSortMode(false)}
              className="flex items-center justify-center h-10 px-3 gap-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              <Check className="h-4 w-4" />
              {tCategories.save}
            </button>
          ) : (
            <button
              onClick={() => setSortMode(true)}
              className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <ArrowUpDown className="h-5 w-5" />
            </button>
          )
        )}
      </header>

      {/* Content */}
      <div className="relative flex-1 overflow-auto px-6 pt-4 pb-6">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-muted-foreground text-center">
              {tCategories.noCategories}
            </p>
            <Button onClick={() => router.push("/dashboard/categories/add")}>
              <Plus className="h-4 w-4" />
              {tMenu.addCategory}
            </Button>
          </div>
        ) : (
          <>
            <div className="pb-16">
              {sortedCategories.map((category, catIndex) => {
                const categoryItems = items
                  .filter((i) => i.categoryId === category.id)
                  .sort((a, b) => a.sortOrder - b.sortOrder);

                return (
                  <div key={category.id} className={catIndex > 0 ? "mt-6" : ""}>
                    {/* Category header */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        onClick={() => !sortMode && router.push(`/dashboard/categories/${category.id}`)}
                        className={`flex items-center flex-1 min-w-0 h-10 px-3 rounded-xl transition-colors ${
                          sortMode ? "bg-muted/20" : "hover:bg-muted/30 cursor-pointer"
                        }`}
                      >
                        <span className="text-base font-semibold truncate">{category.name}</span>
                      </div>

                      {sortMode && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMoveCategory(category.id, "up")}
                            disabled={catIndex === 0 || !!moving}
                            className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
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
                            className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
                          >
                            {moving && moving.id === category.id && moving.direction === "down" ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {categoryItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2"
                        >
                          <div
                            onClick={() => !sortMode && router.push(`/dashboard/items/${item.id}`)}
                            className={`flex items-center flex-1 min-w-0 h-12 px-4 bg-muted/30 rounded-xl transition-colors ${
                              sortMode ? "" : "hover:bg-muted/50 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {!sortMode && (
                                <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                                  <Switch
                                    checked={item.isActive}
                                    onCheckedChange={() =>
                                      handleToggleItemActive(item.id, item.isActive, item.name)
                                    }
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
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleMoveItem(item.id, "up")}
                                disabled={index === 0 || !!moving}
                                className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
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
                                className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fixed add buttons */}
            {!sortMode && (
              <div className="sticky bottom-0 flex justify-end gap-2 pt-4 pb-2">
                <Button
                  onClick={() => router.push("/dashboard/categories/add")}
                  variant="destructive"
                  className="h-10 rounded-xl shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  {tMenu.addCategory}
                </Button>
                <Button
                  onClick={() => router.push("/dashboard/items/add")}
                  variant="destructive"
                  className="h-10 rounded-xl shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  {tMenu.addItem}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
