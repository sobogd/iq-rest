import { redirect } from "next/navigation";
import { guardAuthPage } from "../_lib/onboarding-guard";
import { OtpPage } from "../_components/otp-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  await guardAuthPage();
  const params = await searchParams;

  if (!params.email) {
    redirect("/login?from=otp");
  }

  return <OtpPage email={params.email} />;
}
