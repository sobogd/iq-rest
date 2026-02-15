import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getOnboardingProgress } from "../_lib/queries";
import { OnboardingPage } from "../_pages/onboarding";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) redirect("/");

  const onboardingData = await getOnboardingProgress(companyId);

  return <OnboardingPage initialData={onboardingData} />;
}
