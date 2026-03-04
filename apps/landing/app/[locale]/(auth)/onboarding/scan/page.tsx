import { guardMenuStep } from "../../_lib/onboarding-guard";
import { OnboardingScanPage } from "../../_components/onboarding-scan-page";

export default async function Page() {
  const { userId, restaurantName } = await guardMenuStep();
  return <OnboardingScanPage restaurantName={restaurantName} userId={userId!} />;
}
