"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { Briefcase, GraduationCap, Landmark, Network, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumbs } from "./AboutBlocks";
import { Magnetic, MotionCounter, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";
import HeroParallax from "./motion/HeroParallax";
import MouseSpotlight from "./motion/MouseSpotlight";

// Real, already-established figures (see lib/teamIntroData.ts / lib/aboutData.ts).
const TRUST_METRICS = [
  { value: "25,000+", label: "Students Trained" },
  { value: "10", label: "Years of Excellence" },
  { value: "500+", label: "Hiring Partners" },
  { value: "4.9★", label: "Google Rating" },
];

// Same 6 real credentials the rest of this page covers (ISO/MSME/Startup India certifications, the
// placement cell, and the industry/academic engagement described further down) — teased here as a
// compact network instead of spelled out, since the full detail already lives in the sections below.
const SHOWCASE_NODES: { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; pos: string }[] = [
  { label: "ISO Certification", icon: ShieldCheck, pos: "ah-node-0" },
  { label: "Industry Recognition", icon: Briefcase, pos: "ah-node-1" },
  { label: "Academic Collaboration", icon: GraduationCap, pos: "ah-node-2" },
  { label: "Government Recognition", icon: Landmark, pos: "ah-node-3" },
  { label: "Placement Ecosystem", icon: Network, pos: "ah-node-4" },
  { label: "Technology Innovation", icon: Sparkles, pos: "ah-node-5" },
];

// Bespoke hero for /about/accreditations-awards only (app/about/[slug]/page.tsx renders this instead
// of the generic AboutHero for this one slug) — the generic hero's right-side image never had a real
// asset behind it (public/about-menu doesn't exist anywhere in this repo, confirmed earlier this
// session), so it always rendered as the empty container this redesign was asked to fix. Replaced
// with a real interactive "accreditation network" instead of another placeholder image.
export default function AccreditationHero({ crumbs }: { crumbs: { label: string; href?: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="page-hero about-hero ah">
      <HeroParallax>
        <div className="about-hero-grid-bg" />
        <span className="about-hero-glow about-hero-glow-1" />
        <span className="about-hero-glow about-hero-glow-2" />
        <span className="about-hero-particle" style={{ top: "18%", left: "6%" }} />
        <span className="about-hero-particle" style={{ top: "70%", left: "12%", animationDelay: "1.8s" }} />
        <span className="about-hero-particle" style={{ top: "26%", left: "90%", animationDelay: "3.2s" }} />
      </HeroParallax>
      <MouseSpotlight className="about-hero-spotlight" />

      <div className="container ah-inner">
        <div className="ah-content">
          <Reveal>
            <Breadcrumbs items={crumbs} />
          </Reveal>
          <ScaleIn className="eyebrow eyebrow-light" delay={0.1}>
            Trust &amp; Recognition
          </ScaleIn>
          <h1 className="ah-heading">
            <RevealHeading text="Recognised for the training," delay={0.2} />
            <br />
            <RevealHeading text="not just for saying so." delay={0.35} />
          </h1>
          <Reveal delay={0.5}>
            <p>
              techcadd&apos;s credentials are verifiable, not just claimed — ISO-certified quality management,
              MSME registration and Startup India recognition back every course we run.
            </p>
          </Reveal>

          <Stagger className="ah-metrics" stagger={0.1}>
            {TRUST_METRICS.map((m) => (
              <StaggerItem key={m.label} className="ah-metric">
                <strong>
                  <MotionCounter value={m.value} />
                </strong>
                <span>{m.label}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.6} className="ah-actions">
            <Magnetic>
              <a href="#why-accreditation" className="btn btn-primary">
                Explore Accreditations
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#certifications" className="btn hero-btn-outline ah-outline">
                View Certifications
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={30} className="ah-showcase">
          <div className="ah-showcase-panel">
            <svg className="ah-showcase-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="50" y1="50" x2="50" y2="5" />
              <line x1="50" y1="50" x2="90" y2="30" />
              <line x1="50" y1="50" x2="90" y2="70" />
              <line x1="50" y1="50" x2="50" y2="95" />
              <line x1="50" y1="50" x2="10" y2="70" />
              <line x1="50" y1="50" x2="10" y2="30" />
            </svg>

            <div className="ah-showcase-hub">
              <span className="ah-hub-ring ah-hub-ring-1" aria-hidden="true" />
              <span className="ah-hub-ring ah-hub-ring-2" aria-hidden="true" />
              <div className="ah-hub-core">
                <strong>techcadd</strong>
                <span>Verified</span>
              </div>
            </div>

            {SHOWCASE_NODES.map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.label}
                  className={`ah-node ${n.pos} ${hovered === i ? "ah-node-active" : ""}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Icon className="ah-node-icon" strokeWidth={1.75} />
                  <span>{n.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
