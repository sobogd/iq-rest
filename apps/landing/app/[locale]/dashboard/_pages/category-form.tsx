"use client";

import { useEffect, useState, useMemo } from "react";
import { Loader2, Trash2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { useLocale, useTranslations } from "next-intl";
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { FormInput } from "../_ui/form-input";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
import type { Category } from "@/types";

interface CategoryWithTranslations extends Category {
  translations?: Record<string, { name?: string }> | null;
}

interface CategoryFormPageProps {
  id?: string;
}

export function CategoryFormPage({ id }: CategoryFormPageProps) {
  const { translations } = useDashboard();
  const router = useRouter();
  const locale = useLocale();
  const t = translations.categories;
  const tAi = useTranslations("dashboard.aiTranslate");
  const { restaurant, loading: loadingRestaurant, otherLanguages } = useRestaurantLanguages();

  const [loading, setLoading] = useState(!!id);
  const [category, setCategory] = useState<CategoryWithTranslations | null>(null);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryTranslations, setCategoryTranslations] = useState<
    Record<string, { name?: string }>
  >({});
  const [validationError, setValidationError] = useState<string | null>(null);
  const [translatingLangs, setTranslatingLangs] = useState<Set<string>>(new Set());
  const [showTranslateLimitDialog, setShowTranslateLimitDialog] = useState(false);

  // Original values for change detection
  const [originalName, setOriginalName] = useState("");
  const [originalTranslations, setOriginalTranslations] = useState<Record<string, { name?: string }>>({});

  const isEdit = !!id;

  const hasChanges = useMemo(() => {
    if (!isEdit) {
      return !!name.trim();
    }
    return (
      name !== originalName ||
      JSON.stringify(categoryTranslations) !== JSON.stringify(originalTranslations)
    );
  }, [isEdit, name, categoryTranslations, originalName, originalTranslations]);

  useEffect(() => {
    track(DashboardEvent.SHOWED_CATEGORY_FORM);
    if (id) {
      fetchCategory(id);
    }
  }, [id]);

  async function fetchCategory(categoryId: string) {
    try {
      const response = await fetch(`/api/categories/${categoryId}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data: CategoryWithTranslations = await response.json();
      setCategory(data);
      const catName = data.name;
      const catTrans = (data.translations as Record<string, { name?: string }>) || {};

      setName(catName);
      setIsActive(data.isActive);
      setCategoryTranslations(catTrans);

      setOriginalName(catName);
      setOriginalTranslations(catTrans);
    } catch (error) {
      console.error("Failed to fetch category:", error);
      track(DashboardEvent.ERROR_FETCH, { page: "category" });
      toast.error(t.fetchError);
      router.push("/dashboard/menu");
    } finally {
      setLoading(false);
    }
  }

  function handleTranslationChange(lang: string, value: string) {
    setCategoryTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], name: value },
    }));
  }

  async function handleTranslateSection(lang: string) {
    const srcLang = restaurant?.defaultLanguage || "en";
    if (!name.trim()) return;

    track(DashboardEvent.CLICKED_AI_TRANSLATE);
    setTranslatingLangs((prev) => new Set(prev).add(lang));

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: name.trim(), targetLanguage: lang, sourceLanguage: srcLang }),
      });

      if (res.ok) {
        const data = await res.json();
        handleTranslationChange(lang, data.translatedText);
      } else if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "limit_reached") setShowTranslateLimitDialog(true);
        else toast.error(t.translateError);
      } else {
        toast.error(t.translateError);
      }
    } catch {
      toast.error(t.translateError);
    } finally {
      setTranslatingLangs((prev) => {
        const next = new Set(prev);
        next.delete(lang);
        return next;
      });
    }
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
        window.location.href = `/${locale}/dashboard/menu`;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_DELETE, { page: "category" });
        toast.error(data.error || t.deleteError);
      }
    } catch {
      track(DashboardEvent.ERROR_DELETE, { page: "category" });
      toast.error(t.deleteError);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "category", field: "name" });
      setValidationError(t.nameRequired);
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/categories/${id}` : "/api/categories";
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
        track(DashboardEvent.CLICKED_SAVE_CATEGORY);
        toast.success(isEdit ? t.updated : t.created);
        window.location.href = `/${locale}/dashboard/menu`;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "category" });
        toast.error(data.error || t.saveError);
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "category" });
      toast.error(t.saveError);
    } finally {
      setSaving(false);
    }
  }

  if (loading || loadingRestaurant) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background">
        <PageHeader title={isEdit ? t.editCategory : t.addCategory} backHref="/dashboard/menu">
          <Button
            type="submit"
            form="category-form"
            disabled={saving || deleting || !hasChanges}
            variant="default"
            size="sm"
            className={!hasChanges ? "opacity-40" : ""}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t.save}
          </Button>
        </PageHeader>
      </div>

      <form id="category-form" onSubmit={handleSubmit} className="px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-6">

          <div className="space-y-4">
            <FormInput
              id="name"
              label={`${t.name}:`}
              value={name}
              onChange={setName}
              onFocus={() => track(DashboardEvent.FOCUSED_CATEGORY_NAME)}
              placeholder={t.namePlaceholder}
            />
          </div>

          {/* Translation sections — one per language */}
          {otherLanguages.map((lang) => {
            const isTranslating = translatingLangs.has(lang);
            return (
              <div key={lang} className="space-y-4">
                <div className="flex items-center justify-between pt-6">
                  <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {LANGUAGE_NAMES[lang] || lang}:
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleTranslateSection(lang)}
                    disabled={isTranslating || !name.trim()}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 underline disabled:opacity-50 transition-colors"
                  >
                    {isTranslating ? tAi("translating") : tAi("translate")}
                    {isTranslating ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <FormInput
                  id={`name-${lang}`}
                  label={`${t.name}:`}
                  value={categoryTranslations[lang]?.name || ""}
                  onChange={(value) => handleTranslationChange(lang, value)}
                  placeholder={t.namePlaceholder}
                />
              </div>
            );
          })}

          {isEdit && (
            <button
              type="button"
              onClick={() => { track(DashboardEvent.CLICKED_DELETE_CATEGORY); setShowDeleteDialog(true); }}
              disabled={saving || deleting}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 underline disabled:opacity-50 transition-colors pt-8"
            >
              <Trash2 className="h-4 w-4" />
              {t.delete}
            </button>
          )}

        </div>
      </form>

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

      <Dialog open={showTranslateLimitDialog} onOpenChange={setShowTranslateLimitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tAi("limitReached")}</DialogTitle>
            <DialogDescription>{tAi("limitReachedDescription")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTranslateLimitDialog(false)}>
              {tAi("cancel")}
            </Button>
            <Button onClick={() => { track(DashboardEvent.CLICKED_AI_SUBSCRIBE); setShowTranslateLimitDialog(false); router.push("/dashboard/billing"); }}>
              {tAi("upgrade")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
