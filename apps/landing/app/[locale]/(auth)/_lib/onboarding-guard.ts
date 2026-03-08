import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getOnboardingData } from "./onboarding-data";

/** For the unified onboarding page: requires auth, redirects to dashboard if done */
export async function guardOnboarding() {
  const data = await getOnboardingData();
  if (!data.isAuthenticated) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  if (data.onboardingStep >= 3) redirect("/dashboard");
  return data;
}

/** For login/otp: if authenticated, redirect to appropriate step */
export async function guardAuthPage() {
  const data = await getOnboardingData();
  if (data.isAuthenticated) {
    if (data.onboardingStep < 3) redirect("/onboarding");
    redirect("/dashboard");
  }
  return data;
}
