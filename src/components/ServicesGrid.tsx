import Link from "next/link";
import type { Service } from "@/types/directus";
import { GeneratedIcon } from "@/components/GeneratedIcon";

interface ServicesGridProps {
  services: Service[];
  columns?: 2 | 3;
}

export function ServicesGrid({ services, columns = 3 }: ServicesGridProps) {
  if (!services.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Services
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          AI-driven workflows for marketing, sales, support, and operations.
        </p>
        <div
          className={`mt-10 grid gap-6 sm:gap-8 ${columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}
        >
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 hover:shadow-md"
            >
              <div className="relative mb-4 h-12 w-12">
                <GeneratedIcon
                  seed={s.id}
                  label={s.name}
                  className="h-12 w-12"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                {s.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{s.tagline}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
