import { redirect } from "next/navigation";
import { getOnboardingData } from "./onboarding-data";

/** For the unified onboarding page: allow unauthenticated, redirect to dashboard if done */
export async function guardOnboarding() {
  const data = await getOnboardingData();
  if (data.isAuthenticated && data.onboardingStep >= 3) redirect("/dashboard");
  return data;
}

/** For login/otp: if authenticated (non-anonymous), redirect to appropriate step */
export async function guardAuthPage() {
  const data = await getOnboardingData();
  if (data.isAuthenticated && !data.isAnonymous) {
    if (data.onboardingStep < 3) redirect("/onboarding");
    redirect("/dashboard");
  }
  return data;
}
