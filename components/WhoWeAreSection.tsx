"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Cpu, FolderKanban, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { getCourse } from "@/lib/courses";
import { site } from "@/lib/site";
import { whoWeAre } from "@/lib/storyData";
import { EASE, MotionCounter, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

// Real, already-established figures used identically elsewhere this session (see
// components/AccreditationHero.tsx / lib/teamIntroData.ts) — "Cities Served" is an accurate
// reframing of the real 7-branch network (each branch sits in its own city).
const IMPACT_STATS = [
  { value: "25,000+", label: "Students Trained" },
  { value: "10+", label: "Years of Excellence" },
  { value: "500+", label: "Hiring Partners" },
  { value: "7", label: "Cities Served" },
  { value: "4.9★", label: "Google Rating" },
];

// The six real pillars of what techcadd actually runs — technology training, hands-on projects,
// employer/industry ties and the careers those lead to — framed as an ecosystem instead of the old
// three broken /about-menu/*.jpg placeholder photos (that folder doesn't exist anywhere in this
// repo). Same hub-and-spoke technique used for components/AwardsRecognitionSection.tsx and
// components/AccreditationHub.tsx, restyled for this section's dark palette.
const ECOSYSTEM_NODES: { label: string; icon: ComponentType<{ className?: string; strokeWidth?: number }>; pos: string }[] = [
  { label: "Technology", icon: Cpu, pos: "wwa-node-0" },
  { label: "Training", icon: GraduationCap, pos: "wwa-node-1" },
  { label: "Projects", icon: FolderKanban, pos: "wwa-node-2" },
  { label: "Industry", icon: Briefcase, pos: "wwa-node-3" },
  { label: "Careers", icon: Rocket, pos: "wwa-node-4" },
  { label: "Innovation", icon: Sparkles, pos: "wwa-node-5" },
];

// techcadd's real, industry-standard-tools phrasing already highlights itself — bold the same
// phrases inline rather than inventing new marketing copy.
function highlight(text: string, phrase: string) {
  const i = text.indexOf(phrase);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="wwa-highlight">{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
}

// 2. Who We Are — brand-story panel (headline, founder line, real paragraphs with inline-highlighted
// phrases, real course chip cloud) paired with an interactive "techcadd ecosystem" hub instead of the
// old two-column photo collage, over a floating "Since {site.since}" trust badge and a real impact-
// stats row with animated counters.
export default function WhoWeAreSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [hubHover, setHubHover] = useState(false);

  return (
    <section className="section theme-dark wwa">
      <div className="wwa-grid-bg" aria-hidden="true" />
      <span className="wwa-glow wwa-glow-1" aria-hidden="true" />
      <span className="wwa-glow wwa-glow-2" aria-hidden="true" />
      <span className="wwa-particle" style={{ top: "18%", left: "6%" }} aria-hidden="true" />
      <span className="wwa-particle" style={{ top: "72%", left: "10%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="wwa-particle" style={{ top: "24%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="wwa-spotlight" />

      <div className="container wwa-inner">
        <div className="wwa-story">
          <ScaleIn className="eyebrow">Who we are</ScaleIn>
          <h2 className="wwa-heading">
            <RevealHeading text="Empowering Skills. Enabling Careers." delay={0.1} />
            <br />
            <span className="wwa-highlight-heading">
              <RevealHeading text="Building the Future." delay={0.25} />
            </span>
          </h2>

          <Reveal delay={0.4}>
            <p>
              Founded in {site.since} by{" "}
              <Link href="/about/founder" className="wwa-founder">
                Mr. Gourav Gupta
              </Link>
              , {highlight(whoWeAre.paragraphs[0], "project-based learning")}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p>{highlight(whoWeAre.paragraphs[1], "industry-standard tools")}</p>
          </Reveal>

          <Reveal delay={0.6} className="wwa-teach">
            <h3>What we teach</h3>
            <p>{whoWeAre.teachIntro}</p>
            <Stagger className="wwa-chip-cloud" stagger={0.03}>
              {whoWeAre.featuredCourseSlugs.map((slug) => {
                const course = getCourse(slug);
                if (!course) return null;
                return (
                  <StaggerItem key={slug} className="wwa-chip" y={12}>
                    {course.title}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>

          <Reveal delay={0.7}>
            <p className="wwa-hq">Headquartered in {site.city}, Punjab.</p>
          </Reveal>

          <Stagger className="wwa-stats" stagger={0.08}>
            {IMPACT_STATS.map((s) => (
              <StaggerItem key={s.label} className="wwa-stat" y={16}>
                <strong>
                  <MotionCounter value={s.value} />
                </strong>
                <span>{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.3} y={30} className="wwa-showcase">
          <div className="wwa-showcase-panel">
            <span className="wwa-since-badge">
              <span className="wwa-since-pulse" aria-hidden="true" />
              Since {site.since}
            </span>

            <svg className="wwa-showcase-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line x1="50" y1="50" x2="50" y2="5" />
              <line x1="50" y1="50" x2="90" y2="30" />
              <line x1="50" y1="50" x2="90" y2="70" />
              <line x1="50" y1="50" x2="50" y2="95" />
              <line x1="50" y1="50" x2="10" y2="70" />
              <line x1="50" y1="50" x2="10" y2="30" />
            </svg>

            <motion.div
              className="wwa-hub"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              onMouseEnter={() => setHubHover(true)}
              onMouseLeave={() => setHubHover(false)}
            >
              <span className={`wwa-hub-ring wwa-hub-ring-1 ${hubHover ? "wwa-hub-fast" : ""}`} aria-hidden="true" />
              <span className={`wwa-hub-ring wwa-hub-ring-2 ${hubHover ? "wwa-hub-fast" : ""}`} aria-hidden="true" />
              <div className="wwa-hub-core">
                <strong>techcadd</strong>
                <span>Ecosystem</span>
              </div>
            </motion.div>

            {ECOSYSTEM_NODES.map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.label}
                  className={`wwa-node ${n.pos} ${hovered === i ? "wwa-node-active" : ""}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Icon className="wwa-node-icon" strokeWidth={1.75} />
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
