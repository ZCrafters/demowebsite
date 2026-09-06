"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal-on-scroll subtle: fade-up + stagger cascade. Aman tanpa-JS (visible default).
export function Reveal({ children, className = "", staggerChildren = false, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const targets = staggerChildren ? Array.from(el.children) : [el];
    targets.forEach((t) => {
      t.style.opacity = "0";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          animate(targets, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 600,
            ease: "out(3)",
            delay: delay + stagger(80),
          });
          io.disconnect();
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [staggerChildren, delay ]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
