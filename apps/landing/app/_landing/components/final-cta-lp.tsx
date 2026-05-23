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
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 text-center lg:text-start w-full">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-2">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {texts.sub}
        </p>
      </div>
      <div className="shrink-0 flex justify-center lg:justify-end">
        <CtaButton
          text={ctaText}
          microcopy={microcopy}
          locale={locale}
          align="center"
          trackEvent="l_final_cta_click"
          extra={<DemoButton text={demoText} locale={locale} trackEvent="l_final_cta_demo" createText={ctaText} />}
        />
      </div>
    </div>
  );
}
