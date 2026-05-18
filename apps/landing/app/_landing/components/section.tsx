import type { ElementType, ReactNode } from "react";

// Single source of truth for landing section chrome — same vertical padding
// and container width across every section on every landing page (organic
// homepages, PPC LPs, feature pages). Background alternation is owned by
// SectionGroup via nth-child, so individual sections don't carry a bg
// modifier.
const PADDING = "py-12 sm:py-16";
const CONTAINER = "container mx-auto px-4";
const FULL_BLEED = "w-full px-4 sm:px-6 lg:px-10 xl:px-14";
const SCROLL_MARGIN = "scroll-mt-16";

// Accent treatment — same gradient as the historical scan-banner card,
// plus a hairline border so the tinted block doesn't fade into the next
// section. Used in two places: applied to even children inside SectionGroup
// (alternation), and applied to a single Section via `accent` prop (e.g.
// the standalone scan banner that sits above the group).
const ACCENT_CLASSES =
  "bg-gradient-to-br from-primary/10 via-primary/[0.03] to-primary/[0.03] " +
  "border-y border-border/40";

// Alternate every other direct child — applies to <section> and <footer>
// so the footer participates in the alternating accent bg.
const ACCENT_BG =
  `[&>*:nth-child(even)]:bg-gradient-to-br ` +
  `[&>*:nth-child(even)]:from-primary/10 ` +
  `[&>*:nth-child(even)]:via-primary/[0.03] ` +
  `[&>*:nth-child(even)]:to-primary/[0.03] ` +
  `[&>*:nth-child(even)]:border-y ` +
  `[&>*:nth-child(even)]:border-border/40`;

interface SectionProps {
  id?: string;
  dataSection?: string;
  className?: string;
  /** Apply the accent gradient + border, independent of SectionGroup
   *  alternation. Used for sections that always carry the accent treatment
   *  (e.g. the scan banner sitting above the alternating group). */
  accent?: boolean;
  /** Drop the centered max-width container — section content stretches
   *  full-width with only edge padding (same hero stylistic). */
  noContainer?: boolean;
  /** Render as a different element (e.g. `footer`) while keeping all
   *  Section chrome — padding, container, accent alternation. */
  as?: ElementType;
  children: ReactNode;
}

export function Section({
  id,
  dataSection,
  className = "",
  accent,
  noContainer,
  as: Tag = "section",
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-section={dataSection}
      className={`${SCROLL_MARGIN} ${PADDING} ${accent ? ACCENT_CLASSES : ""} ${className}`}
    >
      <div className={noContainer ? FULL_BLEED : CONTAINER}>{children}</div>
    </Tag>
  );
}

interface SectionGroupProps {
  className?: string;
  children: ReactNode;
}

// Wraps a run of Section children and paints every other one with the
// accent gradient. Drop this around the content sections of a landing page
// — no per-section bg prop required.
export function SectionGroup({ className = "", children }: SectionGroupProps) {
  return <div className={`${ACCENT_BG} ${className}`}>{children}</div>;
}
