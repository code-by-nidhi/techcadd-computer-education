"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, Compass, FolderKanban, GraduationCap, Rocket } from "lucide-react";
import { differentiators } from "@/lib/storyData";
import { categories } from "@/lib/courses";
import { EASE, MotionCounter, ScaleIn, Stagger, StaggerItem, TiltCard } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "Industry-Oriented Curriculum": BriefcaseBusiness,
  "Hands-On Learning": Code2,
  "Real Projects": FolderKanban,
  "Placement Support": Rocket,
  "Expert Trainers": GraduationCap,
  "Career Guidance": Compass,
};

// Bento cell size per card (index-matched to differentiators.points) — see .wmd-item-* in
// globals.css for the actual column/row spans that make this read as a large/medium mixed grid.
const SIZES = ["big", "wide", "square", "square", "wide", "wide"] as const;

// Real, already-established figures (see lib/teamIntroData.ts / lib/aboutData.ts).
const bottomStats = [
  { value: "25,000+", label: "Students Trained" },
  { value: "500+", label: "Hiring Partners" },
  { value: "7", label: "Branches" },
  { value: "10+", label: "Years Experience" },
];

// "What Makes techcadd Different?" — content from lib/storyData.ts's `differentiators` (trimmed to
// the 6 features this redesign named, with shortened titles — see that file's comment), rebuilt as a
// bento grid. The featured "Industry-Oriented Curriculum" card gets a small roadmap visual with
// floating tags — those tags are this repo's actual 5 real course categories (lib/courses.ts), not
// the generic "React / Node.js / Python / AI / Data Analytics" list from the reference spec, which
// techcadd doesn't teach.
export default function WhyDifferent() {
  const [hovered, setHovered] = useState<number | null>(null);
  const headingWords = ["What", "makes", "techcadd"];

  return (
    <section className="section theme-light wmd">
      <div className="wmd-grid-bg" aria-hidden="true" />
      <span className="wmd-glow wmd-glow-1" aria-hidden="true" />
      <span className="wmd-glow wmd-glow-2" aria-hidden="true" />
      <span className="wmd-particle" style={{ top: "14%", left: "6%" }} aria-hidden="true" />
      <span className="wmd-particle" style={{ top: "68%", left: "10%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="wmd-particle" style={{ top: "24%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="wmd-spotlight" />

      <div className="container wmd-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">{differentiators.eyebrow}</ScaleIn>
          <h2 className="wmd-heading">
            {headingWords.map((w, i) => (
              <span key={w} className="wmd-heading-word-mask">
                <motion.span
                  className="wmd-heading-word"
                  initial={{ y: "110%", filter: "blur(8px)" }}
                  whileInView={{ y: "0%", filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <span className="wmd-heading-word-mask">
              <motion.span
                className="wmd-heading-word wmd-heading-highlight"
                initial={{ y: "110%", filter: "blur(8px)" }}
                whileInView={{ y: "0%", filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 + headingWords.length * 0.08, ease: EASE }}
              >
                different?
              </motion.span>
            </span>
          </h2>
          <motion.span
            className="wmd-underline"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          />
        </div>

        <Stagger className="wmd-grid" stagger={0.12}>
          {differentiators.points.map((p, i) => {
            const Icon = ICONS[p.title] ?? BriefcaseBusiness;
            const size = SIZES[i] ?? "square";
            return (
              <StaggerItem key={p.title} y={80} scale={0.9} className={`wmd-item wmd-item-${size}`}>
                <TiltCard max={4} className="wmd-card">
                  <div
                    className="wmd-card-inner"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
                    }}
                  >
                    <span className="wmd-card-spotlight" aria-hidden="true" />
                    <span className="wmd-card-num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`wmd-icon-badge ${hovered === i ? "wmd-icon-badge-active" : ""}`}>
                      <Icon className="wmd-icon" strokeWidth={1.75} />
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>

                    {size === "big" && (
                      <div className="wmd-big-visual" aria-hidden="true">
                        <div className="wmd-roadmap-track">
                          <span className="wmd-roadmap-fill" />
                          {[8, 38, 68, 94].map((left) => (
                            <span key={left} className="wmd-roadmap-dot" style={{ left: `${left}%` }} />
                          ))}
                        </div>
                        <div className="wmd-tags">
                          {categories.map((c, ci) => (
                            <span key={c.id} className="wmd-tag" style={{ animationDelay: `${ci * 0.6}s` }}>
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Stagger className="wmd-stats">
          {bottomStats.map((s) => (
            <StaggerItem key={s.label} className="wmd-stat">
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
