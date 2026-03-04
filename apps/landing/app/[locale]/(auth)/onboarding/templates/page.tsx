import { guardMenuStep } from "../../_lib/onboarding-guard";
import { OnboardingTemplatesPage } from "../../_components/onboarding-templates-page";

export default async function Page() {
  const { userId, restaurantName } = await guardMenuStep();
  return <OnboardingTemplatesPage restaurantName={restaurantName} userId={userId!} />;
}
