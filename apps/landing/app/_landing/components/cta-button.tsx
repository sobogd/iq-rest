"use client";

import { createUrl } from "@/lib/dashboard-url";
import { LinkForward } from "./link-forward";

const baseClass =
  "inline-flex items-center justify-center min-h-11 py-2 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all text-center leading-tight";

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

  const rowJustify =
    align === "end"
      ? "justify-center lg:justify-end"
      : align === "center-mobile"
        ? "justify-center lg:justify-start"
        : "justify-start";

  return (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <div className={`flex flex-row flex-wrap items-center gap-3 ${rowJustify}`}>
        <LinkForward
          href={target}
          trackEvent={trackEvent}
          className={`${baseClass} ${isSticky ? "w-full" : "max-w-[14rem]"}`}
        >
          {text}
        </LinkForward>
        {extra}
      </div>
      {!isSticky && <p className="mt-3 text-sm text-muted-foreground/80">{microcopy}</p>}
    </div>
  );
}
