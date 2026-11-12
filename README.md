# Frontend — Next.js + Tailwind

## Local setup
```bash
cd frontend
npm install
cp .env.example .env.local      # NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev                     # http://localhost:3000
```
The backend must be running and its `CORS_ORIGINS` must include `http://localhost:3000`.

## Public job-board pages (built from the mock recording)
| Route | What |
|---|---|
| `/` | Landing page: hero with search, stats band, categories, how it works, featured listings, employer and student calls to action |
| `/jobs` | Browse Jobs: search plus country and category filters, driven by the URL (`?q=&country=UK&category=cafes`) |
| `/post-job` | Post a Job form. **Frontend only**: submitting shows a success message and nothing is saved yet |
| `/about` | About page: mission, stats, how it works |

**Where to edit content:**
- `src/config/site.ts`: brand name, tagline, nav and footer links, stats, categories (counts, colours, optional photos), how-it-works steps, optional `heroImage`.
- `src/data/jobs.ts`: **sample** job listings. The contact details are fictional (`example.com` addresses).
- `src/app/globals.css`: colour tokens (`brand`, `cream`, `sand`, `cocoa`, …).
- Photos: put files in `public/images/` and set `site.heroImage` or a category's `image`.

The cookie banner saves the visitor's choice in `localStorage` (`cookie_consent`). Only load analytics when the value is `accepted`.

## Account pages (Phase 1)
| Route | Who |
|---|---|
| `/register` | sign up, with the consent checkbox |
| `/login` | log in. Admins go to `/admin` and contributors to `/dashboard` |
| `/dashboard` | contributor: list of tasks. Capture comes in Phase 2 |
| `/admin` | admin: stats and user list. Review comes in Phase 3 |
| `/terms` | **placeholder** contributor terms. Replace with the client's real text |

## Structure
```
src/lib/api.ts              fetch wrapper, types, token storage
src/lib/auth.tsx            AuthProvider / useAuth (restores the session via /auth/me)
src/components/RequireAuth  client-side route guard (the backend still enforces roles)
src/components/NavBar, ui   layout + small UI primitives
```

## Deploy (Vercel)
Import the repo, set the root directory to `frontend`, and set the env var `NEXT_PUBLIC_API_URL=https://<service>.onrender.com`.
Then add the Vercel URL to the backend's `CORS_ORIGINS`.

Auth uses a bearer token in `localStorage`, not cookies. The frontend (vercel.app) and the API (onrender.com) are
on different sites, so cookies would be third-party and blocked by Safari.
