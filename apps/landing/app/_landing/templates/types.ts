import type { IconKey } from "../lib/icons";

// Single, locale-agnostic content shape for a feature landing page. Layout
// lives in `feature-landing-template.tsx` — this file describes *what* to
// render, not *how*. To clone the layout to another locale, copy the page
// directory and translate the `content.ts`; the page.tsx stays identical.

export interface FeatureMeta {
  title: string;
  description: string;
  canonical: string;
  /** Full BCP47, e.g. `ru_RU`, `es_ES`. */
  ogLocale: string;
  ogTitle: string;
  ogDescription: string;
  /** Optional OG/Twitter image override; falls back to `/og-image.png`. */
  ogImage?: string;
  /** Used in default OG image alt text and in JSON-LD SoftwareApplication.name. */
  brandLine?: string;
}

export interface FeatureHero {
  headline: string;
  /** Accent tail of the headline, rendered with the brand gradient — same
   *  treatment as the home hero's `titleAccent`. */
  headlineAccent?: string;
  sub: string;
  /** Feature-specific primary CTA label (e.g. "Create Digital Menu"). */
  cta: string;
  /** Feature-specific demo button label (e.g. "Demo: the menu as a guest").
   *  Falls back to the chrome-wide `demoText`. */
  demoLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Two-phone artwork instead of a flat photo — same treatment as the home
   *  hero's device panel, minus the tablets. Mutually exclusive with
   *  `imageSrc`; pass exactly two entries. */
  phones?: { src: string; alt: string }[];
  /** Single-tablet artwork on the warm tint — same framing as the home
   *  feature cards' tablet art. Takes precedence over `imageSrc`. */
  tablet?: { src: string; alt: string };
}

/** A benefit bullet card — same shape as the home hero's `heroCards`, reused
 *  on feature pages that want the same strip under their hero. `{count}` in
 *  `title`/`sub` is substituted with the live restaurant count. */
export interface FeatureBulletCard {
  icon: IconKey;
  iconClass?: string;
  title: string;
  sub: string;
}

export interface FeatureScan {
  heading: string;
  headingAccent: string;
  sub: string;
  cta: string;
}

/** A home-style feature spotlight card: heading + lead on a warm tinted
 *  panel, icon bullets below — the home feature card minus artwork and the
 *  CTA row. */
export interface FeatureSpotlight {
  heading: string;
  sub: string;
  bullets: { icon: IconKey; title: string; sub: string }[];
}

export interface FeatureSubFeature {
  icon: IconKey;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: readonly string[];
  /** Optional card image. Omit for a text-only card (icon + copy). */
  image?: { src: string; alt: string };
  /** Optional analytics suffix; auto-generated from heading when omitted. */
  trackEvent?: string;
}

export interface FeatureFaqItem {
  q: string;
  a: string;
}

export interface FeatureContent {
  /** Locale segment (e.g. `ru`, `en`). Drives header anchors and canonical. */
  locale: string;
  /** URL slug under the locale segment (without leading slash). */
  slug: string;
  meta: FeatureMeta;
  hero: FeatureHero;
  scan: FeatureScan;
  subFeatures: readonly FeatureSubFeature[];
  /** Home-style spotlight cards. When set, the subFeatures band renders these
   *  big cards instead of the small text-card grid. */
  spotlights?: readonly FeatureSpotlight[];
  /** Hide the section heading/sub above the subFeatures grid on this page. */
  hideFeatureHeading?: boolean;
  /** Per-page heading/sub above the subFeatures grid. Overrides the shared
   *  chrome.featureHighlights so a feature page can frame its own cards. */
  featureHeading?: { heading: string; sub: string };
  /** Optional benefit strip straight under the hero, same as the home page's
   *  `heroCards`. Omit to skip the band. */
  heroCards?: readonly FeatureBulletCard[];
  /** Icon verticals for the hero, same treatment as the home hero. Overrides
   *  the plain-text `chrome.hero.verticals` when present. */
  heroVerticals?: readonly { icon: IconKey; label: string }[];
  faq: {
    sub: string;
    items: readonly FeatureFaqItem[];
  };
  /** Prefix for analytics events on this page. */
  trackPrefix?: string;
  /** Per-page override for the closing CTA band. Falls back to chrome.finalCta. */
  finalCta?: { heading: string; headingAccent: string; sub: string };
}
