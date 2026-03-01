"use client";

import { useState, useMemo, useEffect } from "react";
import { useBlockBack } from "../_hooks/use-back-intercept";
import { useTranslations } from "next-intl";
import { ArrowUp, ArrowDown, Plus, ArrowUpDown, Loader2, Check, ChevronRight, Menu as MenuIcon, Palette, Phone, Languages, QrCode, BarChart3, Armchair, CalendarDays, CreditCard, HelpCircle, LogOut, Eye, ArrowRight, CheckCircle2, Circle, Shield, Activity, UserPlus, MousePointerClick, Send, Search, KeyRound, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MenuPreviewModal } from "@/components/menu-preview-modal";
import { toast } from "sonner";
import { useDashboard, PAGE_PATHS, type PageKey } from "../_context/dashboard-context";
import { DashboardNavHeader, DashboardNavSidebar } from "../_components/dashboard-nav";
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

interface ChecklistStatus {
  nameSet: boolean;
  menuEdited: boolean;
  contactsAdded: boolean;
  brandCustomized: boolean;
  fromScanner: boolean;
}

interface MenuPageProps {
  initialItems: ItemWithTranslations[];
  initialCategories: Category[];
  initialCurrency: string;
  restaurantName: string;
  slug: string | null;
  checklist: ChecklistStatus;
  isAdmin?: boolean;
  showOrders?: boolean;
}

export function MenuPage({ initialItems, initialCategories, initialCurrency, restaurantName, slug, checklist, isAdmin, showOrders }: MenuPageProps) {
  useBlockBack();
  const { translations, scanUsage } = useDashboard();
  const tHome = useTranslations("dashboard.home");
  const router = useRouter();
  const tItems = translations.items;
  const tCategories = translations.categories;
  const tMenu = translations.menu;
  const pageTitle = translations.pages.menu;

  const allChecklistKeys: { key: keyof ChecklistStatus; translationKey: string; path: string }[] = [
    { key: "nameSet", translationKey: "checklistName", path: PAGE_PATHS.settings },
    { key: "menuEdited", translationKey: "checklistMenuFill", path: PAGE_PATHS.menu },
    { key: "brandCustomized", translationKey: "checklistBrand", path: PAGE_PATHS.design },
    { key: "contactsAdded", translationKey: "checklistContacts", path: PAGE_PATHS.contacts },
  ];

  const checklistKeys = checklist.fromScanner
    ? allChecklistKeys.filter((item) => item.key === "contactsAdded" || item.key === "brandCustomized")
    : allChecklistKeys;

  const completedCount = checklistKeys.filter((item) => checklist[item.key]).length;
  const allDone = completedCount === checklistKeys.length;

  const navEventMap: Record<string, DashboardEvent> = {
    design: DashboardEvent.CLICKED_NAV_DESIGN,
    contacts: DashboardEvent.CLICKED_NAV_CONTACTS,
    settings: DashboardEvent.CLICKED_NAV_SETTINGS,
    qrMenu: DashboardEvent.CLICKED_NAV_QR,
    analytics: DashboardEvent.CLICKED_NAV_ANALYTICS,
    tables: DashboardEvent.CLICKED_NAV_TABLES,
    reservations: DashboardEvent.CLICKED_NAV_RESERVATIONS,
    billing: DashboardEvent.CLICKED_NAV_BILLING,
    support: DashboardEvent.CLICKED_NAV_SUPPORT,
  };

  const checklistEventMap: Record<string, DashboardEvent> = {
    nameSet: DashboardEvent.CLICKED_CHECKLIST_NAME,
    menuEdited: DashboardEvent.CLICKED_CHECKLIST_MENU,
    contactsAdded: DashboardEvent.CLICKED_CHECKLIST_CONTACTS,
    brandCustomized: DashboardEvent.CLICKED_CHECKLIST_BRAND,
  };

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
      <header className="shrink-0 shadow-sm px-6 bg-muted/50">
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
            <PopoverContent align="start" className="p-0 w-56 rounded-md border border-border bg-background overflow-hidden">
              {([
                { page: "design" as PageKey, icon: Palette },
                { page: "contacts" as PageKey, icon: Phone },
                { page: "settings" as PageKey, icon: Languages },
                { page: "qrMenu" as PageKey, icon: QrCode },
                { page: "analytics" as PageKey, icon: BarChart3 },
                { page: "tables" as PageKey, icon: Armchair },
                { page: "reservations" as PageKey, icon: CalendarDays },
                { page: "billing" as PageKey, icon: CreditCard },
                { page: "support" as PageKey, icon: HelpCircle },
              ]).map(({ page, icon: Icon }, index) => (
                <div
                  key={page}
                  onClick={() => { if (navEventMap[page]) track(navEventMap[page]); router.push(PAGE_PATHS[page]); }}
                  className={`flex items-center gap-3 h-12 px-6 cursor-pointer transition-colors hover:bg-muted/30 ${
                    index > 0 ? "border-t border-foreground/5" : ""
                  }`}
                >
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium">{translations.pages[page]}</span>
                </div>
              ))}
              {scanUsage && (
                <div onClick={() => { track(DashboardEvent.CLICKED_NAV_SCANS); router.push(PAGE_PATHS.billing); }} className="flex items-center justify-between h-12 px-6 border-t border-foreground/5 cursor-pointer transition-colors hover:bg-muted/30">
                  <span className="text-sm font-medium">{tHome("scansTitle")}:</span>
                  <span className="text-sm text-muted-foreground">
                    {scanUsage.limit
                      ? `${scanUsage.used.toLocaleString()} / ${scanUsage.limit.toLocaleString()}`
                      : scanUsage.used.toLocaleString()}
                  </span>
                </div>
              )}
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
          {/* Orders + View row */}
          {!sortMode && (showOrders || (slug && categories.length > 0)) && (
            <div className="flex flex-col md:flex-row gap-4">
              {showOrders && (
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-md border-border bg-muted/50 text-muted-foreground hover:bg-muted/80"
                  onClick={() => { track(DashboardEvent.CLICKED_NAV_ORDERS); router.push(PAGE_PATHS.orders); }}
                >
                  <ClipboardList className="h-4 w-4" />
                  {tHome("myOrders")}
                </Button>
              )}
              {slug && categories.length > 0 && (
                <MenuPreviewModal menuUrl={`/m/${slug}`} className="md:flex-1">
                  <Button className="w-full h-12 rounded-md shadow-md" onClick={() => track(DashboardEvent.CLICKED_VIEW_MENU)}>
                    <Eye className="h-4 w-4" />
                    {tHome("viewMenu")}
                  </Button>
                </MenuPreviewModal>
              )}
            </div>
          )}

          {/* Setup checklist */}
          {!sortMode && !allDone && (
            <div className="rounded-md border border-border bg-muted/50 overflow-hidden">
              <div className="px-4 py-3 bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {tHome("getReady")}
                  </span>
                  <span className="text-sm text-muted-foreground">{completedCount}/{checklistKeys.length}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-success transition-all duration-500"
                    style={{ width: `${(completedCount / checklistKeys.length) * 100}%` }}
                  />
                </div>
              </div>
              {checklistKeys.map((item) => {
                const done = checklist[item.key];
                const isNext = !done && !checklistKeys.some((prev) => prev.key !== item.key && !checklist[prev.key] && checklistKeys.indexOf(prev) < checklistKeys.indexOf(item));
                return (
                  <button
                    key={item.key}
                    onClick={() => { if (!done) { track(checklistEventMap[item.key]); router.push(item.path); } }}
                    disabled={done}
                    className={`flex items-center gap-3 w-full h-12 px-4 text-left transition-colors ${
                      done
                        ? "opacity-60"
                        : isNext
                          ? "bg-success/5"
                          : "hover:bg-muted/30"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <Circle className={`h-4 w-4 shrink-0 ${isNext ? "text-success" : "text-muted-foreground"}`} />
                    )}
                    <span className={`text-sm flex-1 ${done ? "text-muted-foreground line-through" : isNext ? "font-semibold" : "font-medium"}`}>
                      {tHome(item.translationKey)}
                    </span>
                    {!done && <ArrowRight className={`h-4 w-4 shrink-0 ${isNext ? "text-success" : "text-muted-foreground"}`} />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Admin shortcuts */}
          {!sortMode && isAdmin && (
            <div className="rounded-md border border-border bg-muted/50 overflow-hidden">
              <button
                onClick={() => router.push("/dashboard/admin")}
                className="flex items-center gap-3 w-full h-12 px-4 hover:bg-muted/30 transition-colors"
              >
                <Shield className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Companies</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/analytics")}
                className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
              >
                <Activity className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Analytics</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
              <button
                onClick={() => router.push("/dashboard/admin/onboarding")}
                className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
              >
                <UserPlus className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Onboarding</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
              <button
                onClick={() => router.push("/dashboard/sessions")}
                className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
              >
                <MousePointerClick className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Sessions</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
              <button
                onClick={() => router.push("/dashboard/keywords")}
                className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
              >
                <KeyRound className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Keywords</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
              <button
                onClick={() => router.push("/dashboard/search-terms")}
                className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
              >
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Search Terms</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
              <button
                onClick={() => router.push("/dashboard/google-ads")}
                className="flex items-center gap-3 w-full h-12 px-4 border-t border-foreground/5 hover:bg-muted/30 transition-colors"
              >
                <Send className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 text-left">Google Ads</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
            </div>
          )}

        {categories.length === 0 ? (
          <>
          <div className="flex flex-col items-center text-center rounded-md border border-border bg-muted/50 px-6 py-6">
            <h2 className="text-lg font-semibold mb-1">{tMenu.emptyTitle}</h2>
            <p className="text-sm text-muted-foreground mb-4">{tMenu.emptySubtitle}</p>
            <Button
              className="w-full max-w-xs"
              onClick={() => { track(DashboardEvent.CLICKED_ADD_CATEGORY); router.push("/dashboard/categories/add"); }}
            >
              <Plus className="h-4 w-4" />
              {tMenu.addCategory}
            </Button>
          </div>
          {!allDone && (
            <div className="rounded-md border border-border bg-muted/50 px-4 py-4">
              <p className="text-sm font-semibold mb-2">{tMenu.hintTitle}</p>
              <p className="text-sm text-muted-foreground mb-3">{tMenu.hintBody}</p>
              <p className="text-sm text-muted-foreground">{tMenu.hintNoCategories}</p>
            </div>
          )}
          </>
        ) : (
          <div className="flex flex-col">
            <div className="pb-4 flex flex-col gap-4">
              {sortedCategories.map((category, catIndex) => {
                const categoryItems = items
                  .filter((i) => i.categoryId === category.id)
                  .sort((a, b) => a.sortOrder - b.sortOrder);

                return (
                  <div key={category.id} className="rounded-md border border-border bg-muted/50 overflow-hidden">
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
                          className="flex items-center h-12 px-4 border-t border-foreground/5 cursor-pointer transition-colors bg-primary/5 hover:bg-primary/10"
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
              <Button
                onClick={() => { track(DashboardEvent.CLICKED_ADD_CATEGORY); router.push("/dashboard/categories/add"); }}
                className="w-full h-12 rounded-md shadow-md"
              >
                <Plus className="h-4 w-4" />
                {tMenu.addCategory}
              </Button>
            )}
          </div>
        )}
        </div>{/* end Main content column */}
        </div>{/* end flex container */}
      </div>
    </div>
  );
}
