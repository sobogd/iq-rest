import { redirect } from "next/navigation";
import { dashboardUrl } from "@/lib/dashboard-url";

// The SPA dashboard owns the logout flow; cookies are scoped to the apex domain so its
// logout endpoint clears them across both hosts.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(dashboardUrl(`/${locale}/logout`));
}
