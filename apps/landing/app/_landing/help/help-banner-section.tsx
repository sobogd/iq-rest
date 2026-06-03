"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { Section } from "../components/section";
import type { HelpBanner } from "./registry";

// Pre-footer "how to use" banner → links to the help guide. Shared by the
// home, pricing and feature templates. `source` distinguishes where the click
// came from in analytics (l_help_banner_click_<source>). Section view is
// auto-tracked via data-section by PageTracker.
export function HelpBannerSection({ banner, source, accent = true }: { banner: HelpBanner; source: string; accent?: boolean }) {
  return (
    <Section id="help-banner" dataSection="help_banner" noContainer accent={accent} className="!py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight leading-[1.05] mb-3">{banner.title}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 mb-7 leading-snug">{banner.sub}</p>
        <Link
          href={banner.href}
          onClick={() => analytics.track(`l_help_banner_click_${source}`)}
          className="group inline-flex items-center justify-center gap-1.5 h-11 px-6 text-base font-semibold text-foreground bg-transparent border border-border rounded-lg hover:bg-muted hover:border-foreground/40 active:scale-[0.99] transition-all whitespace-nowrap"
        >
          {banner.cta}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </Section>
  );
}
