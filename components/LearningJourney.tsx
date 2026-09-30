"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Code2, GraduationCap, Layers, Rocket } from "lucide-react";
import { learningFlow } from "@/lib/storyData";
import { EASE, MotionCounter, Reveal, ScaleIn, Stagger, StaggerItem, TiltCard } from "./motion/Reveal";

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  learn: GraduationCap,
  practice: Code2,
  build: Layers,
  grow: Rocket,
};

// Same real, already-established figures as components/WhoWeTeach.tsx's bottom bar (see
// lib/teamIntroData.ts / lib/aboutData.ts) — this section sits directly above that one on /about, so
// the two bars now repeat the same four numbers back to back. Kept in because it was asked for here
// too; worth removing one of the two if that reads as redundant once it's live.
const bottomStats = [
  { value: "25,000+", label: "Students Trained" },
  { value: "500+", label: "Hiring Partners" },
  { value: "7", label: "Branches" },
  { value: "10+", label: "Years Experience" },
];

// "Learn → Practice → Build → Grow" — content unchanged from lib/storyData.ts's `learningFlow`,
// redesigned as a connected roadmap: a scroll-drawn line with travelling particles runs behind four
// glassmorphism step cards, each with a giant ghost number, a per-card cursor spotlight and 3D tilt.
export default function LearningJourney() {
  const [hovered, setHovered] = useState<number | null>(null);
  const words = ["Learn", "Practice", "Build", "Grow"];

  return (
    <section className="section theme-dark lj">
      <div className="lj-grid-bg" aria-hidden="true" />
      <span className="lj-glow lj-glow-1" aria-hidden="true" />
      <span className="lj-glow lj-glow-2" aria-hidden="true" />
      <span className="lj-particle" style={{ top: "18%", left: "8%" }} aria-hidden="true" />
      <span className="lj-particle" style={{ top: "72%", left: "12%", animationDelay: "1.6s" }} aria-hidden="true" />
      <span className="lj-particle" style={{ top: "26%", left: "90%", animationDelay: "3s" }} aria-hidden="true" />
      <span className="lj-particle" style={{ top: "78%", left: "86%", animationDelay: "0.8s" }} aria-hidden="true" />

      <div className="container">
        <div className="section-heading lj-heading">
          <ScaleIn className="eyebrow lj-eyebrow">{learningFlow.eyebrow}</ScaleIn>
          <h2 className="lj-title">
            {words.map((w, i) => (
              <span key={w} className="lj-title-word-mask">
                <motion.span
                  className="lj-title-word"
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
                >
                  {w}
                </motion.span>
                {i < words.length - 1 && (
                  <motion.span
                    className="lj-title-arrow"
                    aria-hidden="true"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: EASE }}
                  >
                    →
                  </motion.span>
                )}
              </span>
            ))}
          </h2>
        </div>

        <div className="lj-roadmap">
          <div className="lj-track" aria-hidden="true">
            <motion.div
              className="lj-track-line"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            />
            <span className="lj-track-particle" style={{ animationDelay: "0s" }} />
            <span className="lj-track-particle" style={{ animationDelay: "1.4s" }} />
            <span className="lj-track-particle" style={{ animationDelay: "2.8s" }} />
            <div className="lj-track-dots">
              {learningFlow.steps.map((s) => (
                <span key={s.num} className="lj-track-dot" />
              ))}
            </div>
          </div>

          <Stagger className="lj-grid" stagger={0.15}>
            {learningFlow.steps.map((s, i) => {
              const Icon = ICONS[s.icon] ?? GraduationCap;
              return (
                <StaggerItem key={s.num} y={80} scale={0.9} className="lj-item">
                  <TiltCard max={5} className="lj-card">
                    <div
                      className="lj-card-inner"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                      }}
                    >
                      <span className="lj-card-spotlight" aria-hidden="true" />
                      <span className="lj-card-num" aria-hidden="true">
                        {s.num}
                      </span>
                      <span className={`lj-icon-badge ${hovered === i ? "lj-icon-badge-active" : ""}`}>
                        <Icon className="lj-icon" strokeWidth={1.75} />
                      </span>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="story-flow2-panel">
          <span className="story-flow2-badge">{learningFlow.badge}</span>
          <p>{learningFlow.text}</p>
        </Reveal>

        <Stagger className="lj-stats">
          {bottomStats.map((s) => (
            <StaggerItem key={s.label} className="lj-stat">
              <strong>
                <MotionCounter value={s.value} />
              </strong>
              <span>{s.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
