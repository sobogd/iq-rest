import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getOnboardingState } from "../../_lib/auth-check";
import { OnboardingCategoryPage } from "../../_components/onboarding-category-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { isAuthenticated, onboardingStep, userId } = await getOnboardingState();

  if (!isAuthenticated) redirect("/login");
  if (onboardingStep >= 3) redirect("/dashboard");
  if (onboardingStep < 2) redirect("/onboarding/name");

  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;
  let restaurantName = "";
  if (userEmail) {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        companies: {
          include: {
            company: {
              include: { restaurants: { select: { title: true }, take: 1 } },
            },
          },
          take: 1,
        },
      },
    });
    restaurantName = user?.companies[0]?.company.restaurants[0]?.title || "";
  }

  const params = await searchParams;
  const fromDone = params.from === "done";

  return <OnboardingCategoryPage restaurantName={restaurantName} fromDone={fromDone} userId={userId!} />;
}
