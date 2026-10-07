"use client";

import { useEffect, useRef, useState } from "react";
import { founderJourney, founderReels, founderTestimonials } from "@/lib/founderData";

// The two interactive pieces of /about/founder (components/FounderPage.tsx).

// Journey: a photo panel that stays pinned on the left while the chapter cards scroll past on the
// right; the photo, caption and highlighted tab follow whichever chapter is in the middle of the
// screen. Clicking a tab scrolls to that chapter.
export function FounderJourney() {
  const { chapters } = founderJourney;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the viewport: the chapter crossing it is the active one.
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container fd-journey-body">
      <div className="fd-journey-stage">
        <div className="fd-journey-photos">
          {chapters.map((c, i) => (
            <span
              key={c.tab}
              className={`fd-journey-photo ${i === active ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${c.photo})` }}
              aria-hidden="true"
            />
          ))}
          <div className="fd-journey-tabs" role="tablist" aria-label="Chapters">
            {chapters.map((c, i) => (
              <button
                key={c.tab}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={i === active ? "is-active" : ""}
                onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                {c.tab}
              </button>
            ))}
          </div>
          <p className="fd-journey-caption">
            <span aria-hidden="true" />
            {chapters[active].caption}
          </p>
        </div>
      </div>

      <ol className="fd-chapters">
        {chapters.map((c, i) => (
          <li
            key={c.tab}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={`fd-chapter ${i === active ? "is-active" : ""}`}
          >
            <div className="fd-chapter-top">
              <span className="fd-chapter-badge">{c.badge}</span>
              <span className="fd-chapter-by">Gourav Gupta</span>
            </div>
            <h3>{c.title}</h3>
            <span className="fd-chapter-rule" aria-hidden="true" />
            {c.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {c.points && (
              <ul>
                {c.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {c.highlight && <p className="fd-chapter-highlight">{c.highlight}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

// Testimonials: one quote at a time, advancing every 7 seconds (paused while hovered or focused),
// with previous / next buttons and a "n of 7" counter.
export function FounderTestimonials() {
  const { items } = founderTestimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  const item = items[index];
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);

  return (
    <div
      className="fd-tst-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="fd-tst-mark" aria-hidden="true">
        “
      </span>
      <blockquote key={item.name} className="fd-tst-quote">
        {item.quote}
      </blockquote>
      <div className="fd-tst-foot">
        <div className="fd-tst-person">
          {item.image ? (
            <span className="fd-tst-avatar" style={{ backgroundImage: `url(${item.image})` }} aria-hidden="true" />
          ) : (
            <span className="fd-tst-avatar fd-tst-initials" aria-hidden="true">
              {item.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
          )}
          <span>
            <strong>{item.name}</strong>
            <small>{item.role}</small>
          </span>
        </div>
        <div className="fd-tst-nav">
          <span aria-live="polite">
            {index + 1} of {items.length}
          </span>
          <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)}>
            ←
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => go(1)}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}

// Reels: a coverflow of Instagram embeds. The centre reel is live and playable; its neighbours sit
// behind a transparent button that brings them to the centre when clicked. Only reels within two
// places of the centre mount their iframe, so the page doesn't load all seven players at once.
export function FounderReels() {
  const { ids } = founderReels;
  const [active, setActive] = useState(0);
  const n = ids.length;
  const go = (step: number) => setActive((i) => (i + step + n) % n);

  return (
    <div className="fd-reels-stage" role="group" aria-roledescription="carousel" aria-label="Instagram reels from techcadd">
      {ids.map((id, i) => {
        // Signed distance from the centre, wrapped so the list reads as a loop (-3 … 3).
        let d = (i - active + n) % n;
        if (d > n / 2) d -= n;
        const ad = Math.abs(d);
        return (
          <div
            key={id}
            className="fd-reel"
            data-active={d === 0 || undefined}
            aria-hidden={ad > 2 || undefined}
            aria-label={`Reel ${i + 1} of ${n}`}
            style={{ "--d": d, "--ad": ad, zIndex: 10 - ad } as React.CSSProperties}
          >
            <div className="fd-reel-clip">
              {ad <= 2 && (
                <iframe
                  src={`https://www.instagram.com/reel/${id}/embed`}
                  title={`techcadd on Instagram — reel ${i + 1}`}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                  tabIndex={d === 0 ? 0 : -1}
                />
              )}
            </div>
            {d !== 0 && (
              <button type="button" className="fd-reel-cover" tabIndex={ad <= 2 ? 0 : -1} aria-label={`Show reel ${i + 1}`} onClick={() => setActive(i)} />
            )}
          </div>
        );
      })}
      <button type="button" className="fd-reels-arrow fd-reels-prev" aria-label="Previous reel" onClick={() => go(-1)}>
        ←
      </button>
      <button type="button" className="fd-reels-arrow fd-reels-next" aria-label="Next reel" onClick={() => go(1)}>
        →
      </button>
    </div>
  );
}
