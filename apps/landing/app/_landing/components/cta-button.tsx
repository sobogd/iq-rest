"use client";

import { usePrimaryCta } from "./onboarding/use-primary-cta";

// Matches the hero primary CTA (h-11, text-base) so every section CTA reads
// at the same size and weight.
const baseClass =
  "inline-flex items-center justify-center h-11 px-6 text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight whitespace-nowrap";

interface CtaButtonProps {
  text: string;
  /** Trust line shown under the button (e.g. "14 days free · No card").
   *  Omit on sections where prices/details above already make it
   *  redundant — e.g. the pricing block CTA. */
  microcopy?: string;
  /** Kept for API compatibility — locale used to be needed to build /login URLs;
   *  the modal handles locale via NextIntl context. Safe to pass any string. */
  locale: string;
  layout?: "default" | "sticky";
  align?: "start" | "end" | "center-mobile" | "center";
  trackEvent?: string;
  extra?: React.ReactNode;
  /** On mobile, stack the primary CTA and `extra` button vertically. */
  stackMobile?: boolean;
  /** Stretch the primary button to the full width of its container
   *  (e.g. pricing plan cards). */
  fullWidth?: boolean;
}

export function CtaButton({
  text,
  microcopy = "",
  layout = "default",
  align = "start",
  trackEvent = "l_cta_click",
  extra,
  stackMobile = false,
  fullWidth = false,
}: CtaButtonProps) {
  const isSticky = layout === "sticky";
  const cta = usePrimaryCta(text);

  const alignClass =
    align === "end"
      ? "items-center text-center lg:items-end lg:text-end"
      : align === "center-mobile"
        ? "items-center text-center lg:items-start lg:text-start"
        : align === "center"
          ? "items-center text-center"
          : "items-start text-start";

  const rowJustify =
    align === "end"
      ? "justify-center lg:justify-end"
      : align === "center-mobile"
        ? "justify-center lg:justify-start"
        : align === "center"
          ? "justify-center"
          : "justify-start";

  return (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <div className={`flex ${fullWidth ? "flex-row w-full" : stackMobile ? `flex-col w-full sm:w-auto sm:flex-row ${align === "start" ? "items-start sm:items-center" : align === "end" ? "items-end sm:items-center" : "items-center"}` : "flex-row flex-wrap items-center"} gap-3 ${rowJustify}`}>
        <button
          type="button"
          onClick={() => cta.onClick(trackEvent)}
          className={`${baseClass} ${fullWidth ? "w-full" : isSticky ? "w-full sm:w-auto" : "w-auto"}`}
        >
          {cta.label}
        </button>
        {extra}
      </div>
      {!isSticky && microcopy && (
        <p className="mt-3 text-sm text-muted-foreground/80">{microcopy}</p>
      )}
    </div>
  );
}
