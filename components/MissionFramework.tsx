"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { Hammer, Network, TrendingUp, Unlock, Users } from "lucide-react";
import { missionPillars, missionPillarsHeader } from "@/lib/missionVisionData";
import { Reveal, ScaleIn, Stagger, StaggerItem, TiltCard } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  access: Unlock,
  practical: Hammer,
  talent: Users,
  upskill: TrendingUp,
  ecosystem: Network,
};

// "Our Mission" — content unchanged from lib/missionVisionData.ts's `missionPillarsHeader` and
// `missionPillars` (all 5 real pillars, verbatim text). Replaces the old 5-equal-card grid with a
// "Mission Framework": a large statement panel on the left (real language — "bridge the gap between
// education and industry through practical...training" is this repo's own founding-vision phrase,
// used elsewhere for the 2016 milestone, just tensed as a present mission line) and 5 staggered,
// unevenly-arranged pillar cards on the right instead of a uniform grid.
export default function MissionFramework() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section theme-dark mvf">
      <div className="mvf-grid-bg" aria-hidden="true" />
      <span className="mvf-glow mvf-glow-1" aria-hidden="true" />
      <span className="mvf-glow mvf-glow-2" aria-hidden="true" />
      <span className="mvf-particle" style={{ top: "16%", left: "8%" }} aria-hidden="true" />
      <span className="mvf-particle" style={{ top: "70%", left: "12%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="mvf-particle" style={{ top: "26%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="mvf-spotlight" />

      <div className="container mvf-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow mvf-badge">{missionPillarsHeader.badge}</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2 className="mvf-heading">
              Bridging <span className="mvf-heading-highlight">Education</span> with Industry
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>{missionPillarsHeader.text}</p>
          </Reveal>
        </div>

        <div className="mvf-layout">
          <Reveal y={40} className="mvf-statement">
            <TiltCard max={4} className="mvf-statement-tilt">
              <div className="mvf-statement-card">
                {/* The gradient "border" is this outer element's own animated background, showing
                    only as a thin ring around .mvf-statement-inner's solid fill — the standard
                    two-layer trick for an animated gradient border with rounded corners. */}
                <div className="mvf-statement-inner">
                  <span className="mvf-statement-orb" aria-hidden="true" />
                  <span className="mvf-statement-label">Mission</span>
                  <p>
                    Bridge the gap between education and industry through practical learning, modern
                    technologies and career-focused training.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Stagger className="mvf-pillars" stagger={0.1}>
            {missionPillars.map((p, i) => {
              const Icon = ICONS[p.icon] ?? Unlock;
              return (
                <StaggerItem key={p.title} y={80} className={`mvf-pillar-item mvf-pillar-item-${i}`}>
                  <TiltCard max={5} className="mvf-pillar-tilt">
                    <div
                      className="mvf-pillar-card"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                      }}
                    >
                      <span className="mvf-pillar-spotlight" aria-hidden="true" />
                      <span className="mvf-pillar-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`mvf-icon-badge ${hovered === i ? "mvf-icon-badge-active" : ""}`}>
                        <Icon className="mvf-icon" strokeWidth={1.75} />
                      </span>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
