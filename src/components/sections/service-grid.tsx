import { ButtonLink, SectionLabel } from "@/components/ui/button-link";
import { ServiceIndex } from "@/components/sections/service-index";
import type { Service } from "@/lib/content";

export interface ServiceGridProps {
  id?: string;
  services: Service[];
  ctaHref: string;
}

export function ServiceGrid({ id = "services", services, ctaHref }: ServiceGridProps) {
  return (
    <section id={id} className="on-light section-y relative bg-pearl text-night">
      <div className="gutter mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-16">
            <SectionLabel index="01" className="text-day-muted">
              Services
            </SectionLabel>
            <h2 data-reveal className="display mt-6 text-(length:--text-3xl)">
              What I take <em className="text-slate">off your plate.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-day-muted">
              Six areas, described in the words clients use when they first get in touch. Pick one to start, or hand over all six.
            </p>
            <ButtonLink href={ctaHref} variant="dark" className="mt-9">
              Talk through your list
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ServiceIndex services={services} />
        </div>
      </div>
    </section>
  );
}
