"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Loader2, Trash2, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Category {
  id: string;
  name: string;
}

interface TranslationData {
  name?: string;
  description?: string;
}

interface RestaurantLanguages {
  languages: string[];
  defaultLanguage: string;
}

interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  categoryId: string;
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

interface ItemFormProps {
  item?: Item;
  categories?: Category[];
  restaurant?: RestaurantLanguages | null;
  translations: {
    name: string;
    namePlaceholder: string;
    description_label: string;
    descriptionPlaceholder: string;
    price: string;
    pricePlaceholder: string;
    category: string;
    categoryPlaceholder: string;
    image: string;
    uploadImage: string;
    removeImage: string;
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

export function ItemForm({ item, categories: initialCategories, restaurant: initialRestaurant, translations: t }: ItemFormProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(item?.categoryId || "");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || "");
  const [isActive, setIsActive] = useState(item?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [itemTranslations, setItemTranslations] = useState<Record<string, TranslationData>>(
    (item?.translations as Record<string, TranslationData>) || {}
  );
  const [translatingField, setTranslatingField] = useState<string | null>(null);

  const isEdit = !!item;
  const restaurant = initialRestaurant || null;

  useEffect(() => {
    // Only fetch categories if not provided via props
    if (!initialCategories) {
      fetchCategories();
    }
  }, [initialCategories]);

  async function handleDelete() {
    if (!item) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/items`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete item");
      }
    } catch {
      setError("Failed to delete item");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to upload image");
      }
    } catch {
      setError("Failed to upload image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemoveImage() {
    setImageUrl("");
  }

  function handleTranslationChange(
    lang: string,
    field: "name" | "description",
    value: string
  ) {
    setItemTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  }

  async function handleTranslate(lang: string, field: "name" | "description") {
    const sourceText = field === "name" ? name : description;
    if (!sourceText.trim()) return;

    const fieldKey = `${field}-${lang}`;
    setTranslatingField(fieldKey);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage: lang,
          sourceLanguage: restaurant?.defaultLanguage || "en",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        handleTranslationChange(lang, field, data.translatedText);
      } else {
        setError("Translation failed");
      }
    } catch {
      setError("Translation failed");
    } finally {
      setTranslatingField(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (!categoryId) {
      setError("Category is required");
      return;
    }

    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      setError("Valid price is required");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/items/${item.id}` : "/api/items";
      const method = isEdit ? "PUT" : "POST";

      // Build clean translations object
      const cleanTranslations: Record<string, TranslationData> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = itemTranslations[lang];
          if (trans?.name?.trim() || trans?.description?.trim()) {
            cleanTranslations[lang] = {
              name: trans.name?.trim() || undefined,
              description: trans.description?.trim() || undefined,
            };
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || null,
          price: Number(price),
          imageUrl: imageUrl || null,
          categoryId,
          isActive,
          translations: Object.keys(cleanTranslations).length > 0 ? cleanTranslations : null,
        }),
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/items`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save item");
      }
    } catch {
      setError("Failed to save item");
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
        <Label htmlFor="category">{t.category}:</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder={t.categoryPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>

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
        <div key={`name-${lang}`} className="space-y-2">
          <Label>{t.name} ({LANGUAGE_NAMES[lang] || lang}):</Label>
          <div className="flex gap-2">
            <Input
              value={itemTranslations[lang]?.name || ""}
              onChange={(e) => handleTranslationChange(lang, "name", e.target.value)}
              placeholder={t.namePlaceholder}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleTranslate(lang, "name")}
              disabled={translatingField === `name-${lang}` || !name.trim()}
              className="shrink-0"
            >
              {translatingField === `name-${lang}` ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="description">{t.description_label}{otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={2}
            className="resize-none"
          />
      </div>

      {/* Description translations */}
      {otherLanguages.map((lang) => (
        <div key={`desc-${lang}`} className="space-y-2">
          <Label>{t.description_label} ({LANGUAGE_NAMES[lang] || lang}):</Label>
          <div className="flex gap-2">
            <Textarea
              value={itemTranslations[lang]?.description || ""}
              onChange={(e) => handleTranslationChange(lang, "description", e.target.value)}
              placeholder={t.descriptionPlaceholder}
              rows={2}
              className="resize-none flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleTranslate(lang, "description")}
              disabled={translatingField === `description-${lang}` || !description.trim()}
              className="shrink-0 self-start"
            >
              {translatingField === `description-${lang}` ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="price">{t.price}:</Label>
          <Input
            id="price"
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => {
              // Replace comma with dot and allow only digits and one dot
              const value = e.target.value
                .replace(",", ".")
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1"); // Allow only one dot
              setPrice(value);
            }}
            placeholder={t.pricePlaceholder}
          />
      </div>

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

      <div className="space-y-2">
        <Label>{t.image}:</Label>
          {imageUrl ? (
            <div className="relative">
              <div className="relative h-40 w-40 rounded-lg overflow-hidden border">
                <Image
                  src={imageUrl}
                  alt="Item image"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 left-36 h-6 w-6"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Uploading...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {t.uploadImage}
                  </span>
                </div>
              )}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
      </div>

      {/* Fixed Save Button */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        {isEdit && t.delete && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            disabled={saving || uploading || deleting}
            className="shadow-lg"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          disabled={saving || uploading || deleting}
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
