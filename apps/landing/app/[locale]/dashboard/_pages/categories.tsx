"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, X, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { useRouter } from "@/i18n/routing";
import type { Category } from "@/types";

interface CategoryWithTranslations extends Category {
  translations?: Record<string, { name?: string }> | null;
}

export function CategoriesPage() {
  const { translations } = useDashboard();
  const router = useRouter();
  const t = translations.categories;
  const pageTitle = translations.pages.categories;

  const [categories, setCategories] = useState<CategoryWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<CategoryWithTranslations[]>([]);
  const [savingSort, setSavingSort] = useState(false);

  useEffect(() => {
    fetchCategories();

    // Check if we should open form directly (from onboarding)
    if (sessionStorage.getItem("openFormOnNavigate") === "true") {
      sessionStorage.removeItem("openFormOnNavigate");
      router.push("/dashboard/categories/add");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error(t.fetchError);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleActive(
    categoryId: string,
    currentActive: boolean,
    categoryName: string
  ) {
    const newActive = !currentActive;

    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, isActive: newActive } : c))
    );

    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newActive }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setCategories((prev) =>
          prev.map((c) => (c.id === categoryId ? { ...c, isActive: currentActive } : c))
        );
        toast.error(t.updateError);
      } else {
        toast.success(newActive ? `${categoryName} ${t.enabled}` : `${categoryName} ${t.disabled}`);
      }
    } catch {
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryId ? { ...c, isActive: currentActive } : c))
      );
      toast.error(t.updateError);
    }
  }

  function handleStartSortMode() {
    setOriginalOrder([...categories]);
    setSortMode(true);
  }

  function handleCancelSortMode() {
    setCategories(originalOrder);
    setSortMode(false);
  }

  function handleMoveCategory(categoryId: string, direction: "up" | "down") {
    const currentIndex = categories.findIndex((c) => c.id === categoryId);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= categories.length) return;

    const newCategories = [...categories];
    [newCategories[currentIndex], newCategories[swapIndex]] = [
      newCategories[swapIndex],
      newCategories[currentIndex],
    ];
    setCategories(newCategories);
  }

  async function handleSaveSortOrder() {
    setSavingSort(true);

    try {
      const sortOrder = categories.map((cat, index) => ({
        id: cat.id,
        sortOrder: index,
      }));

      const res = await fetch("/api/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: sortOrder }),
      });

      if (res.ok) {
        toast.success(t.sortSaved);
        setSortMode(false);
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
                onClick={() => router.push("/dashboard/menu")}
                className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold flex-1 ml-3">{pageTitle}</h1>
              {categories.length > 1 && (
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
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <p className="text-muted-foreground text-center">{t.noCategories}</p>
            <Button onClick={() => router.push("/dashboard/categories/add")}>
              <Plus className="h-4 w-4 mr-2" />
              {t.addCategory}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-2 pb-16">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`flex items-center gap-2 ${sortMode ? "" : ""}`}
                >
                  <div
                    onClick={() => !sortMode && router.push(`/dashboard/categories/${category.id}`)}
                    className={`flex items-center flex-1 min-w-0 h-12 px-4 bg-muted/30 rounded-xl transition-colors ${
                      sortMode ? "" : "hover:bg-muted/50 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {!sortMode && (
                        <div onClick={(e) => e.stopPropagation()} className="flex items-center">
                          <Switch
                            checked={category.isActive}
                            onCheckedChange={() =>
                              handleToggleActive(category.id, category.isActive, category.name)
                            }
                          />
                        </div>
                      )}
                      <span className="text-base font-medium truncate">{category.name}</span>
                    </div>
                  </div>

                  {sortMode && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveCategory(category.id, "up")}
                        disabled={index === 0}
                        className="flex items-center justify-center h-12 w-12 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveCategory(category.id, "down")}
                        disabled={index === categories.length - 1}
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
        {categories.length > 0 && !sortMode && (
          <div className="sticky bottom-0 flex justify-end pt-4 pb-2 pointer-events-none">
            <Button onClick={() => router.push("/dashboard/categories/add")} className="h-10 px-4 rounded-xl pointer-events-auto">
              <Plus className="h-6 w-6" />
              {t.addCategory}
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
