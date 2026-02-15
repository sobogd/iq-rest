"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, X, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
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

export function ItemsPage() {
  const { translations } = useDashboard();
  const router = useRouter();
  const t = translations.items;
  const pageTitle = translations.pages.items;

  const [items, setItems] = useState<ItemWithTranslations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currency, setCurrency] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<ItemWithTranslations[]>([]);
  const [savingSort, setSavingSort] = useState(false);

  const groupedItems = useMemo(() => {
    const grouped = items.reduce(
      (acc, item) => {
        const categoryId = item.categoryId;
        if (!acc[categoryId]) {
          acc[categoryId] = {
            category: item.category,
            items: [],
          };
        }
        acc[categoryId].items.push(item);
        return acc;
      },
      {} as Record<string, { category: Pick<Category, "id" | "name" | "sortOrder">; items: ItemWithTranslations[] }>
    );

    return Object.entries(grouped).sort(
      ([, a], [, b]) => a.category.sortOrder - b.category.sortOrder
    );
  }, [items]);

  useEffect(() => {
    fetchData();

    // Check if we should open form directly (from onboarding)
    if (sessionStorage.getItem("openFormOnNavigate") === "true") {
      sessionStorage.removeItem("openFormOnNavigate");
      router.push("/dashboard/items/add");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    try {
      const [itemsRes, categoriesRes, restaurantRes] = await Promise.all([
        fetch("/api/items"),
        fetch("/api/categories"),
        fetch("/api/restaurant"),
      ]);

      if (!itemsRes.ok) throw new Error("Failed to fetch items");
      if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

      const [itemsData, categoriesData, restaurantData] = await Promise.all([
        itemsRes.json(),
        categoriesRes.json(),
        restaurantRes.ok ? restaurantRes.json() : null,
      ]);

      setItems(itemsData);
      setCategories(categoriesData);
      if (restaurantData?.currency) {
        setCurrency(restaurantData.currency);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error(t.fetchError);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(
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
        toast.error(t.updateError);
      } else {
        toast.success(newActive ? `${itemName} ${t.enabled}` : `${itemName} ${t.disabled}`);
      }
    } catch {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
      );
      toast.error(t.updateError);
    }
  }

  function handleStartSortMode() {
    setOriginalOrder([...items]);
    setSortMode(true);
  }

  function handleCancelSortMode() {
    setItems(originalOrder);
    setSortMode(false);
  }

  function handleMoveItem(itemId: string, direction: "up" | "down") {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    const categoryItems = items
      .filter((i) => i.categoryId === item.categoryId)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const currentIndex = categoryItems.findIndex((i) => i.id === itemId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= categoryItems.length) return;

    const swapItem = categoryItems[swapIndex];

    const newItems = items.map((i) => {
      if (i.id === itemId) {
        return { ...i, sortOrder: swapItem.sortOrder };
      }
      if (i.id === swapItem.id) {
        return { ...i, sortOrder: item.sortOrder };
      }
      return i;
    });

    setItems(newItems);
  }

  async function handleSaveSortOrder() {
    setSavingSort(true);

    try {
      const categoriesWithItems = new Map<string, { id: string; sortOrder: number }[]>();

      items.forEach((item) => {
        if (!categoriesWithItems.has(item.categoryId)) {
          categoriesWithItems.set(item.categoryId, []);
        }
        categoriesWithItems.get(item.categoryId)!.push({
          id: item.id,
          sortOrder: item.sortOrder,
        });
      });

      const promises = Array.from(categoriesWithItems.entries()).map(([categoryId, categoryItems]) => {
        const sortedItems = [...categoryItems].sort((a, b) => a.sortOrder - b.sortOrder);
        const reindexedItems = sortedItems.map((item, index) => ({
          id: item.id,
          sortOrder: index,
        }));

        return fetch("/api/items/reorder-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categoryId, items: reindexedItems }),
        });
      });

      const results = await Promise.all(promises);
      const allOk = results.every((res) => res.ok);

      if (allOk) {
        toast.success(t.sortSaved);
        setSortMode(false);
        fetchData();
      } else {
        toast.error(t.sortError);
      }
    } catch {
      toast.error(t.sortError);
    } finally {
      setSavingSort(false);
    }
  }

  if (loading) {
    return <PageLoader />;
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
              {items.length > 1 && (
                <button
                  onClick={handleStartSortMode}
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
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-muted-foreground text-center">
              {categories.length === 0 ? t.noCategoriesHint : t.noItems}
            </p>
            <Button onClick={() => router.push("/dashboard/items/add")} disabled={categories.length === 0}>
              <Plus className="h-4 w-4 mr-2" />
              {t.addItem}
            </Button>
          </div>
        ) : (
          <>
            <div className="pb-16">
              {groupedItems.map(([categoryId, group], groupIndex) => (
                <div key={categoryId} className={groupIndex > 0 ? "mt-6" : ""}>
                  <h3 className="text-base font-semibold px-1 mb-3">{group.category.name}</h3>
                  <div className="space-y-2">
                    {group.items
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((item, index) => (
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
                                      handleToggleActive(item.id, item.isActive, item.name)
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
                                disabled={index === 0}
                                className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleMoveItem(item.id, "down")}
                                disabled={index === group.items.length - 1}
                                className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

          </>
        )}

        {/* Fixed add button */}
        {items.length > 0 && !sortMode && (
          <div className="sticky bottom-0 flex justify-end pt-4 pb-2 pointer-events-none">
            <Button onClick={() => router.push("/dashboard/items/add")} disabled={categories.length === 0} className="h-10 px-4 rounded-xl pointer-events-auto">
              <Plus className="h-6 w-6" />
              {t.addItem}
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
