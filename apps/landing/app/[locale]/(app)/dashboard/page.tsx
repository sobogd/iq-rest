import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { DashboardContainer } from "@/components/dashboard-container";
import { OnboardingSteps } from "./onboarding-steps";

interface OnboardingData {
  steps: {
    restaurant: boolean;
    category: boolean;
    item: boolean;
    qrCode: boolean;
  };
  slug: string | null;
}

async function getOnboardingData(): Promise<OnboardingData | null> {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email");

  if (!userEmail?.value) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  const company = user?.companies[0]?.company;
  if (!company) return null;

  // Get all data in parallel
  const [restaurant, categoriesCount, itemsCount] = await Promise.all([
    prisma.restaurant.findFirst({
      where: { companyId: company.id },
      select: { title: true, description: true, source: true, slug: true },
    }),
    prisma.category.count({
      where: { companyId: company.id },
    }),
    prisma.item.count({
      where: { companyId: company.id },
    }),
  ]);

  // Step 1: Restaurant data (title, description, source, slug)
  const restaurantComplete = !!(
    restaurant?.title &&
    restaurant?.description &&
    restaurant?.source &&
    restaurant?.slug
  );

  // Step 2: At least one category
  const categoryComplete = categoriesCount > 0;

  // Step 3: At least one item
  const itemComplete = itemsCount > 0;

  // Step 4: Menu ready (all previous steps done)
  const qrCodeComplete = restaurantComplete && categoryComplete && itemComplete;

  return {
    steps: {
      restaurant: restaurantComplete,
      category: categoryComplete,
      item: itemComplete,
      qrCode: qrCodeComplete,
    },
    slug: restaurant?.slug ?? null,
  };
}

export default async function DashboardPage() {
  const [t, data] = await Promise.all([
    getTranslations("onboarding"),
    getOnboardingData(),
  ]);

  if (!data) {
    return (
      <DashboardContainer>
        <p className="text-muted-foreground">Unauthorized</p>
      </DashboardContainer>
    );
  }

  const translations = {
    title: t("title"),
    steps: {
      restaurant: {
        title: t("steps.restaurant.title"),
        description: t("steps.restaurant.description"),
        button: t("steps.restaurant.button"),
      },
      category: {
        title: t("steps.category.title"),
        description: t("steps.category.description"),
        button: t("steps.category.button"),
      },
      item: {
        title: t("steps.item.title"),
        description: t("steps.item.description"),
        button: t("steps.item.button"),
      },
      qrCode: {
        title: t("steps.qrCode.title"),
        description: t("steps.qrCode.description"),
        button: t("steps.qrCode.button"),
      },
    },
    extraSteps: {
      translations: {
        title: t("extraSteps.translations.title"),
        description: t("extraSteps.translations.description"),
        button: t("extraSteps.translations.button"),
      },
      reservations: {
        title: t("extraSteps.reservations.title"),
        description: t("extraSteps.reservations.description"),
        button: t("extraSteps.reservations.button"),
        button2: t("extraSteps.reservations.button2"),
      },
      analytics: {
        title: t("extraSteps.analytics.title"),
        description: t("extraSteps.analytics.description"),
        button: t("extraSteps.analytics.button"),
        button2: t("extraSteps.analytics.button2"),
      },
    },
    completed: t("completed"),
  };

  return (
    <DashboardContainer>
      <OnboardingSteps data={data} translations={translations} />
    </DashboardContainer>
  );
}
