"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, categorySlug, coursesIn, type CategoryId } from "@/lib/courses";

type Tool = { name: string; logo?: string; mono?: string };

// Per-category copy for the explorer: the two-line tagline under each name in the left list, and the
// software tiles shown on the right (logos from public/logos; `mono` is a text tile where no logo
// file exists). Category names, descriptions and course lists come from lib/courses.ts.
const EXTRAS: Record<CategoryId, { tagline: string; tools: Tool[] }> = {
  "basic-accounting": {
    tagline: "Office skills, accounts-ready",
    tools: [
      { name: "Windows", logo: "windows.svg" },
      { name: "MS Word", logo: "word.png" },
      { name: "MS Excel", logo: "excel.png" },
      { name: "PowerPoint", logo: "powerpoint.svg" },
      { name: "Tally Prime", logo: "tally.png" },
    ],
  },
  "punjabi-typing": {
    tagline: "Speed and accuracy for exams",
    tools: [
      { name: "Raavi", logo: "punjabi.png" },
      { name: "Asees", mono: "ਅ" },
      { name: "MS Word", logo: "word.png" },
      { name: "Windows", logo: "windows.svg" },
    ],
  },
  "civil-mechanical": {
    tagline: "Drawings that get built",
    tools: [
      { name: "AutoCAD", logo: "autocad.png" },
      { name: "SolidWorks", logo: "solidworks.png" },
      { name: "CATIA", logo: "catia.svg" },
      { name: "Revit", logo: "revit.svg" },
      { name: "3ds Max", logo: "autodesk.svg" },
    ],
  },
  "graphic-design": {
    tagline: "Brands, print and social creatives",
    tools: [
      { name: "Photoshop", logo: "photoshop.png" },
      { name: "Illustrator", logo: "illustrator.svg" },
      { name: "CorelDRAW", logo: "coreldraw.png" },
      { name: "InDesign", logo: "indesign.svg" },
      { name: "Canva", logo: "canva.svg" },
    ],
  },
  "digital-marketing": {
    tagline: "Campaigns that bring enquiries",
    tools: [
      { name: "Google Ads", logo: "google-ads.svg" },
      { name: "Analytics", logo: "google-analytics.svg" },
      { name: "Search Console", logo: "search-console.svg" },
      { name: "Meta Ads", logo: "meta.svg" },
      { name: "WordPress", logo: "wordpress.svg" },
    ],
  },
};

// "What you can learn" on /about: the five course categories as a clickable list on the left; the
// blue panel on the right shows the picked category's description, software and courses.
//
// The panel itself never unmounts — only its inner content is re-keyed on each pick, which replays
// the staggered rise-and-fade on every line (see .dx-in in globals.css). That gives the "text
// arriving" feel on a click, which scroll-triggered AOS can't do since nothing scrolls into view.
export default function DomainsExplorer() {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  const extra = EXTRAS[cat.id];
  const courses = coursesIn(cat.id);
  const href = `/courses/${categorySlug(cat.id)}`;

  return (
    <div className="dx" suppressHydrationWarning data-aos="fade-up">
      <div className="dx-list" role="tablist" aria-label="Course categories" aria-orientation="vertical">
        {categories.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            id={`dx-tab-${c.id}`}
            aria-selected={i === active}
            aria-controls="dx-panel"
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
          >
            <strong>{c.name}</strong>
            <span>{EXTRAS[c.id].tagline}</span>
          </button>
        ))}
      </div>

      <div className="dx-panel" role="tabpanel" id="dx-panel" aria-labelledby={`dx-tab-${cat.id}`}>
        <Link href={href} className="dx-go" aria-label={`Open ${cat.name} courses`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>

        <div key={cat.id} className="dx-content">
          <h3 className="dx-in" style={{ "--i": 0 } as React.CSSProperties}>
            {cat.name}
          </h3>
          <p className="dx-desc dx-in" style={{ "--i": 1 } as React.CSSProperties}>
            {cat.blurb}
          </p>

          <h4 className="dx-in" style={{ "--i": 2 } as React.CSSProperties}>
            Software you&apos;ll work on
          </h4>
          <ul className="dx-tools">
            {extra.tools.map((tool, i) => (
              <li key={tool.name} className="dx-in" style={{ "--i": 3 + i } as React.CSSProperties}>
                {tool.logo ? (
                  <Image src={`/logos/${tool.logo}`} alt="" width={40} height={40} />
                ) : (
                  <span className="dx-mono" aria-hidden="true">
                    {tool.mono}
                  </span>
                )}
                <span>{tool.name}</span>
              </li>
            ))}
          </ul>

          <h4 className="dx-in" style={{ "--i": 8 } as React.CSSProperties}>
            Courses in this track
          </h4>
          <ul className="dx-courses">
            {courses.map((course, i) => (
              <li key={course.slug} className="dx-in" style={{ "--i": 9 + i } as React.CSSProperties}>
                <Link href={`/courses/${course.slug}`}>
                  <span>{course.title}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
