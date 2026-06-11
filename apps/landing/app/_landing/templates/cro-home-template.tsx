import Image from "next/image";
import { ArrowRight, Cpu, MonitorSmartphone, type LucideIcon } from "lucide-react";
import { LinkForward } from "../components/link-forward";
import { DemoButton, type DemoVariant } from "../components/demo-button";
import { PageTracker } from "../components/page-tracker";
import { LandingHeader } from "../components/header";
import { LandingHero } from "../components/landing-hero";
import { Section } from "../components/section";
import { CtaButton } from "../components/cta-button";
import { PricingHero } from "../components/pricing-hero";
import { Founder } from "../components/founder";
import { Faq } from "../components/faq";
import { FinalCta } from "../components/final-cta";
import { LandingFooter } from "../components/footer";
import { getHelpBanner } from "../help/registry";
import { HelpBannerSection } from "../help/help-banner-section";
import type { LandingTexts } from "../types";

// ── CRO copy shape ──────────────────────────────────────────────────────────
// Only the conversion-page-specific strings live here; shared sections (header,
// footer, founder, faq, pricing, scan, final CTA, microcopy, CTA labels) are
// read from the per-locale `LandingTexts` so they stay in sync with the rest of
// the site and don't need re-translating.

export type CroTrustItem =
  | { kind: "num"; value: number; suffix?: string; label: string }
  | { kind: "text"; value: string; label: string }
  | { kind: "count"; label: string };

export type CroBenefit = {
  Icon: LucideIcon;
  tag: string;
  title: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export type CroCopy = {
  hero: { verticals: string[]; title: string; titleAccent: string; sub: string };
  /** Trust line under the hero CTA. Use "{count}" where the live restaurant
   *  number should appear. */
  heroMicrocopy: string;
  /** Secondary hero button (anchors to #bundle). */
  seeIncluded: string;
  trust: CroTrustItem[];
  bundle: { heading: string; headingAccent: string; sub: string };
  benefits: CroBenefit[];
  /** Per-benefit "learn more" link label. */
  seeDetails: string;
  extras: { heading: string; items: { Icon: LucideIcon; label: string }[] };
  midCta: { heading: string; sub: string };
  /** Hardware + run-anywhere reassurance band, shown right after the trust
   *  strip — kills the "do I need to buy hardware?" objection early.
   *  Optional during the per-locale migration; locales without it skip the band. */
  platform?: {
    hardwareTitle: string;
    hardwareSub: string;
    anywhereTitle: string;
    anywhereSub: string;
  };
  /** Three activity groups — guest, kitchen, management — replacing the old
   *  "how it works" steps. Each group is a column of one-line value bullets,
   *  framing the product as one system that covers the whole restaurant.
   *  Optional during migration; locales without it fall back to `how` steps. */
  activities?: {
    heading: string;
    headingAccent: string;
    sub: string;
    groups: { Icon: LucideIcon; tag: string; bullets: string[] }[];
  };
  /** Legacy "how it works" four-step section. Superseded by `activities`;
   *  kept optional so not-yet-migrated locales keep rendering it. */
  how?: { heading: string; sub: string; steps: { n: string; t: string; d: string }[] };
};

// Benefit order is [menu, kitchen, reservations, orders]; the footer feature
// links are [digital menu, order taking, table booking, kitchen display]. This
// maps each benefit to its feature page so the "See details" link uses the
// correct per-locale slug without storing hrefs per locale.
const FEATURE_LINK_MAP = [0, 3, 2, 1];

// Each benefit's live demo board: [menu, kitchen, reservations, orders].
const DEMO_VARIANTS: DemoVariant[] = ["phone", "tablet", "reservations", "orders"];

// Shared markup for every per-locale home page — visually identical to the
// original `/all-in-one` test page. Per-locale data (copy + SEO) stays in each
// `page.tsx`; only this layout is centralised.
export function CroHomeTemplate({
  locale,
  texts,
  cro,
  count,
  page = "home",
}: {
  locale: string;
  texts: LandingTexts;
  cro: CroCopy;
  count: number;
  page?: string;
}) {
  const countLabel = count.toLocaleString(locale);
  const featureLinks = texts.footer.featureLinks;
  // Help guide banner + header "?" icon — only for locales whose guide is
  // translated (registry returns null otherwise).
  const helpBanner = getHelpBanner(locale);
  // The optional `platform` band sits between trust and bundle. When present it
  // adds one section, flipping the accent parity of everything below it — so the
  // downstream `accent` props invert only for locales that carry the band.
  const shift = !!cro.platform;

  return (
    <main className="relative">
      <PageTracker page={page} />
      <LandingHeader texts={texts.header} locale={locale} useLocalAnchors featureLinks={featureLinks} helpHref={helpBanner?.href} revealOnScroll />

      <LandingHero
        locale={locale}
        headerTexts={texts.header}
        helpHref={helpBanner?.href}
        featureLinks={featureLinks}
        verticals={cro.hero.verticals}
        title={cro.hero.title}
        titleAccent={cro.hero.titleAccent}
        sub={cro.hero.sub}
        primaryLabel={texts.homeCtaText}
        primaryTrack="l_cro_hero_cta_click"
        secondaryLabel={cro.seeIncluded}
        secondaryHref="#bundle"
        secondaryTrack="l_cro_hero_features_click"
        secondaryHideMobile
        microcopy={cro.heroMicrocopy.replace("{count}", countLabel)}
        heightClass="min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem]"
        overlayClass="bg-black/25"
        centered
      />

      {/* Trust strip — four numbers, read in a glance, just below the fold. */}
      <Section dataSection="cro_trust" noContainer accent className="!py-8 sm:!py-10">
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 max-w-5xl mx-auto text-center">
          {cro.trust.map((t) => {
            const statClass =
              "text-3xl sm:text-4xl font-medium tracking-tight bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent";
            return (
              <div key={t.label} className="flex flex-col items-center">
                <dt className={statClass}>
                  {t.kind === "count"
                    ? countLabel
                    : t.kind === "num"
                      ? `${t.value}${t.suffix ?? ""}`
                      : t.value}
                </dt>
                <dd className="mt-1 text-base text-muted-foreground/80 leading-tight">{t.label}</dd>
              </div>
            );
          })}
        </dl>
      </Section>

      {/* Hardware + run-anywhere reassurance — early objection killer. */}
      {cro.platform ? (
        <Section dataSection="cro_platform" noContainer className="!py-12 sm:!py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {[
              { Icon: Cpu, title: cro.platform.hardwareTitle, sub: cro.platform.hardwareSub },
              { Icon: MonitorSmartphone, title: cro.platform.anywhereTitle, sub: cro.platform.anywhereSub },
            ].map((c) => (
              <div key={c.title} className="flex flex-col items-center text-center sm:items-start sm:text-start rounded-xl border border-border/40 p-6 sm:p-8">
                <c.Icon className="h-7 w-7 text-primary mb-4" strokeWidth={2} />
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight mb-2">{c.title}</h3>
                <p className="text-base text-muted-foreground/70 leading-snug">{c.sub}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* The whole pitch in one heading — kills tool-choice paralysis. */}
      <Section id="bundle" dataSection="cro_bundle_intro" noContainer accent={shift} className="!py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-4">
            {cro.bundle.heading}
            <span className="block bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {cro.bundle.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground/70 leading-snug">
            {cro.bundle.sub}
          </p>
        </div>
      </Section>

      {/* Four benefit blocks. The "See details" link is the only exit. */}
      <div>
        {cro.benefits.map((b, i) => {
          const reverse = i % 2 === 1;
          const href = featureLinks[FEATURE_LINK_MAP[i]]?.href ?? "#";
          return (
            <Section key={b.tag} dataSection={`cro_benefit_${i}`} noContainer accent={(i % 2 === 0) !== shift} className="!py-16">
              <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto">
                <div className={`flex flex-col items-center text-center ${reverse ? "lg:order-2 lg:items-start lg:text-start" : "lg:items-end lg:text-end"}`}>
                  <div className="inline-flex items-center gap-2 text-primary mb-4">
                    <b.Icon className="h-5 w-5" strokeWidth={2} />
                    <span className="text-[11px] uppercase tracking-widest font-medium">{b.tag}</span>
                  </div>
                  <h3 className="text-[1.6rem] sm:text-3xl lg:text-[2.25rem] font-medium tracking-tight leading-[1.1] mb-5">
                    {b.title}
                  </h3>
                  <ul className={`flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-x-4 sm:gap-y-2 ${reverse ? "lg:justify-start" : "lg:justify-end"}`}>
                    {b.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-base text-foreground/85">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-amber-400" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-3 mt-6 ${reverse ? "lg:justify-start" : "lg:justify-end"}`}>
                    <DemoButton
                      text={texts.demoText}
                      locale={locale}
                      variant={DEMO_VARIANTS[i]}
                      trackEvent={`l_cro_benefit_${i}_demo`}
                      className="!text-base"
                    />
                    <LinkForward
                      href={href}
                      trackEvent={`l_cro_benefit_${i}_details`}
                      className="inline-flex items-center gap-1.5 text-base font-medium text-primary hover:gap-2.5 transition-all"
                    >
                      {cro.seeDetails}
                      <ArrowRight className="h-4 w-4" />
                    </LinkForward>
                  </div>
                </div>
                <div className={reverse ? "lg:order-1" : ""}>
                  <div className={`relative w-full lg:max-w-[26rem] aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/5 ${reverse ? "lg:ml-auto" : "lg:mr-auto"}`}>
                    <Image src={b.image} alt={b.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      {/* One system, the whole restaurant — guest / kitchen / management,
          capped with the mid-page CTA (merged from the old recap section).
          The breadth items from the old "everything else" grid now live inside
          these three groups.
          Falls back to the legacy four-step "how" for not-yet-migrated locales. */}
      {cro.activities ? (
        <Section dataSection="cro_activities" noContainer accent={!shift} className="!py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-3">
                {cro.activities.heading}
                <span className="block bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                  {cro.activities.headingAccent}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground/70 leading-snug max-w-2xl mx-auto">{cro.activities.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {cro.activities.groups.map((g) => (
                <div key={g.tag} className="flex flex-col rounded-xl border border-border/40 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 text-primary mb-5">
                    <g.Icon className="h-5 w-5" strokeWidth={2} />
                    <span className="text-[11px] uppercase tracking-widest font-medium">{g.tag}</span>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {g.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-base text-foreground/85 leading-snug">
                        <span className="h-1.5 w-1.5 shrink-0 mt-2 rounded-full bg-gradient-to-br from-primary to-amber-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 sm:mt-12 flex justify-center">
              <CtaButton text={texts.homeCtaText} microcopy={texts.microcopy} locale={locale} align="center" trackEvent="l_cro_midcta_cta_click" />
            </div>
          </div>
        </Section>
      ) : cro.how ? (
        <Section dataSection="cro_how" noContainer accent={!shift} className="!py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-3">
                {cro.how.heading}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground/70 leading-snug">{cro.how.sub}</p>
            </div>
            <ol className="grid grid-cols-1 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-3xl lg:max-w-none mx-auto">
              {cro.how.steps.map((s) => (
                <li key={s.n} className="flex items-start gap-4 sm:gap-5 lg:flex-col lg:gap-4 rounded-xl border border-border/40 p-4 sm:p-6">
                  <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-400 text-white text-sm sm:text-base font-semibold">
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{s.t}</h3>
                    <p className="text-base text-muted-foreground/70 leading-snug">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      ) : null}

      {/* One plan, everything in. */}
      <Section id="pricing" dataSection="cro_pricing" noContainer accent={shift} className="!py-16">
        <div className="max-w-4xl mx-auto">
          <PricingHero locale={locale} ctaText={texts.ctaText} demoText={texts.demoText} microcopy={texts.microcopy} texts={texts.pricingHero!} trackPrefix="l_cro_pricing" />
        </div>
      </Section>

      {/* Authenticity / trust. */}
      <Section dataSection="cro_founder" noContainer accent={!shift} className="!py-16">
        <Founder texts={texts.founder} />
      </Section>

      {/* Objection killers. */}
      <Section id="faq" dataSection="cro_faq" noContainer accent={shift} className="!py-16">
        <Faq texts={texts.faq} centered />
      </Section>

      {/* Last push. */}
      <Section dataSection="cro_final_cta" noContainer accent={!shift} className="!py-16">
        <FinalCta texts={texts.finalCta} ctaText={texts.ctaText} demoText={texts.demoText} microcopy={texts.microcopy} locale={locale} centered />
      </Section>

      {helpBanner ? <HelpBannerSection banner={helpBanner} source="home" accent={shift} /> : null}

      <Section as="footer" dataSection="cro_footer" noContainer accent={!!helpBanner !== shift} className="!py-6 sm:!py-8">
        <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} />
      </Section>
    </main>
  );
}
