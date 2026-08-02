import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tag?: string;
  /** Optional deep-link target for this feature card. When set, the card
   *  title becomes a clickable anchor pointing at the corresponding
   *  feature landing page. */
  href?: string;
};

export type StepItem = {
  n: string;
  t: string;
  d: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FooterLink = {
  href: string;
  label: string;
};

/** One stat in the trust strip (shared by the homepage and feature pages).
 *  `num` renders value+suffix, `text` renders the raw value, `count` renders
 *  the live restaurant counter. */
export type TrustStat =
  | { kind: "num"; value: number; suffix?: string; label: string }
  | { kind: "text"; value: string; label: string }
  | { kind: "count"; label: string };

/**
 * Per-feature content. All shared chrome (header, footer, pricing trust,
 * faq eyebrow, ctaText, etc.) is read from the per-locale homepage TEXTS
 * (LandingTexts), so a feature texts file only carries copy unique to
 * that feature page.
 */
export type FeatureTexts = {
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
    ogTitle: string;
    ogDescription: string;
  };

  hero: {
    title: string;
    subtitle: string;
    trustLine?: string;
  };

  seo: {
    description: string;
    fullDescription: string;
    benefitsHeading?: string;
    benefits: string[];
  };

  pricing: {
    heading: string;
    headingAccent: string;
    sub: string;
  };

  faq: {
    sub: string;
    items: FaqItem[];
  };

  finalCta: {
    heading: string;
    headingAccent: string;
    sub: string;
  };
};

/** billing-features-constructor — copy for the à-la-carte pricing quiz on the
 *  pricing page (feature cards, price bar, enterprise line). Optional during
 *  the per-locale rollout — locales without it fall back to English. */
export type PricingQuizTexts = {
  heading: string;
  sub: string;
  billingLabel: string;
  monthly: string;
  yearly: string;
  restaurantsLabel: string;
  fewerAria: string;
  moreAria: string;
  menuTitle: string;
  menuHint: string;
  reservationsTitle: string;
  reservationsHint: string;
  kdsTitle: string;
  kdsHint: string;
  domainTitle: string;
  domainHint: string;
  /** Suffix after each feature price, e.g. "/mo". */
  perMonthSuffix: string;
  /** Suffix after the total, e.g. "/year" | "/month". */
  perYearSuffix: string;
  perMonthLongSuffix: string;
  /** "Save {amount} a year with yearly billing" — keep the {amount} placeholder. */
  saveYearlyTemplate: string;
  /** "{percent}% volume discount · {count} restaurants" — keep both placeholders. */
  volumeDiscountTemplate: string;
  saveUpToHint: string;
  billedYearly: string;
  billedMonthly: string;
  /** Enterprise line under the quiz: "{pre} {cta link} {post}". */
  enterprisePre: string;
  enterpriseCta: string;
  enterprisePost: string;
  /** WhatsApp prefill message for the enterprise link. */
  enterpriseWa: string;
};

/** billing-features-constructor — the compact pricing CTA block that replaced
 *  the fixed Basic/Pro plan cards on home + feature pages. Links to the
 *  locale's /pricing page. Optional — falls back to English. */
export type PricingCtaTexts = {
  heading: string;
  sub: string;
  /** "from {price}/mo" — keep the {price} placeholder. */
  fromTemplate: string;
  button: string;
};

export type LandingTexts = {
  htmlLang: string;
  htmlDir: "ltr" | "rtl";

  meta: {
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
    ogTitle: string;
    ogDescription: string;
  };

  ctaText: string;
  /** Primary CTA label on the homepage hero — generic across all features
   *  (the feature pages use the feature-specific `ctaText`). */
  homeCtaText: string;

  /** Product-level trust strip shown under the hero on feature pages (same
   *  four stats as the homepage). Optional during the per-locale migration —
   *  locales without it skip the strip. */
  trust?: TrustStat[];
  demoText: string;
  microcopy: string;

  header: {
    navFeatures: string;
    navHow: string;
    navPricing: string;
    navFaq: string;
    signIn: string;
    cta: string;
    /** Secondary hero CTA — scrolls to the features section ("View features"). */
    viewFeatures: string;
  };

  hero: {
    verticals: string[];
    headline: string;
    sub: string;
    dynamicHeadlines: string[];
    painBullets: string[];
    rating: string;
    /**
     * Optional in-headline word swap (PPC LP only). When all four fields
     * are set, hero renders the H1 as `${prefix}${accentWord}${suffix}`
     * and after hydration cycles `accentWord` through `accentWordRotation`.
     * SSR HTML keeps the keyword phrase intact so the Ads crawler scores
     * landing-page relevance against the original word.
     */
    headlinePrefix?: string;
    accentWord?: string;
    accentWordRotation?: string[];
    headlineSuffix?: string;
  };

  features: {
    heading: string;
    headingAccent: string;
    sub: string;
    items: FeatureItem[];
  };

  founder: {
    eyebrow: string;
    quoteStart: string;
    quoteAccent: string;
    sign: string;
    photoAlt: string;
  };

  how: {
    heading: string;
    /** Optional accent fragment shown after `heading` with the gradient
     *  treatment (same as final-cta / pricing / faq). Locales that don't
     *  set it render a plain single-colour heading. */
    headingAccent?: string;
    sub: string;
    steps: StepItem[];
  };

  pricing: {
    badge: string;
    heading: string;
    headingAccent: string;
    sub: string;
    monthlyLabel: string;
    yearlyLabel: string;
    saveBadge: string;
    perMonth: string;
    billedAnnually: string;
    youSave: string;
    trust: {
      secure: string;
      noCommitment: string;
      quick: string;
      restaurants: string;
    };
  };

  faq: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    sub: string;
    whatsappCta: string;
    whatsappPrefill: string;
    items: FaqItem[];
  };

  finalCta: {
    heading: string;
    headingAccent: string;
    sub: string;
  };

  /** Heading + sub shown above the feature-card carousel on feature pages.
   *  Generic across all features. Optional during the per-locale migration —
   *  locales without it just render the carousel with no section header. */
  featureHighlights?: {
    heading: string;
    sub: string;
  };

  scan: {
    heading: string;
    headingAccent: string;
    sub: string;
    cta: string;
  };

  /** billing-features-constructor: à-la-carte quiz copy (pricing page). */
  pricingQuiz?: PricingQuizTexts;

  /** billing-features-constructor: pricing CTA block (home + feature pages). */
  pricingCta?: PricingCtaTexts;

  footer: {
    featureLinks: FooterLink[];
    navLinks: FooterLink[];
    copyrightTemplate: string;
    keywordLinks?: FooterLink[];
    keywordLinksHeading?: string;
  };
};
