import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resolveSlug } from "../lib/slug";
import { MenuProvider } from "../lib/menu-context";
import { TrialExpiredOverlay } from "../components/trial-expired-overlay";
import { MenuPageTracker } from "../components/menu-page-tracker";
import { PageTitle } from "../components/page-title";
import type { MenuPayload } from "../lib/types";

export const Route = createRootRoute({ component: RootLayout });

const PREFETCH_ROUTES = ["/menu", "/reserve", "/contacts", "/order", "/order/table", "/order/success", "/language"] as const;

function RootLayout() {
  const slug = resolveSlug();
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      || ((cb: () => void) => setTimeout(cb, 200));
    idle(() => {
      for (const to of PREFETCH_ROUTES) {
        void router.preloadRoute({ to });
      }
    });
  }, [router]);

  const { data, isLoading, error } = useQuery<MenuPayload>({
    enabled: !!slug,
    queryKey: ["menu", slug],
    retry: 3,
    retryDelay: (attempt) => Math.min(500 * 2 ** attempt, 4000),
    staleTime: Infinity, // single fetch per session — survives nav between pages
    queryFn: async () => {
      const res = await fetch(`/api/public/menu/${slug}`);
      if (!res.ok) throw new Error(`menu fetch failed (${res.status})`);
      return res.json();
    },
  });

  useEffect(() => {
    if (data?.restaurant.defaultLanguage) {
      void i18n.changeLanguage(data.restaurant.defaultLanguage);
    }
  }, [data?.restaurant.defaultLanguage, i18n]);

  // Drop the inline bootloader once real content is ready to render.
  useEffect(() => {
    if (data || error) document.getElementById("boot")?.remove();
  }, [data, error]);

  if (!slug) {
    return (
      <div className="p-8 text-sm">
        Open as <code>&lt;slug&gt;.iq-rest.com</code> or pass <code>?slug=&lt;name&gt;</code>.
      </div>
    );
  }
  if (isLoading) {
    // Same look as the inline bootloader (index.html) — keeps a single visual
    // state from first paint through fetch completion.
    return <div className="h-dvh bg-black" />;
  }
  if (error || !data) {
    return (
      <div className="h-dvh flex items-center justify-center bg-black text-white/80 px-6 text-center">
        Restaurant not found.
      </div>
    );
  }

  const trialExpired =
    data.restaurant.company.plan === "FREE"
    && data.restaurant.company.trialEndsAt !== null
    && new Date(data.restaurant.company.trialEndsAt) <= new Date()
    && data.restaurant.slug !== "love-eatery";

  return (
    <MenuProvider menu={data}>
      <PageTitle title={data.restaurant.title} description={data.restaurant.description} />
      <MenuPageTracker slug={slug} />
      <Outlet />
      {trialExpired ? <TrialExpiredOverlay defaultLanguage={data.restaurant.defaultLanguage} /> : null}
    </MenuProvider>
  );
}
