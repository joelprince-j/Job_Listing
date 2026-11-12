"use client";

import { useEffect, useState } from "react";

const KEY = "cookie_consent"; // "accepted" | "declined"

/** Remembers the visitor's choice. Wire analytics to load only when the value is "accepted". */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage blocked — just hide for this visit */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-sand-dark bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">Cookie Consent</p>
          <p className="mt-1 text-sm text-stone-600">
            We use cookies to keep the site working and, with your permission, to understand how visitors use it.
            Choose Accept to allow analytics cookies, or Decline to keep only the essential ones.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("declined")}
            className="rounded-md bg-sand px-4 py-2 text-sm font-semibold text-muted hover:bg-sand-dark"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
