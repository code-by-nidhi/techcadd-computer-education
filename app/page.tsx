import Link from "next/link";
import { included, testimonials, faqs } from "@/lib/content";
import { CtaBanner, FaqList, SectionHeading } from "@/components/Sections";
import HeroDashboard from "@/components/HeroDashboard";
import HomeAbout from "@/components/HomeAbout";
import HomeCategories from "@/components/HomeCategories";
import HomeFeatured from "@/components/HomeFeatured";
import HowItWorks from "@/components/HowItWorks";
import ToolsOrbit from "@/components/ToolsOrbit";
import WhyUs from "@/components/WhyUs";

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

      <WhyUs />

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Student stories"
            title="Rated 4.9/5 by our students"
            text="Thousands of alumni now working as accountants, designers, CAD engineers and marketers."
          />
          <div className="grid grid-3">
            {testimonials.map((t, i) => (
              <figure key={t.name} className="card testimonial" data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
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
      <section className="section section-blue included">
        <div className="container">
          <SectionHeading eyebrow="Included in every course" title="Everything you need — no upsell" />
          <div className="grid grid-5 included-grid">
            {included.map((m, i) => (
              // Each card rises from below as the section scrolls in, one after the next
              <div key={m.title} className="included-card" data-aos="fade-up" data-aos-delay={i * 150}>
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
          <ToolsOrbit />
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-blue">
        <div className="container narrow">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <FaqList items={faqs.slice(0, 5)} />
          <div className="center">
            <Link href="/faq" className="btn btn-outline-light">See all questions</Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
