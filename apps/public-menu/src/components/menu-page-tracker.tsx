import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

interface Props {
  slug: string;
}

// Posts /api/analytics/track on every route change. Skips ?preview=1 visits.
export function MenuPageTracker({ slug }: Props) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "1") return;
    const path = location.pathname;
    if (lastPath.current === path) return;
    lastPath.current = path;
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      keepalive: true,
      body: JSON.stringify({
        slug,
        page: path,
        language: i18n.language,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [location.pathname, slug, i18n.language]);

  return null;
}
