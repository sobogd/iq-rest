import { getIcon } from "../lib/icons";
import type { FeatureSpotlight } from "../templates/types";

// The home page's feature card, reused on feature pages as a content-only
// spotlight: heading + lead on a warm tinted panel up top (where the home
// card keeps its artwork), icon bullets on plain background below — no CTA
// row (the page's own hero and final CTA carry the conversion). Two per row
// on desktop, one on mobile.

// Warm tint rotation — the same palette the home cards use, cycled by index.
const TINTS = [
  "bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)]",
  "bg-[hsl(18_40%_92%)] dark:bg-[hsl(18_14%_14%)]",
  "bg-[hsl(45_44%_92%)] dark:bg-[hsl(45_14%_14%)]",
  "bg-[hsl(24_40%_92%)] dark:bg-[hsl(24_14%_14%)]",
];

export function FeatureSpotlights({ items }: { items: readonly FeatureSpotlight[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {items.map((s, i) => (
        <article
          key={s.heading}
          className="flex flex-col overflow-hidden rounded-2xl border border-border"
        >
          <div className={`p-6 sm:p-8 ${TINTS[i % TINTS.length]}`}>
            <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
              {s.heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
              {s.sub}
            </p>
          </div>

          <ul className="flex flex-col gap-5 p-6 sm:p-8">
            {s.bullets.map((b) => {
              const Icon = getIcon(b.icon);
              return (
                <li key={b.title} className="flex items-start gap-3">
                  <Icon className="h-7 w-7 shrink-0 text-primary" strokeWidth={1.75} />
                  <div>
                    <h3 className="font-semibold text-base">{b.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{b.sub}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}
