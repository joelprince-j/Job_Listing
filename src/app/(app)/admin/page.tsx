"use client";

import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { Card, ErrorBox } from "@/components/ui";
import { api, type AdminStats, type User } from "@/lib/api";

const STATUS_LABELS: Record<string, string> = {
  submitted: "Awaiting review",
  approved: "Approved",
  rejected: "Rejected",
  pending_upload: "Upload in progress",
};

function Admin() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.adminStats(), api.adminUsers()])
      .then(([s, u]) => {
        setStats(s);
        setUsers(u);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load admin data"));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <ErrorBox message={error} />

      <section className="grid gap-4 sm:grid-cols-5">
        <Card>
          <p className="text-sm text-slate-500">Contributors</p>
          <p className="mt-1 text-2xl font-semibold">{stats?.contributors ?? "–"}</p>
        </Card>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <Card key={key}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{stats?.submissions_by_status[key] ?? "–"}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Users</h2>
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Email</th>
                <th className="px-4 py-2 font-medium">Role</th>
                <th className="px-4 py-2 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users === null && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                    Loading…
                  </td>
                </tr>
              )}
              {users?.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-2">{u.full_name}</td>
                  <td className="px-4 py-2 text-slate-600">{u.email}</td>
                  <td className="px-4 py-2">{u.role}</td>
                  <td className="px-4 py-2 text-slate-600">{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="mt-3 text-sm text-slate-500">Submission review arrives in Phase 3.</p>
      </section>
    </div>
  );
}

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <Admin />
    </RequireAuth>
  );
}
