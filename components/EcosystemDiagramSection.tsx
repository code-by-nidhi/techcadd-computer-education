"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Building2, Cpu, FolderKanban, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { skillEcosystem } from "@/lib/storyData";
import { EASE, Reveal, ScaleIn } from "./motion/Reveal";

type Node = { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; x: number; y: number };

// The six real pillars of how techcadd's training actually works (assignments/projects/industrial
// training/internships across Tally-GST, CAD/CAM, design and marketing tracks — see
// lib/storyData.ts's skillEcosystem.paragraphs[1]), framed as an ecosystem map rather than spelled
// out as a card grid. Positions are orbital coordinates in a 0-100 viewBox, hub at (50, 50).
const NODES: Node[] = [
  { label: "Technology", icon: Cpu, x: 50, y: 8 },
  { label: "Training", icon: GraduationCap, x: 89, y: 28 },
  { label: "Projects", icon: FolderKanban, x: 89, y: 72 },
  { label: "Industry", icon: Building2, x: 50, y: 92 },
  { label: "Careers", icon: Rocket, x: 11, y: 72 },
  { label: "Innovation", icon: Sparkles, x: 11, y: 28 },
];

// A handful of node-to-node links on top of the hub spokes, so the map reads as a network rather
// than a plain wheel — Technology feeds Projects, Projects feeds real Industry placements, Industry
// leads to Careers, and Innovation loops back into Technology.
const LINKS: [number, number][] = [
  [0, 2],
  [2, 3],
  [3, 4],
  [5, 0],
];

const METRICS = [
  { value: "25,000+", label: "Students" },
  { value: "10+", label: "Years" },
  { value: "500+", label: "Hiring Partners" },
  { value: "4.9★", label: "Google Rating" },
];

function curve(a: Node, b: Node) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Bow the midpoint away from the hub so node-to-node links read as distinct arcs, not straight
  // chords crossing through the center.
  const dx = mx - 50;
  const dy = my - 50;
  const cx = mx + dx * 0.35;
  const cy = my + dy * 0.35;
  return `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`;
}

// "A skill-building ecosystem" — redesigned as a premium hub-and-network visualization in place of
// the old three-photo collage (public/about-menu doesn't exist anywhere in this repo, the same
// broken-asset pattern found across every About section this session). A reference spec asked for a
// deep-navy (#050B1D) page background for this whole section, but flipping the section itself to dark
// would put three dark sections in a row (WhoWeAreSection → this → WhyItMattersSection) and break the
// page's strict light/dark alternation — resolved the same way as components/OurApproachSection.tsx:
// keep the section theme-light, and give the diagram's own panel the deep-navy glass treatment
// instead, like a dark canvas embedded in a light page.
export default function EcosystemDiagramSection() {
  const [before, after] = skillEcosystem.paragraphs[0].split(skillEcosystem.highlight);
  const [hovered, setHovered] = useState<number | null>(null);
  const [hubHover, setHubHover] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const onMove = (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      panel.style.setProperty("--px", px.toFixed(3));
      panel.style.setProperty("--py", py.toFixed(3));
    };
    const onLeave = () => {
      panel.style.setProperty("--px", "0");
      panel.style.setProperty("--py", "0");
    };
    panel.addEventListener("mousemove", onMove);
    panel.addEventListener("mouseleave", onLeave);
    return () => {
      panel.removeEventListener("mousemove", onMove);
      panel.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const isLinkActive = (a: number, b: number) => hovered === a || hovered === b || hubHover;

  return (
    <section className="section theme-light story-ecosystem eco">
      <span className="story-ecosystem-orb story-ecosystem-orb-blue" aria-hidden="true" />
      <span className="story-ecosystem-orb story-ecosystem-orb-yellow" aria-hidden="true" />

      <div className="container eco-container">
        <div className="section-heading eco-heading">
          <ScaleIn className="eyebrow">{skillEcosystem.eyebrow}</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2>{skillEcosystem.heading}</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              {before}
              <strong>{skillEcosystem.highlight}</strong>
              {after}
            </p>
            <p>{skillEcosystem.paragraphs[1]}</p>
          </Reveal>
        </div>

        <motion.div
          ref={panelRef}
          className="eco-panel"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="eco-grid-bg" style={{ transform: "translate(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -8px))" }} aria-hidden="true" />
          <span className="eco-glow eco-glow-1" style={{ transform: "translate(calc(var(--px, 0) * -18px), calc(var(--py, 0) * -18px))" }} aria-hidden="true" />
          <span className="eco-glow eco-glow-2" style={{ transform: "translate(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 14px))" }} aria-hidden="true" />
          <div className="eco-spotlight" aria-hidden="true" onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
          }} />
          {[
            { top: "14%", left: "10%" },
            { top: "76%", left: "14%", delay: "1.6s" },
            { top: "22%", left: "88%", delay: "3s" },
            { top: "82%", left: "84%", delay: "2.2s" },
          ].map((p, i) => (
            <span
              key={i}
              className="eco-particle"
              style={{ top: p.top, left: p.left, animationDelay: p.delay, transform: "translate(calc(var(--px, 0) * -24px), calc(var(--py, 0) * -24px))" }}
              aria-hidden="true"
            />
          ))}

          <div className="eco-diagram" style={{ transform: "translate(calc(var(--px, 0) * -4px), calc(var(--py, 0) * -4px))" }}>
            <svg className="eco-links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="eco-line-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="100%" stopColor="#ffd200" />
                </linearGradient>
                <filter id="eco-particle-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="1.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {NODES.map((n, i) => (
                <motion.path
                  key={`spoke-${n.label}`}
                  id={`eco-spoke-${i}`}
                  d={curve({ label: "hub", icon: Cpu, x: 50, y: 50 }, n)}
                  fill="none"
                  stroke="url(#eco-line-gradient)"
                  strokeWidth={hovered === i || hubHover ? 0.9 : 0.5}
                  strokeLinecap="round"
                  className="eco-spoke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: hovered === i || hubHover ? 1 : 0.55 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.12 }}
                />
              ))}
              {LINKS.map(([a, b], i) => (
                <motion.path
                  key={`link-${a}-${b}`}
                  id={`eco-link-${i}`}
                  d={curve(NODES[a], NODES[b])}
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth={isLinkActive(a, b) ? 0.7 : 0.35}
                  strokeLinecap="round"
                  strokeDasharray="2.4 2.2"
                  className="eco-link"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: isLinkActive(a, b) ? 0.9 : 0.35 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: EASE, delay: 1 + i * 0.15 }}
                />
              ))}
              {NODES.map((_, i) => (
                <circle key={`particle-${i}`} r="0.9" fill="#ffd200" filter="url(#eco-particle-glow)">
                  <animateMotion dur="3.4s" begin={`${i * 0.45}s`} repeatCount="indefinite">
                    <mpath href={`#eco-spoke-${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </svg>

            <motion.div
              className="eco-hub"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASE }}
              onMouseEnter={() => setHubHover(true)}
              onMouseLeave={() => setHubHover(false)}
            >
              <span className={`eco-hub-ring eco-hub-ring-1 ${hubHover ? "eco-hub-fast" : ""}`} aria-hidden="true" />
              <span className={`eco-hub-ring eco-hub-ring-2 ${hubHover ? "eco-hub-fast" : ""}`} aria-hidden="true" />
              <span className="eco-hub-glow" aria-hidden="true" />
              <div className="eco-hub-core">
                <strong>TECHCADD</strong>
                <span>Career Development Ecosystem</span>
              </div>
            </motion.div>

            {NODES.map((n, i) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.label}
                  className={`eco-node ${hovered === i ? "eco-node-active" : ""}`}
                  style={{ top: `${n.y}%`, left: `${n.x}%` }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.12 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Icon className="eco-node-icon" strokeWidth={1.75} />
                  <span>{n.label}</span>
                </motion.div>
              );
            })}
          </div>

          {[
            { pos: "eco-metric-0" },
            { pos: "eco-metric-1" },
            { pos: "eco-metric-2" },
            { pos: "eco-metric-3" },
          ].map((m, i) => (
            <motion.div
              key={METRICS[i].label}
              className={`eco-metric ${m.pos}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 1.3 + i * 0.1 }}
            >
              <strong>{METRICS[i].value}</strong>
              <span>{METRICS[i].label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
