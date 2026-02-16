import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/**
 * Cached user+company lookup — deduplicates DB query within a single request.
 * React.cache() ensures this runs once per request even if called
 * from both layout.tsx and page.tsx.
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

  if (!user || !user.companies[0]) return null;

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
