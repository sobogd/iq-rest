import { redirect } from "next/navigation";
import { getOnboardingData } from "./onboarding-data";

/** For onboarding page: redirect to dashboard (onboarding no longer exists) */
export async function guardOnboarding() {
  const data = await getOnboardingData();
  if (!data.isAuthenticated) redirect("/login");
  redirect("/dashboard");
}

/** For login/otp: if authenticated (non-anonymous), redirect to dashboard */
export async function guardAuthPage() {
  const data = await getOnboardingData();
  if (data.isAuthenticated && !data.isAnonymous) {
    redirect("/dashboard");
  }
  return data;
}
