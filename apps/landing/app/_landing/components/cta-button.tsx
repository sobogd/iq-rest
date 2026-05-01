"use client";

import { createUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";

const baseClass =
  "inline-flex items-center justify-center h-11 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap";

interface CtaButtonProps {
  text: string;
  microcopy: string;
  locale: string;
  layout?: "default" | "sticky";
  align?: "start" | "end" | "center-mobile";
  trackEvent?: string;
  extra?: React.ReactNode;
}

export function CtaButton({
  text,
  microcopy,
  locale,
  layout = "default",
  align = "start",
  trackEvent = "land_cta_click",
  extra,
}: CtaButtonProps) {
  const isSticky = layout === "sticky";
  const target = `${createUrl(locale)}&from=landing`;

  const alignClass =
    align === "end"
      ? "items-center text-center lg:items-end lg:text-end"
      : align === "center-mobile"
        ? "items-center text-center lg:items-start lg:text-start"
        : "items-start text-start";

  return (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <div className="flex flex-row items-center gap-3">
        <a
          href={target}
          onClick={() => analytics.track(trackEvent)}
          className={`${baseClass} ${isSticky ? "w-full" : "max-w-[14rem]"}`}
        >
          {text}
        </a>
        {extra}
      </div>
      {!isSticky && <p className="mt-2.5 text-[11px] text-muted-foreground">{microcopy}</p>}
    </div>
  );
}
