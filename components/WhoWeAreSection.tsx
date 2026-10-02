"use client";

import Link from "next/link";
import { GraduationCap, Handshake, Laptop } from "lucide-react";
import { getCourse } from "@/lib/courses";
import { site } from "@/lib/site";
import { whoWeAre } from "@/lib/storyData";
import { MotionCounter, Reveal, RevealHeading, ScaleIn, Stagger, StaggerItem } from "./motion/Reveal";
import MouseSpotlight from "./motion/MouseSpotlight";

// Real, floating trust badges over the photo composition (same figures as IMPACT_STATS below).
const BADGES = [
  { label: `Since ${site.since}`, pos: "wwa-badge-0" },
  { label: "25,000+ Students Trained", pos: "wwa-badge-1" },
  { label: "500+ Hiring Partners", pos: "wwa-badge-2" },
  { label: "4.9★ Google Rating", pos: "wwa-badge-3" },
];

// No real classroom/founder/student photography exists anywhere in this repo (confirmed — only 8
// small software-topic thumbnails in public/courses, nothing matching these three shots) — per the
// user's explicit choice, these render as styled placeholder panels instead of fake/mismatched
// photos. Swap each `<div className="wwa-photo-fill">` below for a real `<Image src="..." fill ... />`
// the moment real photography is available; the masonry layout and badges don't need to change.
const PHOTO_SLOTS = [
  { icon: GraduationCap, label: "Classroom", className: "wwa-photo-main" },
  { icon: Handshake, label: "Founder & Mentors", className: "wwa-photo-sub" },
  { icon: Laptop, label: "Live Projects", className: "wwa-photo-sub" },
];

// Real, already-established figures used identically elsewhere this session (see
// components/AccreditationHero.tsx / lib/teamIntroData.ts) — "Cities Served" is an accurate
// reframing of the real 7-branch network (each branch sits in its own city).
const IMPACT_STATS = [
  { value: "25,000+", label: "Students Trained" },
  { value: "10+", label: "Years of Excellence" },
  { value: "500+", label: "Hiring Partners" },
  { value: "7", label: "Cities Served" },
  { value: "4.9★", label: "Google Rating" },
];

// techcadd's real, industry-standard-tools phrasing already highlights itself — bold the same
// phrases inline rather than inventing new marketing copy.
function highlight(text: string, phrase: string) {
  const i = text.indexOf(phrase);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="wwa-highlight">{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
}

// 2. Who We Are — brand-story panel (headline, founder line, real paragraphs with inline-highlighted
// phrases, real course chip cloud) paired with a masonry photo composition and floating real-stat
// badges, over a real impact-stats row with animated counters.
export default function WhoWeAreSection() {
  return (
    <section className="section theme-dark wwa">
      <div className="wwa-grid-bg" aria-hidden="true" />
      <span className="wwa-glow wwa-glow-1" aria-hidden="true" />
      <span className="wwa-glow wwa-glow-2" aria-hidden="true" />
      <span className="wwa-particle" style={{ top: "18%", left: "6%" }} aria-hidden="true" />
      <span className="wwa-particle" style={{ top: "72%", left: "10%", animationDelay: "1.8s" }} aria-hidden="true" />
      <span className="wwa-particle" style={{ top: "24%", left: "92%", animationDelay: "3.2s" }} aria-hidden="true" />
      <MouseSpotlight className="wwa-spotlight" />

      <div className="container wwa-inner">
        <div className="wwa-story">
          <ScaleIn className="eyebrow">Who we are</ScaleIn>
          <h2 className="wwa-heading">
            <RevealHeading text="Empowering Skills. Enabling Careers." delay={0.1} />
            <br />
            <span className="wwa-highlight-heading">
              <RevealHeading text="Building the Future." delay={0.25} />
            </span>
          </h2>

          <Reveal delay={0.4}>
            <p>
              Founded in {site.since} by{" "}
              <Link href="/about/founder" className="wwa-founder">
                Mr. Gourav Gupta
              </Link>
              , {highlight(whoWeAre.paragraphs[0], "project-based learning")}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p>{highlight(whoWeAre.paragraphs[1], "industry-standard tools")}</p>
          </Reveal>

          <Reveal delay={0.6} className="wwa-teach">
            <h3>What we teach</h3>
            <p>{whoWeAre.teachIntro}</p>
            <Stagger className="wwa-chip-cloud" stagger={0.03}>
              {whoWeAre.featuredCourseSlugs.map((slug) => {
                const course = getCourse(slug);
                if (!course) return null;
                return (
                  <StaggerItem key={slug} className="wwa-chip" y={12}>
                    {course.title}
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>

          <Reveal delay={0.7}>
            <p className="wwa-hq">Headquartered in {site.city}, Punjab.</p>
          </Reveal>

          <Stagger className="wwa-stats" stagger={0.08}>
            {IMPACT_STATS.map((s) => (
              <StaggerItem key={s.label} className="wwa-stat" y={16}>
                <strong>
                  <MotionCounter value={s.value} />
                </strong>
                <span>{s.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.3} y={30} className="wwa-showcase">
          <div className="wwa-gallery">
            <div className={`wwa-photo ${PHOTO_SLOTS[0].className}`}>
              <div className="wwa-photo-fill">
                <GraduationCap strokeWidth={1.5} />
                <span>{PHOTO_SLOTS[0].label}</span>
              </div>
            </div>
            <div className="wwa-gallery-row">
              <div className={`wwa-photo ${PHOTO_SLOTS[1].className}`}>
                <div className="wwa-photo-fill">
                  <Handshake strokeWidth={1.5} />
                  <span>{PHOTO_SLOTS[1].label}</span>
                </div>
              </div>
              <div className={`wwa-photo ${PHOTO_SLOTS[2].className}`}>
                <div className="wwa-photo-fill">
                  <Laptop strokeWidth={1.5} />
                  <span>{PHOTO_SLOTS[2].label}</span>
                </div>
              </div>
            </div>

            <Stagger className="wwa-badge-layer" stagger={0.1}>
              {BADGES.map((b) => (
                <StaggerItem key={b.label} className={`wwa-badge ${b.pos}`} y={14} scale={0.9}>
                  <span className="wwa-badge-dot" aria-hidden="true" />
                  {b.label}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
