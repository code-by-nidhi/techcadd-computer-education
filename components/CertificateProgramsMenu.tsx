import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowUpRight, Calculator, Megaphone, Palette, Ruler } from "lucide-react";
import { categories, categorySlug, coursesIn, type CategoryId } from "@/lib/courses";

// Its own data source, independent of the Courses mega-menu (components/Header.tsx's other
// dropdown): only the 4 categories that are genuinely certificate/diploma-style programs. Course
// counts and category names/blurbs still come straight from lib/courses.ts (the one real source of
// truth) — only the icon and the short display description are new, so nothing here can drift out of
// sync with the real course list.
const CARD_ICONS: Record<string, ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "basic-accounting": Calculator,
  "civil-mechanical": Ruler,
  "graphic-design": Palette,
  "digital-marketing": Megaphone,
};

const CARD_COPY: Record<string, string> = {
  "basic-accounting": "Accounting, Tally, GST & office skills",
  "civil-mechanical": "AutoCAD, SolidWorks, Revit & CAD tools",
  "graphic-design": "Photoshop, Illustrator & branding tools",
  "digital-marketing": "SEO, social media & Google Ads",
};

const CARD_ORDER: CategoryId[] = ["basic-accounting", "civil-mechanical", "graphic-design", "digital-marketing"];

// Certificate Programs' mega-menu: a 2x2 grid of category cards (Basic & Accounting, Civil /
// Mechanical, Graphic Designing, Digital Marketing only — no Punjabi Typing, no IT/software tracks
// this repo doesn't teach) — deliberately built from scratch as cards instead of reusing the Courses
// dropdown's text-column layout, so the two menus read as visually distinct at a glance. Each card
// links to that category's real landing page at its own SEO slug (lib/courses.ts's categorySlug —
// see app/courses/[slug]/page.tsx's CategoryLanding branch), not a #anchor.
export default function CertificateProgramsMenu() {
  const cards = CARD_ORDER.map((id) => categories.find((c) => c.id === id)!);

  return (
    <div className="cpm-dropdown">
      <div className="cpm-grid">
        {cards.map((cat) => {
          const Icon = CARD_ICONS[cat.id];
          const count = coursesIn(cat.id).length;
          return (
            <Link key={cat.id} href={`/courses/${categorySlug(cat.id)}`} className="cpm-card">
              <span className="cpm-card-icon">
                <Icon strokeWidth={1.75} />
              </span>
              <span className="cpm-card-title">{cat.name}</span>
              <span className="cpm-card-desc">{CARD_COPY[cat.id]}</span>
              <span className="cpm-card-foot">
                <span className="cpm-card-count">{count} Courses</span>
                <ArrowUpRight className="cpm-card-arrow" strokeWidth={2} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
