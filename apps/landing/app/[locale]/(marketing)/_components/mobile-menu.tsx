"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { loginUrl } from "@/lib/dashboard-url";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLink[];
  menuTitle: string;
  getStartedLabel: string;
}

export function MobileMenu({ links, menuTitle, getStartedLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle className="text-center">{menuTitle}</DialogTitle>
        </DialogHeader>
        <nav className="flex flex-col gap-2 py-4 items-center text-center">
          <div className="flex flex-col divide-y divide-border/30 w-full">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-foreground hover:text-primary transition-colors py-2 text-lg w-full ${
                  index > 0 ? "pt-4" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button asChild className="w-full mt-6">
            <a href={loginUrl(locale)} onClick={() => setOpen(false)}>
              {getStartedLabel}
            </a>
          </Button>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
