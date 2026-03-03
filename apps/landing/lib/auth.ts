import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "@/lib/session-utils";

/**
 * Cached user+company lookup — deduplicates DB query within a single request.
 * React.cache() ensures this runs once per request even if called
 * from both layout.tsx and page.tsx.
 *
 * Session token is hashed and compared against the stored hash in DB.
 * If cookies exist but session is invalid, cookies are cleared automatically.
 */
const getAuthUser = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  if (!session?.value || !userEmail?.value) return null;

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

  // Validate session token against stored hash
  const tokenHash = hashSessionToken(session.value);
  if (!user.sessionToken || user.sessionToken !== tokenHash) {
    return null;
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
