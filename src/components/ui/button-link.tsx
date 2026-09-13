import type { ReactNode } from "react";

export interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "dark";
  className?: string;
  /** Show the arrow glyph that slides on hover. */
  arrow?: boolean;
}

const variants = {
  solid: "bg-pearl text-night hover:bg-white",
  ghost: "border border-line-strong text-ink hover:border-pearl hover:bg-pearl/5",
  dark: "bg-night text-pearl hover:bg-dusk",
} as const;

export function ButtonLink({ href, children, variant = "solid", className = "", arrow = true }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold tracking-wide transition-[background-color,border-color,transform] duration-500 ease-out-soft active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-4 shrink-0 transition-transform duration-500 ease-out-soft group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function SectionLabel({ index, children, className = "" }: { index: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="font-display text-base italic tracking-normal normal-case opacity-70">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  );
}
