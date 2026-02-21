import { redirect } from "next/navigation";
import { getOnboardingState } from "../_lib/auth-check";
import { LoginPage } from "../_components/login-page";

export default async function Page() {
  const { isAuthenticated, onboardingStep } = await getOnboardingState();

  if (isAuthenticated) {
    if (onboardingStep < 2) redirect("/onboarding/name");
    redirect("/dashboard");
  }

  return <LoginPage />;
}
