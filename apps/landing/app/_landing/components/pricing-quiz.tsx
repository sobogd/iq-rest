"use client";

// billing-features-constructor — landing "build your plan" (card-select).
//
// Tap-to-select feature cards. Layout is JUMP-FREE by construction:
//  · both card states use border-2 + no transform (only color/shadow change)
//  · the "Select everything" label never changes width
//  · the price bar stacks on mobile (price row, full-width CTA) so any magnitude
//    (€300 or €1,300 or 900,000 HUF) never collides with the button
//  · the sub-line under the price is ALWAYS rendered (min-height) so it can't
//    push the layout when a discount appears; the big number is always the
//    per-month price, the actual billed total lives in the sub-line
// Prices come from the same catalog as checkout (dashboard-api /api/pricing).
// Localized via `texts` (per-locale LandingTexts.pricingQuiz, EN fallback);
// min font size is text-sm (micro badges aside).

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { UtensilsCrossed, CalendarClock, ChefHat, Globe, Check, Receipt, Percent } from "lucide-react";
import {
  DEFAULT_PRICING_CATALOG,
  computeAccountQuote,
  type PricingCatalog,
  type CurrencyPricing,
  type VenueSelection,
} from "@iq-rest/pricing";
import { dashboardApiBase } from "@/lib/dashboard-url";
import { currencyInfo, formatMoney } from "@/lib/country-currency-map";
import { useCurrency } from "../lib/currency-context";
import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { CurrencySelector, CurrencyOverlay } from "./currency-selector";
import { RestaurantCountOverlay } from "./restaurant-count-selector";
import { PRIMARY_BTN, PRIMARY_FILL } from "./shell";
import { analytics } from "@/lib/analytics";
import { useLandingLocale } from "../lib/landing-strings";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import type { PricingQuizTexts } from "../types";

type Cycle = "month" | "year";
type AddonKey = "reservations" | "ordersKds" | "domain";

// The keys are code identifiers ("ordersKds"); event names are read by a human
// scanning a timeline, so they carry words instead.
const ADDON_LABEL: Record<AddonKey, string> = {
  reservations: "reservations",
  ordersKds: "orders and kitchen display",
  domain: "own domain",
};

export const EN_PRICING_QUIZ: PricingQuizTexts = {
  heading: "Build a plan ",
  headingAccent: "for your restaurant",
  sub: "Start with the menu, add reservations, kitchen display, or a custom domain — and drop them just as easily when you don't.",
  billingLabel: "Billing:",
  monthly: "Monthly",
  yearly: "Yearly",
  restaurantsLabel: "Restaurants:",
  fewerAria: "Fewer restaurants",
  moreAria: "More restaurants",
  menuTitle: "Digital menu and website",
  menuHint: "Always included",
  reservationsTitle: "Online table bookings",
  reservationsHint: "Table bookings",
  kdsTitle: "Kitchen display for orders",
  kdsHint: "Orders on a kitchen screen",
  domainTitle: "Your own domain for the menu",
  domainHint: "Your own web address",
  perMonthSuffix: "/mo",
  perYearSuffix: "/year",
  perMonthLongSuffix: "/month",
  saveYearlyTemplate: "Save {amount} a year with yearly billing",
  volumeDiscountTemplate: "Discount {percent}%",
  saveUpToHint: "Save up to 50% with 5+ restaurants",
  restaurantOne: "restaurant",
  restaurantFew: "restaurants",
  restaurantMany: "restaurants",
  billedYearly: "Billed once a year",
  billedMonthly: "Billed monthly",
  enterprisePre: "Need a custom plan?",
  enterpriseCta: "Talk to us",
  enterprisePost: "and we'll tailor one for you.",
  enterpriseWa: "Hi! I'd like a custom plan for my restaurants.",
  multiplePre: "Need more restaurants?",
  multipleCta: "Show options",
  multipleChangePre: "Different restaurant count?",
  multipleChangeCta: "Change",
};

export function PricingQuiz({ ctaText, texts }: { ctaText: string; texts?: PricingQuizTexts }) {
  const t = texts ?? EN_PRICING_QUIZ;
  const ADDONS: { key: AddonKey; label: string; hint: string; Icon: typeof CalendarClock }[] = [
    { key: "reservations", label: t.reservationsTitle, hint: t.reservationsHint, Icon: CalendarClock },
    { key: "ordersKds", label: t.kdsTitle, hint: t.kdsHint, Icon: ChefHat },
    { key: "domain", label: t.domainTitle, hint: t.domainHint, Icon: Globe },
  ];
  const { currency, setCurrency } = useCurrency();
  const locale = useLandingLocale();
  const [catalog, setCatalog] = useState<PricingCatalog>(DEFAULT_PRICING_CATALOG);
  const [count, setCount] = useState(1);
  const [cycle, setCycle] = useState<Cycle>("year");
  const [feat, setFeat] = useState<Record<AddonKey, boolean>>({
    reservations: false,
    ordersKds: false,
    domain: false,
  });
  const cta = usePrimaryCta(ctaText);

  // Sliding thumb sized to each label's own width (not a fixed 50/50 split)
  // — measured from the actual buttons so it always matches, whatever the
  // locale's word lengths are.
  // `measured` stays false until the layout effect below has read real
  // pixels — before that (server render + first client paint) the active
  // button carries its own bg-primary fill directly, so the default state
  // (yearly) shows correctly filled with no JS. The layout effect runs
  // synchronously before the browser paints, so the swap from "button's own
  // fill" to "thumb positioned under it" lands on the same pixels — no flash.
  const monthBtnRef = useRef<HTMLButtonElement>(null);
  const yearBtnRef = useRef<HTMLButtonElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [measured, setMeasured] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  // Mounted lazily on first open and never unmounted again afterwards, so
  // CurrencyOverlay's own opacity transition (driven by `open`) gets to
  // play on both open AND close — conditionally mounting/unmounting it
  // would skip the close animation entirely.
  const [currencyMounted, setCurrencyMounted] = useState(false);
  const [countOpen, setCountOpen] = useState(false);
  const [countMounted, setCountMounted] = useState(false);

  // "Show options" just opens the count overlay — no separate reveal state
  // or URL param needed. The trigger row underneath then shows itself once
  // `count > 1`, so most visitors (who never touch this) see nothing extra.
  const openCountOverlay = () => {
    analytics.track("Click", "Show multi-restaurant counter");
    setCountMounted(true);
    setCountOpen(true);
  };

  useLayoutEffect(() => {
    const el = cycle === "year" ? yearBtnRef.current : monthBtnRef.current;
    if (el) {
      setThumb({ left: el.offsetLeft, width: el.offsetWidth });
      setMeasured(true);
    }
  }, [cycle, t.monthly, t.yearly]);

  useEffect(() => {
    let alive = true;
    fetch(`${dashboardApiBase()}/api/pricing`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => alive && c?.currencies && setCatalog(c as PricingCatalog))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  const pricing: CurrencyPricing = catalog.currencies[currency] ?? catalog.currencies.EUR;
  const k = cycle === "year" ? "yr" : "mo";

  const venues = useMemo<VenueSelection[]>(() => {
    const sel: VenueSelection = { menuOnline: true, ...feat };
    return Array.from({ length: Math.max(1, count) }, () => sel);
  }, [feat, count]);

  const quote = useMemo(
    () => computeAccountQuote(catalog, currency, venues, cycle),
    [catalog, currency, venues, cycle],
  );

  // Per-row discount % for the count overlay — same addon mix, just a
  // different venue count than the one currently selected.
  const discountForCount = (n: number) => {
    const sel: VenueSelection = { menuOnline: true, ...feat };
    const rowVenues = Array.from({ length: n }, () => sel);
    return Math.round(computeAccountQuote(catalog, currency, rowVenues, cycle).discount * 100);
  };

  // Classic Slavic one/few/many split — safe up to n=20 (the overlay's list
  // length) for any language, since English's few/many are the same string.
  const pluralRestaurant = (n: number) => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return t.restaurantOne;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return t.restaurantFew;
    return t.restaurantMany;
  };
  const labelForCount = (n: number) => `${n} ${pluralRestaurant(n)}`;
  const discountLabelForCount = (n: number) => {
    const pct = discountForCount(n);
    return pct > 0 ? t.volumeDiscountTemplate.replace("{percent}", String(pct)) : null;
  };

  const info = currencyInfo[currency] ?? currencyInfo.EUR;
  const addonPrice = (key: AddonKey) => formatMoney(pricing[key][k], currency);

  // Yearly saving vs paying monthly (shown when Monthly is selected).
  const monthlyAnnual = useMemo(
    () => computeAccountQuote(catalog, currency, venues, "month").amountMajor * 12,
    [catalog, currency, venues],
  );
  const yearlyAnnual = useMemo(
    () => computeAccountQuote(catalog, currency, venues, "year").amountMajor,
    [catalog, currency, venues],
  );
  const yearlySaving = Math.max(0, Math.round((monthlyAnnual - yearlyAnnual) * 100) / 100);

  // The big number is ALWAYS the per-month price (yearly total looks scary);
  // the actual billed amount lives in the sub-line ("Billed …: X/year").
  const monthlyDisplay =
    cycle === "year" ? Math.round((quote.amountMajor / 12) * 100) / 100 : quote.amountMajor;
  const billedSuffix = cycle === "year" ? t.perYearSuffix : t.perMonthLongSuffix;

  return (
    // Same big hero card as the home hero / about intro: copy (here, the
    // checklist of what's included) on the left, the warm tinted panel on
    // the right — only there it carries device mockups or trust numbers and
    // here the live controls + price.
    <div className="overflow-hidden rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[11fr_9fr]">
      <div className="order-1 flex flex-col gap-5 p-5 sm:p-6">
        <div>
          <h1 className="text-[2rem] sm:text-[2.5rem] font-medium tracking-tight leading-[1.05] mb-3">
            {t.heading}
            {t.headingAccent ? (
              // sm:block forces the accent onto its own line on desktop only
              // — no hardcoded line break baked into the translated string.
              <span className="sm:block bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                {t.headingAccent}
              </span>
            ) : null}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Checklist, not cards — a checkbox + icon + title + price per row,
            so the options read as part of the copy instead of a separate
            tile grid. Titles carry enough (e.g. "always included") that a
            separate hint line underneath isn't needed. */}
        <div className="flex flex-col divide-y divide-border/60">
          <div className="flex items-center gap-3 py-3">
            <UtensilsCrossed className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
            <span className="flex-1 min-w-0 text-sm font-medium text-foreground">{t.menuTitle}</span>
            <span className="shrink-0 text-sm font-medium tabular-nums text-primary">
              {formatMoney(pricing.menu[k], currency)}
              <span className="font-normal opacity-70">{t.perMonthSuffix}</span>
            </span>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </div>

          {ADDONS.map(({ key, label, Icon }) => {
            const on = feat[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  analytics.track("Click", `Addon ${ADDON_LABEL[key]} ${on ? "off" : "on"}`);
                  setFeat((s) => ({ ...s, [key]: !s[key] }));
                }}
                className="flex items-center gap-3 -mx-2 rounded-lg px-2 py-3 text-left transition-colors hover:bg-muted/40"
              >
                <Icon className={`h-5 w-5 shrink-0 ${on ? "text-primary" : "text-muted-foreground"}`} strokeWidth={2} />
                <span className="flex-1 min-w-0 text-sm font-medium text-muted-foreground">{label}</span>
                <span className={`shrink-0 text-sm font-medium tabular-nums ${on ? "text-primary" : "text-muted-foreground"}`}>
                  +{addonPrice(key)}
                  <span className="font-normal opacity-70">{t.perMonthSuffix}</span>
                </span>
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    on ? "border-primary bg-primary text-primary-foreground" : "border-input text-transparent"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tinted panel — same warm bg as the home hero's device panel / the
          about page's facts panel. Three stacked sections, everything
          left-aligned: the cycle + restaurant-count controls pinned to the
          top (side by side, not stacked), the price/billed/CTA block centred
          vertically in the space between, and the enterprise line pinned to
          the bottom. Plain flex-col with a flex-1 middle section — no
          absolute positioning needed, top and bottom just fall out of
          normal flow. */}
      <div className="order-2 relative flex flex-col gap-8 sm:gap-4 p-5 sm:p-6 bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)]">
        {/* Top row: cycle switcher pinned left, currency pinned right — both
            label-free, ends of a justify-between row. The restaurant counter
            (still labelled) gets its own row below. */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="relative flex h-10 rounded-lg border border-border/60 bg-background/60 p-1">
            {/* Sliding thumb — width/position measured from the active
                button's own box (see the layout effect above), so each label
                keeps its natural width instead of both being forced into an
                even 50/50 split. Invisible until measured; the active
                button's own bg-primary carries the fill up to that point, so
                the default (yearly) still shows filled with no JS. */}
            <div
              className={`absolute top-1 h-[30px] rounded-md ${PRIMARY_FILL} transition-all duration-200 ease-out ${measured ? "opacity-100" : "opacity-0"}`}
              style={{ left: thumb.left, width: thumb.width }}
            />
            <button
              ref={monthBtnRef}
              type="button"
              onClick={() => {
                analytics.track("Click", "Billing cycle month");
                setCycle("month");
              }}
              className={`relative z-10 flex h-[30px] items-center justify-center px-3 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                cycle === "month"
                  ? `text-primary-foreground ${measured ? "" : PRIMARY_FILL}`
                  : "text-muted-foreground"
              }`}
            >
              {t.monthly}
            </button>
            <button
              ref={yearBtnRef}
              type="button"
              onClick={() => {
                analytics.track("Click", "Billing cycle year");
                setCycle("year");
              }}
              className={`relative z-10 flex h-[30px] items-center justify-center px-3 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                cycle === "year"
                  ? `text-primary-foreground ${measured ? "" : PRIMARY_FILL}`
                  : "text-muted-foreground"
              }`}
            >
              {t.yearly}
            </button>
          </div>

          <CurrencySelector
            value={currency}
            open={currencyOpen}
            onToggle={() => {
              setCurrencyMounted(true);
              setCurrencyOpen((o) => !o);
            }}
          />
        </div>

        {/* Price + CTA — same treatment as the about page's fact numbers: a
            big tracking-tight figure, the billed/savings lines under it (each
            with its own icon — a receipt for the billing fact, a percent
            badge for whichever savings message applies), the button stacked
            last. Centred in the flex-1 gap between the controls above and the
            enterprise line below. */}
        <div className="flex-1 flex flex-col items-start justify-center gap-2 sm:gap-3">
          <div className="flex items-baseline gap-1 whitespace-nowrap">
            {info.symbolPosition === "before" ? <span className="text-xl text-muted-foreground">{info.symbol}</span> : null}
            <span className="text-3xl sm:text-4xl font-medium tracking-tight tabular-nums leading-none">
              {monthlyDisplay.toLocaleString(locale, { minimumFractionDigits: Number.isInteger(monthlyDisplay) ? 0 : 2, maximumFractionDigits: 2 })}
            </span>
            {info.symbolPosition === "after" ? <span className="text-xl text-muted-foreground">{info.symbol}</span> : null}
            <span className="text-sm text-muted-foreground">{t.perMonthLongSuffix}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Receipt className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span>
                {cycle === "year" ? t.billedYearly : t.billedMonthly}: {formatMoney(quote.amountMajor, currency)}
                {billedSuffix}
              </span>
            </div>
            {/* Only the yearly-saving line — shown regardless of which cycle
                is currently selected (it's independent of `cycle`, always
                "monthly total over a year" vs "yearly total"), not just when
                on monthly. Volume-discount/multi-venue copy dropped: that
                lives in the count overlay's per-row percentages instead. */}
            <div className="flex items-center gap-1.5 text-sm min-h-5">
              {yearlySaving > 0 ? (
                <>
                  <Percent className="h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                  <span className="text-emerald-500 font-medium">
                    {t.saveYearlyTemplate.replace("{amount}", formatMoney(yearlySaving, currency))}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={() => cta.onClick("Pricing quiz CTA")}
            className={PRIMARY_BTN}
          >
            {cta.label}
          </button>
        </div>

        {/* Enterprise + multi-restaurant lines — pinned to the bottom, small
            text, left-aligned like everything else in the panel. The
            multi-restaurant one opens the count overlay directly instead of
            linking anywhere — no reason to send someone to WhatsApp just to
            add a second venue. No separate counter control anywhere else on
            the page, so this stays visible always — it's the only way back
            into the count overlay. */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground leading-snug">
            {t.multipleChangePre}{" "}
            <button
              type="button"
              onClick={openCountOverlay}
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {t.multipleChangeCta}
            </button>
          </p>
          <p className="text-sm text-muted-foreground leading-snug">
            {t.enterprisePre}{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.enterpriseWa)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              {t.enterpriseCta}
            </a>
          </p>
        </div>

        {currencyMounted ? (
          <CurrencyOverlay
            value={currency}
            open={currencyOpen}
            onChange={(next) => setCurrency(next, `Currency ${next}`)}
            onClose={() => setCurrencyOpen(false)}
          />
        ) : null}

        {countMounted ? (
          <RestaurantCountOverlay
            value={count}
            max={20}
            open={countOpen}
            onChange={(n) => {
              analytics.track("Click", `Venue count ${n}`);
              setCount(n);
            }}
            onClose={() => setCountOpen(false)}
            labelForCount={labelForCount}
            discountLabelForCount={discountLabelForCount}
          />
        ) : null}
      </div>
    </div>
  );
}
