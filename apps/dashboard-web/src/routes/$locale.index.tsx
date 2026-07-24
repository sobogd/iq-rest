import { createFileRoute, redirect } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { landingUrl } from "@/lib/landing-url";
import { FullPageLoader } from "@/components/full-page-loader";
import { SUPPORTED_LOCALES } from "@/lib/i18n-compat";

// All 35 UI locales — must match what `/` (geo redirect) can produce, or the
// two routes bounce a visitor between each other forever.
const SUPPORTED = new Set<string>(SUPPORTED_LOCALES);

export const Route = createFileRoute("/$locale/")({
  pendingComponent: FullPageLoader,
  pendingMs: 0,
  beforeLoad: async ({ params }) => {
    // Reject unsupported `locale` values (e.g. /login captured here as a param).
    if (!SUPPORTED.has(params.locale)) {
      throw redirect({ to: "/" });
    }
    const auth = await api<{ authenticated: boolean }>("/auth/check").catch(
      () => ({ authenticated: false } as { authenticated: boolean }),
    );
    if (!auth.authenticated) {
      throw redirect({ href: landingUrl(params.locale) });
    }
    throw redirect({ to: "/$locale/dashboard", params: { locale: params.locale } });
  },
});
