import type { LandingTexts } from "../types";

interface FooterProps {
  texts: LandingTexts["footer"];
}

export function LandingFooter({ texts }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = texts.copyrightTemplate.replace("{year}", String(year));

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-6">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs md:max-w-[50%]">
            {texts.featureLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-6 md:gap-2 text-center md:text-right">
            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-xs">
              {texts.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              {texts.legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.href.endsWith(".xml") ? "_blank" : undefined}
                  rel={link.href.endsWith(".xml") ? "noopener noreferrer" : undefined}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <p className="text-[11px] text-muted-foreground pt-2 md:mt-1 border-t border-border/60">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
