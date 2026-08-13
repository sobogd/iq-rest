"use client";

import { usePrimaryCta } from "./onboarding/use-primary-cta";
import { PRIMARY_BTN } from "./shell";

// Generic primary-CTA island: the only interactive piece of an otherwise
// static marketing section (hero, scan band, …). Splitting it out lets those
// sections stay server components — same idea as <FinalCtaPrimaryButton>, but
// with a caller-supplied analytics label and optional class.
export function PrimaryCtaButton({
  text,
  trackName,
  className = PRIMARY_BTN,
}: {
  text: string;
  trackName: string;
  className?: string;
}) {
  const cta = usePrimaryCta(text);
  return (
    <button type="button" onClick={() => cta.onClick(trackName)} className={className}>
      {cta.label}
    </button>
  );
}
