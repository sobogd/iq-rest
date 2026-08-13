import { CtaButton } from "./cta-button";
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
  /** Live restaurant count, substituted for "{count}" in `texts.sub`. */
  count?: number;
  /** Stack and center everything instead of the default heading-left / CTA-right row. */
  centered?: boolean;
}

export function FinalCta({ texts, ctaText, demoText, microcopy, locale, demoVariant = "phone", count, centered = false }: FinalCtaProps) {
  const sub = count !== undefined ? texts.sub.replace("{count}", count.toLocaleString(locale)) : texts.sub;
  if (centered) {
    return (
      <div className="flex flex-col items-center text-center gap-6 w-full max-w-3xl mx-auto">
        <div className="flex-1 min-w-0">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight leading-[1.05] mb-3">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
            {sub}
          </p>
        </div>
        <div className="shrink-0 flex justify-center">
          <CtaButton
            text={ctaText}
            microcopy={microcopy}
            locale={locale}
            align="center"
            stackMobile
            trackName="Final CTA"
            extra={<DemoButton text={demoText} locale={locale} trackName="Final CTA demo" createText={ctaText} variant={demoVariant} className="!h-11 !min-h-0 !py-0 !px-6 !text-base !font-semibold" />}
          />
        </div>
      </div>
    );
  }

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
