"use client";

import { useId, useState, type CSSProperties } from "react";
import type { Service } from "@/lib/content";

export interface ServiceIndexProps {
  services: Service[];
}

export function ServiceIndex({ services }: ServiceIndexProps) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="relative">
      <ul className="border-t border-night/15">
        {services.map((s, idx) => {
          const isOpen = open === idx;
          const panelId = `${baseId}-panel-${idx}`;
          const btnId = `${baseId}-btn-${idx}`;
          return (
            <li key={s.title} data-reveal style={{ "--d": idx * 60 } as CSSProperties} className="border-b border-night/15">
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-7"
                >
                  <span className="font-display w-8 shrink-0 text-lg text-day-muted italic">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="display flex-1 text-(length:--text-2xl) leading-[1.1] transition-transform duration-700 ease-out-soft group-hover:translate-x-2">
                    {s.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid size-11 shrink-0 place-items-center rounded-full border border-night/25 transition-all duration-500 ease-out-soft group-hover:border-night ${
                      isOpen ? "rotate-45 bg-night text-pearl" : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`grid transition-[grid-template-rows] duration-700 ease-out-soft ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="grid gap-6 pb-8 pl-13 sm:grid-cols-2 sm:pl-16">
                    <p className="max-w-md text-day-muted">{s.summary}</p>
                    <ul className="flex flex-wrap content-start gap-2">
                      {s.tasks.map((t) => (
                        <li key={t} className="rounded-full border border-night/20 px-3.5 py-1.5 text-xs font-medium">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
