import type { CSSProperties } from "react";

export interface TrustBarProps {
  tools: string[];
  stats: { value: number; suffix: string; label: string }[];
}

export function TrustBar({ tools, stats }: TrustBarProps) {
  return (
    <section aria-label="Tools and track record" className="relative border-y border-line bg-dusk/40">
      <div className="marquee overflow-hidden py-7" tabIndex={0} aria-label="Tools I work in daily">
        <ul className="marquee__track">
          {[...tools, ...tools].map((tool, idx) => (
            <li
              key={`${tool}-${idx}`}
              aria-hidden={idx >= tools.length || undefined}
              className="display flex items-center gap-10 pr-10 text-(length:--text-xl) whitespace-nowrap text-mist italic"
            >
              {tool}
              <span aria-hidden="true" className="text-xs not-italic text-slate">
                ✦
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="gutter mx-auto grid max-w-[92rem] grid-cols-2 border-t border-line lg:grid-cols-4">
        {stats.map((s, idx) => (
          <div
            key={s.label}
            data-reveal
            style={{ "--d": idx * 90 } as CSSProperties}
            className={`py-9 pr-4 ${idx % 2 === 1 ? "pl-4 sm:pl-8" : ""} ${idx > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${idx >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="display text-(length:--text-3xl) text-pearl">
              <span data-count={s.value}>{s.value}</span>
              <span className="text-mist italic">{s.suffix}</span>
            </dd>
            <dd aria-hidden="true" className="mt-2 max-w-[16rem] text-sm text-muted">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
