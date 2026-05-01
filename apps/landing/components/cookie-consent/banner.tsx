"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getConsent, setConsent } from "@/lib/cookie-consent";
import {
  COOKIE_POLICY_TITLE,
  COOKIE_POLICY_SECTIONS,
  TERMS_TITLE,
  TERMS_SECTIONS,
  PRIVACY_POLICY_TITLE,
  PRIVACY_POLICY_SECTIONS,
} from "./legal-text";

type LegalView = "policy" | "terms" | "privacy" | null;

export type CookieBannerTexts = {
  title: string;
  message: string;
  accept: string;
  reject: string;
  cookiePolicyLink: string;
  privacyPolicyLink: string;
  termsLink: string;
  cookieSettings: string;
  languageSwitcher: string;
};

interface CookieBannerProps {
  texts: CookieBannerTexts;
}

export function CookieBanner({ texts }: CookieBannerProps) {
  // `null` until we read the cookie on mount — avoids a banner flash for users who already chose.
  const [show, setShow] = useState<boolean | null>(null);
  const [legal, setLegal] = useState<LegalView>(null);

  useEffect(() => {
    setShow(getConsent() === null);
    const onChange = () => setShow(getConsent() === null);
    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, []);

  function handleAccept() {
    setConsent("accepted");
    setShow(false);
  }
  function handleReject() {
    setConsent("rejected");
    setShow(false);
  }

  if (show !== true) {
    return <LegalModal view={legal} onClose={() => setLegal(null)} />;
  }

  return (
    <>
      {/* Primary consent modal — dismiss attempts (ESC, backdrop click, X button) are treated
          as an explicit Reject so the choice is recorded either way. */}
      <Dialog open onOpenChange={(o) => { if (!o) handleReject(); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">{texts.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{texts.message}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => setLegal("policy")}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              {texts.cookiePolicyLink}
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setLegal("privacy")}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              {texts.privacyPolicyLink}
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setLegal("terms")}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              {texts.termsLink}
            </button>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleReject}
              className="h-10 px-4 text-sm font-medium text-foreground bg-transparent border border-input rounded-md hover:border-foreground transition-colors"
            >
              {texts.reject}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="h-10 px-4 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              {texts.accept}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <LegalModal view={legal} onClose={() => setLegal(null)} />
    </>
  );
}

/** Secondary modal that shows the full English legal text for either Cookie Policy or Terms.
 *  Scrollable, dismissible by close button, ESC, or backdrop click. */
function LegalModal({ view, onClose }: { view: LegalView; onClose: () => void }) {
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
