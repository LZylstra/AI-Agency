import { notFound } from "next/navigation";
import Link from "next/link";
import { getServiceBySlug } from "@/lib/directus";
import { GeneratedIcon } from "@/components/GeneratedIcon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const playbooks = service.playbooks ?? [];
  const caseStudies = service.case_studies ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/services"
        className="mb-8 inline-flex text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)]"
      >
        ← Services
      </Link>

      <header className="mb-12">
        <div className="relative mb-6 h-16 w-16">
          <GeneratedIcon seed={service.id} label={service.name} className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
          {service.name}
        </h1>
        <p className="mt-2 text-xl text-[var(--muted)]">{service.tagline}</p>
        {service.pricing_start && (
          <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
            From ${Number(service.pricing_start).toLocaleString()}
          </p>
        )}
      </header>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-[var(--foreground)]">{service.description}</p>
      </div>

      {playbooks.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Related Playbooks</h2>
          <ul className="mt-6 space-y-4">
            {playbooks.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/playbooks/${p.slug}`}
                  className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--accent)]/30"
                >
                  <span className="font-medium text-[var(--foreground)]">{p.name}</span>
                  {p.description && (
                    <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">{p.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {caseStudies.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Case Studies</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {caseStudies.map((cs) => (
              <article
                key={cs.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
              >
                <span className="text-sm font-medium text-[var(--accent)]">{cs.industry}</span>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  {cs.company_name}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{cs.problem}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{cs.solution}</p>
                <p className="mt-3 text-sm font-medium text-[var(--foreground)]">{cs.results}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 text-center">
        <p className="text-lg text-[var(--foreground)]">Ready to get started?</p>
        <Link
          href="/#contact"
          className="mt-4 inline-flex rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
