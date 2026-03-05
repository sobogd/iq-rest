import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getOnboardingData } from "./onboarding-data";

/** For name step: requires auth, redirects to dashboard if step >= 2 */
export async function guardNameStep() {
  const data = await getOnboardingData();
  if (!data.isAuthenticated) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  if (data.onboardingStep >= 2) redirect("/dashboard");
  return data;
}

/** For menu/templates/scan/category/item/done: requires auth + step 2 */
export async function guardMenuStep() {
  const data = await getOnboardingData();
  if (!data.isAuthenticated) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }
  if (data.onboardingStep >= 3) redirect("/dashboard");
  if (data.onboardingStep < 2) redirect("/onboarding/name");
  return data;
}

/** For login/otp: if authenticated, redirect to appropriate step */
export async function guardAuthPage() {
  const data = await getOnboardingData();
  if (data.isAuthenticated) {
    if (data.onboardingStep < 2) redirect("/onboarding/name");
    if (data.onboardingStep < 3) redirect("/onboarding/menu");
    redirect("/dashboard");
  }
  return data;
}
