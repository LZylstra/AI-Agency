# AI Automation Agency – Next.js + Directus

A polished Next.js (App Router) marketing site for an AI Automation Agency. Content is driven by Directus.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS**
- **Directus** (headless CMS)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**  
   Copy the example env and set your Directus URL and token:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and set:
   - `NEXT_PUBLIC_DIRECTUS_URL` – your Directus instance URL (no trailing slash)
   - `DIRECTUS_STATIC_TOKEN` – your Directus static token

3. **Run the app**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deployment (Railway, etc.)

Configure these **required** environment variables in your deployment dashboard:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_DIRECTUS_URL` | Directus instance URL (e.g. `https://your-project.up.railway.app`). No trailing slash. Must be set at build time so the client can load assets. |
| `DIRECTUS_STATIC_TOKEN` | Directus static token for API and asset access. Keep this secret (server-only in practice; `NEXT_PUBLIC_*` is the one that is exposed to the client). |

Optional fallbacks when Directus is unavailable or has no data:

- `NEXT_PUBLIC_SITE_NAME` – default site/agency name (e.g. "AI Agency")
- `NEXT_PUBLIC_CONTACT_EMAIL` – default contact email for the contact CTA

Build and start:

- `npm run build` – production build
- `npm start` – run production server (e.g. after Railway runs `npm run build`)

## Pages & Sections

- **Home**: Hero (from `site_settings`), services grid, featured playbooks, case studies, contact CTA
- **Services** (`/services`): List of services
- **Service detail** (`/services/[slug]`): Description, related playbooks, case studies
- **Playbooks** (`/playbooks`): List of playbooks
- **Playbook detail** (`/playbooks/[slug]`): `workflow_steps`, `prompt_template`, `example_output`
- **Contact**: CTA section on home (`/#contact`) using `contact_email` from `site_settings`

## Directus collections used

- `site_settings` – hero, CTA, contact email, footer text
- `services` – name, slug, tagline, description, icon, pricing_start, related playbooks & case studies
- `playbooks` – name, slug, description, workflow_steps, prompt_template, example_output, difficulty_level, service
- `case_studies` – company_name, industry, problem, solution, results, service, logo

All data is fetched server-side from Directus using the REST API and the env variables above.
