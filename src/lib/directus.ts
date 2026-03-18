import type { SiteSettings, Service, Playbook, CaseStudy } from "@/types/directus";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "") ?? "";
const TOKEN = process.env.DIRECTUS_STATIC_TOKEN ?? "";

function headers(): HeadersInit {
  const h: HeadersInit = { "Content-Type": "application/json" };
  if (TOKEN) h["Authorization"] = `Bearer ${TOKEN}`;
  return h;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${DIRECTUS_URL}${path}`, { headers: headers(), next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Directus ${res.status}: ${path}`);
  const json = await res.json();
  return json.data as T;
}

/** Singleton: returns first item as single object */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!DIRECTUS_URL) return null;
  try {
    const data = await get<SiteSettings | SiteSettings[]>(`/items/site_settings?limit=1`);
    return Array.isArray(data) ? data[0] ?? null : data;
  } catch {
    return null;
  }
}

export async function getServices(opts?: { featured?: boolean }): Promise<Service[]> {
  if (!DIRECTUS_URL) return [];
  try {
    const filter = opts?.featured != null ? `&filter[featured][_eq]=${opts.featured}` : "";
    const data = await get<Service[]>(
      `/items/services?fields=id,sort,status,name,slug,tagline,description,featured,icon,pricing_start,playbooks.id,playbooks.name,playbooks.slug,case_studies.id,case_studies.company_name,case_studies.industry,case_studies.results&filter[status][_eq]=published&sort=sort${filter}`
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!DIRECTUS_URL) return null;
  try {
    const data = await get<Service[]>(
      `/items/services?fields=id,sort,status,name,slug,tagline,description,featured,icon,pricing_start,playbooks.id,playbooks.name,playbooks.slug,playbooks.description,playbooks.workflow_steps,playbooks.prompt_template,playbooks.example_output,playbooks.difficulty_level,case_studies.id,case_studies.company_name,case_studies.industry,case_studies.problem,case_studies.solution,case_studies.results,case_studies.logo&filter[status][_eq]=published&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`
    );
    return Array.isArray(data) && data.length ? data[0] : null;
  } catch {
    return null;
  }
}

export async function getPlaybooks(opts?: { featured?: boolean; limit?: number }): Promise<Playbook[]> {
  if (!DIRECTUS_URL) return [];
  try {
    const featuredFilter = opts?.featured != null ? `&filter[featured][_eq]=${opts.featured}` : "";
    const limit = opts?.limit ?? 20;
    const data = await get<Playbook[]>(
      `/items/playbooks?fields=id,sort,status,name,slug,description,workflow_steps,prompt_template,example_output,difficulty_level,service.id,service.name,service.slug,featured&filter[status][_eq]=published&sort=sort&limit=${limit}${featuredFilter}`
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPlaybookBySlug(slug: string): Promise<Playbook | null> {
  if (!DIRECTUS_URL) return null;
  try {
    const data = await get<Playbook[]>(
      `/items/playbooks?fields=id,sort,status,name,slug,description,workflow_steps,prompt_template,example_output,difficulty_level,service.id,service.name,service.slug,featured&filter[status][_eq]=published&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`
    );
    return Array.isArray(data) && data.length ? data[0] : null;
  } catch {
    return null;
  }
}

export async function getCaseStudies(limit = 10): Promise<CaseStudy[]> {
  if (!DIRECTUS_URL) return [];
  try {
    const data = await get<CaseStudy[]>(
      `/items/case_studies?fields=id,sort,status,company_name,industry,problem,solution,results,service.id,service.slug,logo&filter[status][_eq]=published&sort=sort&limit=${limit}`
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function assetUrl(id: string | null | undefined): string {
  if (!id) return "";
  // Proxy assets through Next.js so we can attach Directus auth server-side.
  return `/api/directus-assets/${id}`;
}
