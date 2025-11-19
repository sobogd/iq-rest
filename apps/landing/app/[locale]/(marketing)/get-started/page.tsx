import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import GetStartedForm from "@/components/GetStartedForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "getStarted" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function GetStartedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Check if user is already authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (session) {
    redirect(`/${locale}/dashboard`);
  }

  return (
    <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
      <div className="w-full max-w-md mx-auto px-4">
        <GetStartedForm />
      </div>
    </div>
  );
}
