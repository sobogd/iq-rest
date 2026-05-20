import { CtaButton } from "./cta-button";
import { DemoButton } from "./demo-button";

interface FeatureHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
  trustLine?: string;
}

// Feature-page hero in the centered LP style: headline + sub + CTA +
// trust line stacked and centered. The page-wide LandingHeaderLp provides
// logo/lang/theme/sign-in; this hero no longer renders its own brand bar.
export function FeatureHero({
  title,
  subtitle,
  ctaText,
  demoText,
  microcopy,
  locale,
  trustLine,
}: FeatureHeroProps) {
  return (
    <section
      data-section="feature-hero"
      className="container mx-auto px-4 pt-4 pb-12 sm:pb-16 lg:pt-6 min-h-svh flex flex-col"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
        <div className="flex-1 flex flex-col items-center text-center content-center justify-center gap-7">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl leading-snug">
            {subtitle}
          </p>
          <div className="w-full">
            <CtaButton
              text={ctaText}
              microcopy={microcopy}
              locale={locale}
              align="center"
              trackEvent="feature_hero_cta_click"
              stackMobile
              extra={<DemoButton text={demoText} locale={locale} trackEvent="l_feature_hero_demo" />}
            />
          </div>
          {trustLine ? (
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2 text-sm font-medium text-muted-foreground">
              <span className="text-amber-400">★★★★★</span>
              <span>{trustLine}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
