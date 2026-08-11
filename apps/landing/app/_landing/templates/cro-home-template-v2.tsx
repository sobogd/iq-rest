import Image from "next/image";
import { ArrowRight, Cpu, MonitorSmartphone } from "lucide-react";
import { LinkForward } from "../components/link-forward";
import { DemoButton, type DemoVariant } from "../components/demo-button";
import { PageTracker } from "../components/page-tracker";
import { LandingHeader } from "../components/header";
import { LandingHeroV2, type HeroV2Copy } from "../components/landing-hero-v2";
import { Phone, Tablet } from "../components/device-mockups";
import { NARROW, PAGE, Band, DEMO_BTN, OUTLINE_BTN } from "../components/shell";
import { CtaButton } from "../components/cta-button";
import { PricingCta } from "../components/pricing-cta";
import { Founder } from "../components/founder";
import { Faq } from "../components/faq";
import { FinalCta } from "../components/final-cta";
import { LandingFooter } from "../components/footer";
import { getHelpBanner } from "../help/registry";
import { HelpBannerCta } from "../help/help-banner-cta";
import type { LandingTexts } from "../types";
import { featureLabel } from "@/lib/track-keys";
import { getIcon, type IconKey } from "../lib/icons";

// V2 home template — the light two-column hero with the device slider and a
// four-card benefit strip (emoji cards), followed by the feature/benefit/
// activity bands below the fold.

export type CroCardV2 = {
  icon: IconKey;
  /** Tailwind colour class for the icon. */
  iconClass?: string;
  title: string;
  sub: string;
};

/** A feature spotlight under the bullets band: copy on one side, a device
 *  mockup on the other. The digital-menu and reservations blocks share it. */
export type CroSpotlight = {
  heading: string;
  /** Lead paragraph. `link` is the sentence that carries the internal link to
   *  the feature page; `rest` follows as plain text. */
  sub: { link: string; rest: string };
  /** Label of the outline button next to the demo — same target as the link. */
  moreLabel: string;
  bullets: { icon: IconKey; title: string; sub: string }[];
};

export type CroMenuSection = CroSpotlight & {
  /** Alt text for the section's scene render. */
  mockupAlt: string;
};

export type CroReservationsSection = CroSpotlight & {
  mockupAlt: string;
};

export type CroBenefit = {
  icon: IconKey;
  tag: string;
  title: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export type CroActivityGroup = { icon: IconKey; tag: string; bullets: string[] };

export type CroCopyV2 = {
  heroV2: HeroV2Copy;
  /** Four benefit cards right under the hero (launch / support / trust / brand). */
  heroCards: CroCardV2[];
  menu: CroMenuSection;
  reservations: CroReservationsSection;
  bundle: { heading: string; headingAccent: string; sub: string };
  benefits: CroBenefit[];
  /** Per-benefit "learn more" link label. */
  seeDetails: string;
  /** Hardware + run-anywhere reassurance band, shown right after the hero
   *  cards — kills the "do I need to buy hardware?" objection early.
   *  Optional; locales without it skip the band. */
  platform?: {
    hardwareTitle: string;
    hardwareSub: string;
    anywhereTitle: string;
    anywhereSub: string;
  };
  /** Three activity groups — guest, kitchen, management — each a column of
   *  one-line value bullets, framing the product as one system that covers
   *  the whole restaurant. Optional; locales without it skip the band. */
  activities?: {
    heading: string;
    headingAccent: string;
    sub: string;
    groups: CroActivityGroup[];
  };
};

// The demo is the primary, brand-gradient button; "learn more" the quiet
// outline next to it (shared shell classes + gradient overrides for the
// DemoButton's own skin).
const DEMO_CLASS =
  DEMO_BTN +
  " !text-white !border-0 !bg-gradient-to-br !from-[hsl(9,100%,58%)] !to-[hsl(35,95%,55%)]" +
  " hover:!opacity-90";

// A feature card: 16:9 artwork on a warm tint, then heading, lead, features
// and the CTAs. Two per row on desktop, one on mobile.
function FeatureCard({
  section,
  copy,
  href,
  demo,
  art,
  tint,
}: {
  section: string;
  copy: CroSpotlight;
  href: string;
  demo: React.ReactNode;
  /** Device mockup, cropped by the artwork box. */
  art: React.ReactNode;
  /** Warm pale background behind the mockup. */
  tint: string;
}) {
  return (
    <article
      data-section={section}
      className="flex flex-col overflow-hidden rounded-2xl border border-border"
    >
      <div className={`relative aspect-[16/9] overflow-hidden ${tint}`}>{art}</div>

      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
            {copy.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
            <LinkForward
              href={href}
              trackName={`${section} sub link`}
              className="text-primary hover:opacity-70 transition-opacity"
            >
              {copy.sub.link}
            </LinkForward>
            {copy.sub.rest}
          </p>
        </div>

        <ul className="flex flex-col gap-5">
          {copy.bullets.map((b) => {
            const Icon = getIcon(b.icon);
            return (
              <li key={b.title} className="flex items-start gap-3">
                <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.75} />
                <div>
                  <h3 className="font-semibold text-base">{b.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{b.sub}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Header pairing repeated: a button for the demo, a bare link for the
            feature page. `mt-auto` keeps the CTAs on one line across cards of
            unequal text length. */}
        <div className="flex items-center gap-3 mt-auto">
          {demo}
          <LinkForward href={href} trackName={`${section} details`} className={OUTLINE_BTN}>
            {copy.moreLabel}
          </LinkForward>
        </div>
      </div>
    </article>
  );
}

// Benefit order is [menu, kitchen, reservations, orders]; the footer feature
// links are [digital menu, order taking, table booking, kitchen display].
const FEATURE_LINK_MAP = [0, 3, 2, 1];
const DEMO_VARIANTS: DemoVariant[] = ["phone", "tablet", "reservations", "orders"];
const BENEFIT_KEYS = ["digital", "kds", "bookings", "orders"];
const benefitKey = (i: number) => BENEFIT_KEYS[i] ?? `benefit_${i + 1}`;
const benefitLabel = (i: number) => featureLabel(benefitKey(i));

export function CroHomeTemplateV2({
  locale,
  texts,
  cro,
  count,
  aboutHref,
  page = "home",
}: {
  locale: string;
  texts: LandingTexts;
  cro: CroCopyV2;
  /** Live restaurant count; substituted for "{count}" in the bullet copy. */
  count: number;
  /** About page for this locale — the slug is per-locale, so it comes in. */
  aboutHref?: string;
  page?: string;
}) {
  const featureLinks = texts.footer.featureLinks;
  const countLabel = count.toLocaleString(locale);
  const withCount = (s: string) => s.replace("{count}", countLabel);
  const helpBanner = getHelpBanner(locale);
  // One gap everywhere on the page — the same step that separates two cards.
  return (
    <main className={PAGE}>
      <PageTracker page={page} />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        useLocalAnchors
        featureLinks={featureLinks}
        helpHref={helpBanner?.href}
        aboutHref={aboutHref}
        containerClass={NARROW}
        compact
        navLayout="grouped"
      />

      <LandingHeroV2 locale={locale} copy={cro.heroV2} />

      {/* Four benefit bullets, straight under the hero. */}
      <Band section="hero_cards">
        {/* Cards with an outline only — no fill, so the band stays as light as
            the rest of the page. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cro.heroCards.map((c) => {
            const Icon = getIcon(c.icon);
            return (
              <div
                key={c.title}
                className="flex flex-col gap-1.5 rounded-2xl border border-border p-5 sm:p-6"
              >
                <Icon className={`h-7 w-7 mb-1 ${c.iconClass ?? "text-primary"}`} strokeWidth={1.75} />
                {/* Not a heading: the band sits between the h1 and the first h2,
                    so an h3 here would skip a level in the outline. */}
                <p className="font-semibold text-base">{withCount(c.title)}</p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{withCount(c.sub)}</p>
              </div>
            );
          })}
        </div>
      </Band>

      {/* The two features people come for, as cards: artwork on a warm tint,
          then the copy. Two per row on desktop, one on mobile. */}
      <Band section="cro_features">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureCard
            section="cro_menu"
            copy={cro.menu}
            href={featureLinks[0]?.href ?? "#"}
            tint="bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)]"
            demo={
              <DemoButton
                text={texts.demoText}
                locale={locale}
                variant="phone"
                trackName="Menu section demo"
                className={DEMO_CLASS}
              />
            }
            art={
              /* Each phone runs off one edge of the artwork — the left one down,
                 the right one up — losing the frame and corner radius on that
                 side only. Screen ratios are the screenshots' own, so both
                 screenshots stay whole. */
              <div className="absolute inset-0 flex justify-center gap-4">
                <Phone
                  cropBottom
                  ratio="720 / 1313"
                  className="w-[30%] self-end"
                  image={{ src: cro.heroV2.mockups.phone1.src, alt: cro.menu.mockupAlt }}
                />
                <Phone
                  cropTop
                  ratio="720 / 1278"
                  className="w-[30%] self-start"
                  image={{ src: cro.heroV2.mockups.phone2.src, alt: "" }}
                />
              </div>
            }
          />

          <FeatureCard
            section="cro_reservations"
            copy={cro.reservations}
            href={featureLinks[2]?.href ?? "#"}
            tint="bg-[hsl(18_40%_92%)] dark:bg-[hsl(18_14%_14%)]"
            demo={
              <DemoButton
                text={texts.demoText}
                locale={locale}
                variant="reservations"
                trackName="Reservations section demo"
                className={DEMO_CLASS}
              />
            }
            art={
              /* Tablet cut off at the bottom edge of the artwork box. */
              <div className="absolute inset-x-0 top-[18%] flex justify-center">
                <Tablet
                  className="w-[72%]"
                  image={{
                    src: cro.heroV2.mockups.reservations.src,
                    alt: cro.reservations.mockupAlt,
                  }}
                />
              </div>
            }
          />
        </div>
      </Band>

      {/* Hardware + run-anywhere reassurance — early objection killer. */}
      {cro.platform ? (
        <Band section="cro_platform">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
        </Band>
      ) : null}

      {/* The whole pitch in one heading — kills tool-choice paralysis. */}
      <Band section="cro_bundle_intro" id="bundle">
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
      </Band>

      {/* Four benefit blocks. The "See details" link is the only exit. */}
      {cro.benefits.map((b, i) => {
          const reverse = i % 2 === 1;
          const href = featureLinks[FEATURE_LINK_MAP[i]]?.href ?? "#";
          const Icon = getIcon(b.icon);
          return (
            <Band key={b.tag} section={`benefit_${benefitKey(i)}`}>
              <div className="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2 lg:items-center">
                <div className={`flex flex-col items-center text-center ${reverse ? "lg:order-2 lg:items-start lg:text-start" : "lg:items-end lg:text-end"}`}>
                  <div className="inline-flex items-center gap-2 text-primary mb-4">
                    <Icon className="h-5 w-5" strokeWidth={2} />
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
                      trackName={`${benefitLabel(i)} demo`}
                      className="!text-base"
                    />
                    <LinkForward
                      href={href}
                      trackName={`${benefitLabel(i)} details link`}
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
            </Band>
          );
        })}

      {/* One system, the whole restaurant — guest / kitchen / management. */}
      {cro.activities ? (
        <Band section="cro_activities">
          <div>
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
              {cro.activities.groups.map((g) => {
                const Icon = getIcon(g.icon);
                return (
                <div key={g.tag} className="flex flex-col rounded-xl border border-border/40 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 text-primary mb-5">
                    <Icon className="h-5 w-5" strokeWidth={2} />
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
                );
              })}
            </div>
            <div className="mt-10 sm:mt-12 flex justify-center">
              <CtaButton text={texts.homeCtaText} microcopy={texts.microcopy} locale={locale} align="center" trackName="Mid page CTA" />
            </div>
          </div>
        </Band>
      ) : null}

      {/* À-la-carte pricing CTA linking to the locale's /pricing quiz. */}
      <Band section="cro_pricing" id="pricing">
        <PricingCta locale={locale} texts={texts.pricingCta} />
      </Band>

      {/* Authenticity / trust. */}
      <Band section="cro_founder">
        <Founder texts={texts.founder} />
      </Band>

      {/* Objection killers. */}
      <Band section="cro_faq" id="faq">
        <Faq texts={texts.faq} centered />
      </Band>

      {/* Last push. */}
      <Band section="cro_final_cta">
        <FinalCta texts={texts.finalCta} ctaText={texts.ctaText} demoText={texts.demoText} microcopy={texts.microcopy} locale={locale} centered />
      </Band>

      {helpBanner ? (
        <Band section="help_banner" id="help-banner">
          <HelpBannerCta banner={helpBanner} source="home" />
        </Band>
      ) : null}

      <footer data-section="cro_footer" className="w-full">
        <div className={NARROW}>
          <LandingFooter
            texts={texts.footer}
            headerTexts={texts.header}
            locale={locale}
            helpHref={helpBanner?.href}
            aboutHref={aboutHref}
          />
        </div>
      </footer>
    </main>
  );
}
