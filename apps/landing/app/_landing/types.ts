export type FaqItem = {
  q: string;
  a: string;
};

/** Tiny shared UI strings (aria-labels for close/menu/help buttons) that used
 *  to live in messages/<locale>.json under `common`. Served to client
 *  components via the LandingStringsProvider context (see
 *  lib/landing-strings.tsx), sourced from the locale's texts.json. */
export type CommonTexts = {
  close: string;
  menu: string;
  help: string;
};

/** Auth page / OTP form copy — used to live in messages/<locale>.json under
 *  `auth`. Same provider mechanism as CommonTexts. `consent.line` keeps the
 *  `<terms>…</terms>` / `<privacy>…</privacy>` tags; `verifySubtitle` keeps
 *  the `{email}` placeholder. */
export type AuthTexts = {
  emailLabel: string;
  emailPlaceholder: string;
  or: string;
  continueGoogle: string;
  continueApple: string;
  consent: { line: string };
  signInTitle: string;
  signInSubtitle: string;
  signInButton: string;
  registerTitle: string;
  registerSubtitle: string;
  registerButton: string;
  switchSignIn: string;
  switchCreate: string;
  verifyTitle: string;
  verifySubtitle: string;
  verifyCodeLabel: string;
  checkSpam: string;
  verifyButton: string;
  resendCode: string;
  resendSent: string;
  changeEmail: string;
  metaSignIn: string;
  metaRegister: string;
  errors: {
    emailInvalid: string;
    sendFailed: string;
    verifyFailed: string;
    codeExpired: string;
    noCode: string;
    invalidCode: string;
    tooManyAttempts: string;
  };
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
    /** Own trust line under the CTA (e.g. "Only email needed.") — replaces
     *  the generic shared `microcopy` prop for this card specifically. */
    microcopy?: string;
  };
};

/** billing-features-constructor — copy for the à-la-carte pricing quiz on the
 *  pricing page (feature cards, price bar, enterprise line). Optional during
 *  the per-locale rollout — locales without it fall back to English. */
export type PricingQuizTexts = {
  heading: string;
  /** Accent part of the heading, rendered with the brand gradient (like the
   *  home hero's titleAccent) — the phrase worth highlighting. */
  headingAccent?: string;
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
  /** "Discount {percent}%" — keep the {percent} placeholder. */
  volumeDiscountTemplate: string;
  saveUpToHint: string;
  /** Plural forms for the count overlay's "{n} restaurant(s)" row label —
   *  classic Slavic one/few/many split (safe for English too: set few/many
   *  to the same plural string). Only ever applied to n ≤ 20 (the overlay's
   *  list length), so English's "21 restaurants" edge case never comes up. */
  restaurantOne: string;
  restaurantFew: string;
  restaurantMany: string;
  billedYearly: string;
  billedMonthly: string;
  /** Enterprise line under the quiz: "{pre} {cta link} {post}". */
  enterprisePre: string;
  enterpriseCta: string;
  enterprisePost: string;
  /** WhatsApp prefill message for the enterprise link. */
  enterpriseWa: string;
  /** "Need more restaurants? {cta}" — shown while count === 1; {cta} opens
   *  the restaurant-count overlay. */
  multiplePre: string;
  multipleCta: string;
  /** "Different restaurant count? {cta}" — shown once count > 1, replacing
   *  the pair above (same overlay, just re-opening it to change the pick). */
  multipleChangePre: string;
  multipleChangeCta: string;
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

/** Blog UI chrome (index heading, card labels). Article copy itself lives in
 *  content/blog/<id>/<locale>.json — see app/_landing/blog/types.ts. */
export type BlogTexts = {
  /** Blog index <title> (≤60 chars). */
  metaTitle: string;
  /** Blog index meta description (≤155 chars). */
  metaDescription: string;
  /** H1 of the index page; also the breadcrumb label for the blog. */
  title: string;
  intro: string;
  readMore: string;
  relatedHeading: string;
  backToBlog: string;
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

  /** Home JSON-LD SoftwareApplication name — locale copy so the page.tsx
   *  carries no hardcoded strings. */
  jsonLd?: { appName: string };

  ctaText: string;
  /** Primary CTA label on the homepage hero — generic across all features
   *  (the feature pages use the feature-specific `ctaText`). */
  homeCtaText: string;

  /** See CommonTexts / AuthTexts — page-local replacement for the old
   *  messages/<locale>.json `common` + `auth` namespaces. */
  common: CommonTexts;
  auth: AuthTexts;

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
    /** Label of the products dropdown in the grouped (v2 home) header.
     *  Falls back to `navFeatures` for locales that haven't set it. */
    navProducts?: string;
    /** Label of the help-guide link in the grouped header.
     *  Falls back to `navHow`. */
    navGuide?: string;
    /** Label of the about-page link. Rendered only when the template passes an
     *  `aboutHref`, so locales without the page never show it. */
    navAbout?: string;
    /** Muted group headings of the grouped burger panel (features / info).
     *  Live in the header texts so every page shows the identical menu. */
    menuFeaturesHeading?: string;
    menuInfoHeading?: string;
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

  founder: {
    eyebrow: string;
    quoteStart: string;
    quoteAccent: string;
    sign: string;
    photoAlt: string;
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
    /** Own trust line under the CTA (e.g. "Only email needed.") — replaces
     *  the generic shared `microcopy` prop for this card specifically. */
    microcopy?: string;
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

  /** Optional while the namespace rolls out across locales — pages fall back
   *  to the EN copy via resolveBlogTexts(). */
  blog?: BlogTexts;

  footer: {
    copyrightTemplate: string;
    /** Column headings for the 4-column desktop footer (features / info /
     *  legal docs — the 4th "general" column reuses cookie-texts' own
     *  languageSwitcher label, no separate field needed). */
    featuresHeading: string;
    featureLinks: FooterLink[];
    infoHeading: string;
    legalHeading: string;
    /** Heading above the full currency list (mirrors the language row —
     *  see footer.tsx / app/api/currency for the no-JS link mechanism). */
    currencyHeading: string;
    /** Label of the blog link in the info column. Optional — locales without
     *  it just don't show the link. */
    blogLabel?: string;
  };
};
