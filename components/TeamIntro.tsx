import { teamIntro } from "@/lib/teamIntroData";
import { Magnetic, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";

// "Meet the Team" — a premium intro section inserted between the Hero and the existing (generic)
// content sections on /about/our-team (see app/about/[slug]/page.tsx, which renders this only for
// that one slug and shifts the rest of the page's light/dark alternation to account for it).
//
// This repo has no real staff photos anywhere (confirmed by search — public/about-menu doesn't
// exist), so these arch cards use a generic silhouette + large faded role text instead of a real
// photo, and are labelled by role (Trainer/Mentor/...) rather than an invented person's name — see
// lib/teamIntroData.ts. Swap in real photos (replace TeamSilhouette with next/image) once they exist.
// Runs as an infinite auto-scrolling carousel — see the track-duplication note below.
export default function TeamIntro() {
  return (
    <section className="section theme-dark team-intro">
      <div className="team-intro-grid-bg" aria-hidden="true" />
      <span className="team-intro-glow team-intro-glow-1" aria-hidden="true" />
      <span className="team-intro-glow team-intro-glow-2" aria-hidden="true" />
      <span className="team-intro-particle" style={{ top: "16%", left: "8%" }} aria-hidden="true" />
      <span className="team-intro-particle" style={{ top: "72%", left: "14%", animationDelay: "1.6s" }} aria-hidden="true" />
      <span className="team-intro-particle" style={{ top: "22%", left: "92%", animationDelay: "3s" }} aria-hidden="true" />
      <span className="team-intro-particle" style={{ top: "80%", left: "88%", animationDelay: "0.8s" }} aria-hidden="true" />
      <div className="container team-intro-inner">
        <div className="team-intro-copy">
          <ScaleIn className="eyebrow">{teamIntro.badge}</ScaleIn>
          <h2>
            <RevealHeading text={teamIntro.heading} delay={0.1} />
          </h2>
          <Reveal delay={0.3}>
            <p>{teamIntro.text}</p>
          </Reveal>

          <Stagger className="team-intro-stats">
            {teamIntro.stats.map((s) => (
              <StaggerItem key={s.label} className="team-intro-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.45} className="team-intro-actions">
            <Magnetic>
              <a href={teamIntro.primaryCta.href} className="btn btn-primary">
                {teamIntro.primaryCta.label}
              </a>
            </Magnetic>
            <Magnetic>
              <a href={teamIntro.secondaryCta.href} className="btn team-intro-btn-glass">
                {teamIntro.secondaryCta.label}
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={30} className="team-intro-visual">
          {/* Infinite marquee carousel: the card list is rendered twice back to back and the track
              animates from 0 to -50%, so the seam between the first and second copy is invisible and
              it loops forever without any JS. Hovering the row pauses it so a card can be read. */}
          <div className="team-preview-row">
            <div className="team-preview-track">
              {[...teamIntro.previewCards, ...teamIntro.previewCards].map((card, i) => (
                <div key={`${card.role}-${i}`} className={`team-preview-card ${i % 2 === 1 ? "team-preview-card-alt" : ""}`}>
                  <span className="team-preview-bg-text" aria-hidden="true">
                    {card.role}
                  </span>
                  <span className="team-preview-photo" aria-hidden="true">
                    <TeamSilhouette />
                  </span>
                  <span className="team-preview-name">{card.role}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamSilhouette() {
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden="true">
      <circle cx="60" cy="48" r="34" fill="currentColor" opacity="0.9" />
      <path d="M6 158c0-40 24-64 54-64s54 24 54 64" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
