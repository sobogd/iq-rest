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
import LanguageSelector from "./LanguageSelector";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Header() {
  const t = useTranslations("header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              href="/features"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.features")}
            </Link>
            <Link
              href="/changelog"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.changelog")}
            </Link>
            <Link
              href="/contacts"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.contacts")}
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-0 md:gap-3">
            <LanguageSelector />
            <Button asChild className="hidden lg:inline-flex">
              <Link href="/dashboard">{t("getStarted")}</Link>
            </Button>

            {/* Mobile Menu */}
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" aria-label="Toggle menu" className="border-0 md:border">
                  <Menu className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="min-w-[250px] max-w-[40vw]">
                <DialogHeader>
                  <DialogTitle className="text-center">{t("nav.menu")}</DialogTitle>
                </DialogHeader>
                <nav className="flex flex-col gap-2 py-4 items-center text-center">
                  <div className="flex flex-col divide-y divide-border/30 w-full">
                    <Link
                      href="/pricing"
                      className="text-foreground hover:text-primary transition-colors py-2 text-lg w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.pricing")}
                    </Link>
                    <Link
                      href="/features"
                      className="text-foreground hover:text-primary transition-colors py-2 text-lg w-full pt-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.features")}
                    </Link>
                    <Link
                      href="/changelog"
                      className="text-foreground hover:text-primary transition-colors py-2 text-lg w-full pt-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.changelog")}
                    </Link>
                    <Link
                      href="/contacts"
                      className="text-foreground hover:text-primary transition-colors py-2 text-lg w-full pt-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.contacts")}
                    </Link>
                  </div>
                  <Button asChild className="w-full mt-6">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
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
