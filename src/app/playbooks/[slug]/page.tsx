import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlaybookBySlug } from "@/lib/directus";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlaybookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const playbook = await getPlaybookBySlug(slug);
  if (!playbook) notFound();

  const steps = playbook.workflow_steps ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/playbooks"
        className="mb-8 inline-flex text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
      >
        ← Playbooks
      </Link>

      <header className="mb-10">
        <span className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
          {playbook.difficulty_level}
        </span>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)]">
          {playbook.name}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)]">{playbook.description}</p>
        {playbook.service && (
          <Link
            href={`/services/${playbook.service.slug}`}
            className="mt-4 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Part of {playbook.service.name} →
          </Link>
        )}
      </header>

      {steps.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Workflow steps</h2>
          <ol className="mt-4 space-y-3">
            {steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-sm font-medium text-[var(--accent)]">
                  {i + 1}
                </span>
                <span className="text-[var(--foreground)]">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {playbook.prompt_template && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Prompt template</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-slate-50 p-4 text-sm text-[var(--foreground)] whitespace-pre-wrap font-mono">
            {playbook.prompt_template}
          </pre>
        </section>
      )}

      {playbook.example_output && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Example output</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-slate-50 p-4 text-sm text-[var(--foreground)] whitespace-pre-wrap font-mono">
            {playbook.example_output}
          </pre>
        </section>
      )}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
        <p className="text-[var(--foreground)]">Want this playbook tailored to your stack?</p>
        <Link
          href="/#contact"
          className="mt-4 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
