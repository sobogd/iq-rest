import { Check } from "lucide-react";
import type { FeatureSubFeature } from "../templates/types";
import { getIcon } from "../lib/icons";

// One feature card: icon chip + heading + checkmark bullets. The eyebrow/label
// and image fields on the row are intentionally not rendered (the label
// duplicated the heading; images were dropped for the text-only grid).
export function FeatureCard({ row }: { row: FeatureSubFeature }) {
  const Icon = getIcon(row.icon);
  return (
    <article className="h-full flex flex-col rounded-2xl bg-gradient-to-br from-primary/10 via-primary/[0.03] to-primary/[0.03] ring-1 ring-border/50 shadow-xl overflow-hidden">
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
          </div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight leading-tight pb-0.5">
            {row.heading}
          </h3>
        </div>
        <ul className="lg:mt-auto grid grid-cols-1 gap-2.5">
          {row.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start text-sm sm:text-base text-foreground/90 leading-snug"
            >
              <Check
                className="shrink-0 mt-[0.15em] mr-2 h-4 w-4 sm:h-[18px] sm:w-[18px] text-primary"
                strokeWidth={2.5}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
