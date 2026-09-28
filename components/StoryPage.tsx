import Link from "next/link";
import { categories, coursesIn } from "@/lib/courses";
import { site } from "@/lib/site";
import { belief, heroCopy, industryEngagement, industryPartners, learningEcosystem, skillEcosystem } from "@/lib/storyData";
import SpotlightCard from "./SpotlightCard";
import DemoButton from "./DemoButton";
import { LeadCta, CtaStrip } from "./Sections";
import { Magnetic, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";
import HeroParallax from "./motion/HeroParallax";
import MouseSpotlight from "./motion/MouseSpotlight";
import WhoWeAreSection from "./WhoWeAreSection";
import WhoWeTeach from "./WhoWeTeach";
import LearningJourney from "./LearningJourney";
import WhyDifferent from "./WhyDifferent";
import OurApproachSection from "./OurApproachSection";
import AwardsRecognitionSection from "./AwardsRecognitionSection";
import OurJourneySection from "./OurJourneySection";
import HeroStats from "./HeroStats";
import WhyItMattersSection from "./WhyItMattersSection";

// The redesigned /about page (app/about/page.tsx). Fourteen sections, each a small local component —
// see lib/storyData.ts for the copy that isn't already sourced from lib/courses.ts / lib/content.ts /
// lib/aboutData.ts elsewhere.
export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <WhoWeAreSection />
      <SkillEcosystem />
      <WhyItMattersSection />
      <WhoWeTeach />
      <LearningJourney />
      <WhyDifferent />
      <TechDomains />
      <OurApproachSection />
      <IndustryEngagement />
      <AwardsRecognitionSection />
      <OurJourneySection />
      <OurBelief />
      <LeadCta />
      <CtaStrip />
    </>
  );
}

// 1. Hero — split layout: headline + story summary + stat counters + CTAs on the left, a decorative
// panel on the right (reuses the header's photo-card technique — see components/Header.tsx).
function StoryHero() {
  return (
    <section className="story-hero">
      <HeroParallax>
        <div className="story-hero-grid-bg" />
        <span className="story-hero-glow story-hero-glow-1" />
        <span className="story-hero-glow story-hero-glow-2" />
        <span className="story-hero-particle" style={{ top: "20%", left: "8%" }} />
        <span className="story-hero-particle" style={{ top: "68%", left: "14%", animationDelay: "2s" }} />
        <span className="story-hero-particle" style={{ top: "30%", left: "92%", animationDelay: "3.6s" }} />
        <span className="story-hero-particle" style={{ top: "78%", left: "88%", animationDelay: "1s" }} />
      </HeroParallax>
      <MouseSpotlight className="story-hero-spotlight" />
      <div className="container story-hero-inner">
        <div>
          <ScaleIn className="eyebrow eyebrow-light">{heroCopy.eyebrow}</ScaleIn>
          <h1>
            <RevealHeading text={heroCopy.headline} delay={0.1} />
          </h1>
          <Reveal delay={0.3}>
            <p>{heroCopy.text}</p>
            <div className="story-hero-actions">
              <Magnetic>
                <DemoButton className="btn hero-btn">Book a free demo</DemoButton>
              </Magnetic>
              <Magnetic>
                <Link href="/courses" className="btn hero-btn-outline story-hero-outline">
                  Explore courses
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <HeroStats />
      </div>
    </section>
  );
}

// Learning Flow — redesigned in its own file, components/LearningJourney.tsx, as a connected
// roadmap (needs client-side hover state for the per-card spotlight).

// Who We Are — redesigned in its own file, components/WhoWeAreSection.tsx, as a brand-story panel
// paired with an interactive "techcadd ecosystem" hub (needs client-side hover state).

// 4. Skill Building Ecosystem — reading column on the left, an asymmetrical 3-image composition on
// the right, over a decorative dark-navy backdrop (glow orbs + faint grid — see globals.css).
function SkillEcosystem() {
  const [before, after] = skillEcosystem.paragraphs[0].split(skillEcosystem.highlight);
  return (
    <section className="section theme-light story-ecosystem">
      <span className="story-ecosystem-orb story-ecosystem-orb-blue" aria-hidden="true" />
      <span className="story-ecosystem-orb story-ecosystem-orb-yellow" aria-hidden="true" />
      <div className="container story-ecosystem-inner">
        <div className="story-ecosystem-content" suppressHydrationWarning data-aos="fade-up">
          <span className="eyebrow">{skillEcosystem.eyebrow}</span>
          <h2>{skillEcosystem.heading}</h2>
          <p>
            {before}
            <strong>{skillEcosystem.highlight}</strong>
            {after}
          </p>
          <p>{skillEcosystem.paragraphs[1]}</p>
        </div>
        <div className="story-ecosystem-images" suppressHydrationWarning data-aos="fade-up" data-aos-delay="120">
          <div className="story-ecosystem-frame story-ecosystem-main">
            <span className="story-ecosystem-img" style={{ backgroundImage: `url(${skillEcosystem.images[0]})` }} />
          </div>
          <div className="story-ecosystem-frame story-ecosystem-float story-ecosystem-float-1">
            <span className="story-ecosystem-img" style={{ backgroundImage: `url(${skillEcosystem.images[1]})` }} />
          </div>
          <div className="story-ecosystem-frame story-ecosystem-float story-ecosystem-float-2">
            <span className="story-ecosystem-img" style={{ backgroundImage: `url(${skillEcosystem.images[2]})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Why It Matters — redesigned in its own file, components/WhyItMattersSection.tsx, as a connected
// horizontal story flow (needs client-side hover state for the per-card spotlight).

// 6. Who We Teach — five audience segments (redesigned in its own file, components/WhoWeTeach.tsx,
// since it needs client-side hover state for the "active card dims its siblings" effect).

// 7. What Makes techcadd Different — redesigned in its own file, components/WhyDifferent.tsx, as a
// bento grid (needs client-side hover state for the per-card spotlight + icon-active effect).

// 9. Technology Domains — the same real categories as "What We Teach", presented as a denser tag
// cloud of actual course names grouped by track.
function TechDomains() {
  return (
    <section className="section theme-dark story-ecosystem2">
      <span className="story-ecosystem2-orb story-ecosystem2-orb-1" aria-hidden="true" />
      <span className="story-ecosystem2-orb story-ecosystem2-orb-2" aria-hidden="true" />
      <span className="story-ecosystem2-ring" aria-hidden="true">
        <span className="story-ecosystem2-ring-core">TECHCADD</span>
      </span>
      <div className="container">
        <div className="section-heading story-ecosystem2-heading" suppressHydrationWarning data-aos="fade-up">
          <span className="eyebrow story-ecosystem2-eyebrow">{learningEcosystem.eyebrow}</span>
          <h2>{learningEcosystem.heading}</h2>
          <p>{learningEcosystem.text}</p>
        </div>
        <div className="story-ecosystem2-stats" suppressHydrationWarning data-aos="fade-up">
          {learningEcosystem.statsStrip.map((s) => (
            <div key={s.label} className="story-ecosystem2-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <div className="story-ecosystem2-grid">
          {categories.map((cat, i) => {
            const courses = coursesIn(cat.id);
            const shown = courses.slice(0, 4);
            const rest = courses.slice(4);
            return (
              <SpotlightCard
                key={cat.id}
                className="story-ecosystem2-card"
                suppressHydrationWarning data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="story-ecosystem2-icon">
                  <DomainIcon icon={learningEcosystem.categoryIcons[cat.id]} />
                </span>
                <h3>{cat.name}</h3>
                <span className="story-ecosystem2-badge">{courses.length} Courses</span>
                <p className="story-ecosystem2-desc">{cat.blurb}</p>
                <div className="story-ecosystem2-pills">
                  {shown.map((c) => (
                    <Link key={c.slug} href={`/courses/${c.slug}`} className="story-ecosystem2-pill">
                      {c.title}
                    </Link>
                  ))}
                </div>
                {rest.length > 0 && (
                  <details className="story-ecosystem2-more">
                    <summary>
                      View All Courses <span className="story-ecosystem2-more-arrow">→</span>
                    </summary>
                    <div className="story-ecosystem2-pills story-ecosystem2-pills-extra">
                      {rest.map((c) => (
                        <Link key={c.slug} href={`/courses/${c.slug}`} className="story-ecosystem2-pill">
                          {c.title}
                        </Link>
                      ))}
                    </div>
                  </details>
                )}
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DomainIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    cpu: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M6 6h12v12H6zM10 10h4v4h-4z",
    compass: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM15 9l-2 6-6 2 2-6 6-2Z",
    palette: "M12 3a9 9 0 1 0 3 17.5c1 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H19a3 3 0 0 0 3-3c0-5-4.5-9-10-9ZM7.3 13.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6ZM9.3 8.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm6 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm2 4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z",
    megaphone: "M3 11v2a2 2 0 0 0 2 2h1l3 5V4l-3 5H5a2 2 0 0 0-2 2ZM14 8a4 4 0 0 1 0 8M17 5a8 8 0 0 1 0 14",
    keyboard: "M3 6h18v12H3zM6 10h.01M9 10h.01M12 10h.01M15 10h.01M18 10h.01M6 14h12",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon] ?? paths.cpu} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 10. Our Approach — redesigned in its own file, components/OurApproachSection.tsx, as a zig-zag
// connected timeline (needs client-side hover state for the per-card spotlight).

// 11. Industry Engagement — real, named partnerships.
function IndustryEngagement() {
  return (
    <section className="section theme-dark story-engage">
      <span className="story-engage-orb" aria-hidden="true" />
      <div className="container story-engage-inner">
        <div className="story-engage-media" suppressHydrationWarning data-aos="fade-up">
          <span className="story-engage-img" style={{ backgroundImage: `url(${industryEngagement.image})` }} />
        </div>
        <div suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
          <span className="eyebrow">{industryEngagement.eyebrow}</span>
          <h2>{industryEngagement.heading}</h2>
          <p>{industryEngagement.paragraphs[0]}</p>
          <p>{industryEngagement.paragraphs[1]}</p>
          <ul className="story-engage-partners">
            {industryPartners.map((p) => (
              <li key={p.name}>{p.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// 12. Awards & Recognition — redesigned in its own file, components/AwardsRecognitionSection.tsx, as
// a hub-and-spoke trust ecosystem (needs client-side hover state for the node/orb interactions).

// 13. Our Journey — redesigned in its own file, components/OurJourneySection.tsx, as a horizontal
// glowing roadmap with a click-to-open milestone panel (needs client-side state).

// 14. Our Belief — brand philosophy.
function OurBelief() {
  return (
    <section className="section theme-light story-belief">
      <div className="container">
        <div className="story-belief-inner" suppressHydrationWarning data-aos="fade-up">
          <div className="story-belief-statement">
            <span className="eyebrow">{belief.eyebrow}</span>
            <div className="story-belief-lines">
              {belief.lines.map((line) => (
                <p key={line} className={line === belief.highlight ? "story-belief-highlight" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <span className="story-belief-orb" aria-hidden="true" />
          <p className="story-belief-text">{belief.text}</p>
        </div>

        <div className="story-belief-card" suppressHydrationWarning data-aos="fade-up" data-aos-delay="120">
          <span className="story-belief-card-top" aria-hidden="true" />
          <span className="eyebrow">{belief.today.eyebrow}</span>
          <div className="story-belief-tagline">
            {belief.today.tagline.map((word, i) => (
              <span key={word}>
                {i > 0 && <span className="story-belief-tagline-divider" aria-hidden="true" />}
                {word}
              </span>
            ))}
          </div>
          <p className="story-belief-card-text">{belief.today.text}</p>
          <div className="story-belief-signature">
            <span className="story-belief-signature-label">{belief.today.signatureLabel}</span>
            <strong>{site.name}</strong>
            <span className="story-belief-signature-tagline">{belief.today.signatureTagline}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
