// Types from Directus schema (inspected via MCP)

export interface SiteSettings {
  id: string;
  agency_name: string;
  tagline: string;
  hero_heading: string;
  hero_subheading: string;
  primary_cta_label: string;
  primary_cta_link: string;
  contact_email: string;
  footer_text: string;
}

export interface Service {
  id: string;
  sort: number;
  status: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  featured: boolean;
  icon: string | null;
  pricing_start: string;
  playbooks?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    workflow_steps?: string[];
    prompt_template?: string;
    example_output?: string;
    difficulty_level?: string;
  }[];
  case_studies?: {
    id: string;
    company_name: string;
    industry: string;
    problem?: string;
    solution?: string;
    results: string;
    logo?: string | null;
  }[];
}

export interface Playbook {
  id: string;
  sort: number;
  status: string;
  name: string;
  slug: string;
  description: string;
  workflow_steps: string[];
  prompt_template: string;
  example_output: string;
  difficulty_level: string;
  service?: { id: string; name: string; slug: string };
  featured: boolean;
}

export interface CaseStudy {
  id: string;
  sort: number;
  status: string;
  company_name: string;
  industry: string;
  problem: string;
  solution: string;
  results: string;
  service?: { id: string; slug: string };
  logo: string | null;
}
