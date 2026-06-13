import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resolveSlug } from "../lib/slug";
import { MenuProvider } from "../lib/menu-context";
import { TrialExpiredOverlay } from "../components/trial-expired-overlay";
import { MenuPageTracker } from "../components/menu-page-tracker";
import { NotFoundScreen } from "../components/not-found-screen";
import { preloadMaps } from "../lib/maps-preload";
import type { MenuPayload } from "../lib/types";

export const Route = createRootRoute({ component: RootLayout });

const PREFETCH_ROUTES = ["/menu", "/menu/group/$id", "/menu/cat/$id", "/reserve", "/contacts", "/order", "/order/success", "/language"] as const;

function RootLayout() {
  const slug = resolveSlug();
  const { i18n } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    // Kick off route-chunk preloading immediately so navigation never blocks
    // on a network fetch. The menu drill flow (group → cat) is the hot path,
    // so we don't wait for requestIdleCallback before warming those bundles.
    for (const to of PREFETCH_ROUTES) {
      void router.preloadRoute({ to });
    }
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
      || ((cb: () => void) => setTimeout(cb, 200));
    idle(() => {
      preloadMaps();
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
    if (!data?.restaurant) return;
    // ?lang=<code> from the URL wins over restaurant default — used by the
    // landing demo to open the iframe in the visitor's landing locale, when
    // that locale is enabled on the demo restaurant.
    const langParam = new URLSearchParams(window.location.search).get("lang");
    const enabled = data.restaurant.languages || [];
    const target =
      langParam && enabled.includes(langParam)
        ? langParam
        : data.restaurant.defaultLanguage;
    if (target) void i18n.changeLanguage(target);
  }, [data?.restaurant, i18n]);

  // Drop the inline bootloader once real content is ready to render.
  useEffect(() => {
    if (data || error) document.getElementById("boot")?.remove();
  }, [data, error]);

  if (!slug) {
    return (
      <NotFoundScreen
        title="No restaurant selected"
        body={`Open this app at <slug>.iq-rest.com or pass ?slug=<name> in the URL.`}
      />
    );
  }
  if (isLoading) {
    // Same look as the inline bootloader (index.html) — keeps a single visual
    // state from first paint through fetch completion.
    return <div className="h-dvh bg-black" />;
  }
  if (error || !data) {
    return <NotFoundScreen />;
  }

  // Per-restaurant billing: a restaurant is "trial-expired" when its plan is
  // FREE (or null — i.e. never on a paid plan) and its trialEndsAt is in the
  // past. Paid restaurants and active trials show normally. love-eatery is a
  // demo carve-out (used in the marketing landing iframe).
  const planActive = data.restaurant.plan && data.restaurant.plan !== "FREE";
  const trialExpired =
    !planActive
    && data.restaurant.trialEndsAt !== null
    && new Date(data.restaurant.trialEndsAt) <= new Date()
    && data.restaurant.slug !== "love-eatery";

  // Orders + reservations are PRO-only. For a BASIC (menu-only) restaurant the
  // menu still shows, but the order/booking surfaces are hidden. Force the
  // enabled flags off here so every downstream consumer respects it without a
  // separate proFeatures check.
  const menu: MenuPayload = data.restaurant.proFeatures
    ? data
    : {
        ...data,
        restaurant: {
          ...data.restaurant,
          ordersEnabled: false,
          reservationsEnabled: false,
        },
      };

  return (
    <MenuProvider menu={menu}>
      <MenuPageTracker slug={slug} />
      <Outlet />
      {trialExpired ? <TrialExpiredOverlay defaultLanguage={data.restaurant.defaultLanguage} /> : null}
    </MenuProvider>
  );
}
