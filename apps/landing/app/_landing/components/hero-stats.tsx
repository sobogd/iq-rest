import { Section } from "./section";
import type { TrustStat } from "../types";

interface HeroStatsProps {
  /** The four product stats. Empty/undefined → nothing renders. */
  trust: TrustStat[];
  /** Pre-formatted live restaurant count for `kind: "count"` items. */
  countLabel: string;
  /** Analytics section id — kept per-caller so existing tracking stays stable. */
  dataSection?: string;
}

// Four product stats read in a glance just below the hero. Shared by the
// homepage and every feature page: same markup everywhere, data passed in.
export function HeroStats({ trust, countLabel, dataSection = "hero_stats" }: HeroStatsProps) {
  if (!trust.length) return null;
  return (
    <Section dataSection={dataSection} noContainer accent className="!py-8 sm:!py-10">
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 max-w-5xl mx-auto text-center">
        {trust.map((t) => (
          <div key={t.label} className="flex flex-col items-center">
            <dt className="text-3xl sm:text-4xl font-medium tracking-tight bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {t.kind === "count"
                ? countLabel
                : t.kind === "num"
                  ? `${t.value}${t.suffix ?? ""}`
                  : t.value}
            </dt>
            <dd className="mt-1 text-base text-muted-foreground/80 leading-tight">{t.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
