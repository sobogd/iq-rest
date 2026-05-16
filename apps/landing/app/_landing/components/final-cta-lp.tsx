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
    <div className="flex flex-col gap-10 items-center max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 leading-[1.15]">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-md lg:max-w-2xl mx-auto leading-snug">
          {texts.sub}
        </p>
      </div>
      <CtaButton
        text={ctaText}
        microcopy={microcopy}
        locale={locale}
        align="center"
        trackEvent="land_final_cta_click"
        stackMobile
        extra={<DemoButton text={demoText} locale={locale} trackEvent="land_final_cta_demo_open" />}
      />
    </div>
  );
}
