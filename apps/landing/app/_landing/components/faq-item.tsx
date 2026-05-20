"use client";

import { ChevronDown } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface FaqItemProps {
  q: string;
  a: string;
  /** 1-based index — embedded in the analytics event name so each
   *  question can be tracked independently. */
  position: number;
}

// Client island around a single <details> element. Native disclosure
// already works without JS, so SSR shipping is fine for users with
// JS disabled — this island only adds the open-tracking handler.
export function FaqItem({ q, a, position }: FaqItemProps) {
  return (
    <details
      onToggle={(e) => {
        const open = (e.currentTarget as HTMLDetailsElement).open;
        analytics.track(`l_faq_item_${position}_${open ? "open" : "close"}`);
      }}
      className="group bg-muted/50 dark:bg-muted/20 border border-border rounded-2xl px-5 py-4 open:bg-muted/70 dark:open:bg-muted/30 transition-colors"
    >
      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-base font-medium tracking-tight">
        <span>{q}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-base text-muted-foreground leading-relaxed">{a}</p>
    </details>
  );
}
