import { dashboardUrl } from "@/lib/dashboard-url";

const SIGNUP = `${dashboardUrl("/en/login")}?from=landing`;

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3 relative">
        <a href="#top" className="text-2xl sm:text-3xl font-semibold tracking-tight shrink-0">
          IQ <span className="text-primary">Rest</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-5 shrink-0">
          <a href={SIGNUP} className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </a>
          <a
            href={SIGNUP}
            className="inline-flex items-center justify-center h-9 px-4 text-xs font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all"
          >
            Start free trial →
          </a>
        </div>
      </div>
    </header>
  );
}
