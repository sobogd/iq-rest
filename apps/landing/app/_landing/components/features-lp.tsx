import type { LandingTexts } from "../types";

interface FeaturesProps {
  texts: LandingTexts["features"];
}

export function FeaturesLp({ texts }: FeaturesProps) {
  return (
    <>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
        {texts.heading}{" "}
        <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
          {texts.headingAccent}
        </span>
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">{texts.sub}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 items-start">
        {texts.items.map(({ Icon, title, desc }) => (
          <div key={title} className="flex flex-row gap-4 sm:gap-5 items-start">
            <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg sm:text-xl font-semibold tracking-tight mb-2">{title}</div>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
