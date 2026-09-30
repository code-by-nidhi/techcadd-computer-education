"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { Award, Briefcase, GraduationCap, RefreshCw, Rocket } from "lucide-react";
import { audiences } from "@/lib/storyData";
import { MotionCounter, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem, TiltCard } from "./motion/Reveal";

// Lucide has no literal "Certificate" icon — Award is the closest real match for that role, used the
// same way lots of product sites use it for a completed-qualification badge.
const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Students: GraduationCap,
  Graduates: Award,
  "Working Professionals": Briefcase,
  "Career Switchers": RefreshCw,
  Entrepreneurs: Rocket,
};

// Real, already-established figures (see lib/teamIntroData.ts / lib/aboutData.ts) — this bottom bar
// just restates them for this section, not a new source of truth.
const bottomStats = [
  { value: "25,000+", label: "Students Trained" },
  { value: "500+", label: "Hiring Partners" },
  { value: "7", label: "Branches" },
  { value: "10+", label: "Years Experience" },
];

// "Who We Teach" — the five audience segments (content unchanged from lib/storyData.ts's
// `audiences`), redesigned as a premium interactive card row: glassmorphism, per-card cursor glow +
// 3D tilt, an "active card" hover state that dims its siblings, and a real stats bar underneath.
export default function WhoWeTeach() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section theme-light wwt">
      <div className="wwt-grid-bg" aria-hidden="true" />
      <span className="wwt-glow wwt-glow-1" aria-hidden="true" />
      <span className="wwt-glow wwt-glow-2" aria-hidden="true" />
      <div className="container wwt-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">Who we teach</ScaleIn>
          <h2>
            <RevealHeading text="Built for wherever you're starting from" delay={0.1} />
          </h2>
          <Reveal delay={0.3}>
            <p>Five starting points, one flexible path — a batch and a pace that fits wherever you are today.</p>
          </Reveal>
        </div>

        <Stagger className="wwt-grid" stagger={0.12}>
          {audiences.map((a, i) => {
            const Icon = ICONS[a.title] ?? GraduationCap;
            const dim = hovered !== null && hovered !== i;
            const active = hovered === i;
            return (
              <StaggerItem key={a.title} y={60} blur className="wwt-item">
                <TiltCard max={4} className={`wwt-card ${dim ? "wwt-card-dim" : ""} ${active ? "wwt-card-active" : ""}`}>
                  <div
                    className="wwt-card-inner"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                    }}
                  >
                    <span className="wwt-card-glow" aria-hidden="true" />
                    <span className="wwt-icon-badge">
                      <Icon className="wwt-icon" strokeWidth={1.75} />
                    </span>
                    <strong>{a.title}</strong>
                    <p>{a.text}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Stagger className="wwt-stats">
          {bottomStats.map((s) => (
            <StaggerItem key={s.label} className="wwt-stat">
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
