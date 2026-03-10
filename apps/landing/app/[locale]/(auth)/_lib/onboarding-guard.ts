import { redirect } from "next/navigation";
import { getOnboardingData } from "./onboarding-data";

/** For onboarding page: require auth, redirect to dashboard if done */
export async function guardOnboarding() {
  const data = await getOnboardingData();
  if (!data.isAuthenticated) redirect("/login");
  if (data.onboardingStep >= 3) redirect("/dashboard");
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
