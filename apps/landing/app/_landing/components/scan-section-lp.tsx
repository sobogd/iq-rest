"use client";

import { usePrimaryCta } from "./onboarding/use-primary-cta";
import type { LandingTexts } from "../types";

interface ScanSectionProps {
  texts: LandingTexts["scan"];
  locale: string;
}

export function ScanSectionLp({ texts }: ScanSectionProps) {
  const cta = usePrimaryCta(texts.cta);
  return (
    <section
      id="scan"
      data-section="scan"
      className="scroll-mt-16 w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-16 sm:py-12 bg-gradient-to-br from-primary/10 via-primary/[0.03] to-primary/[0.03] border-y border-border/40"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 text-center lg:text-start">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-2">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            {texts.sub}
          </p>
        </div>
        <div className="shrink-0 flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={() => cta.onClick("l_scan_cta_click")}
            className="inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight whitespace-nowrap"
          >
            {cta.label}
          </button>
        </div>
      </div>
    </section>
  );
}
