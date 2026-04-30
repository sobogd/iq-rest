import { CtaButton } from "./cta-button";

export function FinalCta() {
  return (
    <section className="border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight mb-3 leading-[1.15]">
              Ready in 2 minutes.{" "}
              <span className="bg-gradient-to-br from-primary to-amber-400 bg-clip-text text-transparent">
                Free for 14 days.
              </span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto lg:mx-0 leading-snug">
              No credit card required. Cancel anytime. Join 500+ restaurants already running on IQ Rest.
            </p>
          </div>
          <CtaButton align="end" />
        </div>
      </div>
    </section>
  );
}
