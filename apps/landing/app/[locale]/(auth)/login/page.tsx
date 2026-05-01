import { redirect } from "next/navigation";
import { dashboardUrl } from "@/lib/dashboard-url";

// All auth flows live on the new SPA dashboard now. Forward any traffic to its login page,
// preserving the locale and any incoming query params (e.g. `?from=landing`, `?create=true`).
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") qs.set(k, v);
    else if (Array.isArray(v) && v.length) qs.set(k, v[0]);
  }
  const tail = qs.toString() ? `?${qs.toString()}` : "";
  redirect(`${dashboardUrl(`/${locale}/login`)}${tail}`);
}
