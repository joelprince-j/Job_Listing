import { ClockIcon, UsersIcon, ZapIcon } from "@/components/icons";
import { Container, PageHero } from "@/components/Section";
import { PostJobForm } from "./PostJobForm";

export const metadata = { title: "Post a Job" };

const perks = [
  { icon: ZapIcon, title: "Free to post", body: "No listing fees, no subscription. Post as many roles as you need." },
  { icon: UsersIcon, title: "Student-ready audience", body: "Your listing reaches students actively looking for flexible, part-time work." },
  { icon: ClockIcon, title: "Live within 24 hours", body: "Submissions are reviewed and published quickly so you can start hearing from candidates fast." },
];

export default function PostJobPage() {
  return (
    <>
      <PageHero
        eyebrow="For Employers"
        title="Post a free job listing"
        subtitle="Reach thousands of motivated students across the USA and UK. Fill your part-time roles fast — no fees, no sign-up required."
      />

      <section className="border-b border-sand-dark/60 py-12">
        <Container className="grid max-w-4xl gap-4 md:grid-cols-3">
          {perks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3 rounded-2xl border border-sand-dark bg-cream p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-sans text-sm font-bold text-ink">{title}</h2>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl font-bold text-ink">Tell us about the role</h2>
          <p className="mt-1 text-sm text-muted">
            All fields marked <span className="text-red-600">*</span> are required.
          </p>
          <PostJobForm />
        </div>
      </section>
    </>
  );
}
