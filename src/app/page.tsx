import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { JobCard } from "@/components/JobCard";
import { Container, SectionHeading } from "@/components/Section";
import { categories, heroStats, howItWorks, site } from "@/config/site";
import { featuredJobs } from "@/data/jobs";

const Flag = ({ children }: { children: React.ReactNode }) => (
  <span className="align-middle text-[0.6em] font-semibold tracking-wide opacity-80">{children}</span>
);

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-stone-900">
        {site.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={site.heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_75%_30%,#b45309_0%,#78350f_35%,#1c1917_75%)]" />
        )}
        {/* Darken the left side so the text stays readable over any photo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        {!site.heroImage && (
          <div aria-hidden className="pointer-events-none absolute -right-10 top-10 -z-10 hidden select-none text-[18rem] leading-none opacity-15 lg:block">
            🎓
          </div>
        )}

        <Container className="py-20 sm:py-28 lg:py-32">
          <p className="text-sm font-bold uppercase tracking-wide text-gold">
            USA <Flag>US</Flag> &amp; UK <Flag>GB</Flag> Students
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            Find Your Perfect Part-Time Shift
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Flexible day jobs for college students across the USA <Flag>US</Flag> and UK <Flag>GB</Flag> — browse
            hundreds of listings that fit around your studies.
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </Container>
      </section>

      {/* STATS BAND */}
      <section className="bg-brand text-white">
        <Container className="grid grid-cols-2 gap-6 py-7 text-center md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl font-extrabold sm:text-3xl">{s.value}</p>
              <p className="text-sm text-white/85">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Browse by Category"
            subtitle="From campus shifts to weekend retail — find work that fits your schedule."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/jobs?category=${c.slug}`}
                className={`group relative isolate flex min-h-40 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-lg ${c.span} ${i < 2 ? "md:min-h-44" : ""}`}
              >
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
                )}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${c.gradient}`} />
                {!c.image && (
                  <span aria-hidden className="absolute -right-4 -top-4 -z-10 text-8xl opacity-20 transition-transform group-hover:scale-110">
                    {c.icon}
                  </span>
                )}
                <span className="text-2xl">{c.icon}</span>
                <h3 className="mt-2 text-xl font-bold">{c.name}</h3>
                <span className="mt-2 w-fit rounded-full bg-white/25 px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm">
                  {c.count} jobs
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-16 bg-sand py-16 sm:py-20">
        <Container>
          <SectionHeading title="How It Works" subtitle="Three simple steps to your next shift." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-sand-dark bg-cream p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand font-display text-lg font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading center={false} title="Featured Listings" subtitle="Fresh opportunities added daily across the USA and UK." />
            <Link href="/jobs" className="text-sm font-bold text-brand hover:underline">
              View all listings →
            </Link>
          </div>
          <div className="mt-8 grid items-start gap-5 md:grid-cols-2">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </Container>
      </section>

      {/* DUAL CTA */}
      <section className="bg-cocoa py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-8">
            <p className="text-sm font-bold text-gold">For Employers</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Are you an employer?</h2>
            <p className="mt-3 text-sm text-white/75">
              Post your part-time role and reach thousands of motivated students across the USA and UK.
            </p>
            <Link href="/post-job" className="mt-6 inline-block rounded-lg bg-brand px-5 py-2.5 font-bold text-white hover:bg-brand-dark">
              Post a Job
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-amber-800/60 p-8">
            <p className="text-sm font-bold text-gold">For Students</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Ready to find work?</h2>
            <p className="mt-3 text-sm text-white/75">Hundreds of flexible shifts are waiting. Start browsing now.</p>
            <Link href="/jobs" className="mt-6 inline-block rounded-lg bg-white px-5 py-2.5 font-bold text-cocoa hover:bg-cream">
              Browse All Jobs
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
