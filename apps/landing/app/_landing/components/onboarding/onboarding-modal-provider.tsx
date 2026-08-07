"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

// Lazy-loaded so the wizard JS isn't part of the landing's initial bundle.
const CreateFlowModal = dynamic(
  () => import("./create-flow-modal").then((m) => ({ default: m.CreateFlowModal })),
  { ssr: false, loading: () => null },
);

export type OnboardingMode = "create" | "signin" | "register";

type OnboardingModalContextValue = {
  open: (mode?: OnboardingMode) => void;
  close: () => void;
  isOpen: boolean;
  mode: OnboardingMode;
};

const OnboardingModalContext = createContext<OnboardingModalContextValue | null>(null);

export function OnboardingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<OnboardingMode>("create");

  const open = useCallback((m: OnboardingMode = "create") => {
    setMode(m);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // ?auth=signup|signin|create auto-opens the modal — used as the ad lead-form
  // thank-you link so the tap lands straight in registration.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (!auth) return;
    const mode: OnboardingMode | null =
      auth === "signup" || auth === "register" ? "register"
      : auth === "signin" ? "signin"
      : auth === "create" ? "create"
      : null;
    if (!mode) return;
    open(mode);
    params.delete("auth");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
  }, [open]);

  const value = useMemo(() => ({ open, close, isOpen, mode }), [open, close, isOpen, mode]);

  return (
    <OnboardingModalContext.Provider value={value}>
      {children}
      {isOpen && <CreateFlowModal open={isOpen} mode={mode} onClose={close} />}
    </OnboardingModalContext.Provider>
  );
}

export function useOnboardingModal(): OnboardingModalContextValue {
  const ctx = useContext(OnboardingModalContext);
  if (!ctx) {
    return { open: () => {}, close: () => {}, isOpen: false, mode: "create" };
  }
  return ctx;
}
