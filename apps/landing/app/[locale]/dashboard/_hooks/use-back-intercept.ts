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
 * Blocks browser back button entirely (for dashboard home).
 */
export function useBlockBack() {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const onPopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
}
