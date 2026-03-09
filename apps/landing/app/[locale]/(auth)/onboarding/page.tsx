import { guardOnboarding } from "../_lib/onboarding-guard";
import { OnboardingFlow } from "../_components/onboarding-flow";

export default async function Page() {
  const { userId, isAuthenticated, onboardingStep, restaurantName } = await guardOnboarding();

  const initialStep = !isAuthenticated || onboardingStep < 2 ? "name" as const : "method" as const;

  return (
    <OnboardingFlow
      userId={userId}
      isAuthenticated={isAuthenticated}
      restaurantName={onboardingStep >= 2 ? restaurantName : null}
      initialStep={initialStep}
    />
  );
}
