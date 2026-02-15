import { redirect } from "next/navigation";
import { getUserCompanyId } from "@/lib/auth";
import { getOnboardingProgress } from "../_lib/queries";

export default async function Page() {
  const companyId = await getUserCompanyId();
  if (!companyId) return null;

  const { progress } = await getOnboardingProgress(companyId);

  if (!progress.hasInfo) redirect("/dashboard/onboarding/info");
  if (!progress.hasItems) redirect("/dashboard/onboarding/menu");
  if (!progress.hasContacts) redirect("/dashboard/onboarding/contacts");
  redirect("/dashboard/onboarding/done");
}
