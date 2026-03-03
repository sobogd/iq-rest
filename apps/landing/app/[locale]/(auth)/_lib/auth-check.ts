import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "@/lib/session-utils";

export async function getOnboardingState() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  if (!session?.value || !userEmail?.value) {
    return { isAuthenticated: false, onboardingStep: 0, userId: null };
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    select: {
      id: true,
      sessionToken: true,
      companies: {
        include: { company: { select: { onboardingStep: true } } },
        take: 1,
      },
    },
  });

  // Validate session token against DB
  const tokenHash = hashSessionToken(session.value);
  if (!user || !user.sessionToken || user.sessionToken !== tokenHash) {
    // Clear stale cookies so login page shows form cleanly
    cookieStore.delete("session");
    cookieStore.delete("user_email");
    cookieStore.delete("user_id");
    return { isAuthenticated: false, onboardingStep: 0, userId: null };
  }

  const onboardingStep = user.companies[0]?.company.onboardingStep ?? 0;

  return { isAuthenticated: true, onboardingStep, userId: user.id };
}
