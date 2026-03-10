"use client";

import { useState, useMemo, useEffect } from "react";
import { useBlockBack } from "../_hooks/use-back-intercept";
import { useTranslations } from "next-intl";
import { ArrowUp, ArrowDown, Plus, ArrowUpDown, Loader2, Check, ChevronRight, Menu as MenuIcon, Eye, Shield, Activity, UserPlus, MousePointerClick, Send, Search, KeyRound, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { toast } from "sonner";
import { useDashboard } from "../_context/dashboard-context";
import { DashboardNavHeader, DashboardNavSidebar, DashboardNavItems } from "../_components/dashboard-nav";
import { Link, useRouter } from "@/i18n/routing";
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
  restaurantName: string;
  slug: string | null;
  isAdmin?: boolean;
}

export function MenuPage({ initialItems, initialCategories, initialCurrency, restaurantName, slug, isAdmin }: MenuPageProps) {
  useBlockBack();
  const { translations, scanUsage, isAnonymous } = useDashboard();
  const tHome = useTranslations("dashboard.home");
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
        track(DashboardEvent.ERROR_TOGGLE, { page: "menu", entity: "item" });
        toast.error(tItems.updateError);
      } else {
        toast.success(newActive ? `${itemName} ${tItems.enabled}` : `${itemName} ${tItems.disabled}`);
      }
    } catch {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, isActive: currentActive } : i))
      );
      track(DashboardEvent.ERROR_TOGGLE, { page: "menu", entity: "item" });
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
        track(DashboardEvent.ERROR_SORT, { page: "menu", entity: "category" });
        toast.error(tItems.sortError);
      }
    } catch {
      track(DashboardEvent.ERROR_SORT, { page: "menu", entity: "category" });
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
        track(DashboardEvent.ERROR_SORT, { page: "menu", entity: "item" });
        toast.error(tItems.sortError);
      }
    } catch {
      track(DashboardEvent.ERROR_SORT, { page: "menu", entity: "item" });
      toast.error(tItems.sortError);
    } finally {
      setMoving(null);
    }
  }

  const showSortButton = categories.length > 1 || items.length > 1;

  return (
    <div className="flex flex-col h-full">
      {/* Custom header */}
      <header className="shrink-0 border-b border-border px-6 bg-background/80 backdrop-blur-lg">
        <div className="flex items-center py-3 max-w-lg md:max-w-none md:w-[45rem] mx-auto md:gap-4">
          <DashboardNavHeader />
          {/* Mobile: burger menu */}
          <Popover modal>
            <PopoverTrigger asChild>
              <button
                onClick={() => track(DashboardEvent.CLICKED_HAMBURGER_MENU)}
                className="flex items-center justify-center h-10 w-10 -ml-2 md:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-56 rounded-xl bg-popover overflow-hidden">
              <DashboardNavItems excludePages={["menu"]} />
            </PopoverContent>
          </Popover>
          {/* Right part: title + sort */}
          <h1 className="text-xl font-semibold flex-1 ml-3 md:ml-0 truncate">{restaurantName || pageTitle}</h1>
          {showSortButton && (
            sortMode ? (
              <button
                onClick={() => setSortMode(false)}
                className="flex items-center justify-center h-10 w-10 -mr-2"
              >
                <Check className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => { track(DashboardEvent.CLICKED_SORT_MENU); setSortMode(true); }}
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
        <div className="max-w-lg md:max-w-none md:w-[45rem] mx-auto md:flex md:gap-4 min-h-full">
          <DashboardNavSidebar />
          <div className="flex-1 min-w-0 flex flex-col gap-4 min-h-full">
          {/* View menu */}
          {!sortMode && slug && items.length > 0 && (
            <MenuPreviewModal menuUrl={`/m/${slug}`}>
              <button
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
                onClick={() => track(DashboardEvent.CLICKED_VIEW_MENU)}
              >
                <Eye className="h-4 w-4" />
                {tHome("viewMenu")}
              </button>
            </MenuPreviewModal>
          )}

          {/* Save (anonymous) */}
          {!sortMode && isAnonymous && items.length > 0 && (
            <Link href="/dashboard/save" onClick={() => track(DashboardEvent.CLICKED_SAVE_MENU)}>
              <button
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                <Save className="h-4 w-4" />
                {tHome("saveMenu")}
              </button>
            </Link>
          )}

          {/* Admin shortcuts */}
          {!sortMode && isAdmin && (
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {([
                { path: "/dashboard/admin", icon: Shield, label: "Companies" },
                { path: "/dashboard/admin/analytics", icon: Activity, label: "Analytics" },
                { path: "/dashboard/admin/onboarding", icon: UserPlus, label: "Onboarding" },
                { path: "/dashboard/sessions", icon: MousePointerClick, label: "Sessions" },
                { path: "/dashboard/keywords", icon: KeyRound, label: "Keywords" },
                { path: "/dashboard/search-terms", icon: Search, label: "Search Terms" },
                { path: "/dashboard/google-ads", icon: Send, label: "Google Ads" },
              ]).map(({ path, icon: Icon, label }, index) => (
                <button
                  key={path}
                  onClick={() => router.push(path)}
                  className={`flex items-center gap-3 w-full h-11 px-4 hover:bg-muted/50 transition-colors ${
                    index > 0 ? "border-t border-border/50" : ""
                  }`}
                >
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">{label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                </button>
              ))}
            </div>
          )}

        {categories.length === 0 ? (
          <>
          <div className="flex flex-col items-center text-center rounded-xl border border-border bg-muted/30 px-6 py-8">
            <h2 className="text-lg font-semibold mb-1">{tMenu.emptyTitle}</h2>
            <p className="text-sm text-muted-foreground/60 mb-5">{tMenu.emptySubtitle}</p>
            <button
              className="flex items-center justify-center gap-2 w-full max-w-xs h-11 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
              onClick={() => { track(DashboardEvent.CLICKED_ADD_CATEGORY); router.push("/dashboard/categories/add"); }}
            >
              <Plus className="h-4 w-4" />
              {tMenu.addCategory}
            </button>
          </div>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {sortedCategories.map((category, catIndex) => {
                const categoryItems = items
                  .filter((i) => i.categoryId === category.id)
                  .sort((a, b) => a.sortOrder - b.sortOrder);

                return (
                  <div key={category.id} className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                    {/* Category header */}
                    <div
                      onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_CATEGORY_ROW); router.push(`/dashboard/categories/${category.id}`); } }}
                      className={`flex items-center gap-2 px-4 h-11 transition-colors ${
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
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">{category.name}</span>
                        {!sortMode && <ChevronRight className="h-4 w-4 text-muted-foreground/30 shrink-0 ml-1" />}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      {categoryItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 border-t border-border/50"
                        >
                          <div
                            onClick={() => { if (!sortMode) { track(DashboardEvent.CLICKED_ITEM_ROW); router.push(`/dashboard/items/${item.id}`); } }}
                            className={`flex items-center flex-1 min-w-0 h-11 px-4 transition-colors ${
                              sortMode ? "" : "hover:bg-muted/50 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {!sortMode && (
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
                                className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-30"
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
                                className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-30"
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
                      {!sortMode && categoryItems.length === 0 && (
                        <div className="h-11 px-4 flex items-center border-t border-border/50">
                          <span className="text-sm text-muted-foreground/40">{tMenu.noItems}</span>
                        </div>
                      )}
                      {!sortMode && (
                        <div
                          className="flex items-center h-11 px-4 border-t border-border/50 cursor-pointer transition-colors hover:bg-muted/50"
                          onClick={() => { track(DashboardEvent.CLICKED_ADD_ITEM); router.push(`/dashboard/items/add?categoryId=${category.id}`); }}
                        >
                          <Plus className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm font-medium text-primary">{tMenu.addItem}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add category button */}
            {!sortMode && (
              <button
                onClick={() => { track(DashboardEvent.CLICKED_ADD_CATEGORY); router.push("/dashboard/categories/add"); }}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-white text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(to right, hsl(9,100%,58%), #f59e0b)" }}
              >
                <Plus className="h-4 w-4" />
                {tMenu.addCategory}
              </button>
            )}
          </div>
        )}
        </div>{/* end Main content column */}
        </div>{/* end flex container */}
      </div>
    </div>
  );
}
