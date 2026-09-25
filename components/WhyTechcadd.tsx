import { site } from "@/lib/site";
import { categories } from "@/lib/courses";
import StatCounter from "@/components/StatCounter";

// "Why TechCadd Works" — /contact only, right after the Support & Assistance section. The reference
// screenshot for this (an unrelated SaaS site) listed "Web Development, AI, Data Analytics..." as
// course categories and a "98% placement success" stat — neither exists in this repo (see
// lib/courses.ts: the real 5 categories are Basic & Accounting, Punjabi Typing, Civil/Mechanical,
// Graphic Designing, Digital Marketing), so Card 2's copy below uses those real categories instead,
// and the stats are this repo's own already-established real numbers (25,000+ students / 500+
// hiring partners — see lib/aboutData.ts), not the screenshot's.
export default function WhyTechcadd() {
  return (
    <section className="section why-tc">
      <div className="container">
        <div className="section-heading" data-aos="fade-up">
          <span className="eyebrow">Why techcadd</span>
          <h2>Built for real careers, not just classroom learning.</h2>
          <p>
            Our training model combines practical learning, industry mentorship, placement preparation and career
            guidance to help students become job-ready professionals.
          </p>
        </div>

        <div className="why-tc-grid">
          <div className="why-tc-card why-tc-card-outcomes" data-aos="fade-up">
            <h3>Real Results</h3>
            <p>Students learn through live projects, practical assignments and career-focused training.</p>
            <div className="why-tc-stats">
              <div className="why-tc-stat">
                <strong>
                  <StatCounter to={25000} suffix="+" />
                </strong>
                <span>Students Trained</span>
              </div>
              <div className="why-tc-stat">
                <strong>
                  <StatCounter to={500} suffix="+" />
                </strong>
                <span>Hiring Partners</span>
              </div>
            </div>
          </div>

          <div className="why-tc-card why-tc-card-build" data-aos="fade-up" data-aos-delay="100">
            <div className="why-tc-build-icons" aria-hidden="true">
              {categories.map((c, i) => (
                <span key={c.id} className={`why-tc-float-icon why-tc-float-icon-${i}`}>
                  {c.icon}
                </span>
              ))}
            </div>
            <h3>Learn by Building</h3>
            <p>
              Work on real, hands-on projects across computer fundamentals, CAD &amp; engineering design, graphic
              designing and digital marketing.
            </p>
          </div>

          <div className="why-tc-card why-tc-card-career" data-aos="fade-up" data-aos-delay="200">
            <h3>Career Growth Support</h3>
            <p>Resume building, interview preparation, internship guidance and placement assistance.</p>
            <ul className="why-tc-checklist">
              <li>Mock Interviews</li>
              <li>Resume Reviews</li>
              <li>Placement Assistance</li>
            </ul>
            <a href={site.phoneHref} className="why-tc-cta">
              Talk to a Counsellor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
