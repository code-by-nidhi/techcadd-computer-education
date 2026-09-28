"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Globe, Landmark, ShieldCheck } from "lucide-react";
import { accreditationWhyMatters } from "@/lib/aboutData";
import { EASE, Reveal, ScaleIn } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  shield: ShieldCheck,
  landmark: Landmark,
  award: Award,
  globe: Globe,
};

const HUB_CHECKS = ["Accredited Institution", "Verified Curriculum", "Industry Standards", "Career Credibility"];

// "Why accreditation matters for your career" — components/AboutBlocks.tsx' generic feature-card
// grid used to render this (see lib/aboutData.ts's `accreditationWhyMatters`, pulled out of that
// page's plain `sections` array specifically for this bespoke treatment). Same hub-and-spoke
// technique as components/AwardsRecognitionSection.tsx on the /about hub — a central glowing
// "accreditation hub" connected by scroll-drawn SVG spokes with travelling particles to four
// non-rectangular benefit nodes — reused here with fresh content/icons and its own dark palette
// scoped under .ach-, since this page (/about/accreditations-awards) alternates independently.
export default function AccreditationHub() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hubHover, setHubHover] = useState(false);

  return (
    <section id="why-accreditation" className="section theme-dark ach anchor">
      <div className="ach-grid-bg" aria-hidden="true" />
      <span className="ach-glow ach-glow-1" aria-hidden="true" />
      <span className="ach-glow ach-glow-2" aria-hidden="true" />
      <span className="ach-particle" style={{ top: "16%", left: "8%" }} aria-hidden="true" />
      <span className="ach-particle" style={{ top: "70%", left: "10%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="ach-particle" style={{ top: "24%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="ach-spotlight" />

      <div className="container ach-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">{accreditationWhyMatters.eyebrow}</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2 className="ach-heading">{accreditationWhyMatters.heading}</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>{accreditationWhyMatters.text}</p>
          </Reveal>
        </div>

        <div className="ach-hub-wrap">
          <motion.div
            className="ach-hub"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            onMouseEnter={() => setHubHover(true)}
            onMouseLeave={() => setHubHover(false)}
          >
            <span className={`ach-hub-ring ach-hub-ring-1 ${hubHover ? "ach-hub-fast" : ""}`} aria-hidden="true" />
            <span className={`ach-hub-ring ach-hub-ring-2 ${hubHover ? "ach-hub-fast" : ""}`} aria-hidden="true" />
            <span className="ach-hub-glow" aria-hidden="true" />
            <div className="ach-hub-core">
              <strong>Accredited &amp; Industry Recognized</strong>
              <span>Building Trust Through Standards</span>
              <ul className="ach-hub-checks">
                {HUB_CHECKS.map((c) => (
                  <li key={c}>
                    <CheckCircle2 className="ach-hub-check-icon" strokeWidth={2} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="ach-spokes" aria-hidden="true">
            <svg viewBox="0 0 1000 220" preserveAspectRatio="none" className="ach-spokes-svg">
              <defs>
                <linearGradient id="ach-spoke-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <filter id="ach-particle-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {[125, 375, 625, 875].map((x, i) => (
                <motion.path
                  key={x}
                  id={`ach-spoke-${i}`}
                  d={`M500,0 C500,90 ${x},60 ${x},220`}
                  fill="none"
                  stroke="url(#ach-spoke-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ach-spoke-line"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.1 }}
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <circle key={i} r="5" fill="#00d4ff" filter="url(#ach-particle-glow)">
                  <animateMotion dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite">
                    <mpath href={`#ach-spoke-${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </svg>
          </div>

          <div className="ach-nodes">
            {accreditationWhyMatters.cards.map((c, i) => {
              const Icon = ICONS[c.icon] ?? ShieldCheck;
              return (
                <motion.div
                  key={c.title}
                  className="ach-node-wrap"
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: i * 0.15, ease: EASE }}
                >
                  <div
                    className="ach-node"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                    }}
                  >
                    <span className="ach-node-spotlight" aria-hidden="true" />
                    <span className={`ach-icon-badge ${hovered === i ? "ach-icon-badge-active" : ""}`}>
                      <Icon className="ach-icon" strokeWidth={1.75} />
                    </span>
                    <span className="ach-node-metric">{c.metric}</span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
