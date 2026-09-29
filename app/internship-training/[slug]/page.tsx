import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categorySlug, Category, Course, courses, coursesIn, getCategory, getCategoryBySlug, getCourse } from "@/lib/courses";
import { included, faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { CourseCard, CtaBanner, FaqList } from "@/components/Sections";
import EnquiryForm from "@/components/EnquiryForm";
import WhyUs from "@/components/WhyUs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // basic-computer-course-in-jalandhar has its own page
  // (app/internship-training/basic-computer-course-in-jalandhar). Category landing pages (see the
  // branch below) get their own "-courses-in-jalandhar" slug (lib/courses.ts's categorySlug) rather
  // than the bare category id, so they can never collide with a course's own slug.
  return [
    ...courses.filter((c) => c.slug !== "basic-computer-course-in-jalandhar").map((c) => ({ slug: c.slug })),
    ...categories.map((c) => ({ slug: categorySlug(c.id) })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (course) {
    const title = `${course.title} Course in Punjab | ${site.name}`;
    return {
      title,
      description: course.summary,
      alternates: { canonical: `/internship-training/${slug}` },
      openGraph: { title, description: course.summary, url: `/internship-training/${slug}`, type: "website" },
    };
  }
  const cat = getCategoryBySlug(slug);
  if (cat) {
    return {
      title: `${cat.name} Courses`,
      description: cat.blurb,
      alternates: { canonical: `/internship-training/${slug}` },
      openGraph: { title: `${cat.name} Courses`, description: cat.blurb, url: `/internship-training/${slug}`, type: "website" },
    };
  }
  return {};
}

export default async function InternshipTrainingPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (course) return <CourseDetail course={course} />;
  const cat = getCategoryBySlug(slug);
  if (cat) return <CategoryLanding cat={cat} />;
  notFound();
}

function CourseDetail({ course }: { course: Course }) {
  const cat = getCategory(course.category);
  const related = coursesIn(course.category).filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs">
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> /{" "}
            <Link href={`/internship-training/${categorySlug(cat.id)}`}>{cat.name}</Link> / <span>{course.title}</span>
          </nav>
          <h1>{course.title} Course in Punjab</h1>
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
            <h2>Course overview</h2>
            <p>{course.summary}</p>
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

            <h2>Tools covered</h2>
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

      <WhyUs />

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

      <section className="section">
        <div className="container narrow">
          <div className="section-heading">
            <span className="eyebrow">FAQs</span>
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function CategoryLanding({ cat }: { cat: Category }) {
  const list = coursesIn(cat.id);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="crumbs">
            <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> / <span>{cat.name}</span>
          </nav>
          <h1>{cat.icon} {cat.name} Courses in {site.city}</h1>
          <p>{cat.blurb}</p>
          <div className="hero-badges">
            <span>📚 {list.length} Courses</span>
            <span>📜 Certificate included</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {list.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
