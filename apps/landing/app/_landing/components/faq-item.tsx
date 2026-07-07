import type { ReactNode } from "react";

interface FaqItemProps {
  q: string;
  a: ReactNode;
  /** 1-based index — kept for API compatibility with the caller; no longer
   *  used now that items render statically (always open, no toggle). */
  position?: number;
}

// Static FAQ card — always open, no disclosure toggle. Styled like the
// feature cards (rounded gradient panel with a hairline ring + shadow).
export function FaqItem({ q, a }: FaqItemProps) {
  return (
    <article className="rounded-2xl bg-card ring-1 ring-border/50 shadow-xl p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-medium tracking-tight mb-3">{q}</h3>
      <p className="text-base text-muted-foreground leading-relaxed">{a}</p>
    </article>
  );
}
