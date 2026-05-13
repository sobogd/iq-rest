import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Compact visible breadcrumb — renders only the <nav><ol> markup, no outer
 *  container/padding. Parent owns the wrapping. Reinforces the
 *  BreadcrumbList JSON-LD schema with an HTML-level signal. */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-foreground font-medium" : ""}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground/60" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
