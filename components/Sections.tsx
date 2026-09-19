import Link from "next/link";
import { Course, getCategory } from "@/lib/courses";
import { faqs as allFaqs } from "@/lib/content";
import { site } from "@/lib/site";

export function SectionHeading({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
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

export function CourseCard({ course }: { course: Course }) {
  const cat = getCategory(course.category);
  return (
    <Link href={`/courses/${course.slug}`} className="card course-card">
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
      {items.map((f) => (
        <details key={f.q} className="faq">
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
        <div className="cta-banner">
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
