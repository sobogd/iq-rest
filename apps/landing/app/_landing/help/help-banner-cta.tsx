"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";
import type { HelpBanner } from "./registry";

// The help-guide banner without any section chrome — for templates that lay
// their own sections out. `HelpBannerSection` wraps this in a full-bleed
// Section for the older templates.
export function HelpBannerCta({ banner, source }: { banner: HelpBanner; source: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-3">
        {banner.title}
      </h2>
      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 mb-7 leading-snug">{banner.sub}</p>
      <Link
        href={banner.href}
        onClick={() => analytics.track("Click", `Help banner (${source})`)}
        className="group inline-flex items-center justify-center gap-1.5 h-11 px-6 text-base font-semibold text-foreground bg-transparent border border-border rounded-lg hover:bg-muted hover:border-foreground/40 active:scale-[0.99] transition-all whitespace-nowrap"
      >
        {banner.cta}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
