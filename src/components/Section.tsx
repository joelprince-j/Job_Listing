export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({ title, subtitle, center = true }: { title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-xl text-center" : ""}>
      <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted">{subtitle}</p>}
    </div>
  );
}

/** Beige page header used on inner pages (Browse Jobs, Post a Job, About). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  center = true,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-sand-dark/60 bg-sand">
      <Container className={`py-12 sm:py-16 ${center ? "text-center" : ""}`}>
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand">{eyebrow}</p>}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className={`mt-4 text-lg text-muted ${center ? "mx-auto max-w-2xl" : ""}`}>{subtitle}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
