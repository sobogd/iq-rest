"use client";

import Image from "next/image";
import {
  Clock,
  Coffee,
  CreditCard,
  Hotel,
  Martini,
  Pizza,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { DemoButton } from "./demo-button";
import { Phone, Tablet } from "./device-mockups";
import { BTN_BOX, DEMO_BTN } from "./shell";
import { usePrimaryCta } from "./onboarding/use-primary-cta";

// V2 hero — light two-column layout: copy + CTAs on the left, a static group
// of four device mockups on the right. The composition mirrors the FB ad
// creative (ad-assets/make_square.js): KDS tablet lower-left, reservations
// tablet upper-right, two phones overlapping at the tablets' bottom edge —
// so visitors landing from the mockup ads see the same picture. All
// positions are percentages of the group container, so the layout is
// identical on mobile and desktop, just scaled.

export interface HeroV2Mockup {
  src: string;
  alt: string;
}

// This is a client component, so the copy it receives must be plain data —
// a Lucide component can't cross the server→client boundary. The per-locale
// files therefore name an icon, and the mapping to the real component lives
// here, on the client side.
const HERO_ICONS = {
  restaurant: UtensilsCrossed,
  cafe: Coffee,
  bar: Martini,
  hotel: Hotel,
  pizza: Pizza,
  card: CreditCard,
  clock: Clock,
} satisfies Record<string, LucideIcon>;

export type HeroV2IconName = keyof typeof HERO_ICONS;

/** A label with its own icon — used for the vertical chips and the
 *  reassurance line under the CTAs. `iconClass` carries the icon's colour. */
export interface HeroV2Item {
  icon: HeroV2IconName;
  label: string;
  iconClass?: string;
}

export interface HeroV2Copy {
  /** Establishment types shown above the headline. */
  verticals: HeroV2Item[];
  title: string;
  /** Accent part of the headline, rendered with the brand gradient. */
  titleAccent: string;
  /** Text after the accent (e.g. a trailing "."). */
  titleAfter?: string;
  sub: string;
  primaryLabel: string;
  demoLabel: string;
  /** Reassurances under the CTA row (no card required, trial length, …).
   *  Optional — the card layout drops them and lets the CTAs sit on the
   *  bottom edge instead. */
  microcopy?: HeroV2Item[];
  mockups: {
    kds: HeroV2Mockup;
    reservations: HeroV2Mockup;
    phone1: HeroV2Mockup;
    phone2: HeroV2Mockup;
  };
}

function IconLabel({ item }: { item: HeroV2Item }) {
  const Icon = HERO_ICONS[item.icon];
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className={`h-4 w-4 shrink-0 ${item.iconClass ?? "text-muted-foreground"}`} strokeWidth={2} />
      {item.label}
    </span>
  );
}

export function LandingHeroV2({ locale, copy }: { locale: string; copy: HeroV2Copy }) {
  const cta = usePrimaryCta(copy.primaryLabel);
  const m = copy.mockups;

  return (
    <section data-section="hero">
      {/* One big card, same construction as the feature cards below: copy on
          the left, a tinted panel with the devices on the right. */}
      <div className="overflow-hidden rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[11fr_9fr]">
        <div className="order-2 lg:order-1 min-w-0 flex flex-col items-start text-start gap-6 p-6 sm:p-8">
          <span className="flex flex-wrap items-center justify-start gap-x-4 gap-y-1 text-sm text-muted-foreground/80">
            {copy.verticals.map((v) => (
              <IconLabel key={v.label} item={v} />
            ))}
          </span>

          {/* my-auto centres the headline block between the pinned verticals
              above and the pinned CTAs below. */}
          <div className="my-auto min-w-0 flex flex-col gap-4">
            {/* sm:whitespace-nowrap: the accent is the payoff of the headline —
                kept on one line once there's room, but free to wrap on
                narrow mobile widths where forcing it caused overflow. */}
            <h1 className="text-4xl sm:text-[2.5rem] font-medium tracking-tight leading-[1.1]">
              {copy.title}{" "}
              <span className="sm:whitespace-nowrap bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                {copy.titleAccent}
                {copy.titleAfter}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
              {copy.sub}
            </p>
          </div>

          {/* mt-auto: the CTAs sit on the bottom edge of the card, level with
              the artwork panel next to them. */}
          {/* Same pair as the feature cards below: a brand-gradient primary and
              a quiet outline next to it, both in the header's button box. */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => cta.onClick("Hero CTA")}
              className={`inline-flex items-center justify-center ${BTN_BOX} text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] hover:opacity-90 active:scale-[0.99] transition-all`}
            >
              {cta.label}
            </button>
            <DemoButton
              text={copy.demoLabel}
              locale={locale}
              trackName="Hero demo"
              variant="phone"
              className={DEMO_BTN}
            />
          </div>
        </div>

        {/* Artwork panel: two tablets and two phones on a warm tint, each
            running off an edge — the panel's overflow does the cropping, so the
            group reads as a slice of a bigger scene. */}
        <div className="order-1 lg:order-2 relative overflow-hidden bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)] aspect-[4/3] lg:aspect-auto lg:min-h-[21.5rem]">
          <div className="absolute left-[-10%] top-[8%] w-[68%] z-0">
            <Tablet image={m.kds} priority sizes="(max-width: 1024px) 60vw, 380px" />
          </div>
          <div className="absolute right-[-14%] top-[23%] w-[64%] z-10">
            <Tablet image={m.reservations} sizes="(max-width: 1024px) 58vw, 360px" />
          </div>
          {/* The phones overlap: the front one covers a slice of the one
              behind, so the pair reads as a stack, not a row. */}
          <div className="absolute left-[14%] bottom-0 w-[30%] z-20">
            <Phone cropBottom ratio="720 / 1313" image={m.phone1} sizes="(max-width: 1024px) 28vw, 170px" />
          </div>
          <div className="absolute left-[36%] bottom-0 w-[30%] z-30">
            <Phone cropBottom ratio="720 / 1278" image={m.phone2} sizes="(max-width: 1024px) 28vw, 170px" />
          </div>
      </div>
      </div>
    </section>
  );
}
