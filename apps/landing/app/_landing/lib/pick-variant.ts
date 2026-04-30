import type { HeroVariant } from "../types";

export function pickRandomVariant(variants: HeroVariant[]): { variant: HeroVariant; index: number } {
  const index = Math.floor(Math.random() * variants.length);
  return { variant: variants[index], index };
}
