// Deterministic restaurant counter for the CRO hero / trust strip.
//
// Anchored at a known date + value, then grows by a small pseudo-random step
// each day. The step is seeded by the day index, so a given date ALWAYS maps
// to the same number — effectively a precomputed date→count table without
// storing one. SSR output is therefore stable, and the figure ticks up on its
// own every day with no data source. Pair with a daily `revalidate` so the
// cached page picks up the new value.

const ANCHOR_DATE = "2026-06-03"; // UTC day on which the count below is true
const ANCHOR_COUNT = 631;
const STEPS = [3, 4, 5]; // possible daily increments (avg 4/day)

// Stable hash of a day index → unsigned 32-bit. Same input, same output, so
// the whole series is reproducible across requests and builds.
function daySeed(n: number): number {
  let x = (n + 1) * 2654435761;
  x ^= x >>> 13;
  x = Math.imul(x, 1274126177);
  x ^= x >>> 16;
  return x >>> 0;
}

export function restaurantCount(now: Date = new Date()): number {
  const anchor = Date.parse(`${ANCHOR_DATE}T00:00:00Z`);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.floor((today - anchor) / 86_400_000);
  if (days <= 0) return ANCHOR_COUNT;

  let total = ANCHOR_COUNT;
  for (let i = 0; i < days; i++) total += STEPS[daySeed(i) % STEPS.length];
  return total;
}
