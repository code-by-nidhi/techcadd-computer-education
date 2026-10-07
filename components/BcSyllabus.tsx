"use client";

import { useEffect, useRef, useState } from "react";

type Phase = { id: string; name: string; weeks: string; summary: string; topics: string[]; outcome: string };

// Syllabus for the course pages: module list on the left, the active module's topics and outcome on
// the right.
//
// On desktop the block is scroll-pinned: it stays fixed under the header while the page scroll steps
// through the modules one by one, and only releases (letting the page carry on) after the last
// module has been shown. That works with plain CSS sticky — .bc-syl-pin is a tall box, .bc-syl-stick
// sticks inside it — and the active module is read off how far through that box the page has
// scrolled. Clicking a module scrolls to its position, so the two never disagree.
//
// On narrow screens (and with reduced motion) the pin is switched off in CSS; the list becomes a
// horizontal scroller and modules change on tap only.
export default function BcSyllabus({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const n = phases.length;
  const p = phases[active];

  // Distance the page scrolls while the block is pinned, or 0 when pinning is off.
  const travel = () => {
    const pin = pinRef.current;
    const stick = stickRef.current;
    if (!pin || !stick || getComputedStyle(stick).position !== "sticky") return 0;
    return Math.max(0, pin.offsetHeight - stick.offsetHeight);
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const pin = pinRef.current;
      const stick = stickRef.current;
      const distance = travel();
      if (!pin || !stick || !distance) return;
      const stickTop = parseFloat(getComputedStyle(stick).top) || 0;
      const scrolled = stickTop - pin.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, scrolled / distance));
      setActive(Math.min(n - 1, Math.floor(progress * n)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [n]);

  const pick = (i: number) => {
    const pin = pinRef.current;
    const stick = stickRef.current;
    const distance = travel();
    if (!pin || !stick || !distance) {
      setActive(i);
      return;
    }
    // Scroll to the middle of module i's slice of the pinned distance.
    const stickTop = parseFloat(getComputedStyle(stick).top) || 0;
    const start = pin.getBoundingClientRect().top + window.scrollY - stickTop;
    window.scrollTo({ top: start + ((i + 0.5) / n) * distance, behavior: "smooth" });
  };

  return (
    <div className="bc-syl-pin" ref={pinRef} style={{ "--syl-steps": n } as React.CSSProperties}>
      <div className="bc-syl-stick" ref={stickRef}>
        <div className="bc-syl">
          <div className="bc-syl-tabs" role="tablist" aria-label="Course modules">
            {phases.map((ph, i) => (
              <button
                key={ph.id}
                type="button"
                role="tab"
                id={`bc-tab-${ph.id}`}
                aria-selected={i === active}
                aria-controls="bc-syl-panel"
                className={i === active ? "is-active" : ""}
                onClick={() => pick(i)}
              >
                <span className="bc-syl-id">{ph.id}</span>
                <span className="bc-syl-name">
                  {ph.name}
                  <small>{ph.weeks}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="bc-syl-panel" role="tabpanel" id="bc-syl-panel" aria-labelledby={`bc-tab-${p.id}`} key={p.id}>
            <div className="bc-syl-panel-head">
              <span>
                Module {p.id} / {String(n).padStart(2, "0")}
              </span>
              <span className="bc-syl-weeks">{p.weeks}</span>
            </div>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <ul>
              {p.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="bc-syl-outcome">
              <small>You will be able to</small>
              <strong>{p.outcome}</strong>
            </div>
            <div className="bc-syl-progress" aria-hidden="true">
              <span style={{ width: `${((active + 1) / n) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
