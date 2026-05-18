import Image from "next/image";
import { CtaButton } from "./cta-button";
import { DemoButton } from "./demo-button";
import { AccentWordRotator } from "./accent-word-rotator";
import type { LandingTexts } from "../types";

interface HeroProps {
  texts: LandingTexts["hero"];
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
}

export function HeroLp({ texts, ctaText, demoText, microcopy, locale }: HeroProps) {
  return (
    <section
      data-section="hero"
      className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-6 pb-12 sm:pb-16 lg:pt-10 lg:pb-20"
    >
      <div className="grid grid-cols-1 gap-8 lg:gap-14 xl:gap-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Cafe photo — full-bleed inside its column, no container constraint. */}
        <div className="order-1 w-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
            <Image
              src="/landing/hero-cafe.webp"
              alt="Two guests at a sunlit cafe table holding phones with the IQ Rest QR menu on screen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Content — verticals + headline + sub + CTA. Centered on mobile,
            left-aligned from lg up. */}
        <div className="order-2 flex flex-col items-center text-center lg:items-start lg:text-start">
          <div className="sm:hidden w-full mb-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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

          <div className="hidden sm:flex flex-row flex-wrap items-center justify-center lg:justify-start gap-1.5 mb-5 w-full">
            {texts.verticals.map((v) => (
              <span
                key={v}
                className="inline-flex items-center h-6 leading-none text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5"
              >
                {v}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-[2.625rem] lg:text-[3.25rem] xl:text-[3.5rem] font-medium tracking-tight leading-[1.05] mb-4">
            {texts.accentWord && texts.accentWordRotation && texts.accentWordRotation.length > 0 ? (
              <span className="block whitespace-pre-line sm:whitespace-normal">
                {texts.headlinePrefix}
                <AccentWordRotator
                  initial={texts.accentWord}
                  items={texts.accentWordRotation}
                  intervalMs={1000}
                  className="text-primary block"
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
              microcopy={microcopy}
              locale={locale}
              align="center-mobile"
              trackEvent="land_hero_cta_click"
              stackMobile
              extra={<DemoButton text={demoText} locale={locale} trackEvent="land_hero_demo_open" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
