"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const isPublicPath = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const isAuthenticated = currentUser !== null && users.length > 0;

    if (!isAuthenticated && !isPublicPath) {
      const timer = setTimeout(() => {
        router.push(`/login`);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [router, pathname, isPublicPath]);

  if (isPublicPath) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <p className="text-sm text-text/60 animate-pulse">
          Verifying access...
        </p>
      </div>
    );
  }

  // If authenticated, show the dashboard/contracts table content
  return <>{children}</>;
}
