import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/directus";
import { assetUrl } from "@/lib/directus";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
          Services
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--muted)]">
          AI-driven workflows for marketing, sales, support, and operations.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/services/${s.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm transition-all hover:border-[var(--accent)]/30 hover:shadow-md"
          >
            {s.icon && assetUrl(s.icon) && (
              <div className="relative mb-5 h-14 w-14 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={assetUrl(s.icon)!}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
              {s.name}
            </h2>
            <p className="mt-2 text-[var(--muted)]">{s.tagline}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
              {s.description}
            </p>
            {s.pricing_start && (
              <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
                From ${Number(s.pricing_start).toLocaleString()}
              </p>
            )}
            <span className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)]">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
