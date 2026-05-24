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
import { LANGUAGE_NAMES } from "../_lib/constants";
import { useRestaurantLanguages } from "../_hooks/use-restaurant-languages";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { DashboardContent } from "../_ui/dashboard-content";

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
        router.push("/dashboard/tables");
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
        router.push("/dashboard/tables");
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
    <div className="flex flex-col h-full">
      <div className="shrink-0">
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

      <form id="table-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">

          {/* General */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("general")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {/* Number */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="number" className="text-sm text-muted-foreground shrink-0 mr-3">{t("tableNumber")}</label>
                <input
                  id="number"
                  type="text"
                  inputMode="numeric"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ""))}
                  onFocus={() => track(DashboardEvent.FOCUSED_TABLE_NUMBER)}
                  placeholder={t("tableNumberPlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
              <div className="border-t border-border mx-4" />
              {/* Capacity */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="capacity" className="text-sm text-muted-foreground shrink-0 mr-3">{t("capacity")}</label>
                <input
                  id="capacity"
                  type="text"
                  inputMode="numeric"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value.replace(/[^0-9]/g, ""))}
                  onFocus={() => track(DashboardEvent.FOCUSED_TABLE_CAPACITY)}
                  placeholder={t("capacityPlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
              <div className="border-t border-border mx-4" />
              {/* Zone */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="zone" className="text-sm text-muted-foreground shrink-0 mr-3">
                  {t("zone")}
                  {otherLanguages.length > 0 && ` (${LANGUAGE_NAMES[restaurant?.defaultLanguage || "en"] || restaurant?.defaultLanguage})`}
                </label>
                <input
                  id="zone"
                  type="text"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_TABLE_ZONE)}
                  placeholder={t("zonePlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("image")}</p>
            <div className="rounded-xl border border-border bg-muted/30">
              {imageUrl ? (
                <div className="p-4">
                  <div className="relative inline-block">
                    <div className="relative h-32 w-32 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={imageUrl}
                        alt="Table"
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-lg bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                      onClick={() => setImageUrl("")}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center h-28 cursor-pointer hover:bg-muted/50 transition-colors rounded-xl"
                  onClick={() => { track(DashboardEvent.CLICKED_UPLOAD_TABLE_IMAGE); fileInputRef.current?.click(); }}
                >
                  {uploading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{t("uploadImage")}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>

          {/* Translation sections */}
          {otherLanguages.map((lang) => {
            const isTranslating = translatingLangs.has(lang);
            return (
              <div key={lang}>
                <div className="flex items-center justify-between px-4 mb-1.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{LANGUAGE_NAMES[lang] || lang}</p>
                  <button
                    type="button"
                    onClick={() => handleTranslateSection(lang)}
                    disabled={isTranslating || !zone.trim()}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                  >
                    {isTranslating ? tAi("translating") : tAi("translate")}
                    {isTranslating ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                  </button>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                  <div className="flex items-center h-11 px-4">
                    <label className="text-sm text-muted-foreground shrink-0 mr-3">{t("zone")}</label>
                    <input
                      type="text"
                      value={tableTranslations[lang]?.zone || ""}
                      onChange={(e) => handleTranslationChange(lang, e.target.value)}
                      placeholder={t("zonePlaceholder")}
                      className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Delete */}
          {isEdit && (
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              <button
                type="button"
                onClick={() => { track(DashboardEvent.CLICKED_DELETE_TABLE); setShowDeleteDialog(true); }}
                disabled={saving || deleting}
                className="flex items-center gap-3 w-full h-11 px-4 hover:bg-muted/50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">{t("delete")}</span>
              </button>
            </div>
          )}

        </DashboardContent>
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
