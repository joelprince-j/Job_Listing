import Link from "next/link";
import { brandName, footerLinks, site } from "@/config/site";
import { InstagramIcon, TikTokIcon, XLogoIcon } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-cocoa text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{site.tagline}</p>
          <div className="mt-5 flex gap-4 text-white/75">
            <a href={site.social.instagram} aria-label="Instagram" className="hover:text-gold">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={site.social.x} aria-label="X" className="hover:text-gold">
              <XLogoIcon className="h-5 w-5" />
            </a>
            <a href={site.social.tiktok} aria-label="TikTok" className="hover:text-gold">
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="text-sm font-semibold">{heading}</h3>
            <ul className="mt-4 space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/75 hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/60 sm:px-6">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
