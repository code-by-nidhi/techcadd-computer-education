import type { CSSProperties } from "react";
import { Hammer, Network, TrendingUp, Unlock, Users } from "lucide-react";
import { CtaStrip, LeadCta } from "./Sections";
import HeroPattern from "./HeroPattern";
import {
  missionFootnote,
  missionPillars,
  missionPillarsHeader,
  missionVisionHero,
  ourFuture,
  visionFootnote,
  visionGoal,
  visionHeader,
  visionPoints,
} from "@/lib/missionVisionData";

// /about/mission-vision (app/about/mission-vision/page.tsx), laid out after
// techcaddjalandhar.com/about/mission-vision: dark hero, the mission as a five-stop line with stops
// alternating above and below it, the vision as five circles ringed around a centre goal, then
// "Our Future" and the shared closing CTA. Shares the ".rf-" styles in globals.css with
// components/StoryPage.tsx; copy lives in lib/missionVisionData.ts.
export default function MissionVisionPage() {
  return (
    <>
      <MissionVisionHero />
      <Mission />
      <Vision />
      <OurFuture />
      <LeadCta dark />
      <CtaStrip />
    </>
  );
}

function MissionVisionHero() {
  return (
    <section className="rf-hero">
      <HeroPattern variant="rings" />
      <div className="container rf-hero-inner rf-hero-split">
        <div>
          <span className="rf-pill">{missionVisionHero.label}</span>
          <h1 className="rf-hero-title">
            {missionVisionHero.headingParts.map((part) =>
              part.strong ? <span key={part.text}>{part.text}</span> : part.text
            )}
          </h1>
          <p className="rf-hero-text">{missionVisionHero.description}</p>
        </div>
        <span className="hero-art" role="img" aria-label="Illustration of a path of milestones leading to a flag" style={{ backgroundImage: "url(/illustrations/roadmap.svg)" }} />
      </div>
    </section>
  );
}

const PILLAR_ICONS: Record<string, typeof Unlock> = {
  access: Unlock,
  practical: Hammer,
  talent: Users,
  upskill: TrendingUp,
  ecosystem: Network,
};

function Mission() {
  return (
    <section className="rf-sec rf-subtle">
      <div className="container">
        <div className="rf-head rf-head-center" suppressHydrationWarning data-aos="fade-up">
          <p className="rf-eyebrow">{missionPillarsHeader.badge}</p>
          <h2 className="rf-title">{missionPillarsHeader.heading}</h2>
          <p className="rf-lead">{missionPillarsHeader.text}</p>
        </div>

        <ol className="rf-mission">
          {missionPillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[pillar.icon] ?? Unlock;
            return (
              <li
                key={pillar.title}
                className={i % 2 === 1 ? "is-below" : ""}
                suppressHydrationWarning
                data-aos="fade-up"
                data-aos-delay={i * 110}
              >
                <div className="rf-mission-body">
                  <span className="rf-mission-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
                <span className="rf-mission-dot" aria-hidden="true" />
              </li>
            );
          })}
        </ol>

        <p className="rf-note rf-note-xs">{missionFootnote}</p>
      </div>
    </section>
  );
}

// Five points of a regular pentagon around the centre (percent of the square stage).
const RING = [
  { x: 50, y: 13 },
  { x: 85, y: 38.6 },
  { x: 71.8, y: 79.9 },
  { x: 28.2, y: 79.9 },
  { x: 15, y: 38.6 },
];

function Vision() {
  return (
    <section className="rf-sec rf-panel rf-panel-dots">
      <div className="container">
        <div className="rf-head rf-head-center" suppressHydrationWarning data-aos="fade-up">
          <p className="rf-eyebrow">{visionHeader.badge}</p>
          <h2 className="rf-title">{visionHeader.heading}</h2>
          <p className="rf-lead">{visionHeader.text}</p>
        </div>

        <ul className="rf-ring" suppressHydrationWarning data-aos="zoom-in">
          <li className="rf-ring-lines" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1.4" />
              {RING.map((p) => (
                <line key={`${p.x}-${p.y}`} x1="50" y1="50" x2={p.x} y2={p.y} stroke="currentColor" strokeWidth="0.25" />
              ))}
            </svg>
          </li>
          <li className="rf-ring-hub">
            <span>{visionGoal.badge}</span>
            <strong>{visionGoal.label}</strong>
          </li>
          {visionPoints.map((point, i) => (
            <li
              key={point}
              className={`rf-ring-node ${i % 2 === 1 ? "is-alt" : ""}`}
              style={{ "--x": `${RING[i].x}%`, "--y": `${RING[i].y}%` } as CSSProperties}
            >
              <p>{point}</p>
            </li>
          ))}
        </ul>

        <p className="rf-note rf-note-xs">{visionFootnote}</p>
      </div>
    </section>
  );
}

function OurFuture() {
  return (
    <section className="rf-sec rf-subtle">
      <div className="container">
        <div className="rf-head rf-head-center" suppressHydrationWarning data-aos="fade-up">
          <p className="rf-eyebrow">{ourFuture.badge}</p>
          <h2 className="rf-title">{ourFuture.heading}</h2>
          <p className="rf-lead">{ourFuture.text}</p>
        </div>
      </div>
    </section>
  );
}
