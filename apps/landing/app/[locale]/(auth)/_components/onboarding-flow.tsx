"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import {
  Wand2, LayoutTemplate, Pencil, Camera, Plus, Loader2, X, FileText,
  ArrowLeft, UtensilsCrossed, Coffee, Beer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { track, DashboardEvent, setDashboardUserId } from "@/lib/dashboard-events";
import { analytics } from "@/lib/analytics";

// --- Types ---

type Step = "name" | "method" | "scan" | "templates";
type MenuOption = "scan" | "templates" | "manual";
type TemplateId = "restaurant" | "cafe" | "bar";

interface PoolPhoto {
  id: string;
  file: File;
  preview: string;
}

// --- Constants ---

const MAX_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 5;

const MENU_OPTIONS: { id: MenuOption; icon: typeof Wand2; titleKey: string; descKey: string }[] = [
  { id: "scan", icon: Wand2, titleKey: "aiImportTitle", descKey: "aiImportDescription" },
  { id: "templates", icon: LayoutTemplate, titleKey: "templatesTitle", descKey: "templatesDescription" },
  { id: "manual", icon: Pencil, titleKey: "manualTitle", descKey: "manualDescription" },
];

const TEMPLATES: { id: TemplateId; icon: typeof UtensilsCrossed; titleKey: string; descKey: string }[] = [
  { id: "restaurant", icon: UtensilsCrossed, titleKey: "templateRestaurantTitle", descKey: "templateRestaurantDescription" },
  { id: "cafe", icon: Coffee, titleKey: "templateCafeTitle", descKey: "templateCafeDescription" },
  { id: "bar", icon: Beer, titleKey: "templateBarTitle", descKey: "templateBarDescription" },
];

const TRANSLATION_KEYS = [
  "tplCatSalads", "tplCatMainDishes", "tplCatSideDishes",
  "tplCatBreakfasts", "tplCatCoffeeTea", "tplCatDesserts",
  "tplCatCocktails", "tplCatBeer", "tplCatBarSnacks",
  "tplItemCaesarSalad", "tplItemGreekSalad", "tplItemRibeyeSteak", "tplItemSalmonFillet",
  "tplItemFrenchFries", "tplItemGrilledVegetables", "tplItemSalmonToast", "tplItemPancakes",
  "tplItemCappuccino", "tplItemLatte", "tplItemEarlGrey", "tplItemCheesecake", "tplItemTiramisu",
  "tplItemMargarita", "tplItemMojito", "tplItemOldFashioned", "tplItemLager", "tplItemIPA",
  "tplItemStout", "tplItemNachos", "tplItemCroutons", "tplItemMixedNuts",
] as const;

// --- Helpers ---

function isHeic(file: File): boolean {
  return file.type === "image/heic" || file.type === "image/heif"
    || file.name.toLowerCase().endsWith(".heic")
    || file.name.toLowerCase().endsWith(".heif");
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function convertHeicToBase64(file: File): Promise<string> {
  const { default: heic2any } = await import("heic2any");
  const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
  const jpegBlob = Array.isArray(blob) ? blob[0] : blob;
  return fileToBase64(new File([jpegBlob], "photo.jpg", { type: "image/jpeg" }));
}

function fileToJpegBase64(file: File): Promise<string> {
  return isHeic(file) ? convertHeicToBase64(file) : fileToBase64(file);
}

// --- Component ---

interface OnboardingFlowProps {
  userId: string;
  restaurantName: string | null;
  initialStep: Step;
}

export function OnboardingFlow({ userId, restaurantName: initialName, initialStep }: OnboardingFlowProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("dashboard.onboarding");
  const tAuth = useTranslations("dashboard.auth");
  const tMenu = useTranslations("dashboard.menu");

  const [step, setStep] = useState<Step>(initialStep);
  const [restaurantName, setRestaurantName] = useState(initialName || "");
  const [nameInput, setNameInput] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<MenuOption>("scan");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("restaurant");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Scan state
  const [photoPool, setPhotoPool] = useState<PoolPhoto[]>([]);
  const [scanError, setScanError] = useState("");
  const [scanLoading, setScanLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDashboardUserId(userId);
    analytics.linkSession(userId);
  }, [userId]);

  useEffect(() => {
    if (step === "name") {
      track(DashboardEvent.SHOWED_ONBOARDING_NAME);
      nameInputRef.current?.focus();
    } else if (step === "method") {
      track(DashboardEvent.SHOWED_ONBOARDING_MENU);
    } else if (step === "scan") {
      track(DashboardEvent.SHOWED_ONBOARDING_SCAN);
    } else if (step === "templates") {
      track(DashboardEvent.SHOWED_ONBOARDING_TEMPLATES);
    }
  }, [step]);

  useEffect(() => {
    return () => { photoPool.forEach((p) => { if (p.preview.startsWith("blob:")) URL.revokeObjectURL(p.preview); }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCurrencyFromCookie(): string {
    const match = document.cookie.match(/(?:^|; )currency=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : "EUR";
  }

  // --- Name step ---

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setIsLoading(true);
    setErrorMessage("");
    track(DashboardEvent.CLICKED_ONBOARDING_CONTINUE);

    try {
      const currency = getCurrencyFromCookie();
      const response = await fetch("/api/restaurant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: nameInput.trim(), currency }),
      });

      if (response.ok) {
        setRestaurantName(nameInput.trim());
        setIsLoading(false);
        setStep("method");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || t("error"));
        setIsLoading(false);
      }
    } catch {
      setErrorMessage(t("error"));
      setIsLoading(false);
    }
  };

  // --- Method step ---

  const handleMethodContinue = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (selectedMethod === "scan") {
      track(DashboardEvent.CLICKED_ONBOARDING_SCAN);
      setIsLoading(false);
      setStep("scan");
    } else if (selectedMethod === "templates") {
      track(DashboardEvent.CLICKED_ONBOARDING_TEMPLATES);
      setIsLoading(false);
      setStep("templates");
    } else {
      track(DashboardEvent.CLICKED_ONBOARDING_MANUAL);
      const res = await fetch("/api/onboarding/complete", { method: "POST" }).catch(() => null);
      if (!res?.ok) {
        setIsLoading(false);
        return;
      }
      router.replace("/dashboard");
    }
  };

  // --- Scan step ---

  function addFilesToPool(files: FileList | null) {
    if (!files || files.length === 0) return;

    const remaining = MAX_FILES - photoPool.length;
    if (remaining <= 0) {
      setScanError(tMenu("scanErrorTooMany"));
      return;
    }

    const accepted = Array.from(files).slice(0, remaining);

    for (const file of accepted) {
      if (file.size > MAX_SIZE) {
        setScanError(tMenu("scanErrorTooLarge"));
        track(DashboardEvent.SCAN_MENU_ERROR, { reason: "too_large" });
        return;
      }
    }

    const newPhotos: PoolPhoto[] = accepted.map((file) => {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      return {
        id: Math.random().toString(36).substring(2, 10),
        file,
        preview: isPdf ? "pdf" : isHeic(file) ? "heic" : URL.createObjectURL(file),
      };
    });

    setPhotoPool((prev) => [...prev, ...newPhotos]);

    const heicPhotos = newPhotos.filter((p) => p.preview === "heic");
    if (heicPhotos.length > 0) {
      Promise.all(
        heicPhotos.map(async (p) => {
          try {
            const base64 = await convertHeicToBase64(p.file);
            setPhotoPool((prev) =>
              prev.map((item) => item.id === p.id ? { ...item, preview: base64 } : item)
            );
          } catch {
            // fallback
          }
        })
      );
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFromPool(id: string) {
    setPhotoPool((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed && removed.preview.startsWith("blob:")) URL.revokeObjectURL(removed.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  const handleStartScan = useCallback(async () => {
    if (photoPool.length === 0) return;

    track(DashboardEvent.SCAN_MENU_UPLOAD, { count: String(photoPool.length) });
    setScanError("");
    setScanLoading(true);

    try {
      const images = await Promise.all(
        photoPool.map((p) => {
          const isPdf = p.file.type === "application/pdf" || p.file.name.toLowerCase().endsWith(".pdf");
          return isPdf ? fileToBase64(p.file) : fileToJpegBase64(p.file);
        })
      );

      const res = await fetch("/api/scan-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = `${res.status} ${JSON.stringify(data)}`;
        if (data.error === "not_a_menu") {
          setScanError(tMenu("scanErrorNotMenu"));
        } else if (data.error === "too_large") {
          setScanError(tMenu("scanErrorTooLarge"));
        } else if (data.error === "too_many_images") {
          setScanError(tMenu("scanErrorTooMany"));
        } else {
          setScanError(tMenu("scanError"));
        }
        setScanLoading(false);
        track(DashboardEvent.SCAN_MENU_ERROR, { reason: data.error || "unknown", detail });
        return;
      }

      track(DashboardEvent.SCAN_MENU_SUCCESS);
      toast.success(tMenu("scanSuccess"));
      await fetch("/api/onboarding/complete", { method: "POST" }).catch(() => {});
      router.replace("/dashboard");
    } catch (err) {
      const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      setScanError(tMenu("scanError"));
      setScanLoading(false);
      track(DashboardEvent.SCAN_MENU_ERROR, { reason: "exception", detail });
    }
  }, [photoPool, tMenu, router]);

  // --- Templates step ---

  const handleTemplateContinue = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const eventMap: Record<TemplateId, DashboardEvent> = {
      restaurant: DashboardEvent.CLICKED_TEMPLATE_RESTAURANT,
      cafe: DashboardEvent.CLICKED_TEMPLATE_CAFE,
      bar: DashboardEvent.CLICKED_TEMPLATE_BAR,
    };
    track(eventMap[selectedTemplate]);

    const translations: Record<string, string> = {};
    for (const key of TRANSLATION_KEYS) {
      translations[key] = t(key as Parameters<typeof t>[0]);
    }

    try {
      const res = await fetch("/api/onboarding/template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: selectedTemplate, translations }),
      });

      if (!res.ok) throw new Error("Failed");

      track(DashboardEvent.TEMPLATE_APPLY_SUCCESS, { template: selectedTemplate });
      router.replace("/dashboard");
    } catch {
      track(DashboardEvent.TEMPLATE_APPLY_ERROR, { template: selectedTemplate });
      setIsLoading(false);
    }
  };

  // --- Back handler ---

  const handleBack = () => {
    track(DashboardEvent.CLICKED_ONBOARDING_BACK);
    setIsLoading(false);
    setScanError("");
    if (step === "method") {
      setStep("name");
    } else {
      setStep("method");
    }
  };

  // --- Render ---

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 md:p-10">
      <div className="w-full max-w-[280px] lg:max-w-[360px]">

        {/* Step 1: Name */}
        {step === "name" && (
          <div className="grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t("nameTitle")}</h1>
              <p className="text-base md:text-lg text-muted-foreground">{t("nameSubtitle")}</p>
            </div>

            <form className="mt-4" onSubmit={handleNameSubmit}>
              <div className="grid gap-4">
                {errorMessage && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-base">
                    {errorMessage}
                  </div>
                )}

                <Input
                  ref={nameInputRef}
                  id="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onFocus={() => track(DashboardEvent.FOCUSED_ONBOARDING_NAME)}
                  disabled={isLoading}
                  className="text-center lg:h-auto lg:py-2.5 lg:text-lg"
                />

                <Button
                  type="submit"
                  disabled={isLoading || !nameInput.trim()}
                  className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {tAuth("continue")}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Method */}
        {step === "method" && (
          <>
            <div className="grid gap-2 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight break-words bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                {restaurantName}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">{t("menuSubtitle")}</p>
            </div>

            <div className="grid gap-3 mt-8">
              {MENU_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedMethod === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => setSelectedMethod(opt.id)}
                    className={cn(
                      "flex items-center gap-3 w-full rounded-2xl border-2 p-4 text-left transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
                      isSelected
                        ? "border-primary/60 bg-gradient-to-br from-primary/5 to-amber-400/5"
                        : "border-border bg-card hover:border-muted-foreground/30"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-base font-semibold">{t(opt.titleKey as Parameters<typeof t>[0])}</p>
                      <p className="text-base text-muted-foreground mt-0.5">{t(opt.descKey as Parameters<typeof t>[0])}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg w-full mt-6"
              disabled={isLoading}
              onClick={handleMethodContinue}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {tAuth("continue")}
            </Button>

            <button
              type="button"
              className="mx-auto mt-4 flex items-center gap-1.5 text-base text-muted-foreground/50 border border-border/50 rounded-[15px] px-3 py-1.5 hover:text-muted-foreground hover:border-border transition-colors cursor-pointer"
              onClick={handleBack}
            >
              <ArrowLeft className="h-3 w-3" />
              {t("back")}
            </button>
          </>
        )}

        {/* Step 3a: Scan */}
        {step === "scan" && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif,image/heic,image/heif,.pdf,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => addFilesToPool(e.target.files)}
            />

            {!scanLoading && (
              <>
                <div className="grid gap-2 text-center">
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight break-words">{restaurantName}</h1>
                  <p className="text-base md:text-lg text-muted-foreground">{tMenu("scanPoolSubtitle")}</p>
                </div>

                <div className="flex flex-col gap-2 mt-8">
                  {photoPool.map((photo) => (
                    <div key={photo.id} className="flex items-center gap-2 h-10 rounded-[15px] border border-border bg-muted/30 px-4 overflow-hidden min-w-0">
                      {photo.preview === "pdf" || photo.preview === "heic" ? (
                        <div className="w-8 h-8 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                          {photo.preview === "pdf" ? (
                            <FileText className="h-4 w-4 text-muted-foreground/60" />
                          ) : (
                            <Loader2 className="h-4 w-4 text-muted-foreground/60 animate-spin" />
                          )}
                        </div>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photo.preview} alt="" className="w-8 h-8 shrink-0 rounded-lg object-cover" />
                      )}
                      <span className="text-base truncate min-w-0 flex-1 text-center">{photo.file.name}</span>
                      <button
                        onClick={() => removeFromPool(photo.id)}
                        className="h-6 w-6 shrink-0 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                      >
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}

                  {photoPool.length < MAX_FILES && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 h-10 rounded-[15px] border border-dashed border-border bg-muted/30 cursor-pointer"
                    >
                      <Plus className="h-4 w-4 text-muted-foreground/50" />
                      <span className="text-base text-muted-foreground/50">{tMenu("scanAddMore")}</span>
                    </button>
                  )}
                </div>

                {scanError && (
                  <p className="text-base text-destructive font-medium text-center mt-4">{scanError}</p>
                )}

                {photoPool.length > 0 && (
                  <Button className="w-full mt-4 h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg" onClick={handleStartScan}>
                    <Camera className="h-4 w-4" />
                    {tMenu("scanStart")}
                  </Button>
                )}

                <button
                  type="button"
                  className="mx-auto mt-4 flex items-center gap-1.5 text-base text-muted-foreground/50 border border-border/50 rounded-[15px] px-3 py-1.5 hover:text-muted-foreground hover:border-border transition-colors cursor-pointer"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-3 w-3" />
                  {t("back")}
                </button>
              </>
            )}

            {scanLoading && (
              <div className="flex flex-col items-center justify-center text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-base text-muted-foreground">{tMenu("scanLoading")}</p>
              </div>
            )}
          </>
        )}

        {/* Step 3b: Templates */}
        {step === "templates" && (
          <>
            <div className="grid gap-2 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight break-words bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                {restaurantName}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">{t("templatesSubtitle")}</p>
            </div>

            <div className="grid gap-3 mt-8">
              {TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    disabled={isLoading}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={cn(
                      "flex items-center gap-3 w-full rounded-2xl border-2 p-4 text-left transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
                      isSelected
                        ? "border-primary/60 bg-gradient-to-br from-primary/5 to-amber-400/5"
                        : "border-border bg-card hover:border-muted-foreground/30"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-base font-semibold">{t(tpl.titleKey as Parameters<typeof t>[0])}</p>
                      <p className="text-base text-muted-foreground mt-0.5">{t(tpl.descKey as Parameters<typeof t>[0])}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg w-full mt-6"
              disabled={isLoading}
              onClick={handleTemplateContinue}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {tAuth("continue")}
            </Button>

            <button
              type="button"
              className="mx-auto mt-3 flex items-center gap-1.5 text-base text-muted-foreground/50 border border-border/50 rounded-[15px] px-3 py-1.5 hover:text-muted-foreground hover:border-border transition-colors cursor-pointer"
              onClick={handleBack}
            >
              <ArrowLeft className="h-3 w-3" />
              {t("back")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
