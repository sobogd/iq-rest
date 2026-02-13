import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { LanguageSelector } from "./language-selector";
import { HeaderCreateButton } from "./header-create-button";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#features", key: "nav.features" },
  { href: "#pricing", key: "nav.pricing" },
] as const;

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 hover:opacity-80">
            <Logo width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold">{t("logo")}</span>
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
            <LanguageSelector />
            <HeaderCreateButton>{t("getStarted")}</HeaderCreateButton>
          </div>
        </div>
      </div>
    </header>
  );
}
