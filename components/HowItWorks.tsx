import type { CSSProperties } from "react";
import { steps } from "@/lib/content";
import DemoButton from "./DemoButton";
import ArrowIcon from "./ArrowIcon";
import ScrollBlur from "./ScrollBlur";

// "How it works", after techcaddchandigarh.com's Modules section: a dark panel with huge words stays
// pinned to the screen while white step cards scroll up over it and stack in the middle, each one
// sticking a little lower than the one before (--i). The stacking is pure CSS (position: sticky);
// ScrollBlur blurs the big words as the cards arrive.
export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="hiw-backdrop">
        {/* Blurs the big words as the cards scroll up over them */}
        <ScrollBlur className="container hiw-blur" sectionSelector=".hiw" cardsSelector=".hiw-cards">
          <p className="hiw-eyebrow">How it works</p>
          <h2 className="hiw-big">From call</h2>
          <div className="hiw-row">
            <div className="hiw-intro">
              <p>
                Four steps take you from your first counselling call to your first job. Every student follows the same
                path, whichever course you choose.
              </p>
              <DemoButton className="hiw-btn">
                Book a free demo <ArrowIcon />
              </DemoButton>
            </div>
            <p className="hiw-big hiw-big-end" aria-hidden="true">
              to career
            </p>
          </div>
        </ScrollBlur>
      </div>

      <div className="hiw-cards">
        <div className="container">
          <ol>
            {steps.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as CSSProperties}>
                <article>
                  <div>
                    <span className="hiw-tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <div className="hiw-foot">
                    <ul>
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <span className="hiw-num">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
