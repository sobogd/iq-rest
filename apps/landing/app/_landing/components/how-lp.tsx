import type { LandingTexts } from "../types";

interface HowProps {
  texts: LandingTexts["how"];
}

export function HowLp({ texts }: HowProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center">
        {texts.heading}
        {texts.headingAccent ? (
          <>
            {" "}
            <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
              {texts.headingAccent}
            </span>
          </>
        ) : null}
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center">{texts.sub}</p>

      <ol className="lg:hidden flex flex-col w-fit max-w-full mx-auto">
        {texts.steps.map((s, i) => {
          const isLast = i === texts.steps.length - 1;
          return (
            <li key={s.n} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden
                  className="absolute left-4 top-9 bottom-0 w-px bg-border"
                />
              ) : null}
              <span className="relative z-10 shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                {s.n}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="text-base font-semibold tracking-tight mb-1">{s.t}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{s.d}</div>
              </div>
            </li>
          );
        })}
      </ol>

      <ol className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
        {texts.steps.map((s) => (
          <li key={s.n} className="flex gap-3 items-center">
            <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
              {s.n}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold tracking-tight mb-1">{s.t}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{s.d}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
