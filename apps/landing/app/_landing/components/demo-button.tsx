"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";

// Logical viewport width the demo is rendered at inside the iframe. The
// iframe keeps this fixed width and is scaled down to fit the device frame,
// so the embedded app always sees a stable viewport regardless of the
// frame's on-screen size (no reflow as the modal resizes).
//   - phone  → public menu (love-eatery), narrow mobile viewport.
//   - tablet → kitchen-display kiosk demo, wide landscape viewport.
const IFRAME_WIDTH_PHONE = 350;
const IFRAME_WIDTH_TABLET = 1024;
// On a phone the tablet frame is only ~340px wide, so a 1024px logical
// viewport scales down to ~0.33 and the kiosk text is tiny. Render the KDS
// at a narrower logical width on phones instead — the iframe scales up
// (~0.5), the kiosk reflows to fewer columns, and everything reads ~50%
// larger. Changing the iframe's own scale, not the app's font-size.
const IFRAME_WIDTH_TABLET_PHONE = 680;

export type DemoVariant = "phone" | "tablet";

interface DemoButtonProps {
  text: string;
  locale: string;
  /** Base name like `l_hero_demo` — `_open` and `_close` are appended automatically. */
  trackEvent?: string;
  className?: string;
  /** When set, renders a primary "create menu" CTA under the device preview
   *  inside the demo modal — turns the demo from a dead-end into a conversion
   *  point. Opens the onboarding modal (guest) / dashboard (signed-in). */
  createText?: string;
  /** `phone` (default) embeds the public menu of the demo restaurant.
   *  `tablet` embeds the live kitchen-display kiosk in demo mode — used on
   *  the kitchen-display feature page so the preview matches the feature. */
  variant?: DemoVariant;
}

const DEMO_SLUG = "love-eatery";

// Always forward the landing's locale. The public-menu SPA matches it
// against the demo restaurant's enabled languages and falls back to the
// restaurant's default language if it's not configured.
function menuUrlFor(locale: string): string {
  const params = new URLSearchParams({ preview: "1" });
  if (locale) params.set("lang", locale);
  return `https://${DEMO_SLUG}.iq-rest.com?${params.toString()}`;
}

// Kitchen-display kiosk in public demo mode. `demo=1` makes the dashboard
// bundle render the real KDS with hardcoded sample data — no pairing, no API.
// On phones we pass a larger `zoom` (root font-size %) so the kiosk is
// legible inside the small embedded tablet frame — the iframe itself renders
// at a fixed 1024px logical width and can't sense the real device, so the
// parent decides.
function kdsUrlFor(locale: string): string {
  const params = new URLSearchParams({ demo: "1" });
  if (locale) params.set("lang", locale);
  return `https://k.iq-rest.com/?${params.toString()}`;
}

export function DemoButton({
  text,
  locale,
  trackEvent = "l_demo",
  className = "",
  variant = "phone",
}: DemoButtonProps) {
  const isTablet = variant === "tablet";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // Phone viewport → render the tablet KDS demo at a narrower logical width
  // so the iframe scales up and the kiosk reads larger. Resolved client-side
  // on mount. Phone menu preview keeps its fixed width.
  const [isPhone, setIsPhone] = useState(false);
  const IFRAME_WIDTH = isTablet
    ? isPhone
      ? IFRAME_WIDTH_TABLET_PHONE
      : IFRAME_WIDTH_TABLET
    : IFRAME_WIDTH_PHONE;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Fit the fixed-width iframe to the phone screen: scale = screenW / IFRAME_WIDTH,
  // and give the iframe a matching logical height so it fills the frame exactly.
  const screenRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, height: 844 });

  useEffect(() => {
    if (!open) return;
    const el = screenRef.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width === 0) return;
      const scale = width / IFRAME_WIDTH;
      setFit({ scale, height: height / scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, IFRAME_WIDTH]);

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

  const iframeSrc = isTablet ? kdsUrlFor(locale) : menuUrlFor(locale);
  const iframeTitle = isTablet ? "Kitchen Display Preview" : "Menu Preview";

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
            {isTablet ? (
              // Landscape tablet frame (≈4:3) for the kitchen-display kiosk.
              <div
                className="relative"
                style={{
                  width: "min(92dvw, calc((85dvh - 80px) * 4 / 3), 1000px)",
                  height: "min(calc(85dvh - 80px), calc(min(92dvw, 1000px) * 3 / 4))",
                }}
              >
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close"
                  className="absolute -top-[22px] -right-[22px] text-white hover:text-gray-300 transition-colors z-30"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="absolute inset-0 bg-[#1a1a1a] rounded-[26px] p-2.5 shadow-2xl">
                  <div ref={screenRef} className="relative w-full h-full bg-[#1a1a1a] rounded-[16px] overflow-hidden">
                    {/* Front camera dot, centered on the long (top) edge. */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-black rounded-full z-10" />
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-[5]">
                        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                      </div>
                    )}
                    <iframe
                      src={iframeSrc}
                      className="absolute top-0 left-0 border-0 origin-top-left"
                      style={{
                        width: `${IFRAME_WIDTH}px`,
                        height: `${fit.height}px`,
                        transform: `scale(${fit.scale})`,
                      }}
                      title={iframeTitle}
                      onLoad={() => setLoading(false)}
                    />
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-[26px] pointer-events-none z-20"
                  style={{ boxShadow: "inset 0 0 0 8px #1a1a1a" }}
                />
              </div>
            ) : (
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
                  className="absolute -top-[22px] -right-[22px] text-white hover:text-gray-300 transition-colors z-30"
                >
                  <X className="w-8 h-8" />
                </button>

                <div className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] p-2 shadow-2xl">
                  <div ref={screenRef} className="relative w-full h-full bg-[#1a1a1a] rounded-[32px] overflow-hidden">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-10" />
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black z-[5]">
                        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                      </div>
                    )}
                    <iframe
                      src={iframeSrc}
                      className="absolute top-0 left-0 border-0 origin-top-left"
                      style={{
                        width: `${IFRAME_WIDTH}px`,
                        height: `${fit.height}px`,
                        transform: `scale(${fit.scale})`,
                      }}
                      title={iframeTitle}
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
            )}

          </div>
        </div>
      )}
    </>
  );
}
