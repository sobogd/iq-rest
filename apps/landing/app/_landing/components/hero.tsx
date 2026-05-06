import Image from "next/image";
import { CtaButton } from "./cta-button";
import { DemoButton } from "./demo-button";
import { RotatingAccent } from "./rotating-accent";
import type { HeroFlavor, LandingTexts } from "../types";
import sampleMain from "@/public/samples/sample-main.webp";
import sampleMainPage from "@/public/samples/sample-main-page.webp";
import sampleContacts from "@/public/samples/sample-contacts.webp";

interface HeroProps {
  texts: LandingTexts["hero"];
  variant: HeroFlavor;
  ctaText: string;
  demoText: string;
  microcopy: string;
  locale: string;
}

export function Hero({ texts, variant, ctaText, demoText, microcopy, locale }: HeroProps) {
  const active = variant === "WEB" ? texts.web : texts.qr;
  return (
    <section data-section="hero" className="container mx-auto px-4 pt-8 pb-16 lg:pt-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.85fr] lg:gap-x-16 lg:gap-y-8 lg:items-center lg:[grid-template-areas:'header_images']">
        {/* Header — verticals + headline + sub + CTA + rating */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-start lg:[grid-area:header]">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:justify-center lg:justify-start gap-1 sm:gap-1.5 mb-5 w-full">
            <div className="flex justify-center gap-1 sm:contents">
              {texts.verticals.slice(0, 3).map((v) => (
                <span
                  key={v}
                  className="text-[11px] sm:text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1 sm:py-0.5"
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-1 sm:contents">
              {texts.verticals.slice(3).map((v) => (
                <span
                  key={v}
                  className="text-[11px] sm:text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1 sm:py-0.5"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4">
            <span className="block">{active.headline}</span>
            <RotatingAccent items={texts.dynamicHeadlines} className="block" />
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mb-7 leading-snug">
            {active.sub}
          </p>

          <div className="w-full">
            <CtaButton
              text={ctaText}
              microcopy={microcopy}
              locale={locale}
              align="center-mobile"
              trackEvent="land_hero_cta_click"
              extra={<DemoButton text={demoText} locale={locale} trackEvent="land_hero_demo_open" />}
            />
          </div>

          {/* Rating — desktop only (mobile rating sits under image) */}
          <div className="mt-6 hidden lg:flex flex-row items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="text-amber-400">★★★★★</span>
            <span>{texts.rating}</span>
          </div>
        </div>

        {/* Images + mobile rating */}
        <div className="w-full max-w-[480px] lg:max-w-[500px] mx-auto px-8 sm:px-6 lg:px-0 lg:[grid-area:images]">
          <div className="relative w-full aspect-[5/4]">
            <Image
              src={sampleMain}
              alt=""
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 18vw, 30vw"
              className="absolute left-0 top-0 w-[36%] h-auto rounded-[2rem] overflow-hidden z-0"
            />
            <Image
              src={sampleContacts}
              alt=""
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 18vw, 30vw"
              className="absolute right-0 bottom-0 w-[36%] h-auto rounded-[2rem] overflow-hidden z-0"
            />
            <Image
              src={sampleMainPage}
              alt=""
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 22vw, 38vw"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] h-auto rounded-[2rem] overflow-hidden z-10"
            />
          </div>
          <div className="mt-4 flex lg:hidden flex-col items-center gap-1 text-sm font-medium text-muted-foreground">
            <span className="text-amber-400">★★★★★</span>
            <span>{texts.rating}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
