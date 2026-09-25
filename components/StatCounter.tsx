"use client";

import { useEffect, useRef, useState } from "react";

// Counts up to `to` once the number scrolls into view. Plain IntersectionObserver + rAF — this
// project has no animation library (no Framer Motion, no GSAP), so this is the lightweight
// hand-rolled equivalent rather than a dependency.
export default function StatCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (done || !entries[0].isIntersecting) return;
        done = true;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(to * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
