import Link from "next/link";
import { included, testimonials, toolGroups, whyUs, faqs } from "@/lib/content";
import { CtaBanner, FaqList, SectionHeading } from "@/components/Sections";
import HeroDashboard from "@/components/HeroDashboard";
import HomeAbout from "@/components/HomeAbout";
import HomeCategories from "@/components/HomeCategories";
import HomeFeatured from "@/components/HomeFeatured";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>
              Build a <span className="hero-hl">Career</span> in Computers, Accounting, CAD &amp; Design
            </h1>
            <p className="hero-sub">
              Learn the software offices actually use and turn it into a job in just a few months.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn hero-btn">Start your career</Link>
              <Link href="/courses" className="btn hero-btn-outline">Explore courses</Link>
            </div>
          </div>

          <HeroDashboard />
        </div>
      </section>

      <HomeAbout />

      <HomeCategories />

      <HomeFeatured />

      <HowItWorks />

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
