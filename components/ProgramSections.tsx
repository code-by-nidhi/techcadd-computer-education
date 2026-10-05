import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import DemoButton from "./DemoButton";
import { coursesIn, durationMonths } from "@/lib/courses";
import { referenceContent } from "@/lib/referenceContent";
import { site } from "@/lib/site";
import type { ProgramExtras } from "@/lib/courseDetails/types";

// The sections only certificate program pages have (rendered by CoursePage.tsx when a detail entry
// carries `program`): track cards under the hero, learning modes, the "right fit?" banner and
// related courses. Styles: the ".bp-" block in app/globals.css.

// Fee for a track, from the real tiers in lib/referenceContent.ts ("6 Months" matches "6 Months" and
// "6 Months (Certificate)"); no tier → no price is shown rather than an invented one.
function feeFor(p: ProgramExtras, duration: string) {
  const tier = referenceContent[p.feeSource]?.pricing.find((t) => t.term.startsWith(duration));
  return tier && /₹/.test(tier.price) ? tier.price : null;
}

export function ProgramTracks({ p }: { p: ProgramExtras }) {
  return (
    <section className="bp-tracks">
      <div className="container">
        <div className="bp-tracks-head" data-aos="fade-up" suppressHydrationWarning>
          <h2>{p.tracksTitle}</h2>
          <p>{p.tracksText}</p>
        </div>
        <div className="bp-tracks-grid">
          {p.tracks.map((t, i) => {
            const fee = feeFor(p, t.duration);
            return (
              <article key={t.duration} className="bp-track" data-aos="fade-up" data-aos-delay={i * 50} suppressHydrationWarning>
                <span className="bp-track-kind">{t.kind}</span>
                <strong className="bp-track-dur">{t.duration}</strong>
                {fee ? (
                  <span className="bp-track-fee">
                    <b>{fee}</b> course fee
                  </span>
                ) : (
                  <span className="bp-track-fee">Fee on request from a counsellor</span>
                )}
                <p>{t.text}</p>
                <a href="#syllabus" className="bp-track-link">
                  View the syllabus <ArrowIcon />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Only the batch formats the site already offers (lib/content.ts: morning, evening, weekend, 1-on-1).
const modes = [
  {
    icon: "M3 5h18v11H3z M8 20h8 M12 16v4",
    title: "Classroom Training",
    text: `Weekday batches in the ${site.name} ${site.city} lab: your own workstation, licensed software and a trainer who checks your screen every class.`,
  },
  {
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 7v5l3 2",
    title: "Evening Batches",
    text: "Built for college students and people with a day job. The same syllabus, projects and placement support, after working hours.",
  },
  {
    icon: "M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5",
    title: "Weekend Batches",
    text: "Saturday and Sunday classes for working professionals and students travelling in from nearby towns — just a different calendar.",
  },
  {
    icon: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M3 21v-2a5 5 0 0 1 5-5h2 M17 11a3 3 0 1 0 0-6 M21 21v-2a4 4 0 0 0-3-3.9",
    title: "1-on-1 Personal Training",
    text: "Your own schedule with a dedicated trainer — for shifting rosters, or anyone who wants to move faster than a batch allows.",
  },
];

export function LearningModes() {
  return (
    <section className="bc-section bc-alt bp-modes">
      <div className="container">
        <div className="bc-head bc-head-center" data-aos="fade-up" suppressHydrationWarning>
          <div>
            <span className="bc-eyebrow">Learning modes</span>
            <h2>Choose how you want to learn</h2>
          </div>
          <p>Every mode covers the same syllabus, projects and placement support. Pick the schedule that fits your life.</p>
        </div>
        <div className="bp-modes-grid">
          {modes.map((m, i) => (
            <article key={m.title} className="bc-card" data-aos="fade-up" data-aos-delay={i * 50} suppressHydrationWarning>
              <span className="bc-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={m.icon} />
                </svg>
              </span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
        <div className="bp-modes-actions" data-aos="fade-up" suppressHydrationWarning>
          <DemoButton className="bc-btn bc-btn-primary">
            Book a free demo class <ArrowIcon />
          </DemoButton>
          <a href={site.phoneHref} className="bc-btn bc-btn-ghost">
            Talk to a counsellor
          </a>
        </div>
      </div>
    </section>
  );
}

export function FitBanner({ p }: { p: ProgramExtras }) {
  return (
    <section className="bp-fit-wrap">
      <div className="container">
        <div className="bp-fit" data-aos="zoom-in" suppressHydrationWarning>
          <div>
            <span className="bp-fit-tag">Get started today</span>
            <h2>{p.fit.title}</h2>
            <p>{p.fit.text}</p>
          </div>
          <div className="bp-fit-actions">
            <a href={site.phoneHref} className="bp-fit-call">
              <span aria-hidden="true">📞</span> {site.phone}
              <span className="bp-fit-call-arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
            <DemoButton className="bp-fit-demo">Book a free demo</DemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// Every course in the program's category, labelled by length like the reference's related cards.
const termLabel = (months: number) =>
  months <= 2 ? "Short-term course" : months <= 4 ? "Mid-term course" : months < 12 ? "Diploma course" : "Advanced diploma";

export function RelatedCourses({ p }: { p: ProgramExtras }) {
  return (
    <section className="bc-section">
      <div className="container">
        <div className="bc-head" data-aos="fade-up" suppressHydrationWarning>
          <div>
            <span className="bc-eyebrow">Explore more</span>
            <h2>Courses in this program</h2>
          </div>
        </div>
        <div className="bp-related">
          {coursesIn(p.category).map((c, i) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} className="bc-card bp-related-card" data-aos="fade-up" data-aos-delay={(i % 3) * 50} suppressHydrationWarning>
              <span className="bp-related-kind">
                {termLabel(durationMonths(c))} · {c.duration}
              </span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <span className="bp-related-link">
                View course
                <span aria-hidden="true">
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
