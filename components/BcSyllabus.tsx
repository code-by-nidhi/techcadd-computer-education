"use client";

import { useState } from "react";

type Phase = { id: string; name: string; weeks: string; summary: string; topics: string[]; outcome: string };

// Tabbed syllabus for the Basic Computer page: module list on the left, the picked module's topics
// and outcome on the right. On phones the list becomes a horizontal scroller above the panel.
export default function BcSyllabus({ phases }: { phases: Phase[] }) {
  const [active, setActive] = useState(0);
  const p = phases[active];

  return (
    <div className="bc-syl" data-aos="fade-up">
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
            onClick={() => setActive(i)}
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
            Module {p.id} / {String(phases.length).padStart(2, "0")}
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
          <span style={{ width: `${((active + 1) / phases.length) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
