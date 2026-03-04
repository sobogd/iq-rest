import { guardAuthPage } from "../_lib/onboarding-guard";
import { LoginPage } from "../_components/login-page";

export default async function Page() {
  await guardAuthPage();
  return <LoginPage />;
}
