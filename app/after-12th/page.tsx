import type { Metadata } from "next";
import { getCourse } from "@/lib/courses";
import { after12th } from "@/lib/content";
import { CourseCard, CtaBanner, PageHero } from "@/components/Sections";

export const metadata: Metadata = { title: "Courses After 12th" };

export default function After12thPage() {
  return (
    <>
      <PageHero
        crumb="After 12th"
        title="Best Computer Courses After 12th"
        text="Not sure what to do after 12th? Choose a job-oriented course based on your stream."
      />

      {after12th.map((group, i) => (
        <section key={group.stream} className={`section ${i % 2 ? "section-alt" : ""}`}>
          <div className="container">
            <div className="section-heading left">
              <span className="eyebrow">For {group.stream} students</span>
              <h2>{group.stream}</h2>
            </div>
            <div className="grid grid-4">
              {group.courses.map((slug) => (
                <CourseCard key={slug} course={getCourse(slug)!} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBanner />
    </>
  );
}
