// Shared types for the multilingual help guide. One HelpDoc per locale lives
// in ./content/<locale>.ts; the renderer (help-view.tsx) and each per-locale
// page.tsx consume it. Section ids stay identical across locales (used as
// sidebar anchors), only the visible strings are translated.

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "note"; text: string };

export interface HelpSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface HelpDoc {
  /** <title> + og title */
  metaTitle: string;
  metaDescription: string;
  /** Page H1 */
  h1: string;
  /** Sub-line under the H1 */
  intro: string;
  /** Pre-footer home-page banner copy (links to this guide). */
  banner: { title: string; sub: string; cta: string };
  /** Localized labels for the tip/note callout prefixes. */
  tipLabel: string;
  noteLabel: string;
  sections: HelpSection[];
}
