"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { Award, Briefcase, CheckCircle2, GraduationCap, ShieldCheck } from "lucide-react";
import type { Course } from "@/lib/courses";
import { getCategory } from "@/lib/courses";
import { included, stats, steps, testimonials } from "@/lib/content";
import { whyItMatters } from "@/lib/storyData";
import { logos } from "@/lib/listing";
import { referenceContent, type ReferenceTestimonial } from "@/lib/referenceContent";
import { CourseCard, CtaBanner, FaqList } from "./Sections";
import EnquiryForm from "./EnquiryForm";
import DemoButton from "./DemoButton";
import WhyUs from "./WhyUs";
import { Magnetic, MotionCounter, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";

// One shared template for every course detail page — see app/internship-training/[slug]/page.tsx.
// Built from this repo's REAL course data (lib/courses.ts) plus the same real site-wide facts used
// elsewhere (lib/content.ts's stats/steps/included/testimonials, lib/storyData.ts's whyItMatters).
// 12 of the 24 courses additionally get real pricing/salary/projects/testimonials sourced straight
// from techcaddjalandhar.com's own live pages (lib/referenceContent.ts) — the other 12 (including the
// 10 with no real reference page at all) keep the plain real-data-only sections, no invented numbers.
export default function CourseDetailTemplate({
  course,
  cat,
  related,
}: {
  course: Course;
  cat: ReturnType<typeof getCategory>;
  related: Course[];
}) {
  const logo = logos[course.slug];
  const ref = referenceContent[course.slug];
  const fallbackTestimonial = testimonials.find((t) => t.course === course.title);
  const courseTestimonials: ReferenceTestimonial[] = ref?.testimonials ?? (fallbackTestimonial ? [fallbackTestimonial] : []);

  return (
    <>
      <Hero course={course} cat={cat} logo={logo} tagline={ref?.tagline} />
      {ref && <Pricing pricing={ref.pricing} />}
      <TrustStats />
      <Overview course={course} />
      <LearningProcess />
      <Certification />
      <WhyUs />
      <CareerScope course={course} />
      {ref && <Salary salaryFresher={ref.salaryFresher} salaryGrowth={ref.salaryGrowth} />}
      {ref && <Projects projects={ref.projects} courseTitle={course.title} />}
      {courseTestimonials.length > 0 && <Testimonials items={courseTestimonials} />}
      <EnquirySection course={course} />
      <RelatedCourses courses={related} cat={cat} />
      <FaqSection />
      <CtaBanner />
    </>
  );
}

function Hero({
  course,
  cat,
  logo,
  tagline,
}: {
  course: Course;
  cat: ReturnType<typeof getCategory>;
  logo?: string;
  tagline?: string;
}) {
  return (
    <section className="page-hero cdt-hero">
      <div className="container cdt-hero-inner">
        <div>
          <Reveal>
            <nav className="crumbs">
              <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> /{" "}
              <Link href={`/internship-training/${cat.id}-courses-in-jalandhar`}>{cat.name}</Link> /{" "}
              <span>{course.title}</span>
            </nav>
          </Reveal>
          <ScaleIn className="eyebrow eyebrow-light" delay={0.1}>
            {cat.icon} {cat.name}
          </ScaleIn>
          <h1>
            <RevealHeading text={`${course.title} Course in Punjab`} delay={0.2} />
          </h1>
          <Reveal delay={0.4}>
            <p>{tagline ?? course.summary}</p>
          </Reveal>
          <Reveal delay={0.5} className="hero-badges">
            <span>⏱ {course.duration}</span>
            <span>🎯 {course.level}</span>
            <span>📜 Certificate included</span>
            <span>🎓 Internship letter</span>
          </Reveal>
          <Reveal delay={0.6} className="cdt-hero-actions">
            <Magnetic>
              <DemoButton className="btn hero-btn">Book a free demo</DemoButton>
            </Magnetic>
            <Magnetic>
              <DemoButton className="btn hero-btn-outline">Talk to a counsellor</DemoButton>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={30} className="cdt-hero-visual">
          <div className="cdt-hero-card">
            {logo ? (
              <Image src={`/logos/${logo}.png`} alt="" width={96} height={96} />
            ) : (
              <span className="cdt-hero-glyph" aria-hidden="true">
                {cat.icon}
              </span>
            )}
            <strong>{course.title}</strong>
            <span>{cat.name}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing({ pricing }: { pricing: { term: string; price: string }[] }) {
  return (
    <section className="section cdt-pricing">
      <div className="container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">Choose your track</ScaleIn>
          <Reveal>
            <h2>Program duration &amp; fees</h2>
          </Reveal>
        </div>
        <Stagger className="cdt-pricing-row" stagger={0.1}>
          {pricing.map((p) => (
            <StaggerItem key={p.term} className="cdt-pricing-card">
              <span className="cdt-pricing-term">{p.term}</span>
              <strong className="cdt-pricing-price">{p.price}</strong>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function TrustStats() {
  return (
    <section className="section cdt-stats">
      <div className="container">
        <Stagger className="cdt-stats-row" stagger={0.08}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="cdt-stat">
              <strong>
                <MotionCounter value={s.value} />
              </strong>
              <span>{s.label}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Overview({ course }: { course: Course }) {
  return (
    <section className="section">
      <div className="container cdt-overview">
        <div className="section-heading left">
          <ScaleIn className="eyebrow">Course overview</ScaleIn>
          <Reveal>
            <h2>What this course covers</h2>
            <p>{course.summary}</p>
          </Reveal>
        </div>
        <Stagger className="cdt-highlight-grid" stagger={0.08}>
          {course.highlights.map((h) => (
            <StaggerItem key={h} className="cdt-highlight-card">
              <CheckCircle2 strokeWidth={1.75} />
              <span>{h}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="cdt-columns">
          <div>
            <h2>What you&apos;ll learn</h2>
            <ol className="syllabus">
              {course.modules.map((m, i) => (
                <li key={m}>
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  {m}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>Tool stack</h2>
            <div className="tags cdt-tool-tags">
              {course.tools.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningProcess() {
  return (
    <section className="section section-alt cdt-process">
      <div className="container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">How the training runs</ScaleIn>
          <Reveal>
            <h2>From counselling to placement drives</h2>
          </Reveal>
        </div>
        <Stagger className="cdt-process-row" stagger={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.title} className="cdt-process-step">
              <span className="cdt-process-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cdt-process-tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const CERT_ICONS: ComponentType<{ className?: string; strokeWidth?: number }>[] = [ShieldCheck, GraduationCap];

function Certification() {
  return (
    <section className="section cdt-cert">
      <div className="container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">Certification</ScaleIn>
          <Reveal>
            <h2>What you walk away with</h2>
          </Reveal>
        </div>
        <Stagger className="cdt-cert-grid" stagger={0.1}>
          {included.slice(0, 2).map((item, i) => {
            const Icon = CERT_ICONS[i] ?? Award;
            return (
              <StaggerItem key={item.title} className="cdt-cert-card">
                <span className="cdt-cert-icon">
                  <Icon strokeWidth={1.75} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function CareerScope({ course }: { course: Course }) {
  return (
    <section className="section section-alt cdt-career">
      <div className="container">
        <div className="section-heading left">
          <ScaleIn className="eyebrow">
            <Briefcase strokeWidth={2} className="cdt-inline-icon" /> Career opportunities
          </ScaleIn>
          <Reveal>
            <h2>Where this course can take you</h2>
            <p>{whyItMatters[0].text}</p>
          </Reveal>
        </div>
        <Stagger className="tags cdt-career-tags" stagger={0.06}>
          {course.careers.map((c) => (
            <StaggerItem key={c} className="tag tag-accent">
              {c}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Salary({ salaryFresher, salaryGrowth }: { salaryFresher: string; salaryGrowth: string }) {
  return (
    <section className="section cdt-salary">
      <div className="container">
        <div className="section-heading left">
          <ScaleIn className="eyebrow">Salary insights</ScaleIn>
          <Reveal>
            <h2>What this role pays in Punjab</h2>
          </Reveal>
        </div>
        <Reveal className="cdt-salary-card">
          <strong>{salaryFresher}</strong>
          <span>{salaryGrowth}</span>
        </Reveal>
      </div>
    </section>
  );
}

function Projects({ projects, courseTitle }: { projects: { title: string; text?: string }[]; courseTitle: string }) {
  return (
    <section className="section section-alt cdt-projects">
      <div className="container">
        <div className="section-heading">
          <ScaleIn className="eyebrow">Hands-on projects</ScaleIn>
          <Reveal>
            <h2>What you&apos;ll build in {courseTitle}</h2>
          </Reveal>
        </div>
        <Stagger className="cdt-projects-row" stagger={0.1}>
          {projects.map((p, i) => (
            <StaggerItem key={p.title} className="cdt-project-card">
              <span className="cdt-project-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              {p.text && <p>{p.text}</p>}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Testimonials({ items }: { items: ReferenceTestimonial[] }) {
  return (
    <section className="section cdt-testimonial">
      <div className="container">
        <div className={`cdt-quote-grid ${items.length === 1 ? "cdt-quote-single" : ""}`}>
          {items.map((t) => (
            <Reveal key={t.quote} className="cdt-quote-card">
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className="cdt-quote-who">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquirySection({ course }: { course: Course }) {
  return (
    <section className="section section-alt">
      <div className="container detail-grid">
        <div>
          <h2>Have questions before you enrol?</h2>
          <p>Talk to a counsellor about batch timings, eligibility and the right track for your goals.</p>
        </div>
        <aside className="sticky">
          <EnquiryForm defaultCourse={course.title} />
        </aside>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section">
      <div className="container narrow">
        <div className="section-heading">
          <span className="eyebrow">FAQs</span>
          <h2>Frequently asked questions</h2>
        </div>
        <FaqList />
      </div>
    </section>
  );
}

// Category landing pages (e.g. /internship-training/basic-accounting-courses-in-jalandhar) get the
// same premium hero/trust-stats/why-us/FAQ treatment as an individual course page — just without the
// course-specific sections (pricing/tools/salary/certification) that vary per course within the
// category, since a category groups several different real courses rather than describing one.
export function CategoryDetailTemplate({
  cat,
  courses,
}: {
  cat: ReturnType<typeof getCategory>;
  courses: Course[];
}) {
  return (
    <>
      <CategoryHero cat={cat} count={courses.length} />
      <TrustStats />
      <section className="section">
        <div className="container">
          <div className="section-heading left">
            <ScaleIn className="eyebrow">{cat.icon} {cat.name}</ScaleIn>
            <Reveal>
              <h2>Courses in this track</h2>
              <p>{cat.blurb}</p>
            </Reveal>
          </div>
          <div className="grid grid-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>
      <WhyUs />
      <FaqSection />
      <CtaBanner />
    </>
  );
}

function CategoryHero({ cat, count }: { cat: ReturnType<typeof getCategory>; count: number }) {
  return (
    <section className="page-hero cdt-hero">
      <div className="container cdt-hero-inner">
        <div>
          <Reveal>
            <nav className="crumbs">
              <Link href="/">Home</Link> / <Link href="/courses">Courses</Link> / <span>{cat.name}</span>
            </nav>
          </Reveal>
          <ScaleIn className="eyebrow eyebrow-light" delay={0.1}>
            {cat.icon} {cat.name}
          </ScaleIn>
          <h1>
            <RevealHeading text={`${cat.name} Courses in Jalandhar`} delay={0.2} />
          </h1>
          <Reveal delay={0.4}>
            <p>{cat.blurb}</p>
          </Reveal>
          <Reveal delay={0.5} className="hero-badges">
            <span>📚 {count} Courses</span>
            <span>📜 Certificate included</span>
          </Reveal>
          <Reveal delay={0.6} className="cdt-hero-actions">
            <Magnetic>
              <DemoButton className="btn hero-btn">Book a free demo</DemoButton>
            </Magnetic>
            <Magnetic>
              <DemoButton className="btn hero-btn-outline">Talk to a counsellor</DemoButton>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.3} y={30} className="cdt-hero-visual">
          <div className="cdt-hero-card">
            <span className="cdt-hero-glyph" aria-hidden="true">
              {cat.icon}
            </span>
            <strong>{cat.name}</strong>
            <span>{count} real courses</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function RelatedCourses({ courses, cat }: { courses: Course[]; cat: ReturnType<typeof getCategory> }) {
  if (courses.length === 0) return null;
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-heading left">
          <span className="eyebrow">{cat.icon} {cat.name}</span>
          <h2>Related courses</h2>
        </div>
        <div className="grid grid-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
