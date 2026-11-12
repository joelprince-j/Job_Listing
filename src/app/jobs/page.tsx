import { Suspense } from "react";
import { PageHero } from "@/components/Section";
import { JobBrowser } from "./JobBrowser";

export const metadata = { title: "Browse Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHero
        center={false}
        title="Browse Jobs"
        subtitle="Flexible part-time shifts for students across the USA and UK."
      />
      {/* useSearchParams needs a Suspense boundary for static rendering */}
      <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10 text-muted sm:px-6">Loading jobs…</div>}>
        <JobBrowser />
      </Suspense>
    </>
  );
}
