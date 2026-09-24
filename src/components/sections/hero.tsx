import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { PhotoFrame } from "@/components/ui/photo";
import type { ResolvedPhoto } from "@/lib/photos";

export interface HeroProps {
  id?: string;
  eyebrow: string;
  headingStart: string;
  headingEmphasis: string;
  subheading: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  assurances: string[];
  tasks: { label: string; time: string }[];
  availability: string;
  media: { main: ResolvedPhoto; inset: ResolvedPhoto };
}

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function Hero({ id = "top", eyebrow, headingStart, headingEmphasis, subheading, primaryCta, secondaryCta, assurances, tasks, availability, media }: HeroProps) {
  return (
    <section id={id} className="grain relative isolate overflow-hidden pt-24 pb-20 lg:min-h-svh lg:pt-0 lg:pb-0">
      {/* Twilight horizon glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 right-[-20%] h-[90vmax] w-[90vmax] rounded-full bg-[radial-gradient(closest-side,rgb(65_90_119/0.55),transparent)]" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(27_38_59/0.9),transparent)]" />
        <div className="stars absolute inset-0 opacity-40" />
      </div>

      <div className="gutter mx-auto grid max-w-[92rem] items-center gap-14 lg:min-h-svh lg:grid-cols-12 lg:gap-8 lg:py-16">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="eyebrow fade-up text-muted" style={i(0)}>
            {eyebrow}
          </p>

          <h1 className="display mt-6 text-[clamp(2.7rem,1.2rem+3.6vw,5.6rem)] text-pearl">
            <span className="line-mask" style={i(0)}>
              <span>{headingStart}</span>
            </span>
            <span className="line-mask" style={i(1)}>
              <span className="italic text-mist">{headingEmphasis}</span>
            </span>
          </h1>

          <p className="fade-up mt-7 max-w-xl text-(length:--text-lg) leading-relaxed text-muted" style={i(2)}>
            {subheading}
          </p>

          <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={i(3)}>
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="ghost">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="fade-up mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wide text-muted" style={i(4)}>
            {assurances.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 text-pearl" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
                {a}
              </li>
            ))}
          </ul>
        </div>

        {/* Composition */}
        <div className="relative mx-auto w-full max-w-[28rem] lg:col-span-5 lg:max-w-none">
          {/* Orbit ring */}
          <div aria-hidden="true" className="absolute top-[6%] left-1/2 aspect-square w-[118%] -translate-x-1/2 rounded-full border border-line motion-safe:animate-[spin_90s_linear_infinite]">
            <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-mist" />
          </div>

          {/* Main arch */}
          <div className="fade-up relative ml-auto aspect-[3/4.2] w-[82%] overflow-hidden rounded-t-full rounded-b-(--radius-lg) shadow-(--shadow-2) ring-1 ring-line-strong" style={i(1)}>
            <PhotoFrame photo={media.main} sizes="(min-width: 1024px) 34vw, 80vw" priority parallax={0.06} />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/70 to-transparent" />
          </div>

          {/* Vertical caption along the arch */}
          <p className="absolute top-[18%] left-full ml-5 hidden text-[10px] tracking-[0.3em] whitespace-nowrap text-muted uppercase [writing-mode:vertical-rl] xl:block">
            {availability}
          </p>

          {/* Inset tilt card: sits in the arch's empty top-left curve so it never covers her face */}
          <div
            data-tilt="10"
            className="fade-up absolute top-[3%] left-0 w-[34%] rounded-(--radius) bg-pearl p-1.5 shadow-(--shadow-2)"
            style={i(3)}
          >
            <div className="tilt-pop relative aspect-[4/5] overflow-hidden rounded-[calc(var(--radius)-4px)]">
              <PhotoFrame photo={media.inset} sizes="(min-width: 1024px) 14vw, 38vw" />
            </div>
          </div>

          {/* Task ticker */}
          <div
            data-ticker
            className="fade-up absolute bottom-[-7%] left-[-2%] w-[64%] rounded-(--radius) border border-line-strong bg-dusk/80 p-4 shadow-(--shadow-2) backdrop-blur-xl sm:left-[-8%] sm:w-[56%]"
            style={i(2)}
          >
            <p className="flex items-center justify-between text-[10px] tracking-[0.2em] text-muted uppercase">
              <span>Today, handled</span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
            </p>
            <ul className="mt-3 space-y-2.5">
              {tasks.map((t) => (
                <li key={t.label} className="task-row flex items-center gap-3 text-[12.5px] leading-tight">
                  <span className="task-dot grid size-4 shrink-0 place-items-center rounded-full border border-pearl/60 text-night">
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path className="task-check" d="M3.5 8.5l3 3 6-6.5" />
                    </svg>
                  </span>
                  <span className="flex-1 text-pearl">{t.label}</span>
                  <span className="hidden text-[10px] text-muted sm:inline">{t.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        className="absolute bottom-8 left-(--gutter) hidden items-center gap-3 text-[11px] tracking-[0.25em] text-muted uppercase hover:text-pearl lg:flex"
      >
        <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-pearl motion-safe:animate-[scroll-cue_2.2s_ease-in-out_infinite]" />
        </span>
        Scroll
      </a>
    </section>
  );
}
