import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/routing";

/**
 * Intercepts browser back button to navigate to a specific href
 * instead of native browser history navigation.
 */
export function useBackIntercept(backHref: string) {
  const router = useRouter();
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!pushedRef.current) {
      window.history.pushState(null, "", window.location.href);
      pushedRef.current = true;
    }

    const onPopState = () => {
      router.push(backHref);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [backHref, router]);
}

/**
 * No-op: kept for backward compatibility.
 * Previously blocked browser back button, but that caused users to get stuck.
 */
export function useBlockBack() {
  // intentionally empty — let browser history work naturally
}
