import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import DemoButton from "./DemoButton";
import BcSyllabus from "./BcSyllabus";
import { CtaStrip, LeadCta } from "./Sections";
import { site } from "@/lib/site";
import type { AudienceIcon, CourseDetail, HubNode } from "@/lib/courseDetails/types";

// Course detail page, shared by every course (app/internship-training/[slug]/page.tsx). Section order follows the
// course-page reference: dark hero with a "computer hub" illustration, overview, audience, bento
// "case for it", why-now band, tabbed syllabus, tools band, certificate, careers, projects, class
// loop, why-techcadd band, comparison table, reviews marquee and FAQ. All copy comes from the
// course's entry in lib/courseDetails; styles are the ".bc-" block in app/globals.css.
export default function CoursePage({ d }: { d: CourseDetail }) {
  return (
    <>
      <Hero d={d} />
      <Overview d={d} />
      <Audience d={d} />
      <CaseForIt d={d} />
      <WhyNow d={d} />
      <section className="bc-section bc-alt" id="syllabus">
        <div className="container">
          <Heading eyebrow={d.syllabus.eyebrow} title={d.syllabus.title} text={d.syllabus.text} split />
          <BcSyllabus phases={d.syllabus.phases} />
        </div>
      </section>
      <Tools d={d} />
      <Certificate d={d} />
      <Careers d={d} />
      <Projects d={d} />
      <Loop d={d} />
      <WhyTechcadd d={d} />
      <Compare d={d} />
      <Reviews d={d} />
      <Faq d={d} />
      <LeadCta />
      <CtaStrip />
    </>
  );
}

type P = { d: CourseDetail };

function Heading({ eyebrow, title, text, split, center }: { eyebrow: string; title: string; text?: string; split?: boolean; center?: boolean }) {
  return (
    <div className={`bc-head${split ? " bc-head-split" : ""}${center ? " bc-head-center" : ""}`} suppressHydrationWarning data-aos="fade-up">
      <div>
        <span className="bc-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}

function Hero({ d }: P) {
  const h = d.hero;
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
            <strong>{h.crumb}</strong>
          </nav>

          <div className="bc-hero-inner">
            <div className="bc-hero-copy" suppressHydrationWarning data-aos="fade-up">
              <div className="bc-hero-badges">
                <span className="bc-hero-logo" aria-hidden="true">
                  <Image src={`/logos/${h.hub.center}`} alt="" width={22} height={22} />
                </span>
                <span className="bc-hero-tag">{h.tag}</span>
                <span className="bc-hero-tag bc-hero-tag-gold">✦ {h.badge}</span>
              </div>
              <h1>{h.title}</h1>
              <p>{h.text}</p>
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
                {h.points.map((p) => (
                  <li key={p}>
                    <span aria-hidden="true">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bc-hero-visual" suppressHydrationWarning data-aos="fade-left" aria-hidden="true">
              <ComputerHub center={h.hub.center} nodes={h.hub.nodes} />
            </div>
          </div>

          <dl className="bc-hero-facts" suppressHydrationWarning data-aos="fade-up">
            {h.facts.map((f) => (
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
          {h.stats.map((s) => (
            <div key={s.label} suppressHydrationWarning data-aos="fade-up">
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

// Hero illustration: a glowing computer in the middle wired to the course's apps by "circuit" lines.
// Everything is placed in % of a fixed-ratio stage so it scales as one piece; the SVG lines use the
// same 0–100 space (non-scaling strokes keep them crisp). Node i sits at hubSpots[i].
const hubSpots = [
  { x: 14, y: 20 },
  { x: 38, y: 7 },
  { x: 74, y: 9 },
  { x: 92, y: 40 },
  { x: 88, y: 80 },
  { x: 58, y: 94 },
  { x: 26, y: 88 },
  { x: 8, y: 58 },
];

function ComputerHub({ center, nodes }: { center: string; nodes: HubNode[] }) {
  const placed = nodes.slice(0, hubSpots.length).map((n, i) => ({ ...hubSpots[i], n }));
  return (
    <div className="bc-hub">
      <span className="bc-hub-orb bc-hub-orb-gold" />
      <span className="bc-hub-orb bc-hub-orb-cyan" />
      <svg className="bc-hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {placed.map((p) => (
          <path key={`${p.x}-${p.y}`} d={`M50 50 H${p.x} V${p.y}`} />
        ))}
      </svg>
      <div className="bc-hub-pc">
        <div className="bc-hub-screen">
          <Image src={`/logos/${center}`} alt="" width={64} height={64} />
          <span className="bc-hub-cursor" />
        </div>
        <span className="bc-hub-neck" />
        <span className="bc-hub-base" />
      </div>
      {placed.map((p, i) => (
        <span
          key={`${p.x}-${p.y}`}
          className={`bc-hub-node${"icon" in p.n ? " bc-hub-node-icon" : ""}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * -0.7}s` }}
        >
          {"logo" in p.n ? <Image src={`/logos/${p.n.logo}`} alt="" width={36} height={36} /> : p.n.icon}
        </span>
      ))}
    </div>
  );
}

function Overview({ d }: P) {
  const o = d.overview;
  return (
    <section className="bc-section">
      <div className="container bc-overview">
        <div className="bc-overview-copy" suppressHydrationWarning data-aos="fade-up">
          <span className="bc-eyebrow">{o.eyebrow}</span>
          <h2>{o.title}</h2>
          {o.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="bc-overview-photo">
            <Image src={`/courses/${o.image}`} alt={o.imageAlt} fill sizes="(max-width: 960px) 100vw, 60vw" />
            <span className="bc-overview-photo-tag">{o.imageTag}</span>
          </div>
        </div>
        <aside className="bc-overview-side" suppressHydrationWarning data-aos="fade-up" data-aos-delay="100">
          <div className="bc-get">
            <span className="bc-eyebrow">What you get</span>
            <ul>
              {o.getList.map((g) => (
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
            {o.miniStats.map((s) => (
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

function Audience({ d }: P) {
  const a = d.audience;
  return (
    <section className="bc-section bc-alt">
      <div className="container">
        <Heading eyebrow={a.eyebrow} title={a.title} text={a.text} split />
        <div className="bc-audience">
          {a.items.map((item, i) => (
            <article key={item.title} className="bc-card bc-aud-card" suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 3) * 50}>
              <span className="bc-icon">
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseForIt({ d }: P) {
  const c = d.case;
  const f = c.feature;
  return (
    <section className="bc-section">
      <div className="container">
        <Heading eyebrow={c.eyebrow} title={c.title} center />
        <div className="bc-bento">
          <article className="bc-card bc-bento-feature" suppressHydrationWarning data-aos="fade-up">
            <span className="bc-tag">{f.tag}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <div className="bc-slots">
              {f.slots.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
          {c.cards.map((card, i) => (
            <article key={card.title} className="bc-card bc-bento-card" suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 2) * 50 + 50}>
              <span className="bc-tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNow({ d }: P) {
  const w = d.whyNow;
  return (
    <section className="bc-band">
      <div className="container bc-whynow">
        <div suppressHydrationWarning data-aos="fade-up">
          <span className="bc-eyebrow bc-eyebrow-light">{w.eyebrow}</span>
          <h2>{w.title}</h2>
          <ul className="bc-whynow-list">
            {w.points.map((p) => (
              <li key={p}>
                <Check /> {p}
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="bc-btn bc-btn-accent">
            Talk to a course advisor <ArrowIcon />
          </a>
        </div>
        <div className="bc-whynow-panel" suppressHydrationWarning data-aos="fade-left" aria-hidden="true">
          {w.panel.map((r, i) => (
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

function Tools({ d }: P) {
  const t = d.tools;
  return (
    <section className="bc-band bc-band-tools">
      <div className="container">
        <Heading eyebrow={t.eyebrow} title={t.title} text={t.text} center />
        <div className="bc-tools">
          {t.tools.map((tool, i) => (
            <div key={tool.name} className="bc-tool" suppressHydrationWarning data-aos="zoom-in" data-aos-delay={i * 50}>
              <span className="bc-tool-logo">
                {"logo" in tool ? (
                  <Image src={`/logos/${tool.logo}`} alt="" width={40} height={40} />
                ) : (
                  <span className="bc-tool-mono">{tool.mono}</span>
                )}
              </span>
              <strong>{tool.name}</strong>
              <span>{tool.use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certificate({ d }: P) {
  const c = d.certificate;
  return (
    <section className="bc-section">
      <div className="container bc-cert">
        <div suppressHydrationWarning data-aos="fade-up">
          <span className="bc-eyebrow">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p className="bc-lead">{c.text}</p>
          <div className="bc-cert-items">
            {c.items.map((item) => (
              <div key={item.title}>
                <span className="bc-check-box">
                  <Check />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
          <DemoButton className="bc-btn bc-btn-primary">
            Enrol for the next batch <ArrowIcon />
          </DemoButton>
        </div>
        <div className="bc-cert-visual" suppressHydrationWarning data-aos="fade-left" aria-hidden="true">
          <div className="bc-cert-paper">
            <Image src="/techcadd-logo.webp" alt="" width={952} height={262} className="bc-cert-logo" />
            <span className="bc-cert-sub">Computer Education · {site.city}</span>
            <strong className="bc-cert-title">Certificate</strong>
            <em className="bc-cert-of">of Course Completion</em>
            <span className="bc-cert-small">This is to certify that</span>
            <span className="bc-cert-name">Student Name</span>
            <span className="bc-cert-small">has successfully completed the {c.courseName}</span>
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

function Careers({ d }: P) {
  const c = d.careers;
  return (
    <section className="bc-section bc-alt">
      <div className="container">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} split />
        <div className="bc-roles">
          {c.roles.map((r, i) => (
            <article key={r.title} className="bc-card bc-role" suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 50}>
              <span className="bc-role-pay">
                {r.pay}
                <small>/month</small>
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
        <div className="bc-hiring" suppressHydrationWarning data-aos="fade-up">
          <strong>Who hires for these roles</strong>
          <div>
            {c.hiring.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>
        <div className="bc-qa">
          {c.qa.map((q, i) => (
            <article key={q.q} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 2) * 50}>
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

function Projects({ d }: P) {
  const p = d.projects;
  return (
    <section className="bc-section">
      <div className="container">
        <Heading eyebrow={p.eyebrow} title={p.title} text={p.text} split />
        <div className="bc-projects">
          {p.items.map((item, i) => (
            <article key={item.n} className="bc-card bc-project" suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 50}>
              <span className="bc-project-n">{item.n}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="bc-project-tags">
                {item.tags.map((t) => (
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

function Loop({ d }: P) {
  const l = d.loop;
  return (
    <section className="bc-section bc-alt">
      <div className="container bc-loop">
        <div suppressHydrationWarning data-aos="fade-up">
          <span className="bc-eyebrow">{l.eyebrow}</span>
          <h2>{l.title}</h2>
          <p className="bc-lead">{l.text}</p>
        </div>
        <ol className="bc-loop-steps">
          {l.steps.map((s, i) => (
            <li key={s.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100}>
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

function WhyTechcadd({ d }: P) {
  const w = d.why;
  return (
    <section className="bc-band">
      <div className="container">
        <Heading eyebrow={w.eyebrow} title={w.title} text={w.text} split />
        <div className="bc-why">
          {w.items.map((item, i) => (
            <article key={item.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 3) * 50}>
              <span className="bc-why-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Compare({ d }: P) {
  const c = d.compare;
  return (
    <section className="bc-section">
      <div className="container">
        <Heading eyebrow={c.eyebrow} title={c.title} text={c.text} center />
        <div className="bc-table-wrap" suppressHydrationWarning data-aos="fade-up">
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
              {c.rows.map((r) => (
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
        <p className="bc-note">{c.note}</p>
      </div>
    </section>
  );
}

function Reviews({ d }: P) {
  const initials = (n: string) =>
    n
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
  const card = (r: CourseDetail["reviews"][number], hidden?: boolean) => (
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
          {d.reviews.map((r) => card(r))}
          {d.reviews.map((r) => card(r, true))}
        </div>
      </div>
    </section>
  );
}

function Faq({ d }: P) {
  return (
    <section className="bc-section">
      <div className="container bc-faq">
        <div className="bc-faq-side" suppressHydrationWarning data-aos="fade-up">
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
          {d.faqs.map((f, i) => (
            <details key={f.q} className="bc-faq-item" suppressHydrationWarning data-aos="fade-up" data-aos-delay={(i % 4) * 50} open={i === 0}>
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

const iconPaths: Record<AudienceIcon, string> = {
  student: "M12 3 2 8l10 5 10-5-10-5Z M6 10.5V15c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5",
  grad: "M4 19V7l8-4 8 4v12 M9 19v-6h6v6 M4 19h16",
  job: "M3 8h18v11H3z M8 8V5h8v3 M3 13h18",
  home: "M3 11 12 4l9 7 M5 10v10h14V10 M10 20v-5h4v5",
  shop: "M4 9h16l-1-5H5L4 9Z M5 9v11h14V9 M9 20v-6h6v6",
  senior: "M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 22v-7a6 6 0 0 1 12 0v7 M18 13l2 9",
  engineer: "M4 20h16 M6 20V10l6-6 6 6v10 M12 4v6 M9 14h6 M9 17h6",
  design: "M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4c2.5 0 4.6-2 4.6-4.6C22 6.2 17.5 3 12 3Z M7.5 11.5h.01 M10.5 7.5h.01 M15.5 7.5h.01",
  chart: "M4 20V4 M4 20h16 M8 16v-5 M12 16V8 M16 16v-3",
  office: "M4 21V5l8-2v18 M12 7h8v14 M7 8h2 M7 12h2 M7 16h2 M15 11h2 M15 15h2 M2 21h20",
  freelance: "M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z M3 12h18 M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z",
  govt: "M3 21h18 M4 10h16 M12 3 3 8h18l-9-5Z M6 10v8 M10 10v8 M14 10v8 M18 10v8",
};

function Icon({ name }: { name: AudienceIcon }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPaths[name]} />
    </svg>
  );
}
