"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content";
import { MotionCounter, TiltCard } from "./motion/Reveal";

// The /about hub hero's stat grid + a floating "750+ verified reviews" badge (a real fact distinct
// from the "4.9★ Google rating" stat already in the grid below, not a duplicate) — spring-based
// stagger entrance and per-card 3D tilt on hover. Split out from components/StoryPage.tsx (a Server
// Component) into its own "use client" file because it uses framer-motion's `motion.div` directly,
// not just the pre-built client primitives in components/motion/Reveal.tsx.
export default function HeroStats() {
  return (
    <div className="story-hero-stats-wrap">
      <motion.div
        className="story-hero-stats"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.85 },
              show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
            }}
          >
            <TiltCard max={6} className="story-stat-tilt">
              <div className="story-stat">
                <strong>
                  <MotionCounter value={s.value} />
                </strong>
                <span>{s.label}</span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="story-hero-badge"
        initial={{ opacity: 0, scale: 0.7, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.6 }}
      >
        <span aria-hidden="true">★</span> 750+ verified reviews
      </motion.div>
    </div>
  );
}
