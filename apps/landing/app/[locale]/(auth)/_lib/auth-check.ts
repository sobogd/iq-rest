import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getOnboardingState() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  const isAuthenticated = !!(session?.value && userEmail?.value);
  if (!isAuthenticated) {
    return { isAuthenticated: false, onboardingStep: 0 };
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail!.value },
    include: {
      companies: {
        include: { company: { select: { onboardingStep: true } } },
        take: 1,
      },
    },
  });

  const onboardingStep = user?.companies[0]?.company.onboardingStep ?? 0;

  return { isAuthenticated: true, onboardingStep };
}
