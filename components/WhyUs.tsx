"use client";

import { useState } from "react";
import { whyUs } from "@/lib/content";
import { site } from "@/lib/site";

// "Why techcadd" as a numbered accordion: huge thin numbers on the left, titles on the right, rows
// split by hairlines. Closed rows show only the top of their number; the open row (hover, click or
// keyboard focus) shows the full number with its description and points. The first row starts open.
export default function WhyUs() {
  const [open, setOpen] = useState(0);

  return (
    <section className="why" id="why-us">
      <div className="container">
        <div className="why-head">
          <span className="why-eyebrow">Why {site.fullName}?</span>
          <h2>Training that gets you hired</h2>
        </div>

        <ol className="why-list">
          {whyUs.map((w, i) => {
            const isOpen = open === i;
            return (
              <li
                key={w.title}
                className={isOpen ? "why-row is-open" : "why-row"}
                onMouseEnter={() => setOpen(i)}
                onClick={() => setOpen(i)}
              >
                <span className="why-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="why-body">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`why-panel-${i}`}
                      onFocus={() => setOpen(i)}
                      onClick={() => setOpen(i)}
                    >
                      {w.title}
                    </button>
                  </h3>
                  <div className="why-panel" id={`why-panel-${i}`} role="region" aria-hidden={!isOpen}>
                    <div>
                      <p>{w.text}</p>
                      <ul>
                        {w.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
