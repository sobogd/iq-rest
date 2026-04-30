import { dashboardUrl } from "@/lib/dashboard-url";

const baseClass =
  "inline-flex items-center justify-center h-11 px-6 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all whitespace-nowrap";

interface CtaButtonProps {
  text: string;
  microcopy: string;
  locale: string;
  layout?: "default" | "sticky";
  align?: "start" | "end" | "center-mobile";
}

export function CtaButton({
  text,
  microcopy,
  locale,
  layout = "default",
  align = "start",
}: CtaButtonProps) {
  const isSticky = layout === "sticky";
  const target = `${dashboardUrl(`/${locale}/login`)}?from=landing`;

  const alignClass =
    align === "end"
      ? "items-center text-center lg:items-end lg:text-right"
      : align === "center-mobile"
        ? "items-center text-center lg:items-start lg:text-left"
        : "items-start text-left";

  return (
    <div className={`flex flex-col w-full ${alignClass}`}>
      <a href={target} className={`${baseClass} ${isSticky ? "w-full" : "w-full max-w-[14rem]"}`}>
        {text}
      </a>
      {!isSticky && <p className="mt-2.5 text-[11px] text-muted-foreground">{microcopy}</p>}
    </div>
  );
}
