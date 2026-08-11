"use client";

import Image from "next/image";
import { DemoButton, type DemoVariant } from "./demo-button";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { PRIMARY_BTN, DEMO_BTN } from "./shell";

// Feature-page hero in the home card's clothes: verticals pinned top, headline
// block centred, CTA pair pinned bottom — and the page's photo where the home
// card keeps its device mockups.
export function FeatureHeroCard({
  locale,
  verticals,
  title,
  sub,
  primaryLabel,
  demoText,
  demoVariant,
  image,
}: {
  locale: string;
  verticals: string[];
  title: string;
  sub: string;
  primaryLabel: string;
  demoText: string;
  demoVariant: DemoVariant;
  image?: { src: string; alt: string };
}) {
  const cta = usePrimaryCta(primaryLabel);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border grid grid-cols-1 ${
        image ? "lg:grid-cols-[11fr_9fr]" : ""
      }`}
    >
      <div className="order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-start gap-6 p-5 sm:p-6">
        <span className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-sm text-muted-foreground/80">
          {verticals.map((v) => (
            <span key={v}>{v}</span>
          ))}
        </span>

        <div className="my-auto flex flex-col gap-4">
          <h1 className="text-[2rem] sm:text-[2.5rem] font-medium tracking-tight leading-[1.1]">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">{sub}</p>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => cta.onClick("Hero CTA")} className={PRIMARY_BTN}>
            {cta.label}
          </button>
          <DemoButton
            text={demoText}
            locale={locale}
            trackName="Hero demo"
            variant={demoVariant}
            className={DEMO_BTN}
          />
        </div>
      </div>

      {image ? (
        <div className="order-1 lg:order-2 relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[21.5rem]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 450px"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
