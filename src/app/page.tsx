import { SiteShell } from "@/components/layout/site-shell";
import { CaseStudies } from "@/components/sections/case-studies";
import { ConversionBlock } from "@/components/sections/conversion-block";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Hero } from "@/components/sections/hero";
import { PackageCards } from "@/components/sections/package-cards";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ScenarioBlock } from "@/components/sections/scenario-block";
import { ServiceGrid } from "@/components/sections/service-grid";
import { TeamBlock } from "@/components/sections/team-block";
import { TestimonialBlock } from "@/components/sections/testimonial-block";
import { TrustBar } from "@/components/sections/trust-bar";
import {
  about,
  caseStudies,
  faqs,
  hero,
  packages,
  photos,
  pricing,
  pricingNotes,
  processSteps,
  scenarios,
  services,
  site,
  stats,
  testimonials,
  tools,
} from "@/lib/content";
import { resolvePhoto } from "@/lib/photos";

export default function HomePage() {
  const book = site.bookingUrl;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name}, Virtual Assistant`,
    url: site.url,
    email: site.email,
    description: hero.subheading,
    areaServed: ["United States", "Australia", "United Kingdom"],
    founder: {
      "@type": "Person",
      name: site.name,
      jobTitle: "Virtual Assistant",
      knowsAbout: ["Inbox management", "Calendar management", "Bookkeeping support", "Travel planning", "Standard operating procedures"],
    },
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      {/* 1 · Relevance */}
      <Hero
        eyebrow={hero.eyebrow}
        headingStart={hero.headingStart}
        headingEmphasis={hero.headingEmphasis}
        subheading={hero.subheading}
        primaryCta={{ label: hero.primaryCta, href: book }}
        secondaryCta={{ label: hero.secondaryCta, href: "#services" }}
        assurances={hero.assurances}
        tasks={hero.tasks}
        availability={site.availability}
        media={{ main: resolvePhoto(photos.standing), inset: resolvePhoto(photos.tablet) }}
      />
      {/* 2 · Competence at a glance */}
      <TrustBar tools={tools} stats={stats} />
      {/* 1–2 · Category fit */}
      <ServiceGrid services={services} ctaHref={book} />
      {/* 5 · Personal fit */}
      <ScenarioBlock scenarios={scenarios} ctaHref={book} />
      {/* 3 · Competence */}
      <CaseStudies items={caseStudies} />
      {/* 4 · Ease of handover (dominant fear) */}
      <ProcessSteps steps={processSteps} ctaHref={book} />
      {/* 3 · The real person */}
      <TeamBlock
        heading={about.heading}
        lead={about.lead}
        body={about.body}
        principles={about.principles}
        credentials={about.credentials}
        media={{ bleed: resolvePhoto(photos.desk), arch: resolvePhoto(photos.pocket) }}
      />
      {/* 6 · Value */}
      <PackageCards packages={packages} pricing={pricing} notes={pricingNotes} ctaHref={book} />
      {/* 3 · Third-party proof */}
      <TestimonialBlock items={testimonials} media={resolvePhoto(photos.red)} />
      {/* 7 · Objections */}
      <FaqAccordion items={faqs} email={site.email} />
      {/* 7 · Action */}
      <ConversionBlock email={site.email} response={site.response} hours={site.hours} media={resolvePhoto(photos.hallway)} />
    </SiteShell>
  );
}
