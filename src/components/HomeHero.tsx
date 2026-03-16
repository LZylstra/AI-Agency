import Link from "next/link";
import type { SiteSettings } from "@/types/directus";

interface HomeHeroProps {
  settings: SiteSettings | null;
}

export function HomeHero({ settings }: HomeHeroProps) {
  const heading = settings?.hero_heading ?? "Automate real work with practical AI workflows";
  const subheading =
    settings?.hero_subheading ??
    "We help teams design and deploy AI automation for marketing, research, sales, and internal operations.";
  const ctaLabel = settings?.primary_cta_label ?? "Explore Services";
  const ctaLink = settings?.primary_cta_link ?? "/services";
  const tagline = settings?.tagline;

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {tagline && (
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
              {tagline}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
            {subheading}
          </p>
          <div className="mt-10">
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
