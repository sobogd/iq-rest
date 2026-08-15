import { LinkForward } from "../components/link-forward";
import { DemoButton } from "../components/demo-button";
import { PageTracker } from "../components/page-tracker";
import { LandingHeader } from "../components/header";
import { LandingHeroV2, type HeroV2Copy } from "../components/landing-hero-v2";
import { Phone, Tablet } from "../components/device-mockups";
import { PAGE, Band, Content, DEMO_BTN } from "../components/shell";
import { FinalCta } from "../components/final-cta";
import { LandingFooter } from "../components/footer";
import type { LandingTexts } from "../types";
import { getIcon, type IconKey } from "../lib/icons";
import { localizedFeatureLinks } from "@/lib/locale-slug-overrides";

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
  /** Label of this section's demo button — worded for what it actually shows
   *  (guest view for the menu, the reservations screen for booking). */
  demoLabel: string;
  bullets: { icon: IconKey; title: string; sub: string }[];
};

export type CroMenuSection = CroSpotlight & {
  /** Alt text for the section's scene render. */
  mockupAlt: string;
};

export type CroReservationsSection = CroSpotlight & {
  mockupAlt: string;
};

export type CroOrdersSection = CroSpotlight & {
  /** The orders board isn't among the hero mockups, so the card carries its
   *  own screenshot. */
  mockupSrc: string;
  mockupAlt: string;
};

export type CroKdsSection = CroSpotlight & {
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
  orders: CroOrdersSection;
  kds: CroKdsSection;
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
  /** Override for the closing CTA band. Falls back to texts.finalCta. */
  finalCta?: { heading: string; headingAccent: string; sub: string };
};

// The demo is the primary, brand-gradient button; "learn more" the quiet
// outline next to it (shared shell classes + gradient overrides for the
// DemoButton's own skin).
const DEMO_CLASS =
  "inline-flex items-center justify-center " +
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

        {/* "Learn more" is the primary CTA (feature page = the conversion
            path); the demo is a quiet secondary next to it. `mt-auto` keeps
            the CTAs on one line across cards of unequal text length. */}
        <div className="flex flex-wrap items-center gap-3 mt-auto">
          <LinkForward href={href} trackName={`${section} details`} className={DEMO_CLASS}>
            {copy.moreLabel}
          </LinkForward>
          {demo}
        </div>
      </div>
    </article>
  );
}

export function CroHomeTemplateV2({
  locale,
  texts,
  cro,
  count,
  page = "home",
}: {
  locale: string;
  texts: LandingTexts;
  cro: CroCopyV2;
  /** Restaurant-count label ("500+"); substituted for "{count}" in the bullet copy. */
  count: string;
  page?: string;
}) {
  const featureLinks = localizedFeatureLinks(locale, texts.footer.featureLinks);
  const withCount = (s: string) => s.replace("{count}", count);
  // One gap everywhere on the page — the same step that separates two cards.
  return (
    <main className={PAGE}>
      <PageTracker page={page} />
      <LandingHeader
        texts={texts.header}
        locale={locale}
        useLocalAnchors
        featureLinks={featureLinks}
        compact
        navLayout="grouped"
      />

      <Content>
        <LandingHeroV2 locale={locale} copy={cro.heroV2} />

        {/* Four benefit bullets, straight under the hero. Cards with an outline
            only — no fill, so the band stays as light as the rest of the page. */}
        <Band section="hero_cards" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
        </Band>

        {/* The two features people come for, as cards: artwork on a warm tint,
            then the copy. Two per row on desktop, one on mobile. */}
        <Band section="cro_features" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FeatureCard
              section="cro_menu"
              copy={cro.menu}
              href={featureLinks[0]?.href ?? "#"}
              tint="bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)]"
              demo={
                <DemoButton
                  text={cro.menu.demoLabel}
                  locale={locale}
                  variant="phone"
                  trackName="Menu section demo"
                  className={DEMO_BTN}
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
                  text={cro.reservations.demoLabel}
                  locale={locale}
                  variant="reservations"
                  trackName="Reservations section demo"
                  className={DEMO_BTN}
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

            <FeatureCard
              section="cro_orders"
              copy={cro.orders}
              href={featureLinks[1]?.href ?? "#"}
              tint="bg-[hsl(45_44%_92%)] dark:bg-[hsl(45_14%_14%)]"
              demo={
                <DemoButton
                  text={cro.orders.demoLabel}
                  locale={locale}
                  variant="orders"
                  trackName="Orders section demo"
                  className={DEMO_BTN}
                />
              }
              art={
                /* Same framing as the reservations tablet. */
                <div className="absolute inset-x-0 top-[18%] flex justify-center">
                  <Tablet
                    className="w-[72%]"
                    image={{ src: cro.orders.mockupSrc, alt: cro.orders.mockupAlt }}
                  />
                </div>
              }
            />

            <FeatureCard
              section="cro_kds"
              copy={cro.kds}
              href={featureLinks[3]?.href ?? "#"}
              tint="bg-[hsl(24_40%_92%)] dark:bg-[hsl(24_14%_14%)]"
              demo={
                <DemoButton
                  text={cro.kds.demoLabel}
                  locale={locale}
                  variant="tablet"
                  trackName="KDS section demo"
                  className={DEMO_BTN}
                />
              }
              art={
                <div className="absolute inset-x-0 top-[18%] flex justify-center">
                  <Tablet
                    className="w-[72%]"
                    image={{ src: cro.heroV2.mockups.kds.src, alt: cro.kds.mockupAlt }}
                  />
                </div>
              }
            />
        </Band>

        <Band section="final_cta">
          <FinalCta
            texts={cro.finalCta ?? texts.finalCta}
            ctaText={texts.ctaText}
            demoText={texts.demoText}
            microcopy={texts.microcopy}
            locale={locale}
            count={count}
          />
        </Band>
      </Content>

      <LandingFooter texts={texts.footer} headerTexts={texts.header} locale={locale} routeKey="/" />
    </main>
  );
}
