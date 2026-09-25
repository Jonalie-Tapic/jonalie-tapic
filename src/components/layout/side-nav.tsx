"use client";

import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/content";

export interface SideNavProps {
  items: NavItem[];
  name: string;
  role: string;
  availability: string;
  email: string;
  phone: { display: string; href: string };
  location: string;
  linkedin: string;
  ctaHref: string;
  /** Anchor links resolve on the homepage only. Elsewhere they prefix "/". */
  onHome?: boolean;
}

export function SideNav({ items, name, role, availability, email, phone, location, linkedin, ctaHref, onHome = true }: SideNavProps) {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  // Scroll progress (direct DOM write) + active section: the last nav section whose top has passed 45% of the viewport
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("transform", `scaleY(${p})`);
      if (!onHome) return;
      const line = window.innerHeight * 0.45;
      let current = "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items, onHome]);

  // Drawer: escape, focus trap, restore focus, lock scroll
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const trigger = triggerRef.current;
    const lenis = (window as Window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const focusables = drawer?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
      trigger?.focus();
    };
  }, [open]);

  const links = (onClick?: () => void) => (
    <ul className="space-y-1">
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={href(item.id)}
              onClick={onClick}
              aria-current={isActive ? "true" : undefined}
              className="group flex min-h-11 items-center gap-4 py-1.5 text-sm"
            >
              <span className={`font-display w-5 text-sm italic transition-colors duration-500 ${isActive ? "text-pearl" : "text-mist"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className={`h-px bg-pearl transition-all duration-700 ease-out-soft ${isActive ? "w-8 opacity-100" : "w-3 opacity-30 group-hover:w-6 group-hover:opacity-70"}`}
              />
              <span className={`tracking-wide transition-colors duration-500 ${isActive ? "text-pearl" : "text-muted group-hover:text-pearl"}`}>
                {item.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );

  const monogram = (
    <a href={onHome ? "#top" : "/"} className="group flex items-center gap-3" aria-label={`${name}, ${role}. Back to top`}>
      <span className="display grid size-11 place-items-center rounded-t-full rounded-b-md border border-line-strong text-2xl italic transition-colors duration-500 group-hover:border-pearl">
        J
      </span>
      <span className="leading-tight">
        <span className="display block text-2xl">{name}</span>
        <span className="block text-[11px] tracking-[0.18em] text-muted uppercase">{role}</span>
      </span>
    </a>
  );

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-(--sidebar-w) flex-col justify-between border-r border-line bg-night/80 px-8 py-9 backdrop-blur-xl lg:flex">
        <div>{monogram}</div>

        <nav aria-label="Primary" className="relative pl-1">
          {links()}
        </nav>

        <div className="space-y-6">
          <p className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
            <span className="relative mt-1 flex size-2 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative size-2 rounded-full bg-ok" />
            </span>
            {availability}
          </p>
          <a
            href={ctaHref}
            className="group flex min-h-12 items-center justify-between rounded-full bg-pearl px-5 text-sm font-semibold text-night transition-colors duration-500 hover:bg-white"
          >
            Book a discovery call
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </a>
          <div className="space-y-2 text-xs text-muted">
            <p className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              {location}
            </p>
            <div className="flex gap-5">
              <a className="hover:text-pearl" href={`mailto:${email}`}>
                Email
              </a>
              <a className="hover:text-pearl" href={phone.href} aria-label={`Call ${phone.display}`}>
                Call
              </a>
              <a className="hover:text-pearl" href={linkedin} rel="noopener noreferrer" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Scroll progress on the rail edge */}
        <span aria-hidden="true" className="absolute top-0 right-[-1px] h-full w-px bg-transparent">
          <span ref={progressRef} className="block h-full w-px origin-top scale-y-0 bg-pearl/70" />
        </span>
      </aside>

      {/* Mobile / tablet top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-night/85 px-5 backdrop-blur-xl lg:hidden">
        {monogram}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line-strong px-4 text-xs tracking-[0.18em] uppercase"
        >
          Menu
        </button>
      </header>

      {/* Drawer (slides from the left, echoing the desktop rail) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-night/60 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col justify-between border-r border-line bg-night px-7 py-7 transition-transform duration-700 ease-out-soft ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            {monogram}
            <button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-line-strong" aria-label="Close menu">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile">{links(() => setOpen(false))}</nav>
          <div className="space-y-5">
            <div className="space-y-1.5 text-xs text-muted">
              <p>{availability}</p>
              <p>{location}</p>
            </div>
            <div className="space-y-1 text-sm">
              <a href={`mailto:${email}`} className="block min-h-11 content-center [overflow-wrap:anywhere] text-pearl">
                {email}
              </a>
              <a href={phone.href} className="block min-h-11 content-center text-pearl">
                {phone.display}
              </a>
            </div>
            <a href={ctaHref} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-full bg-pearl text-sm font-semibold text-night">
              Book a discovery call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
