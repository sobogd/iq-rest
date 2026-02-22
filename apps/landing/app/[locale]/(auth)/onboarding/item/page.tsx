import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getOnboardingState } from "../../_lib/auth-check";
import { OnboardingItemPage } from "../../_components/onboarding-item-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { isAuthenticated, onboardingStep, userId } = await getOnboardingState();

  if (!isAuthenticated) redirect("/login");
  if (onboardingStep < 2) redirect("/onboarding/name");

  const { categoryId } = await searchParams;
  if (!categoryId) redirect("/onboarding/category");

  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;
  let restaurantName = "";
  let categoryName = "";

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

    const companyId = user?.companies[0]?.companyId;
    if (companyId) {
      const category = await prisma.category.findFirst({
        where: { id: categoryId, companyId },
        select: { name: true },
      });
      categoryName = category?.name || "";
    }
  }

  if (!categoryName) redirect("/onboarding/category");

  return (
    <OnboardingItemPage
      restaurantName={restaurantName}
      categoryId={categoryId}
      categoryName={categoryName}
      userId={userId!}
    />
  );
}
