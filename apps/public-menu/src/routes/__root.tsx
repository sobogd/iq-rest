import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { resolveSlug } from "../lib/slug";
import { MenuProvider } from "../lib/menu-context";
import { TrialExpiredOverlay } from "../components/trial-expired-overlay";
import { MenuPageTracker } from "../components/menu-page-tracker";
import type { MenuPayload } from "../lib/types";

export const Route = createRootRoute({ component: RootLayout });

function RootLayout() {
  const slug = resolveSlug();
  const { i18n } = useTranslation();

  const { data, isLoading, error } = useQuery<MenuPayload>({
    enabled: !!slug,
    queryKey: ["menu", slug],
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

  if (!slug) {
    return (
      <div className="p-8 text-sm">
        Open as <code>&lt;slug&gt;.iq-rest.com</code> or pass <code>?slug=&lt;name&gt;</code>.
      </div>
    );
  }
  if (isLoading) return <div className="p-8">Loading…</div>;
  if (error || !data) return <div className="p-8">Restaurant not found.</div>;

  const trialExpired =
    data.restaurant.company.plan === "FREE"
    && data.restaurant.company.trialEndsAt !== null
    && new Date(data.restaurant.company.trialEndsAt) <= new Date()
    && data.restaurant.slug !== "love-eatery";

  return (
    <MenuProvider menu={data}>
      <MenuPageTracker slug={slug} />
      <Outlet />
      {trialExpired ? <TrialExpiredOverlay defaultLanguage={data.restaurant.defaultLanguage} /> : null}
    </MenuProvider>
  );
}
