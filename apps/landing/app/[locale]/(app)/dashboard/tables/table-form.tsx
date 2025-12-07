"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Save, Loader2, Upload, X, Sparkles } from "lucide-react";
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
  zone?: string;
}

interface RestaurantLanguages {
  languages: string[];
  defaultLanguage: string;
}

interface Table {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  imageUrl: string | null;
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

interface TableFormProps {
  table?: Table;
  restaurant?: RestaurantLanguages | null;
  translations: {
    tableNumber: string;
    tableNumberPlaceholder: string;
    capacity: string;
    capacityPlaceholder: string;
    zone: string;
    zonePlaceholder: string;
    image: string;
    uploadImage: string;
    removeImage: string;
    isActive: string;
    save: string;
    saving: string;
    cancel: string;
    error: string;
    close: string;
    delete?: string;
    deleteConfirm?: string;
  };
}

export function TableForm({ table, restaurant, translations: t }: TableFormProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [number, setNumber] = useState(table?.number || 1);
  const [capacity, setCapacity] = useState(table?.capacity || 4);
  const [zone, setZone] = useState(table?.zone || "");
  const [imageUrl, setImageUrl] = useState(table?.imageUrl || "");
  const [isActive, setIsActive] = useState(table?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [error, setError] = useState("");
  const [tableTranslations, setTableTranslations] = useState<Record<string, TranslationData>>(
    (table?.translations as Record<string, TranslationData>) || {}
  );
  const [translatingField, setTranslatingField] = useState<string | null>(null);

  const isEdit = !!table;

  const otherLanguages = restaurant?.languages.filter(
    (lang) => lang !== restaurant.defaultLanguage
  ) || [];

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
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
        setError(data.error || "Failed to upload");
      }
    } catch {
      setError("Failed to upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleDelete() {
    if (!table) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/tables/${table.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/tables`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete table");
      }
    } catch {
      setError("Failed to delete table");
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  function handleTranslationChange(lang: string, value: string) {
    setTableTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        zone: value,
      },
    }));
  }

  async function handleTranslate(lang: string) {
    if (!zone.trim()) return;

    setTranslatingField(`zone-${lang}`);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: zone,
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (number < 1) {
      setError("Table number must be at least 1");
      return;
    }

    if (capacity < 1) {
      setError("Capacity must be at least 1");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/tables/${table.id}` : "/api/tables";
      const method = isEdit ? "PUT" : "POST";

      // Build clean translations object
      const cleanTranslations: Record<string, TranslationData> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = tableTranslations[lang];
          if (trans?.zone?.trim()) {
            cleanTranslations[lang] = {
              zone: trans.zone.trim(),
            };
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number,
          capacity,
          zone: zone.trim() || null,
          imageUrl: imageUrl || null,
          isActive,
          translations: Object.keys(cleanTranslations).length > 0 ? cleanTranslations : null,
        }),
      });

      if (res.ok) {
        router.push(`/${locale}/dashboard/tables`);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save table");
      }
    } catch {
      setError("Failed to save table");
    } finally {
      setSaving(false);
    }
  }

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

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="number">{t.tableNumber}</Label>
            <Input
              id="number"
              type="number"
              min={1}
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
              placeholder={t.tableNumberPlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">{t.capacity}</Label>
            <Input
              id="capacity"
              type="number"
              min={1}
              value={capacity}
              onChange={(e) => setCapacity(parseInt(e.target.value) || 1)}
              placeholder={t.capacityPlaceholder}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zone">{t.zone}{otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}</Label>
          <Input
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            placeholder={t.zonePlaceholder}
          />
        </div>

        {/* Zone translations */}
        {otherLanguages.map((lang) => (
          <div key={`zone-${lang}`} className="space-y-2">
            <Label>{t.zone} ({LANGUAGE_NAMES[lang] || lang})</Label>
            <div className="flex gap-2">
              <Input
                value={tableTranslations[lang]?.zone || ""}
                onChange={(e) => handleTranslationChange(lang, e.target.value)}
                placeholder={t.zonePlaceholder}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleTranslate(lang)}
                disabled={translatingField === `zone-${lang}` || !zone.trim()}
                className="shrink-0"
              >
                {translatingField === `zone-${lang}` ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <Label>{t.image}</Label>
          {imageUrl ? (
            <div className="relative">
              <div className="relative h-40 w-40 rounded-lg overflow-hidden border">
                <Image
                  src={imageUrl}
                  alt="Table"
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
                onClick={() => setImageUrl("")}
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
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t.uploadImage}</span>
                </div>
              )}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label htmlFor="isActive">{t.isActive}</Label>
        </div>
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
          disabled={saving || deleting || uploading}
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
