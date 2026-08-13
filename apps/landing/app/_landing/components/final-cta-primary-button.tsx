"use client";

import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { PRIMARY_BTN } from "./shell";

// Split out of `FinalCta` so that component can stay a server component —
// this is the only piece of the final CTA band that needs the click handler.
export function FinalCtaPrimaryButton({ text }: { text: string }) {
  const cta = usePrimaryCta(text);
  return (
    <button type="button" onClick={() => cta.onClick("Final CTA")} className={PRIMARY_BTN}>
      {cta.label}
    </button>
  );
}
