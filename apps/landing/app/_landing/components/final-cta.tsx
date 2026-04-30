import { CtaButton } from "./cta-button";
import type { LandingTexts } from "../types";

interface FinalCtaProps {
  texts: LandingTexts["finalCta"];
  ctaText: string;
  microcopy: string;
  locale: string;
}

export function FinalCta({ texts, ctaText, microcopy, locale }: FinalCtaProps) {
  return (
    <section className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 leading-[1.15]">
              {texts.heading}{" "}
              <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                {texts.headingAccent}
              </span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto lg:mx-0 leading-snug">
              {texts.sub}
            </p>
          </div>
          <CtaButton text={ctaText} microcopy={microcopy} locale={locale} align="end" />
        </div>
      </div>
    </section>
  );
}
