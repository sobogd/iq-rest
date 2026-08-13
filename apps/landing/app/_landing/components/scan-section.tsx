import { PrimaryCtaButton } from "./primary-cta-button";
import type { LandingTexts } from "../types";

interface ScanSectionProps {
  texts: LandingTexts["scan"];
  locale: string;
  /** Kept for old call sites; the banner no longer paints its own chrome. */
  accent?: boolean;
}

// Same card as the final-CTA band (rounded border, stacked heading / sub /
// CTA row), just without the demo button next to the primary. Server
// component — only the CTA button (<PrimaryCtaButton>) hydrates.
export function ScanSection({ texts }: ScanSectionProps) {
  return (
    <div
      id="scan"
      className="scroll-mt-16 rounded-2xl border border-border p-6 sm:p-8 flex flex-col items-start text-start gap-3"
    >
      <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
        {texts.heading} {texts.headingAccent}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">{texts.sub}</p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <PrimaryCtaButton text={texts.cta} trackName="Scan CTA" />
      </div>
    </div>
  );
}
