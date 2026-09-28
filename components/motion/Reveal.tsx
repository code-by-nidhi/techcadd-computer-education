"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";

// Shared Framer Motion primitives for the About page family's premium redesign (see
// components/StoryPage.tsx, MissionVisionPage.tsx, AboutBlocks.tsx, TeamIntro.tsx). Kept in one
// place so every hero/section reuses the same easing, durations and "animate once" behaviour instead
// of each file reinventing slightly different numbers.
export const EASE = [0.22, 1, 0.36, 1] as const;

// Baseline section reveal: opacity 0 -> 1, y 50 -> 0, once, on scroll into view.
export function Reveal({
  children,
  delay = 0,
  y = 50,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// A card grid that reveals once, each child following 0.1s after the last — pair with StaggerItem.
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

// Badge/eyebrow pop-in: scale 0.8 -> 1.
export function ScaleIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

// Heading reveal, word by word (the practical stand-in for "each line reveals separately" when the
// text wraps differently at every breakpoint — animating true visual lines would mean measuring
// layout, which is fragile; a staggered word mask reads the same way and is what most premium sites
// actually do). Each word is clipped by its own overflow:hidden span so it slides up from underneath.
export function RevealHeading({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: delay + i * 0.05, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Wraps a button/link so it drifts toward the cursor within its own bounds ("magnetic" hover) and
// scales slightly — the wrapper is purely a positioning shell, the child keeps its own styling.
export function Magnetic({ children, className, strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

// 3D tilt on mouse move (hero art/media), springs back to flat on mouse leave.
export function TiltCard({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 16 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 16 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: springRX, rotateY: springRY, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * max);
        rotateX.set(-py * max);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// Counts a "25,000+" / "4.9★" / "10 Years" style string up from 0 once it scrolls into view, then
// re-attaches the original suffix. Decimal leads ("4.9") animate with one decimal place throughout,
// not just at the final frame, so a mid-count value never reads as a different, wrong number.
// Framer Motion's imperative `animate()` drives plain state rather than a DOM ref, since the number
// needs to re-render as text on every tick.
export function MotionCounter({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const match = value.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  const numeral = match ? match[1].replace(/,/g, "") : "";
  const target = numeral ? parseFloat(numeral) : 0;
  const decimals = numeral.includes(".") ? numeral.split(".")[1].length : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(target ? "0" : value);

  useEffect(() => {
    if (!inView || !target) return;
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()),
    });
    return () => controls.stop();
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
