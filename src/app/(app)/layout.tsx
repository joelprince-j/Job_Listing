// Layout for account pages (login, register, dashboard, admin, terms): centred content column.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">{children}</div>;
}
