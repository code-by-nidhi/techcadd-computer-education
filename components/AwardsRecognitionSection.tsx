"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Network, ShieldCheck, Sparkles } from "lucide-react";
import { awardsRecognition } from "@/lib/storyData";
import { EASE, Reveal, ScaleIn } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS: ComponentType<{ className?: string; strokeWidth?: number }>[] = [ShieldCheck, Network, GraduationCap, Sparkles];

// Short, real metric labels grounded in each card's actual text below (not invented figures) — "Since
// 2022" from the ISO card's own text, the IKGPTU joint placement drive for Industry-Academia, and the
// AI-robotics events (Chi-Chi) for Innovation.
const METRICS = ["Certified since 2022", "Campus placement drives", "Institution partnerships", "AI & robotics events"];

// Orb ring labels — same 4 real achievements, shortened for the trust-hub badge list.
const HUB_LABELS = ["ISO Certified", "Campus Engagement", "Academic Network", "Innovation Events"];

// "Awards, Recognition & Accreditation" — content unchanged from lib/storyData.ts's
// `awardsRecognition` (all 4 real achievements, the sourcing footnote, and the link through to the
// full accreditations page), redesigned as a hub-and-spoke trust ecosystem: a central "techcadd"
// glass orb connected by scroll-drawn SVG spokes to four non-rectangular achievement nodes. Kept on
// the light theme, same reasoning as components/OurApproachSection.tsx — this section sits between
// two sections that are already dark, so a dark background here would break the page's strict
// light/dark alternation; the requested #00D4FF / #3B82F6 / #FFD84D accents are used throughout.
export default function AwardsRecognitionSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [orbHover, setOrbHover] = useState(false);

  return (
    <section className="section theme-light awd">
      <div className="awd-grid-bg" aria-hidden="true" />
      <span className="awd-glow awd-glow-1" aria-hidden="true" />
      <span className="awd-glow awd-glow-2" aria-hidden="true" />
      <span className="awd-particle" style={{ top: "16%", left: "8%" }} aria-hidden="true" />
      <span className="awd-particle" style={{ top: "70%", left: "10%", animationDelay: "1.6s" }} aria-hidden="true" />
      <span className="awd-particle" style={{ top: "24%", left: "92%", animationDelay: "3s" }} aria-hidden="true" />
      <MouseSpotlight className="awd-spotlight" />

      <div className="container awd-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">{awardsRecognition.eyebrow}</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2 className="awd-heading">{awardsRecognition.heading}</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>{awardsRecognition.text}</p>
          </Reveal>
        </div>

        <div className="awd-hub-wrap">
          <motion.div
            className="awd-hub"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            onMouseEnter={() => setOrbHover(true)}
            onMouseLeave={() => setOrbHover(false)}
          >
            <span className={`awd-hub-ring awd-hub-ring-1 ${orbHover ? "awd-hub-fast" : ""}`} aria-hidden="true" />
            <span className={`awd-hub-ring awd-hub-ring-2 ${orbHover ? "awd-hub-fast" : ""}`} aria-hidden="true" />
            <span className="awd-hub-glow" aria-hidden="true" />
            <div className="awd-hub-core">
              <strong>techcadd</strong>
              <span>Trust Hub</span>
            </div>
            <ul className="awd-hub-labels" aria-hidden="true">
              {HUB_LABELS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </motion.div>

          <div className="awd-spokes" aria-hidden="true">
            <svg viewBox="0 0 1000 220" preserveAspectRatio="none" className="awd-spokes-svg">
              <defs>
                <linearGradient id="awd-spoke-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="awd-particle-glow" x="-200%" y="-200%" width="500%" height="500%">
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
                  id={`awd-spoke-${i}`}
                  d={`M500,0 C500,90 ${x},60 ${x},220`}
                  fill="none"
                  stroke="url(#awd-spoke-gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="awd-spoke-line"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.1 }}
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <circle key={i} r="5" fill="#00d4ff" filter="url(#awd-particle-glow)">
                  <animateMotion dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite">
                    <mpath href={`#awd-spoke-${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </svg>
          </div>

          <div className="awd-nodes">
            {awardsRecognition.cards.map((c, i) => {
              const Icon = ICONS[i] ?? ShieldCheck;
              return (
                <motion.div
                  key={c.title}
                  className="awd-node-wrap"
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: i * 0.15, ease: EASE }}
                >
                  <div
                    className="awd-node"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                    }}
                  >
                    <span className="awd-node-spotlight" aria-hidden="true" />
                    <span className={`awd-node-num ${hovered === i ? "awd-node-num-active" : ""}`} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`awd-icon-badge ${hovered === i ? "awd-icon-badge-active" : ""}`}>
                      <Icon className="awd-icon" strokeWidth={1.75} />
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    <span className="awd-metric">{METRICS[i]}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.2} className="awd-footnote">
          <p>
            {awardsRecognition.footnote}
            <br />
            <Link href="/about/accreditations-awards" className="link-arrow">
              See all accreditations &amp; awards →
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
