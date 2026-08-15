import { DemoButton, type DemoVariant } from "./demo-button";
import { FinalCtaPrimaryButton } from "./final-cta-primary-button";
import { DEMO_BTN } from "./shell";
import type { LandingTexts } from "../types";

interface FinalCtaProps {
  texts: LandingTexts["finalCta"];
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
  demoVariant?: DemoVariant;
  /** Restaurant-count label ("500+"), substituted for "{count}" in `texts.sub`. */
  count?: string;
}

export function FinalCta({ texts, ctaText, demoText, microcopy, locale, demoVariant = "phone", count }: FinalCtaProps) {
  const sub = count !== undefined ? texts.sub.replace("{count}", count) : texts.sub;

  // One plain bordered block (no split, no fill) — heading, sub, CTA row all
  // stacked in one column. Same PRIMARY_BTN/DEMO_BTN sizes as the hero's own
  // CTA pair (h-11) — not the bigger shared CtaButton.
  return (
    <div className="rounded-2xl border border-border p-6 sm:p-8 flex flex-col items-start text-start gap-3">
      <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
        {texts.heading} {texts.headingAccent}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
        {sub}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <FinalCtaPrimaryButton text={ctaText} />
        <DemoButton
          text={demoText}
          locale={locale}
          trackName="Final CTA demo"
          createText={ctaText}
          variant={demoVariant}
          className={DEMO_BTN}
        />
      </div>
    </div>
  );
}
