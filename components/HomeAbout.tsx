import Link from "next/link";
import { stats } from "@/lib/content";
import { site } from "@/lib/site";

// Blue "About us" section under the home hero: copy on the left, a bento grid of cards on the right.
// Wording adapted from techcaddjalandhar.com/about; figures come from this site's own content.
const journey = [
  { title: "Learn", text: "Understand the concepts and fundamentals." },
  { title: "Practice", text: "Apply them in hands-on, guided exercises." },
  { title: "Build", text: "Work on projects and real assignments." },
  { title: "Grow", text: "Gain the confidence and skills to get hired." },
];

const learners = [
  { icon: "🎓", label: "Students" },
  { icon: "💼", label: "Job seekers" },
  { icon: "🧑‍💻", label: "Professionals" },
  { icon: "🔁", label: "Career switchers" },
];

const bars = [38, 52, 46, 64, 72, 88]; // decorative growth bars, % of chart height

export default function HomeAbout() {
  const students = stats.find((s) => s.label === "Students trained")!;

  return (
    <section className="ab" id="about">
      <div className="container ab-inner">
        <div className="ab-copy">
          <span className="ab-eyebrow">About {site.name}</span>
          <h2>
            Empowering skills. Enabling careers.
            <span className="ab-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 2c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z" />
              </svg>
            </span>
          </h2>
          <p>
            {site.fullName} is a skill-development institute that bridges the gap between classroom learning and what
            employers actually need. Since {site.since}, we have combined practical exposure, project-based learning and
            career-oriented training to help students across Punjab build real skills and the confidence to start
            working.
          </p>
          <Link href="/about" className="ab-btn">More about us</Link>
        </div>

        <div className="ab-bento">
          {/* Learn → Practice → Build → Grow */}
          <div className="ab-card ab-journey">
            <small>From classroom to career</small>
            <ol>
              {journey.map((j, i) => (
                <li key={j.title}>
                  <span className="ab-step">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{j.title}</strong>
                    {j.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Students trained, with growth bars */}
          <div className="ab-card ab-stats">
            <div className="ab-stats-top">
              <small>Students trained</small>
              <span className="ab-chip">Since {site.since}</span>
            </div>
            <strong>{students.value}</strong>
            <div className="ab-bars" aria-hidden="true">
              {bars.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Who we teach */}
          <div className="ab-card ab-learners">
            <span className="ab-card-plus" aria-hidden="true">+</span>
            <div className="ab-avatars" aria-hidden="true">
              {learners.map((l) => (
                <span key={l.label} title={l.label}>{l.icon}</span>
              ))}
            </div>
            <p>Learning for every stage: students, job seekers, professionals and career switchers.</p>
          </div>

          {/* Founder */}
          <Link href="/founder" className="ab-card ab-founder">
            <small>Founder</small>
            <strong>Gourav Gupta</strong>
            <p>From driving an auto to fund his engineering degree to building an academy.</p>
            <span className="ab-founder-link">Read his story →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
