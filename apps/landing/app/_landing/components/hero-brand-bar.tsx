import { LogoIcon } from "./logo-icon";
import { LinkForward } from "./link-forward";
import { HeroBrandBarControls } from "./hero-brand-bar-controls";

interface HeroBrandBarProps {
  locale: string;
}

// PPC LP only — a plain logo + theme + language-switcher row at the top
// of the hero. Not a header, not sticky, no border. Pairs with the real
// sticky header that slides in once the visitor scrolls past the hero.
//
// SSR-friendly: this component itself ships as server-rendered HTML.
// Only the small theme/language island in HeroBrandBarControls is
// hydrated as a client component.
export function HeroBrandBar({ locale }: HeroBrandBarProps) {
  const homeHref = `/${locale}`;
  return (
    <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
      <LinkForward
        href={homeHref}
        trackEvent="land_hero_logo_click"
        className="flex items-center gap-1.5 text-[18px] sm:text-[22px] font-semibold tracking-tight shrink-0 text-foreground"
      >
        <LogoIcon className="h-8 w-8 sm:h-9 sm:w-9" />
        Rest
      </LinkForward>
      <HeroBrandBarControls locale={locale} />
    </div>
  );
}
