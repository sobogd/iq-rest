export function getCompanyAccess(company: {
  plan: string;
  subscriptionStatus: string;
  trialEndsAt: Date | null;
}) {
  const isPaid =
    company.plan !== "FREE" && company.subscriptionStatus === "ACTIVE";
  const isLegacyFreeUser =
    company.plan === "FREE" && company.trialEndsAt === null;
  const isTrialing =
    company.plan === "FREE" &&
    company.trialEndsAt !== null &&
    company.trialEndsAt > new Date();
  const trialExpired =
    company.plan === "FREE" &&
    company.trialEndsAt !== null &&
    company.trialEndsAt <= new Date();

  return {
    hasFullAccess: isPaid || isLegacyFreeUser || isTrialing,
    isPaid,
    isTrialing,
    trialExpired,
  };
}
