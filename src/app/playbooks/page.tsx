import Link from "next/link";
import { getPlaybooks } from "@/lib/directus";

export default async function PlaybooksPage() {
  const playbooks = await getPlaybooks();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
          Playbooks
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          Workflows with steps, prompt templates, and example outputs.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {playbooks.map((p) => (
          <Link
            key={p.id}
            href={`/playbooks/${p.slug}`}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all hover:border-[var(--accent)]/30 hover:shadow-md"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
              {p.difficulty_level}
            </span>
            <h2 className="mt-2 text-xl font-semibold text-[var(--foreground)]">{p.name}</h2>
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
    </div>
  );
}
