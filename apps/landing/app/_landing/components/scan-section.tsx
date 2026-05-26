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
    <section
      id="scan"
      data-section="scan"
      className="scroll-mt-16 w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16"
    >
      <div className="flex flex-col items-center text-center gap-6 max-w-4xl lg:max-w-5xl mx-auto">
        <div className="min-w-0">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight leading-[1.05] mb-3">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
            {texts.sub}
          </p>
        </div>
        <div className="shrink-0 flex justify-center">
          <button
            type="button"
            onClick={() => cta.onClick("l_scan_cta_click")}
            className="inline-flex items-center justify-center h-11 px-6 text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight whitespace-nowrap"
          >
            {cta.label}
          </button>
        </div>
      </div>
    </section>
  );
}
