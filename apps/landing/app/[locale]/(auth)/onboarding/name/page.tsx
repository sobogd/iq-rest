import { redirect } from "next/navigation";
import { getOnboardingState } from "../../_lib/auth-check";
import { OnboardingNamePage } from "../../_components/onboarding-name-page";

export default async function Page() {
  const { isAuthenticated, onboardingStep } = await getOnboardingState();

  if (!isAuthenticated) redirect("/login");
  if (onboardingStep >= 2) redirect("/dashboard");
  if (onboardingStep === 1) redirect("/onboarding/type");

  return <OnboardingNamePage />;
}
