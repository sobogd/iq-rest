import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { logoutAndBounceToLanding } from "@/lib/logout-bounce";

function LogoutRoute() {
  const { locale } = useParams({ from: "/$locale/logout" });

  useEffect(() => {
    logoutAndBounceToLanding(locale || "en");
  }, [locale]);

  return (
    <div className="min-h-[100dvh] bg-background flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export const Route = createFileRoute("/$locale/logout")({
  component: LogoutRoute,
});
