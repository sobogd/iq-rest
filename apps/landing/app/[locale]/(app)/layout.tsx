import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Check if user is authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const userEmail = cookieStore.get("user_email");

  if (!session) {
    redirect(`/${locale}/get-started`);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Dashboard Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}/dashboard`} className="text-xl font-bold">
              SobogdQR
            </Link>

            {/* User info */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {userEmail?.value}
              </span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main>{children}</main>
    </div>
  );
}
