"use client";

// Restaurant-count picker for the pricing quiz — same full-panel blur
// takeover as the currency picker (currency-selector.tsx), minus a
// persistent trigger: the only entry point is the "Show options" text link
// in pricing-quiz.tsx, so there's no separate control to keep in sync once
// a count > 1 is picked. Kept as its own component (not folded into
// currency-selector.tsx) because each row needs its own volume-discount
// percentage, which only pricing-quiz can compute (it owns the
// catalog/venues/cycle inputs).

import { X } from "lucide-react";
import { useCommonTexts } from "../lib/landing-strings";
import { PRIMARY_FILL } from "./shell";

export function RestaurantCountOverlay({
  value,
  max,
  open,
  onChange,
  onClose,
  labelForCount,
  discountLabelForCount,
}: {
  value: number;
  max: number;
  open: boolean;
  onChange: (count: number) => void;
  onClose: () => void;
  /** "{n} restaurant(s)" row label — plural forms live in pricing-quiz.tsx. */
  labelForCount: (count: number) => string;
  /** "Discount X%" row label, or null when there's no discount at that count. */
  discountLabelForCount: (count: number) => string | null;
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
            {Array.from({ length: max }, (_, i) => i + 1).map((n) => {
              const discountLabel = discountLabelForCount(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(n);
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    n === value ? PRIMARY_FILL : "bg-background/70 text-foreground hover:bg-background"
                  }`}
                >
                  <span>{labelForCount(n)}</span>
                  {discountLabel ? (
                    <span className={n === value ? "text-white/90" : "text-emerald-500"}>{discountLabel}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[hsl(32_44%_92%)] to-transparent dark:from-[hsl(32_14%_14%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[hsl(32_44%_92%)] to-transparent dark:from-[hsl(32_14%_14%)]" />
      </div>
    </div>
  );
}
