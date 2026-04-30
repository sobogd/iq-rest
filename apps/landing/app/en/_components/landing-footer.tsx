const FEATURE_LINKS: { href: string; label: string }[] = [
  { href: "/en/online-orders", label: "Online Ordering" },
  { href: "/en/ai-translation", label: "AI Menu Translation" },
  { href: "/en/reservations", label: "Reservations" },
  { href: "/en/mobile-management", label: "Mobile Management" },
  { href: "/en/easy-menu", label: "Menu Editor" },
  { href: "/en/custom-design", label: "Video & Photo Backgrounds" },
  { href: "/en/color-scheme", label: "Custom Color Scheme" },
  { href: "/en/multilingual", label: "Multilingual Website" },
  { href: "/en/ai-images", label: "AI Image Optimization" },
  { href: "/en/analytics", label: "Analytics & Insights" },
  { href: "/en/instant-setup", label: "Instant Setup" },
  { href: "/en/personal-support", label: "Personal Support" },
];

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "Questions" },
  { href: "/en/contacts", label: "Contacts" },
  { href: "/en/changelog", label: "Changelog" },
  { href: "/en/languages", label: "Change language" },
];

const LEGAL_LINKS: { href: string; label: string }[] = [
  { href: "/en/terms", label: "Terms and Conditions" },
  { href: "/en/privacy", label: "Privacy Policy" },
  { href: "/en/cookies", label: "Cookies Policy" },
  { href: "/sitemap.xml", label: "Sitemap" },
];

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-6">
          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1.5 text-xs md:max-w-[50%]">
            {FEATURE_LINKS.map((link) => (
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
              {NAV_LINKS.map((link) => (
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
              {LEGAL_LINKS.map((link) => (
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
              © {year} IQ Rest. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
