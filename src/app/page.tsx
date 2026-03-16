import {
  getSiteSettings,
  getServices,
  getPlaybooks,
  getCaseStudies,
} from "@/lib/directus";
import { HomeHero } from "@/components/HomeHero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { FeaturedPlaybooks } from "@/components/FeaturedPlaybooks";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ContactCTA } from "@/components/ContactCTA";

export default async function HomePage() {
  const [settings, services, featuredPlaybooks, caseStudies] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getPlaybooks({ featured: true, limit: 6 }),
    getCaseStudies(6),
  ]);

  return (
    <>
      <HomeHero settings={settings} />
      <ServicesGrid services={services} />
      <FeaturedPlaybooks playbooks={featuredPlaybooks} />
      <CaseStudiesSection caseStudies={caseStudies} />
      <ContactCTA settings={settings} />
    </>
  );
}
