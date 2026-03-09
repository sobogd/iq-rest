import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken, safeCompare } from "@/lib/session-utils";
import { isAnonymousEmail } from "@/lib/anonymous";

export interface OnboardingData {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  onboardingStep: number;
  userId: string | null;
  companyId: string | null;
  restaurantName: string;
}

const UNAUTHENTICATED: OnboardingData = {
  isAuthenticated: false,
  isAnonymous: false,
  onboardingStep: 0,
  userId: null,
  companyId: null,
  restaurantName: "",
};

export const getOnboardingData = cache(async (): Promise<OnboardingData> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  if (!session?.value || !userEmail?.value) {
    return UNAUTHENTICATED;
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    select: {
      id: true,
      sessionToken: true,
      companies: {
        include: {
          company: {
            select: {
              id: true,
              onboardingStep: true,
              restaurants: { select: { title: true }, take: 1 },
            },
          },
        },
        take: 1,
      },
    },
  });

  const tokenHash = hashSessionToken(session.value);
  if (
    !user ||
    !user.sessionToken ||
    !safeCompare(user.sessionToken, tokenHash)
  ) {
    return UNAUTHENTICATED;
  }

  const company = user.companies[0]?.company;

  return {
    isAuthenticated: true,
    isAnonymous: isAnonymousEmail(userEmail.value),
    onboardingStep: company?.onboardingStep ?? 0,
    userId: user.id,
    companyId: company?.id ?? null,
    restaurantName: company?.restaurants[0]?.title || "",
  };
});
