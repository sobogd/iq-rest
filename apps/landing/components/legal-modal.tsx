"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  COOKIE_POLICY_TITLE,
  COOKIE_POLICY_SECTIONS,
  TERMS_TITLE,
  TERMS_SECTIONS,
  PRIVACY_POLICY_TITLE,
  PRIVACY_POLICY_SECTIONS,
} from "@/components/cookie-consent/legal-text";

export type LegalView = "policy" | "terms" | "privacy" | null;

export function LegalModal({ view, onClose }: { view: LegalView; onClose: () => void }) {
  const open = view !== null;
  const sections =
    view === "policy" ? COOKIE_POLICY_SECTIONS :
    view === "privacy" ? PRIVACY_POLICY_SECTIONS :
    TERMS_SECTIONS;
  const title =
    view === "policy" ? COOKIE_POLICY_TITLE :
    view === "privacy" ? PRIVACY_POLICY_TITLE :
    TERMS_TITLE;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-3 border-b">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-sm leading-relaxed text-foreground">
          {sections.map((sec, i) => (
            <section key={i} className="space-y-2">
              {sec.heading && <h3 className="text-base font-semibold mt-4">{sec.heading}</h3>}
              {sec.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground whitespace-pre-line">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
