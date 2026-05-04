import type { LucideIcon } from "lucide-react";

export type HeroVariant = {
  headline: string;
  headlineAccent: string;
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
    variants: HeroVariant[];
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

  footer: {
    featureLinks: FooterLink[];
    navLinks: FooterLink[];
    copyrightTemplate: string;
  };
};
