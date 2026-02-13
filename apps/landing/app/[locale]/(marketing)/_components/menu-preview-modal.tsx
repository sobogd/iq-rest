"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface MenuPreviewModalProps {
  buttonText: string;
  menuUrl: string;
}

function addPreviewParam(url: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}preview=1`;
}

export function MenuPreviewModal({ buttonText, menuUrl }: MenuPreviewModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleClose = () => {
    setOpen(false);
    analytics.marketing.demoClose();
  };

  if (!open) {
    return (
      <Button
        variant="outline"
        className="h-auto px-6 py-2.5 text-base lg:px-8 lg:py-3 lg:text-lg"
        onClick={() => {
          setOpen(true);
          setLoading(true);
          analytics.marketing.demoOpen();
        }}
      >
        {buttonText}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        className="h-auto px-6 py-2.5 text-base lg:px-8 lg:py-3 lg:text-lg"
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </Button>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={handleClose}
        data-noindex="true"
      >
        {/* Phone frame */}
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-7 -right-7 text-white hover:text-gray-300 transition-colors z-30"
          >
            <X className="w-8 h-8" />
          </button>

          {/* iPhone frame container */}
          <div
            className="relative"
            style={{
              width: "clamp(0px, min(calc(85dvh * 8 / 16), 80dvw), 350px)",
              height: "min(85dvh, calc(min(80dvw, 350px) * 16 / 8))",
            }}
          >
            {/* iPhone frame */}
            <div className="absolute inset-0 bg-[#1a1a1a] rounded-[40px] p-2 shadow-2xl">
              {/* Inner bezel */}
              <div className="relative w-full h-full bg-[#1a1a1a] rounded-[32px] overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-10" />

                {/* Loading spinner */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-5">
                    <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                  </div>
                )}

                {/* Screen */}
                <iframe
                  src={addPreviewParam(menuUrl)}
                  className="absolute border-0 origin-top-left"
                  style={{
                    width: "125%",
                    height: "125%",
                    transform: "scale(0.8)",
                  }}
                  title="Menu Preview"
                  onLoad={() => setTimeout(() => setLoading(false), 500)}
                />
              </div>
            </div>

            {/* Overlay to hide white edge artifacts - positioned over entire phone frame */}
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
        </div>
      </div>
    </>
  );
}
