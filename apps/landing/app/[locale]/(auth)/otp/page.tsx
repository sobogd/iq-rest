import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
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
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }

  return <OtpPage email={params.email} />;
}
