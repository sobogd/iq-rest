import { dashboardUrl } from "@/lib/dashboard-url";

const CTA_TEXT = "Start my free trial →";

const baseClass =
  "inline-flex items-center justify-center h-11 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap";

interface CtaButtonProps {
  layout?: "default" | "sticky";
  align?: "start" | "end" | "center-mobile";
}

export function CtaButton({ layout = "default", align = "start" }: CtaButtonProps) {
  const target = (() => {
    const url = new URL(dashboardUrl("/en/login"));
    url.searchParams.set("from", "landing");
    return url.toString();
  })();

  const isSticky = layout === "sticky";

  const alignClass =
    align === "end"
      ? "items-center text-center lg:items-end lg:text-right"
      : align === "center-mobile"
        ? "items-center text-center lg:items-start lg:text-left"
        : "items-start text-left";

  return (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <a href={target} className={`${baseClass} ${isSticky ? "w-full" : "w-full max-w-[14rem]"}`}>
        {CTA_TEXT}
      </a>
      {!isSticky && (
        <p className="mt-2.5 text-[11px] text-muted-foreground">
          14-day free trial · No credit card · Cancel anytime
        </p>
      )}
    </div>
  );
}
