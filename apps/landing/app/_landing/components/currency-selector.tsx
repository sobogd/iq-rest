"use client";

// Currency picker for the pricing quiz — geo picks a default (see
// middleware.ts `geo_currency`), this lets a visitor override it. Display
// only: it does not change what the actual checkout bills in (that stays
// geo-derived server-side). Two pieces because the trigger lives in the
// panel's top row but the picker itself needs to cover the whole panel — a
// small anchored dropdown would get clipped by the hero card's
// `overflow-hidden` outer border. Reused later by the dashboard's own
// currency switcher, hence living as its own component rather than inlined.

import { ChevronDown, X } from "lucide-react";
import { currencyInfo, supportedCurrencies, type SupportedCurrency } from "@/lib/country-currency-map";
import { useCommonTexts } from "../lib/landing-strings";
import { PRIMARY_FILL } from "./shell";

export function CurrencySelector({
  value,
  open,
  onToggle,
}: {
  value: SupportedCurrency;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex h-10 items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 text-sm font-medium text-foreground"
    >
      <span className="flex items-center gap-1.5">
        {value}
        <span className="text-muted-foreground">{currencyInfo[value].symbol}</span>
      </span>
      <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.5} />
    </button>
  );
}

/** Full-panel takeover — render as a direct child of the (relatively
 *  positioned) tinted panel, absolutely filling it. The blur covers the
 *  trigger too (no "peek through" trick); an explicit X closes it, same as
 *  a click outside a row. */
export function CurrencyOverlay({
  value,
  open,
  onChange,
  onClose,
}: {
  value: SupportedCurrency;
  open: boolean;
  onChange: (currency: SupportedCurrency) => void;
  onClose: () => void;
}) {
  const common = useCommonTexts();
  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col rounded-[inherit] backdrop-blur-md transition-opacity duration-200 ease-out ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!open}
    >
      {/* No outer padding on the panel — it's edge-to-edge, the scroll div
          below carries the real padding. The close button is inset by that
          same 5/sm:6 spacing step (not an arbitrary offset), landing level
          with the first row. Sits outside the scroll div (not masked), so it
          never fades. */}
      <button
        type="button"
        onClick={onClose}
        aria-label={common.close}
        className="absolute right-5 top-5 sm:right-6 sm:top-6 z-10 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" strokeWidth={2.25} />
      </button>

      {/* flex-1: fills the full remaining height of the panel (this is the
          only child besides the close button, in a flex-col that already
          spans inset-0). Padding lives here now (not on the outer div), so
          the panel itself stays edge-to-edge. pr clears the close button's
          column. The fade at each end is two decorative gradient strips
          layered on top (below), not a CSS mask — mask-image on a
          backdrop-blur descendant renders as a blurry smear on some
          browsers/GPUs, not a clean edge fade. */}
      <div className="relative flex-1 w-full min-h-0">
        <div className="h-full w-full overflow-y-auto overscroll-contain pl-5 sm:pl-6 pr-20 pt-5 sm:pt-6 pb-5 sm:pb-6">
          <div className="flex flex-col gap-1">
            {supportedCurrencies.map((c) => (
              <button
                key={c}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(c);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  c === value ? PRIMARY_FILL : "bg-background/70 text-foreground hover:bg-background"
                }`}
              >
                <span>{c}</span>
                <span className={c === value ? "text-white/80" : "text-muted-foreground"}>
                  {currencyInfo[c].symbol}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[hsl(32_44%_92%)] to-transparent dark:from-[hsl(32_14%_14%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[hsl(32_44%_92%)] to-transparent dark:from-[hsl(32_14%_14%)]" />
      </div>
    </div>
  );
}
