import Link from "next/link";
import { categories, coursesIn, featuredSlugs, getCourse } from "@/lib/courses";
import { included, programDurations, stats, steps, testimonials, toolGroups, whyUs, faqs } from "@/lib/content";
import { site } from "@/lib/site";
import { CourseCard, CtaBanner, FaqList, SectionHeading } from "@/components/Sections";

// Software tiles floating around the logo in the hero, one or two per course track.
const orbitIcons = [
  { label: "Ps", title: "Photoshop", bg: "#001e36", fg: "#31a8ff", top: "14%", left: "24%" },
  { label: "Tally", title: "Tally Prime", bg: "#fff", fg: "#1f4fd8", top: "4%", left: "70%" },
  { label: "CAD", title: "AutoCAD", bg: "#fff", fg: "#c8102e", top: "32%", left: "90%" },
  { label: "Ai", title: "Illustrator", bg: "#330000", fg: "#ff9a00", top: "56%", left: "8%" },
  { label: "Ads", title: "Google Ads", bg: "#ffcc00", fg: "#0a1a5c", top: "72%", left: "84%" },
  { label: "Xl", title: "MS Excel", bg: "#1d6f42", fg: "#fff", top: "86%", left: "44%" },
];

const heroAvatars = [
  { initials: "SK", bg: "#1f4fd8" },
  { initials: "HS", bg: "#0a1a5c" },
  { initials: "NB", bg: "#3cb4ff" },
  { initials: "AV", bg: "#f0b400" },
];

export default function Home() {
  const featured = featuredSlugs.map((s) => getCourse(s)!);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              The Simplest Way to Build a Career in Computers, Accounting, CAD &amp; Design
            </h1>
            <p className="hero-sub">
              <strong>Learn the software offices actually use</strong> and turn it into a job{" "}
              <strong>in just a few months.</strong>
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-pill">Book a free demo class</Link>
              <Link href="/courses" className="hero-link">Explore courses →</Link>
            </div>
            <div className="hero-proof">
              <span>
                Join <strong>{stats[0].value}</strong> students
              </span>
              <span className="avatars" aria-hidden="true">
                {heroAvatars.map((a) => (
                  <span key={a.initials} style={{ background: a.bg }}>{a.initials}</span>
                ))}
              </span>
              <span className="hero-rating">★ 4.9 on Google</span>
            </div>
          </div>

          <div className="orbit-stage" aria-hidden="true">
            <span className="orbit orbit-1" />
            <span className="orbit orbit-2" />
            <span className="orbit orbit-3" />
            <div className="orbit-logo">
              <strong>
                techcadd<span>.</span>
              </strong>
              <small>{site.tagline}</small>
            </div>
            {orbitIcons.map((icon, i) => (
              <span
                key={icon.label}
                className="orbit-icon"
                title={icon.title}
                style={{ top: icon.top, left: icon.left, background: icon.bg, color: icon.fg, animationDelay: `${i * -0.7}s` }}
              >
                {icon.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Course categories quick menu */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading
            eyebrow="Course categories"
            title="Choose your track"
            text="Five focused career tracks, each with beginner-friendly foundations and job-ready advanced modules."
          />
          <div className="grid grid-5">
            {categories.map((c) => (
              <Link key={c.id} href={`/courses#${c.id}`} className="card category-card">
                <span className="category-icon">{c.icon}</span>
                <h3>{c.name}</h3>
                <p>{c.blurb}</p>
                <ul>
                  {coursesIn(c.id).map((course) => (
                    <li key={course.slug}>{course.title}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">About {site.name}</span>
            <h2>{site.tagline}. Training students since {site.since}.</h2>
            <p>
              {site.fullName} has helped thousands of students across Punjab turn practical computer skills into
              careers. Our courses are built around real software and real work — so you leave with a certificate,
              a portfolio and the confidence to start working.
            </p>
            <Link href="/about" className="btn btn-outline">More about us</Link>
          </div>
          <div className="duration-grid" id="durations">
            {programDurations.map((d) => (
              <div key={d.title} className="card duration-card">
                <strong>{d.title}</strong>
                <span>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="From first call to first job" />
          <div className="grid grid-4">
            {steps.map((s, i) => (
              <div key={s.title} className="card step-card">
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="chip">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Featured courses"
            title="Our most popular programs"
            text="Flagship courses from each track — start here or talk to a counsellor for a custom plan."
          />
          <div className="grid grid-3">
            {featured.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <div className="center">
            <Link href="/courses" className="btn btn-primary">View all courses</Link>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Why techcadd?" title="Training that gets you hired" />
          <div className="grid grid-4">
            {whyUs.map((w) => (
              <div key={w.title} className="card card-dark">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Student stories"
            title="Rated 4.9/5 by our students"
            text="Thousands of alumni now working as accountants, designers, CAD engineers and marketers."
          />
          <div className="grid grid-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card testimonial">
                <div className="stars">★★★★★</div>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>
                    {t.role} · {t.course}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Included in every course" title="Everything you need — no upsell" />
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

      {/* Tools */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Software you'll learn" title="Industry tools across every track" />
          <div className="tool-groups">
            {toolGroups.map((g) => (
              <div key={g.name} className="tool-group">
                <h3>{g.name}</h3>
                <div className="tags">
                  {g.tools.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container narrow">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <FaqList items={faqs.slice(0, 5)} />
          <div className="center">
            <Link href="/faq" className="btn btn-outline">See all questions</Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
