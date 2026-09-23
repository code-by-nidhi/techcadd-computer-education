import Link from "next/link";
import { Course, getCategory } from "@/lib/courses";
import { faqs as allFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import DemoButton from "./DemoButton";
import ArrowIcon from "./ArrowIcon";

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    // Every section's heading eases in as it scrolls up (see ScrollReveal)
    <div className="section-heading" data-aos="fade-up">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PageHero({ title, text, crumb }: { title: string; text?: string; crumb: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav className="crumbs">
          <Link href="/">Home</Link> / <span>{crumb}</span>
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

// Dark hero for the course listing pages (Courses, Certificate Programs, After 12th).
// `highlight` is shown in yellow after the title, like the poster's "Advanced IT Skills".
export function ListingHero({ badge, title, highlight, text }: { badge: string; title: string; highlight?: string; text: string }) {
  return (
    <section className="lx-hero">
      <div className="lx-hero-dots" aria-hidden="true" />
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
export function CtaStrip() {
  return (
    <section className="lx-cta">
      <div className="container lx-cta-inner">
        <div>
          <h3>Ready to start your career?</h3>
          <p>Book a free demo class and see the lab before you decide.</p>
        </div>
        <div className="lx-cta-actions">
          <DemoButton className="lx-cta-primary">Book Free Demo</DemoButton>
          <a href={site.phoneHref} className="lx-cta-phone">
            📞 {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const cat = getCategory(course.category);
  return (
    <Link href={`/courses/${course.slug}`} className="card course-card" data-aos="fade-up">
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
        <details key={f.q} className="faq" data-aos="fade-up" data-aos-delay={i * 50}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBanner() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner" data-aos="zoom-in">
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
