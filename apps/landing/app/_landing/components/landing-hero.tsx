"use client";

import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { LandingHeader } from "./header";
import { DemoButton, type DemoVariant } from "./demo-button";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { analytics } from "@/lib/analytics";
import type { LandingTexts } from "../types";

// Turn line-break markers inside a translated string into responsive <br>s so
// hero headings/subs wrap at chosen phrase boundaries on tablet + desktop while
// staying a plain adaptive wrap on phones (every <br> is hidden on mobile).
//   \n    → break on tablet AND desktop (same spot)   → hidden sm:block
//   [md]  → break on tablet only (sm..lg)             → hidden sm:max-lg:block
//   [lg]  → break on desktop only (lg+)               → hidden lg:block
// Markers are written surrounded by a space, so when the <br> is hidden the
// remaining whitespace collapses to a normal single space.
const BR_CLASS: Record<string, string> = {
  "\n": "hidden sm:block",
  "[md]": "hidden sm:max-lg:block",
  "[lg]": "hidden lg:block",
};

function withBreaks(text: string): ReactNode {
  return text.split(/(\n|\[md\]|\[lg\])/).map((part, i) => {
    const cls = BR_CLASS[part];
    // A space precedes every <br> so that when the <br> is hidden (mobile, or
    // the other breakpoint) the two words stay separated instead of merging.
    return cls ? (
      <Fragment key={i}>
        {" "}
        <br className={cls} />
      </Fragment>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

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
  /** Secondary CTA — a plain anchor (e.g. "#features"). Omit to hide it. */
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryTrack?: string;
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
      className={`relative w-full ${heightClass} flex flex-col text-white`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        // LCP element — keep quality moderate (photo sits under a dark overlay,
        // so 80 is indistinguishable from 90 but lighter) and request at the
        // CSS width (100vw) instead of over-requesting to protect mobile LCP.
        quality={80}
        sizes="100vw"
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

      <div className="relative mt-auto flex flex-col w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16">
        <div className={`w-full max-w-3xl ${centered ? "mx-auto text-center" : "lg:max-w-[65%]"}`}>
          {verticals.length ? (
            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-5 ${centered ? "justify-center" : "max-w-[65%] sm:max-w-none"}`}>
              {verticals.map((v) => (
                <span
                  key={v}
                  className="text-xs lg:text-sm uppercase tracking-wider text-white/70"
                >
                  {v}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.05] mb-5 text-white">
            {withBreaks(titleAccent ? `${title} ${titleAccent}` : title)}
          </h1>

          <div className={`h-[5px] w-20 rounded-full bg-gradient-to-r from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] mb-6 ${centered ? "mx-auto" : ""}`} />

          <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-snug">
            {withBreaks(sub)}
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
          {secondaryLabel ? (
            <a
              href={secondaryHref}
              onClick={() => secondaryTrack && analytics.track(secondaryTrack)}
              className={`inline-flex items-center justify-center h-11 px-6 text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 rounded-lg transition-colors whitespace-nowrap ${secondaryHideMobile ? "hidden sm:inline-flex" : ""} ${secondaryPinRight ? "sm:ml-auto" : ""}`}
            >
              {secondaryLabel}
            </a>
          ) : null}
        </div>

        {microcopy ? <p className={`mt-4 text-sm text-white/65 ${centered ? "text-center" : ""}`}>{microcopy}</p> : null}
      </div>
    </section>
  );
}
