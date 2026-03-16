import Link from "next/link";

interface HeaderProps {
  agencyName?: string | null;
}

export function Header({ agencyName }: HeaderProps) {
  const name = agencyName ?? process.env.NEXT_PUBLIC_SITE_NAME ?? "AI Agency";
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card)]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          {name}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
            Home
          </Link>
          <Link href="/services" className="transition-colors hover:text-[var(--foreground)]">
            Services
          </Link>
          <Link href="/playbooks" className="transition-colors hover:text-[var(--foreground)]">
            Playbooks
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
