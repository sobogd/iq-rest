import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function MenuRedirect({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;

  const restaurant = await prisma.restaurant.findFirst({
    where: { slug },
    select: { defaultLanguage: true },
  });

  if (!restaurant) {
    notFound();
  }

  const locale = restaurant.defaultLanguage || "en";
  const queryString = new URLSearchParams(
    Object.entries(query).reduce((acc, [key, value]) => {
      if (typeof value === "string") acc[key] = value;
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  redirect(`/${locale}/m/${slug}${queryString ? `?${queryString}` : ""}`);
}
