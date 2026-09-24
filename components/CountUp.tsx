"use client";

import { useEffect, useRef, useState } from "react";

// Animates the leading number in a stat string ("25,000+", "10 Years") from 0 once it scrolls into
// view, then re-attaches the original suffix untouched — see components/StoryPage.tsx OurJourney.
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : "";
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1200;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {target ? count.toLocaleString() : value}
      {suffix}
    </span>
  );
}
