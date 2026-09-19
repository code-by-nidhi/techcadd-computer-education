import type { Metadata } from "next";
import { categories, coursesIn } from "@/lib/courses";
import { CourseCard, CtaBanner, PageHero } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Courses",
  description: "Basic Computer, Accounting, CAD/CAM, Digital Marketing and Graphic Design courses with certification and placement support.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        crumb="Courses"
        title="All Courses"
        text="Basic Computer, Accounting, CAD/CAM, Digital Marketing and Graphic Design — practical training with certification."
      />

      <div className="container category-tabs">
        {categories.map((c) => (
          <a key={c.id} href={`#${c.id}`} className="tag">
            {c.icon} {c.name}
          </a>
        ))}
      </div>

      {categories.map((cat, i) => (
        <section key={cat.id} id={cat.id} className={`section anchor ${i % 2 ? "section-alt" : ""}`}>
          <div className="container">
            <div className="section-heading left">
              <span className="eyebrow">{cat.icon} {cat.name}</span>
              <h2>{cat.name} Courses</h2>
              <p>{cat.blurb}</p>
            </div>
            <div className="grid grid-3">
              {coursesIn(cat.id).map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBanner />
    </>
  );
}
