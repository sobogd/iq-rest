import { cache } from "react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashSessionToken, safeCompare } from "@/lib/session-utils";

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

  const tokenHash = hashSessionToken(session.value);
  // Phase A dual-read: accept multi-device sessions row OR the legacy
  // User.sessionToken column (which is dropped in phase B on 2026-05-13).
  const sessionRow = await prisma.session.findUnique({ where: { tokenHash } });
  const sessionRowValid =
    sessionRow !== null
    && sessionRow.userId === user.id
    && (sessionRow.expiresAt === null || sessionRow.expiresAt > new Date());
  const legacyValid =
    user.sessionToken !== null && safeCompare(user.sessionToken, tokenHash);
  if (!sessionRowValid && !legacyValid) {
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

export async function getAuthCompany() {
  const auth = await getAuthUser();
  return auth?.company ?? null;
}
