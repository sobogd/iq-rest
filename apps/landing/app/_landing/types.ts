import type { LucideIcon } from "lucide-react";

export type HeroFlavor = "QR" | "WEB";

export type HeroFlavorTexts = {
  headline: string;
  sub: string;
};

export type FeatureItem = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tag?: string;
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
  ctaSite: string;
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
    qr: HeroFlavorTexts;
    web: HeroFlavorTexts;
    painBullets: string[];
    rating: string;
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

  footer: {
    featureLinks: FooterLink[];
    navLinks: FooterLink[];
    copyrightTemplate: string;
  };
};
