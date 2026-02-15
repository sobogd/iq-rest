"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Trash2, X } from "lucide-react";
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
import { useDashboard } from "../_context/dashboard-context";
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { analytics } from "@/lib/analytics";
import { useRouter } from "@/i18n/routing";
import { FormInput } from "../_ui/form-input";
import { FormInputTranslate } from "../_ui/form-input-translate";
import { FormSwitch } from "../_ui/form-switch";
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
  const { translations, returnToOnboarding } = useDashboard();
  const router = useRouter();
  const t = translations.categories;
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

  const isEdit = !!id;

  useEffect(() => {
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
      setName(data.name);
      setIsActive(data.isActive);
      setCategoryTranslations(
        (data.translations as Record<string, { name?: string }>) || {}
      );
    } catch (error) {
      console.error("Failed to fetch category:", error);
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

  async function handleDelete() {
    if (!category) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(t.deleted);
        if (!returnToOnboarding()) {
          router.push("/dashboard/menu");
        }
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
        toast.success(isEdit ? t.updated : t.created);
        if (!isEdit) {
          analytics.dashboard.categoryCreated();
        }
        if (!returnToOnboarding()) {
          router.push("/dashboard/menu");
        }
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

  if (loading || loadingRestaurant) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={isEdit ? t.editCategory : t.addCategory}>
        {isEdit && (
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            disabled={saving || deleting}
            className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </PageHeader>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6 space-y-4">
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
          <div className="sticky bottom-0 flex justify-end gap-2 pt-4 pb-2">
            <Button type="submit" disabled={saving || deleting} variant="destructive" className="h-10 rounded-xl shadow-md">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {t.save}
            </Button>
          </div>
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
    </div>
  );
}
