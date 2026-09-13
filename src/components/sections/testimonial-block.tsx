import type { CSSProperties } from "react";
import { PhotoFrame } from "@/components/ui/photo";
import type { Testimonial } from "@/lib/content";
import type { ResolvedPhoto } from "@/lib/photos";

export interface TestimonialBlockProps {
  id?: string;
  items: Testimonial[];
  media: ResolvedPhoto;
}

export function TestimonialBlock({ id = "kind-words", items, media }: TestimonialBlockProps) {
  const [featured, ...rest] = items;
  return (
    <section id={id} aria-labelledby="kind-words-h" className="on-light section-y relative bg-pearl text-night">
      <div className="gutter mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-4">
          <div data-reveal="clip" className="duotone relative aspect-[4/5] overflow-hidden rounded-(--radius-lg)">
            <PhotoFrame photo={media} sizes="(min-width: 1024px) 28vw, 100vw" parallax={0.05} />
          </div>
          <figcaption className="mt-4 text-xs tracking-wide text-day-muted">Hover to bring the colour back. Everything else stays calm.</figcaption>
        </figure>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="eyebrow text-day-muted">Kind words</p>
          <h2 id="kind-words-h" className="sr-only">
            What clients say
          </h2>
          <figure data-reveal className="mt-6">
            <blockquote className="display text-(length:--text-3xl) leading-[1.12]">
              <span aria-hidden="true" className="mr-1 text-slate">
                &ldquo;
              </span>
              {featured.quote}
              <span aria-hidden="true" className="text-slate">
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span aria-hidden="true" className="display grid size-12 place-items-center rounded-full bg-night text-lg text-pearl italic">
                {featured.name.charAt(0)}
              </span>
              <span>
                <span className="block font-semibold">{featured.name}</span>
                <span className="block text-sm text-day-muted">{featured.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="mt-16 grid gap-8 border-t border-night/15 pt-10 sm:grid-cols-2">
            {rest.map((t, idx) => (
              <figure key={t.name} data-reveal style={{ "--d": idx * 120 } as CSSProperties}>
                <blockquote className="display text-(length:--text-xl) leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-day-muted"> · {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
