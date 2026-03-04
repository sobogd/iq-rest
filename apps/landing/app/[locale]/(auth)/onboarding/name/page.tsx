import { guardNameStep } from "../../_lib/onboarding-guard";
import { OnboardingNamePage } from "../../_components/onboarding-name-page";

export default async function Page() {
  const { userId } = await guardNameStep();
  return <OnboardingNamePage userId={userId!} />;
}
