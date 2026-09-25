import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import DemoButton from "./DemoButton";
import BcSyllabus from "./BcSyllabus";
import { CtaStrip, LeadCta } from "./Sections";
import { site } from "@/lib/site";
import {
  bcAudience,
  bcCareers,
  bcCase,
  bcCertificate,
  bcCompare,
  bcFaqs,
  bcHero,
  bcLoop,
  bcOverview,
  bcProjects,
  bcReviews,
  bcSyllabus,
  bcTools,
  bcWhy,
  bcWhyNow,
} from "@/lib/basicComputerData";

// Dedicated Basic Computer Course page (app/courses/basic-computer-course/page.tsx). Same section
// order as the course-page reference, redrawn in a light "product site" style: ice-blue hero with a
// drawn desktop mock-up, bento cards, a tabbed syllabus, and navy bands (Why now, Tools, Why techcadd)
// to break up the light sections. All copy lives in lib/basicComputerData.ts; styles are the
// ".bc-" block in app/globals.css.
export default function BasicComputerPage() {
  return (
    <>
      <Hero />
      <Overview />
      <Audience />
      <CaseForIt />
      <WhyNow />
      <section className="bc-section bc-alt" id="syllabus">
        <div className="container">
          <Heading eyebrow={bcSyllabus.eyebrow} title={bcSyllabus.title} text={bcSyllabus.text} split />
          <BcSyllabus phases={bcSyllabus.phases} />
        </div>
      </section>
      <Tools />
      <Certificate />
      <Careers />
      <Projects />
      <Loop />
      <WhyTechcadd />
      <Compare />
      <Reviews />
      <Faq />
      <LeadCta />
      <CtaStrip />
    </>
  );
}

function Heading({ eyebrow, title, text, split, center }: { eyebrow: string; title: string; text?: string; split?: boolean; center?: boolean }) {
  return (
    <div className={`bc-head${split ? " bc-head-split" : ""}${center ? " bc-head-center" : ""}`} data-aos="fade-up">
      <div>
        <span className="bc-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}

function Hero() {
  return (
    <>
      <section className="bc-hero">
        <div className="bc-hero-dots" aria-hidden="true" />
        <div className="container">
          <nav className="bc-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/courses">Courses</Link>
            <span>/</span>
            <strong>Basic Computer</strong>
          </nav>

          <div className="bc-hero-inner">
            <div className="bc-hero-copy" data-aos="fade-up">
              <div className="bc-hero-badges">
                <span className="bc-hero-logo" aria-hidden="true">
                  <Image src="/logos/windows.svg" alt="" width={22} height={22} />
                </span>
                <span className="bc-hero-tag">{bcHero.tag}</span>
                <span className="bc-hero-tag bc-hero-tag-gold">✦ {bcHero.badge}</span>
              </div>
              <h1>{bcHero.title}</h1>
              <p>{bcHero.text}</p>
              <div className="bc-hero-actions">
                <DemoButton className="bc-hero-btn">
                  Book a free demo class
                  <span className="bc-hero-btn-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </DemoButton>
                <a href={site.phoneHref} className="bc-hero-btn-outline">
                  Talk to a counsellor
                </a>
              </div>
              <ul className="bc-hero-chips">
                {bcHero.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bc-hero-visual" data-aos="fade-left" aria-hidden="true">
              <ComputerHub />
            </div>
          </div>

          <dl className="bc-hero-facts" data-aos="fade-up">
            {bcHero.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bc-hero-stats">
        <div className="container">
          {bcHero.stats.map((s) => (
            <div key={s.label} data-aos="fade-up">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              <small>{s.note}</small>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// Hero illustration: a glowing computer in the middle wired to the course's apps by "circuit" lines,
// after the Python page's hub artwork. Everything is placed in % of a fixed-ratio stage so it scales
// as one piece; the SVG lines use the same 0–100 space (non-scaling strokes keep them crisp).
const hubNodes = [
  { logo: "word.png", x: 14, y: 20 },
  { logo: "excel.png", x: 38, y: 7 },
  { logo: "powerpoint.svg", x: 74, y: 9 },
  { logo: "outlook.svg", x: 92, y: 40 },
  { logo: "google-workspace.svg", x: 88, y: 80 },
  { logo: "punjabi.png", x: 58, y: 94 },
  { icon: "⌨", x: 26, y: 88 },
  { icon: "✉", x: 8, y: 58 },
];

function ComputerHub() {
  return (
    <div className="bc-hub">
      <span className="bc-hub-orb bc-hub-orb-gold" />
      <span className="bc-hub-orb bc-hub-orb-cyan" />
      <svg className="bc-hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {hubNodes.map((n) => (
          <path key={`${n.x}-${n.y}`} d={`M50 50 H${n.x} V${n.y}`} />
        ))}
      </svg>
      <div className="bc-hub-pc">
        <div className="bc-hub-screen">
          <Image src="/logos/windows.svg" alt="" width={64} height={64} />
          <span className="bc-hub-cursor" />
        </div>
        <span className="bc-hub-neck" />
        <span className="bc-hub-base" />
      </div>
      {hubNodes.map((n, i) => (
        <span
          key={`${n.x}-${n.y}`}
          className={`bc-hub-node${n.icon ? " bc-hub-node-icon" : ""}`}
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * -0.7}s` }}
        >
          {n.logo ? <Image src={`/logos/${n.logo}`} alt="" width={36} height={36} /> : n.icon}
        </span>
      ))}
    </div>
  );
}

function Overview() {
  return (
    <section className="bc-section">
      <div className="container bc-overview">
        <div className="bc-overview-copy" data-aos="fade-up">
          <span className="bc-eyebrow">{bcOverview.eyebrow}</span>
          <h2>{bcOverview.title}</h2>
          {bcOverview.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="bc-overview-photo">
            <Image src="/courses/basic-computer.webp" alt="Students practising in the techcadd computer lab" fill sizes="(max-width: 960px) 100vw, 60vw" />
            <span className="bc-overview-photo-tag">Hands-on from day one</span>
          </div>
        </div>
        <aside className="bc-overview-side" data-aos="fade-up" data-aos-delay="100">
          <div className="bc-get">
            <span className="bc-eyebrow">What you get</span>
            <ul>
              {bcOverview.getList.map((g) => (
                <li key={g}>
                  <span className="bc-check-box">
                    <Check />
                  </span>
                  {g}
                </li>
              ))}
            </ul>
            <DemoButton className="bc-btn bc-btn-primary bc-btn-block">
              Book a free demo <ArrowIcon />
            </DemoButton>
          </div>
          <div className="bc-mini-stats">
            {bcOverview.miniStats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="bc-section bc-alt">
      <div className="container">
        <Heading eyebrow={bcAudience.eyebrow} title={bcAudience.title} text={bcAudience.text} split />
        <div className="bc-audience">
          {bcAudience.items.map((a, i) => (
            <article key={a.title} className="bc-card bc-aud-card" data-aos="fade-up" data-aos-delay={(i % 3) * 50}>
              <span className="bc-icon">
                <Icon name={a.icon} />
              </span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseForIt() {
  const f = bcCase.feature;
  return (
    <section className="bc-section">
      <div className="container">
        <Heading eyebrow={bcCase.eyebrow} title={bcCase.title} center />
        <div className="bc-bento">
          <article className="bc-card bc-bento-feature" data-aos="fade-up">
            <span className="bc-tag">{f.tag}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <div className="bc-slots">
              {f.slots.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
          {bcCase.cards.map((c, i) => (
            <article key={c.title} className="bc-card bc-bento-card" data-aos="fade-up" data-aos-delay={(i % 2) * 50 + 50}>
              <span className="bc-tag">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNow() {
  return (
    <section className="bc-band">
      <div className="container bc-whynow">
        <div data-aos="fade-up">
          <span className="bc-eyebrow bc-eyebrow-light">{bcWhyNow.eyebrow}</span>
          <h2>{bcWhyNow.title}</h2>
          <ul className="bc-whynow-list">
            {bcWhyNow.points.map((p) => (
              <li key={p}>
                <Check /> {p}
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="bc-btn bc-btn-accent">
            Talk to a course advisor <ArrowIcon />
          </a>
        </div>
        <div className="bc-whynow-panel" data-aos="fade-left" aria-hidden="true">
          {[
            { k: "Online forms", v: "Admissions, jobs, KYC" },
            { k: "Email & PDFs", v: "Every application" },
            { k: "MS Office", v: "Every office desk" },
            { k: "Typing tests", v: "Govt. recruitment" },
          ].map((r, i) => (
            <div key={r.k} className="bc-whynow-row">
              <span className="bc-whynow-num">0{i + 1}</span>
              <strong>{r.k}</strong>
              <span>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section className="bc-band bc-band-tools">
      <div className="container">
        <Heading eyebrow={bcTools.eyebrow} title={bcTools.title} text={bcTools.text} center />
        <div className="bc-tools">
          {bcTools.tools.map((t, i) => (
            <div key={t.name} className="bc-tool" data-aos="zoom-in" data-aos-delay={i * 50}>
              <span className="bc-tool-logo">
                <Image src={`/logos/${t.logo}`} alt="" width={40} height={40} />
              </span>
              <strong>{t.name}</strong>
              <span>{t.use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certificate() {
  return (
    <section className="bc-section">
      <div className="container bc-cert">
        <div data-aos="fade-up">
          <span className="bc-eyebrow">{bcCertificate.eyebrow}</span>
          <h2>{bcCertificate.title}</h2>
          <p className="bc-lead">{bcCertificate.text}</p>
          <div className="bc-cert-items">
            {bcCertificate.items.map((c) => (
              <div key={c.title}>
                <span className="bc-check-box">
                  <Check />
                </span>
                <div>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </div>
              </div>
            ))}
          </div>
          <DemoButton className="bc-btn bc-btn-primary">
            Enrol for the next batch <ArrowIcon />
          </DemoButton>
        </div>
        <div className="bc-cert-visual" data-aos="fade-left" aria-hidden="true">
          <div className="bc-cert-paper">
            <Image src="/techcadd-logo.webp" alt="" width={952} height={262} className="bc-cert-logo" />
            <span className="bc-cert-sub">Computer Education · {site.city}</span>
            <strong className="bc-cert-title">Certificate</strong>
            <em className="bc-cert-of">of Course Completion</em>
            <span className="bc-cert-small">This is to certify that</span>
            <span className="bc-cert-name">Student Name</span>
            <span className="bc-cert-small">has successfully completed the Basic Computer Course</span>
            <div className="bc-cert-foot">
              <span>Course Director</span>
              <span className="bc-cert-seal">★</span>
              <span>Centre Head</span>
            </div>
          </div>
          <p className="bc-cert-caption">Issued on completion · verifiable online</p>
        </div>
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="bc-section bc-alt">
      <div className="container">
        <Heading eyebrow={bcCareers.eyebrow} title={bcCareers.title} text={bcCareers.text} split />
        <div className="bc-roles">
          {bcCareers.roles.map((r, i) => (
            <article key={r.title} className="bc-card bc-role" data-aos="fade-up" data-aos-delay={i * 50}>
              <span className="bc-role-pay">
                {r.pay}
                <small>/month</small>
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
        <div className="bc-hiring" data-aos="fade-up">
          <strong>Who hires for these roles</strong>
          <div>
            {bcCareers.hiring.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>
        <div className="bc-qa">
          {bcCareers.qa.map((q, i) => (
            <article key={q.q} data-aos="fade-up" data-aos-delay={(i % 2) * 50}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{q.q}</h3>
              <p>{q.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="bc-section">
      <div className="container">
        <Heading eyebrow={bcProjects.eyebrow} title={bcProjects.title} split text="Each module ends with a task you finish on your own. Together they become the work folder you take home." />
        <div className="bc-projects">
          {bcProjects.items.map((p, i) => (
            <article key={p.n} className="bc-card bc-project" data-aos="fade-up" data-aos-delay={i * 50}>
              <span className="bc-project-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="bc-project-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Loop() {
  return (
    <section className="bc-section bc-alt">
      <div className="container bc-loop">
        <div data-aos="fade-up">
          <span className="bc-eyebrow">{bcLoop.eyebrow}</span>
          <h2>{bcLoop.title}</h2>
          <p className="bc-lead">{bcLoop.text}</p>
        </div>
        <ol className="bc-loop-steps">
          {bcLoop.steps.map((s, i) => (
            <li key={s.title} data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="bc-loop-n">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <small>e.g. {s.example}</small>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyTechcadd() {
  return (
    <section className="bc-band">
      <div className="container">
        <Heading eyebrow={bcWhy.eyebrow} title={bcWhy.title} text={bcWhy.text} split />
        <div className="bc-why">
          {bcWhy.items.map((w, i) => (
            <article key={w.title} data-aos="fade-up" data-aos-delay={(i % 3) * 50}>
              <span className="bc-why-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className="bc-section">
      <div className="container">
        <Heading eyebrow={bcCompare.eyebrow} title={bcCompare.title} text={bcCompare.text} center />
        <div className="bc-table-wrap" data-aos="fade-up">
          <table className="bc-table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col" className="bc-table-us">
                  {site.name}
                </th>
                <th scope="col">Typical institute</th>
              </tr>
            </thead>
            <tbody>
              {bcCompare.rows.map((r) => (
                <tr key={r.feature}>
                  <th scope="row">{r.feature}</th>
                  <td className="bc-table-us">
                    <span className="bc-yes">
                      <Check />
                    </span>
                    {r.us}
                  </td>
                  <td>
                    <span className="bc-no">–</span>
                    {r.them}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="bc-note">{bcCompare.note}</p>
      </div>
    </section>
  );
}

function Reviews() {
  const initials = (n: string) =>
    n
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
  const card = (r: (typeof bcReviews)[number], hidden?: boolean) => (
    <article key={r.name + (hidden ? "-b" : "")} className="bc-review" aria-hidden={hidden || undefined}>
      <div className="bc-review-top">
        <span className="bc-stars">★★★★★</span>
        <span className="bc-review-src">Google</span>
      </div>
      <p>“{r.text}”</p>
      <div className="bc-review-who">
        <span>{initials(r.name)}</span>
        <div>
          <strong>{r.name}</strong>
          <small>{r.role}</small>
        </div>
      </div>
    </article>
  );
  return (
    <section className="bc-section bc-alt bc-reviews-section">
      <div className="container">
        <Heading eyebrow="Student reviews" title={`What our students in ${site.city} say`} split text="Rated 4.9★ on Google by students of every age and background." />
      </div>
      <div className="bc-marquee">
        <div className="bc-marquee-track">
          {bcReviews.map((r) => card(r))}
          {bcReviews.map((r) => card(r, true))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bc-section">
      <div className="container bc-faq">
        <div className="bc-faq-side" data-aos="fade-up">
          <span className="bc-eyebrow">Got questions?</span>
          <h2>Frequently asked questions</h2>
          <p className="bc-lead">Still unsure? A counsellor can walk you through batches, fees and the syllabus in one short call.</p>
          <a href={site.phoneHref} className="bc-faq-call">
            <span>📞</span>
            <div>
              <small>Call us</small>
              <strong>{site.phone}</strong>
            </div>
          </a>
        </div>
        <div className="bc-faq-list">
          {bcFaqs.map((f, i) => (
            <details key={f.q} className="bc-faq-item" data-aos="fade-up" data-aos-delay={(i % 4) * 50} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

const iconPaths: Record<string, string> = {
  student: "M12 3 2 8l10 5 10-5-10-5Z M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5",
  grad: "M4 19V7l8-4 8 4v12 M9 19v-6h6v6 M4 19h16",
  job: "M3 8h18v11H3z M8 8V5h8v3 M3 13h18",
  home: "M3 11 12 4l9 7 M5 10v10h14V10 M10 20v-5h4v5",
  shop: "M4 9h16l-1-5H5L4 9Z M5 9v11h14V9 M9 20v-6h6v6",
  senior: "M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 22v-7a6 6 0 0 1 12 0v7 M18 13l2 9",
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}
