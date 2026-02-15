import { redirect } from "next/navigation";
import { getOnboardingState } from "../../_lib/auth-check";
import { OnboardingTypePage } from "../../_components/onboarding-type-page";

export default async function Page() {
  const { isAuthenticated, onboardingStep } = await getOnboardingState();

  if (!isAuthenticated) redirect("/login");
  if (onboardingStep === 0) redirect("/onboarding/name");
  if (onboardingStep >= 2) redirect("/dashboard");

  return <OnboardingTypePage />;
}
