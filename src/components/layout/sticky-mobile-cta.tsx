"use client";

import { useEffect, useState } from "react";

export interface StickyMobileCtaProps {
  bookHref: string;
  email: string;
}

/** Fixed bottom action bar on small screens. Hides over the contact section, at the footer, and while a form field is focused. */
export function StickyMobileCta({ bookHref, email }: StickyMobileCtaProps) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const blockers = new Set<string>();
    let pastHero = false;
    let typing = false;
    const sync = () => setHidden(!pastHero || typing || blockers.size > 0);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = (e.target as HTMLElement).id || e.target.tagName;
        if (e.isIntersecting) blockers.add(id);
        else blockers.delete(id);
      });
      sync();
    });
    ["contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const footer = document.querySelector("footer");
    if (footer) io.observe(footer);

    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.6;
      if (next !== pastHero) {
        pastHero = next;
        sync();
      }
    };
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      typing = t.matches("input, textarea, select");
      sync();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onFocus);
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-night/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-500 ease-out-soft lg:hidden ${hidden ? "translate-y-full" : "translate-y-0"}`}
      inert={hidden}
    >
      <div className="mx-auto flex max-w-lg gap-3">
        <a href={`mailto:${email}`} className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-line-strong text-sm font-medium">
          Email me
        </a>
        <a href={bookHref} className="flex min-h-12 flex-[1.6] items-center justify-center rounded-full bg-pearl text-sm font-semibold text-night">
          Book a free call
        </a>
      </div>
    </div>
  );
}
