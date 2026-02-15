import { redirect } from "next/navigation";
import { getOnboardingState } from "../_lib/auth-check";
import { LoginPage } from "../_components/login-page";

export default async function Page() {
  const { isAuthenticated, onboardingStep } = await getOnboardingState();

  if (isAuthenticated) {
    if (onboardingStep === 0) redirect("/onboarding/name");
    if (onboardingStep === 1) redirect("/onboarding/type");
    redirect("/dashboard");
  }

  return <LoginPage />;
}
