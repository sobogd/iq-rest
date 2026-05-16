import type { LandingTexts } from "../types";

interface HowProps {
  texts: LandingTexts["how"];
}

export function HowLp({ texts }: HowProps) {
  return (
    <>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
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
      <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">{texts.sub}</p>

      {/* Mobile — vertical timeline. Numbered dots are connected by a thin
          line so the four steps read as a sequence rather than a stack of
          unrelated cards. No card chrome → much more compact. */}
      <ol className="lg:hidden flex flex-col max-w-[260px] mx-auto">
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

      {/* Desktop — original 4-col card grid. */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
        {texts.steps.map((s) => (
          <div
            key={s.n}
            className="bg-muted/20 border border-border rounded-2xl p-6 flex flex-col gap-1.5"
          >
            <div className="text-lg font-semibold tracking-tight">
              <span className="text-primary mr-2">{s.n}.</span>
              {s.t}
            </div>
            <div className="text-base text-muted-foreground leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
    </>
  );
}
