import { FEATURES } from "../_lib/data";

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2 text-center lg:text-left">
          Everything you need.{" "}
          <span className="text-muted-foreground">Nothing you don&apos;t.</span>
        </h2>
        <p className="text-xs text-muted-foreground mb-10 text-center lg:text-left">
          Built for restaurants. Used at the table.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {FEATURES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 flex flex-row sm:flex-col gap-3 sm:gap-0"
            >
              <div className="shrink-0 sm:mb-4 h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium tracking-tight mb-1.5">{title}</div>
                <div className="text-xs text-muted-foreground leading-snug">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
