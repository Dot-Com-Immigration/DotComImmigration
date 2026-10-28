"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Scroll reveal that can never hide content.
 *
 * The element renders visible in the server HTML. Only after mount, and only
 * when the browser supports IntersectionObserver and the visitor has not asked
 * for reduced motion, does it arm itself and animate in. A failsafe timer
 * reveals anything the observer has not reported on, so a missed callback,
 * a container with no layout, or a screenshot pass can never leave a section
 * blank. People arrive at this site mid-crisis; the text has to be there.
 */
export function Reveal({
  children, delay = 0, className,
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "armed" | "in">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    // Already on screen at mount: leave it alone, do not flash it out and back.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) return;

    setState("armed");
    let done = false;
    const show = () => { if (!done) { done = true; setState("in"); } };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { show(); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });
    io.observe(el);
    const failsafe = window.setTimeout(show, 1800);
    return () => { io.disconnect(); window.clearTimeout(failsafe); };
  }, []);

  return (
    <div
      ref={ref}
      className={[className, state === "armed" ? "rv rv-wait" : state === "in" ? "rv rv-in" : ""]
        .filter(Boolean).join(" ")}
      style={state === "in" && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function Counter({ to, display, locale }: { to: number; display: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [text, setText] = useState(display);

  useEffect(() => {
    if (!inView || reduce) { setText(display); return; }
    const suffix = display.replace(/[\d\s, ]/g, "");
    let raf = 0;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(Math.round(to * eased).toLocaleString(locale === "fr" ? "fr-CA" : "en-CA") + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setText(display);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, display, locale]);

  return <span ref={ref} className="tabular-nums">{text}</span>;
}
