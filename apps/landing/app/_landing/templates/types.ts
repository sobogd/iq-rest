import type { LucideIcon } from "lucide-react";

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
  sub: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface FeatureScan {
  heading: string;
  headingAccent: string;
  sub: string;
  cta: string;
}

export interface FeatureSubFeature {
  icon: LucideIcon;
  eyebrow: string;
  heading: string;
  body: string;
  bullets: readonly string[];
  image: { src: string; alt: string };
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
  faq: {
    sub: string;
    items: readonly FeatureFaqItem[];
  };
  /** Prefix for analytics events on this page. */
  trackPrefix?: string;
}
