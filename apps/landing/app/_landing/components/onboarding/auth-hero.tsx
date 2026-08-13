"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthTexts } from "../../lib/landing-strings";
import { dashboardUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
import { PRIMARY_FILL } from "../shell";
import { useLandingAuth } from "./use-landing-auth";
import { AuthStep, VerifySubtitle } from "./auth-step";

type Mode = "signin" | "register";

/** Sign in / Create account pill switcher — same measured-sliding-thumb
 *  pattern as the pricing page's monthly/yearly toggle, duplicated locally
 *  so this page can change independently of pricing. */
function Switcher({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  const t = useAuthTexts();
  const signInBtnRef = useRef<HTMLButtonElement>(null);
  const registerBtnRef = useRef<HTMLButtonElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [measured, setMeasured] = useState(false);

  useLayoutEffect(() => {
    const el = mode === "register" ? registerBtnRef.current : signInBtnRef.current;
    if (el) {
      setThumb({ left: el.offsetLeft, width: el.offsetWidth });
      setMeasured(true);
    }
  }, [mode, t.switchSignIn, t.switchCreate]);

  return (
    <div className="relative inline-flex items-center self-start h-10 rounded-lg border border-border/60 bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)] p-1">
      <div
        className={`absolute inset-y-1 rounded-md ${PRIMARY_FILL} transition-all duration-200 ease-out ${measured ? "opacity-100" : "opacity-0"}`}
        style={{ left: thumb.left, width: thumb.width }}
      />
      <button
        ref={signInBtnRef}
        type="button"
        onClick={() => onChange("signin")}
        className={`relative z-10 h-8 px-4 rounded-md text-sm font-medium transition-colors ${
          mode === "signin" ? "text-white" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {t.switchSignIn}
      </button>
      <button
        ref={registerBtnRef}
        type="button"
        onClick={() => onChange("register")}
        className={`relative z-10 h-8 px-4 rounded-md text-sm font-medium transition-colors ${
          mode === "register" ? "text-white" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {t.switchCreate}
      </button>
    </div>
  );
}

/** The whole two-column hero (copy + form) — same card construction as the
 *  homepage hero (`landing-hero-v2.tsx`): one bordered card, living inside
 *  the page's single `Content` column, `grid-cols-[11fr_9fr]` (55/45) on
 *  desktop. The grid tracks
 *  are `minmax(0,Nfr)` (not bare `Nfr`) — a bare `fr` track's minimum size
 *  defaults to its content's min-content width, so the 55/45 split would
 *  drift with however long the register/signin copy happens to be; `minmax(0,…)`
 *  pins the minimum to 0 so content length can never change the ratio.
 *
 *  Lives in the shared `(auth)` layout — NOT in a per-route page.tsx — so
 *  navigating between /login and /register never unmounts it. The switcher
 *  never goes through the Next.js router either (that still triggers a route
 *  transition, enough to cause a visible layout jump) — it's a plain
 *  `setState` and the URL is updated in place via the raw History API.
 *
 *  Copy column layout: switcher pinned to the top, title/subtitle right
 *  below it. The Terms/Privacy consent line lives under the form's buttons
 *  instead (`<AuthConsent>` inside `<AuthStep>`). Fixed height on mobile
 *  (`h-56 sm:h-64`) so switching sign-in/register — whose title+subtitle
 *  differ in length — never shifts the page.
 *
 *  <AuthStep> reports its current screen (email/verify) + typed email up via
 *  `onStepChange`, so once the user reaches the OTP screen this column
 *  swaps to the verify title/subtitle instead — the form column itself
 *  starts straight at the code field, no heading duplicated there. */
export function AuthHero({ locale }: { locale: string }) {
  const t = useAuthTexts();
  const pathname = usePathname();
  const auth = useLandingAuth();

  const [mode, setMode] = useState<Mode>(() => (pathname.endsWith("/register") ? "register" : "signin"));
  const isRegister = mode === "register";
  const [step, setStep] = useState<{ screen: "email" | "verify"; email: string }>({
    screen: "email",
    email: "",
  });

  // Keep in sync with real navigations into this page (header CTA, direct
  // link) — only the switcher below bypasses the router.
  useEffect(() => {
    setMode(pathname.endsWith("/register") ? "register" : "signin");
  }, [pathname]);

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    analytics.track("Click", `Switch to ${next === "signin" ? "sign in" : "signup"}`);
    setMode(next);
    window.history.replaceState(null, "", `/${locale}/${next === "signin" ? "login" : "register"}`);
  };

  useEffect(() => {
    analytics.track("Show", `Auth page (${mode === "signin" ? "sign in" : "signup"})`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Already-authenticated visitors who land on the page get bounced to the dashboard.
  useEffect(() => {
    if (!auth.authenticated) return;
    const dashHref = auth.legacyDashboard ? `/${locale}/dashboard` : `${dashboardUrl()}/${locale}/dashboard`;
    analytics.flush();
    window.location.assign(dashHref);
  }, [auth.authenticated, auth.legacyDashboard, locale]);

  return (
    <section data-section="auth-hero">
      <div className="overflow-hidden rounded-2xl border border-border grid grid-cols-1 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
        {/* Copy column: first in the grid, so on mobile the card simply
            stacks — switcher + heading on top, form below. Fixed height on
            mobile (`h-56 sm:h-64`) keeps the card from jumping when the
            switcher flips sign-in/register copy of different lengths;
            desktop drops the cap (`lg:h-auto lg:min-h-[20rem]`) since the
            consent line pinned to the bottom there does the same job. */}
        <div className="flex h-56 sm:h-64 lg:h-auto flex-col gap-5 p-5 sm:p-6 lg:min-h-[20rem]">
          <Switcher mode={mode} onChange={changeMode} />
          <div className="flex flex-col gap-2">
            {step.screen === "verify" ? (
              <>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                  {t.verifyTitle}
                </h1>
                <VerifySubtitle email={step.email} className="text-sm sm:text-base text-muted-foreground leading-snug" />
              </>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                  {isRegister ? t.registerTitle : t.signInTitle}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-snug">
                  {isRegister ? t.registerSubtitle : t.signInSubtitle}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="relative flex flex-col gap-6 p-5 sm:p-6 bg-[hsl(32_44%_92%)] dark:bg-[hsl(32_14%_14%)]">
          <AuthStep signupContext={null} mode={mode} onStepChange={setStep} />
        </div>
      </div>
    </section>
  );
}
