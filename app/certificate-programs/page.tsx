import type { Metadata } from "next";
import { courses } from "@/lib/courses";
import { included, programDurations } from "@/lib/content";
import { CourseCard, CtaBanner, PageHero, SectionHeading } from "@/components/Sections";

export const metadata: Metadata = { title: "Certificate Programs" };

const diplomaSlugs = ["dca", "adca", "computerised-accounting-diploma", "graphic-design", "digital-marketing"];

export default function CertificateProgramsPage() {
  const diplomas = diplomaSlugs.map((s) => courses.find((c) => c.slug === s)!);

  return (
    <>
      <PageHero
        crumb="Certificate Programs"
        title="Certificate & Diploma Programs"
        text="Industry-recognised certificates, verifiable online, with internship letters on longer programs."
      />

      <section className="section anchor" id="durations">
        <div className="container">
          <SectionHeading eyebrow="Program formats" title="Pick a duration that fits you" />
          <div className="grid grid-4">
            {programDurations.map((d) => (
              <div key={d.title} className="card duration-card">
                <strong>{d.title}</strong>
                <span>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Diplomas" title="Career diploma programs" />
          <div className="grid grid-3">
            {diplomas.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Included" title="Every program includes" />
          <div className="grid grid-5">
            {included.map((m, i) => (
              <div key={m.title} className="card included-card">
                <span className="step-num">{i + 1}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
