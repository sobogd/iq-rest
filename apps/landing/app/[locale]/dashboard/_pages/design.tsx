"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, X, Copy, Check } from "lucide-react";
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
import { FormInput } from "../_ui/form-input";
import { FormSelect } from "../_ui/form-select";
import { FormSwitch } from "../_ui/form-switch";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { CURRENCIES } from "@/lib/currencies";

interface DesignPageProps {
  initialRestaurant: {
    title: string;
    description: string | null;
    slug: string | null;
    currency: string;
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

  // General fields
  const initName = initialRestaurant?.title || "";
  const initDescription = initialRestaurant?.description || "";
  const initSlug = initialRestaurant?.slug || "";
  const initCurrency = initialRestaurant?.currency || "EUR";

  const [name, setName] = useState(initName);
  const [description, setDescription] = useState(initDescription);
  const [slug, setSlug] = useState(initSlug);
  const [currency, setCurrency] = useState(initCurrency);

  const [originalName] = useState(initName);
  const [originalDescription] = useState(initDescription);
  const [originalSlug] = useState(initSlug);
  const [originalCurrency] = useState(initCurrency);

  // Design fields
  const initSource = initialRestaurant?.source || null;
  const initAccent = initialRestaurant?.accentColor || "#E11D48";
  const initHideTitle = initialRestaurant?.hideTitle || false;

  const [source, setSource] = useState<string | null>(initSource);
  const [accentColor, setAccentColor] = useState(initAccent);
  const [hideTitle, setHideTitle] = useState(initHideTitle);

  const [originalSource] = useState<string | null>(initSource);
  const [originalAccentColor] = useState(initAccent);
  const [originalHideTitle] = useState(initHideTitle);

  const [validationError, setValidationError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    track(DashboardEvent.SHOWED_DESIGN);
  }, []);

  const hasChanges = useMemo(() => {
    return (
      name !== originalName ||
      description !== originalDescription ||
      slug !== originalSlug ||
      currency !== originalCurrency ||
      source !== originalSource ||
      accentColor !== originalAccentColor ||
      hideTitle !== originalHideTitle
    );
  }, [name, description, slug, currency, source, accentColor, hideTitle, originalName, originalDescription, originalSlug, originalCurrency, originalSource, originalAccentColor, originalHideTitle]);

  function handleSlugChange(value: string) {
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    setSlug(cleanSlug);
  }

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

    if (!name.trim()) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "design", field: "name" });
      setValidationError(t("nameRequired"));
      return;
    }

    if (!slug.trim()) {
      track(DashboardEvent.ERROR_VALIDATION, { page: "design", field: "slug" });
      setValidationError(t("slugRequired"));
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: name.trim(),
          description: description.trim() || null,
          slug: slug.trim(),
          currency,
          source,
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
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background">
        <PageHeader title={translations.pages.design}>
          <Button
            type="submit"
            form="design-form"
            disabled={saving || uploading || !hasChanges}
            variant="default"
            size="sm"
            className={!hasChanges ? "opacity-40" : ""}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : t("save")}
          </Button>
        </PageHeader>
      </div>
      <form id="design-form" onSubmit={handleSubmit} className="px-6 pt-4 pb-6">
        <div className="max-w-lg mx-auto space-y-6">

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{t("sectionContent")}:</h2>

            <div className="space-y-2">
              <FormInput
                id="name"
                label={`${t("name")}:`}
                value={name}
                onChange={setName}
                onFocus={() => track(DashboardEvent.FOCUSED_RESTAURANT_NAME)}
                placeholder={t("namePlaceholder")}
              />
              <p className="text-xs text-muted-foreground">
                {t("nameHint")}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                id="description"
                label={`${t("description")}:`}
                value={description}
                onChange={setDescription}
                onFocus={() => track(DashboardEvent.FOCUSED_RESTAURANT_DESCRIPTION)}
                placeholder={t("descriptionPlaceholder")}
              />
              <p className="text-xs text-muted-foreground">
                {t("descriptionHint")}
              </p>
            </div>

            <div className="space-y-2">
              <FormSwitch
                id="hideTitle"
                label={`${t("hideTitleLabel")}:`}
                checked={!hideTitle}
                onCheckedChange={(checked) => { track(DashboardEvent.TOGGLED_HIDE_TITLE); setHideTitle(!checked); }}
                activeText={t("hideTitleOn")}
                inactiveText={t("hideTitleOff")}
              />
              <p className="text-xs text-muted-foreground">
                {t("hideTitleHint")}
              </p>
            </div>
          </div>

          {/* Design */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-6">{t("sectionDesign")}:</h2>

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
              <p className="text-xs text-muted-foreground">
                {t("backgroundHint")}
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">
                {t("accentColor")}:
              </label>

              <div className="flex flex-wrap gap-2.5">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      accentColor === color ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => { track(DashboardEvent.CLICKED_PRESET_COLOR); setAccentColor(color); }}
                  />
                ))}
              </div>

              {/* Preview */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-muted-foreground">{t("preview")}:</span>
                <span
                  className="px-5 py-2.5 rounded-2xl text-sm font-medium text-white pointer-events-none shadow-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  {t("previewButton")}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {t("accentColorHint")}
              </p>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-6">{t("sectionSettings")}:</h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="slug" className="text-sm font-medium">{t("slug")}:</label>
                {slug && (
                  <button
                    type="button"
                    className="text-xs text-muted-foreground underline hover:text-foreground transition-colors flex items-center gap-1"
                    onClick={() => {
                      track(DashboardEvent.CLICKED_COPY_URL);
                      navigator.clipboard.writeText(`https://iq-rest.com/m/${slug}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {t("copyUrl")}
                  </button>
                )}
              </div>
              <div className="flex h-12 w-full rounded-xl border border-border bg-muted/30 overflow-hidden">
                <span className="flex items-center px-3 text-sm text-muted-foreground bg-muted/50 border-r border-border shrink-0">
                  {t("slugPrefix")}
                </span>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_RESTAURANT_SLUG)}
                  placeholder={t("slugPlaceholder")}
                  className="flex-1 h-full px-4 bg-transparent text-base md:text-sm placeholder:text-muted-foreground/50 focus:outline-none"
                />
              </div>
            </div>

            <FormSelect
              id="currency"
              label={`${t("currency")}:`}
              value={currency}
              onChange={(v) => { track(DashboardEvent.CHANGED_CURRENCY); setCurrency(v); }}
              placeholder={t("currencyPlaceholder")}
              options={CURRENCIES.map((c) => ({
                value: c.code,
                label: `${c.code} (${c.symbol}) - ${c.name}`,
              }))}
            />
          </div>

        </div>
      </form>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("validationErrorTitle")}</AlertDialogTitle>
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
