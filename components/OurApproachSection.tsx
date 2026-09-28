"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Rocket, Target } from "lucide-react";
import { ourApproach } from "@/lib/storyData";
import { EASE, Reveal, ScaleIn } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS = [Target, Layers, Rocket];

// "Our Approach" — content unchanged from lib/storyData.ts's `ourApproach` (Relevance/Application/
// Growth), redesigned as a zig-zag connected timeline: card 01 sits high, card 02 drops low, card 03
// rises back up, joined by one scroll-drawn SVG path with a glowing particle travelling along it.
// Kept on the light theme rather than the requested dark background — this section sits between two
// sections that are already dark (Tech Domains before, Industry Engagement after), so a dark
// background here would put three dark sections in a row and break the page's strict light/dark
// alternation. The requested accent colors (#00D4FF / #3B82F6) are used throughout instead.
export default function OurApproachSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [before, after] = ourApproach.heading.split(ourApproach.highlight);

  return (
    <section className="section theme-light oa">
      <div className="oa-grid-bg" aria-hidden="true" />
      <span className="oa-glow oa-glow-1" aria-hidden="true" />
      <span className="oa-glow oa-glow-2" aria-hidden="true" />
      <MouseSpotlight className="oa-spotlight" />

      <div className="container oa-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">{ourApproach.eyebrow}</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2 className="oa-heading">
              {before}
              <span className="oa-highlight">{ourApproach.highlight}</span>
              {after}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>{ourApproach.text}</p>
          </Reveal>
        </div>

        <div className="oa-timeline">
          <div className="oa-path" aria-hidden="true">
            <svg viewBox="0 0 1000 260" preserveAspectRatio="none" className="oa-path-svg">
              <defs>
                <linearGradient id="oa-path-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <filter id="oa-particle-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                id="oa-path"
                d="M60,70 C260,70 300,210 500,210 C700,210 740,70 940,70"
                fill="none"
                stroke="url(#oa-path-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="oa-path-line"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              />
              <circle r="6" fill="#00d4ff" filter="url(#oa-particle-glow)">
                <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#oa-path" />
                </animateMotion>
              </circle>
            </svg>
          </div>

          <div className="oa-grid">
            {ourApproach.pillars.map((p, i) => {
              const Icon = ICONS[i] ?? Target;
              return (
                <motion.div
                  key={p.title}
                  className={`oa-item oa-item-${i}`}
                  initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.2, ease: EASE }}
                >
                  <div
                    className="oa-card"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                    }}
                  >
                    <span className="oa-card-spotlight" aria-hidden="true" />
                    <span className="oa-card-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`oa-icon-badge ${hovered === i ? "oa-icon-badge-active" : ""}`}>
                      <Icon className="oa-icon" strokeWidth={1.75} />
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
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
