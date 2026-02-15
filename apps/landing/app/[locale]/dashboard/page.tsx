"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { isValidPageKey, PAGE_PATHS } from "./_context/dashboard-context";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Handle legacy hash-based URLs (#categories, #billing, etc.)
    const hash = window.location.hash.slice(1);
    if (hash && isValidPageKey(hash)) {
      router.replace(PAGE_PATHS[hash]);
      return;
    }

    // Handle legacy ?page= query params
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get("page");
    if (pageParam && isValidPageKey(pageParam)) {
      router.replace(PAGE_PATHS[pageParam]);
      return;
    }

    // Default: redirect to onboarding
    router.replace("/dashboard/onboarding");
  }, [router]);

  return null;
}
