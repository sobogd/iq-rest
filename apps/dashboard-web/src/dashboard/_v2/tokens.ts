// Tailwind class tokens used across the new dashboard.

export const inputClass =
 "w-full h-10 px-3 text-sm text-foreground bg-card border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none transition-colors";

export const labelClass =
 "block text-xs font-medium text-foreground mb-2.5";

export const primaryBtn =
 "h-8 px-3 text-xs font-medium text-primary-foreground bg-primary-gradient rounded-lg transition-colors";

export const secondaryBtn =
 "h-8 px-3 text-xs font-medium text-foreground bg-card border border-input rounded-lg transition-colors";

export const dangerBtn =
 "h-8 px-3 text-xs font-medium text-red-600 bg-card border border-input rounded-lg transition-colors flex items-center justify-center gap-1.5";

export const iconBtn =
 "w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground transition-colors disabled:text-muted-foreground/50 disabled:cursor-not-allowed";

/** Every clickable line in the sidebar wears this: same height, same inset, so
 *  icons, labels and hover rectangles line up down the whole rail. Carries no
 *  text colour on purpose — the caller adds one, so two `text-*` utilities
 *  never race (CSS order, not class order, decides the winner). */
export const navRow =
  "h-9 px-3 rounded-lg flex items-center gap-2.5 text-sm font-medium transition-colors " +
  "hover:bg-secondary disabled:opacity-60";

/** Same row, marked as the current destination. */
export const navRowActive =
  "h-9 px-3 rounded-lg flex items-center gap-2.5 text-sm font-medium transition-colors " +
  "bg-foreground text-background hover:bg-foreground/90";

/** Page-header controls carry the sidebar's row metrics: 36px tall, 12px side
 *  padding, 14px label, 10px glyph→label gap, 16px glyphs. Callers append the
 *  surface (bg-secondary / bg-primary-gradient) and the text colour. */
export const headerBtn =
  "h-9 px-3 rounded-lg inline-flex items-center gap-2.5 text-sm font-medium transition-colors disabled:opacity-60";

/** Same, for a glyph-only control. */
export const headerIconBtn =
  "h-9 w-9 rounded-lg inline-flex items-center justify-center transition-colors disabled:opacity-60";
