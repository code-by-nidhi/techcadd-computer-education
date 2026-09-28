"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code2, ShieldCheck } from "lucide-react";
import { whyItMatters } from "@/lib/storyData";
import { EASE, Reveal, ScaleIn, Stagger, StaggerItem, TiltCard } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS = [Code2, Briefcase, ShieldCheck];

// "Why It Matters" — content unchanged from lib/storyData.ts's `whyItMatters` (all 3 real points),
// redesigned as a connected horizontal story flow instead of three equal cards: glass panels joined
// by an animated flow line with a travelling pulse, plus a floating "insight" side panel. Already
// dark, and stays dark — no alternation conflict (Skill-Building Ecosystem is light before it,
// Who We Teach is light after).
export default function WhyItMattersSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section theme-dark wim">
      <div className="wim-grid-bg" aria-hidden="true" />
      <span className="wim-glow wim-glow-1" aria-hidden="true" />
      <span className="wim-glow wim-glow-2" aria-hidden="true" />
      <span className="wim-particle" style={{ top: "16%", left: "8%" }} aria-hidden="true" />
      <span className="wim-particle" style={{ top: "70%", left: "12%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="wim-particle" style={{ top: "26%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="wim-spotlight" />

      <div className="container wim-container">
        <div className="wim-top">
          <div className="section-heading wim-heading-col">
            <ScaleIn className="eyebrow">Why it matters</ScaleIn>
            <Reveal blur delay={0.15}>
              <h2 className="wim-heading">Future-ready learning, not a one-time certificate</h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p>
                Technology changes constantly. Students need practical skills, real industry exposure and the
                ability to keep learning — not just a certificate that stops meaning anything a year later.
              </p>
            </Reveal>
          </div>

          <motion.div
            className="wim-insight"
            initial={{ opacity: 0, x: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <span className="wim-insight-pulse" aria-hidden="true">
              <span />
            </span>
            <p>&ldquo;Industry skills have a shorter shelf life than ever before.&rdquo;</p>
          </motion.div>
        </div>

        <Stagger className="wim-flow" stagger={0.18}>
          {whyItMatters.map((point, i) => {
            const Icon = ICONS[i] ?? Code2;
            return (
              <div key={point.title} className="wim-flow-item">
                <StaggerItem y={60} scale={0.92} className="wim-item">
                  <TiltCard max={5} className="wim-card">
                    <div
                      className="wim-card-inner"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                      }}
                    >
                      <span className="wim-card-spotlight" aria-hidden="true" />
                      <span className="wim-card-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`wim-icon-badge ${hovered === i ? "wim-icon-badge-active" : ""}`}>
                        <Icon className="wim-icon" strokeWidth={1.75} />
                      </span>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>

                {i < whyItMatters.length - 1 && (
                  <div className="wim-connector" aria-hidden="true">
                    <motion.span
                      className="wim-connector-line"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.18 }}
                    />
                    <span className="wim-connector-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
