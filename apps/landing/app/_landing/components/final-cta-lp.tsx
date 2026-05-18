import { CtaButton } from "./cta-button";
import { DemoButton } from "./demo-button";
import type { LandingTexts } from "../types";

interface FinalCtaProps {
  texts: LandingTexts["finalCta"];
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
}

export function FinalCtaLp({ texts, ctaText, demoText, microcopy, locale }: FinalCtaProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 lg:gap-14 w-full">
      <div className="text-center lg:text-start">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 leading-[1.15]">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-snug">
          {texts.sub}
        </p>
      </div>
      <div className="w-full">
        <CtaButton
          text={ctaText}
          microcopy={microcopy}
          locale={locale}
          align="end"
          trackEvent="land_final_cta_click"
          stackMobile
          extra={<DemoButton text={demoText} locale={locale} trackEvent="land_final_cta_demo_open" />}
        />
      </div>
    </div>
  );
}
