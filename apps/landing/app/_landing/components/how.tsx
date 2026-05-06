import type { LandingTexts } from "../types";

interface HowProps {
  texts: LandingTexts["how"];
}

export function How({ texts }: HowProps) {
  return (
    <section id="how" data-section="how" className="scroll-mt-16 py-16 bg-muted/20">
      <div className="container mx-auto px-6 sm:px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-3 text-center lg:text-start">
          {texts.heading}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 text-center lg:text-start">{texts.sub}</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {texts.steps.map((s) => (
            <div
              key={s.n}
              className="bg-muted/20 border border-border rounded-2xl p-5 sm:p-6 flex flex-col gap-1.5"
            >
              <div className="text-base sm:text-lg font-semibold tracking-tight">
                <span className="text-primary mr-2">{s.n}.</span>
                {s.t}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
