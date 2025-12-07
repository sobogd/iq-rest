"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Trash2, Save, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TranslationData {
  name?: string;
}

interface RestaurantLanguages {
  languages: string[];
  defaultLanguage: string;
}

interface Category {
  id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
  translations?: Record<string, TranslationData> | null;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  pt: "Português",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
};

interface CategoryFormProps {
  category?: Category;
  restaurant?: RestaurantLanguages | null;
  translations: {
    name: string;
    namePlaceholder: string;
    status: string;
    active: string;
    inactive: string;
    save: string;
    saving: string;
    cancel: string;
    error: string;
    close: string;
    delete?: string;
    deleteConfirm?: string;
  };
}

export function CategoryForm({ category, restaurant: initialRestaurant, translations: t }: CategoryFormProps) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const fromOnboarding = searchParams.get("from") === "onboarding";

  const [name, setName] = useState(category?.name || "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState("");
  const [categoryTranslations, setCategoryTranslations] = useState<Record<string, TranslationData>>(
    (category?.translations as Record<string, TranslationData>) || {}
  );
  const [translatingField, setTranslatingField] = useState<string | null>(null);

  const isEdit = !!category;
  const restaurant = initialRestaurant || null;

  function handleTranslationChange(lang: string, value: string) {
    setCategoryTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        name: value,
      },
    }));
  }

  async function handleTranslate(lang: string) {
    if (!name.trim()) return;

    setTranslatingField(lang);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: name,
          targetLanguage: lang,
          sourceLanguage: restaurant?.defaultLanguage || "en",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        handleTranslationChange(lang, data.translatedText);
      } else {
        setError("Translation failed");
      }
    } catch {
      setError("Translation failed");
    } finally {
      setTranslatingField(null);
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
        router.push(`/${locale}/dashboard/categories`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete category");
      }
    } catch {
      setError("Failed to delete category");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/categories/${category.id}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      // Build clean translations object
      const cleanTranslations: Record<string, TranslationData> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = categoryTranslations[lang];
          if (trans?.name?.trim()) {
            cleanTranslations[lang] = {
              name: trans.name.trim(),
            };
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
        if (fromOnboarding && !isEdit) {
          router.push(`/${locale}/dashboard`);
        } else {
          router.push(`/${locale}/dashboard/categories`);
        }
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save category");
      }
    } catch {
      setError("Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  const otherLanguages = restaurant?.languages.filter(
    (lang) => lang !== restaurant.defaultLanguage
  ) || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-20">
      <AlertDialog open={!!error} onOpenChange={() => setError("")}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.error}</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError("")}>
              {t.close}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-2">
        <Label htmlFor="name">{t.name}{otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
        />
      </div>

      {/* Name translations */}
      {otherLanguages.map((lang) => (
        <div key={lang} className="space-y-2">
          <Label>{t.name} ({LANGUAGE_NAMES[lang] || lang}):</Label>
          <div className="flex gap-2">
            <Input
              value={categoryTranslations[lang]?.name || ""}
              onChange={(e) => handleTranslationChange(lang, e.target.value)}
              placeholder={t.namePlaceholder}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleTranslate(lang)}
              disabled={translatingField === lang || !name.trim()}
              className="shrink-0"
            >
              {translatingField === lang ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="isActive">{t.status}:</Label>
        <label
          htmlFor="isActive"
          className="flex items-center justify-between h-10 px-3 rounded-md border border-input bg-background cursor-pointer"
        >
          <span className="text-sm">{isActive ? t.active : t.inactive}</span>
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={setIsActive}
            className="scale-75"
          />
        </label>
      </div>

      {/* Fixed Save Button */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        {isEdit && t.delete && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            disabled={saving || deleting}
            className="shadow-lg"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          disabled={saving || deleting}
          className="shadow-lg"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span className="ml-1.5">{saving ? t.saving : t.save}</span>
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.delete}</DialogTitle>
            <DialogDescription>{t.deleteConfirm}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
