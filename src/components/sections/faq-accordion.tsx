import { SectionLabel } from "@/components/ui/button-link";

export interface FaqAccordionProps {
  id?: string;
  items: { q: string; a: string }[];
  email: string;
}

export function FaqAccordion({ id = "faq", items, email }: FaqAccordionProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section id={id} className="section-y relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="gutter mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-16">
            <SectionLabel index="06" className="text-muted">
              FAQ
            </SectionLabel>
            <h2 data-reveal className="display mt-6 text-(length:--text-3xl)">
              Questions people <em className="text-mist">ask before saying yes.</em>
            </h2>
            <p data-reveal className="mt-6 text-muted">
              Something not covered?{" "}
              <a href={`mailto:${email}`} className="text-pearl underline decoration-mist underline-offset-4 hover:decoration-pearl">
                Email me directly
              </a>
              .
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {items.map((f) => (
            <details key={f.q} data-reveal className="faq group border-b border-line first:border-t">
              <summary className="flex min-h-11 items-center justify-between gap-6 py-6">
                <span className="display text-(length:--text-xl) text-pearl transition-colors group-hover:text-white">{f.q}</span>
                <span aria-hidden="true" className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-line-strong">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
