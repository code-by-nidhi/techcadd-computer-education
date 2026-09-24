"use client";

import { useEffect, useRef, useState } from "react";

type Milestone = { year: string; title: string; text: string; icon: string };

// Horizontal "one story at a time" timeline: every year 2016-2026 gets a node on the line, but only
// years with a real, verified milestone (see lib/storyData.ts `journey`) are interactive — hovering,
// clicking or focusing one (or, on touch, swiping the row) swaps the single large feature card above
// the line, instead of showing every milestone as its own permanently-visible card. Years without a
// verified milestone stay on the line as plain markers (chronology, not clickable) rather than
// fabricating content for them. See components/StoryPage.tsx OurJourney for the section wrapper.
export default function JourneyTimeline({ years, milestones }: { years: string[]; milestones: Milestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<number, HTMLElement>>(new Map());
  const ticking = useRef(false);

  const active = milestones[activeIndex];
  const activeYearIndex = years.indexOf(active.year);
  const fraction = years.length > 1 ? activeYearIndex / (years.length - 1) : 0;
  const lastYear = years[years.length - 1];

  // Horizontal swipe (mobile/tablet): as the row scrolls, activate whichever milestone node is
  // nearest the row's horizontal centre. On desktop the row never overflows, so this never fires
  // there — hover/click/focus drive it instead.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const center = row.scrollLeft + row.clientWidth / 2;
        let nearest = 0;
        let nearestDist = Infinity;
        nodeRefs.current.forEach((el, milestoneIndex) => {
          const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = milestoneIndex;
          }
        });
        setActiveIndex(nearest);
      });
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="story-tl2">
      <div className={`story-tl2-stage ${active.year === lastYear ? "story-tl2-stage-today" : ""}`} key={active.year}>
        <span className="story-tl2-stage-glow" aria-hidden="true" />
        {active.year === lastYear && <span className="story-tl2-today">Today</span>}
        <span className="story-tl2-stage-icon">
          <Icon icon={active.icon} />
        </span>
        <span className="story-tl2-stage-year">{active.year}</span>
        <h3>{active.title}</h3>
        <p>{active.text}</p>
      </div>

      <div className="story-tl2-row" ref={rowRef}>
        <div className="story-tl2-track">
          <span className="story-tl2-spotlight" aria-hidden="true" style={{ left: `${fraction * 100}%` }} />
          <span className="story-tl2-line" aria-hidden="true">
            <span className="story-tl2-line-fill" style={{ width: `${fraction * 100}%` }} aria-hidden="true" />
          </span>

          {years.map((year) => {
            const milestoneIndex = milestones.findIndex((m) => m.year === year);
            const isCurrent = year === lastYear;

            if (milestoneIndex < 0) {
              const isPassed = years.indexOf(year) <= activeYearIndex;
              return (
                <span key={year} className={`story-tl2-node-wrap story-tl2-node-plain ${isPassed ? "is-passed" : ""}`}>
                  <span className="story-tl2-node" aria-hidden="true" />
                  <span className="story-tl2-node-year">{year}</span>
                </span>
              );
            }

            const isActive = milestoneIndex === activeIndex;
            const isPassed = years.indexOf(year) <= activeYearIndex;
            return (
              <button
                key={year}
                type="button"
                ref={(el) => {
                  if (el) nodeRefs.current.set(milestoneIndex, el);
                }}
                className={`story-tl2-node-wrap ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""} ${isCurrent ? "story-tl2-node-current" : ""}`}
                onMouseEnter={() => setActiveIndex(milestoneIndex)}
                onFocus={() => setActiveIndex(milestoneIndex)}
                onClick={() => setActiveIndex(milestoneIndex)}
                aria-pressed={isActive}
              >
                <span className="story-tl2-node" aria-hidden="true" />
                <span className="story-tl2-node-year">{year}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Icon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    foundation: "M4 21V9l8-6 8 6v12M9 21v-6h6v6M4 12h16",
    growth: "M12 3 4 6.5V12c0 4.8 3.4 8.6 8 9.9 4.6-1.3 8-5.1 8-9.9V6.5L12 3ZM8.5 12l2.5 2.5L16 9",
    innovation: "M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    training: "M9 15 15 9M10 6l1.5-1.5a3.5 3.5 0 0 1 5 5L15 11M14 18l-1.5 1.5a3.5 3.5 0 0 1-5-5L9 13",
    expansion: "M12 3v6M6 21v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5M4 21h4v-3H4zM10 21h4v-3h-4zM16 21h4v-3h-4zM9 9h6l3 3M6 12l3-3",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={paths[icon] ?? paths.growth} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
