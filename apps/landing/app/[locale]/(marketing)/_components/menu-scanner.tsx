"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type State = "idle" | "loading" | "preview" | "error";

const MAX_SIZE = 20 * 1024 * 1024; // 20MB per file
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

const STORAGE_KEY = "scanner_slug";

export function MenuScanner() {
  const t = useTranslations("menuScanner");
  const [state, setState] = useState<State>("idle");
  const [slug, setSlug] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef({ startTime: 0, done: false });
  const rafRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Animated progress bar
  useEffect(() => {
    if (state !== "loading") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    progressRef.current = { startTime: Date.now(), done: false };
    setProgress(0);

    // 0-90% in 2 minutes, last 10% stretches over another 2 minutes
    const phase1Duration = 120_000;
    const phase2Duration = 120_000;

    function tick() {
      if (progressRef.current.done) return;
      const elapsed = Date.now() - progressRef.current.startTime;

      let pct: number;
      if (elapsed < phase1Duration) {
        pct = (elapsed / phase1Duration) * 90;
      } else {
        const phase2Elapsed = elapsed - phase1Duration;
        pct = 90 + (phase2Elapsed / phase2Duration) * 10;
      }

      setProgress(Math.min(pct, 99.5));
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [state]);

  // On mount: check if this user already generated a menu
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      // Verify the menu still exists
      fetch(`/m/${saved}`, { method: "HEAD" }).then((res) => {
        if (res.ok) {
          setSlug(saved);
          setState("preview");
          analytics.marketing.scannerPreviewReturning();
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }).catch(() => {
        localStorage.removeItem(STORAGE_KEY);
      });
    }
  }, []);

  const handleError = useCallback((message: string, reason: string) => {
    setErrorMessage(message);
    setState("error");
    analytics.marketing.scannerError(reason);
    setTimeout(() => {
      setState("idle");
      setErrorMessage("");
    }, 5000);
  }, []);

  const processFiles = useCallback(
    async (files: File[]) => {
      // Validate file sizes
      for (const file of files) {
        if (file.size > MAX_SIZE) {
          handleError(t("errorTooLarge"), "too_large");
          return;
        }
      }

      if (files.length > MAX_FILES) {
        handleError(t("errorTooMany", { count: MAX_FILES }), "too_many");
        return;
      }

      const uploadStartTime = Date.now();
      setState("loading");
      analytics.marketing.scannerUpload(String(files.length));

      try {
        // Convert all files to base64 in parallel
        const images = await Promise.all(files.map(fileToJpegBase64));

        const res = await fetch("/api/public/scan-menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("Scan menu error:", res.status, data);
          if (data.error === "not_a_menu") {
            handleError(t("errorNotMenu"), "not_a_menu");
            return;
          }
          if (data.error === "rate_limit") {
            handleError(t("errorRateLimit"), "rate_limit");
            return;
          }
          handleError(t("errorGeneric"), "api_error");
          return;
        }

        const data = await res.json();
        // Stop progress animation, jump to 100%
        progressRef.current.done = true;
        setProgress(100);
        // Brief pause at 100% before showing preview
        await new Promise((r) => setTimeout(r, 400));
        setSlug(data.slug);
        localStorage.setItem(STORAGE_KEY, data.slug);
        setIframeLoading(true);
        setState("preview");
        const duration = ((Date.now() - uploadStartTime) / 1000).toFixed(1);
        analytics.marketing.scannerSuccess(duration);
      } catch (err) {
        console.error("Scan menu network error:", err);
        handleError(t("errorGeneric"), "network_error");
      }
    },
    [handleError, t]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) processFiles(files);
      e.target.value = "";
    },
    [processFiles]
  );

  // Auto-scroll to preview when it appears
  useEffect(() => {
    if (state === "preview" && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state]);

  // Preview state — show iPhone frame + CTA, all fitting in viewport
  if (state === "preview" && slug) {
    // iPhone height = viewport minus space for heading+subtitle+button+padding (~200px)
    // Width derived from height via 1:2 aspect ratio, capped at 320px
    return (
      <section
        ref={previewRef}
        className="h-[calc(100svh-64px)] flex flex-col items-center px-4 pt-8 pb-4 lg:justify-center lg:pt-4 scroll-mt-[81px]"
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-1 shrink-0">
          {t("readyTitle")}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6 max-w-md shrink-0">
          {t("readySubtitle")}
        </p>

        {/* iPhone frame — height-driven, fits between text and button */}
        <div
          className="relative shrink mb-6"
          style={{
            height: "min(calc(100svh - 264px), 700px)",
            aspectRatio: "1 / 2",
            maxWidth: "min(80vw, 320px)",
          }}
        >
          {/* iPhone frame */}
          <div className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] p-2 shadow-2xl">
            {/* Inner bezel */}
            <div className="relative w-full h-full bg-[#1a1a1a] rounded-[32px] overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-10" />

              {/* Loading spinner */}
              {iframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-[5]">
                  <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                </div>
              )}

              {/* Screen */}
              <iframe
                src={`/m/${slug}?preview=1`}
                className="absolute border-0 origin-top-left"
                style={{
                  width: "154%",
                  height: "154%",
                  transform: "scale(0.65)",
                }}
                title="Menu Preview"
                onLoad={() => setTimeout(() => setIframeLoading(false), 500)}
              />
            </div>
          </div>

          {/* Overlay to hide white edge artifacts */}
          <div
            className="absolute inset-0 rounded-[40px] pointer-events-none z-20"
            style={{
              boxShadow: "inset 0 0 0 10px #1a1a1a",
            }}
          />

          {/* Side buttons - Volume */}
          <div className="absolute left-[-2px] top-[18%] w-[2px] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute left-[-2px] top-[25%] w-[2px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />
          <div className="absolute left-[-2px] top-[35%] w-[2px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />

          {/* Side button - Power */}
          <div className="absolute right-[-2px] top-[28%] w-[2px] h-[12%] bg-[#2a2a2a] rounded-r-sm" />
        </div>

        {/* CTA */}
        <Button
          asChild
          className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg shrink-0"
          onClick={() => analytics.marketing.scannerCtaClick()}
        >
          <Link href="/dashboard">
            {t("ctaButton")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center px-4 py-12 lg:py-20">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border bg-card p-6 sm:p-8 lg:p-10 text-center shadow-sm">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t("badge")}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              {state === "loading" ? t("loadingTitle") : t("title")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
              {state === "loading" ? t("loadingSubtitle") : t("subtitle")}
            </p>

            {state === "idle" && (
              <Button
                className="h-auto px-6 py-2 text-base lg:px-8 lg:py-2.5 lg:text-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5 mr-2" />
                {t("uploadButton")}
              </Button>
            )}

            {state === "loading" && (
              <div className="w-full max-w-xs mx-auto">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-[width] duration-300 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {Math.round(progress)}%
                </p>
              </div>
            )}

            {state === "error" && (
              <div className="inline-flex items-center gap-2 py-2">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                <p className="font-medium text-destructive">{errorMessage}</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
    </section>
  );
}
