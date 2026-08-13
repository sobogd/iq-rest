"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Old ad "thank-you" links point back at the landing with `?auth=signup` (or
 *  signin/register/create) to auto-open what used to be the onboarding modal.
 *  Those URLs are already out in the world (Meta/Google campaigns), so this
 *  keeps them working by forwarding to the standalone auth page instead. */
export function LegacyAuthRedirect({ locale }: { locale: string }) {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (!auth) return;
    const path = auth === "signin" ? "login" : "register";
    router.replace(`/${locale}/${path}`);
  }, [locale, router]);

  return null;
}
