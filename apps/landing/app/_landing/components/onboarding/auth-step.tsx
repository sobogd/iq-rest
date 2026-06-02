"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, ChevronLeft } from "lucide-react";
import { dashboardApi, dashboardApiBase, dashboardUrl } from "@/lib/dashboard-url";
import { analytics } from "@/lib/analytics";
import type { CuisineKey } from "./cuisine";


const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "576149678945-vjqlc4sce6bsne3p0n63bqdvf33k43s0.apps.googleusercontent.com";

// Sign in with Apple — the Services ID is the web OAuth client_id.
const APPLE_SERVICES_ID =
  process.env.NEXT_PUBLIC_APPLE_SERVICES_ID || "com.iqrest.web";

const CODE_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const ERROR_MAP: Record<string, string> = {
  CODE_EXPIRED: "errors.codeExpired",
  NO_CODE: "errors.noCode",
  INVALID_CODE: "errors.invalidCode",
  TOO_MANY_ATTEMPTS: "errors.tooManyAttempts",
};

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type SignupContext = { cuisine: CuisineKey; restaurantName: string };

type Screen = "email" | "verify";

function redirectAfterAuth(locale: string, legacyDashboard: boolean) {
  if (legacyDashboard) {
    // Legacy users land on the old monolith dashboard, which lives on iq-rest.com.
    window.location.assign(`/${locale}/dashboard`);
    return;
  }
  window.location.assign(`${dashboardUrl()}/${locale}/dashboard`);
}

export function AuthStep({
  signupContext,
  variant = "signin",
}: {
  signupContext: SignupContext | null;
  /** "register" → fresh-signup copy (onboarding skipped); "signin" → returning-user copy. */
  variant?: "signin" | "register";
}) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const isRegister = variant === "register";

  const [screen, setScreen] = useState<Screen>("email");
  // The "email" screen opens on a method choice (Google / Apple / Email).
  // The email input form is revealed only after the user picks "email".
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState<"idle" | "loading" | "sent">("idle");
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleGoogleClick = () => {
    if (!GOOGLE_CLIENT_ID) return;
    analytics.track("l_onb_google_click");
    const state = btoa(
      JSON.stringify({
        locale,
        signupContext: signupContext ?? undefined,
      }),
    );
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
    window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  };

  const handleAppleClick = () => {
    if (!APPLE_SERVICES_ID) return;
    analytics.track("l_onb_apple_click");
    const state = btoa(
      JSON.stringify({
        locale,
        signupContext: signupContext ?? undefined,
      }),
    );
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
    window.location.assign(`https://appleid.apple.com/auth/authorize?${params.toString()}`);
  };

  const handleContinue = async () => {
    analytics.track("l_onb_email_submit");
    const trimmed = email.trim().toLowerCase();
    if (!isValidEmail(trimmed)) {
      analytics.track("l_onb_email_invalid");
      setErrorMessage(t("errors.emailInvalid"));
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
        analytics.track("l_onb_otp_sent");
        setCode(Array(CODE_LENGTH).fill(""));
        setCooldown(RESEND_COOLDOWN);
        setStatus("idle");
        setScreen("verify");
      } else {
        setErrorMessage(data.error || t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  };

  const handleVerify = async () => {
    analytics.track("l_onb_verify_submit");
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
        analytics.track("l_onb_verify_success");
        redirectAfterAuth(locale, !!data.legacyDashboard);
      } else {
        const key = ERROR_MAP[data.error];
        setErrorMessage(key ? t(key) : t("errors.verifyFailed"));
        setStatus("error");
        setCode(Array(CODE_LENGTH).fill(""));
      }
    } catch {
      setErrorMessage(t("errors.verifyFailed"));
      setStatus("error");
      setCode(Array(CODE_LENGTH).fill(""));
    }
  };

  const handleResend = async () => {
    analytics.track("l_onb_resend_click");
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
        setErrorMessage(t("errors.sendFailed"));
        setStatus("error");
      }
    } catch {
      setResendStatus("idle");
      setErrorMessage(t("errors.sendFailed"));
      setStatus("error");
    }
  };

  const handleChangeEmail = () => {
    analytics.track("l_onb_change_email_click");
    setCode(Array(CODE_LENGTH).fill(""));
    setScreen("email");
    setEmailOpen(true);
    setStatus("idle");
    setErrorMessage("");
  };

  if (screen === "verify") {
    return (
      <VerifyScreen
        email={email}
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
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-2">
        {signupContext
          ? t("titleWithName", { name: signupContext.restaurantName })
          : isRegister
            ? t("registerTitle")
            : t("signInTitle")}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-snug mb-6">
        {emailOpen
          ? signupContext
            ? t("subtitle")
            : isRegister
              ? t("registerSubtitle")
              : t("signInSubtitle")
          : t("chooseSubtitle")}
      </p>

      {status === "error" && errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 text-sm leading-snug">
          {errorMessage}
        </div>
      )}

      {emailOpen ? (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <label htmlFor="onboarding-email" className="block text-sm font-medium text-foreground mb-2 tracking-tight">
              {t("emailLabel")}
            </label>
            <input
              id="onboarding-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              autoFocus
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => analytics.track("l_onb_email_focus")}
              disabled={status === "loading"}
              className="w-full h-12 px-4 text-base text-foreground bg-background border border-border rounded-xl placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 h-12 w-full text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-xl hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("continueEmail")}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setEmailOpen(false);
              setStatus("idle");
              setErrorMessage("");
            }}
            className="w-full inline-flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-3 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("changeMethod")}
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGoogleClick}
            className="w-full h-12 text-base font-medium text-foreground bg-background border border-border rounded-xl hover:border-foreground active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <GoogleIcon />
            {t("continueGoogle")}
          </button>

          <button
            type="button"
            onClick={handleAppleClick}
            className="w-full h-12 text-base font-medium text-foreground bg-background border border-border rounded-xl hover:border-foreground active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <AppleIcon />
            {t("continueApple")}
          </button>

          <button
            type="button"
            onClick={() => {
              analytics.track("l_onb_email_option_click");
              setEmailOpen(true);
            }}
            className="w-full h-12 text-base font-medium text-foreground bg-background border border-border rounded-xl hover:border-foreground active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <EmailIcon />
            {t("emailOption")}
          </button>
        </div>
      )}

      <p className="text-xs text-muted-foreground leading-snug text-center mt-5">
        {t("consent.text")}{" "}
        <a
          href={`/${locale}/terms`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track("l_onb_open_terms")}
          className="text-foreground/80 hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {t("consent.terms")}
        </a>{" "}
        {t("consent.and")}{" "}
        <a
          href={`/${locale}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track("l_onb_open_privacy")}
          className="text-foreground/80 hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {t("consent.privacy")}
        </a>
      </p>
    </div>
  );
}

function VerifyScreen({
  email,
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
  email: string;
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
  const t = useTranslations("auth");
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

  const parts = t("verifySubtitle", { email }).split(email);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight mb-2">
        {t("verifyTitle")}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground leading-snug mb-6">
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

      {status === "error" && errorMessage && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-red-400 text-sm leading-snug">
          {errorMessage}
        </div>
      )}

      <label htmlFor="onboarding-otp" className="block text-sm font-medium text-foreground mb-2 tracking-tight">
        {t("verifyCodeLabel")}
      </label>
      <input
        id="onboarding-otp"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={CODE_LENGTH}
        value={joined}
        onChange={(e) => setFromString(e.target.value)}
        onFocus={() => analytics.track("l_onb_otp_focus")}
        onKeyDown={(e) => {
          if (e.key === "Enter" && canVerify) onVerify();
        }}
        disabled={status === "loading"}
        placeholder="••••••"
        className="w-full h-14 px-4 text-center text-2xl font-semibold text-foreground bg-background border border-border rounded-xl focus:outline-none focus:border-foreground transition-colors tabular-nums tracking-[0.4em] placeholder:tracking-[0.4em] placeholder:text-muted-foreground/40 disabled:opacity-50"
      />

      <p className="text-xs text-muted-foreground mt-3">{t("checkSpam")}</p>

      <button
        type="button"
        onClick={onVerify}
        disabled={!canVerify || status === "loading"}
        className="mt-6 h-12 w-full text-base font-semibold text-white bg-gradient-to-br from-[hsl(9,100%,58%)] to-[hsl(35,95%,55%)] rounded-xl hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        {t("verifyButton")}
      </button>

      <div className="flex items-center justify-between mt-5">
        <button
          type="button"
          onClick={onChangeEmail}
          className="text-xs font-medium text-muted-foreground hover:text-foreground tracking-tight transition-colors flex items-center gap-1"
        >
          ← {t("changeEmail")}
        </button>
        <button
          type="button"
          onClick={onResend}
          disabled={cooldown > 0 || resendStatus === "loading"}
          className="text-xs font-medium text-foreground hover:text-foreground/70 tracking-tight transition-colors disabled:text-muted-foreground disabled:cursor-not-allowed flex items-center gap-1"
        >
          {resendStatus === "loading" ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : resendStatus === "sent" ? (
            t("resendSent")
          ) : cooldown > 0 ? (
            `${t("resendCode")} (${cooldown}s)`
          ) : (
            t("resendCode")
          )}
        </button>
      </div>
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

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
