// The one page shell for every landing page. A page is exactly three
// full-width blocks stacked with a single gap (`PAGE`): header, `Content`,
// footer. Only `Content` and the header/footer components ever touch
// `Container` directly — everything else (Bands, cards) lives inside that one
// column, so the DOM never nests a second full-bleed wrapper.

/** Content column shared by the header, `Content` and the footer. */
export const NARROW = "max-w-[1000px] mx-auto px-4 sm:px-6";

/** The one content-column wrapper — same box the header's `containerClass`
 *  uses. Use this instead of hand-rolling `<div className={NARROW}>`. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className ? `${NARROW} ${className}` : NARROW}>{children}</div>;
}

/** Root <main> classes: vertical stack, one gap between the header, the
 *  content block and the footer. */
export const PAGE = "relative flex flex-col gap-6";

/** The page's one full-width content block, sitting between header and
 *  footer. Holds the single `Container` column; every Band lives inside it,
 *  stacked with the same gap as `PAGE`. */
export function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <Container className="flex flex-col gap-6">{children}</Container>
    </div>
  );
}

/** Shared button box: 40px tall, small semibold label. */
export const BTN_BOX = "h-10 px-4 text-sm font-semibold rounded-lg whitespace-nowrap";

/** The brand gradient fill alone (no box sizing) — for smaller "active state"
 *  surfaces that should read as the same accent as the primary CTA (sliding
 *  thumbs, stepper buttons, selected pills) without inheriting its padding. */
export const PRIMARY_FILL = "bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] text-white";

/** Primary CTA — the brand gradient in the shared button box. */
export const PRIMARY_BTN =
  `inline-flex items-center justify-center ${BTN_BOX} ${PRIMARY_FILL} hover:opacity-90` +
  " active:scale-[0.99] transition-all";

/** Quiet outline twin of the primary — "learn more" links, secondary CTAs. */
export const OUTLINE_BTN =
  `inline-flex items-center justify-center ${BTN_BOX} text-foreground bg-transparent` +
  " border border-border hover:bg-muted active:scale-[0.99] transition-all";

/** Overrides that force the DemoButton into the shared button box. */
export const DEMO_BTN =
  "!h-10 !min-h-0 !py-0 !px-4 !text-sm !font-semibold !rounded-lg whitespace-nowrap";

/** A page section — lives inside `Content`, so it carries no width styling
 *  of its own, just the id/tracking hook. */
export function Band({
  section,
  id,
  children,
}: {
  section: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} data-section={section}>
      {children}
    </section>
  );
}
