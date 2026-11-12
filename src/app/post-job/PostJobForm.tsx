"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircleIcon } from "@/components/icons";
import { brandName, categories } from "@/config/site";

const inputClass =
  "block w-full rounded-lg border border-sand-dark bg-cream px-3 py-2.5 text-sm text-ink outline-none placeholder:text-amber-800/50 focus:border-brand focus:ring-2 focus:ring-brand/20";

function Label({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
      {required && <span className="ml-0.5 text-red-600">*</span>}
    </label>
  );
}

function GroupTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-b border-sand-dark pb-2 text-xs font-bold uppercase tracking-wide text-muted">{children}</p>
  );
}

export function PostJobForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // FRONTEND ONLY: no backend endpoint yet. When the API exists, POST the form data here:
    //   const data = Object.fromEntries(new FormData(e.currentTarget));
    //   await apiFetch("/listings", { method: "POST", body: JSON.stringify(data) });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="mt-6 rounded-2xl border border-sand-dark bg-cream p-8 text-center">
        <CheckCircleIcon className="mx-auto h-10 w-10 text-brand" />
        <h3 className="mt-3 text-xl font-bold text-ink">Thanks — your listing was received</h3>
        <p className="mt-2 text-sm text-muted">We review new listings and usually publish them within 24 hours.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => setSubmitted(false)} className="rounded-lg bg-sand px-4 py-2 text-sm font-bold text-brand hover:bg-sand-dark">
            Post another role
          </button>
          <Link href="/jobs" className="rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark">
            Browse listings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5 rounded-2xl border border-sand-dark bg-cream p-6 sm:p-7">
      <GroupTitle>About your business</GroupTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="business" required>Business / employer name</Label>
          <input id="business" name="business" required placeholder="The Daily Grind Cafe" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="contact_name" required>Your name</Label>
          <input id="contact_name" name="contact_name" required placeholder="Jane Smith" autoComplete="name" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="email" required>Contact email</Label>
          <input id="email" name="email" type="email" required placeholder="jobs@yourbusiness.com" autoComplete="email" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="phone" required>Contact phone</Label>
          <input id="phone" name="phone" type="tel" required placeholder="+44 20 7946 0123" autoComplete="tel" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="website">Website</Label>
          <input id="website" name="website" type="url" placeholder="https://yourbusiness.com" className={inputClass} />
        </div>
      </div>

      <GroupTitle>About the role</GroupTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="title" required>Job title</Label>
          <input id="title" name="title" required placeholder="Barista (Part-Time)" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="category" required>Category</Label>
          <select id="category" name="category" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select a category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="country" required>Country</Label>
          <select id="country" name="country" required defaultValue="" className={inputClass}>
            <option value="" disabled>Select country</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="city" required>City</Label>
          <input id="city" name="city" required placeholder="London" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="pay" required>Pay rate</Label>
          <input id="pay" name="pay" required placeholder="£11.50/hr" className={inputClass} />
        </div>
        <div>
          <Label htmlFor="hours" required>Hours per week</Label>
          <input id="hours" name="hours" required placeholder="15–20 hrs/week" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="description" required>Role description</Label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="Describe the role, what the student will do day-to-day, any requirements, and why it's a great opportunity…"
            className={inputClass}
          />
        </div>
      </div>

      <button type="submit" className="w-full rounded-lg bg-brand py-3 font-bold text-white hover:bg-brand-dark">
        Submit listing
      </button>
      <p className="text-center text-xs text-muted">
        By submitting you agree to {brandName} listing your role publicly.{" "}
        <Link href="/jobs" className="font-semibold text-brand hover:underline">
          Browse existing listings
        </Link>
      </p>
    </form>
  );
}
