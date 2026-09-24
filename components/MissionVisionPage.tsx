import SpotlightCard from "./SpotlightCard";
import { CtaStrip, LeadCta } from "./Sections";
import {
  missionPillars,
  missionPillarsHeader,
  missionVisionHero,
  ourFuture,
  visionFootnote,
  visionGoal,
  visionHeader,
  visionPoints,
} from "@/lib/missionVisionData";

// The redesigned /about/mission-vision page (app/about/mission-vision/page.tsx): Hero, Mission
// Pillars, Vision, Our Future, LeadCta + CtaStrip — same light/dark alternation system as the main
// /about page (components/StoryPage.tsx) — see lib/missionVisionData.ts for where the copy comes
// from and why. LeadCta + CtaStrip serve as the page's closing CTA, so the earlier custom
// "Start Building Your Career Today" card was removed rather than stacking two CTAs back to back.
//
// Alternation: Hero(L), Mission Pillars(D), Vision(L — recoloured from its earlier dark
// "space-tech" look), Our Future(D — recoloured from light), then LeadCta + CtaStrip, both kept in
// their normal sitewide light styling (CtaStrip's dark page-scoped override was tried and then
// asked to be reverted back to white) — so this closing pair is the one accepted light-light
// repeat, same as the main /about page (StoryPage.tsx), which ends with this same LeadCta/CtaStrip
// pair on a light section too.
export default function MissionVisionPage() {
  return (
    <>
      <MissionVisionHero />
      <div className="mv-hero-divider" aria-hidden="true" />
      <MissionPillars />
      <VisionRadial />
      <OurFuture />
      <LeadCta />
      <CtaStrip />
    </>
  );
}

function MissionVisionHero() {
  return (
    <section className="mv-hero theme-light">
      <div className="mv-hero-grid-bg" aria-hidden="true" />
      <span className="mv-hero-glow mv-hero-glow-1" aria-hidden="true" />
      <span className="mv-hero-glow mv-hero-glow-2" aria-hidden="true" />
      <div className="container mv-hero-inner">
        <div className="mv-hero-copy" data-aos="fade-up">
          <span className="eyebrow">{missionVisionHero.label}</span>
          <h1>{missionVisionHero.heading}</h1>
          <p>{missionVisionHero.description}</p>
        </div>
        <div className="mv-hero-visual" data-aos="fade-left">
          <span className="mv-hero-orbit" aria-hidden="true" />
          <div className="mv-hero-card mv-hero-card-1">
            <span className="mv-hero-card-icon">
              <MvIcon icon="vision" />
            </span>
            <strong>Vision</strong>
            <span>Punjab's most trusted skilling partner</span>
          </div>
          <div className="mv-hero-card mv-hero-card-2">
            <span className="mv-hero-card-icon">
              <MvIcon icon="mission" />
            </span>
            <strong>Mission</strong>
            <span>Job-ready from day one</span>
          </div>
          <div className="mv-hero-card mv-hero-card-3">
            <strong>25,000+</strong>
            <span>Students trained</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionPillars() {
  return (
    <section className="section theme-dark mv-pillars">
      <div className="mv-pillars-grid-bg" aria-hidden="true" />
      <span className="mv-pillars-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">{missionPillarsHeader.badge}</span>
          <h2>{missionPillarsHeader.heading}</h2>
          <p className="mv-pillars-subheading">{missionPillarsHeader.text}</p>
        </div>

        <div className="mv-pillars-grid">
          {missionPillars.map((p, i) => (
            <SpotlightCard key={p.title} className="mv-pillar-card" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="mv-pillar-icon">
                <MvIcon icon={p.icon} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="mv-pillar-accent" aria-hidden="true" />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionRadial() {
  return (
    <section className="section theme-light mv-vision">
      <div className="mv-vision-grid-bg" aria-hidden="true" />
      <span className="mv-vision-particle" style={{ top: "16%", left: "10%" }} aria-hidden="true" />
      <span className="mv-vision-particle" style={{ top: "72%", left: "18%", animationDelay: "1.6s" }} aria-hidden="true" />
      <span className="mv-vision-particle" style={{ top: "24%", left: "88%", animationDelay: "3s" }} aria-hidden="true" />
      <span className="mv-vision-particle" style={{ top: "78%", left: "82%", animationDelay: "0.8s" }} aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">{visionHeader.badge}</span>
          <h2>{visionHeader.heading}</h2>
          <p className="mv-vision-subheading">{visionHeader.text}</p>
        </div>

        {/* Two-layer orbit: .mv-vision-spin rotates continuously; each node's own inner element
            carries an equal, opposite-direction animation (components/../globals.css mv-orbit-spin,
            same technique the homepage's .dash-orbit/.dash-app-inner already use) so the ring sweeps
            around while every card's text stays upright and readable. */}
        <div className="mv-vision-orbit" data-aos="zoom-in">
          <span className="mv-vision-glow" aria-hidden="true" />
          <span className="mv-vision-ring mv-vision-ring-outer" aria-hidden="true" />
          <span className="mv-vision-ring mv-vision-ring-inner" aria-hidden="true" />
          <div className="mv-vision-hub">
            <span className="eyebrow">{visionGoal.badge}</span>
            <strong>{visionGoal.label}</strong>
          </div>
          <div className="mv-vision-spin">
            {visionPoints.map((point) => (
              <div key={point} className="mv-vision-node-wrap">
                <div className="mv-vision-node-spin">
                  <div className="mv-vision-node">
                    <span>{point}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Static, non-rotating duplicate for stacked mobile/no-motion layouts — see the ≤720px
              and prefers-reduced-motion overrides in globals.css, which hide .mv-vision-spin and
              show this list instead. */}
          <ul className="mv-vision-list">
            {visionPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <p className="mv-vision-footnote" data-aos="fade-up">
          {visionFootnote}
        </p>
      </div>
    </section>
  );
}

function OurFuture() {
  return (
    <section className="section theme-dark mv-future">
      <span className="mv-future-ring" aria-hidden="true" />
      <span className="mv-future-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">{ourFuture.badge}</span>
          <h2>{ourFuture.heading}</h2>
          <p className="mv-future-text">{ourFuture.text}</p>
        </div>
      </div>
    </section>
  );
}

function MvIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    vision: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    mission: "M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z M9 12l2 2 4-4",
    access: "M12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-6-3V8a6 6 0 0 1 12 0v4M5 12h14v8H5z",
    practical: "M14.7 6.3a1 1 0 0 1 1.4 0l1.6 1.6a1 1 0 0 1 0 1.4L9.4 17.6l-3.7.7.7-3.7Z M3 21h18",
    talent: "M12 2 15 8l6.5.9-4.7 4.6 1.1 6.5L12 17l-5.9 3 1.1-6.5L2.5 8.9 9 8Z",
    upskill: "M3 17 9 11l4 4 8-8M15 6h6v6",
    ecosystem: "M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 5 10 12M14 12l2.5-7M7.5 19 10 12M14 12l2.5 7",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon] ?? paths.mission} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
