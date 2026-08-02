// billing-features-constructor — compact pricing CTA block. Replaces the old
// fixed Basic/Pro plan cards (`PricingHero`) on home + feature pages: heading,
// one-liner, a geo-currency "from {price}/mo" line and a button linking to the
// locale's /pricing page (where the full à-la-carte quiz lives).

import { ArrowRight } from "lucide-react";
import { LOCALE_SLUG_OVERRIDES } from "@/lib/locale-slug-overrides";
import { localePath } from "@/lib/locale-paths";
import type { PricingCtaTexts } from "../types";
import { FromPrice, type PricingAddon } from "./from-price";

export const EN_PRICING_CTA: PricingCtaTexts = {
  heading: "Simple, flexible pricing",
  sub: "Pay only for the features you need — build your own plan in a minute.",
  fromTemplate: "from {price}/mo",
  button: "Calculate your plan",
};

export function PricingCta({
  locale,
  texts,
  addon = null,
}: {
  locale: string;
  texts?: PricingCtaTexts;
  /** Which paid add-on this page is about — the "from" price is the cheapest
   *  way to get it (menu base + addon, yearly rate, one restaurant). Null =
   *  menu only. */
  addon?: PricingAddon;
}) {
  const t = texts ?? EN_PRICING_CTA;
  const slug = LOCALE_SLUG_OVERRIDES["/pricing"]?.[locale] ?? "/pricing";
  const href = localePath(locale, slug);
  return (
    <div className="mx-auto max-w-2xl text-center px-4">
      <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium tracking-tight leading-[1.05] mb-4">
        {t.heading}
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground leading-snug mb-3">
        {t.sub}
      </p>
      <FromPrice addon={addon} template={t.fromTemplate} />
      <a
        href={href}
        className="mt-6 inline-flex items-center justify-center gap-2 min-h-12 py-2.5 px-7 text-sm sm:text-base font-semibold text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 active:scale-[0.99] transition-colors"
      >
        {t.button}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
