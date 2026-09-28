"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Wraps a hero's decorative background layer (grid/glow/particles) and gives it a gentle parallax
// drift as the hero scrolls past — the one effect in this redesign that genuinely needs
// useScroll/useTransform rather than a simpler whileInView reveal. The parent section needs
// `position: relative` for this absolutely-positioned layer to anchor to it, not the page.
export default function HeroParallax({ children, range = 60 }: { children: ReactNode; range?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, range]);

  return (
    <motion.div ref={ref} style={{ y, position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
      {children}
    </motion.div>
  );
}
