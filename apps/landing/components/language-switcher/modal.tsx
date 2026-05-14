"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LANGUAGE_NAMES, LANGUAGE_CODES } from "@/app/_landing/lib/language-names";
import { LinkForward } from "@/app/_landing/components/link-forward";

interface LanguageSwitcherModalProps {
  open: boolean;
  onClose: () => void;
  /** Current locale — highlighted in the grid; navigation strips this from the URL. */
  currentLocale: string;
  title: string;
}

/** Modal grid of every supported language. Clicking a tile navigates to the same site at the
 *  picked locale (root path of that locale). Replaces the standalone /languages page. */
export function LanguageSwitcherModal({ open, onClose, currentLocale, title }: LanguageSwitcherModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LANGUAGE_CODES.map((code) => {
              const isActive = code === currentLocale;
              return (
                <LinkForward
                  key={code}
                  href={`/${code}`}
                  className={
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors " +
                    (isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted")
                  }
                >
                  <span className="text-xs uppercase tabular-nums text-muted-foreground shrink-0 w-7">{code}</span>
                  <span className="truncate">{LANGUAGE_NAMES[code]}</span>
                </LinkForward>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
