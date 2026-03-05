import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken, safeCompare } from "@/lib/session-utils";
import { isAdminEmail } from "@/lib/admin";

/**
 * Cached user+company lookup — deduplicates DB query within a single request.
 * React.cache() ensures this runs once per request even if called
 * from both layout.tsx and page.tsx.
 *
 * Session token is hashed and compared against the stored hash in DB.
 * During admin impersonation (admin_original_* cookies present),
 * we validate the admin's session instead of the target user's,
 * so the target user's sessionToken is never overwritten.
 */
const getAuthUser = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  if (!session?.value || !userEmail?.value) return null;

  // Check if admin is impersonating
  const adminOriginalSession = cookieStore.get("admin_original_session")?.value;
  const adminOriginalEmail = cookieStore.get("admin_original_email")?.value;
  const isImpersonating = Boolean(adminOriginalSession && adminOriginalEmail);

  if (isImpersonating) {
    // Validate admin's session (not the target user's)
    if (!isAdminEmail(adminOriginalEmail)) return null;

    const adminUser = await prisma.user.findUnique({
      where: { email: adminOriginalEmail! },
    });
    if (!adminUser?.sessionToken) return null;

    const adminTokenHash = hashSessionToken(adminOriginalSession!);
    if (!safeCompare(adminUser.sessionToken, adminTokenHash)) return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail.value },
    include: {
      companies: {
        include: { company: true },
        take: 1,
      },
    },
  });

  if (!user || !user.companies[0]) {
    return null;
  }

  // For normal sessions, validate session token against stored hash
  if (!isImpersonating) {
    const tokenHash = hashSessionToken(session.value);
    if (!user.sessionToken || !safeCompare(user.sessionToken, tokenHash)) {
      return null;
    }
  }

  return {
    userId: user.id,
    email: user.email,
    company: user.companies[0].company,
  };
});

export async function getUserCompanyId(): Promise<string | null> {
  const auth = await getAuthUser();
  return auth?.company.id ?? null;
}

export async function getUserCompany(): Promise<{ id: string; name: string } | null> {
  const auth = await getAuthUser();
  if (!auth) return null;
  return { id: auth.company.id, name: auth.company.name };
}

export async function getUserWithCompany(): Promise<{ userId: string; companyId: string } | null> {
  const auth = await getAuthUser();
  if (!auth) return null;
  return { userId: auth.userId, companyId: auth.company.id };
}

/** Returns full company object (needed for Stripe routes that access stripeCustomerId, etc.) */
export async function getAuthCompany() {
  const auth = await getAuthUser();
  return auth?.company ?? null;
}
