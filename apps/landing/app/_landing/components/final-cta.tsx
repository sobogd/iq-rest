import { CtaButton } from "./cta-button";
import { DemoButton, type DemoVariant } from "./demo-button";
import type { LandingTexts } from "../types";

interface FinalCtaProps {
  texts: LandingTexts["finalCta"];
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
  demoVariant?: DemoVariant;
}

export function FinalCta({ texts, ctaText, demoText, microcopy, locale, demoVariant = "phone" }: FinalCtaProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 text-center lg:text-start w-full">
      <div className="flex-1 min-w-0">
        <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] font-medium tracking-tight leading-[1.05] mb-3">
          {texts.heading}{" "}
          <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
            {texts.headingAccent}
          </span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
          {texts.sub}
        </p>
      </div>
      <div className="shrink-0 flex justify-center lg:justify-end">
        <CtaButton
          text={ctaText}
          microcopy={microcopy}
          locale={locale}
          align="center"
          stackMobile
          trackEvent="l_final_cta_click"
          extra={<DemoButton text={demoText} locale={locale} trackEvent="l_final_cta_demo" createText={ctaText} variant={demoVariant} className="!h-11 !min-h-0 !py-0 !px-6 !text-base !font-semibold" />}
        />
      </div>
    </div>
  );
}
