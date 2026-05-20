import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { HeroBrandBarControls } from "./hero-brand-bar-controls";

interface HeroBrandBarProps {
  locale: string;
  signinHref?: string;
  signinLabel?: string;
}

// Top-of-hero brand row: logo + theme + language-switcher (+ optional
// sign-in icon when caller passes signinHref). Used by both organic
// landings and PPC LPs. SSR for the logo/layout; the controls island is
// hydrated client-side.
export function HeroBrandBar({ locale, signinHref, signinLabel }: HeroBrandBarProps) {
  const homeHref = `/${locale}`;
  return (
    <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
      <LinkForward
        href={homeHref}
        trackEvent="l_hero_logo_click"
        className="flex items-center gap-1.5 text-[18px] sm:text-[22px] font-semibold tracking-tight shrink-0 text-foreground"
      >
        <LogoIcon className="h-8 w-8 sm:h-9 sm:w-9" />
        Rest
      </LinkForward>
      <HeroBrandBarControls locale={locale} signinHref={signinHref} signinLabel={signinLabel} />
    </div>
  );
}
