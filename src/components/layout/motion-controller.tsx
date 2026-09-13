"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * One client boundary drives all decorative motion, so sections stay Server Components.
 * Hooks into data attributes:
 *  - data-reveal[="left"|"scale"|"clip"]  fades in when scrolled into view
 *  - data-parallax="0.12"                  translates with scroll at that speed
 *  - data-progress                          exposes --p (0→1) as the element passes the viewport
 *  - data-tilt                              pointer-driven 3D tilt (fine pointers only)
 *  - data-count="30"                        counts up when revealed
 *  - data-ticker                            ticks its .task-row children in sequence
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // Smooth scroll
    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, anchors: { offset: 0 }, autoRaf: true });
      (window as Window & { __lenis?: Lenis }).__lenis = lenis;
      cleanups.push(() => {
        lenis?.destroy();
        delete (window as Window & { __lenis?: Lenis }).__lenis;
      });
    }

    // Reveal + counters + ticker
    const countUp = (el: HTMLElement) => {
      const to = Number(el.dataset.count);
      if (reduced || Number.isNaN(to)) return;
      const start = performance.now();
      const dur = 1600;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 4))));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const tickers = new Map<HTMLElement, number>();
    const runTicker = (el: HTMLElement) => {
      const rows = Array.from(el.querySelectorAll<HTMLElement>(".task-row"));
      if (reduced) {
        rows.forEach((r) => r.classList.add("is-done"));
        return;
      }
      let i = 0;
      const tick = () => {
        if (i < rows.length) {
          rows[i].classList.add("is-done");
          i += 1;
          tickers.set(el, window.setTimeout(tick, 900));
        } else {
          tickers.set(
            el,
            window.setTimeout(() => {
              rows.forEach((r) => r.classList.remove("is-done"));
              i = 0;
              tickers.set(el, window.setTimeout(tick, 700));
            }, 3200),
          );
        }
      };
      tick();
    };
    const stopTicker = (el: HTMLElement) => {
      const id = tickers.get(el);
      if (id) window.clearTimeout(id);
      tickers.delete(el);
    };

    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      if (!reduced) el.textContent = "0";
    });

    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          if (el.matches("[data-count]")) countUp(el);
          revealIO.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    const tickerIO = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting && !tickers.has(el)) runTicker(el);
        else if (!entry.isIntersecting) stopTicker(el);
      }
    });
    document.querySelectorAll("[data-ticker]").forEach((el) => tickerIO.observe(el));
    cleanups.push(() => {
      tickerIO.disconnect();
      tickers.forEach((id) => window.clearTimeout(id));
    });

    // Parallax + progress, only for elements near the viewport
    if (!reduced) {
      const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      const progressEls = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
      const visible = new Set<HTMLElement>();
      const nearIO = new IntersectionObserver(
        (entries) => entries.forEach((e) => (e.isIntersecting ? visible.add(e.target as HTMLElement) : visible.delete(e.target as HTMLElement))),
        { rootMargin: "20% 0px 20% 0px" },
      );
      [...parallaxEls, ...progressEls].forEach((el) => nearIO.observe(el));

      let frame = 0;
      const update = () => {
        frame = 0;
        const vh = window.innerHeight;
        visible.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (el.dataset.parallax) {
            const speed = Number(el.dataset.parallax) || 0.1;
            const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
            el.style.setProperty("--py", `${offset.toFixed(1)}px`);
          }
          if (el.hasAttribute("data-progress")) {
            const p = Math.min(1, Math.max(0, (vh * 0.65 - rect.top) / rect.height));
            el.style.setProperty("--p", p.toFixed(3));
          }
        });
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        nearIO.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(frame);
      });
    }

    // Tilt
    if (!reduced && finePointer) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const max = Number(el.dataset.tilt) || 6;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.classList.add("is-tilting");
          el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
        };
        const leave = () => {
          el.classList.remove("is-tilting");
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
