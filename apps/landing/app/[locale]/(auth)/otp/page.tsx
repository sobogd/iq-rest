import { redirect } from "next/navigation";
import { getOnboardingState } from "../_lib/auth-check";
import { OtpPage } from "../_components/otp-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const { isAuthenticated, onboardingStep } = await getOnboardingState();

  if (isAuthenticated) {
    if (onboardingStep === 0) redirect("/onboarding/name");
    if (onboardingStep === 1) redirect("/onboarding/type");
    redirect("/dashboard");
  }

  if (!params.email) {
    redirect("/login");
  }

  return <OtpPage email={params.email} />;
}
