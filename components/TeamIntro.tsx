import Link from "next/link";
import { teamIntro } from "@/lib/teamIntroData";

// "Meet the Team" — /about/our-team, right after the hero (see app/about/[slug]/page.tsx). A light
// section with a centred heading over an automatic slider of background-free team photos: name and
// role sit above each person with a dashed arrow pointing down at them, and the person's area shows
// as a pill on hover. Pure CSS marquee — the list is rendered twice back to back and the track slides
// from 0 to -50%, so the loop point is invisible; hovering the rail pauses it.
export default function TeamIntro() {
  const { members } = teamIntro;

  return (
    <section className="tm">
      <span className="tm-glow" aria-hidden="true" />
      <div className="container">
        <div className="tm-head">
          <p className="rf-eyebrow">{teamIntro.badge}</p>
          <h2 className="rf-title">{teamIntro.heading}</h2>
          <p className="rf-lead">{teamIntro.text}</p>
          <Link href={teamIntro.cta.href} className="btn btn-primary tm-cta">
            {teamIntro.cta.label}
          </Link>
        </div>
      </div>

      <div className="tm-rail">
        <ul className="tm-track">
          {[...members, ...members].map((member, i) => {
            const copy = i >= members.length;
            return (
              <li key={`${member.name}-${i}`} aria-hidden={copy || undefined}>
                <figure className="tm-person">
                  <figcaption>
                    <strong>{member.name}</strong>
                    <span>{member.role}</span>
                    <TeamArrow flipped={i % 2 === 1} />
                  </figcaption>
                  <em className="tm-area">{member.area}</em>
                  {/* Plain <img>: the cutouts are already resized WebP with alpha, and the rail sizes
                      each one by height at its natural width, which next/image's fill can't do. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={copy ? "" : `${member.name}, ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function TeamArrow({ flipped }: { flipped: boolean }) {
  return (
    <svg className={`tm-arrow ${flipped ? "is-flipped" : ""}`} viewBox="0 0 40 34" fill="none" aria-hidden="true">
      <path
        d="M31 2c1.5 9-1 18-9 23.5-3.6 2.4-7.6 3.6-12 3.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3.2 3.6"
      />
      <path d="M13.5 24.6 8 29.6l6.8 2.6" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}
