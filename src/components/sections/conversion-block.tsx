import { LeadForm } from "@/components/forms/lead-form";
import { SectionLabel } from "@/components/ui/button-link";
import { PhotoFrame } from "@/components/ui/photo";
import type { ResolvedPhoto } from "@/lib/photos";

export interface ConversionBlockProps {
  id?: string;
  email: string;
  response: string;
  hours: string;
  media: ResolvedPhoto;
}

const nextSteps = [
  "I read your note and reply within one business day.",
  "We have a relaxed 20-minute call about what's piling up.",
  "You get a written plan and price. No pressure, no obligation.",
];

export function ConversionBlock({ id = "contact", email, response, hours, media }: ConversionBlockProps) {
  return (
    <section id={id} className="grain relative isolate overflow-hidden section-y">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-dusk to-night" />
      <div aria-hidden="true" className="stars absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden="true" className="absolute bottom-[-40%] left-1/2 -z-10 h-[70vmax] w-[120vmax] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgb(119_141_169/0.35),transparent)]" />

      <div className="gutter mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="07" className="text-muted">
            Contact
          </SectionLabel>
          <h2 data-reveal className="display mt-6 text-(length:--text-4xl)">
            Let&rsquo;s make next week <em className="text-mist">lighter.</em>
          </h2>

          <ol className="mt-10 space-y-5">
            {nextSteps.map((s, idx) => (
              <li key={s} data-reveal className="flex gap-5">
                <span className="display grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-base italic">{idx + 1}</span>
                <span className="pt-1.5 text-muted">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex items-end gap-6">
            <div data-reveal="scale" className="relative hidden aspect-[3/4.4] w-36 shrink-0 overflow-hidden rounded-t-full rounded-b-(--radius) ring-1 ring-line-strong sm:block">
              <PhotoFrame photo={media} sizes="144px" parallax={0.04} />
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-muted">Prefer email?</p>
              <a href={`mailto:${email}`} className="display block text-(length:--text-xl) text-pearl underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-pearl">
                {email}
              </a>
              <p className="text-muted">Available in {hours}.</p>
            </div>
          </div>
        </div>

        <div data-reveal className="rounded-(--radius-lg) border border-line-strong bg-dusk/70 p-7 shadow-(--shadow-2) backdrop-blur-xl sm:p-10 lg:col-span-7">
          <h3 className="display text-(length:--text-2xl)">Tell me what&rsquo;s on your plate</h3>
          <p className="mt-2 mb-8 text-sm text-muted">Takes about a minute. There are no wrong answers.</p>
          <LeadForm email={email} response={response} />
        </div>
      </div>
    </section>
  );
}
