import Image from "next/image";
import { Baloo_Paaji_2 } from "next/font/google";

// Rounded Gurmukhi face for the Punjabi typing card.
const gurmukhi = Baloo_Paaji_2({ subsets: ["gurmukhi"], weight: ["700", "800"], display: "swap" });

// Decorative "analytics dashboard" collage for the home hero: floating cards, software logos orbiting
// a dotted circle, and a few scattered squares. Pure markup + CSS, no client JS.

// Software logos (public/logos), spaced evenly around the orbit. `tip` is shown on hover.
const software = [
  { logo: "photoshop", tip: "Photoshop – Graphic Designing" },
  { logo: "coreldraw", tip: "CorelDRAW – Graphic Designing" },
  { logo: "autocad", tip: "AutoCAD – Civil / Mechanical" },
  { logo: "solidworks", tip: "SolidWorks – Civil / Mechanical" },
  { logo: "word", tip: "MS Word – Basic Computer" },
  { logo: "excel", tip: "MS Excel – Basic Computer" },
  { logo: "tally", tip: "Tally – Accounting" },
];
const START_ANGLE = 180; // degrees; 90 = bottom, 180 = far left, 270 = top

const engagement = [48, 72, 58, 90, 76, 100]; // social-post engagement bars, % of chart height

export default function HeroDashboard() {
  return (
    <div className="dash" aria-hidden="true">
      <span className="dash-arc" />
      {/* The clip hides logos over the card area (gaps included); the orbit box inside it sits exactly on
          the dotted circle and rotates, and each tile counter-rotates to stay upright. */}
      <div className="dash-orbit-clip">
        <div className="dash-orbit">
          {software.map((s, i) => {
            const rad = ((START_ANGLE + (360 * i) / software.length) * Math.PI) / 180;
            return (
              <span
                key={s.logo}
                className="dash-app"
                style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
              >
                <span className="dash-app-inner">
                  <Image src={`/logos/${s.logo}.png`} alt="" width={96} height={96} />
                  <span className="dash-tip">{s.tip}</span>
                </span>
              </span>
            );
          })}
        </div>
      </div>

      <span className="dash-sq dash-sq-1" />
      <span className="dash-sq dash-sq-2" />
      <span className="dash-sq dash-sq-3" />
      <span className="dash-sq dash-sq-4" />
      <span className="dash-sq dash-sq-5" />

      {/* Digital marketing: traffic line + channel-mix donut */}
      <div className="dash-card dash-main">
        <div className="dash-main-top">
          <div>
            <small>Digital Marketing</small>
            <strong>Grow brands online</strong>
          </div>
          <span className="dash-donut" />
        </div>
        <svg className="dash-line" viewBox="0 0 200 60" preserveAspectRatio="none">
          <path d="M0 48 L25 40 L50 44 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14" fill="none" stroke="#7aa2ff" strokeWidth="2.5" />
          <path d="M0 48 L25 40 L50 44 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14 L200 60 L0 60Z" fill="url(#dashFade)" />
          <defs>
            <linearGradient id="dashFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7aa2ff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#7aa2ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="dash-legend">
          <span><i style={{ background: "var(--brand)" }} />SEO</span>
          <span><i style={{ background: "#7aa2ff" }} />Google Ads</span>
          <span><i style={{ background: "rgba(255,255,255,0.85)" }} />Social</span>
          <span><i style={{ background: "rgba(255,255,255,0.25)" }} />Email</span>
        </div>
      </div>

      {/* Punjabi typing card beside the main card */}
      <div className="dash-card dash-punjabi">
        <small>Punjabi typing</small>
        <span className={`dash-punjabi-word ${gurmukhi.className}`} lang="pa">ਪੰਜਾਬੀ</span>
      </div>

      {/* Social media marketing: platform icons + engagement bars */}
      <div className="dash-card dash-bars">
        <small>Social Media Marketing</small>
        <div className="dash-social">
          <span className="dash-social-ig">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="5" />
              <circle cx="12" cy="12" r="3.6" />
              <circle cx="17" cy="7" r="0.6" fill="#fff" />
            </svg>
          </span>
          <span style={{ background: "#1877f2" }}>f</span>
          <span style={{ background: "#ff0000" }}>
            <svg viewBox="0 0 24 24" fill="#fff"><path d="M9 7.5v9l7.5-4.5z" /></svg>
          </span>
          <span style={{ background: "#0a66c2" }}>in</span>
        </div>
        <div className="dash-bars-row">
          {engagement.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      {/* SEO & Google Ads: search ranking with a brand-blue footer chart */}
      <div className="dash-card dash-growth">
        <small>SEO &amp; Google Ads</small>
        <strong>
          <span className="dash-up">▲</span> Rank #1
        </strong>
        <span className="dash-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></svg>
          computer course near me
        </span>
        <svg className="dash-growth-chart" viewBox="0 0 200 70" preserveAspectRatio="none">
          <path d="M0 55 C30 50 45 30 70 36 S110 58 135 34 S175 12 200 18 L200 70 L0 70Z" fill="rgba(255,255,255,0.18)" />
          <path d="M0 55 C30 50 45 30 70 36 S110 58 135 34 S175 12 200 18" fill="none" stroke="#fff" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
}
