import { guardOnboarding } from "../_lib/onboarding-guard";
import { OnboardingFlow } from "../_components/onboarding-flow";

export default async function Page() {
  const { userId, isAuthenticated, restaurantName } = await guardOnboarding();

  return (
    <OnboardingFlow
      userId={userId}
      isAuthenticated={isAuthenticated}
      hasRestaurant={Boolean(restaurantName)}
      initialStep="method"
    />
  );
}
