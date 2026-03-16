import Link from "next/link";
import type { CaseStudy } from "@/types/directus";

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

export function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  if (!caseStudies.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Case Studies
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          How we help teams ship AI automation that delivers.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <article
              key={cs.id}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[var(--accent)]">{cs.industry}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                {cs.company_name}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{cs.problem}</p>
              <p className="mt-3 text-sm font-medium text-[var(--foreground)]">{cs.results}</p>
              {cs.service && (
                <Link
                  href={`/services/${cs.service.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  View service →
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
