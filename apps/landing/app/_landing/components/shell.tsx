// The one page shell for every landing page. A page is a plain stack of Bands
// separated by a single gap (`PAGE`), each Band keeps its content inside the
// same 1000px column as the header. No full-bleed tints, no per-section
// borders — cards inside a Band carry their own outline.

/** Content column shared by the header and every section. */
export const NARROW = "max-w-[1000px] mx-auto";

/** Root <main> classes: vertical stack, one gap between blocks — the same
 *  step that separates two cards. */
export const PAGE = "relative flex flex-col gap-6";

/** Button box shared with the header, so buttons never change size as you
 *  scroll: 36px tall, small semibold label. */
export const BTN_BOX = "h-9 px-4 text-sm font-semibold rounded-lg whitespace-nowrap";

/** Primary CTA — the brand gradient in the shared button box. */
export const PRIMARY_BTN =
  `inline-flex items-center justify-center ${BTN_BOX} text-white` +
  " bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] hover:opacity-90" +
  " active:scale-[0.99] transition-all";

/** Quiet outline twin of the primary — "learn more" links, secondary CTAs. */
export const OUTLINE_BTN =
  `inline-flex items-center justify-center ${BTN_BOX} text-foreground bg-transparent` +
  " border border-border hover:bg-muted active:scale-[0.99] transition-all";

/** Overrides that force the DemoButton into the shared button box. */
export const DEMO_BTN =
  "!h-9 !min-h-0 !py-0 !px-4 !text-sm !font-semibold !rounded-lg whitespace-nowrap";

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
    <section id={id} data-section={section} className="w-full">
      <div className={NARROW}>{children}</div>
    </section>
  );
}
