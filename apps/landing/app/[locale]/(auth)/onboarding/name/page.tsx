import { redirect } from "next/navigation";
import { getOnboardingState } from "../../_lib/auth-check";
import { OnboardingNamePage } from "../../_components/onboarding-name-page";

export default async function Page() {
  const { isAuthenticated, onboardingStep, userId } = await getOnboardingState();

  if (!isAuthenticated) redirect("/login?from=onboarding");
  if (onboardingStep >= 2) redirect("/dashboard");

  return <OnboardingNamePage userId={userId!} />;
}
