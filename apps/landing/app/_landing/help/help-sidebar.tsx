"use client";

import { analytics } from "@/lib/analytics";

// Sticky in-page navigation. Each anchor click fires l_help_nav_<id> so we can
// see which sections users jump to.
export function HelpSidebar({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav className="md:sticky md:top-20 md:self-start">
      <ul className="space-y-1">
        {items.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={() => analytics.track(`l_help_nav_${s.id}`)}
              className="block py-1.5 px-3 text-[14px] text-muted-foreground hover:text-foreground rounded-md hover:bg-card/60 transition-colors"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
