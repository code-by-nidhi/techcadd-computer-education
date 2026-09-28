"use client";

import { useEffect, useRef } from "react";

// A soft radial light that follows the cursor within its parent section. Cheap by design: one
// mousemove listener writing two CSS custom properties on the parent (no React state, no re-render
// per pixel) — the actual glow is a plain CSS radial-gradient reading --mx/--my (see
// .about-hero-spotlight / .story-hero-spotlight in globals.css). The listener is attached to the
// parent element directly (not via a React onMouseMove prop on this div), because this div itself is
// pointer-events: none so it never blocks clicks on real content underneath — and an element with
// pointer-events: none never receives its own mouse events.
export default function MouseSpotlight({ className }: { className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      parent.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      parent.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
