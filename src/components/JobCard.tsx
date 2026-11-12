"use client";

import { useId, useState } from "react";
import { categories } from "@/config/site";
import type { Job } from "@/data/jobs";
import { ChevronDownIcon, ClockIcon, DollarIcon, GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";

const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

export function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const country = job.country === "UK" ? "UK" : "USA";

  return (
    <article
      className={`rounded-2xl border border-sand-dark/70 bg-cream p-5 transition-shadow ${open ? "shadow-md" : "hover:shadow-md"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-sand-dark/80 px-2.5 py-1 text-xs font-semibold text-muted">
          {categoryName(job.category)}
        </span>
        <span className="text-sm font-bold text-ink" title={country}>
          {job.country === "UK" ? "GB" : "US"}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-bold text-ink">{job.title}</h3>
      <p className="text-sm font-medium text-muted">{job.employer}</p>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <li className="flex items-center gap-1">
          <MapPinIcon className="h-4 w-4 text-brand" />
          {job.city}, {country}
        </li>
        <li className="flex items-center gap-1">
          <DollarIcon className="h-4 w-4 text-brand" />
          {job.pay}
        </li>
        <li className="flex items-center gap-1">
          <ClockIcon className="h-4 w-4 text-brand" />
          {job.hours}
        </li>
      </ul>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg bg-sand py-2.5 text-sm font-bold text-brand hover:bg-sand-dark"
      >
        {open ? "Hide Contact" : "View Contact"}
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div id={panelId} className="mt-3 space-y-2 rounded-lg bg-sand-dark/70 p-4 text-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Employer contact</p>
          {job.contact.email && (
            <a href={`mailto:${job.contact.email}`} className="flex items-center gap-2 text-ink hover:text-brand">
              <MailIcon className="h-4 w-4 text-muted" />
              {job.contact.email}
            </a>
          )}
          {job.contact.phone && (
            <a href={`tel:${job.contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-ink hover:text-brand">
              <PhoneIcon className="h-4 w-4 text-muted" />
              {job.contact.phone}
            </a>
          )}
          {job.contact.website && (
            <a
              href={job.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ink hover:text-brand"
            >
              <GlobeIcon className="h-4 w-4 text-muted" />
              {job.contact.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>
      )}
    </article>
  );
}
