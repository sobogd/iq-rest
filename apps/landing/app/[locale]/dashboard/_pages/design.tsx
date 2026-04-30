"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Loader2, Upload, X, Copy, Check, Sparkles, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { useRouter } from "@/i18n/routing";
import { ACCENT_COLORS } from "../_lib/constants";
import { useDashboard } from "../_context/dashboard-context";
import { PageHeader } from "../_ui/page-header";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { CURRENCIES } from "@/lib/currencies";
import { DashboardContent } from "../_ui/dashboard-content";

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
  plan: string;
}

export function DesignPage({ initialRestaurant, plan }: DesignPageProps) {
  const t = useTranslations("dashboard.design");
  const locale = useLocale();
  const router = useRouter();
  const { translations } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const canGenerate = true;

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
  const initAccent = initialRestaurant?.accentColor || "#ED3A3A";
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

  async function handleGenerateBackground() {
    setGenerating(true);
    try {
      const res = await fetch("/api/restaurant/generate-background", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setSource(data.url);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || t("generateError"));
      }
    } catch {
      toast.error(t("generateError"));
    } finally {
      setGenerating(false);
    }
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
        router.push("/dashboard");
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

  const currencyOption = CURRENCIES.find((c) => c.code === currency);

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0">
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
      <form id="design-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
        <DashboardContent innerClassName="space-y-6">

          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("sectionContent")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {/* Name */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="name" className="text-sm text-muted-foreground shrink-0 mr-3">{t("name")}</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_RESTAURANT_NAME)}
                  placeholder={t("namePlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
              <div className="border-t border-border mx-4" />
              {/* Description */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="description" className="text-sm text-muted-foreground shrink-0 mr-3">{t("description")}</label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_RESTAURANT_DESCRIPTION)}
                  placeholder={t("descriptionPlaceholder")}
                  className="flex-1 text-sm text-right bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
              </div>
              <div className="border-t border-border mx-4" />
              {/* Show title */}
              <label htmlFor="hide-title" className="flex items-center justify-between h-11 px-4 cursor-pointer">
                <span className="text-sm">{t("hideTitleLabel")}</span>
                <Switch
                  id="hide-title"
                  checked={!hideTitle}
                  onCheckedChange={(checked) => { track(DashboardEvent.TOGGLED_HIDE_TITLE); setHideTitle(!checked); }}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("nameHint")}</p>
          </div>

          {/* Background */}
          <div>
            <div className="flex items-center justify-between px-4 mb-1.5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{t("background")}</p>
              {canGenerate && (
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                  onClick={() => { track(DashboardEvent.CLICKED_GENERATE_BACKGROUND); handleGenerateBackground(); }}
                  disabled={generating || uploading}
                >
                  {generating ? t("generating") : t("generateBackground")}
                  {generating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                </button>
              )}
            </div>
            <div className="rounded-xl border border-border bg-muted/30">
              {source ? (
                <div className="px-4 pt-4 pb-3">
                  <div className="relative block">
                    <div className="relative h-32 w-32 rounded-lg overflow-hidden border border-border">
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
                          sizes="128px"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-lg bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                      onClick={() => { track(DashboardEvent.CLICKED_REMOVE_BACKGROUND); handleRemoveMedia(); }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center h-28 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => { track(DashboardEvent.CLICKED_UPLOAD_BACKGROUND); fileInputRef.current?.click(); }}
                >
                  {uploading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{t("uploadMedia")}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={handleMediaUpload}
              disabled={uploading}
            />
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("backgroundHint")}</p>
          </div>

          {/* Accent color */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("accentColor")}</p>
            <div className="rounded-xl border border-border bg-muted/30 px-3 pt-3 pb-2.5">
              <div className="grid grid-cols-8 md:grid-cols-10 gap-2.5">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`aspect-square rounded-full border-2 transition-all ${
                      accentColor === color ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => { track(DashboardEvent.CLICKED_PRESET_COLOR); setAccentColor(color); }}
                  />
                ))}
                <div className="relative aspect-square">
                  <button
                    type="button"
                    className={`w-full h-full rounded-full transition-all overflow-hidden ${
                      !ACCENT_COLORS.includes(accentColor) ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110" : "hover:scale-105"
                    }`}
                    style={{ background: "conic-gradient(from 0deg, #ff0000, #ff8800, #ffff00, #00ff00, #00ffff, #0000ff, #8800ff, #ff00ff, #ff0000)" }}
                    onClick={() => colorInputRef.current?.click()}
                  />
                  <input
                    ref={colorInputRef}
                    type="color"
                    value={accentColor}
                    onChange={(e) => { setAccentColor(e.target.value); track(DashboardEvent.CLICKED_PRESET_COLOR); }}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("accentColorHint")}</p>
          </div>

          {/* Settings */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-1.5">{t("sectionSettings")}</p>
            <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
              {/* Slug */}
              <div className="flex items-center h-11 px-4">
                <span className="text-sm text-muted-foreground shrink-0">{t("slugPrefix")}</span>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_RESTAURANT_SLUG)}
                  placeholder={t("slugPlaceholder")}
                  className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground/30 min-w-0"
                />
                {slug && (
                  <button
                    type="button"
                    className="flex items-center justify-center w-8 h-8 -mr-1 rounded-lg text-primary hover:bg-muted/50 transition-colors"
                    onClick={() => {
                      track(DashboardEvent.CLICKED_COPY_URL);
                      navigator.clipboard.writeText(`https://iq-rest.com/m/${slug}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                )}
              </div>
              <div className="border-t border-border mx-4" />
              {/* Currency */}
              <div className="flex items-center h-11 px-4">
                <label htmlFor="currency" className="text-sm text-muted-foreground shrink-0 mr-3">{t("currency")}</label>
                <div className="relative flex-1 flex justify-end">
                  <select
                    id="currency"
                    value={currency}
                    onChange={(e) => { track(DashboardEvent.CHANGED_CURRENCY); setCurrency(e.target.value); }}
                    className="appearance-none bg-transparent text-sm text-right pr-5 cursor-pointer focus:outline-none"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/60 px-4 mt-1.5">{t("slugHint")}</p>
          </div>

          {/* Logout */}
          <div className="rounded-xl border border-border bg-muted/30 overflow-hidden">
            <button
              type="button"
              onClick={() => { track(DashboardEvent.CLICKED_LOGOUT); router.push("/logout"); }}
              className="flex items-center gap-3 w-full h-11 px-4 hover:bg-muted/50 transition-colors"
            >
              <LogOut className="h-4 w-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">{translations.logout}</span>
            </button>
          </div>

        </DashboardContent>
      </form>

      <AlertDialog open={!!validationError} onOpenChange={() => setValidationError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{validationError}</AlertDialogTitle>
            <AlertDialogDescription className="sr-only">{validationError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setValidationError(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
