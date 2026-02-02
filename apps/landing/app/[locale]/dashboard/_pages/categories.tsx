"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, Plus, Loader2, ArrowUpDown, Save, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { FormInput } from "../_ui/form-input";
import { FormInputTranslate } from "../_ui/form-input-translate";
import { FormSwitch } from "../_ui/form-switch";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
import type { Category } from "@/types";

interface CategoryWithTranslations extends Category {
  translations?: Record<string, { name?: string }> | null;
}

export function CategoriesPage() {
  const { translations, returnToOnboarding } = useDashboard();
  const t = translations.categories;

  const [categories, setCategories] = useState<CategoryWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<CategoryWithTranslations | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [sortMode, setSortMode] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<CategoryWithTranslations[]>([]);
  const [savingSort, setSavingSort] = useState(false);

  useEffect(() => {
    fetchCategories();
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

  function handleEditCategory(category: CategoryWithTranslations) {
    setEditingCategory(category);
    setShowForm(true);
  }

  function handleAddCategory() {
    setEditingCategory(null);
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
    setEditingCategory(null);
  }

  function handleFormSaved() {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
    returnToOnboarding();
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground mb-4">{t.noCategories}</p>
            <Button onClick={handleAddCategory}>
              <Plus className="h-4 w-4 mr-2" />
              {t.addCategory}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => !sortMode && handleEditCategory(category)}
                className={`flex items-center justify-between h-14 px-4 bg-muted/30 rounded-xl transition-colors ${
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
                  <span className="text-sm font-medium truncate">{category.name}</span>
                </div>

                {sortMode && (
                  <div className="flex items-center gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleMoveCategory(category.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleMoveCategory(category.id, "down")}
                      disabled={index === categories.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {categories.length > 0 && (
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
          {sortMode ? (
            <>
              <Button onClick={handleCancelSortMode} variant="outline" disabled={savingSort}>
                <X className="h-4 w-4 mr-2" />
                {t.cancel}
              </Button>
              <Button onClick={handleSaveSortOrder} disabled={savingSort}>
                {savingSort ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {t.saveSort}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleStartSortMode} variant="outline">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {t.sort}
              </Button>
              <Button onClick={handleAddCategory}>
                <Plus className="h-4 w-4 mr-2" />
                {t.addCategory}
              </Button>
            </>
          )}
        </div>
      )}

      {showForm && (
        <CategoryFormSheet
          category={editingCategory}
          onClose={handleFormClose}
          onSaved={handleFormSaved}
        />
      )}
    </div>
  );
}

interface CategoryFormSheetProps {
  category: CategoryWithTranslations | null;
  onClose: () => void;
  onSaved: () => void;
}

function CategoryFormSheet({ category, onClose, onSaved }: CategoryFormSheetProps) {
  const { translations } = useDashboard();
  const t = translations.categories;
  const { restaurant, loading: loadingRestaurant, otherLanguages } = useRestaurantLanguages();

  const [name, setName] = useState(category?.name || "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryTranslations, setCategoryTranslations] = useState<
    Record<string, { name?: string }>
  >((category?.translations as Record<string, { name?: string }>) || {});
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEdit = !!category;

  function handleTranslationChange(lang: string, value: string) {
    setCategoryTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], name: value },
    }));
  }

  async function handleDelete() {
    if (!category) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(t.deleted);
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || t.deleteError);
      }
    } catch {
      toast.error(t.deleteError);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      setValidationError(t.nameRequired);
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/categories/${category.id}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      const cleanTranslations: Record<string, { name: string }> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = categoryTranslations[lang];
          if (trans?.name?.trim()) {
            cleanTranslations[lang] = { name: trans.name.trim() };
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          isActive,
          translations: Object.keys(cleanTranslations).length > 0 ? cleanTranslations : null,
        }),
      });

      if (res.ok) {
        toast.success(isEdit ? t.updated : t.created);
        onSaved();
      } else {
        const data = await res.json();
        toast.error(data.error || t.saveError);
      }
    } catch {
      toast.error(t.saveError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
          <div className="flex h-14 items-center border-b px-6 shrink-0">
            <SheetTitle className="text-base font-semibold">
              {isEdit ? t.editCategory : t.addCategory}
            </SheetTitle>
          </div>

          {loadingRestaurant ? (
            <PageLoader />
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                <FormInput
                  id="name"
                  label={`${t.name}${otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:`}
                  value={name}
                  onChange={setName}
                  placeholder={t.namePlaceholder}
                />

                {otherLanguages.map((lang) => (
                  <FormInputTranslate
                    key={lang}
                    id={`name-${lang}`}
                    label={`${t.name} (${LANGUAGE_NAMES[lang] || lang}):`}
                    value={categoryTranslations[lang]?.name || ""}
                    onChange={(value) => handleTranslationChange(lang, value)}
                    placeholder={t.namePlaceholder}
                    sourceText={name}
                    sourceLanguage={restaurant?.defaultLanguage || "en"}
                    targetLanguage={lang}
                    translateErrorMessage={t.translateError}
                  />
                ))}

                <FormSwitch
                  id="isActive"
                  label={`${t.status}:`}
                  checked={isActive}
                  onCheckedChange={setIsActive}
                  activeText={t.active}
                  inactiveText={t.inactive}
                />
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0">
                {isEdit && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={saving || deleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t.delete}
                  </Button>
                )}
                <Button type="submit" disabled={saving || deleting}>
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {t.save}
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.delete}</DialogTitle>
            <DialogDescription>{t.deleteConfirm}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              <X className="h-4 w-4 mr-2" />
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.validationErrorTitle}</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
