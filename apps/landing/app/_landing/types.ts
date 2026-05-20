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
  demoText: string;
  microcopy: string;

  header: {
    navFeatures: string;
    navHow: string;
    navPricing: string;
    navFaq: string;
    signIn: string;
    cta: string;
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
     * are set, hero-lp renders the H1 as `${prefix}${accentWord}${suffix}`
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

  scan: {
    heading: string;
    headingAccent: string;
    sub: string;
    cta: string;
  };

  /** All copy used by the shared `PricingHero` component (chips, plan
   *  cards, helper templates). Templates use `{total}`, `{price}` and
   *  `{amount}` placeholders that the component replaces at render time
   *  with the formatted EUR values. */
  pricingHero?: {
    chips: readonly string[];
    heading: string;
    headingAccent: string;
    sub: string;
    popularBadge: string;
    perMonthSuffix: string;
    whenAnnualTemplate: string;
    orMonthlyTemplate: string;
    savingsTemplate: string;
    plans: {
      basic: { name: string; tagline: string; features: readonly string[] };
      pro: { name: string; tagline: string; features: readonly string[] };
    };
  };

  footer: {
    featureLinks: FooterLink[];
    navLinks: FooterLink[];
    copyrightTemplate: string;
    keywordLinks?: FooterLink[];
    keywordLinksHeading?: string;
  };
};
