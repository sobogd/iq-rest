import { createUrl } from "@/lib/dashboard-url";
import { LinkForward } from "./link-forward";

const baseClass =
  "inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all text-center leading-tight";

interface CtaButtonProps {
  text: string;
  /** Trust line shown under the button (e.g. "14 days free · No card").
   *  Omit on sections where prices/details above already make it
   *  redundant — e.g. the pricing block CTA. */
  microcopy?: string;
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
  locale,
  layout = "default",
  align = "start",
  trackEvent = "land_cta_click",
  extra,
  stackMobile = false,
}: CtaButtonProps) {
  const isSticky = layout === "sticky";
  const target = `${createUrl(locale)}&from=landing`;

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
      <div className={`flex ${stackMobile ? "flex-col sm:flex-row items-center" : "flex-row flex-wrap items-center"} gap-3 ${rowJustify}`}>
        <LinkForward
          href={target}
          trackEvent={trackEvent}
          className={`${baseClass} ${isSticky ? "w-full" : "w-auto"}`}
        >
          {text}
        </LinkForward>
        {extra}
      </div>
      {!isSticky && microcopy && <p className="mt-3 text-sm text-muted-foreground/80">{microcopy}</p>}
    </div>
  );
}
