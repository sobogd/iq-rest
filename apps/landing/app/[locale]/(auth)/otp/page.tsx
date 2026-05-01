import { redirect } from "next/navigation";
import { dashboardUrl } from "@/lib/dashboard-url";

// OTP entry happens inside the SPA login flow now — bounce to /login on the dashboard host.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(dashboardUrl(`/${locale}/login`));
}
