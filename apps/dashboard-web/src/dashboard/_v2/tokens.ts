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

/** Page-header controls: 32px tall, 10px side padding, 6px glyph→label gap,
 *  14px glyphs and a 12px label, a step below the sidebar rows so the header
 *  reads as chrome, not content. Callers append the surface and the text
 *  colour — headerBtnSurface for the ordinary ones, an accent fill for the
 *  primary action. */
export const headerBtn =
  "h-8 px-2.5 rounded-md inline-flex items-center gap-1.5 text-xs font-medium transition-colors disabled:opacity-60";

/** Same, for a glyph-only control. */
export const headerIconBtn =
  "h-8 w-8 rounded-md inline-flex items-center justify-center transition-colors disabled:opacity-60";

/** The default header surface: a quiet fill under a muted glyph or label that
 *  warms on hover. Named rather than repeated at each call site so a control
 *  wearing a different colour is visibly a deliberate exception — destructive
 *  red, a brand fill, the primary gradient — instead of a copy that drifted. */
export const headerBtnSurface =
  "text-muted-foreground bg-secondary hover:text-foreground";
