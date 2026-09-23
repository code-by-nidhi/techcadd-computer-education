"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import { toolGroups } from "@/lib/content";

// The software of the selected track orbiting its name, after the right side of techcaddludhiana.com's
// hero: each ring spins with a CSS animation (--dur, --dir) while the tile riding it spins back
// (--counter-dir) so the logo stays upright. A tile sits on the circle because its node arm (width 0,
// height = the ring's radius) is rotated by --angle. Picking a track swaps the logos.
//
// Logo per tool — a file in /public/logos, or a short monogram for the handful of tools that have no
// usable mark (government portals, typing layouts, smaller CAD packages).
const icons: Record<string, string> = {
  Windows: "windows.svg",
  "MS Word": "word.png",
  "MS Excel": "excel.png",
  PowerPoint: "powerpoint.svg",
  Outlook: "outlook.svg",
  "Google Workspace": "google-workspace.svg",
  "Tally Prime": "tally.png",
  "Advanced Excel": "excel.png",
  "Raavi (Unicode)": "punjabi.png",
  AutoCAD: "autocad.png",
  SolidWorks: "solidworks.png",
  CATIA: "catia.svg",
  Revit: "revit.svg",
  "3ds Max": "autodesk.svg",
  "Google Ads": "google-ads.svg",
  "Meta Ads": "meta.svg",
  "Google Analytics": "google-analytics.svg",
  "Search Console": "search-console.svg",
  WordPress: "wordpress.svg",
  SEMrush: "semrush.svg",
  Photoshop: "photoshop.png",
  Illustrator: "illustrator.svg",
  CorelDRAW: "coreldraw.png",
  InDesign: "indesign.svg",
  Canva: "canva.svg",
};

const monograms: Record<string, string> = {
  BUSY: "BUSY",
  "GST Portal": "GST",
  "Income Tax Portal": "ITR",
  Asees: "ਅ",
  "Typing tutor": "TT",
  "V-Ray": "V",
  Mastercam: "MC",
  "Fusion 360": "F360",
};

// Ring geometry: the outer ring takes the first share of the tools, the inner ring the rest, so a
// track with eight tools doesn't crowd one circle.
const RINGS = [
  { size: "84%", dur: "46s", dir: "normal", counterDir: "reverse", offset: 12 },
  { size: "58%", dur: "38s", dir: "reverse", counterDir: "normal", offset: 40 },
];

export default function ToolsOrbit() {
  const [active, setActive] = useState(0);
  const group = toolGroups[active];
  const outerCount = group.tools.length > 5 ? Math.ceil(group.tools.length * 0.6) : group.tools.length;
  const rings = [group.tools.slice(0, outerCount), group.tools.slice(outerCount)];

  return (
    <div className="swo">
      <div className="swo-nav" role="tablist" aria-label="Course tracks">
        {toolGroups.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            id={`swo-tab-${i}`}
            aria-selected={i === active}
            aria-controls="swo-stage"
            className={i === active ? "swo-tab is-active" : "swo-tab"}
            onClick={() => setActive(i)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="swo-visual" id="swo-stage" role="tabpanel" aria-labelledby={`swo-tab-${active}`}>
        {/* Remounts on every switch so the tiles replay their fade-in */}
        <div className="swo-orbit" key={group.name}>
          {rings.map((tools, r) =>
            tools.length === 0 ? null : (
              <div
                key={RINGS[r].size}
                className={`swo-ring swo-ring-${r}`}
                style={
                  {
                    "--size": RINGS[r].size,
                    "--dur": RINGS[r].dur,
                    "--dir": RINGS[r].dir,
                    "--counter-dir": RINGS[r].counterDir,
                  } as CSSProperties
                }
              >
                {tools.map((tool, i) => {
                  const icon = icons[tool];
                  return (
                    <span
                      key={tool}
                      className="swo-node"
                      style={{ "--angle": `${RINGS[r].offset + (360 / tools.length) * i}deg` } as CSSProperties}
                    >
                      <span className="swo-upright">
                        {/* tabIndex so the tooltip is reachable by keyboard, not just hover */}
                        <span className="swo-chip" tabIndex={0} style={{ animationDelay: `${i * 60}ms` }}>
                          {icon ? (
                            <Image
                              src={`/logos/${icon}`}
                              alt=""
                              width={44}
                              height={44}
                              unoptimized={icon.endsWith(".svg")}
                            />
                          ) : (
                            <b>{monograms[tool] ?? tool.slice(0, 2)}</b>
                          )}
                          <span className="swo-tip">{tool}</span>
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>
            )
          )}

          <div className="swo-core">
            <b>{group.name}</b>
            <span>{group.tools.length} tools</span>
          </div>
        </div>
      </div>
    </div>
  );
}
