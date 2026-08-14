// Hardcoded restaurant counter for the CRO hero / trust strip / about story.
// Rendered wherever copy contains the "{count}" placeholder. Bump the constant
// manually when the real number grows — no fake auto-increment.
// (The previous deterministic date-seeded counter needed a daily `revalidate`
// the fully-static pages never do, so it silently froze at build time.)

export const RESTAURANT_COUNT_LABEL = "500+";

export function restaurantCount(): string {
  return RESTAURANT_COUNT_LABEL;
}
