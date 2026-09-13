import type { CSSProperties } from "react";
import { SectionLabel } from "@/components/ui/button-link";
import { PhotoFrame } from "@/components/ui/photo";
import type { CaseStudy } from "@/lib/content";
import { resolvePhoto } from "@/lib/photos";

export interface CaseStudiesProps {
  id?: string;
  items: CaseStudy[];
}

/** Stacked sticky cards: each one slides over the last as you scroll. */
export function CaseStudies({ id = "work", items }: CaseStudiesProps) {
  return (
    <section id={id} className="section-y relative">
      <div className="gutter mx-auto max-w-[92rem]">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="02" className="text-muted">
              Results
            </SectionLabel>
            <h2 data-reveal className="display mt-6 text-(length:--text-3xl)">
              Not just tasks done. <em className="text-mist">Time given back.</em>
            </h2>
          </div>
          <p data-reveal className="self-end text-muted lg:col-span-4 lg:col-start-9">
            Three recent engagements, anonymised to protect my clients&rsquo; privacy. The numbers come from their own before-and-after tracking.
          </p>
        </div>

        <ol className="mt-16 space-y-8 lg:space-y-0">
          {items.map((c, idx) => {
            const photo = resolvePhoto(c.image);
            return (
              <li
                key={c.client}
                className="lg:sticky lg:pb-10"
                style={{ top: `calc(2.5rem + ${idx * 1.75}rem)` } as CSSProperties}
              >
                <article
                  data-reveal
                  className="grid overflow-hidden rounded-(--radius-lg) border border-line-strong bg-dusk shadow-(--shadow-2) md:grid-cols-12 lg:min-h-[70vh]"
                >
                  <div className="relative min-h-64 md:col-span-5">
                    <PhotoFrame photo={photo} sizes="(min-width: 1024px) 32vw, (min-width: 768px) 40vw, 100vw" decorative parallax={0.05} />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dusk via-dusk/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-dusk/10 md:to-dusk" />
                    <p className="display absolute bottom-6 left-6 text-7xl text-pearl/20 italic md:text-9xl">{String(idx + 1).padStart(2, "0")}</p>
                  </div>

                  <div className="flex flex-col justify-between gap-10 p-8 sm:p-12 md:col-span-7">
                    <div>
                      <p className="eyebrow text-muted">{c.sector}</p>
                      <h3 className="display mt-3 text-(length:--text-2xl)">{c.client}</h3>
                      <p className="mt-5 max-w-xl text-muted">{c.situation}</p>
                      <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                        {c.work.map((w) => (
                          <li key={w} className="border-t border-line pt-3 text-sm text-pearl/90">
                            {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-8">
                      <span className="display text-(length:--text-4xl) leading-none text-pearl">{c.metric}</span>
                      <span className="text-(length:--text-lg) text-mist italic font-display">{c.metricLabel}</span>
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
