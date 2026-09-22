"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Sets `--progress` (0 → 1) on its div as the page scrolls through it: 0 when its top reaches the top
// of the screen, 1 when its bottom reaches the bottom. CSS inside uses it to drive scroll animations.
export default function ScrollProgress({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      el.style.setProperty("--progress", p.toFixed(4));
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
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
