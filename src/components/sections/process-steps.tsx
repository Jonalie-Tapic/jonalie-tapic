import type { CSSProperties } from "react";
import { ButtonLink, SectionLabel } from "@/components/ui/button-link";

export interface ProcessStepsProps {
  id?: string;
  steps: { title: string; duration: string; body: string }[];
  ctaHref: string;
}

export function ProcessSteps({ id = "process", steps, ctaHref }: ProcessStepsProps) {
  return (
    <section id={id} className="section-y relative bg-dusk/40">
      <div className="gutter mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-16">
            <SectionLabel index="03" className="text-muted">
              Process
            </SectionLabel>
            <h2 data-reveal className="display mt-6 text-(length:--text-3xl)">
              Handing over, <em className="text-mist">without the headache.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-md text-muted">
              Most people worry that delegating will take more time than doing it themselves. So the handover is structured, short, and mostly on me.
            </p>

            <div data-reveal="scale" className="mt-10 flex max-w-sm items-center gap-5 rounded-t-full rounded-b-(--radius) border border-line-strong bg-night/60 px-6 pt-10 pb-6">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9 shrink-0 text-pearl" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-sm text-muted">
                <strong className="block font-semibold text-pearl">Confidential by default</strong>
                NDA signed and passwords shared only via a password manager.
              </p>
            </div>

            <ButtonLink href={ctaHref} className="mt-10">
              Start with a free call
            </ButtonLink>
          </div>
        </div>

        <ol data-progress className="relative lg:col-span-6 lg:col-start-7">
          {/* Line drawn by scroll */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.4rem] w-px bg-line" />
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.4rem] w-px origin-top bg-pearl"
            style={{ transform: "scaleY(var(--p, 1))" } as CSSProperties}
          />
          {steps.map((s, idx) => (
            <li key={s.title} data-reveal className="group relative pb-16 pl-20 last:pb-0" style={{ "--d": 80 } as CSSProperties}>
              <span className="display absolute top-0 left-0 grid size-11 place-items-center rounded-full border border-line-strong bg-night text-lg italic transition-colors duration-700 group-[.is-in]:border-pearl group-[.is-in]:bg-pearl group-[.is-in]:text-night">
                {idx + 1}
              </span>
              <p className="eyebrow pt-3 text-muted">{s.duration}</p>
              <h3 className="display mt-3 text-(length:--text-2xl)">{s.title}</h3>
              <p className="mt-4 max-w-lg text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
