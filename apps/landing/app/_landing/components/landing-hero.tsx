"use client";

import Image from "next/image";
import { LandingHeader } from "./header";
import { DemoButton, type DemoVariant } from "./demo-button";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { analytics } from "@/lib/analytics";
import type { LandingTexts } from "../types";

interface LandingHeroProps {
  locale: string;
  /** Header strings + feature links for the embedded transparent hero header. */
  headerTexts: LandingTexts["header"];
  featureLinks: LandingTexts["footer"]["featureLinks"];
  /** Help guide URL for the locale; forwarded to the hero header's "?" icon. */
  helpHref?: string;
  /** Establishment-type chips shown above the headline. */
  verticals: string[];

  title: string;
  /** Optional second part of the headline (homepage uses it; flows inline). */
  titleAccent?: string;
  sub: string;

  /** Primary CTA — routed through usePrimaryCta (guest → modal, signed-in → app). */
  primaryLabel: string;
  primaryTrack: string;
  /** Optional demo button (opens the embedded preview modal). */
  demoText?: string;
  demoVariant?: DemoVariant;
  /** Hide the demo button on mobile (homepage). */
  demoHideMobile?: boolean;
  /** Secondary CTA — a plain anchor (e.g. "#features"). */
  secondaryLabel: string;
  secondaryHref: string;
  secondaryTrack: string;
  /** Hide the secondary CTA on mobile (feature pages). */
  secondaryHideMobile?: boolean;
  /** Push the secondary CTA to the right edge on desktop (feature pages). */
  secondaryPinRight?: boolean;

  microcopy?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Hero min-height utility. Defaults to a full viewport. Conversion pages
   *  pass a shorter value (e.g. "min-h-[88svh]") so the next section peeks
   *  above the fold and invites scrolling. */
  heightClass?: string;
  /** Optional extra flat dark layer over the photo (e.g. "bg-black/25") for
   *  pages that want a darker background than the default gradients give. */
  overlayClass?: string;
  /** Center-align the hero content (verticals, headline, accent bar, sub and
   *  the button row) instead of the default bottom-left layout. */
  centered?: boolean;
}

// Full-bleed hero modelled on the IQ Rest ad creative, shared by the homepage
// and every feature page: dark photo background, the transparent
// `variant="hero"` header on top, then headline, gradient accent bar,
// subheadline and two CTAs anchored bottom-left.
export function LandingHero({
  locale,
  headerTexts,
  featureLinks,
  helpHref,
  verticals,
  title,
  titleAccent,
  sub,
  primaryLabel,
  primaryTrack,
  demoText,
  demoVariant = "phone",
  demoHideMobile = false,
  secondaryLabel,
  secondaryHref,
  secondaryTrack,
  secondaryHideMobile = false,
  secondaryPinRight = false,
  microcopy,
  imageSrc = "/landing/hero-cafe.webp",
  imageAlt = "Two guests at a sunlit cafe table holding phones with the IQ Rest QR menu on screen",
  heightClass = "min-h-[100svh]",
  overlayClass,
  centered = false,
}: LandingHeroProps) {
  const cta = usePrimaryCta(primaryLabel);

  return (
    <section
      data-section="hero"
      className={`relative w-full ${heightClass} overflow-hidden flex flex-col text-white`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        quality={90}
        // Full-bleed + object-cover on a tall portrait viewport crops the
        // landscape photo and zooms in, so the rendered area needs more pixels
        // than the CSS width implies. Over-request on phones to avoid upscaling
        // blur; desktop stays at 100vw.
        sizes="(max-width: 768px) 160vw, 100vw"
        className="object-cover -z-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/10 to-transparent h-1/3" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
      {overlayClass ? <div className={`absolute inset-0 -z-10 ${overlayClass}`} /> : null}

      <LandingHeader
        texts={headerTexts}
        locale={locale}
        featureLinks={featureLinks}
        helpHref={helpHref}
        useLocalAnchors
        variant="hero"
      />

      <div className="relative flex-1 flex flex-col justify-end w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-12 sm:pb-16 lg:pb-20">
        <div className={`w-full max-w-3xl ${centered ? "mx-auto text-center" : "lg:max-w-[65%]"}`}>
          {verticals.length ? (
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5 ${centered ? "justify-center" : "max-w-[65%] sm:max-w-none"}`}>
              {verticals.map((v) => (
                <span
                  key={v}
                  className="text-[11px] lg:text-xs uppercase tracking-wider text-white/70"
                >
                  {v}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.05] mb-5 text-white">
            {titleAccent ? `${title} ${titleAccent}` : title}
          </h1>

          <div className={`h-[5px] w-20 rounded-full bg-gradient-to-r from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] mb-6 ${centered ? "mx-auto" : ""}`} />

          <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-snug">
            {sub}
          </p>
        </div>

        {/* button row spans the full hero width: CTA + demo left, features right */}
        <div className={`flex flex-col gap-3 w-full mt-8 ${centered ? "items-center sm:flex-row sm:justify-center" : "items-start sm:flex-row sm:items-center"}`}>
          <button
            type="button"
            onClick={() => cta.onClick(primaryTrack)}
            className="inline-flex items-center justify-center h-11 px-6 text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all whitespace-nowrap"
          >
            {cta.label}
          </button>
          {demoText ? (
            <DemoButton
              text={demoText}
              locale={locale}
              trackEvent={`${primaryTrack}_demo`}
              variant={demoVariant}
              className={`h-11 px-6 !text-base !font-semibold !text-white !bg-white/10 hover:!bg-white/20 backdrop-blur !border-white/30 ${demoHideMobile ? "!hidden sm:!inline-flex" : ""}`}
            />
          ) : null}
          <a
            href={secondaryHref}
            onClick={() => analytics.track(secondaryTrack)}
            className={`inline-flex items-center justify-center h-11 px-6 text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 rounded-lg transition-colors whitespace-nowrap ${secondaryHideMobile ? "hidden sm:inline-flex" : ""} ${secondaryPinRight ? "sm:ml-auto" : ""}`}
          >
            {secondaryLabel}
          </a>
        </div>

        {microcopy ? <p className={`mt-4 text-sm text-white/65 ${centered ? "text-center" : ""}`}>{microcopy}</p> : null}
      </div>
    </section>
  );
}
