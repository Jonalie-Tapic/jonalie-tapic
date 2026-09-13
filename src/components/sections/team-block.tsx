import type { CSSProperties } from "react";
import { SectionLabel } from "@/components/ui/button-link";
import { PhotoFrame } from "@/components/ui/photo";
import type { ResolvedPhoto } from "@/lib/photos";

export interface TeamBlockProps {
  id?: string;
  heading: string;
  lead: string;
  body: string[];
  principles: { title: string; body: string }[];
  credentials: string[];
  media: { bleed: ResolvedPhoto; arch: ResolvedPhoto };
}

/** About: a photo that bleeds to the rail edge, overlapped by the story card. */
export function TeamBlock({ id = "about", heading, lead, body, principles, credentials, media }: TeamBlockProps) {
  return (
    <section id={id} className="section-y relative">
      <div className="relative grid lg:grid-cols-12">
        {/* Bleed image */}
        <div className="relative h-[70vh] min-h-[26rem] overflow-hidden lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:h-[92vh]" data-reveal="clip">
          <PhotoFrame photo={media.bleed} sizes="(min-width: 1024px) 50vw, 100vw" parallax={0.08} />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-night/80" />
          <div className="absolute bottom-6 left-(--gutter) lg:hidden">
            <SectionLabel index="04" className="text-pearl">
              About
            </SectionLabel>
          </div>
        </div>

        {/* Story card overlapping the image */}
        <div className="gutter relative -mt-24 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0 lg:flex lg:items-center lg:pl-0">
          <div data-reveal className="relative rounded-(--radius-lg) border border-line-strong bg-dusk/90 p-8 shadow-(--shadow-2) backdrop-blur-xl sm:p-12 lg:-ml-24">
            <SectionLabel index="04" className="hidden text-muted lg:flex">
              About
            </SectionLabel>
            <h2 className="display mt-2 text-(length:--text-3xl) lg:mt-6">{heading}</h2>
            <p className="display mt-4 text-(length:--text-xl) text-mist italic">{lead}</p>
            <div className="mt-6 space-y-4 text-muted">
              {body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="display mt-8 text-4xl text-pearl italic" aria-hidden="true">
              Jonalie
            </p>
          </div>
        </div>
      </div>

      <div className="gutter mx-auto mt-20 grid max-w-[92rem] gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
        <ul className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
          {principles.map((p, idx) => (
            <li key={p.title} data-reveal style={{ "--d": idx * 120 } as CSSProperties} className="border-t border-line-strong pt-6">
              <p className="display text-5xl text-slate italic">{String(idx + 1).padStart(2, "0")}</p>
              <h3 className="display mt-4 text-(length:--text-xl) text-pearl">{p.title}</h3>
              <p className="mt-3 text-sm text-muted">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="flex gap-6 lg:col-span-4">
          <div data-reveal="scale" className="relative aspect-[3/4.4] w-32 shrink-0 overflow-hidden rounded-t-full rounded-b-(--radius) ring-1 ring-line-strong sm:w-40">
            <PhotoFrame photo={media.arch} sizes="160px" />
          </div>
          <div data-reveal>
            <h3 className="eyebrow text-muted">Training &amp; tools</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-mist" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
