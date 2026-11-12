"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/config/site";
import { homeFor, useAuth } from "@/lib/auth";
import { MenuIcon, XIcon } from "./icons";
import { Logo } from "./Logo";

export function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-brand ${
      pathname === href ? "text-brand" : "text-stone-600"
    }`;

  const account = user ? (
    <>
      <Link href={homeFor(user)} className={linkClass(homeFor(user))}>
        Dashboard
      </Link>
      <button
        onClick={() => {
          logout();
          router.replace("/");
        }}
        className="text-left text-sm font-medium text-muted hover:text-brand"
      >
        Log out
      </button>
    </>
  ) : (
    <Link href="/login" className="text-sm font-medium text-muted hover:text-brand">
      Sign In
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-sand-dark/60 bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          {account}
          <Link
            href="/post-job"
            className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-brand-dark"
          >
            Post a Job
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-sand-dark/60 bg-cream px-4 py-4 md:hidden">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          {account}
          <Link
            href="/post-job"
            className="rounded-full bg-brand px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-brand-dark"
          >
            Post a Job
          </Link>
        </div>
      )}
    </header>
  );
}
