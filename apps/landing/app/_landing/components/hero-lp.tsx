import { CtaButton } from "./cta-button";
import { DemoButton } from "./demo-button";
import { AccentWordRotator } from "./accent-word-rotator";
import { HeroBrandBar } from "./hero-brand-bar";
import type { LandingTexts } from "../types";
import { MockHome } from "./menu-mockup/mock-home";
import { MockMenu } from "./menu-mockup/mock-menu";
import { MockMenuText } from "./menu-mockup/mock-menu-text";

interface HeroProps {
  texts: LandingTexts["hero"];
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
  /** When provided, renders a sign-in icon in the brand-bar controls. */
  signinHref?: string;
  signinLabel?: string;
}

export function HeroLp({ texts, ctaText, demoText, microcopy, locale, signinHref, signinLabel }: HeroProps) {
  return (
    <section data-section="hero" className="container mx-auto px-4 pt-4 pb-12 sm:pb-16 lg:pt-6 min-h-svh flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
      <HeroBrandBar locale={locale} signinHref={signinHref} signinLabel={signinLabel} />
      <div className="grid grid-cols-1 gap-10 flex-1 content-center">
        {/* Header — verticals + headline + sub + CTA + rating */}
        <div className="flex flex-col items-center text-center">
          {/* Mobile — infinite CSS marquee. The verticals list is rendered
              twice in a row so the translateX(-50%) animation produces a
              seamless loop without JS. mask-image fades the edges so chips
              don't pop in/out abruptly. */}
          <div className="sm:hidden w-full -mt-2 mb-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee gap-1.5">
              {[...texts.verticals, ...texts.verticals].map((v, i) => (
                <span
                  key={`${v}-${i}`}
                  className="shrink-0 inline-flex items-center h-7 leading-none text-[11px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 whitespace-nowrap"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop — static chips grid (unchanged). */}
          <div className="hidden sm:flex flex-row flex-wrap items-center justify-center gap-1.5 mb-5 w-full">
            {texts.verticals.map((v) => (
              <span
                key={v}
                className="inline-flex items-center h-6 leading-none text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5"
              >
                {v}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            {texts.accentWord && texts.accentWordRotation && texts.accentWordRotation.length > 0 ? (
              <span className="block whitespace-pre-line sm:whitespace-normal">
                {texts.headlinePrefix}
                <AccentWordRotator
                  initial={texts.accentWord}
                  items={texts.accentWordRotation}
                  intervalMs={1000}
                  className="text-primary block sm:inline"
                />
                {texts.headlineSuffix}
              </span>
            ) : (
              <span className="block whitespace-pre-line sm:whitespace-normal">{texts.headline}</span>
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 max-w-xl mb-7 leading-snug">
            {texts.sub}
          </p>

          <div className="w-full">
            <CtaButton
              text={ctaText}
              locale={locale}
              align="center"
              trackEvent="land_hero_cta_click"
              stackMobile
              extra={<DemoButton text={demoText} locale={locale} trackEvent="land_hero_demo_open" />}
            />
          </div>

        </div>

        {/* Images — PPC LP drops the under-trio rating row; the `500+
            ristoranti italiani` social proof already lives in the hero
            sub, so a second rating block here is just clutter. */}
        <div className="w-4/5 sm:w-full max-w-[432px] lg:max-w-[min(520px,55svh)] mx-auto px-4 sm:px-2 pb-0 -translate-y-[10px] mt-4 lg:-mt-4">
          <div className="relative w-full aspect-[5/4]">
            <MockHome locale={locale} brandName="IQ Rest" className="absolute left-0 bottom-[13%] w-[36%] z-0" />
            <MockMenuText locale={locale} className="absolute right-0 top-[13%] w-[36%] z-0" />
            <MockMenu locale={locale} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46%] z-10" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
