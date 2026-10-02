"use client";

import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Cpu, FolderKanban, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { stats } from "@/lib/content";
import { EASE, MotionCounter, Reveal, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";

type Card = { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; text: string; className: string };

// Five real pillars of how techcadd's training actually works — same five already used elsewhere on
// this page (lib/storyData.ts's skillEcosystem), now as Bento cards instead of a hub-and-spoke
// diagram per the latest explicit "no circular/orbit/diagram" direction. Descriptions are generic,
// already-true positioning copy matching lib/content.ts's real whyUs/included claims (industry tools,
// hands-on training, real projects, placement assistance), not new facts needing verification.
const CARDS: Card[] = [
  { label: "Technology", icon: Cpu, text: "Learn industry-standard tools and software.", className: "eco-bento-tech" },
  { label: "Training", icon: GraduationCap, text: "Hands-on, practical learning experience.", className: "eco-bento-training" },
  { label: "Projects", icon: FolderKanban, text: "Real-world project execution and portfolios.", className: "eco-bento-projects" },
  { label: "Careers", icon: Rocket, text: "Placement assistance and interview preparation.", className: "eco-bento-careers" },
  { label: "Innovation", icon: Sparkles, text: "Future-ready skills and emerging technologies.", className: "eco-bento-innovation" },
];

function onCardSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

// "Our Ecosystem" — a premium Bento grid: a large stat-led hero card (real 25,000+/10+ Years/500+/
// 4.9★ figures — lib/content.ts's stats, already used sitewide; the "95% Placement Support" a
// reference spec asked for isn't a real figure recorded anywhere in this repo, same substitution
// disclosed and confirmed by the user two redesigns ago) beside 5 real pillar cards. Section stays
// theme-light to preserve the page's strict alternation; the grid itself carries the deep-navy
// premium treatment, same resolution used throughout this page's other sections.
//
// Motion is deliberately restrained per the explicit "calm, premium micro-interaction" direction:
// 80ms/20px stagger, a spring hover lift capped at 6px, a non-scaling 5s breathing glow on the hero
// card (not the shared story-hero-pulse keyframe, which scales — this section needed one that doesn't),
// particles drifting slowly at 10-20% opacity, and a <=10px mouse parallax on the hero card only.
export default function EcosystemDiagramSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--px", px.toFixed(3));
      hero.style.setProperty("--py", py.toFixed(3));
    };
    const onLeave = () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="section theme-light story-ecosystem eco">
      <span className="story-ecosystem-orb story-ecosystem-orb-blue" aria-hidden="true" />
      <span className="story-ecosystem-orb story-ecosystem-orb-yellow" aria-hidden="true" />

      <div className="container eco-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">Our Ecosystem</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2>Everything You Need To Build A Career</h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>Technology, training, projects, innovation and career support — all under one ecosystem.</p>
          </Reveal>
        </div>

        <div className="eco-bento">
          <motion.div
            ref={heroRef}
            className="eco-bento-hero"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="eco-bento-grid-bg" style={{ transform: "translate(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -8px))" }} aria-hidden="true" />
            <span className="eco-bento-glow" style={{ transform: "translate(calc(var(--px, 0) * 10px), calc(var(--py, 0) * 10px))" }} aria-hidden="true" />
            <span className="eco-bento-particle" style={{ top: "16%", left: "12%" }} aria-hidden="true" />
            <span className="eco-bento-particle" style={{ top: "76%", left: "20%", animationDelay: "3.5s" }} aria-hidden="true" />
            <span className="eco-bento-particle" style={{ top: "30%", left: "85%", animationDelay: "6.5s" }} aria-hidden="true" />
            <div className="eco-bento-hero-content">
              <strong>TECHCADD</strong>
              <span>Career Development Ecosystem</span>
              <Stagger className="eco-bento-stats" stagger={0.08}>
                {stats.map((s) => (
                  <StaggerItem key={s.label} className="eco-bento-stat" y={14}>
                    <strong>
                      <MotionCounter value={s.value} duration={1.5} />
                    </strong>
                    <span>{s.label}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </motion.div>

          <Stagger className="eco-bento-right" stagger={0.08}>
            {CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem key={c.label} className={`eco-bento-card ${c.className}`} y={20}>
                  <div className="eco-bento-card-inner" onMouseMove={onCardSpotlight}>
                    <span className="eco-bento-card-spotlight" aria-hidden="true" />
                    <span className="eco-bento-icon">
                      <Icon strokeWidth={1.75} />
                    </span>
                    <h3>{c.label}</h3>
                    <p>{c.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
