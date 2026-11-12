import Link from "next/link";
import { CheckCircleIcon } from "@/components/icons";
import { Container, PageHero } from "@/components/Section";
import { brandName } from "@/config/site";

export const metadata = { title: "About" };

const stats = [
  { value: "500+", label: "Part-time jobs listed" },
  { value: "12,000+", label: "Students placed" },
  { value: "300+", label: "Employer partners" },
];

const steps = [
  {
    title: "Browse open roles",
    body: "Filter by country, category, city, or keyword. Every listing shows real pay, hours, and employer contact details upfront — no sign-up required to browse.",
  },
  {
    title: "Contact the employer directly",
    body: "Click through to the employer's profile and send an enquiry in seconds. Your message lands straight in their inbox — no middleman, no application portal.",
  },
  {
    title: "Start earning",
    body: "Agree on a start date, show up, and get paid. It really is that straightforward. Most students hear back within 48 hours.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Built by students, for students"
        subtitle={`${brandName} started because finding flexible, student-friendly work shouldn't feel like a full-time job. We connect motivated students across the USA and UK with employers who genuinely want them.`}
      />

      <section className="py-16 sm:py-20">
        <Container className="grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-ink">Our mission</h2>
            <p className="mt-5 leading-relaxed text-muted">
              We believe every student deserves work that fits around lectures, exams, and life — not the other way
              around. {brandName} exists to make that match as simple as possible.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              We partner with local cafes, campus departments, retailers, tutoring centres, and delivery services to
              surface real, vetted part-time roles. No ghost listings, no bait-and-switch hours.
            </p>
          </div>
          <div className="space-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-sand-dark bg-cream px-6 py-5">
                <CheckCircleIcon className="h-7 w-7 shrink-0 text-brand" />
                <div>
                  <p className="font-display text-3xl font-extrabold text-ink">{s.value}</p>
                  <p className="text-sm text-muted">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <Container className="max-w-5xl">
          <h2 className="text-center text-3xl font-bold text-ink">How {brandName} works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-dark text-sm font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-ink">Ready to get started?</h2>
          <p className="mt-3 text-muted">Browse today&apos;s listings or post a role for free.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/jobs" className="rounded-lg bg-brand px-5 py-2.5 font-bold text-white hover:bg-brand-dark">
              Browse Jobs
            </Link>
            <Link href="/post-job" className="rounded-lg border border-sand-dark bg-cream px-5 py-2.5 font-bold text-ink hover:bg-sand">
              Post a Job
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
