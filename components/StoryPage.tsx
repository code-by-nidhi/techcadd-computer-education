import Link from "next/link";
import { categories, coursesIn, getCourse } from "@/lib/courses";
import { stats } from "@/lib/content";
import { site } from "@/lib/site";
import {
  audiences,
  awardsRecognition,
  belief,
  differentiators,
  heroCopy,
  industryEngagement,
  industryPartners,
  journey,
  journeyYears,
  learningEcosystem,
  learningFlow,
  ourApproach,
  ourJourneyHeader,
  skillEcosystem,
  whoWeAre,
  whyItMatters,
} from "@/lib/storyData";
import SpotlightCard from "./SpotlightCard";
import DemoButton from "./DemoButton";
import CountUp from "./CountUp";
import JourneyTimeline from "./JourneyTimeline";
import { LeadCta, CtaStrip } from "./Sections";

// The redesigned /about page (app/about/page.tsx). Fourteen sections, each a small local component —
// see lib/storyData.ts for the copy that isn't already sourced from lib/courses.ts / lib/content.ts /
// lib/aboutData.ts elsewhere.
export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <WhoWeAre />
      <SkillEcosystem />
      <WhyItMatters />
      <WhoWeTeach />
      <LearningFlow />
      <WhyChooseUs />
      <TechDomains />
      <OurApproach />
      <IndustryEngagement />
      <AwardsRecognition />
      <OurJourney />
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
      <div className="container story-hero-inner">
        <div data-aos="fade-up">
          <span className="eyebrow eyebrow-light">{heroCopy.eyebrow}</span>
          <h1>{heroCopy.headline}</h1>
          <p>{heroCopy.text}</p>
          <div className="story-hero-actions">
            <DemoButton className="btn hero-btn">Book a free demo</DemoButton>
            <Link href="/courses" className="btn hero-btn-outline story-hero-outline">
              Explore courses
            </Link>
          </div>
        </div>
        <div className="story-hero-stats" data-aos="fade-up" data-aos-delay="100">
          {stats.map((s) => (
            <div key={s.label} className="story-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Learning Flow — Learn/Practice/Build/Grow as 4 premium glass cards with connecting arrows, over the
// same dark-navy gradient family as the rest of the page (own cyan accent — see globals.css).
function LearningFlow() {
  return (
    <section className="section theme-dark story-flow2">
      <span className="story-flow2-orb story-flow2-orb-1" aria-hidden="true" />
      <span className="story-flow2-orb story-flow2-orb-2" aria-hidden="true" />
      <div className="container">
        <div className="section-heading story-flow2-heading" data-aos="fade-up">
          <span className="eyebrow story-flow2-eyebrow">{learningFlow.eyebrow}</span>
          <h2>
            Learn <span className="story-flow2-hl">→</span> Practice <span className="story-flow2-hl">→</span> Build{" "}
            <span className="story-flow2-hl">→</span> Grow
          </h2>
        </div>
        <div className="story-flow2-grid">
          {learningFlow.steps.map((s, i) => (
            <div key={s.num} className="story-flow2-card" data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="story-flow2-num" aria-hidden="true">{s.num}</span>
              <span className="story-flow2-icon">
                <FlowIcon icon={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {i < learningFlow.steps.length - 1 && (
                <span className="story-flow2-arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="story-flow2-panel" data-aos="fade-up">
          <span className="story-flow2-badge">{learningFlow.badge}</span>
          <p>{learningFlow.text}</p>
        </div>
      </div>
    </section>
  );
}

function FlowIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    learn: "M2 8 12 3l10 5-10 5L2 8Zm5 3v5c0 1.7 2.2 3 5 3s5-1.3 5-3v-5",
    practice: "M4 5h16v10H4z M2 19h20 M9 8l-2 2 2 2 M15 8l2 2-2 2",
    build: "M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 16l9 5 9-5",
    grow: "M5 21c3-9 8-14 14-16-2 6-7 11-16 14Z M8 15l-3 6",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 2. Who We Are — two-column: story + real course chips on the left, a photo collage on the right.
function WhoWeAre() {
  return (
    <section className="section theme-dark story-who">
      <div className="container story-who-inner">
        <div data-aos="fade-up">
          <span className="eyebrow">Who we are</span>
          <h2 className="story-who-heading">
            Empowering Skills. Enabling Careers. <span className="story-who-highlight">Building the Future.</span>
          </h2>
          <p>
            Founded in {site.since} by{" "}
            <Link href="/about/founder" className="story-who-founder">
              Mr. Gourav Gupta
            </Link>
            , {whoWeAre.paragraphs[0]}
          </p>
          <p>{whoWeAre.paragraphs[1]}</p>

          <div className="story-who-teach">
            <h3>What we teach</h3>
            <p>{whoWeAre.teachIntro}</p>
            <div className="story-chip-cloud">
              {whoWeAre.featuredCourseSlugs.map((slug, i) => {
                const course = getCourse(slug);
                if (!course) return null;
                return (
                  <span key={slug} className="story-chip" data-aos="fade-up" data-aos-delay={(i % 8) * 30}>
                    {course.title}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="story-who-hq">Headquartered in {site.city}, Punjab.</p>
        </div>

        <div className="story-collage" data-aos="fade-up" data-aos-delay="120">
          <div className="story-collage-frame story-collage-main">
            <span className="story-collage-img" style={{ backgroundImage: "url(/about-menu/our-team.jpg)" }} />
            <span className="story-collage-caption">Team techcadd</span>
          </div>
          <div className="story-collage-row">
            <div className="story-collage-frame">
              <span className="story-collage-img" style={{ backgroundImage: "url(/about-menu/about-techcadd.jpg)" }} />
            </div>
            <div className="story-collage-frame">
              <span className="story-collage-img" style={{ backgroundImage: "url(/about-menu/mission-vision.jpg)" }} />
            </div>
          </div>
          <span className="story-collage-badge">
            <strong>Since {site.since}</strong>
          </span>
        </div>
      </div>
    </section>
  );
}

// 4. Skill Building Ecosystem — reading column on the left, an asymmetrical 3-image composition on
// the right, over a decorative dark-navy backdrop (glow orbs + faint grid — see globals.css).
function SkillEcosystem() {
  const [before, after] = skillEcosystem.paragraphs[0].split(skillEcosystem.highlight);
  return (
    <section className="section theme-light story-ecosystem">
      <span className="story-ecosystem-orb story-ecosystem-orb-blue" aria-hidden="true" />
      <span className="story-ecosystem-orb story-ecosystem-orb-yellow" aria-hidden="true" />
      <div className="container story-ecosystem-inner">
        <div className="story-ecosystem-content" data-aos="fade-up">
          <span className="eyebrow">{skillEcosystem.eyebrow}</span>
          <h2>{skillEcosystem.heading}</h2>
          <p>
            {before}
            <strong>{skillEcosystem.highlight}</strong>
            {after}
          </p>
          <p>{skillEcosystem.paragraphs[1]}</p>
        </div>
        <div className="story-ecosystem-images" data-aos="fade-up" data-aos-delay="120">
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

// 5. Why It Matters — future-ready framing, reusing the same feature-card treatment as the
// accreditations page's "Why Accreditation Matters" (components/AboutBlocks.tsx).
function WhyItMatters() {
  return (
    <section className="section theme-dark">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">Why it matters</span>
          <h2>Future-ready learning, not a one-time certificate</h2>
        </div>
        <div className="about-card-grid about-card-grid-3">
          {whyItMatters.map((c, i) => (
            <SpotlightCard key={c.title} className="about-feature-card" data-aos="fade-up" data-aos-delay={i * 80}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Who We Teach — five audience segments.
function WhoWeTeach() {
  return (
    <section className="section theme-light">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">Who we teach</span>
          <h2>Built for wherever you're starting from</h2>
        </div>
        <div className="grid grid-5 story-audience-grid">
          {audiences.map((a, i) => (
            <div key={a.title} className="story-audience-card" data-aos="fade-up" data-aos-delay={i * 60}>
              <span aria-hidden="true">{a.icon}</span>
              <strong>{a.title}</strong>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. What Makes techcadd Different — a 9-card premium feature showcase (own light background, distinct
// from the shared .theme-dark/.theme-light system: every 3rd card and the closing banner go dark on
// purpose, as isolated accents within an otherwise light section — see globals.css for .story-diff-*).
function WhyChooseUs() {
  return (
    <section className="section theme-light story-diff">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow story-diff-eyebrow">{differentiators.eyebrow}</span>
          <h2 className="story-diff-heading">{differentiators.heading}</h2>
        </div>
        <div className="story-diff-grid">
          {differentiators.points.map((p, i) => (
            <SpotlightCard
              key={p.title}
              className={`story-diff-card ${(i + 1) % 3 === 0 ? "story-diff-card-dark" : ""}`}
              data-aos="fade-up"
              data-aos-delay={i * 70}
            >
              <span className="story-diff-badge">
                <DiffIcon icon={p.icon} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="story-diff-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiffIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    briefcase: "M4 8h16v11H4z M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M4 13h16",
    laptop: "M5 5h14v9H5z M2 19h20 M9 8l-2 2 2 2 M15 8l2 2-2 2",
    cpu: "M8 3v3M12 3v3M16 3v3M8 18v3M12 18v3M16 18v3M3 8h3M3 12h3M3 16h3M18 8h3M18 12h3M18 16h3M7 7h10v10H7z",
    layers: "M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 16l9 5 9-5",
    users: "M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 12a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM2.5 20c.7-3 2.9-5 5.5-5s4.8 2 5.5 5M14.5 20c.5-2.3 2.1-4 4.4-4.4",
    compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M15 9l-2 6-6 2 2-6 6-2Z",
    rocket: "M5 21c3-9 8-14 14-16-2 6-7 11-16 14Z M8 15l-3 6",
    building: "M4 21V5l8-3 8 3v16M9 21v-6h6v6M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01",
    network: "M12 3v6M6 21v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M4 21h4v-3H4zM10 21h4v-3h-4zM16 21h4v-3h-4zM9 9h6l3 3M6 12l3-3",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
        <div className="section-heading story-ecosystem2-heading" data-aos="fade-up">
          <span className="eyebrow story-ecosystem2-eyebrow">{learningEcosystem.eyebrow}</span>
          <h2>{learningEcosystem.heading}</h2>
          <p>{learningEcosystem.text}</p>
        </div>
        <div className="story-ecosystem2-stats" data-aos="fade-up">
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
                data-aos="fade-up"
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

// 10. Our Approach — Relevance, Application, Growth.
function OurApproach() {
  const [before, after] = ourApproach.heading.split(ourApproach.highlight);
  return (
    <section className="section theme-light story-approach2">
      <span className="story-approach2-orb" aria-hidden="true" />
      <div className="container story-approach2-inner">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow story-approach2-eyebrow">{ourApproach.eyebrow}</span>
          <h2>
            {before}
            <span className="story-approach2-highlight">{ourApproach.highlight}</span>
            {after}
          </h2>
          <p>{ourApproach.text}</p>
        </div>
        <div className="story-approach2-list">
          {ourApproach.pillars.map((p, i) => (
            <div key={p.title} className="story-approach2-item" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="story-approach2-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 11. Industry Engagement — real, named partnerships.
function IndustryEngagement() {
  return (
    <section className="section theme-dark story-engage">
      <span className="story-engage-orb" aria-hidden="true" />
      <div className="container story-engage-inner">
        <div className="story-engage-media" data-aos="fade-up">
          <span className="story-engage-img" style={{ backgroundImage: `url(${industryEngagement.image})` }} />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
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

// 12. Awards & Recognition — condensed recap of the real certification cards, linking to the full page
// (see app/about/accreditations-awards) instead of duplicating all that detail here.
function AwardsRecognition() {
  return (
    <section className="section theme-light">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">{awardsRecognition.eyebrow}</span>
          <h2>{awardsRecognition.heading}</h2>
          <p>{awardsRecognition.text}</p>
        </div>
        <div className="story-awards2-grid">
          {awardsRecognition.cards.map((c, i) => (
            <SpotlightCard key={c.title} className="story-awards2-card" data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="story-awards2-icon">
                <AwardIcon icon={c.icon} />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
        <p className="story-awards2-footnote" data-aos="fade-up">
          {awardsRecognition.footnote}
          <br />
          <Link href="/about/accreditations-awards" className="link-arrow">
            See all accreditations & awards →
          </Link>
        </p>
      </div>
    </section>
  );
}

function AwardIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    shield: "M12 3 4 6.5V12c0 4.8 3.4 8.6 8 9.9 4.6-1.3 8-5.1 8-9.9V6.5L12 3ZM8.5 12l2.5 2.5L16 9",
    link: "M9 15 15 9M10 6l1.5-1.5a3.5 3.5 0 0 1 5 5L15 11M14 18l-1.5 1.5a3.5 3.5 0 0 1-5-5L9 13",
    cap: "M2 8 12 3l10 5-10 5L2 8Zm5 3v5c0 1.7 2.2 3 5 3s5-1.3 5-3v-5",
    spark: "M12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9Z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 13. Our Journey — a horizontal "one story at a time" timeline of real, dated milestones
// (components/JourneyTimeline.tsx): a single large card driven by the active year, not a card per year.
function OurJourney() {
  return (
    <section className="section theme-dark story-journey2">
      <span className="story-journey2-orb story-journey2-orb-1" aria-hidden="true" />
      <span className="story-journey2-orb story-journey2-orb-2" aria-hidden="true" />
      <div className="story-journey2-grid-bg" aria-hidden="true" />
      <span className="story-journey2-particle" style={{ top: "18%", left: "12%" }} aria-hidden="true" />
      <span className="story-journey2-particle" style={{ top: "70%", left: "22%", animationDelay: "1.4s" }} aria-hidden="true" />
      <span className="story-journey2-particle" style={{ top: "30%", left: "78%", animationDelay: "2.8s" }} aria-hidden="true" />
      <span className="story-journey2-particle" style={{ top: "80%", left: "85%", animationDelay: "0.6s" }} aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow story-journey2-eyebrow">{ourJourneyHeader.eyebrow}</span>
          <h2>{ourJourneyHeader.heading}</h2>
        </div>

        <div className="story-journey2-stats" data-aos="fade-up">
          {ourJourneyHeader.statsStrip.map((s) => (
            <div key={s.label} className="story-journey2-stat">
              <strong>
                <CountUp value={s.value} />
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <JourneyTimeline years={journeyYears} milestones={journey} />
      </div>
    </section>
  );
}

// 14. Our Belief — brand philosophy.
function OurBelief() {
  return (
    <section className="section theme-light story-belief">
      <div className="container">
        <div className="story-belief-inner" data-aos="fade-up">
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

        <div className="story-belief-card" data-aos="fade-up" data-aos-delay="120">
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
