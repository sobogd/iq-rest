import { guardMenuStep } from "../../_lib/onboarding-guard";
import { OnboardingMenuPage } from "../../_components/onboarding-menu-page";

export default async function Page() {
  const { userId, restaurantName } = await guardMenuStep();
  return <OnboardingMenuPage restaurantName={restaurantName} userId={userId!} />;
}
