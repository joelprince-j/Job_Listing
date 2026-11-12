"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlobeIcon, SearchIcon } from "./icons";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (country !== "all") params.set("country", country);
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      className="flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-lg sm:flex-row sm:items-center"
    >
      <label className="relative flex items-center rounded-xl bg-sand px-3 py-2.5 sm:py-2">
        <GlobeIcon className="pointer-events-none h-4 w-4 text-sky-600" />
        <span className="sr-only">Country</span>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="appearance-none bg-transparent pl-2 pr-5 text-sm font-medium text-ink outline-none"
        >
          <option value="all">All</option>
          <option value="US">USA</option>
          <option value="UK">UK</option>
        </select>
        <span className="pointer-events-none absolute right-2 text-xs text-muted">▾</span>
      </label>
      <label className="flex flex-1 items-center gap-2 px-2">
        <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
        <span className="sr-only">Search jobs</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title, category, or city…"
          className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-stone-500"
        />
      </label>
      <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-dark">
        Browse Jobs
      </button>
    </form>
  );
}
