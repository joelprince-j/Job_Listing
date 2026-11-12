"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Role } from "@/lib/api";
import { homeFor, useAuth } from "@/lib/auth";

/** Client-side route guard. The backend still enforces every permission. */
export function RequireAuth({ role, children }: { role?: Role; children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const allowed = !!user && (!role || user.role === role);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (role && user.role !== role) router.replace(homeFor(user));
  }, [loading, user, role, router]);

  if (loading || !allowed) {
    return <div className="flex min-h-[50vh] items-center justify-center text-slate-500">Loading…</div>;
  }
  return <>{children}</>;
}
