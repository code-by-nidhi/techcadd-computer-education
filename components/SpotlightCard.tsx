"use client";

import { ComponentPropsWithoutRef, MouseEvent, useRef } from "react";

// Wraps a card with a subtle cursor-follow glow (CSS reads the --mx/--my vars this sets — see the
// ::before rule shared by .about-feature-card, .cert-card and .trust-card in globals.css).
export default function SpotlightCard({ children, ...rest }: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} {...rest} onMouseMove={onMouseMove}>
      {children}
    </div>
  );
}
