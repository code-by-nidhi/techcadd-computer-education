import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, coursesIn, getCategory, getCourse } from "@/lib/courses";
import { included } from "@/lib/content";
import { site } from "@/lib/site";
import { CourseCard, CtaBanner } from "@/components/Sections";
import EnquiryForm from "@/components/EnquiryForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // basic-computer-course has its own page (app/courses/basic-computer-course).
  return courses.filter((c) => c.slug !== "basic-computer-course").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return { title: `${course.title} Course in ${site.city}`, description: course.summary };
}

export default async function CoursePage({ params }: Props) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  const cat = getCategory(course.category);
  const related = coursesIn(course.category).filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs">
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> /{" "}
            <Link href={`/courses#${cat.id}`}>{cat.name}</Link> / <span>{course.title}</span>
          </nav>
          <h1>{course.title} Course in {site.city}</h1>
          <p>{course.summary}</p>
          <div className="hero-badges">
            <span>⏱ {course.duration}</span>
            <span>🎯 {course.level}</span>
            <span>📜 Certificate included</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <h2>Course highlights</h2>
            <ul className="ticks">
              {course.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <h2>Syllabus</h2>
            <ol className="syllabus">
              {course.modules.map((m, i) => (
                <li key={m}>
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  {m}
                </li>
              ))}
            </ol>

            <h2>Software covered</h2>
            <div className="tags">
              {course.tools.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <h2>Career opportunities</h2>
            <div className="tags">
              {course.careers.map((c) => (
                <span key={c} className="tag tag-accent">{c}</span>
              ))}
            </div>

            <h2>What&apos;s included</h2>
            <ul className="ticks">
              {included.map((m) => (
                <li key={m.title}>
                  <strong>{m.title}</strong> — {m.text}
                </li>
              ))}
            </ul>
          </div>

          <aside className="sticky">
            <EnquiryForm defaultCourse={course.title} />
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-heading left">
              <span className="eyebrow">{cat.icon} {cat.name}</span>
              <h2>Related courses</h2>
            </div>
            <div className="grid grid-3">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
