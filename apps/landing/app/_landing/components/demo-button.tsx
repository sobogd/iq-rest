"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { usePrimaryCta } from "./onboarding/use-primary-cta";

interface DemoButtonProps {
  text: string;
  locale: string;
  /** Base name like `l_hero_demo` — `_open` and `_close` are appended automatically. */
  trackEvent?: string;
  className?: string;
  /** When set, renders a primary "create menu" CTA under the phone preview
   *  inside the demo modal — turns the demo from a dead-end into a conversion
   *  point. Opens the onboarding modal (guest) / dashboard (signed-in). */
  createText?: string;
}

const DEMO_SLUG = "love-eatery";

// Always forward the landing's locale. The public-menu SPA matches it
// against the demo restaurant's enabled languages and falls back to the
// restaurant's default language if it's not configured.
function demoUrl(locale: string): string {
  const params = new URLSearchParams({ preview: "1" });
  if (locale) params.set("lang", locale);
  return `https://${DEMO_SLUG}.iq-rest.com?${params.toString()}`;
}

export function DemoButton({
  text,
  locale,
  trackEvent = "l_demo",
  className = "",
  createText,
}: DemoButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const cta = usePrimaryCta(createText ?? "");

  const handleCreate = () => {
    setOpen(false);
    cta.onClick(`${trackEvent}_create_click`);
  };

  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    analytics.track(`${trackEvent}_open`);
  };

  const handleClose = () => {
    setOpen(false);
    analytics.track(`${trackEvent}_close`);
  };

  const menuUrl = demoUrl(locale);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className={`inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-muted active:scale-[0.99] transition-all text-center leading-tight ${className}`}
      >
        {text}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          data-noindex="true"
          onClick={handleClose}
        >
          <div
            className="relative flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative"
              style={{
                width: "clamp(0px, min(calc((85dvh - 80px) * 8 / 16), 80dvw), 320px)",
                height: "min(calc(85dvh - 80px), calc(min(80dvw, 320px) * 16 / 8))",
              }}
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-30"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] p-2 shadow-2xl">
                <div className="relative w-full h-full bg-[#1a1a1a] rounded-[32px] overflow-hidden">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-10" />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-[5]">
                      <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                    </div>
                  )}
                  <iframe
                    src={menuUrl}
                    className="absolute border-0 origin-top-left"
                    style={{ width: "125%", height: "125%", transform: "scale(0.8)" }}
                    title="Menu Preview"
                    onLoad={() => setLoading(false)}
                  />
                </div>
              </div>

              <div
                className="absolute inset-0 rounded-[40px] pointer-events-none z-20"
                style={{ boxShadow: "inset 0 0 0 10px #1a1a1a" }}
              />

              <div className="absolute left-[-2px] top-[18%] w-[2px] h-[5%] bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute left-[-2px] top-[25%] w-[2px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute left-[-2px] top-[35%] w-[2px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />
              <div className="absolute right-[-2px] top-[28%] w-[2px] h-[12%] bg-[#2a2a2a] rounded-r-sm" />
            </div>

            {createText && (
              <button
                type="button"
                onClick={handleCreate}
                className="inline-flex items-center justify-center min-h-11 py-2 px-8 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight"
              >
                {cta.label}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
