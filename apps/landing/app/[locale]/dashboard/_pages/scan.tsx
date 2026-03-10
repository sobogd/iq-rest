"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Camera, Plus, Loader2, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { track, DashboardEvent } from "@/lib/dashboard-events";
import { PageHeader } from "../_ui/page-header";
import { DashboardNavSidebar } from "../_components/dashboard-nav";

// --- Constants ---

const MAX_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 5;

interface PoolPhoto {
  id: string;
  file: File;
  preview: string;
}

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

export function ScanPage() {
  const router = useRouter();
  const tMenu = useTranslations("dashboard.menu");

  const [photoPool, setPhotoPool] = useState<PoolPhoto[]>([]);
  const [scanError, setScanError] = useState("");
  const [scanLoading, setScanLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    track(DashboardEvent.CLICKED_SCAN_MENU);
  }, []);

  useEffect(() => {
    return () => { photoPool.forEach((p) => { if (p.preview.startsWith("blob:")) URL.revokeObjectURL(p.preview); }); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    track(DashboardEvent.SCAN_MENU_UPLOAD, { count: String(newPhotos.length) });

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
      router.replace("/dashboard");
    } catch (err) {
      const detail = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      setScanError(tMenu("scanError"));
      setScanLoading(false);
      track(DashboardEvent.SCAN_MENU_ERROR, { reason: "exception", detail });
    }
  }, [photoPool, tMenu, router]);

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={tMenu("scanPoolTitle")} backHref="/dashboard" />

      <div className="relative flex-1 overflow-auto px-6 pt-4 pb-6">
        <div className="max-w-lg md:max-w-none md:w-[45rem] mx-auto md:flex md:gap-4">
          <DashboardNavSidebar />
          <div className="flex-1 min-w-0 flex flex-col gap-4">
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
              <p className="text-sm text-muted-foreground text-center">{tMenu("scanPoolSubtitle")}</p>

              <div className="flex flex-col gap-3">
                {photoPool.map((photo) => (
                  <div key={photo.id} className="flex items-center gap-3 w-full rounded-xl border border-border bg-muted/30 p-3">
                    {photo.preview === "pdf" || photo.preview === "heic" ? (
                      photo.preview === "pdf" ? (
                        <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                      ) : (
                        <Loader2 className="h-5 w-5 shrink-0 text-muted-foreground animate-spin" />
                      )
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo.preview} alt="" className="w-8 h-8 shrink-0 rounded-lg object-cover" />
                    )}
                    <p className="text-sm font-medium truncate min-w-0 flex-1">{photo.file.name}</p>
                    <button
                      onClick={() => removeFromPool(photo.id)}
                      className="h-8 w-8 shrink-0 rounded-xl hover:bg-muted/50 flex items-center justify-center transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}

                {photoPool.length < MAX_FILES && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-1.5 w-full rounded-xl border-2 border-dashed border-border p-4 cursor-pointer hover:border-muted-foreground/30 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-muted-foreground/50">{tMenu("scanAddMore")}</p>
                    </div>
                  </button>
                )}
              </div>

              {scanError && (
                <p className="text-sm text-destructive font-medium text-center">{scanError}</p>
              )}

              <Button
                className="w-full h-11 rounded-xl"
                disabled={photoPool.length === 0}
                onClick={handleStartScan}
              >
                <Camera className="h-4 w-4" />
                {tMenu("scanStart")}
              </Button>
            </>
          )}

          {scanLoading && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="text-center">
                <p className="text-sm font-medium">{tMenu("scanLoading")}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{tMenu("scanLoadingSubtitle")}</p>
              </div>
            </div>
          )}
          </div>{/* end content column */}
        </div>{/* end flex container */}
      </div>
    </div>
  );
}
