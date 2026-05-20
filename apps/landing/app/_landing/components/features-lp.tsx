import type { LandingTexts } from "../types";
import { LinkForward } from "./link-forward";

interface FeaturesProps {
  texts: LandingTexts["features"];
}

export function FeaturesLp({ texts }: FeaturesProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {texts.heading ? (
        <>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">
            {texts.heading}{" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">{texts.sub}</p>
        </>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 items-start">
        {texts.items.map(({ Icon, title, desc, href }) => (
          <div key={title} className="flex flex-row gap-4 sm:gap-5 items-start">
            <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg sm:text-xl font-semibold tracking-tight mb-2">
                {href ? (
                  <LinkForward
                    href={href}
                    trackEvent={`l_feature_card_click_${href.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {title}
                  </LinkForward>
                ) : (
                  title
                )}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
