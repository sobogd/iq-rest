"use client";

import { usePrimaryCta } from "./onboarding/use-primary-cta";
import type { LandingTexts } from "../types";

interface ScanSectionProps {
  texts: LandingTexts["scan"];
  locale: string;
}

export function ScanSection({ texts }: ScanSectionProps) {
  const cta = usePrimaryCta(texts.cta);
  return (
    <>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
        {texts.heading}{" "}
        <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
          {texts.headingAccent}
        </span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">
        {texts.sub}
      </p>
      <div className="flex justify-center lg:justify-start">
        <button
          type="button"
          onClick={() => cta.onClick("land_scan_cta_click")}
          className="inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all text-center leading-tight"
        >
          {cta.label}
        </button>
      </div>
    </>
  );
}
