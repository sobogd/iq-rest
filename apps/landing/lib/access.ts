export function getCompanyAccess(company: {
  plan: string;
  subscriptionStatus: string;
  trialEndsAt: Date | null;
  scanLimit: number;
}) {
  const isPaid =
    company.plan !== "FREE" && company.subscriptionStatus === "ACTIVE";
  const isOldFreeUser =
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
    hasFullAccess: isPaid || isOldFreeUser || isTrialing,
    isPaid,
    isTrialing,
    trialExpired,
    hasScanLimit: isOldFreeUser,
    scanLimit: company.scanLimit,
  };
}
