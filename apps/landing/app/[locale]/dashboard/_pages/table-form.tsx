"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Loader2, Save, X, Trash2, Upload } from "lucide-react";
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
import { PageLoader } from "../_ui/page-loader";
import { PageHeader } from "../_ui/page-header";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { FormInput } from "../_ui/form-input";
import { FormInputTranslate } from "../_ui/form-input-translate";
import { FormSwitch } from "../_ui/form-switch";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
import { useTranslations } from "next-intl";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface Table {
  id: string;
  number: number;
  capacity: number;
  zone: string | null;
  imageUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  translations?: Record<string, { zone?: string }> | null;
}

interface TableFormPageProps {
  id?: string;
}

export function TableFormPage({ id }: TableFormPageProps) {
  const t = useTranslations("reservations");
  const router = useRouter();
  const locale = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { restaurant, loading: loadingRestaurant, otherLanguages } = useRestaurantLanguages();

  const [loading, setLoading] = useState(!!id);
  const [number, setNumber] = useState("1");
  const [capacity, setCapacity] = useState("4");
  const [zone, setZone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tableTranslations, setTableTranslations] = useState<Record<string, { zone?: string }>>({});
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEdit = !!id;

  useEffect(() => {
    track(DashboardEvent.SHOWED_TABLE_FORM);
    if (id) {
      fetchTable(id);
    }
  }, [id]);

  async function fetchTable(tableId: string) {
    try {
      const response = await fetch(`/api/tables/${tableId}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data: Table = await response.json();
      setNumber(data.number?.toString() || "1");
      setCapacity(data.capacity?.toString() || "4");
      setZone(data.zone || "");
      setImageUrl(data.imageUrl || "");
      setIsActive(data.isActive);
      setTableTranslations(
        (data.translations as Record<string, { zone?: string }>) || {}
      );
    } catch (error) {
      console.error("Failed to fetch table:", error);
      toast.error(t("error"));
      router.back();
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setValidationError("Invalid file type. Allowed: JPEG, PNG, WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setValidationError("Image must be less than 5MB");
      return;
    }

    setUploading(true);

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
        setValidationError(data.error || "Failed to upload");
      }
    } catch {
      setValidationError("Failed to upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleTranslationChange(lang: string, value: string) {
    setTableTranslations((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], zone: value },
    }));
  }

  async function handleDelete() {
    if (!id) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/tables/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(t("delete"));
        window.location.href = `/${locale}/dashboard/tables`;
      } else {
        const data = await res.json();
        toast.error(data.error || t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const numberValue = parseInt(number) || 0;
    const capacityValue = parseInt(capacity) || 0;

    if (numberValue < 1) {
      setValidationError(t("tableNumber") + " must be at least 1");
      return;
    }

    if (capacityValue < 1) {
      setValidationError(t("capacity") + " must be at least 1");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/tables/${id}` : "/api/tables";
      const method = isEdit ? "PUT" : "POST";

      const cleanTranslations: Record<string, { zone: string }> = {};
      if (restaurant) {
        for (const lang of restaurant.languages) {
          if (lang === restaurant.defaultLanguage) continue;
          const trans = tableTranslations[lang];
          if (trans?.zone?.trim()) {
            cleanTranslations[lang] = { zone: trans.zone.trim() };
          }
        }
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: numberValue,
          capacity: capacityValue,
          zone: zone.trim() || null,
          imageUrl: imageUrl || null,
          isActive,
          translations: Object.keys(cleanTranslations).length > 0 ? cleanTranslations : null,
        }),
      });

      if (res.ok) {
        track(DashboardEvent.CLICKED_SAVE_TABLE);
        toast.success(isEdit ? t("save") : t("addTable"));
        window.location.href = `/${locale}/dashboard/tables`;
      } else {
        const data = await res.json();
        toast.error(data.error || t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setSaving(false);
    }
  }

  if (loading || loadingRestaurant) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={isEdit ? t("editTable") : t("newTable")}>
        {isEdit && (
          <button
            type="button"
            onClick={() => { track(DashboardEvent.CLICKED_DELETE_TABLE); setShowDeleteDialog(true); }}
            disabled={saving || deleting}
            className="flex items-center justify-center h-10 w-10 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors disabled:opacity-30"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </PageHeader>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="max-w-lg mx-auto space-y-4">
          <FormSwitch
            id="isActive"
            label={`${t("isActive")}:`}
            checked={isActive}
            onCheckedChange={(v) => { track(DashboardEvent.TOGGLED_TABLE_ACTIVE); setIsActive(v); }}
            activeText={t("active")}
            inactiveText={t("inactive")}
          />

          <FormInput
            id="number"
            label={`${t("tableNumber")}:`}
            value={number}
            onChange={(value) => setNumber(value.replace(/[^0-9]/g, ""))}
            onFocus={() => track(DashboardEvent.FOCUSED_TABLE_NUMBER)}
            placeholder={t("tableNumberPlaceholder")}
          />

          <FormInput
            id="capacity"
            label={`${t("capacity")}:`}
            value={capacity}
            onChange={(value) => setCapacity(value.replace(/[^0-9]/g, ""))}
            onFocus={() => track(DashboardEvent.FOCUSED_TABLE_CAPACITY)}
            placeholder={t("capacityPlaceholder")}
          />

          <FormInput
            id="zone"
            label={`${t("zone")}${otherLanguages.length > 0 ? ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})` : ""}:`}
            value={zone}
            onChange={setZone}
            onFocus={() => track(DashboardEvent.FOCUSED_TABLE_ZONE)}
            placeholder={t("zonePlaceholder")}
          />

          {otherLanguages.map((lang) => (
            <FormInputTranslate
              key={lang}
              id={`zone-${lang}`}
              label={`${t("zone")} (${LANGUAGE_NAMES[lang] || lang}):`}
              value={tableTranslations[lang]?.zone || ""}
              onChange={(value) => handleTranslationChange(lang, value)}
              placeholder={t("zonePlaceholder")}
              sourceText={zone}
              sourceLanguage={restaurant?.defaultLanguage || "en"}
              targetLanguage={lang}
              translateErrorMessage={t("error")}
            />
          ))}

          <div className="space-y-2">
            <label className="text-sm font-medium">{t("image")}:</label>
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
                onClick={() => { track(DashboardEvent.CLICKED_UPLOAD_TABLE_IMAGE); fileInputRef.current?.click(); }}
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{t("uploadImage")}</span>
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

          <div className="sticky bottom-0 flex justify-end gap-2 pt-4 pb-2">
            <Button type="submit" disabled={saving || deleting || uploading} variant="destructive" className="h-10 rounded-xl shadow-md">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {t("save")}
            </Button>
          </div>
          </div>
        </div>
      </form>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("delete")}</DialogTitle>
            <DialogDescription>{t("deleteConfirm")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              <X className="h-4 w-4 mr-2" />
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("error")}</AlertDialogTitle>
            <AlertDialogDescription>{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>{t("close")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
