"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Scenario } from "@/lib/content";

export interface ScenarioBlockProps {
  id?: string;
  scenarios: Scenario[];
  ctaHref: string;
}

export function ScenarioBlock({ id = "scenarios", scenarios, ctaHref }: ScenarioBlockProps) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const current = scenarios[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next: number | undefined;
    if (dir) next = (active + dir + scenarios.length) % scenarios.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = scenarios.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id={id} aria-labelledby={`${baseId}-h`} className="section-y relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <div className="gutter mx-auto max-w-[92rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-muted">Sound familiar?</p>
            <h2 id={`${baseId}-h`} data-reveal className="display mt-5 max-w-3xl text-(length:--text-3xl)">
              Tell me about your <em className="text-mist">worst week</em>, and I&rsquo;ll show you how I&rsquo;d fix it.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div role="tablist" aria-orientation="vertical" aria-label="Common situations" onKeyDown={onKey} className="flex flex-col gap-2 lg:col-span-5">
            {scenarios.map((s, idx) => {
              const selected = idx === active;
              return (
                <button
                  key={s.situation}
                  ref={(el) => {
                    tabs.current[idx] = el;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${idx}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(idx)}
                  className={`group relative overflow-hidden rounded-(--radius) border px-6 py-5 text-left transition-colors duration-500 ${
                    selected ? "border-line-strong bg-dusk" : "border-transparent hover:bg-dusk/50"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-4 left-0 w-0.5 origin-top rounded-full bg-pearl transition-transform duration-700 ease-out-soft ${selected ? "scale-y-100" : "scale-y-0"}`}
                  />
                  <span className={`display block text-(length:--text-xl) leading-snug italic transition-colors duration-500 ${selected ? "text-pearl" : "text-mist group-hover:text-pearl"}`}>
                    &ldquo;{s.situation}&rdquo;
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            tabIndex={0}
            className="relative overflow-hidden rounded-(--radius-lg) border border-line bg-gradient-to-br from-dusk to-night p-8 sm:p-12 lg:col-span-7"
          >
            <div aria-hidden="true" className="stars absolute inset-0 opacity-30" />
            <div key={active} className="relative motion-safe:animate-[fade-up_0.8s_var(--ease-out)_both]">
              <p className="eyebrow text-muted">What I&rsquo;d do</p>
              <p className="display mt-4 text-(length:--text-2xl) leading-tight text-pearl">{current.response}</p>
              <ol className="mt-8 space-y-4">
                {current.steps.map((step, idx) => (
                  <li key={step} className="flex gap-4 border-t border-line pt-4">
                    <span className="font-display text-lg text-mist italic">{idx + 1}.</span>
                    <span className="text-muted">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col gap-6 rounded-(--radius) bg-pearl/5 p-5 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-pearl">
                  <span className="text-muted">The result: </span>
                  {current.outcome}
                </p>
                <a href={ctaHref} className="shrink-0 text-sm font-semibold text-pearl underline decoration-mist underline-offset-4 hover:decoration-pearl">
                  This is me, let&rsquo;s talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
