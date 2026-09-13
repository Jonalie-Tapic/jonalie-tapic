import type { CSSProperties } from "react";
import { ButtonLink, SectionLabel } from "@/components/ui/button-link";
import type { Package } from "@/lib/content";

export interface PackageCardsProps {
  id?: string;
  packages: Package[];
  pricing: { label: string; detail: string };
  notes: string[];
  ctaHref: string;
}

export function PackageCards({ id = "rates", packages, pricing, notes, ctaHref }: PackageCardsProps) {
  return (
    <section id={id} className="section-y relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(65_90_119/0.35),transparent)]" />
      <div className="gutter mx-auto max-w-[92rem]">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="05" className="text-muted">
              Rates
            </SectionLabel>
            <h2 data-reveal className="display mt-6 text-(length:--text-3xl)">
              Tailored to your workload. <em className="text-mist">Agreed before we start.</em>
            </h2>
          </div>
          <p data-reveal className="self-end text-muted lg:col-span-4 lg:col-start-9">
            No two businesses need the same support, so there&rsquo;s no fixed price list. Pick the level that sounds closest, and we&rsquo;ll set the hours and rate together on a free call.
          </p>
        </div>

        <ul className="mt-16 grid items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {packages.map((p, idx) => {
            const featured = p.recommended;
            return (
              <li key={p.name} data-reveal style={{ "--d": idx * 120 } as CSSProperties} className={featured ? "relative md:-top-6" : ""}>
                <article
                  data-tilt="5"
                  className={`relative flex h-full flex-col rounded-(--radius-lg) p-8 sm:p-10 ${
                    featured ? "on-light bg-pearl text-night shadow-(--shadow-2)" : "border border-line-strong bg-dusk/60"
                  }`}
                >
                  {featured && (
                    <p className="absolute -top-3.5 left-8 rounded-full bg-mist px-3.5 py-1 text-[11px] font-semibold tracking-[0.16em] text-night uppercase">
                      Most chosen
                    </p>
                  )}
                  <h3 className="display tilt-pop text-(length:--text-2xl)">{p.name}</h3>
                  <p className={`mt-1 text-sm ${featured ? "text-day-muted" : "text-muted"}`}>{p.scope}</p>
                  <p className="mt-8">
                    <span className="display block text-(length:--text-xl) leading-tight italic">{pricing.label}</span>
                    <span className={`mt-2 block text-sm ${featured ? "text-day-muted" : "text-muted"}`}>{pricing.detail}</span>
                  </p>
                  <p className={`mt-6 text-sm ${featured ? "text-day-muted" : "text-muted"}`}>{p.bestFor}</p>
                  <ul className={`mt-8 flex-1 space-y-3 border-t pt-8 text-sm ${featured ? "border-night/15" : "border-line"}`}>
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex gap-3">
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 8.5l3 3 7-7" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={ctaHref} variant={featured ? "dark" : "ghost"} className="mt-10 w-full">
                    Discuss {p.name}
                  </ButtonLink>
                </article>
              </li>
            );
          })}
        </ul>

        <ul className="mt-14 grid gap-4 border-t border-line pt-8 text-sm text-muted md:grid-cols-3">
          {notes.map((n) => (
            <li key={n} className="flex gap-3">
              <span aria-hidden="true" className="font-display text-mist italic">
                ✦
              </span>
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
