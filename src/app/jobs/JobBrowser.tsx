"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SearchIcon, SlidersIcon } from "@/components/icons";
import { JobCard } from "@/components/JobCard";
import { Container } from "@/components/Section";
import { categories } from "@/config/site";
import { jobs } from "@/data/jobs";

export function JobBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = params.get("q") ?? "";
  const country = params.get("country") ?? "all";
  const category = params.get("category") ?? "all";

  const [draft, setDraft] = useState(q);
  const [showFilters, setShowFilters] = useState(country !== "all" || category !== "all");

  function update(next: Record<string, string>) {
    const p = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (!v || v === "all") p.delete(k);
      else p.set(k, v);
    }
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return jobs.filter((j) => {
      if (country !== "all" && j.country !== country) return false;
      if (category !== "all" && j.category !== category) return false;
      if (!needle) return true;
      const catName = categories.find((c) => c.slug === j.category)?.name ?? "";
      return [j.title, j.employer, j.city, catName].some((s) => s.toLowerCase().includes(needle));
    });
  }, [q, country, category]);

  const selectClass =
    "rounded-lg border border-sand-dark bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-brand";

  return (
    <>
      <div className="border-b border-sand-dark/60 bg-sand">
        <Container className="pb-8">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: draft.trim() });
            }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label className="flex flex-1 items-center gap-2 rounded-lg border border-sand-dark bg-cream px-3 sm:max-w-md">
              <SearchIcon className="h-4 w-4 text-muted" />
              <span className="sr-only">Search jobs</span>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Search by role, employer, or city…"
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-stone-500"
              />
            </label>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded-lg bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark sm:flex-none">
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowFilters((s) => !s)}
                aria-expanded={showFilters}
                className="flex items-center gap-2 rounded-lg border border-sand-dark bg-cream px-4 py-2.5 text-sm font-medium text-ink hover:bg-white"
              >
                <SlidersIcon className="h-4 w-4" /> Filters
              </button>
            </div>
          </form>

          {showFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-muted">
                Country
                <select value={country} onChange={(e) => update({ country: e.target.value })} className={selectClass}>
                  <option value="all">All</option>
                  <option value="US">USA</option>
                  <option value="UK">UK</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted">
                Category
                <select value={category} onChange={(e) => update({ category: e.target.value })} className={selectClass}>
                  <option value="all">All categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              {(country !== "all" || category !== "all" || q) && (
                <button
                  type="button"
                  onClick={() => {
                    setDraft("");
                    router.replace(pathname, { scroll: false });
                  }}
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </Container>
      </div>

      <Container className="py-10">
        <p className="mb-5 text-sm text-muted">
          {results.length} {results.length === 1 ? "listing" : "listings"}
          {q && (
            <>
              {" "}
              for “<span className="font-semibold text-ink">{q}</span>”
            </>
          )}
        </p>
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sand-dark p-10 text-center text-muted">
            No jobs match your search. Try a different keyword or clear the filters.
          </div>
        ) : (
          <div className="grid items-start gap-5 md:grid-cols-2">
            {results.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
