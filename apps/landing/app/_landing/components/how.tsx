import type { LandingTexts } from "../types";

interface HowProps {
  texts: LandingTexts["how"];
}

export function How({ texts }: HowProps) {
  return (
    <section id="how" data-section="how" className="scroll-mt-16 py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {texts.heading}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">{texts.sub}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl">
          {texts.steps.map((s) => (
            <div
              key={s.n}
              className="bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-row sm:flex-col gap-3 sm:gap-0"
            >
              <div className="shrink-0 sm:mb-3 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                {s.n}
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-semibold mb-2 tracking-tight">{s.t}</div>
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
