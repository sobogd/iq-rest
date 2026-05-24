import { FooterToolbar } from "./footer-toolbar";
import type { LandingTexts } from "../types";

interface FooterProps {
  texts: LandingTexts["footer"];
  headerTexts: LandingTexts["header"];
  locale: string;
}

// Single-row footer: copyright on the left, legal/lang buttons on the right.
// Feature/keyword nav rows are intentionally omitted to avoid conversion leak.
export function LandingFooter({ texts, headerTexts: _headerTexts, locale }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = texts.copyrightTemplate.replace("{year}", String(year));

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <FooterToolbar locale={locale} navClassName="justify-center sm:justify-start gap-x-4" />
      <p className="text-base text-muted-foreground/80 text-center sm:text-end">
        {copyright}
      </p>
    </div>
  );
}
