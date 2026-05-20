"use client";

import { usePrimaryCta } from "./onboarding/use-primary-cta";

const baseClass =
  "inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-lg hover:opacity-90 active:scale-[0.99] transition-all text-center leading-tight";

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
}

export function CtaButton({
  text,
  microcopy = "",
  layout = "default",
  align = "start",
  trackEvent = "l_cta_click",
  extra,
  stackMobile = false,
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
      <div className={`flex ${stackMobile ? `flex-col w-full sm:w-auto sm:flex-row ${align === "start" ? "items-start sm:items-center" : align === "end" ? "items-end sm:items-center" : "items-center"} [&>*]:w-full sm:[&>*]:w-auto [&_button]:w-full sm:[&_button]:w-auto` : "flex-row flex-wrap items-center"} gap-3 ${rowJustify}`}>
        <button
          type="button"
          onClick={() => cta.onClick(trackEvent)}
          className={`${baseClass} ${isSticky || stackMobile ? "w-full sm:w-auto" : "w-auto"}`}
        >
          {cta.label}
        </button>
        {extra}
      </div>
      {!isSticky && microcopy && !cta.authenticated && (
        <p className="mt-3 text-sm text-muted-foreground/80">{microcopy}</p>
      )}
    </div>
  );
}
