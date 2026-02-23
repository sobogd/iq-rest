"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Camera, Plus, Loader2, AlertCircle, X, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { track, DashboardEvent, setDashboardUserId } from "@/lib/dashboard-events";
import { analytics } from "@/lib/analytics";

const MAX_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 5;

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

type PageState = "idle" | "loading" | "error";

interface PoolPhoto {
  id: string;
  file: File;
  preview: string;
}

export function OnboardingScanPage({ restaurantName, userId }: { restaurantName: string; userId: string }) {
  const locale = useLocale();
  const t = useTranslations("dashboard.onboarding");
  const tMenu = useTranslations("dashboard.menu");

  const [pageState, setPageState] = useState<PageState>("idle");
  const [scanError, setScanError] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [photoPool, setPhotoPool] = useState<PoolPhoto[]>([]);
  const progressRef = useRef({ startTime: 0, done: false });
  const rafRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDashboardUserId(userId);
    analytics.linkSession(userId);
    track(DashboardEvent.SHOWED_ONBOARDING_SCAN);
  }, [userId]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => { photoPool.forEach((p) => { if (p.preview.startsWith("blob:")) URL.revokeObjectURL(p.preview); }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animated progress bar
  useEffect(() => {
    if (pageState !== "loading") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    progressRef.current = { startTime: Date.now(), done: false };
    setScanProgress(0);
    const phase1 = 120_000;
    const phase2 = 120_000;
    function tick() {
      if (progressRef.current.done) return;
      const elapsed = Date.now() - progressRef.current.startTime;
      let pct: number;
      if (elapsed < phase1) {
        pct = (elapsed / phase1) * 90;
      } else {
        pct = 90 + ((elapsed - phase1) / phase2) * 10;
      }
      setScanProgress(Math.min(pct, 99.5));
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [pageState]);

  // Auto-reset error after 5s
  useEffect(() => {
    if (pageState === "error") {
      errorTimerRef.current = setTimeout(() => setPageState("idle"), 5000);
      return () => { if (errorTimerRef.current) clearTimeout(errorTimerRef.current); };
    }
  }, [pageState]);

  function addFilesToPool(files: FileList | null) {
    if (!files || files.length === 0) return;

    const remaining = MAX_FILES - photoPool.length;
    if (remaining <= 0) {
      setScanError(tMenu("scanErrorTooMany"));
      setPageState("error");
      return;
    }

    const accepted = Array.from(files).slice(0, remaining);

    for (const file of accepted) {
      if (file.size > MAX_SIZE) {
        setScanError(tMenu("scanErrorTooLarge"));
        setPageState("error");
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

    // Convert HEIC previews async
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
            // fallback — keep "heic" placeholder
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
    setPageState("loading");

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

      progressRef.current.done = true;

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
        setPageState("error");
        track(DashboardEvent.SCAN_MENU_ERROR, { reason: data.error || "unknown", detail });
        return;
      }

      track(DashboardEvent.SCAN_MENU_SUCCESS);
      toast.success(tMenu("scanSuccess"));
      window.location.href = `/${locale}/dashboard`;
    } catch (err) {
      const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      progressRef.current.done = true;
      setScanError(tMenu("scanError"));
      setPageState("error");
      track(DashboardEvent.SCAN_MENU_ERROR, { reason: "exception", detail });
    }
  }, [photoPool, tMenu, locale]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 md:p-10">
      <div className="w-full max-w-[320px] min-w-0">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif,image/heic,image/heif,.pdf,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFilesToPool(e.target.files)}
        />

        {pageState === "idle" && (
          <div className="grid gap-3 overflow-hidden">
            <div className="mb-3">
              <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
              <p className="text-lg text-muted-foreground mt-1">{t("aiImportDescription")}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col gap-4 overflow-hidden min-w-0">
              <div>
                <h2 className="text-base font-semibold">{tMenu("scanPoolTitle")}</h2>
                <p className="text-sm text-muted-foreground mt-1">{tMenu("scanPoolSubtitle")}</p>
              </div>

              <div className="flex flex-col gap-2 w-full overflow-hidden">
                {photoPool.map((photo) => (
                  <div key={photo.id} className="flex items-center gap-2 rounded-xl border border-border bg-background px-2.5 py-2 overflow-hidden min-w-0">
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
                    <span className="text-sm truncate min-w-0 flex-1 text-left">{photo.file.name}</span>
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
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-3 hover:border-primary/50 hover:bg-background/50 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-muted-foreground/60" />
                    <span className="text-sm text-muted-foreground">{tMenu("scanAddMore")}</span>
                  </button>
                )}
              </div>

              {photoPool.length > 0 && (
                <Button
                  className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white"
                  onClick={handleStartScan}
                >
                  <Camera className="h-4 w-4" />
                  {tMenu("scanStart")}
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="mt-1 w-fit"
              onClick={() => { track(DashboardEvent.CLICKED_ONBOARDING_BACK); window.location.href = `/${locale}/onboarding/menu`; }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        )}

        {pageState === "loading" && (
          <div className="grid gap-6">
            <div>
              <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
              <p className="text-lg text-muted-foreground mt-1">{t("aiImportDescription")}</p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-base font-semibold mb-1">{tMenu("scanLoading")}</h2>
                <p className="text-sm text-muted-foreground mb-4">{tMenu("scanLoadingSubtitle")}</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {pageState === "error" && (
          <div className="grid gap-6">
            <div>
              <h1 className="text-[28px] leading-tight font-bold">{restaurantName}</h1>
              <p className="text-lg text-muted-foreground mt-1">{t("aiImportDescription")}</p>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-5 py-6">
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="h-10 w-10 text-destructive mb-3" />
                <p className="text-sm text-destructive font-medium">{scanError || t("error")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
