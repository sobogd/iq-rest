import { Check, Minus } from "lucide-react";
import type { FeatureComparison as FeatureComparisonData } from "../templates/types";

// "Us vs other systems" comparison band, in the same big card as the FAQ:
// a tinted 40% column on the LEFT (heading/sub, sticky) and a plain 60%
// column on the RIGHT with the rows stacked one after another — each row is
// a capability title plus the two labelled lines ("IQ Rest: …" / "Other
// systems: …"). Competitors stay anonymous on purpose — the rows contrast
// capabilities, not brands. Server component: static SSR content, no JS.
export function FeatureComparison({ data }: { data: FeatureComparisonData }) {
  return (
    <div className="rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[2fr_3fr]">
      {/* Same sticky-background trick as the FAQ card: the tinted cell
          stretches to the row height, the copy pins inside it. */}
      <div className="rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl bg-[hsl(28_48%_93%)] dark:bg-[hsl(28_15%_13%)]">
        <div className="flex flex-col items-start text-start lg:sticky lg:top-16 gap-3 p-5 sm:p-6">
          <h2 className="text-2xl sm:text-[1.75rem] font-medium tracking-tight leading-[1.15]">
            {data.heading}
            {data.headingAccent ? ` ${data.headingAccent}` : ""}
          </h2>
          {data.sub ? (
            <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed">
              {data.sub}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-8 p-5 sm:p-6">
        {data.rows.map((row) => (
          <div key={row.title}>
            <h3 className="text-base sm:text-lg font-medium tracking-tight mb-2">{row.title}</h3>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                <p className="text-sm leading-relaxed">
                  <span className="font-medium">{data.usLabel}: </span>
                  {row.us}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Minus className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground/60" strokeWidth={2.5} />
                <p className="text-sm leading-relaxed text-muted-foreground/80">
                  <span className="font-medium">{data.othersLabel}: </span>
                  {row.others}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
