"use client";

import { Sparkles } from "lucide-react";
import { createUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
import type { LandingTexts } from "../types";

interface ScanSectionProps {
  texts: LandingTexts["scan"];
  locale: string;
}

export function ScanSection({ texts, locale }: ScanSectionProps) {
  const target = `${createUrl(locale)}&from=landing`;
  return (
    <section className="pt-3 pb-16 sm:pt-4 sm:pb-16 -mt-6 sm:mt-0">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/15 text-primary shrink-0">
            <Sparkles className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-start">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">
              {texts.heading}{" "}
              <span className="text-muted-foreground">{texts.headingAccent}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">{texts.sub}</p>
          </div>
          <a
            href={target}
            onClick={() => analytics.track("land_scan_cta_click")}
            className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 w-full sm:w-auto"
          >
            {texts.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
