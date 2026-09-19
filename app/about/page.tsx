import type { Metadata } from "next";
import { stats, steps, whyUs } from "@/lib/content";
import { site } from "@/lib/site";
import { CtaBanner, PageHero, SectionHeading } from "@/components/Sections";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title={`About ${site.fullName}`}
        text={`${site.tagline} — training students since ${site.since}.`}
      />

      <section className="section">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>Practical computer education, built around real work</h2>
            <p>
              Since {site.since}, {site.name} has trained students across Punjab in the computer skills that local
              businesses hire for — office software, accounting, CAD/CAM design, digital marketing and graphic design.
            </p>
            <p>
              Every course is taught on the actual software used in the industry, in small batches, with daily
              practicals and live projects. Our goal is simple: when you finish, you should be ready to work.
            </p>
          </div>
          <div className="duration-grid">
            {stats.map((s) => (
              <div key={s.label} className="card duration-card">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <SectionHeading eyebrow="Why techcadd?" title="What makes us different" />
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

      <section className="section anchor" id="placements">
        <div className="container">
          <SectionHeading
            eyebrow="Placement support"
            title="From classroom to career"
            text="Our placement cell works with 500+ hiring partners — CA firms, architects, manufacturers, agencies and print houses."
          />
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

      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Our branches" title="Across Punjab & Chandigarh" />
          <div className="tags center-tags">
            {site.branches.map((b) => (
              <span key={b} className="tag">📍 {b}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
