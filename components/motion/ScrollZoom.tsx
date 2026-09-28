"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// Scroll-scrubbed zoom (1 -> 1.12) as the element passes through the viewport — used for the
// founder's photo ("slow zoom on scroll"). This is the one deliberately-scoped use of GSAP
// ScrollTrigger in this redesign; every other scroll-linked effect uses Framer Motion's
// useScroll/useTransform instead (see components/motion/HeroParallax.tsx), so this stays the
// exception rather than a second general-purpose animation system.
export default function ScrollZoom({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
