"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Blurs, dims and slightly shrinks its content as the cards (`cardsSelector`, looked up inside the
// closest `sectionSelector`) scroll up over it: 0 while the cards are below the screen, full effect
// once the first card has travelled `distance` of the screen height.
export default function ScrollBlur({
  children,
  className,
  sectionSelector,
  cardsSelector,
  distance = 0.6,
  maxBlur = 10,
}: {
  children: ReactNode;
  className?: string;
  sectionSelector: string;
  cardsSelector: string;
  distance?: number;
  maxBlur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const cards = el?.closest(sectionSelector)?.querySelector<HTMLElement>(cardsSelector);
    if (!el || !cards || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - cards.getBoundingClientRect().top) / (vh * distance), 0), 1);
      el.style.filter = p ? `blur(${(p * maxBlur).toFixed(2)}px)` : "";
      el.style.opacity = String(1 - p * 0.45);
      el.style.transform = p ? `scale(${(1 - p * 0.06).toFixed(4)})` : "";
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionSelector, cardsSelector, distance, maxBlur]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
