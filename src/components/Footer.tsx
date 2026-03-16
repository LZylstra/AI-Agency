import Link from "next/link";

interface FooterProps {
  footerText?: string | null;
}

export function Footer({ footerText }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex gap-6 text-sm text-[var(--muted)]">
            <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
              Home
            </Link>
            <Link href="/services" className="transition-colors hover:text-[var(--foreground)]">
              Services
            </Link>
            <Link href="/playbooks" className="transition-colors hover:text-[var(--foreground)]">
              Playbooks
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-[var(--foreground)]">
              Contact
            </Link>
          </div>
          {footerText && <p className="text-sm text-[var(--muted)]">{footerText}</p>}
        </div>
      </div>
    </footer>
  );
}
