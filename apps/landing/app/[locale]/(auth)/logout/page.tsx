"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      router.replace("/login");
    });
  }, [router]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
