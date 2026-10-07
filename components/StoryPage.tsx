import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Link2, ShieldCheck, Sparkles } from "lucide-react";
import { getCourse } from "@/lib/courses";
import { stats } from "@/lib/content";
import { site } from "@/lib/site";
import {
  audiences,
  awardsRecognition,
  belief,
  differentiators,
  heroCopy,
  howWeTeach,
  industryEngagement,
  industryPartners,
  journey,
  learningEcosystem,
  learningFlow,
  ourApproach,
  ourJourneyHeader,
  preparingLearners,
  skillEcosystem,
  whoWeAre,
  whoWeTeach,
} from "@/lib/storyData";
import { LeadCta, CtaStrip } from "./Sections";
import HeroPattern from "./HeroPattern";
import DomainsExplorer from "./DomainsExplorer";

// The /about page (app/about/page.tsx), laid out after techcaddjalandhar.com/about: a dark hero with
// a stat row, then alternating subtle / panel (dark navy) / white sections — see the ".rf-" block in
// globals.css, which this page shares with components/MissionVisionPage.tsx. Copy lives in
// lib/storyData.ts; course lists come straight from lib/courses.ts.
export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <WhoWeAre />
      <SkillEcosystem />
      <WhyItMatters />
      <WhoWeTeach />
      <LearningFlow />
      <Difference />
      <HowWeTeach />
      <Approach />
      <Domains />
      <Journey />
      <IndustryEngagement />
      <Belief />
      <Awards />
      <LeadCta dark />
      <CtaStrip />
    </>
  );
}

// Section heading block shared by every section below.
function Head({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`rf-head ${center ? "rf-head-center" : ""}`} suppressHydrationWarning data-aos="fade-up">
      {eyebrow && <p className="rf-eyebrow">{eyebrow}</p>}
      <h2 className="rf-title">{title}</h2>
      {text && <p className="rf-lead">{text}</p>}
    </div>
  );
}

function Shot({ src, alt, tag, className = "" }: { src: string; alt: string; tag?: string; className?: string }) {
  return (
    <div className={`rf-shot ${className}`}>
      <span className="rf-shot-img" role="img" aria-label={alt} style={{ backgroundImage: `url(${src})` }} />
      {tag && <span className="rf-shot-tag">{tag}</span>}
    </div>
  );
}

// 1. Hero — dark, headline with dimmed connecting words, real stats underneath.
function StoryHero() {
  return (
    <section className="rf-hero">
      <HeroPattern variant="grid" />
      <div className="container rf-hero-inner">
        <span className="rf-pill">{heroCopy.eyebrow}</span>
        <h1 className="rf-hero-title">
          {heroCopy.headlineParts.map((part) =>
            part.strong ? <span key={part.text}>{part.text}</span> : part.text
          )}
        </h1>
        <dl className="rf-hero-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// 2. Who we are — story + course chips on the left, photo grid on the right.
function WhoWeAre() {
  return (
    <section className="rf-sec rf-subtle">
      <div className="container">
        <Head
          eyebrow="Who we are"
          title={
            <>
              Empowering Skills. Enabling Careers. <span className="rf-accent">Building the Future.</span>
            </>
          }
        />
        <div className="rf-split rf-split-wide">
          <div suppressHydrationWarning data-aos="fade-up">
            <div className="rf-body">
              <p>
                Founded in {site.since} by{" "}
                <Link href="/about/founder" className="rf-link">
                  Mr. Gourav Gupta
                </Link>
                , {whoWeAre.paragraphs[0]}
              </p>
              <p>{whoWeAre.paragraphs[1]}</p>
            </div>
            <h3 className="rf-sub">What we teach</h3>
            <p className="rf-small">{whoWeAre.teachIntro}</p>
            <ul className="rf-chips">
              {whoWeAre.featuredCourseSlugs.map((slug) => {
                const course = getCourse(slug);
                return course ? <li key={slug}>{course.title}</li> : null;
              })}
            </ul>
            <p className="rf-hq">Headquartered in {site.city}, Punjab.</p>
          </div>
          <div className="rf-photo-grid" suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            <Shot src="/illustrations/campus.svg" alt="Illustration of the techcadd campus building" tag="techcadd campus" className="rf-shot-wide" />
            <Shot src="/illustrations/classroom.svg" alt="Illustration of a trainer teaching a classroom of learners" className="rf-shot-square" />
            <Shot src="/illustrations/lab.svg" alt="Illustration of learners working at computers in a lab" className="rf-shot-square" />
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. More than training — dark panel, copy beside two offset photos.
function SkillEcosystem() {
  const [first, second] = skillEcosystem.paragraphs;
  const i = first.indexOf(skillEcosystem.highlight);
  return (
    <section className="rf-sec rf-panel rf-panel-grid">
      <div className="container">
        <div className="rf-split rf-split-center">
          <div suppressHydrationWarning data-aos="fade-up">
            <p className="rf-eyebrow">{skillEcosystem.eyebrow}</p>
            <h2 className="rf-title">{skillEcosystem.heading}</h2>
            <div className="rf-body">
              <p>
                {i === -1 ? (
                  first
                ) : (
                  <>
                    {first.slice(0, i)}
                    <strong>{skillEcosystem.highlight}</strong>
                    {first.slice(i + skillEcosystem.highlight.length)}
                  </>
                )}
              </p>
              <p>{second}</p>
            </div>
          </div>
          <div className="rf-offset-photos" suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            <Shot src="/illustrations/lab.svg" alt="Illustration of learners working at computers in a lab" />
            <Shot src="/illustrations/seminar.svg" alt="Illustration of a speaker presenting to an audience" />
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Why it matters — centred copy with a highlighted closing statement.
function WhyItMatters() {
  return (
    <section className="rf-sec">
      <div className="container">
        <div className="rf-head rf-head-center" suppressHydrationWarning data-aos="fade-up">
          <p className="rf-eyebrow">{preparingLearners.eyebrow}</p>
          <h2 className="rf-title">{preparingLearners.heading}</h2>
          <div className="rf-body rf-body-center">
            {preparingLearners.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <p className="rf-callout" suppressHydrationWarning data-aos="fade-up">
          {preparingLearners.callout}
        </p>
      </div>
    </section>
  );
}

// 5. Who we teach — dark panel over a classroom photo, six numbered glass cards.
function WhoWeTeach() {
  return (
    <section className="rf-sec rf-panel rf-panel-photo">
      <span className="rf-panel-photo-img" style={{ backgroundImage: "url(/illustrations/seminar.svg)" }} aria-hidden="true" />
      <div className="container">
        <Head eyebrow={whoWeTeach.eyebrow} title={whoWeTeach.heading} text={whoWeTeach.text} />
        <ul className="rf-glass-grid">
          {audiences.map((a, i) => (
            <li key={a.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="rf-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// 6. Learn → Practice → Build → Grow.
function LearningFlow() {
  return (
    <section className="rf-sec rf-subtle">
      <div className="container">
        <div className="rf-head rf-head-center" suppressHydrationWarning data-aos="fade-up">
          <p className="rf-eyebrow">{learningFlow.eyebrow}</p>
          <h2 className="rf-title rf-flow-title">
            {learningFlow.steps.map((step, i) => (
              <span key={step.title}>
                {i > 0 && <ArrowRight className="rf-flow-arrow" aria-hidden="true" />}
                {step.title}
              </span>
            ))}
          </h2>
        </div>
        <ol className="rf-steps">
          {learningFlow.steps.map((step, i) => (
            <li key={step.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 110}>
              <span className="rf-step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="rf-note" suppressHydrationWarning data-aos="fade-up">
          {learningFlow.text}
        </p>
      </div>
    </section>
  );
}

// 7. What makes techcadd different — dark panel, ticked list.
function Difference() {
  return (
    <section className="rf-sec rf-panel rf-panel-dots">
      <div className="container">
        <Head eyebrow={differentiators.eyebrow} title={differentiators.heading} />
        <ul className="rf-checks">
          {differentiators.points.map((point, i) => (
            <li key={point.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
              <Check className="rf-check-icon" aria-hidden="true" />
              <div>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// How we teach — the five steps of a session beside a "what a batch looks like" card.
function HowWeTeach() {
  const h = howWeTeach;
  return (
    <section className="rf-sec" id="how-we-teach">
      <div className="container">
        <Head
          eyebrow={h.eyebrow}
          title={
            <>
              {h.heading} <span className="rf-accent">{h.headingAccent}</span>
            </>
          }
          text={h.text}
        />
        <div className="rf-teach">
          <ol className="rf-teach-steps">
            {h.steps.map((step, i) => (
              <li key={step.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="rf-teach-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rf-teach-card" suppressHydrationWarning data-aos="fade-up" data-aos-delay="160">
            <Shot src={h.card.image} alt={h.card.imageAlt} tag={h.card.tag} className="rf-teach-shot" />
            <h3>{h.card.heading}</h3>
            <dl>
              {h.card.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="rf-teach-note">{h.card.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 8. What you can learn — a clickable category list beside a panel that swaps to the picked
// category (components/DomainsExplorer.tsx).
function Domains() {
  return (
    <section className="rf-sec">
      <div className="container">
        <Head eyebrow={learningEcosystem.eyebrow} title={learningEcosystem.heading} text={learningEcosystem.text} />
        <DomainsExplorer />
      </div>
    </section>
  );
}

// 9. Our approach — three principles on a dark panel.
function Approach() {
  return (
    <section className="rf-sec rf-panel">
      <div className="container">
        <Head eyebrow={ourApproach.eyebrow} title={ourApproach.heading} text={ourApproach.text} />
        <ol className="rf-pillars">
          {ourApproach.pillars.map((pillar, i) => (
            <li key={pillar.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 110}>
              <p className="rf-num">{String(i + 1).padStart(2, "0")}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// 10. Industry engagement — photo beside copy and the named partner institutions.
function IndustryEngagement() {
  return (
    <section className="rf-sec rf-subtle">
      <div className="container">
        <div className="rf-split rf-split-center">
          <div suppressHydrationWarning data-aos="fade-up">
            <Shot src="/illustrations/industry.svg" alt="Illustration of the campus linked to an office tower" className="rf-shot-tall" />
          </div>
          <div suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
            <p className="rf-eyebrow">{industryEngagement.eyebrow}</p>
            <h2 className="rf-title rf-title-sm">{industryEngagement.heading}</h2>
            <div className="rf-body">
              {industryEngagement.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="rf-chips">
              {industryPartners.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const AWARD_ICONS: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck,
  link: Link2,
  cap: GraduationCap,
  spark: Sparkles,
};

// 11. Awards, recognition & accreditation.
function Awards() {
  return (
    <section className="rf-sec">
      <div className="container">
        <Head eyebrow={awardsRecognition.eyebrow} title={awardsRecognition.heading} text={awardsRecognition.text} />
        <ul className="rf-award-grid">
          {awardsRecognition.cards.map((card, i) => {
            const Icon = AWARD_ICONS[card.icon] ?? ShieldCheck;
            return (
              <li key={card.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 2) * 90}>
                <span className="rf-award-icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="rf-note rf-note-xs">{awardsRecognition.footnote}</p>
      </div>
    </section>
  );
}

// 12. Our journey — a centre-line timeline, milestones alternating left and right.
function Journey() {
  return (
    <section className="rf-sec rf-panel rf-panel-dots">
      <div className="container">
        <Head eyebrow={ourJourneyHeader.eyebrow} title={ourJourneyHeader.heading} text={ourJourneyHeader.text} center />
        <ol className="rf-timeline">
          {journey.map((item, i) => (
            <li key={item.year} className={i % 2 === 1 ? "is-right" : ""} suppressHydrationWarning data-aos="fade-up">
              <span className="rf-timeline-dot" aria-hidden="true" />
              <div className="rf-timeline-item">
                <div className="rf-year" aria-hidden="true">
                  <span>{item.year.slice(0, 2)}</span>
                  <strong>{item.year.slice(2)}</strong>
                </div>
                <div>
                  <h3>
                    {item.year}: {item.title}
                  </h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// 13. Our belief + "techcadd today" card.
function Belief() {
  return (
    <section className="rf-sec rf-panel">
      <div className="container">
        <p className="rf-eyebrow">{belief.eyebrow}</p>
        <div className="rf-split rf-belief" suppressHydrationWarning data-aos="fade-up">
          <h2 className="rf-belief-lines">
            {belief.lines.map((line) => (
              <span key={line} className={line === belief.highlight ? "rf-accent" : ""}>
                {line}
              </span>
            ))}
          </h2>
          <div className="rf-body rf-belief-text">
            <p>{belief.text}</p>
          </div>
        </div>

        <div className="rf-today" suppressHydrationWarning data-aos="fade-up">
          <span className="rf-today-bar" aria-hidden="true" />
          <div className="rf-today-inner">
            <p className="rf-eyebrow">{belief.today.eyebrow}</p>
            <p className="rf-today-tagline">
              {belief.today.tagline.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
            <p className="rf-today-text">{belief.today.text}</p>
            <div className="rf-today-sign">
              <p>{belief.today.signatureLabel}</p>
              <strong>{site.name}</strong>
              <span>{belief.today.signatureTagline}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
