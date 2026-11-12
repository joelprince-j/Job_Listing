"use client";

import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { Card, ErrorBox } from "@/components/ui";
import { api, type Task } from "@/lib/api";
import { useAuth } from "@/lib/auth";

function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .tasks()
      .then(setTasks)
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load tasks"));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Hi, {user?.full_name.split(" ")[0]} 👋</h1>
        <p className="mt-1 text-slate-600">Pick a task, write the maths by hand and photograph it.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ["Submitted", "–"],
          ["Approved", "–"],
          ["Pending review", "–"],
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Collection tasks</h2>
        <ErrorBox message={error} />
        {tasks === null && !error && <p className="text-slate-500">Loading tasks…</p>}
        {tasks?.length === 0 && <p className="text-slate-500">No active tasks right now. Check back soon.</p>}
        <div className="grid gap-4 sm:grid-cols-2">
          {tasks?.map((t) => (
            <Card key={t.id}>
              <p className="text-xs font-medium uppercase tracking-wide text-brand">{t.subject}</p>
              <h3 className="mt-1 font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{t.instructions}</p>
              <button
                disabled
                title="Camera capture arrives in Phase 2"
                className="mt-4 w-full rounded-md bg-slate-200 px-4 py-2.5 text-sm font-medium text-slate-500"
              >
                Start capture (coming soon)
              </button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth role="contributor">
      <Dashboard />
    </RequireAuth>
  );
}
