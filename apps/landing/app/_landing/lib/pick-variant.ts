import type { HeroVariant } from "../types";

export function pickRandomVariant(variants: HeroVariant[]): HeroVariant {
  return variants[Math.floor(Math.random() * variants.length)];
}
