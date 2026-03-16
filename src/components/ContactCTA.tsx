import type { SiteSettings } from "@/types/directus";

interface ContactCTAProps {
  settings: SiteSettings | null;
}

export function ContactCTA({ settings }: ContactCTAProps) {
  const email = settings?.contact_email ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com";
  const heading = "Ready to automate?";
  const subheading = "Tell us your goals and we’ll outline a plan.";

  return (
    <section id="contact" className="border-t border-[var(--border)] bg-[var(--card)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-lg text-[var(--muted)]">{subheading}</p>
          <a
            href={`mailto:${email}`}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)]"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
}
