import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LandingHeader } from "../components/header";
import { LandingFooter } from "../components/footer";
import { Section } from "../components/section";
import { PageTracker } from "../components/page-tracker";
import { PricingHero } from "../components/pricing-hero";
import { CtaButton } from "../components/cta-button";
import type { LandingTexts } from "../types";

export type HomeHero = { title: string; titleAccent: string; sub: string };

// Shared markup for every per-locale home page. Per-locale data (hero copy,
// feature images, JSON-LD, the "learn more" label) stays in each `page.tsx`
// and is passed in — only this layout is centralised, so a structural change
// to the home page is a one-file edit instead of 35.
export function HomeTemplate({
  locale,
  texts,
  hero,
  featureImages,
  jsonLd,
  learnMoreText,
}: {
  locale: string;
  texts: LandingTexts;
  hero: HomeHero;
  featureImages: Record<string, string>;
  jsonLd: string;
  learnMoreText: string;
}) {
  return (
    <main className="relative">
      <PageTracker />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <LandingHeader texts={texts.header} locale={locale} useLocalAnchors featureLinks={texts.footer.featureLinks} />

      <Section dataSection="home_hero" noContainer accent>
        <div className="w-full lg:min-h-[50dvh] flex flex-col items-center justify-center text-center py-8 sm:py-14">
          <div className="sm:hidden w-full mb-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-1.5">
              {[...texts.hero.verticals, ...texts.hero.verticals].map((v, i) => (
                <span
                  key={`${v}-${i}`}
                  className="shrink-0 inline-flex items-center h-7 leading-none text-[11px] uppercase tracking-wider text-muted-foreground rounded-full px-2.5 whitespace-nowrap"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex flex-row flex-wrap items-center justify-center gap-1.5 mb-5 w-full">
            {texts.hero.verticals.map((v) => (
              <span
                key={v}
                className="inline-flex items-center h-8 leading-none text-xs lg:text-sm uppercase tracking-wider text-muted-foreground rounded-full px-3"
              >
                {v}
              </span>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight max-w-4xl lg:max-w-6xl mb-5">
            {hero.title}{" "}
            <span className="text-primary lg:block">{hero.titleAccent}</span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-4xl mb-10">
            {hero.sub}
          </p>
          <CtaButton
            text={texts.homeCtaText}
            microcopy={texts.microcopy}
            locale={locale}
            align="center"
            trackEvent="l_home_hero_cta_click"
            extra={
              <a
                href="#features"
                className="inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-foreground bg-transparent border border-border rounded-lg hover:bg-muted active:scale-[0.99] transition-all text-center leading-tight"
              >
                {texts.header.navFeatures}
              </a>
            }
          />
        </div>
      </Section>

      <div id="features">
        {texts.features.items.map((item, i) => {
          const image = item.tag ? featureImages[item.tag] : undefined;
          const reverse = i % 2 === 1;
          return (
            <Section key={item.title} dataSection={`feature_${i}`} noContainer accent={i % 2 === 1}>
              <div className="w-full lg:min-h-[70dvh] flex items-center py-8 sm:py-16 lg:py-0">
                <div className={`grid grid-cols-1 gap-10 lg:gap-14 xl:gap-20 lg:grid-cols-2 lg:items-center w-full ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-start">
                    <div className="inline-flex items-center gap-2 text-primary mb-5">
                      <item.Icon className="h-5 w-5" strokeWidth={2} />
                      {item.tag ? <span className="text-[11px] uppercase tracking-widest font-medium">{item.tag}</span> : null}
                    </div>
                    <h2 className="text-4xl sm:text-[2.625rem] lg:text-[3.25rem] xl:text-[3.5rem] font-medium tracking-tight leading-[1.05] mb-5">
                      {item.title}
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 max-w-xl leading-snug mb-8">
                      {item.desc}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center justify-center gap-2 min-h-11 py-2 px-6 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight"
                      >
                        {learnMoreText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                  <div className="w-full">
                    {image ? (
                      <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
                        <Image src={image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      <Section id="pricing" dataSection="pricing_hero" noContainer>
        <PricingHero locale={locale} ctaText={texts.ctaText} demoText={texts.demoText} microcopy={texts.microcopy} texts={texts.pricingHero!} trackPrefix="l_home_pricing" />
      </Section>

      <Section as="footer" dataSection="footer" noContainer accent className="!py-6 sm:!py-8">
        <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} />
      </Section>
    </main>
  );
}
