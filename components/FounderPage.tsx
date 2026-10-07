import Link from "next/link";
import { ArrowRight, Compass, Mic, Rocket, Target } from "lucide-react";
import {
  founderClosing,
  founderConnect,
  founderGallery,
  founderHero,
  founderJourney,
  founderMeet,
  founderReels,
  founderRoles,
  founderTestimonials,
} from "@/lib/founderData";
import { CtaStrip, LeadCta } from "./Sections";
import { FounderJourney, FounderReels, FounderTestimonials } from "./FounderInteractive";

// /about/founder, laid out after techcaddjalandhar.com/about/founder: blue hero with his portrait,
// "Meet Gourav Gupta" with stats, a two-row stage-photo marquee, the four roles, the scroll-through
// journey, a closing note, testimonials and a connect block. Sections alternate blue / white like the
// rest of the site; copy lives in lib/founderData.ts and the styles are the ".fd-" block in globals.css.
export default function FounderPage() {
  return (
    <>
      <Hero />
      <Meet />
      <Gallery />
      <Roles />
      <section className="fd-sec fd-blue fd-journey">
        <div className="container fd-journey-head">
          <p className="fd-eyebrow">{founderJourney.eyebrow}</p>
          <h2>{founderJourney.heading}</h2>
          <p>{founderJourney.text}</p>
        </div>
        <FounderJourney />
      </section>
      <Closing />
      <section className="fd-sec fd-blue">
        <div className="container fd-tst">
          <header>
            <p className="fd-eyebrow">{founderTestimonials.eyebrow}</p>
            <h2>
              {founderTestimonials.heading} <span>{founderTestimonials.headingAccent}</span>
            </h2>
            {founderTestimonials.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </header>
          <FounderTestimonials />
        </div>
      </section>
      <section className="fd-sec fd-reels" id="reels">
        <div className="container fd-reels-head">
          <p className="fd-eyebrow">{founderReels.eyebrow}</p>
          <h2>
            {founderReels.heading} <span>{founderReels.headingAccent}</span>
          </h2>
          <p>{founderReels.text}</p>
        </div>
        <FounderReels />
        <div className="fd-reels-foot">
          <a href={founderReels.more.href} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            {founderReels.more.label} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <Connect />
      <LeadCta />
      <CtaStrip />
    </>
  );
}

function Hero() {
  const h = founderHero;
  return (
    <section className="fd-hero">
      <span className="fd-hero-ring fd-hero-ring-1" aria-hidden="true" />
      <span className="fd-hero-ring fd-hero-ring-2" aria-hidden="true" />
      <span className="fd-hero-dots" aria-hidden="true" />
      <div className="container fd-hero-inner">
        <div>
          <p className="fd-hero-name">
            <strong>{h.name}</strong>
            <span>{h.role}</span>
          </p>
          <span className="fd-hero-rule" aria-hidden="true" />
          <h1>
            {h.titleLines.map((line, i) => (
              <span key={line} className={i === h.titleLines.length - 1 ? "fd-hero-accent" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p className="fd-hero-lead">{h.lead}</p>
          <ul className="fd-hero-tags">
            {h.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="fd-hero-frame">
          <span className="fd-hero-photo" role="img" aria-label={h.portraitAlt} style={{ backgroundImage: `url(${h.portrait})` }} />
        </div>
      </div>
    </section>
  );
}

function Meet() {
  const m = founderMeet;
  const [intro, bio, today] = m.paragraphs;
  return (
    <section className="fd-sec fd-meet">
      <span className="fd-ghost" aria-hidden="true">
        {m.ghost}
      </span>
      <div className="container fd-meet-inner">
        <div className="fd-meet-photo" suppressHydrationWarning data-aos="fade-right">
          <span role="img" aria-label={m.imageAlt} style={{ backgroundImage: `url(${m.image})` }} />
        </div>
        <div suppressHydrationWarning data-aos="fade-up">
          <h2>{m.heading}</h2>
          <p>{intro}</p>
          <p>{bio}</p>
          <p>{today}</p>
          <blockquote className="fd-quote">{m.quote}</blockquote>
          <Link href={m.cta.href} className="btn btn-primary">
            {m.cta.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="container">
        <ul className="fd-stats">
          {m.stats.map((s, i) => (
            <li key={s.label} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 100}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Two rows of the stage photos drifting in opposite directions. Each row's list is rendered twice so
// the -50% slide loops seamlessly; the second copy is hidden from assistive tech.
function Gallery() {
  const row = [...founderGallery, ...founderGallery];
  return (
    <section className="fd-gal fd-blue" aria-label="Gourav Gupta on stage">
      {[0, 1].map((r) => (
        <div key={r} className={`fd-gal-row ${r === 1 ? "is-reverse" : ""}`}>
          <ul>
            {[...row, ...row].map((photo, i) => (
              <li key={i} className={photo.tall ? "is-tall" : ""} aria-hidden={i >= row.length || undefined}>
                <span role="img" aria-label={i < founderGallery.length && r === 0 ? photo.alt : undefined} style={{ backgroundImage: `url(${photo.src})` }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

const ROLE_ICONS = { rocket: Rocket, compass: Compass, target: Target, mic: Mic };

function Roles() {
  return (
    <section className="fd-sec">
      <div className="container">
        <h2 className="fd-center-heading">{founderRoles.heading}</h2>
        <ol className="fd-roles">
          {founderRoles.items.map((role, i) => {
            const Icon = ROLE_ICONS[role.icon as keyof typeof ROLE_ICONS] ?? Rocket;
            return (
              <li key={role.title} suppressHydrationWarning data-aos="fade-up" data-aos-delay={i * 110}>
                <span className="fd-role-num">{i + 1}</span>
                <span className="fd-role-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="fd-role-kicker">{role.kicker}</span>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="fd-sec">
      <div className="container fd-closing" suppressHydrationWarning data-aos="fade-up">
        <h2>{founderClosing.heading}</h2>
        {founderClosing.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <blockquote>{founderClosing.quote}</blockquote>
      </div>
    </section>
  );
}

function Connect() {
  const c = founderConnect;
  return (
    <section className="fd-sec fd-blue">
      <div className="container fd-connect" suppressHydrationWarning data-aos="fade-up">
        <h2>{c.heading}</h2>
        {c.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="fd-connect-motto">{c.motto}</p>
        <div className="fd-connect-links">
          {c.links.map((link, i) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? "btn-primary" : "btn-outline-light"}`}>
              {link.label}
            </a>
          ))}
        </div>
        <p className="fd-connect-signoff">{c.signoff}</p>
      </div>
    </section>
  );
}
