import { guardOnboarding } from "../_lib/onboarding-guard";
import { OnboardingFlow } from "../_components/onboarding-flow";

export default async function Page() {
  const { userId, onboardingStep, restaurantName } = await guardOnboarding();

  const initialStep = onboardingStep < 2 ? "name" as const : "method" as const;

  return (
    <OnboardingFlow
      userId={userId!}
      restaurantName={onboardingStep >= 2 ? restaurantName : null}
      initialStep={initialStep}
    />
  );
}
