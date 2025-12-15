"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LanguageSelector } from "./language-selector";
import Image from "next/image";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/pricing", key: "nav.pricing" },
  { href: "/changelog", key: "nav.changelog" },
  { href: "/contacts", key: "nav.contacts" },
] as const;

export function Header() {
  const t = useTranslations("header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 hover:opacity-80">
            <Image
              src="/logo.svg"
              alt="SobogdQR Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold">{t("logo")}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0 md:gap-3">
            <LanguageSelector />
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/dashboard">{t("getStarted")}</Link>
            </Button>

            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Toggle menu"
                  className="border-0 md:border"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-[250px] max-w-[40vw]">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {t("nav.menu")}
                  </DialogTitle>
                </DialogHeader>
                <nav className="flex flex-col gap-2 py-4 items-center text-center">
                  <div className="flex flex-col divide-y divide-border/30 w-full">
                    {NAV_LINKS.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-foreground hover:text-primary transition-colors py-2 text-lg w-full ${
                          index > 0 ? "pt-4" : ""
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("getStarted")}
                    </Link>
                  </Button>
                </nav>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
