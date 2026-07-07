import { COACHES, SITE } from "@/lib/site";
import type { FAQ, Service, TeamMember } from "@/lib/types";

// Organization / ProfessionalService. NOTE: @type is ProfessionalService
// (non-clinical). If practitioners are licensed clinicians, revisit whether
// MedicalBusiness + clinical disclaimers are required (see CEO plan open question).
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    slogan: SITE.tagline,
    url: SITE.url,
    email: SITE.email,
    areaServed: "IL",
    address: {
      "@type": "PostalAddress",
      addressLocality: "רעננה",
      addressCountry: "IL",
    },
    employee: Object.values(COACHES).map((c) => ({
      "@type": "Person",
      name: c.name,
      jobTitle: c.role,
    })),
  };
}

export function serviceLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline || service.metaDescription,
    serviceType: service.title,
    provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    areaServed: "IL",
    url: `${SITE.url}/services/${service.slug}`,
  };
}

export function personLd(member: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/team/${member.slug}`,
  };
}

export function faqLd(faqs: FAQ[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbLd(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}
