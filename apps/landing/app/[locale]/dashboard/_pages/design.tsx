"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import { Loader2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PageLoader } from "../_ui/page-loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { ACCENT_COLORS } from "../_lib/constants";
import { useDashboard } from "../_context/dashboard-context";
import { analytics } from "@/lib/analytics";

export function DesignPage() {
  const t = useTranslations("dashboard.design");
  const { returnToOnboarding } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [source, setSource] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState("#E11D48");

  const [originalSource, setOriginalSource] = useState<string | null>(null);
  const [originalAccentColor, setOriginalAccentColor] = useState("#E11D48");

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRestaurant() {
    try {
      const res = await fetch("/api/restaurant");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setSource(data.source || null);
          setAccentColor(data.accentColor || "#E11D48");
          setOriginalSource(data.source || null);
          setOriginalAccentColor(data.accentColor || "#E11D48");
        }
      }
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }

  const hasChanges = useMemo(() => {
    return source !== originalSource || accentColor !== originalAccentColor;
  }, [source, accentColor, originalSource, originalAccentColor]);

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
      setValidationError(t("invalidFileType"));
      return;
    }

    const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
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
        setValidationError(data.error || t("uploadError"));
      }
    } catch {
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
        }),
      });

      if (res.ok) {
        toast.success(t("saved"));
        analytics.design.save();
        if (accentColor !== originalAccentColor) {
          analytics.design.accentColorChange();
        }
        setOriginalSource(source);
        setOriginalAccentColor(accentColor);
        returnToOnboarding();
      } else {
        const data = await res.json();
        toast.error(data.error || t("saveError"));
      }
    } catch {
      toast.error(t("saveError"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col h-full">
      <form id="design-form" onSubmit={handleSubmit} className="flex-1 overflow-auto p-6 space-y-6 max-w-md">
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
                onClick={handleRemoveMedia}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors bg-muted/30"
              onClick={() => fileInputRef.current?.click()}
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
          <label className="text-sm font-medium">{t("accentColor")}:</label>

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
                  onClick={() => setAccentColor(color)}
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
                onChange={(e) => setAccentColor(e.target.value)}
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
      </form>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background shrink-0 rounded-b-xl">
        <Button type="submit" form="design-form" disabled={saving || uploading || !hasChanges}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {t("save")}
        </Button>
      </div>

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
