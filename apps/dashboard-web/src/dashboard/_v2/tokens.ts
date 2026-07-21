// Tailwind class tokens used across the new dashboard.

const inputBaseClass =
 "w-full h-10 px-3 text-sm font-medium text-foreground border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none transition-colors";

export const inputClass = inputBaseClass + " bg-muted";

// Menu forms (item / options / variant) want the page's main surface instead
// of the muted fill. `form-input-bg` is a CSS hook so the webkit autofill
// override can paint --background too (see styles.css).
export const formInputClass = inputBaseClass + " bg-background form-input-bg";

export const labelClass =
 "block text-xs font-medium text-foreground mb-2.5";

// Modal / footer buttons — sized + styled to match the page header buttons
// (EditPageHeader): 36px tall, rounded-lg, text-sm font-semibold. primary =
// gradient, secondary = muted fill (same language as the header icon buttons).
// Fixed px (not rem) so these match the page-header buttons exactly — the app's
// root font-size is 18px, which would scale rem-based h-9/text-sm ~12.5% larger
// than the header's h-[36px]/text-[14px] (most visible on mobile).
export const primaryBtn =
 "h-[36px] px-[16px] text-[14px] font-semibold text-primary-foreground bg-primary-gradient rounded-lg hover:opacity-90 transition-all disabled:opacity-60";

export const secondaryBtn =
 "h-[36px] px-[16px] text-[14px] font-semibold text-foreground bg-muted rounded-lg hover:bg-muted/70 transition-colors disabled:opacity-50";

export const dangerBtn =
 "h-[36px] px-[16px] text-[14px] font-semibold text-red-600 bg-card border border-input rounded-lg transition-colors flex items-center justify-center gap-1.5";

export const iconBtn =
 "w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground transition-colors disabled:text-muted-foreground/50 disabled:cursor-not-allowed";
