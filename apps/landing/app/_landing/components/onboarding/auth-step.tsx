"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { dashboardApi, dashboardApiBase, dashboardUrl } from "@/lib/dashboard-url";
import { localePath } from "@/lib/locale-paths";
import { analytics } from "@/lib/analytics";
import { BTN_BOX, PRIMARY_FILL } from "../shell";
import { useAuthTexts, useLandingLocale } from "../../lib/landing-strings";
import type { AuthTexts } from "../../types";
import type { CuisineKey } from "./cuisine";


const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "576149678945-vjqlc4sce6bsne3p0n63bqdvf33k43s0.apps.googleusercontent.com";

// Sign in with Apple — the Services ID is the web OAuth client_id.
const APPLE_SERVICES_ID =
  process.env.NEXT_PUBLIC_APPLE_SERVICES_ID || "com.iqrest.web";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const ERROR_MAP: Record<string, keyof AuthTexts["errors"]> = {
  CODE_EXPIRED: "codeExpired",
  NO_CODE: "noCode",
  INVALID_CODE: "invalidCode",
  TOO_MANY_ATTEMPTS: "tooManyAttempts",
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Encode the OAuth `state` payload as unicode-safe base64url.
 *  Plain `btoa(JSON.stringify(...))` (a) throws on non-Latin1 restaurant names,
 *  killing the Google/Apple button silently, and (b) emits standard base64
 *  (`+` `/` `=`) which the API's `base64url` decode + the query/form parser
 *  mangle (`+` → space) — so locale + signupContext get lost. base64url avoids
 *  both. */
function encodeState(payload: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Detect an in-app webview (Instagram/Facebook/TikTok/…). Google blocks OAuth
 *  in many of these (`disallowed_useragent`), so we surface the email option as
 *  the primary path there — it works in every browser. */
function isInAppWebView(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|TikTok|musical_ly|Snapchat|Pinterest|; wv\)/i.test(ua);
}

type SignupContext = { cuisine?: CuisineKey; restaurantName: string };

type Screen = "email" | "verify";

function redirectAfterAuth(locale: string, legacyDashboard: boolean) {
  // The "Code accepted" event is the conversion — it must leave the
  // browser before the document is torn down by the redirect.
  analytics.flush();
  if (legacyDashboard) {
    // Legacy users land on the old monolith dashboard, which lives on iq-rest.com.
    window.location.assign(`/${locale}/dashboard`);
    return;
  }
  window.location.assign(`${dashboardUrl()}/${locale}/dashboard`);
}

export function AuthStep({
  signupContext,
  mode,
  onStepChange,
}: {
  signupContext: SignupContext | null;
  /** Controlled by the auth page's switcher: "register" → signup copy;
   *  "signin" → bare returning-user copy. The backend flow is identical. */
  mode: "signin" | "register";
  /** Reports the current screen + email up to <AuthHero> so its copy column
   *  can show the matching title (verify title/subtitle on the OTP screen
   *  instead of the sign-in/register one). */
  onStepChange?: (step: { screen: Screen; email: string }) => void;
}) {
  const t = useAuthTexts();
  const locale = useLandingLocale();
  const isRegister = mode === "register";

  const [screen, setScreen] = useState<Screen>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "sent">("idle");
  // In-app webviews (Instagram/Facebook/…) routinely block Google/Apple OAuth
  // (disallowed_useragent) and can't break out to the system browser. Detect on
  // mount and take those users straight to the email + OTP form — the only path
  // that works in every browser. Effect-based (not a lazy initializer) to stay
  // SSR/hydration-safe; costs at most one frame on the method screen.
  const [inApp, setInApp] = useState(false);
  useEffect(() => {
    if (isInAppWebView()) {
      setInApp(true);
    }
  }, []);
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);
  useEffect(() => {
    onStepChange?.({ screen, email });
  }, [screen, email, onStepChange]);

  // Flipping the switcher mid-OTP would otherwise leave a stale code screen
  // (and email) hanging around for the other mode — reset back to a clean
  // email screen whenever sign-in/register changes. Skipped on mount (the
  // ref starts equal to the first `mode`) so it doesn't clobber the initial
  // state.
  const prevModeRef = useRef(mode);
  useEffect(() => {
    if (prevModeRef.current === mode) return;
    prevModeRef.current = mode;
    setScreen("email");
    setEmail("");
    setCode(Array(CODE_LENGTH).fill(""));
    setStatus("idle");
    setErrorMessage("");
    setCooldown(0);
    setResendStatus("idle");
  }, [mode]);

  const handleGoogleClick = () => {
    if (!GOOGLE_CLIENT_ID) return;
    analytics.track("Click", "Sign in with Google");
    const state = encodeState({ locale, signupContext: signupContext ?? undefined });
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: `${dashboardApiBase()}/api/auth/google/callback`,
      response_type: "code",
      scope: "openid email profile",
      access_type: "online",
      prompt: "select_account",
      include_granted_scopes: "true",
      state,
    });
    analytics.flush();
    window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  };

  const handleAppleClick = () => {
    if (!APPLE_SERVICES_ID) return;
    analytics.track("Click", "Sign in with Apple");
    const state = encodeState({ locale, signupContext: signupContext ?? undefined });
    // scope name+email forces response_mode=form_post — Apple POSTs the
    // callback (and sends the name only on the first authorization). The
    // redirect_uri must byte-match the one registered on the Services ID
    // and the one the API uses when exchanging the code.
    const params = new URLSearchParams({
      client_id: APPLE_SERVICES_ID,
      redirect_uri: `${dashboardApiBase()}/api/auth/apple/callback`,
      response_type: "code",
      response_mode: "form_post",
      scope: "name email",
      state,
    });
    analytics.flush();
    window.location.assign(`https://appleid.apple.com/auth/authorize?${params.toString()}`);
  };

  const handleContinue = async () => {
    analytics.track("Click", "Email submit");
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      analytics.track("Show", "Email invalid");
      setErrorMessage(t.errors.emailInvalid);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(dashboardApi("/api/auth/send-otp"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, locale, signupContext: signupContext ?? undefined }),
      });
      const data = await res.json();
      if (res.ok) {
        analytics.track("Show", "Code sent");
        setCode(Array(CODE_LENGTH).fill(""));
        setCooldown(RESEND_COOLDOWN);
        setStatus("idle");
        setScreen("verify");
      } else {
        setErrorMessage(data.error || t.errors.sendFailed);
        setStatus("error");
      }
    } catch {
      setErrorMessage(t.errors.sendFailed);
      setStatus("error");
    }
  };

  const handleVerify = async () => {
    analytics.track("Click", "Code submit");
    const otp = code.join("");
    if (otp.length !== CODE_LENGTH) return;
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(dashboardApi("/api/auth/verify-otp"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: otp }),
      });
      const data = await res.json();
      if (res.ok) {
        analytics.track("Show", "Code accepted");
        redirectAfterAuth(locale, !!data.legacyDashboard);
      } else {
        const key = ERROR_MAP[data.error];
        setErrorMessage(key ? t.errors[key] : t.errors.verifyFailed);
        setStatus("error");
        setCode(Array(CODE_LENGTH).fill(""));
      }
    } catch {
      setErrorMessage(t.errors.verifyFailed);
      setStatus("error");
      setCode(Array(CODE_LENGTH).fill(""));
    }
  };

  const handleResend = async () => {
    analytics.track("Click", "Resend code");
    if (cooldown > 0 || resendStatus === "loading") return;
    setResendStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(dashboardApi("/api/auth/send-otp"), {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), locale, signupContext }),
      });
      if (res.ok) {
        setResendStatus("sent");
        setCooldown(RESEND_COOLDOWN);
        setCode(Array(CODE_LENGTH).fill(""));
        setTimeout(() => setResendStatus("idle"), 3000);
      } else {
        setResendStatus("idle");
        setErrorMessage(t.errors.sendFailed);
        setStatus("error");
      }
    } catch {
      setResendStatus("idle");
      setErrorMessage(t.errors.sendFailed);
      setStatus("error");
    }
  };

  const handleChangeEmail = () => {
    analytics.track("Click", "Change email");
    setCode(Array(CODE_LENGTH).fill(""));
    setScreen("email");
    setStatus("idle");
    setErrorMessage("");
  };

  if (screen === "verify") {
    return (
      <VerifyScreen
        code={code}
        setCode={setCode}
        onVerify={handleVerify}
        onResend={handleResend}
        onChangeEmail={handleChangeEmail}
        status={status}
        errorMessage={errorMessage}
        cooldown={cooldown}
        resendStatus={resendStatus}
      />
    );
  }

  return (
    <div>
      {status === "error" && errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 text-sm leading-snug">
          {errorMessage}
        </div>
      )}

      {/* Email-first (variant A): the primary path is a single email field —
          it converts best once submitted, so we surface it immediately with no
          extra "choose a method" click. Google/Apple sit below as a secondary
          row. In-app webviews (which block Google/Apple OAuth) hide that row. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
      >
        <input
          id="onboarding-email"
          aria-label={t.emailLabel}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => analytics.track("Focus", "Email field")}
          disabled={status === "loading"}
          className="w-full h-10 px-4 text-sm text-foreground bg-background/60 border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className={`mt-4 w-full ${BTN_BOX} ${PRIMARY_FILL} hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {isRegister ? t.registerButton : t.signInButton}
        </button>
      </form>

      {!inApp && (
        <>
          <div className="flex items-center gap-3 my-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">{t.or}</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Google/Apple branding guidelines both require the full
              "Continue with …" label next to the logo — never the bare
              brand name — so the buttons stack instead of sharing a row. */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleClick}
              className={`${BTN_BOX} text-foreground bg-background/60 border border-border hover:bg-muted active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <GoogleIcon />
              {t.continueGoogle}
            </button>

            <button
              type="button"
              onClick={handleAppleClick}
              className={`${BTN_BOX} text-foreground bg-background/60 border border-border hover:bg-muted active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer`}
            >
              <AppleIcon />
              {t.continueApple}
            </button>
          </div>
        </>
      )}

      <AuthConsent className="mt-4 text-center" />
    </div>
  );
}

/** Clickwrap notice shown next to the auth actions: acceptance of the Terms
 *  at the moment of registration; the Privacy Policy is referenced as
 *  information (GDPR Art. 13 notice), not as something the user "agrees" to. */
export function AuthConsent({ className }: { className?: string }) {
  const t = useAuthTexts();
  const locale = useLandingLocale();
  const link = (href: string) => ({
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "underline underline-offset-2 hover:text-foreground transition-colors",
  });

  // consent.line keeps the <terms>…</terms> / <privacy>…</privacy> tags from
  // the old messages format; split keeps [text, tag, inner, text, …] triples.
  const chunks = t.consent.line.split(/<(terms|privacy)>(.*?)<\/\1>/g);
  return (
    <p className={`text-xs text-muted-foreground leading-snug ${className ?? ""}`}>
      {chunks.map((chunk, i) => {
        if (i % 3 === 1) return null;
        if (i % 3 === 2) {
          const href = localePath(locale, chunks[i - 1] === "terms" ? "/terms" : "/privacy");
          return (
            <a key={i} {...link(href)}>
              {chunk}
            </a>
          );
        }
        return <span key={i}>{chunk}</span>;
      })}
    </p>
  );
}

/** The verify screen's subtitle ("We sent a 6-digit code to {email}"), with
 *  the email bolded — shared between <AuthHero>'s copy column (where the
 *  verify title/subtitle now live) and anywhere else that needs the same
 *  markup. */
export function VerifySubtitle({ email, className }: { email: string; className?: string }) {
  const t = useAuthTexts();
  const parts = t.verifySubtitle.split("{email}");
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i < parts.length - 1 ? (
          <span key={i}>
            {part}
            <span className="text-foreground font-medium">{email}</span>
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

function VerifyScreen({
  code,
  setCode,
  onVerify,
  onResend,
  onChangeEmail,
  status,
  errorMessage,
  cooldown,
  resendStatus,
}: {
  code: string[];
  setCode: (c: string[]) => void;
  onVerify: () => void;
  onResend: () => void;
  onChangeEmail: () => void;
  status: "idle" | "loading" | "error";
  errorMessage: string;
  cooldown: number;
  resendStatus: "idle" | "loading" | "sent";
}) {
  const t = useAuthTexts();
  const joined = code.join("");
  const canVerify = joined.length === CODE_LENGTH;

  const setFromString = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill("") as string[];
    digits.split("").forEach((c, i) => (next[i] = c));
    setCode(next);
    if (digits.length === CODE_LENGTH) {
      setTimeout(onVerify, 50);
    }
  };

  return (
    <div>
      {/* Title/subtitle moved to the hero's copy column (see <AuthHero>) —
          this screen starts straight at the code field. */}
      {status === "error" && errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 text-sm leading-snug">
          {errorMessage}
        </div>
      )}

      <input
        id="onboarding-otp"
        aria-label={t.verifyCodeLabel}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={CODE_LENGTH}
        value={joined}
        onChange={(e) => setFromString(e.target.value)}
        onFocus={() => analytics.track("Focus", "Code field")}
        onKeyDown={(e) => {
          if (e.key === "Enter" && canVerify) onVerify();
        }}
        disabled={status === "loading"}
        placeholder="123456"
        className="w-full h-10 px-4 text-sm text-foreground bg-background/60 border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors disabled:opacity-50"
      />

      <button
        type="button"
        onClick={onVerify}
        disabled={!canVerify || status === "loading"}
        className={`mt-4 w-full ${BTN_BOX} ${PRIMARY_FILL} hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2`}
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {t.verifyButton}
      </button>

      <div className="flex items-center gap-3 my-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground">{t.or}</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Same outline treatment as the Google/Apple buttons on the email
          screen — these are secondary actions off the same visual family. */}
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onChangeEmail}
          className={`${BTN_BOX} text-foreground bg-background/60 border border-border hover:bg-muted active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer`}
        >
          {t.changeEmail}
        </button>
        <button
          type="button"
          onClick={onResend}
          disabled={cooldown > 0 || resendStatus === "loading"}
          className={`${BTN_BOX} text-foreground bg-background/60 border border-border hover:bg-muted active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:text-muted-foreground disabled:cursor-not-allowed disabled:active:scale-100`}
        >
          {resendStatus === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : resendStatus === "sent" ? (
            t.resendSent
          ) : cooldown > 0 ? (
            `${t.resendCode} (${cooldown}s)`
          ) : (
            t.resendCode
          )}
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">{t.checkSpam}</p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="fill-foreground">
      <path d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.41-.9-1.75.03-3.37 1.02-4.27 2.59-1.82 3.16-.47 7.84 1.31 10.41.87 1.26 1.9 2.67 3.25 2.62 1.31-.05 1.8-.84 3.38-.84 1.58 0 2.02.84 3.4.82 1.41-.03 2.3-1.28 3.16-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.73-1.05-2.76-4.15z" />
      <path d="M14.46 4.84c.72-.87 1.21-2.08 1.07-3.29-1.04.04-2.29.69-3.03 1.56-.66.77-1.24 2-1.09 3.18 1.16.09 2.34-.59 3.05-1.45z" />
    </svg>
  );
}

