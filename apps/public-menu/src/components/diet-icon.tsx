import type { SVGProps } from "react";

// Per-diet brand colors. Still exported for callers that explicitly opt in;
// the default rendering is monochrome (currentColor stroke, no fill).
export const DIET_COLORS: Record<string, string> = {
  vegan: "#16a34a",
  vegetarian: "#65a30d",
  pescatarian: "#0ea5e9",
  gluten_free: "#b45309",
  lactose_free: "#3b82f6",
  nut_free: "#92400e",
  sugar_free: "#db2777",
  low_carb: "#f97316",
  keto: "#7c3aed",
  halal: "#15803d",
  kosher: "#1d4ed8",
  spicy: "#dc2626",
  organic: "#059669",
};

// Pure-stroke pictograms: fill="none" globally; only tiny accents use
// fill="currentColor" (an eye dot, a star, an avocado pit) so colored
// rendering still works without leaving grey fills in monochrome contexts.
const ICONS: Record<string, string> = {
  vegan: `
    <path d="M4 20c1-9 8-15 17-15-.5 10-8 16-17 15z"/>
    <path d="M4 20l10-11"/>
  `,
  vegetarian: `
    <path d="M8 21l-4-4c-1-1-1-2 0-3l9-9 7 7-9 9c-1 1-2 1-3 0z"/>
    <path d="M15 6c1-1 3-1 4 0 .5.5.5 1.5 0 2L17 9.5"/>
    <path d="M19 5c0-1 .5-2 1.5-2"/>
  `,
  pescatarian: `
    <path d="M3 12c0-3 4-6.5 9-6.5S19.5 9 19.5 12s-2.5 6.5-7.5 6.5S3 15 3 12z"/>
    <path d="M19.5 9l3-3v12l-3-3"/>
    <circle cx="15" cy="11" r="1" fill="currentColor"/>
  `,
  gluten_free: `
    <path d="M12 3v18"/>
    <path d="M12 7c2-2 4.5-2 5.5-1-.5 2.5-3 4-5.5 4"/>
    <path d="M12 7c-2-2-4.5-2-5.5-1 .5 2.5 3 4 5.5 4"/>
    <path d="M12 13c2-2 4.5-2 5.5-1-.5 2.5-3 4-5.5 4"/>
    <path d="M12 13c-2-2-4.5-2-5.5-1 .5 2.5 3 4 5.5 4"/>
    <path d="M4 20L20 4" stroke-width="2.5"/>
  `,
  lactose_free: `
    <path d="M9 2h6v3l1.8 2.5V21a1 1 0 0 1-1 1H8.2a1 1 0 0 1-1-1V7.5L9 5V2z"/>
    <path d="M7.2 9h9.6"/>
    <path d="M9.5 14h5"/>
    <path d="M4 20L20 4" stroke-width="2.5"/>
  `,
  nut_free: `
    <path d="M12 3c-3 0-5 2.5-5 5 0 2 1 3 1 5s-1 3-1 5c0 1.5 2 3 5 3s5-1.5 5-3c0-2-1-3-1-5s1-3 1-5c0-2.5-2-5-5-5z"/>
    <path d="M9 10c2 .5 4 .5 6 0"/>
    <path d="M9 15c2 .5 4 .5 6 0"/>
    <path d="M4 20L20 4" stroke-width="2.5"/>
  `,
  sugar_free: `
    <rect x="5" y="5" width="14" height="14" rx="2"/>
    <circle cx="9" cy="9" r=".7" fill="currentColor"/>
    <circle cx="15" cy="9" r=".7" fill="currentColor"/>
    <circle cx="9" cy="15" r=".7" fill="currentColor"/>
    <circle cx="15" cy="15" r=".7" fill="currentColor"/>
    <circle cx="12" cy="12" r=".7" fill="currentColor"/>
    <path d="M4 20L20 4" stroke-width="2.5"/>
  `,
  low_carb: `
    <path d="M3 12c0-3 3-5 9-5s9 2 9 5v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
    <path d="M8 11v3"/>
    <path d="M12 11v3"/>
    <path d="M16 11v3"/>
  `,
  keto: `
    <path d="M12 3c-3.5 0-6 3-6 8s2.5 10 6 10 6-5 6-10-2.5-8-6-8z"/>
    <ellipse cx="12" cy="13" rx="2.6" ry="3.6" fill="currentColor"/>
  `,
  halal: `
    <path d="M17 4a8 8 0 1 0 0 16 7 7 0 0 1 0-16z"/>
    <path d="M19 7l.8 1.7L21.5 9l-1.7.6L19 11.5l-.8-1.9L16.5 9l1.7-.3z" fill="currentColor"/>
  `,
  kosher: `
    <path d="M12 3l3.5 6h-7z"/>
    <path d="M12 21l-3.5-6h7z"/>
    <path d="M2.5 9h19"/>
    <path d="M2.5 15h19"/>
  `,
  spicy: `
    <path d="M15 3.5c-1 1.5-1 3 0 4.5" stroke-width="2"/>
    <path d="M15 8c-5 0-9 4-9 9 0 2 1 3 3 3 5 0 11-4 11-10 0-1.5-2-2-5-2z"/>
  `,
  organic: `
    <circle cx="12" cy="12" r="9"/>
    <path d="M7 15c2-6 6-8 10-8-1 6-4 10-10 10z"/>
    <path d="M7 17l5-5"/>
  `,
};

const FALLBACK = `
  <circle cx="12" cy="12" r="9"/>
  <path d="M8 12l3 3 5-6"/>
`;

interface DietIconProps extends Omit<SVGProps<SVGSVGElement>, "children" | "dangerouslySetInnerHTML"> {
  code: string;
}

export function DietIcon({ code, ...props }: DietIconProps) {
  const inner = ICONS[code] ?? FALLBACK;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
