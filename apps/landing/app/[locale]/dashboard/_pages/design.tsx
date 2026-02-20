"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations, useLocale } from "next-intl";
import { ACCENT_COLORS } from "../_lib/constants";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { FormSwitch } from "../_ui/form-switch";
import { track, DashboardEvent } from "@/lib/dashboard-events";

interface DesignPageProps {
  initialRestaurant: {
    source: string | null;
    accentColor: string;
    hideTitle: boolean;
  } | null;
}

export function DesignPage({ initialRestaurant }: DesignPageProps) {
  const t = useTranslations("dashboard.design");
  const locale = useLocale();
  const { translations } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initSource = initialRestaurant?.source || null;
  const initAccent = initialRestaurant?.accentColor || "#E11D48";
  const initHideTitle = initialRestaurant?.hideTitle || false;

  const [source, setSource] = useState<string | null>(initSource);
  const [accentColor, setAccentColor] = useState(initAccent);
  const [hideTitle, setHideTitle] = useState(initHideTitle);

  const [originalSource, setOriginalSource] = useState<string | null>(initSource);
  const [originalAccentColor, setOriginalAccentColor] = useState(initAccent);
  const [originalHideTitle, setOriginalHideTitle] = useState(initHideTitle);

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    track(DashboardEvent.SHOWED_DESIGN);
  }, []);

  const hasChanges = useMemo(() => {
    return source !== originalSource || accentColor !== originalAccentColor || hideTitle !== originalHideTitle;
  }, [source, accentColor, hideTitle, originalSource, originalAccentColor, originalHideTitle]);

  function isVideo(url: string) {
    return /\.(mp4|webm|mov)$/i.test(url);
  }

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];
    if (!allowedTypes.includes(file.type)) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "design", field: "media_type" });
      setValidationError(t("invalidFileType"));
      return;
    }

    const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "design", field: "media_size" });
      setValidationError(t("fileTooLarge"));
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
        setSource(data.url);
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_UPLOAD, { page: "design" });
        setValidationError(data.error || t("uploadError"));
      }
    } catch {
      track(DashboardEvent.ERROR_UPLOAD, { page: "design" });
      setValidationError(t("uploadError"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemoveMedia() {
    setSource(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: source,
          accentColor,
          hideTitle,
        }),
      });

      if (res.ok) {
        track(DashboardEvent.CLICKED_SAVE_DESIGN);
        toast.success(t("saved"));
        window.location.href = `/${locale}/dashboard`;
        return;
      } else {
        const data = await res.json();
        track(DashboardEvent.ERROR_SAVE, { page: "design" });
        toast.error(data.error || t("saveError"));
      }
    } catch {
      track(DashboardEvent.ERROR_SAVE, { page: "design" });
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={translations.pages.design} />
      <form id="design-form" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          <div className="max-w-lg mx-auto flex flex-col min-h-full">
          <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <FormSwitch
            id="hideTitle"
            label={t("hideTitleLabel")}
            checked={!hideTitle}
            onCheckedChange={(checked) => { track(DashboardEvent.TOGGLED_HIDE_TITLE); setHideTitle(!checked); }}
            activeText={t("hideTitleVisible")}
            inactiveText={t("hideTitleHidden")}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("hideTitleHint")}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{t("background")}:</label>
          {source ? (
            <div className="relative">
              <div className="relative h-40 w-40 rounded-lg overflow-hidden border">
                {isVideo(source) ? (
                  <video
                    src={source}
                    className="h-full w-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                  />
                ) : (
                  <Image
                    src={source}
                    alt="Background"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 left-36 h-6 w-6"
                onClick={() => { track(DashboardEvent.CLICKED_REMOVE_BACKGROUND); handleRemoveMedia(); }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors bg-muted/30"
              onClick={() => { track(DashboardEvent.CLICKED_UPLOAD_BACKGROUND); fileInputRef.current?.click(); }}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("uploadMedia")}</span>
                </div>
              )}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
            className="hidden"
            onChange={handleMediaUpload}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground px-1">
            {t("backgroundHint")}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t("accentColor")}:
          </label>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{t("presetColors")}</p>
            <div className="flex flex-wrap gap-2">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    accentColor === color ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => { track(DashboardEvent.CLICKED_PRESET_COLOR); setAccentColor(color); }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{t("customColor")}</p>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => { track(DashboardEvent.CHANGED_CUSTOM_COLOR); setAccentColor(e.target.value); }}
                className="w-10 h-10 rounded cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                    setAccentColor(value);
                  }
                }}
                className="w-24 h-10 px-3 rounded-md border border-input bg-background text-sm font-mono uppercase"
                placeholder="#E11D48"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground px-1">
            {t("accentColorHint")}
          </p>
        </div>
        </div>
          <div className="pt-4 pb-2">
            <Button type="submit" disabled={saving || uploading || !hasChanges} variant="destructive" className="w-full h-12 rounded-2xl shadow-md">
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

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
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
