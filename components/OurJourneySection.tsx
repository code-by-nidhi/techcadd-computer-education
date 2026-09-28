"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, GraduationCap, Network, ShieldCheck, TrendingUp, X } from "lucide-react";
import { journey, ourJourneyHeader } from "@/lib/storyData";
import { EASE, MotionCounter, Reveal, ScaleIn } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

const ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  foundation: Building2,
  training: GraduationCap,
  growth: TrendingUp,
  certificate: ShieldCheck,
  expansion: Network,
};

// Real, already-established figures (see lib/teamIntroData.ts / lib/aboutData.ts), plus this
// section's own real course count — lib/courses.ts currently lists 24 courses, not the "100+" a
// reference spec suggested.
const bottomStats = [
  { value: "10", label: "Years" },
  { value: "25,000+", label: "Students" },
  { value: "500+", label: "Hiring Partners" },
  { value: "7", label: "Branches" },
  { value: "24", label: "Courses" },
];

// A horizontal roadmap row can only comfortably show ~4 nodes before it either has to shrink cards
// unreadably or scroll sideways — and a visible horizontal scrollbar was explicitly rejected on this
// section already. So the real 11-year timeline is chunked into rows of 4: each row is its own
// self-contained horizontal roadmap (own glowing line, own alternating cards), and the rows simply
// stack down the page via normal scroll — "horizontal roadmap, no scrollbar" without inventing a
// shorter fake milestone list.
const ROW_SIZE = 4;
const rows: (typeof journey)[number][][] = [];
for (let i = 0; i < journey.length; i += ROW_SIZE) rows.push(journey.slice(i, i + ROW_SIZE));

// "Our Journey" — content unchanged from lib/storyData.ts's `journey` (all 11 real years, 2016-2026)
// and `ourJourneyHeader`. A reference spec for this redesign listed a shorter, different milestone
// set ending in "Today" with invented framing — the real data's own years/titles/icons are used here
// instead (see the comment on the previous version of this file for the fuller fabrication note).
export default function OurJourneySection() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active !== null ? journey[active] : null;

  return (
    <section className="section theme-dark oj">
      <div className="oj-grid-bg" aria-hidden="true" />
      <span className="oj-glow oj-glow-1" aria-hidden="true" />
      <span className="oj-glow oj-glow-2" aria-hidden="true" />
      <span className="oj-particle" style={{ top: "18%", left: "8%" }} aria-hidden="true" />
      <span className="oj-particle" style={{ top: "72%", left: "12%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="oj-particle" style={{ top: "26%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="oj-spotlight" />

      <div className="container oj-container">
        <div className="section-heading">
          <ScaleIn className="eyebrow oj-badge">{ourJourneyHeader.eyebrow}</ScaleIn>
          <Reveal blur delay={0.15}>
            <h2 className="oj-heading">
              A Decade of <span className="oj-heading-highlight">Building Careers</span>
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p>{ourJourneyHeader.text}</p>
          </Reveal>
        </div>

        <div className="oj-roadmap">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="oj-hrow">
              {/* Real 3-row CSS Grid — top-card row / line+node row / bottom-card row — instead of
                  absolutely positioning cards around a fixed-height item. Each row's height is set by
                  the browser's own grid auto-sizing to whatever its tallest card actually needs, so a
                  long description can never overlap a neighbouring card or the line; the node row
                  stays a fixed thin height and the dots stay centred regardless of what the card rows
                  above/below it are doing. */}
              <div className="oj-hrow-items" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
                {row.map((m, j) => {
                  const globalIndex = rowIndex * ROW_SIZE + j;
                  const above = globalIndex % 2 === 0;
                  if (!above) return null;
                  return <JourneyCard key={m.year} m={m} col={j + 1} gridRow={1} delay={j * 0.15} onOpen={() => setActive(globalIndex)} />;
                })}

                <div className="oj-hrow-line-track" style={{ gridColumn: `1 / -1`, gridRow: 2 }}>
                  <motion.span
                    className="oj-hrow-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
                  />
                  <span className="oj-hrow-particle" style={{ animationDelay: `${rowIndex * 0.7}s` }} />
                </div>
                {row.map((m, j) => (
                  <div key={`${m.year}-node`} className="oj-hnode-cell" style={{ gridColumn: j + 1, gridRow: 2 }}>
                    <motion.span
                      className="oj-hnode-ring"
                      initial={{ scale: 0.4, opacity: 0 }}
                      whileInView={{ scale: 1.8, opacity: [0, 0.7, 0] }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 1.1, delay: 0.3 + j * 0.15, ease: "easeOut" }}
                    />
                    <span className="oj-hnode" />
                  </div>
                ))}

                {row.map((m, j) => {
                  const globalIndex = rowIndex * ROW_SIZE + j;
                  const above = globalIndex % 2 === 0;
                  if (above) return null;
                  return <JourneyCard key={m.year} m={m} col={j + 1} gridRow={3} delay={j * 0.15} onOpen={() => setActive(globalIndex)} />;
                })}
              </div>
            </div>
          ))}
        </div>

        <Reveal delay={0.1} className="oj-stats">
          {bottomStats.map((s) => (
            <div key={s.label} className="oj-stat">
              <strong>
                <MotionCounter value={s.value} />
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="oj-panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="oj-panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="oj-panel-close" aria-label="Close" onClick={() => setActive(null)}>
                <X strokeWidth={1.75} />
              </button>
              <span className="oj-panel-icon">
                {(() => {
                  const Icon = ICONS[selected.icon] ?? Building2;
                  return <Icon strokeWidth={1.6} />;
                })()}
              </span>
              <span className="oj-panel-year">{selected.year}</span>
              <h3>{selected.title}</h3>
              <p>{selected.text}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function JourneyCard({
  m,
  col,
  gridRow,
  delay,
  onOpen,
}: {
  m: (typeof journey)[number];
  col: number;
  gridRow: 1 | 3;
  delay: number;
  onOpen: () => void;
}) {
  const Icon = ICONS[m.icon] ?? Building2;
  const above = gridRow === 1;
  return (
    <motion.div
      className={`oj-hcard-wrap ${above ? "oj-hcard-wrap-above" : "oj-hcard-wrap-below"}`}
      // `order` mirrors the column so a mobile flex-column layout (see the ≤720px override) can
      // naturally fall back to chronological order, even though desktop groups cards into two
      // separate grid rows (above/below) rather than by year.
      style={{ gridColumn: col, gridRow, order: col }}
      initial={{ opacity: 0, y: above ? 40 : -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <button type="button" className="oj-hcard" onClick={onOpen}>
        <span className="oj-hcard-spotlight" aria-hidden="true" />
        <span className="oj-hcard-orb">
          <span className="oj-hcard-glow" aria-hidden="true" />
          <Icon className="oj-hcard-icon" strokeWidth={1.75} />
        </span>
        <strong className="oj-hcard-year">
          <MotionCounter value={m.year} duration={1.2} />
        </strong>
        <span className="oj-hcard-title">{m.title}</span>
        <p className="oj-hcard-text">{m.text}</p>
      </button>
    </motion.div>
  );
}
