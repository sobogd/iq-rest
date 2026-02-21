"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import { Loader2, X, Trash2, Upload, Sparkles } from "lucide-react";
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
import { useLocale, useTranslations } from "next-intl";
import { FormInput } from "../_ui/form-input";
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
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
  const tAi = useTranslations("dashboard.aiTranslate");
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
  const [translatingLangs, setTranslatingLangs] = useState<Set<string>>(new Set());
  const [showTranslateLimitDialog, setShowTranslateLimitDialog] = useState(false);

  // Original values for change detection
  const [originalNumber, setOriginalNumber] = useState("1");
  const [originalCapacity, setOriginalCapacity] = useState("4");
  const [originalZone, setOriginalZone] = useState("");
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [originalTranslations, setOriginalTranslations] = useState<Record<string, { zone?: string }>>({});

  const isEdit = !!id;

  const hasChanges = useMemo(() => {
    if (!isEdit) {
      return true;
    }
    return (
      number !== originalNumber ||
      capacity !== originalCapacity ||
      zone !== originalZone ||
      imageUrl !== originalImageUrl ||
      JSON.stringify(tableTranslations) !== JSON.stringify(originalTranslations)
    );
  }, [isEdit, number, capacity, zone, imageUrl, tableTranslations, originalNumber, originalCapacity, originalZone, originalImageUrl, originalTranslations]);

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
      const tNum = data.number?.toString() || "1";
      const tCap = data.capacity?.toString() || "4";
      const tZone = data.zone || "";
      const tImage = data.imageUrl || "";
      const tTrans = (data.translations as Record<string, { zone?: string }>) || {};

      setNumber(tNum);
      setCapacity(tCap);
      setZone(tZone);
      setImageUrl(tImage);
      setIsActive(data.isActive);
      setTableTranslations(tTrans);

      setOriginalNumber(tNum);
      setOriginalCapacity(tCap);
      setOriginalZone(tZone);
      setOriginalImageUrl(tImage);
      setOriginalTranslations(tTrans);
    } catch (error) {
      console.error("Failed to fetch table:", error);
      track(DashboardEvent.ERROR_FETCH, { page: "table" });
      toast.error(t("error"));
      router.push("/dashboard/tables");
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "table", field: "image_type" });
      setValidationError("Invalid file type. Allowed: JPEG, PNG, WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "table", field: "image_size" });
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
        track(DashboardEvent.ERROR_UPLOAD, { page: "table" });
        setValidationError(data.error || "Failed to upload");
      }
    } catch {
      track(DashboardEvent.ERROR_UPLOAD, { page: "table" });
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

  async function handleTranslateSection(lang: string) {
    const srcLang = restaurant?.defaultLanguage || "en";
    if (!zone.trim()) return;

    track(DashboardEvent.CLICKED_AI_TRANSLATE);
    setTranslatingLangs((prev) => new Set(prev).add(lang));

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: zone.trim(), targetLanguage: lang, sourceLanguage: srcLang }),
      });

      if (res.ok) {
        const data = await res.json();
        handleTranslationChange(lang, data.translatedText);
      } else if (res.status === 403) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "limit_reached") setShowTranslateLimitDialog(true);
        else toast.error(t("error"));
      } else {
        toast.error(t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setTranslatingLangs((prev) => {
        const next = new Set(prev);
        next.delete(lang);
        return next;
      });
    }
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
        track(DashboardEvent.ERROR_DELETE, { page: "table" });
        toast.error(data.error || t("error"));
      }
    } catch {
      track(DashboardEvent.ERROR_DELETE, { page: "table" });
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
      track(DashboardEvent.ERROR_VALIDATION, { page: "table", field: "number" });
      setValidationError(t("tableNumber") + " must be at least 1");
      return;
    }

    if (capacityValue < 1) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "table", field: "capacity" });
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
        track(DashboardEvent.ERROR_SAVE, { page: "table" });
        toast.error(data.error || t("error"));
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "table" });
      toast.error(t("error"));
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
        <PageHeader title={isEdit ? t("editTable") : t("newTable")} backHref="/dashboard/tables">
          <Button
            type="submit"
            form="table-form"
            disabled={saving || deleting || uploading || !hasChanges}
            variant="default"
            size="sm"
            className={!hasChanges ? "opacity-40" : ""}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
          </Button>
        </PageHeader>
      </div>

      <form id="table-form" onSubmit={handleSubmit} className="px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-6">

          <div className="space-y-4">
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
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors bg-muted/30"
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
                    disabled={isTranslating || !zone.trim()}
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
                  id={`zone-${lang}`}
                  label={`${t("zone")}:`}
                  value={tableTranslations[lang]?.zone || ""}
                  onChange={(value) => handleTranslationChange(lang, value)}
                  placeholder={t("zonePlaceholder")}
                />
              </div>
            );
          })}

          {isEdit && (
            <button
              type="button"
              onClick={() => { track(DashboardEvent.CLICKED_DELETE_TABLE); setShowDeleteDialog(true); }}
              disabled={saving || deleting}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 underline disabled:opacity-50 transition-colors pt-8"
            >
              <Trash2 className="h-4 w-4" />
              {t("delete")}
            </button>
          )}

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
