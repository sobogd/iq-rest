import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { HeaderCreateButton } from "./header-create-button";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#features", key: "nav.features" },
  { href: "#pricing", key: "nav.pricing" },
] as const;

export async function Header() {
  const t = await getTranslations("header");
  const tHero = await getTranslations("home.hero");

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <Logo height={22} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <HeaderCreateButton>{tHero("cta.create")}</HeaderCreateButton>
          </div>
        </div>
      </div>
    </header>
  );
}
