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

/** Feature-page hero: feature-specific headline + sub, then the same CTA pair
 *  as the homepage (LandingHeader / LandingHero) so the call-to-action surface
 *  is consistent across the whole landing. */
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
      className="container mx-auto px-4 pt-8 pb-12 lg:pt-12 lg:pb-16"
    >
      <div className="max-w-3xl mx-auto text-center lg:text-start lg:mx-0 flex flex-col items-center lg:items-start">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4 text-foreground">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-7 leading-snug">
          {subtitle}
        </p>
        <div className="w-full">
          <CtaButton
            text={ctaText}
            microcopy={microcopy}
            locale={locale}
            align="center-mobile"
            trackEvent="feature_hero_cta_click"
            extra={<DemoButton text={demoText} locale={locale} trackEvent="feature_hero_demo_open" />}
          />
        </div>
        {trustLine ? (
          <div className="mt-8 flex flex-col items-center gap-1 lg:flex-row lg:items-center lg:gap-2 text-sm font-medium text-muted-foreground">
            <span className="text-amber-400">★★★★★</span>
            <span>{trustLine}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
