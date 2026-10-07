import Link from "next/link";
import { Course, getCategory } from "@/lib/courses";
import { faqs as allFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import DemoButton from "./DemoButton";
import ArrowIcon from "./ArrowIcon";
import LeadForm from "./LeadForm";
import { Magnetic } from "./motion/Reveal";
import HeroPattern, { type HeroPatternVariant } from "./HeroPattern";

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    // Every section's heading eases in as it scrolls up (see ScrollReveal)
    <div className="section-heading" suppressHydrationWarning data-aos="fade-up">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PageHero({
  title,
  text,
  crumb,
  className,
  pattern = "dots",
  art,
}: {
  title: string;
  text?: string;
  crumb: string;
  className?: string;
  pattern?: HeroPatternVariant;
  /** Optional illustration (public/illustrations) shown to the right of the copy. */
  art?: { src: string; alt: string };
}) {
  return (
    <section className={`page-hero${className ? ` ${className}` : ""}`}>
      <HeroPattern variant={pattern} />
      <div className={`container ${art ? "page-hero-split" : ""}`}>
        <div>
          <nav className="crumbs">
            <Link href="/">Home</Link> / <span>{crumb}</span>
          </nav>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
        {art && <span className="hero-art" role="img" aria-label={art.alt} style={{ backgroundImage: `url(${art.src})` }} />}
      </div>
    </section>
  );
}

// Dark hero for the course listing pages (Courses, Certificate Programs, After 12th).
// `highlight` is shown in yellow after the title, like the poster's "Advanced IT Skills".
export function ListingHero({
  badge,
  title,
  highlight,
  text,
  pattern = "dots",
}: {
  badge: string;
  title: string;
  highlight?: string;
  text: string;
  pattern?: HeroPatternVariant;
}) {
  return (
    <section className="lx-hero">
      <HeroPattern variant={pattern} />
      <div className="container lx-hero-inner">
        <span className="lx-badge">{badge}</span>
        <h1>
          {title}
          {highlight && <span className="lx-hl"> {highlight}</span>}
        </h1>
        <p>{text}</p>
        <DemoButton className="lx-demo">
          Book a free demo class
          <span aria-hidden="true">
            <ArrowIcon />
          </span>
        </DemoButton>
      </div>
    </section>
  );
}

// Slim closing call-to-action used under the course listings.
export function CtaStrip({ dark }: { dark?: boolean } = {}) {
  return (
    <section className={`lx-cta ${dark ? "theme-dark" : ""}`}>
      <div className="container lx-cta-inner">
        <div>
          <h3>Ready to start your career in tech?</h3>
          <p>Book a free demo class and see the lab before you decide.</p>
        </div>
        <div className="lx-cta-actions">
          <Magnetic>
            <DemoButton className="lx-cta-primary">Book Free Demo</DemoButton>
          </Magnetic>
          <Magnetic>
            <a href={site.phoneHref} className="lx-cta-phone">
              📞 {site.phone}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const cat = getCategory(course.category);
  return (
    <Link href={`/courses/${course.slug}`} className="card course-card" suppressHydrationWarning data-aos="fade-up">
      <span className="chip">
        {cat.icon} {cat.name}
      </span>
      <h3>{course.title}</h3>
      <p>{course.summary}</p>
      <div className="course-meta">
        <span>⏱ {course.duration}</span>
        <span>🎯 {course.level}</span>
      </div>
      <span className="link-arrow">View course →</span>
    </Link>
  );
}

export function FaqList({ items = allFaqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <details key={f.q} className="faq" suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 50}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

// Bigger conversion section for pages that want the phone-capture form + call pill instead of CtaBanner
// (see finalCta on lib/aboutData.ts entries). Follow it with <CtaStrip /> for the closing bar underneath.
export function LeadCta({ dark }: { dark?: boolean } = {}) {
  return (
    <section className={`section lead-cta ${dark ? "theme-dark" : ""}`}>
      <span className="lead-cta-ring lead-cta-ring-1" aria-hidden="true" />
      <span className="lead-cta-ring lead-cta-ring-2" aria-hidden="true" />
      <div className="container lead-cta-inner" suppressHydrationWarning data-aos="fade-up">
        <span className="eyebrow">Ready to get started?</span>
        <h2>Start building your career today.</h2>
        <p>
          Talk to a counsellor today. One call is usually enough to know which track fits your degree, your
          schedule and the job you want.
        </p>
        <div className="lead-form-row">
          <LeadForm />
        </div>
        <Magnetic>
          <a href={site.phoneHref} className="lead-call-btn">
            <span className="lead-call-icon" aria-hidden="true">📞</span>
            <span>
              <small>Call now</small>
              <strong>{site.phone}</strong>
            </span>
          </a>
        </Magnetic>
        <ul className="lead-ticks">
          <li>Free career counselling</li>
          <li>No registration fee</li>
          <li>Placement support included</li>
        </ul>
      </div>
    </section>
  );
}

export function CtaBanner({ dark }: { dark?: boolean } = {}) {
  return (
    <section className={`section ${dark ? "theme-dark" : ""}`}>
      <div className="container">
        <div className="cta-banner" suppressHydrationWarning data-aos="zoom-in">
          <div>
            <span className="eyebrow eyebrow-light">Ready to get started?</span>
            <h2>Start building your career today.</h2>
            <p>Talk to a counsellor — one call is usually enough to know which course fits your goal.</p>
            <ul className="ticks ticks-light">
              <li>Free career counselling</li>
              <li>No registration fee</li>
              <li>Placement support included</li>
            </ul>
          </div>
          <div className="cta-actions">
            <a href={site.phoneHref} className="btn btn-light">
              Call now {site.phone}
            </a>
            <Link href="/contact" className="btn btn-outline-light">
              Book Free Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
