import Link from "next/link";
import type { Playbook } from "@/types/directus";

interface FeaturedPlaybooksProps {
  playbooks: Playbook[];
}

export function FeaturedPlaybooks({ playbooks }: FeaturedPlaybooksProps) {
  if (!playbooks.length) return null;

  return (
    <section className="border-y border-[var(--border)] bg-[var(--card)] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Featured Playbooks
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          Ready-to-use workflows with prompts and examples.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((p) => (
            <Link
              key={p.id}
              href={`/playbooks/${p.slug}`}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 hover:shadow-md"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
                {p.difficulty_level}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{p.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[var(--muted)]">{p.description}</p>
              {p.service && (
                <p className="mt-3 text-xs text-[var(--muted)]">{p.service.name}</p>
              )}
              <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)]">
                View playbook →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/playbooks"
            className="text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Browse all playbooks
          </Link>
        </div>
      </div>
    </section>
  );
}
